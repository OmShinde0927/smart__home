import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <strong>● SMART HOME</strong>
      <span>Better days ahead. Good things ahead. Thank you for your attention.</span>
      <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top</Link>
    </footer>
  );
}
