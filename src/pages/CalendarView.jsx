import { useNavigate } from 'react-router-dom';
import { itineraryData } from '../data/itinerary';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CITY_STYLES = {
  'Munich':           { dot: 'bg-secondary',          tint: 'bg-secondary-fixed/40',        border: 'border-secondary' },
  'Leverkusen':       { dot: 'bg-on-tertiary-container', tint: 'bg-tertiary-fixed/50',      border: 'border-on-tertiary-container' },
  'Vienna/Budapest':  { dot: 'bg-on-primary-container', tint: 'bg-primary-fixed/50',        border: 'border-on-primary-container' },
  '-':                { dot: 'bg-outline',            tint: 'bg-surface-container',         border: 'border-outline' },
};

const TRIP_YEAR = 2026;

const MONTH_NAME_TO_INDEX = {
  'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
  'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11,
};

function parseTripDate(dateStr) {
  // Examples: "8th July", "1st August", "21st July"
  const match = dateStr.match(/^(\d+)\w*\s+(\w+)$/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = MONTH_NAME_TO_INDEX[match[2]];
  if (month === undefined) return null;
  return new Date(TRIP_YEAR, month, day);
}

function buildMonthGrid(year, monthIndex, itineraryByKey) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const lastOfMonth = new Date(year, monthIndex + 1, 0);
  const daysInMonth = lastOfMonth.getDate();

  // JS getDay(): 0=Sun..6=Sat. We want Monday-first, so map to 0=Mon..6=Sun.
  const jsDay = firstOfMonth.getDay();
  const leadingBlanks = (jsDay + 6) % 7;

  const cells = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, monthIndex, d);
    const key = `${year}-${monthIndex}-${d}`;
    const entry = itineraryByKey.get(key);
    cells.push({ date, day: d, entry });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function CalendarView() {
  const navigate = useNavigate();

  const itineraryByKey = new Map();
  itineraryData.forEach((entry, index) => {
    const date = parseTripDate(entry.date);
    if (date) {
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      itineraryByKey.set(key, { ...entry, index });
    }
  });

  const months = [
    { name: 'July 2026', weeks: buildMonthGrid(2026, 6, itineraryByKey) },
    { name: 'August 2026', weeks: buildMonthGrid(2026, 7, itineraryByKey) },
  ];

  return (
    <div className="space-y-xl">
      {/* Mobile hint */}
      <p className="md:hidden font-label-caps text-label-caps text-on-surface-variant text-center px-md py-sm bg-surface-container rounded-lg">
        Best viewed on a larger screen
      </p>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-md px-sm">
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mr-sm">Cities</p>
        {Object.entries(CITY_STYLES).filter(([city]) => city !== '-').map(([city, style]) => (
          <div key={city} className="flex items-center gap-xs">
            <span className={`w-3 h-3 rounded-full ${style.dot}`}></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">{city}</span>
          </div>
        ))}
      </div>

      {months.map((month) => (
        <section key={month.name}>
          <h3 className="font-headline-md text-headline-md text-primary mb-md px-sm">{month.name}</h3>

          <div className="rounded-xl bg-surface-container-lowest shadow-soft overflow-hidden border border-outline-variant">
            {/* Weekday header */}
            <div className="grid grid-cols-7 bg-surface-container-low border-b border-outline-variant">
              {WEEKDAYS.map((wd) => (
                <div key={wd} className="px-sm py-md text-center">
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">{wd}</span>
                </div>
              ))}
            </div>

            {/* Weeks */}
            {month.weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 border-b border-outline-variant last:border-b-0">
                {week.map((cell, ci) => {
                  if (!cell) {
                    return <div key={ci} className="min-h-[110px] bg-surface-container-low/40 border-r border-outline-variant last:border-r-0"></div>;
                  }

                  const { day, entry } = cell;
                  const style = entry ? (CITY_STYLES[entry.city] || CITY_STYLES['-']) : null;

                  if (!entry) {
                    return (
                      <div key={ci} className="min-h-[110px] p-sm border-r border-outline-variant last:border-r-0 bg-surface-container-lowest">
                        <p className="font-label-caps text-label-caps text-on-surface-variant/50">{day}</p>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={ci}
                      onClick={() => navigate(`/day/${entry.index}`)}
                      className={`min-h-[110px] p-sm border-r border-outline-variant last:border-r-0 text-left flex flex-col gap-xs ${style.tint} hover:brightness-95 active:scale-[0.98] transition-all border-l-4 ${style.border}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-title-sm text-title-sm text-primary">{day}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`}></span>
                      </div>
                      <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">{entry.city}</p>
                      {entry.activities && (
                        <p className="font-body-md text-[11px] leading-tight text-on-surface-variant line-clamp-3">
                          {entry.activities}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
