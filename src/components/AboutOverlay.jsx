import { about } from '../data/content'

export default function AboutOverlay({ open, onClose }) {
  return (
    <div
      className={`about-overlay${open ? ' is-open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="about-panel">
        <div className="about-bio">
          {about.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="about-info">
          {about.columns.map((col) => (
            <div key={col.title}>
              <h6>{col.title}</h6>
              <ul>
                {col.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <button className="about-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  )
}
