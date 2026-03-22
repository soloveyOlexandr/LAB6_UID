import './Platforms.css';

const platforms = [
  { name: 'TikTok', desc: 'Videos without watermark', emoji: '🎵', color: '#00f2ea' },
  { name: 'Instagram', desc: 'Reels, Stories, Posts', emoji: '📸', color: '#E1306C' },
  { name: 'YouTube', desc: 'Videos & Shorts', emoji: '▶️', color: '#FF0000' },
  { name: 'Facebook', desc: 'Videos & Reels', emoji: '📘', color: '#1877F2' },
  { name: 'Pinterest', desc: 'Videos & Images', emoji: '📌', color: '#E60023' },
  { name: 'Twitch', desc: 'Clips', emoji: '🎮', color: '#9146FF' },
];

export default function Platforms() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Supported Platforms</h1>
        <p className="page-subtitle">SaveClip supports downloading videos from all major social media and video platforms.</p>

        <div className="platforms-grid">
          {platforms.map((p) => (
            <div className="platform-card" key={p.name}>
              <div
                className="platform-logo"
                style={{ background: `${p.color}20`, color: p.color }}
              >
                {p.emoji}
              </div>
              <div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
