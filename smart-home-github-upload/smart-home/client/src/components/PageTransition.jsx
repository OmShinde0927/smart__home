import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return <div className="page">{children}</div>;
}

export const Heading = ({ no, kicker, title, text }) => (
  <motion.div className="heading" initial="hide" whileInView="show" viewport={{ once: true, margin: "-60px" }}
    variants={{ hide: {}, show: { transition: { staggerChildren: 0.12 } } }}>
    <div>
      <motion.p className="kicker" variants={{ hide: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>{no} // {kicker}</motion.p>
      <motion.h2 variants={{ hide: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>{title}</motion.h2>
    </div>
    {text && <motion.p className="lead" variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}>{text}</motion.p>}
  </motion.div>
);