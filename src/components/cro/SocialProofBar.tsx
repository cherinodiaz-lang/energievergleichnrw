import { useState, useEffect, useCallback } from 'react';
import { Users, Clock, Timer } from 'lucide-react';

const CITIES = [
  'Dortmund', 'Köln', 'Düsseldorf', 'Essen', 'Duisburg',
  'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster',
  'Gelsenkirchen', 'Aachen', 'Krefeld', 'Mönchengladbach', 'Oberhausen',
];

const MINUTES = [1, 2, 3, 5, 7, 10, 12];

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCountdownDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  d.setHours(23, 59, 59, 0);
  return d;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

interface SocialProofBarProps {
  showCountdown?: boolean;
  showUserCounter?: boolean;
}

export default function SocialProofBar({ showCountdown = true, showUserCounter = true }: SocialProofBarProps) {
  const [visitorCount, setVisitorCount] = useState(0);
  const [lastCity, setLastCity] = useState('');
  const [lastMinutes, setLastMinutes] = useState(3);
  const [countdown, setCountdown] = useState('');
  const [cityIndex, setCityIndex] = useState(0);

  const rotateCity = useCallback(() => {
    setCityIndex((i) => {
      const next = (i + 1) % CITIES.length;
      setLastCity(CITIES[next]);
      setLastMinutes(MINUTES[randomBetween(0, MINUTES.length - 1)]);
      return next;
    });
  }, []);

  useEffect(() => {
    setVisitorCount(randomBetween(12, 47));
    setLastCity(CITIES[randomBetween(0, CITIES.length - 1)]);
    setLastMinutes(MINUTES[randomBetween(0, MINUTES.length - 1)]);

    const cityInterval = setInterval(rotateCity, 8000);
    const visitorInterval = setInterval(() => {
      setVisitorCount(randomBetween(12, 47));
    }, 15000);

    return () => {
      clearInterval(cityInterval);
      clearInterval(visitorInterval);
    };
  }, [rotateCity]);

  useEffect(() => {
    if (!showCountdown) return;
    const endDate = getCountdownDate();

    const tick = () => {
      setCountdown(formatCountdown(endDate.getTime() - Date.now()));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [showCountdown]);

  return (
    <div className="w-full bg-primary/5 border-b border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-sm">
          {showUserCounter && visitorCount > 0 && (
            <div className="flex items-center gap-1.5 text-primary font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <Users className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span>
                <strong>{visitorCount}</strong> Personen vergleichen gerade
              </span>
            </div>
          )}

          {lastCity && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Clock className="w-3.5 h-3.5 flex-shrink-0 text-secondary" aria-hidden="true" />
              <span>
                Letzter Wechsel: vor {lastMinutes} Minute{lastMinutes !== 1 ? 'n' : ''} in{' '}
                <strong>{lastCity}</strong>
              </span>
            </div>
          )}

          {showCountdown && countdown && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Timer className="w-3.5 h-3.5 flex-shrink-0 text-destructive" aria-hidden="true" />
              <span>
                Angebot gültig bis:{' '}
                <strong className="text-destructive tabular-nums">{countdown}</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
