import { motion } from 'framer-motion';
import Panel, { Heading, Words } from './Panel';
import { cities } from './content';

const C = 210; // map centre, x
const CY = 196; // map centre, y (cities sit mostly north and east of Accra)
const R = 176; // radius of the 14,000 km ring
const rOf = (km: number) => R * Math.pow(km / 14000, 0.62);

function CityChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center border border-fg/15 bg-panel/70 px-3.5 py-2 font-mono text-[11px] tracking-[0.08em] backdrop-blur-md transition-colors duration-300 hover:border-fg">
      {name}
    </span>
  );
}

function RadarMap() {
  return (
    <svg viewBox="0 0 420 330" className="h-auto w-full overflow-hidden" role="img" aria-label="Map of distances from Accra: Lisbon 3,791 km, Madrid 3,887 km, Barcelona 3,986 km, London 5,104 km, Rio de Janeiro 5,644 km, Dubai 6,281 km, New York 8,240 km, Tokyo 13,801 km.">
      {[2000, 5000, 10000, 14000].map((km) => (
        <g key={km}>
          <circle cx={C} cy={CY} r={rOf(km)} fill="none" stroke="currentColor" strokeOpacity="0.16" strokeDasharray="1 5" />
          <text x={C + rOf(km) * 0.72 + 4} y={CY + rOf(km) * 0.69 + 3} className="fill-muted font-mono text-[9px]">
            {km.toLocaleString('en-GB')} km
          </text>
        </g>
      ))}
      <text x={C} y={CY - R - 6 > 10 ? CY - R - 6 : 12} textAnchor="middle" className="fill-muted font-mono text-[9px]">N</text>

      {/* routes first, so every label sits on top of every line */}
      {cities.map((c) => {
        const a = ((c.shown - 90) * Math.PI) / 180;
        const r = rOf(c.km);
        const x = C + Math.cos(a) * r;
        const y = CY + Math.sin(a) * r;
        return (
          <g key={`route-${c.name}`}>
            <line x1={C} y1={CY} x2={x} y2={y} stroke="currentColor" strokeOpacity="0.16" strokeWidth="5" strokeLinecap="round" />
            <line x1={C} y1={CY} x2={x} y2={y} stroke="currentColor" strokeWidth="1.6" className="flow" />
          </g>
        );
      })}

      {cities.map((c, i) => {
        const a = ((c.shown - 90) * Math.PI) / 180;
        const r = rOf(c.km);
        const x = C + Math.cos(a) * r;
        const y = CY + Math.sin(a) * r;
        const dy = c.dy ?? 0;
        const lx = c.side === 't' ? x : x + (c.side === 'r' ? 9 : -9);
        const ly = c.side === 't' ? y - 22 : y + 4 + dy;
        const anchor = c.side === 't' ? 'middle' : c.side === 'r' ? 'start' : 'end';
        return (
          <motion.g
            key={c.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
            className="group/city"
          >
            <circle cx={x} cy={y} r="4.5" stroke="currentColor" strokeWidth="1.3" className="fill-bg transition-all duration-300 group-hover/city:fill-fg" />
            <text x={lx} y={ly} textAnchor={anchor} className="label-halo fill-fg font-mono text-[11px]">
              {c.name}
            </text>
            <text x={lx} y={ly + 12} textAnchor={anchor} className="label-halo fill-muted font-mono text-[9px]">
              {c.km.toLocaleString('en-GB')} km
            </text>
          </motion.g>
        );
      })}

      <circle cx={C} cy={CY} r="7" fill="none" stroke="currentColor" strokeOpacity="0.6">
        <animate attributeName="r" values="7;26" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={C} cy={CY} r="7" fill="currentColor" />
      <text x={C} y={CY + 26} textAnchor="middle" className="fill-fg font-titleFont text-[15px] italic">
        Accra
      </text>
    </svg>
  );
}

export default function Where() {
  return (
    <section data-scene={0.86} data-chapter="Location" className="wrap py-[clamp(4rem,10vw,8rem)]">
      <Heading label="Where I work">
        Built in Accra. <span className="text-fg/40">Working globally.</span>
      </Heading>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
        <Panel className="p-5 md:p-8 lg:col-span-6">
          <RadarMap />
        </Panel>
        <div className="on-world flex flex-col gap-8 lg:col-span-6">
          <Words
            className="text-[15px] leading-relaxed text-fg/75 md:text-base"
            text="Based in Accra, building for the world. I partner with founders, companies and investors across Africa, Europe, the Middle East, Asia and the Americas, and the platforms I lead are engineered to scale far beyond the city they started in."
          />
          <div>
            <p className="eyebrow mb-4">Working across</p>
            <div className="flex flex-wrap gap-2.5">
              <CityChip name="Accra" />
              {cities.map((c) => (
                <CityChip key={c.name} name={c.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
