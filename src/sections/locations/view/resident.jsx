import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function ResidentPage() {
  const { residentId } = useParams();
  const [residentData, setResidentData] = useState(null);

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

  // Render your ResidentPage component with the fetched data
  return (
    <div>
      <h2>{residentData.name}</h2>
      <p>Status: {residentData.status}</p>
      <p>Species: {residentData.species}</p>
      {/* Add more details based on your API response */}
    </div>
  );
}
