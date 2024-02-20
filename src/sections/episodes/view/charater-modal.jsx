import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CharacterModal = ({ characters, handleCloseModal }) => (
    <Modal
      open  // Make sure this is set to true to force the modal to open
      onClose={handleCloseModal}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="div">
          Characters
        </Typography>
        <ul>
          {characters.map((character, index) => (
            <li key={index}>
              <a href={character} target="_blank" rel="noopener noreferrer">
                Character {index + 1}
              </a>
            </li>
          ))}
        </ul>
        <Button onClick={handleCloseModal}>Close</Button>
      </Box>
    </Modal>
  );

CharacterModal.propTypes = {
  characters: PropTypes.array.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default CharacterModal;
