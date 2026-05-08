import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { itineraryData, tripStartDate } from '../data/itinerary';

export default function Overview() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    started: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = tripStartDate - now;

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, started: true });
      } else {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          started: false
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-blue-900 to-navy text-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-navy/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <h1 className="text-3xl font-display font-bold">My Europe Trip</h1>
        <p className="text-sm text-blue-200 mt-1">July 8 - August 3, 2025</p>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 pb-24">
        {/* Live Trip Status Card */}
        <div className="mb-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 p-6 shadow-2xl">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-2">Today</h2>
            <p className="text-lg text-white/90">{dateStr}</p>
          </div>

          <div className="border-t border-white/10 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">Trip Starts In</h3>
            {countdown.started ? (
              <div className="text-center py-6">
                <p className="text-2xl font-display font-bold">🎉 Trip has started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold font-display">{countdown.days}</div>
                  <div className="text-xs text-blue-200 mt-1">Days</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold font-display">{countdown.hours}</div>
                  <div className="text-xs text-blue-200 mt-1">Hours</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold font-display">{countdown.minutes}</div>
                  <div className="text-xs text-blue-200 mt-1">Min</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold font-display">{countdown.seconds}</div>
                  <div className="text-xs text-blue-200 mt-1">Sec</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Itinerary Cards */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-blue-200 uppercase tracking-wider px-1 mb-4">Your Itinerary</h2>
          {itineraryData.map((day, index) => (
            <button
              key={index}
              onClick={() => navigate(`/day/${index}`)}
              className="w-full text-left rounded-xl backdrop-blur-lg bg-white/10 hover:bg-white/15 border border-white/20 p-4 transition-all duration-300 hover:border-white/40 hover:shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-sm font-semibold text-blue-300">{day.day}</span>
                    <span className="text-lg font-display font-bold text-white">{day.date}</span>
                  </div>
                  <div className="text-xl font-display font-bold text-white mb-2">{day.city}</div>
                  <p className="text-sm text-blue-100 line-clamp-2">{day.activities}</p>
                  {day.notes && (
                    <p className="text-xs text-yellow-300 mt-2">📝 {day.notes}</p>
                  )}
                </div>
                <div className="text-xl ml-4">→</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
