import { useEffect, useState } from 'react';

/**
 * The visitor's own clock, read from their browser's time zone.
 * `place` is the zone's city (America/New_York → New York), `zone` its short
 * name (EDT, GMT+1). All empty during server render.
 */
export default function useLocalClock(seconds = false) {
  const [clock, setClock] = useState({ time: '', place: '', zone: '' });
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    // zones like UTC or Etc/GMT+5 name no city
    const place = tz.includes('/') && !tz.startsWith('Etc/') ? (tz.split('/').pop() || '').replace(/_/g, ' ') : '';
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: seconds ? '2-digit' : undefined });
    const zoneFmt = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' });
    const tick = () => {
      const now = new Date();
      const zone = zoneFmt.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value || '';
      setClock({ time: fmt.format(now), place, zone });
    };
    tick();
    const id = setInterval(tick, seconds ? 1000 : 20000);
    return () => clearInterval(id);
  }, [seconds]);
  return clock;
}
