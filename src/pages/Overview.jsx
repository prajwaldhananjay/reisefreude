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
    <div className="bg-background text-on-surface min-h-screen">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 w-full bg-surface-bright shadow-soft flex items-center justify-between px-gutter py-md">
        <h1 className="font-display-lg text-display-lg text-primary">My Europe Trip</h1>
        <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-variant/50 transition-colors p-sm rounded-full active:scale-95">
          more_vert
        </button>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative h-64 bg-gradient-to-br from-primary via-slate-900 to-primary flex items-end overflow-hidden" style={{
        backgroundImage: "linear-gradient(135deg, rgba(0, 13, 34, 0.6) 0%, rgba(0, 13, 34, 0.8) 100%), url('/images/europe.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="w-full px-gutter py-lg relative z-10">
          <h2 className="font-display-lg text-display-lg text-white mb-sm">Reisefreude</h2>
          <p className="font-body-md text-body-md text-white/90">The joy of traveling</p>
        </div>
      </section>

      <main className="max-w-2xl mx-auto">
        {/* Hero Section / Trip Summary */}
        <section className="px-margin-mobile py-xl">
          <div className="rounded-xl overflow-hidden bg-surface-container-low border-l-4 border-secondary p-lg shadow-soft">
            <div className="flex justify-between items-start mb-md">
              <div>
                <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-xs">Today</p>
                <p className="font-title-sm text-title-sm text-primary">{dateStr}</p>
              </div>
              <div className="bg-secondary-fixed/30 px-md py-sm rounded-full border border-secondary/40">
                <p className="font-label-caps text-label-caps text-secondary flex items-center gap-sm">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {countdown.started ? '✨ Journey started' : `${countdown.days} days to go`}
                </p>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant uppercase tracking-wider">July 8 - August 3, 2026</p>
          </div>
        </section>

        {/* Countdown Section */}
        {!countdown.started && (
          <section className="px-margin-mobile mb-xl">
            <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-lg px-sm">Trip Starts In</p>
            <div className="grid grid-cols-4 gap-md">
              <div className="rounded-lg bg-secondary-fixed/20 border border-secondary/40 p-md text-center hover:border-secondary/60 transition-colors">
                <p className="font-display-lg text-display-lg text-secondary">{countdown.days}</p>
                <p className="font-label-caps text-label-caps text-secondary/70 uppercase tracking-wider mt-sm">Days</p>
              </div>
              <div className="rounded-lg bg-secondary-fixed/20 border border-secondary/40 p-md text-center hover:border-secondary/60 transition-colors">
                <p className="font-display-lg text-display-lg text-secondary">{countdown.hours}</p>
                <p className="font-label-caps text-label-caps text-secondary/70 uppercase tracking-wider mt-sm">Hours</p>
              </div>
              <div className="rounded-lg bg-secondary-fixed/20 border border-secondary/40 p-md text-center hover:border-secondary/60 transition-colors">
                <p className="font-display-lg text-display-lg text-secondary">{countdown.minutes}</p>
                <p className="font-label-caps text-label-caps text-secondary/70 uppercase tracking-wider mt-sm">Mins</p>
              </div>
              <div className="rounded-lg bg-secondary-fixed/20 border border-secondary/40 p-md text-center hover:border-secondary/60 transition-colors">
                <p className="font-display-lg text-display-lg text-secondary">{countdown.seconds}</p>
                <p className="font-label-caps text-label-caps text-secondary/70 uppercase tracking-wider mt-sm">Secs</p>
              </div>
            </div>
          </section>
        )}

        {/* Itinerary List */}
        <section className="px-margin-mobile mb-xl">
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-lg px-sm">Your Itinerary</p>
          <div className="space-y-lg relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-5 top-2 bottom-2 w-[2px] bg-secondary-fixed-dim"></div>

            {itineraryData.map((day, index) => (
              <div
                key={index}
                className="relative flex gap-lg items-start pl-10 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-secondary ring-4 ring-white z-10 group-hover:scale-125 transition-transform"></div>

                {/* Card Content */}
                <button
                  onClick={() => navigate(`/day/${index}`)}
                  className="w-full bg-surface-container-lowest p-md rounded-xl shadow-soft hover:shadow-lg transition-all border-l-4 border-secondary flex flex-col text-left active:scale-95"
                >
                  <div className="flex justify-between items-start gap-md flex-1">
                    <div className="flex-1 flex flex-col">
                      <p className="font-label-caps text-label-caps text-secondary uppercase tracking-wider mb-xs">{day.day}, {day.date}</p>
                      <h3 className="font-headline-md text-headline-md text-primary mb-sm">{day.city}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 flex-1">{day.activities}</p>
                      {day.notes && (
                        <div className="mt-sm inline-flex items-center gap-xs bg-secondary-container/30 px-sm py-xs rounded-full">
                          <span className="material-symbols-outlined text-sm text-on-secondary-container">info</span>
                          <span className="font-label-caps text-label-caps text-on-secondary-container">{day.notes}</span>
                        </div>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-secondary/60 flex-shrink-0">chevron_right</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
