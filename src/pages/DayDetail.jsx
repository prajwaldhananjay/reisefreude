import { useParams, useNavigate } from 'react-router-dom';
import { itineraryData } from '../data/itinerary';

export default function DayDetail() {
  const { dayIndex } = useParams();
  const navigate = useNavigate();
  const day = itineraryData[parseInt(dayIndex)];
  const prevDay = parseInt(dayIndex) > 0 ? itineraryData[parseInt(dayIndex) - 1] : null;
  const nextDay = parseInt(dayIndex) < itineraryData.length - 1 ? itineraryData[parseInt(dayIndex) + 1] : null;

  if (!day) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-blue-900 to-navy text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Day not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Back to Itinerary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-blue-900 to-navy text-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-navy/80 backdrop-blur-md border-b border-white/10 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-blue-300 hover:text-white transition-colors text-xl font-semibold"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-display font-bold text-center flex-1">
          {day.date}
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 pb-24 max-w-2xl mx-auto">
        {/* Date and Weekday */}
        <div className="rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 p-6 mb-6">
          <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-2">Day of the Week</p>
          <h2 className="text-4xl font-display font-bold text-white mb-4">{day.day}</h2>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-lg text-white/90">{day.date}</p>
          </div>
        </div>

        {/* City and Location */}
        <div className="rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 p-6 mb-6">
          <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-3">📍 Stay in / Visit</p>
          <h3 className="text-3xl font-display font-bold text-white mb-4">{day.city}</h3>
        </div>

        {/* Activities */}
        <div className="rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 p-6 mb-6">
          <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-3">🎯 Activities</p>
          <p className="text-lg text-white/90 leading-relaxed">{day.activities}</p>
        </div>

        {/* Notes / Reminders */}
        {day.notes && (
          <div className="rounded-xl backdrop-blur-lg bg-yellow-500/10 border border-yellow-400/30 p-6 mb-6">
            <p className="text-sm font-semibold text-yellow-300 uppercase tracking-wider mb-3">📝 Important Notes</p>
            <p className="text-white/90 leading-relaxed">{day.notes}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {prevDay ? (
            <button
              onClick={() => navigate(`/day/${parseInt(dayIndex) - 1}`)}
              className="rounded-xl backdrop-blur-lg bg-white/10 hover:bg-white/15 border border-white/20 p-4 transition-all duration-300"
            >
              <p className="text-xs text-blue-200 mb-2">← Previous</p>
              <p className="font-display font-bold text-white">{prevDay.date}</p>
              <p className="text-sm text-blue-100 mt-1">{prevDay.city}</p>
            </button>
          ) : (
            <div></div>
          )}
          {nextDay ? (
            <button
              onClick={() => navigate(`/day/${parseInt(dayIndex) + 1}`)}
              className="rounded-xl backdrop-blur-lg bg-white/10 hover:bg-white/15 border border-white/20 p-4 transition-all duration-300"
            >
              <p className="text-xs text-blue-200 mb-2">Next →</p>
              <p className="font-display font-bold text-white">{nextDay.date}</p>
              <p className="text-sm text-blue-100 mt-1">{nextDay.city}</p>
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-lg border-t border-white/10 px-4 py-3">
        <div className="flex justify-around items-center max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg bg-white/10 text-white text-xs font-semibold"
          >
            <span className="text-lg">📋</span>
            Itinerary
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg text-blue-300 text-xs font-semibold hover:bg-white/5">
            <span className="text-lg">🗺️</span>
            Map
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg text-blue-300 text-xs font-semibold hover:bg-white/5">
            <span className="text-lg">📄</span>
            Documents
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg text-blue-300 text-xs font-semibold hover:bg-white/5">
            <span className="text-lg">👤</span>
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
