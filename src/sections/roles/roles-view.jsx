import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import Iconify from 'src/components/iconify';

import RoleModal from './role-modal';

const RolesPage = () => {
  const [openRole, setOpenRole] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpenRole = () => {
    setOpenRole(true);
  };

  const handleCloseRole = () => {
    setOpenRole(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/apps/api/v1/authentication/roles/');
      console.log('Response:', response.data);
      setData(response.data.data); // Access 'data' property in the response
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Create Users</Typography>

        <Button variant="contained" onClick={handleOpenRole} color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Role
        </Button>
        <RoleModal open={openRole} handleCloseRole={handleCloseRole} />
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Role Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No Roles</TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  // Render your table rows based on the data
                  <TableRow key={row.id}>
                    {/* Display your data in the cells */}
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.role_name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                      {/* Rest of your menu and actions */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default RolesPage;
