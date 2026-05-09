import { useState, useEffect } from 'react';

const CITY_COORDS = {
  Munich:         { lat: 48.1351, lon: 11.5820 },
  Leverkusen:     { lat: 51.0459, lon: 6.9993  },
  Vienna:         { lat: 48.2082, lon: 16.3738 },
  'Vienna/Budapest': { lat: 48.2082, lon: 16.3738 },
  Budapest:       { lat: 47.4979, lon: 19.0402 },
};

function parseTripDate(dateStr, year = 2026) {
  // e.g. "8th July", "23rd July", "1st August"
  const match = dateStr.match(/(\d+)(?:st|nd|rd|th)\s+(\w+)/);
  if (!match) return null;
  const day = parseInt(match[1]);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const month = monthNames.findIndex(m => m.toLowerCase() === match[2].toLowerCase());
  if (month === -1) return null;
  return new Date(year, month, day);
}

export function useWeather(city, dateStr) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const coords = CITY_COORDS[city];
    if (!coords || !dateStr) return;

    const tripDate = parseTripDate(dateStr, 2026);
    if (!tripDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = (tripDate - today) / (1000 * 60 * 60 * 24);

    const fmt = d => d.toISOString().split('T')[0];

    let url;
    if (diffDays <= 16) {
      // Live forecast
      url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&start_date=${fmt(tripDate)}&end_date=${fmt(tripDate)}`;
    } else {
      // Historical same date from 2024 as climate proxy
      const histDate = parseTripDate(dateStr, 2024);
      url = `https://archive-api.open-meteo.com/v1/archive?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&start_date=${fmt(histDate)}&end_date=${fmt(histDate)}`;
    }

    setLoading(true);
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const max = data?.daily?.temperature_2m_max?.[0];
        const min = data?.daily?.temperature_2m_min?.[0];
        if (max != null && min != null) {
          setWeather({ max: Math.round(max), min: Math.round(min), historical: diffDays > 16 });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [city, dateStr]);

  return { weather, loading };
}
