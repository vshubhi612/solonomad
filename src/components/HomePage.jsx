import React, { useState } from 'react';
import PlaceFinder from './PlaceFinder';
import AgentDashboard from './agents/AgentDashboard';

export default function HomePage() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      setError('');
    }, (err) => {
      setError('Location permission denied or unavailable.');
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-1">🌍 SoloNomad</h1>
      <p className="text-gray-600 mb-4">An AI-powered, agentic travel companion for solo explorers.</p>
      <div className="flex gap-3 mb-4">
        <button onClick={getLocation} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow">Enable Location</button>
      </div>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {location && (
        <>
          <PlaceFinder location={location} />
          <AgentDashboard location={location} />
        </>
      )}
      {!location && <p className="text-gray-700">Click <b>Enable Location</b> to get nearby places and an itinerary.</p>}
    </div>
  );
}
