import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AgentDashboard({ location }) {
  const [plan, setPlan] = useState('');
  const [challenge, setChallenge] = useState('');
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // fetch FSQ place details
  const fetchPlaceDetails = async (fsqPlaceId) => {
    const res = await axios.get(`/fsq/places/${fsqPlaceId}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_FSQ_API_KEY}`,
        Accept: "application/json",
        "X-Places-Api-Version": "2025-06-17", 
      },      
    });
    return res.data;
  };

  // ask Gemini
  const getGeminiResponse = async (prompt, fallback) => {
    try {
      console.log("Sending prompt to Gemini:", prompt);
      console.log("Using API key:", import.meta.env.VITE_GEMINI_API_KEY);
      console.log("Fallback response:", fallback);
      console.log("Request URL: /gemini/v1beta/models/gemini-2.0-flash:generateContent");
      const res = await axios.post(
        '/gemini/v1beta/models/gemini-2.0-flash:generateContent',
        { contents: [{ parts: [{ text: prompt }] }] },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY,
          },
        }
      );
      
      return res.data.candidates?.[0]?.content?.parts?.[0]?.text || fallback;
    } catch (err) {
      console.warn("Gemini API error:", err?.response?.data || err.message);
      return fallback;
    }
  };

  useEffect(() => {
    const runAgents = async () => {
      setLoading(true);
      setError('');
      try {
        // search nearby places
        const res = await axios.get('/fsq/places/search', {
          headers: { 
            Authorization: `Bearer ${import.meta.env.VITE_FSQ_API_KEY}`,
            accept: "application/json",
            "X-Places-Api-Version": "2025-06-17", 
          },
          params: { ll: `${location.lat},${location.lon}`, limit: 2 },
        });
        
        const topPlaces = res.data.results || [];
        const detailsPromises = topPlaces.map((p) => fetchPlaceDetails(p.fsq_place_id));
        const placeDetails = await Promise.all(detailsPromises);
        setDetails(placeDetails);
        
        const names = placeDetails.map(p => p.name).join(', ');
        console.log("Found places:", names);
        // agent 1: Itinerary planner
        const planText = await getGeminiResponse(
          `Create a concise, walkable day itinerary for a solo traveler near these places: ${names}. Output 4-6 steps with time windows and short tips.`,
          "🕘 9:00 AM – Start your morning with a coffee nearby\n🕙 10:00 AM – Visit the main attraction\n🕛 12:00 PM – Lunch at a local spot\n🕒 3:00 PM – Explore a scenic area\n🕔 5:00 PM – Relax in a park\n🕖 7:00 PM – Dinner before heading back"
        );
        setPlan(planText);
        
        // agent 2: Micro-challenge generator
        const challengeText = await getGeminiResponse(
          `Suggest one fun, culturally-aware micro-challenge for a solo traveler near these places: ${names}. Keep it to 2-3 sentences.`,
          "🎯 Micro-challenge: Talk to a local vendor and ask them for their favorite hidden spot in the city. Write it down and add it to your travel journal!"
        );
        setChallenge(challengeText);
      } catch (e) {
        console.error("Agent run failed:", e.message);
        setError('Failed to run agents. Check API keys.');
      } finally {
        setLoading(false);
      }
    };
    runAgents();
  }, [location]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">🧭 Planner Agent</h2>
      {loading && <p>Thinking…</p>}
      {error && <p className="text-red-600">{error}</p>}
      <p className="bg-white p-4 rounded shadow whitespace-pre-line">{plan}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🎯 Challenge Agent</h2>
      <p className="bg-white p-4 rounded shadow whitespace-pre-line">{challenge}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">ℹ️ Explainer Agent (FSQ Details)</h2>
      <ul>
        {details.map((d) => (
          <li key={d.fsq_place_id} className="bg-gray-50 p-3 mb-2 rounded shadow">
            <strong>{d.name}</strong><br />
            📍 {d.location?.formatted_address || '—'}<br />
            ☎️ {d.tel || 'N/A'}<br />
            🌐 {d.website || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}
