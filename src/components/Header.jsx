import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <svg
          className="logo-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="4" y1="6" x2="10" y2="6" />
          <line x1="4" y1="12" x2="16" y2="12" />
          <line x1="4" y1="18" x2="12" y2="18" />
        </svg>
        <span className="logo-text">Everything</span>
        <span className="logo-dot">.</span>
      </div>
    </header>
  );
}

export default Header;
