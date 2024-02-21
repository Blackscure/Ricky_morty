import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import { Box, Card, Button, TextField, Typography } from '@mui/material';

export default function ResidentPage() {
  const { residentId } = useParams();
  const [residentData, setResidentData] = useState(null);
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState(localStorage.getItem(`residentNote_${residentId}`));

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${residentId}`);
        setResidentData(response.data);
      } catch (error) {
        console.error('Error fetching resident data:', error);
      }
    };

    fetchResidentData();
  }, [residentId]);

  if (!residentData) {
    // You can render a loading spinner or message while data is being fetched
    return <div>Loading...</div>;
  }

  const handleAddNote = () => {
    localStorage.setItem(`residentNote_${residentId}`, note);
    setSavedNote(note);
    setNote('');
  };

  return (
    <Card style={{ paddingTop: '16px' }}>
      <Box p={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Residet Infomation</Typography>

      
      </Stack>
        <Typography variant="h5">{residentData.name}</Typography>
        <Typography variant="body1" component="p">
          Status: {residentData.status}
        </Typography>
        <Typography variant="body1" component="p">
          Species: {residentData.species}
        </Typography>
        <Typography variant="body1" component="p">
          Gender: {residentData.gender}
        </Typography>
        {/* Add more details based on your API response */}
        
        <Box mt={2}>
          <TextField
            label="Add Note"
            variant="outlined"
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddNote} style={{ marginTop: '8px' }}>
            Add Note
          </Button>
        </Box>

        {savedNote && (
          <Typography variant="body2" mt={2}>
            Note: {savedNote}
          </Typography>
        )}
      </Box>
    </Card>
  );
}
