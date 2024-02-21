import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Box, Typography, CircularProgress } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';

import CharacterTableRow from '../character-table-row';
import CharacterTableHead from '../character-table-head';
import CharacterTableToolbar from '../character-table-toolbar';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the Rick and Morty API
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching character data:', error);
        setLoading(false);
      });
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = characters.map((character) => character.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = characters.filter((character) =>
    character.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <>
      <Typography variant="h3" fontWeight="bold" style={{ float: 'left' }}>
        Characters
      </Typography>
      <Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Card>
            <CharacterTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <CharacterTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={characters.length}
                    numSelected={selected.length}
                    onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={[
                      { id: 'name', label: 'Name' },
                      { id: 'status', label: 'Status' },
                      { id: 'species', label: 'Species' },
                      { id: 'gender', label: 'Gender' },
                      { id: 'origin', label: 'Origin' },
                      { id: 'location', label: 'Location' },
                      // ... other columns
                    ]}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((character) => (
                        <CharacterTableRow
                          key={character.id}
                          image={character.image}
                          name={character.name}
                          species={character.species}
                          status={character.status}
                          gender={character.gender}
                          origin={character.origin.name}
                          location={character.location.name}
                          // ... other columns
                          selected={selected.indexOf(character.name) !== -1}
                          handleClick={(event) => handleClick(event, character.name)}
                        />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              page={page}
              component="div"
              count={characters.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Box>
    </>
  );
};

export default CharactersPage;
