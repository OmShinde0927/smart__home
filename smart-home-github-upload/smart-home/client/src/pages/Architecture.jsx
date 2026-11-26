import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "../App.jsx";
import PageTransition, { Heading } from "../components/PageTransition.jsx";

export default function Architecture() {
  const { layers } = useContent();
  const { hash } = useLocation();
  const initial = Math.max(0, (parseInt(hash.replace("#layer-", ""), 10) || 1) - 1);
  const [active, setActive] = useState(initial);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const timer = useRef(null);
  const layer = layers[active];

  useEffect(() => () => clearInterval(timer.current), []);

  const simulate = () => {
    if (running) return;
    setRunning(true); setStep(0); setActive(0);
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      if (i >= layers.length) { clearInterval(timer.current); setTimeout(() => { setRunning(false); setStep(-1); }, 900); return; }
      setStep(i); setActive(i);
    }, 1100);
  };

  return (
    <PageTransition>
      <section className="section">
        <div className="row between">
          <Heading no="02" kicker="FIVE-LAYER SYSTEM ARCHITECTURE" title="Smart Home Solution" />
          <button className="btn primary" onClick={simulate} disabled={running}>{running ? "Signal running…" : "▶ Simulate signal flow"}</button>
        </div>

        <div className="flow">
          <div className="flow-line"><motion.div className="flow-fill" animate={{ scaleX: step < 0 ? 0 : (step + 1) / layers.length }} transition={{ duration: 0.9 }} /></div>
          <div className="grid5">
            {layers.map((l, i) => (
              <motion.button key={l.id} id={`layer-${l.id}`} className={`card layer ${i === active ? "selected" : ""} ${i <= step ? "lit" : ""}`}
                onClick={() => !running && setActive(i)} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} animate={i === step ? { scale: [1, 1.04, 1] } : {}}>
                <span className="tag">LAYER 0{l.id}</span>
                <h3>{l.name}</h3>
                <p>{l.short}</p>
                <div className="mini">{l.items.map(([n]) => <code key={n}>{n}</code>)}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={layer.id} className="card layer-detail" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
            <div>
              <span className="pill">LAYER 0{layer.id} · {layer.name.toUpperCase()}</span>
              <h3 className="big">{layer.name}</h3>
              <p className="lead">{layer.short}</p>
              <div className="grid2">
                {layer.items.map(([n, d], i) => (
                  <motion.div key={n} className="card small" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.07 }}>
                    <strong>{n}</strong><span>{d}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="pipeline">
              <small>SIGNAL PIPELINE STAGE</small>
              {["Sensors", "Controller", "Protocols", "Actuators", "App & Voice"].map((s, i) => (
                <motion.div key={s} className={i === active ? "stage on" : "stage"} animate={{ x: i === active ? 12 : 0 }}>{s}</motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </PageTransition>
  );
}
