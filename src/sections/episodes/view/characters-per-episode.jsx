import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const CharactersPerEpisode = () => {
  const { episodeId } = useParams();
  const [characters, setCharacters] = useState([]);
  console.log(episodeId ,"---------------------------------------")

  useEffect(() => {
    // Fetch episode data based on episodeId
    fetch(`https://rickandmortyapi.com/api/charater/${episodeId}`)
      .then((response) => response.json())
      .then((data) => {
        // Map over characters URLs and fetch details for each character
        const characterPromises = data.characters.map((characterUrl) =>
          fetch(characterUrl).then((response) => response.json())
        );

        // Wait for all character details to be fetched
        Promise.all(characterPromises)
          .then((characterData) => {
            setCharacters(characterData);
          })
          .catch((error) => {
            console.error('Error fetching character details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching episode data:', error);
      });
  }, [episodeId]);

  return (
    <div>
      <h2>Characters for Episode {episodeId}</h2>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            <div>
              <h3>{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              {/* Add other details you want to display */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersPerEpisode;
