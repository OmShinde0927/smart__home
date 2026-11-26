import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  ["/", "Overview"], ["/problems", "Problems"], ["/architecture", "Architecture"],
  ["/impact", "Impact"],
];

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.header className="nav" initial={{ y: -90 }} animate={{ y: ready ? 0 : -90 }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-icon">⌂</span> SMART HOME
      </Link>
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>☰</button>
      <nav className={open ? "open" : ""}>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
            {({ isActive }) => (
              <>
                {label}
                {isActive && <motion.span layoutId="nav-underline" className="underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <Link to="/architecture" className="btn primary nav-cta">Explore system →</Link>
    </motion.header>
  );
}
