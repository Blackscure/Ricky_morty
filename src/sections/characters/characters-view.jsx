import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Iconify from 'src/components/iconify';

const character = {
    
        "id": 1,
        "name": "Rick Sanchez",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
            "name": "Earth (C-137)",
            "url": "https://rickandmortyapi.com/api/location/1"
        },
        "location": {
            "name": "Citadel of Ricks",
            "url": "https://rickandmortyapi.com/api/location/3"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "episode": [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
            "https://rickandmortyapi.com/api/episode/3",
            "https://rickandmortyapi.com/api/episode/4",
            "https://rickandmortyapi.com/api/episode/5",
            "https://rickandmortyapi.com/api/episode/6",
            "https://rickandmortyapi.com/api/episode/7",
            "https://rickandmortyapi.com/api/episode/8",
            "https://rickandmortyapi.com/api/episode/9",
            "https://rickandmortyapi.com/api/episode/10",
            "https://rickandmortyapi.com/api/episode/11",
            "https://rickandmortyapi.com/api/episode/12",
            "https://rickandmortyapi.com/api/episode/13",
            "https://rickandmortyapi.com/api/episode/14",
            "https://rickandmortyapi.com/api/episode/15",
            "https://rickandmortyapi.com/api/episode/16",
            "https://rickandmortyapi.com/api/episode/17",
            "https://rickandmortyapi.com/api/episode/18",
            "https://rickandmortyapi.com/api/episode/19",
            "https://rickandmortyapi.com/api/episode/20",
            "https://rickandmortyapi.com/api/episode/21",
            "https://rickandmortyapi.com/api/episode/22",
            "https://rickandmortyapi.com/api/episode/23",
            "https://rickandmortyapi.com/api/episode/24",
            "https://rickandmortyapi.com/api/episode/25",
            "https://rickandmortyapi.com/api/episode/26",
            "https://rickandmortyapi.com/api/episode/27",
            "https://rickandmortyapi.com/api/episode/28",
            "https://rickandmortyapi.com/api/episode/29",
            "https://rickandmortyapi.com/api/episode/30",
            "https://rickandmortyapi.com/api/episode/31",
            "https://rickandmortyapi.com/api/episode/32",
            "https://rickandmortyapi.com/api/episode/33",
            "https://rickandmortyapi.com/api/episode/34",
            "https://rickandmortyapi.com/api/episode/35",
            "https://rickandmortyapi.com/api/episode/36",
            "https://rickandmortyapi.com/api/episode/37",
            "https://rickandmortyapi.com/api/episode/38",
            "https://rickandmortyapi.com/api/episode/39",
            "https://rickandmortyapi.com/api/episode/40",
            "https://rickandmortyapi.com/api/episode/41",
            "https://rickandmortyapi.com/api/episode/42",
            "https://rickandmortyapi.com/api/episode/43",
            "https://rickandmortyapi.com/api/episode/44",
            "https://rickandmortyapi.com/api/episode/45",
            "https://rickandmortyapi.com/api/episode/46",
            "https://rickandmortyapi.com/api/episode/47",
            "https://rickandmortyapi.com/api/episode/48",
            "https://rickandmortyapi.com/api/episode/49",
            "https://rickandmortyapi.com/api/episode/50",
            "https://rickandmortyapi.com/api/episode/51"
        ],
        "url": "https://rickandmortyapi.com/api/character/1",
        "created": "2017-11-04T18:48:46.250Z"
    
}

const CharactersPage = () => {
  // eslint-disable-next-line no-unused-vars


  const handleOpenRole = () => {
   
  };

 

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Create Users</Typography>

        <Button variant="contained" onClick={handleOpenRole} color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Role
        </Button>
      </Stack>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={character.name}
        height="140"
        image={character.image}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {character.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {character.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Species: {character.species}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {character.type || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {character.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Origin: {character.origin.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {character.location.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Episodes:
          <ul>
            {character.episode.map((episode, index) => (
              <li key={index}>
                <a href={episode}>{episode}</a>
              </li>
            ))}
          </ul>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          URL: <a href={character.url}>{character.url}</a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created: {character.created}
        </Typography>
      </CardContent>
    </Card>

   
    </Box>
  );
};

export default CharactersPage;
