import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { createSvgIcon } from '@mui/material/utils';

// Assuming you have React Router for navigation
// Adjust the link path based on your route configuration

export default function LocationTableRow({
  selected,
  name,
  type,
  residents,
  handleClick,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );

  const getResidentIdFromUrl = (resident) => {
    // Assuming `resident.url` is the URL string
    const parts = resident.url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          {residents && residents.length > 0 && (
            <Link to={`/resident/${getResidentIdFromUrl(residents[0])}`}>
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
            </Link>
          )}
        </Stack>
      </TableCell>

      <TableCell>{type}</TableCell>
      <TableCell>
        <Stack direction="column" alignItems="start" spacing={1}>
          {residents && residents.length > 0 && (
            <>
              <IconButton
                aria-expanded={expanded}
                onClick={handleExpandClick}
                aria-label="show more"
              >
                <PlusIcon color="secondary" />
              </IconButton>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {residents.map((resident, index) => (
                  <div key={index}>
                    <Typography variant="body2" noWrap>
                      {resident ? resident.name : 'N/A'}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      noWrap
                    >
                      Status: {resident ? resident.status : 'N/A'}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      noWrap
                    >
                      Species: {resident ? resident.species : 'N/A'}
                    </Typography>
                  </div>
                ))}
              </Collapse>
            </>
          )}
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
