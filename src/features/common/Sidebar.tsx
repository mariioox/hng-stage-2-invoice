import { useTheme } from '../../context/ThemeContext';
import Logo from './Logo';

function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Logo />
      </div>

      <div className="sidebar-middle">
        {/* Spacer for middle section */}
      </div>

      <div className="sidebar-bottom">
        <button className="btn-theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? (
            // Moon icon for dark mode
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8 8 0 1010.586 10.586z"
                fill="currentColor"
              />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="3" fill="currentColor" />
              <path
                d="M10 1v3M10 16v3M19 10h-3M7 10H4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16.657 3.343l-2.121 2.121M5.465 14.535l-2.121 2.121M16.657 16.657l-2.121-2.121M5.465 5.465L3.344 3.344"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        <div className="user-avatar">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&q=80"
            alt="User avatar"
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
