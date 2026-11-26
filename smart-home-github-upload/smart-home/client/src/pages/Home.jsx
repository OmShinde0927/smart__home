import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "../App.jsx";
import PageTransition from "../components/PageTransition.jsx";

const container = { hide: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hide: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  const { hero, scenes, stats } = useContent();
  const [sceneId, setSceneId] = useState(scenes[0].id);
  const scene = scenes.find((s) => s.id === sceneId);
  const words = hero.title.split(" ");

  return (
    <PageTransition>
      <section className="section hero">
        <motion.span className="pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>● INTELLIGENT RESIDENTIAL AUTOMATION</motion.span>
        <div className="hero-grid">
          <h1>
            {words.map((w, i) => (
              <motion.span key={i} className={i >= 5 ? "grad" : ""} style={{ display: "inline-block", marginRight: "0.25em" }}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08, duration: 0.6 }}>
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
            <p className="lead">{hero.text}</p>
            <div className="row">
              <Link to="/problems" className="btn primary">Inspect problems ↓</Link>
              <Link to="/impact" className="btn ghost">11 impact gains</Link>
            </div>
          </motion.div>
        </div>

        <motion.div className="scene-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.7 }}>
          <AnimatePresence mode="wait">
            <motion.div key={scene.id} className="scene-art" style={{ background: `linear-gradient(135deg, ${scene.colors[0]}, ${scene.colors[1]})` }}
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
              <div className="house" aria-hidden>
                <motion.i animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 3 }} />
                <motion.i animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 3.5 }} />
                <motion.i animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2.6 }} />
              </div>
              <div className="scene-info">
                <h3>{scene.title}</h3>
                <p>{scene.text}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="scene-tabs">
            {scenes.map((s) => (
              <button key={s.id} className={s.id === sceneId ? "on" : ""} onClick={() => setSceneId(s.id)}>
                {s.id === sceneId && <motion.span layoutId="scene-pill" className="scene-pill" />}
                <span>{s.name}</span>
              </button>
            ))}
          </div>
          <span className="scene-chip">{scene.climate}</span>
        </motion.div>
      </section>

      <section className="section">
        <motion.div className="stats" variants={container} initial="hide" whileInView="show" viewport={{ once: true }}>
          {stats.map((s) => (
            <motion.div key={s.label} variants={item} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section">
        <motion.div className="tour" variants={container} initial="hide" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          {[
            ["/problems", "See what is wrong with traditional homes", "Three everyday problems, nine specific points, each paired with a smart fix."],
            ["/architecture", "Follow the signal through five layers", "Sensors, controller, protocols, actuators and interface. Run the signal simulation."],
            ["/impact", "Estimate your monthly savings", "Eleven capabilities and a slider that turns published benchmarks into dollars."],
          ].map(([to, t, d]) => (
            <motion.div key={to} variants={item} whileHover={{ y: -6 }}>
              <Link to={to} className="card tour-card">
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="arrow">Open →</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
