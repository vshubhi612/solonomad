import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlaceFinder({ location }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      setError('');
      console.log("Fetching places for location:", location);
      console.log("Using FSQ API key:", import.meta.env.VITE_FSQ_API_KEY);
      try {
        const res = await axios.get('/fsq/places/search', {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_FSQ_API_KEY}`,
            accept: "application/json",
            "X-Places-Api-Version": "2025-06-17",
          },
          params: {
            ll: `${location.lat},${location.lon}`,
            limit: 2,
          },
        });
        setPlaces(res.data.results || []);        
      } catch (e) {
        setError('Failed to fetch places. Check your FSQ API key.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [location]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Nearby Places</h2>
      {loading && <p>Loading places…</p>}
      {error && <p className="text-red-600">{error}</p>}
      <ul>
        {places.map((place) => (
          <li key={place.fsq_place_id} className="mb-2 p-3 bg-white rounded shadow">
            <strong>{place.name}</strong>
            <p className="text-sm text-gray-600">
              {place.location?.address || place.location?.formatted_address || 'Address unavailable'}
            </p>
          </li>        
        ))}
      </ul>
    </div>
  );
}
