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
      <div className="bg-background text-on-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-headline-md text-headline-md mb-lg text-secondary">Day not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-lg py-md bg-secondary text-on-secondary hover:bg-secondary/80 rounded-lg transition-colors font-label-caps text-label-caps"
          >
            Back to Itinerary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 w-full bg-surface-bright shadow-soft flex items-center justify-between px-gutter py-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-sm text-secondary hover:text-secondary/80 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="hidden sm:inline font-label-caps text-label-caps font-semibold">Back</span>
        </button>
        <h1 className="font-headline-md text-headline-md text-center flex-1 text-primary">{day.date}</h1>
        <div className="w-10"></div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative h-64 bg-gradient-to-br from-primary via-slate-900 to-primary flex items-end overflow-hidden" style={{
        backgroundImage: "linear-gradient(135deg, rgba(0, 13, 34, 0.6) 0%, rgba(0, 13, 34, 0.8) 100%), url('/images/europe.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="w-full px-gutter py-lg relative z-10">
          <h2 className="font-display-lg text-display-lg text-white mb-sm">{day.city}</h2>
          <p className="font-body-md text-body-md text-white/90">{day.day}, {day.date}</p>
        </div>
      </section>

      <main className="max-w-2xl mx-auto">
        {/* Date and Weekday Card */}
        <div className="mx-margin-mobile mt-xl mb-lg rounded-xl bg-surface-container-low border-l-4 border-secondary p-lg shadow-soft">
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-sm">Day of the Week</p>
          <h2 className="font-display-lg text-display-lg text-primary mb-md">{day.day}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{day.date}</p>
        </div>

        {/* City and Location Card */}
        <div className="mx-margin-mobile mb-lg rounded-xl bg-secondary-fixed/15 border-l-4 border-secondary p-lg shadow-soft hover:shadow-lg transition-all">
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined text-base">location_on</span>
            Location
          </p>
          <h3 className="font-headline-md text-headline-md text-primary">{day.city}</h3>
        </div>

        {/* Activities Card */}
        <div className="mx-margin-mobile mb-lg rounded-xl bg-secondary-fixed/15 border-l-4 border-secondary p-lg shadow-soft hover:shadow-lg transition-all">
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined text-base">star</span>
            Activities
          </p>
          <p className="font-body-md text-body-md text-on-surface leading-relaxed">{day.activities}</p>
        </div>

        {/* Notes / Reminders Card */}
        {day.notes && (
          <div className="mx-margin-mobile mb-lg rounded-xl bg-error-container/20 border-l-4 border-error p-lg shadow-soft">
            <p className="font-label-caps text-label-caps text-error uppercase tracking-widest mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-base">info</span>
              Important Notes
            </p>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed">{day.notes}</p>
          </div>
        )}

        {/* Navigation Cards */}
        <div className="mx-margin-mobile grid grid-cols-2 gap-md mt-xl">
          {prevDay ? (
            <button
              onClick={() => navigate(`/day/${parseInt(dayIndex) - 1}`)}
              className="rounded-lg bg-surface-container-low border-l-4 border-secondary p-md shadow-soft hover:shadow-lg transition-all active:scale-95 text-left"
            >
              <p className="font-label-caps text-label-caps text-secondary uppercase tracking-wider mb-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Previous
              </p>
              <p className="font-headline-md text-headline-md text-primary text-lg">{prevDay.date}</p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">{prevDay.city}</p>
            </button>
          ) : (
            <div></div>
          )}
          {nextDay ? (
            <button
              onClick={() => navigate(`/day/${parseInt(dayIndex) + 1}`)}
              className="rounded-lg bg-surface-container-low border-l-4 border-secondary p-md shadow-soft hover:shadow-lg transition-all active:scale-95 text-left"
            >
              <p className="font-label-caps text-label-caps text-secondary uppercase tracking-wider mb-sm flex items-center gap-xs">
                <span>Next</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </p>
              <p className="font-headline-md text-headline-md text-primary text-lg">{nextDay.date}</p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">{nextDay.city}</p>
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </div>
  );
}
