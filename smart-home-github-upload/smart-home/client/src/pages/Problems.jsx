
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "../ContentContext.jsx";
import PageTransition, { Heading } from "../components/PageTransition.jsx";

export default function Problems() {
  const content = useContent();
  const problems = content?.problems ?? [];

  const [pi, setPi] = useState(0);
  const [pt, setPt] = useState(0);
  const [smart, setSmart] = useState(false);

  const problem = problems[pi];
  const points = problem?.points ?? [];
  const point = points[pt];

  const pick = (i, j = 0) => {
    setPi(i);
    setPt(j);
    setSmart(false);
  };

  if (!problems.length) {
    return (
      <PageTransition>
        <section className="section">
          <p className="error-box">
            No problem content available. Check your API response.
          </p>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="section">

        <Heading
          no="01"
          kicker="TRADITIONAL HOUSE LIMITATIONS"
          title="Problems With Traditional Homes"
          text="Click any problem card or individual bullet point to inspect its exact impact and the smart home resolution."
        />

        {/* Problem Cards */}
        <div className="grid3">
          {problems.map((p, i) => (
            <motion.div
              key={p.id}
              className={`card problem ${i === pi ? "selected" : ""}`}
              onClick={() => pick(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              <span
                className="tag"
                style={{ color: p.tone }}
              >
                PROBLEM 0{i + 1}
              </span>

              <h3>{p.title}</h3>
              <p>{p.summary}</p>

              <ul>
                {p.points.map((x, j) => (
                  <li
                    key={x.title}
                    className={i === pi && j === pt ? "on" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      pick(i, j);
                    }}
                  >
                    {x.title}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Problem Details */}
        <div className="card detail">

          {/* Visual Illustration */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${pi}-${pt}-${smart}`}
              className={`detail-art ${smart ? "smart" : ""}`}
              initial={{ opacity: 0, rotateY: 40 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -40 }}
              transition={{ duration: 0.35 }}
            >

              {/* House Illustration */}
              <div className="house-visual">

                <div className="house-roof">
                  <div className="roof-detail" />
                </div>

                <div className="house-body">

                  <div className="room">
                    <span>💡</span>
                    <small>LIGHTING</small>
                  </div>

                  <div className="room">
                    <span>❄️</span>
                    <small>CLIMATE</small>
                  </div>

                  <div className="room">
                    <span>🔒</span>
                    <small>SECURITY</small>
                  </div>

                  <div className="room">
                    <span>📹</span>
                    <small>CAMERA</small>
                  </div>

                </div>

                <div className="house-base" />
              </div>

              {/* Smart Connection Indicator */}
              {smart && (
                <motion.div
                  className="smart-indicator"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="connection-dot" />
                  SMART SYSTEM CONNECTED
                </motion.div>
              )}

              {/* Status Label */}
              <span className="art-label">
                {smart
                  ? "SMART HOME SOLUTION"
                  : `TRADITIONAL HOME: ${problem.title.toUpperCase()}`}
              </span>

              {/* Toggle Button */}
              <button
                type="button"
                className="btn mint"
                onClick={() => setSmart(!smart)}
              >
                {smart
                  ? "Show traditional issue"
                  : "Show smart solution"}
              </button>

            </motion.div>
          </AnimatePresence>

          {/* Problem Information */}
          <div>

            <span className="pill">
              PROBLEM 0{pi + 1}: {problem.title} · POINT {pt + 1} OF {points.length}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${pi}-${pt}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="big">{point?.title}</h3>
                <p className="lead">{point?.detail}</p>
              </motion.div>
            </AnimatePresence>

            {/* Point Selection */}
            <div className="chips">
              {points.map((x, j) => (
                <button
                  type="button"
                  key={x.title}
                  className={`chip-card ${j === pt ? "on" : ""}`}
                  onClick={() => pick(pi, j)}
                >
                  <small>POINT 0{j + 1}</small>
                  {x.title}
                </button>
              ))}
            </div>

            {/* Smart Home Solution */}
            <div className="counter">
              <div>
                <small>SMART HOME COUNTER-MEASURE</small>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${pi}-${pt}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {point?.fix}
                  </motion.p>
                </AnimatePresence>
              </div>

              <Link
                to={`/architecture#layer-${point?.layer + 1}`}
                className="btn ghost"
              >
                See layer →
              </Link>
            </div>

          </div>
        </div>

      </section>
    </PageTransition>
  );
}
