import axios from 'axios';
import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import EpisodeTableRow from '../episode-table-row';
import EpisodeTableHead from '../episode-table-head';
import EpisodeTableToolbar from '../episode-table-toolbar';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        const episodesData = response.data.results;

        // Fetch characters for each episode
        const episodesWithCharacters = await Promise.all(
          episodesData.map(async (episode) => {
            const charactersResponse = await axios.all(episode.characters.map(characterUrl => axios.get(characterUrl)));
            const charactersData = charactersResponse.map(character => character.data);
            return { ...episode, characters: charactersData };
          })
        );

        setEpisodes(episodesWithCharacters);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEpisodes();
  }, []); 




  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = episodes.map((episode) => episode.name);
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

  const dataFiltered = episodes.filter((episode) =>
    episode.name.toLowerCase().includes(filterName.toLowerCase())
  );


  return (
    <Box>
      {/* ... (existing code) */}

      <Card>
        <EpisodeTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EpisodeTableHead
                order={order}
                orderBy={orderBy}
                rowCount={episodes.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'episode', label: 'Episode' },
                  { id: 'characters', label: 'Characters' },
                  { id: 'air_date', label: 'Air Date' },

               
                  // ... other columns
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((episode) => (
                    <EpisodeTableRow
                      key={episode.id}
                      name={episode.name}
                      episode={episode.episode}
                      characters={episode.characters}

                      // characters={episode.characters.map((character) => character)}
                      air_date={episode.air_date}
                      // ... other columns
                      selected={selected.indexOf(episode.name) !== -1}
                      handleClick={(event) => handleClick(event, episode.name)}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={episodes.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
};

export default EpisodesPage;
