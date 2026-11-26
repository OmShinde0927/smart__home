import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "../App.jsx";
import PageTransition, { Heading } from "../components/PageTransition.jsx";

export default function Impact() {
  const { impacts } = useContent();
  const [bill, setBill] = useState(200);
  const [open, setOpen] = useState(null);

  // Average of the three cited benchmarks (20%, 15%, 25%) = 20% of the monthly utility bill
  const rates = impacts.filter((i) => i.saving).map((i) => i.saving);
  const avg = rates.reduce((a, b) => a + b, 0) / rates.length / 100;
  const monthly = Math.round(bill * avg);

  return (
    <PageTransition>
      <section className="section">
        <Heading no="03" kicker="MEASURABLE COMFORT, SECURITY & EFFICIENCY" title="Positive Impact of Smart Home Systems"
          text="Explore all 11 smart home capabilities and adjust the monthly utility slider to preview estimated energy savings." />
        <motion.div className="grid4" initial="hide" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          variants={{ hide: {}, show: { transition: { staggerChildren: 0.06 } } }}>
          {impacts.map((m, i) => (
            <motion.div key={m.name} className={`card impact ${open === i ? "selected" : ""}`} onClick={() => setOpen(open === i ? null : i)}
              variants={{ hide: { opacity: 0, y: 30, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }} whileHover={{ y: -4 }} layout>
              <div className="row between"><span className="no">{String(i + 1).padStart(2, "0")} / 11</span><span className="badge">{m.badge}</span></div>
              <h3>{m.name}</h3>
              <p>{m.text}</p>
            </motion.div>
          ))}
          <motion.div className="card savings" variants={{ hide: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
            <div className="row between"><small>SAVINGS PREVIEW</small><strong>${bill}/mo</strong></div>
            <input type="range" min="50" max="600" step="10" value={bill} onChange={(e) => setBill(+e.target.value)} aria-label="Monthly utility bill" />
            <div className="row between end">
              <div><small>Est. monthly savings</small>
                <motion.strong key={monthly} className="money" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>${monthly}</motion.strong></div>
              <div className="right"><small>Annual</small><strong className="green">${monthly * 12}/yr</strong></div>
            </div>
            <p className="note">Uses the cited benchmarks: up to 20% blinds, 15% water heater, 25% smart plug and lights. These are estimates, not guarantees.</p>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
