import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';




// ----------------------------------------------------------------------

export default function LocationTableRow({
  selected,
  name,
  type,
  residents,
  handleClick,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{type}</TableCell>
      <TableCell>
          <Stack direction="column" alignItems="start" spacing={1}>
            {residents && residents.map((resident, index) => (
              <div key={index}>
                <Typography variant="body2" noWrap>
                  {resident ? resident.name : 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary" noWrap>
                  Status: {resident ? resident.status : 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary" noWrap>
                  Species: {resident ? resident.species : 'N/A'}
                </Typography>
              </div>
            ))}
          </Stack>
        </TableCell>
    </TableRow>
  );
}


LocationTableRow.propTypes = {
  type: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  residents: PropTypes.array,
 
};
