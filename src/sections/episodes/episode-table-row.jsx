import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function EpisodeTableRow({
  selected,
  name,
  air_date,
  characters,
  episode,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  //  const router = useRouter();

 

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // const handleCharactersClick = () => {
  //   // Navigate to the CharactersPage with the episode ID
  //   router.push(`/characters/${episode}`);
  // };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={image} /> */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{episode}</TableCell>
        <TableCell>
          <Stack direction="column" alignItems="start" spacing={1}>
            {characters && characters.map((character, index) => (
              <div key={index}>
                <Typography variant="body2" noWrap>
                  {character ? character.name : 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary" noWrap>
                  Status: {character ? character.status : 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary" noWrap>
                  Species: {character ? character.species : 'N/A'}
                </Typography>
              </div>
            ))}
          </Stack>
        </TableCell>

        {/* <TableCell><Button variant='outlined' onClick={handleCharactersClick}>Characters</Button></TableCell> */}
        <TableCell>{air_date}</TableCell>
       
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

EpisodeTableRow.propTypes = {
  air_date: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  episode: PropTypes.any,
  characters: PropTypes.array,
};
