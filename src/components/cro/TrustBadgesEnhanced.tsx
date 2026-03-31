import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Shield, Star, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TARGET_COUNT = 10247;
const ANIMATION_DURATION = 2000;

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('de-DE')}
      {suffix}
    </span>
  );
}

interface TrustBadgesEnhancedProps {
  showUserCounter?: boolean;
}

export default function TrustBadgesEnhanced({ showUserCounter = true }: TrustBadgesEnhancedProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Animated user counter */}
      {showUserCounter && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <Users className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
          <p className="font-paragraph text-sm text-gray-700">
            <strong className="font-bold text-primary text-base">
              Über <AnimatedCounter target={TARGET_COUNT} /> zufriedene Nutzer
            </strong>{' '}
            aus NRW
          </p>
        </div>
      )}

      {/* Star rating */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/10 border border-secondary/20">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 flex-shrink-0 ${i < 5 ? 'fill-secondary text-secondary' : 'text-gray-300'}`}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="font-paragraph text-sm text-gray-700">
          <strong className="font-bold">4,8 / 5</strong>{' '}
          <span className="text-gray-500">(2.341 Bewertungen)</span>
        </p>
      </div>

      {/* Trust badges row */}
      <div className="flex flex-wrap gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-primary" aria-hidden="true" />
          <span>Kostenlos &amp; unverbindlich</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
          <Award className="w-3.5 h-3.5 flex-shrink-0 text-primary" aria-hidden="true" />
          <span>TÜV-geprüfte Vergleichsdaten</span>
        </div>

        <Link
          to="/datenschutz"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
        >
          <Shield className="w-3.5 h-3.5 flex-shrink-0 text-primary" aria-hidden="true" />
          <span>Datenschutz nach DSGVO</span>
        </Link>
      </div>
    </div>
  );
}
