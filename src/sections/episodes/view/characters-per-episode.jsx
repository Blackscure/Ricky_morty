import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const CharactersPerEpisode = () => {
  const { episodeId } = useParams();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch characters data based on episodeId
    fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((response) => response.json())
      .then((data) => setCharacters(data.characters));
  }, [episodeId]);

  return (
    <div>
      <h2>Characters for Episode {episodeId}</h2>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            <a href={character}>{character}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersPerEpisode;
