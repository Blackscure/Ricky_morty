import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';




// ----------------------------------------------------------------------

export default function UserTableRow({
  name,
  type,
  role,
}) {


  return (
    <TableRow hover tabIndex={-1} role="checkbox" >
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={handleClick} /> */}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
           
            <Typography variant="subtitle2" noWrap spacing={2}>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{type}</TableCell>

        <TableCell>{role}</TableCell>

      

      </TableRow>
  );
}

UserTableRow.propTypes = {
  type: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
 
};
