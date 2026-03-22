import { useState } from 'react';
import './Home.css';

const PLATFORMS = [
  { name: 'TikTok', pattern: /tiktok\.com/ },
  { name: 'Instagram', pattern: /instagram\.com/ },
  { name: 'YouTube', pattern: /youtube\.com|youtu\.be/ },
  { name: 'Facebook', pattern: /facebook\.com|fb\.watch/ },
  { name: 'Pinterest', pattern: /pinterest\.com|pin\.it/ },
  { name: 'Twitch', pattern: /twitch\.tv/ },
];

function detectPlatform(url) {
  for (const p of PLATFORMS) {
    if (p.pattern.test(url)) return p.name;
  }
  return null;
}

const API_BASE = 'http://localhost:3001';

async function fetchVideoInfo(videoUrl) {
  const response = await fetch(`${API_BASE}/api/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: videoUrl }),
  });

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message || 'Failed to fetch video info');
  }

  return data;
}

function buildDownloadUrl(videoUrl, formatId) {
  return `${API_BASE}/api/download?url=${encodeURIComponent(videoUrl)}&format=${encodeURIComponent(formatId || 'best')}`;
}

function addToHistory(entry) {
  const history = JSON.parse(localStorage.getItem('download_history') || '[]');
  history.unshift({ ...entry, date: new Date().toISOString() });
  if (history.length > 50) history.pop();
  localStorage.setItem('download_history', JSON.stringify(history));
}

function formatDuration(seconds) {
  if (!seconds) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [loading, setLoading] = useState(false);

  const platform = detectPlatform(url);

  const handleFetch = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setStatus({ type: 'loading', message: 'Fetching video info...' });
    setVideoInfo(null);
    setSelectedQuality(null);

    try {
      const info = await fetchVideoInfo(url.trim());

      setVideoInfo(info);
      setSelectedQuality(info.qualities[0]?.formatId || 'best');
      setStatus({ type: 'success', message: 'Video found! Choose quality and download.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Could not process this link.' });
    }

    setLoading(false);
  };

  const handleDownload = () => {
    if (!videoInfo) return;

    const downloadUrl = buildDownloadUrl(url.trim(), selectedQuality);

    addToHistory({
      url: url.trim(),
      platform: platform || 'Unknown',
      filename: `${videoInfo.title}.mp4`,
    });

    window.open(downloadUrl, '_blank');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleFetch();
  };

  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">Download Videos Without Watermarks</h1>
          <p className="hero-subtitle">
            Paste a link from TikTok, Instagram, YouTube, Facebook, Pinterest or Twitch and save videos in high quality — free and fast.
          </p>

          <div className="download-box">
            <div className="input-group">
              <input
                type="url"
                placeholder="Paste video link here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="btn-download"
                onClick={handleFetch}
                disabled={loading || !url.trim()}
              >
                {loading ? 'Processing...' : 'Get Video'}
              </button>
            </div>

            {platform && (
              <div className="platform-detected">
                Detected: <strong>{platform}</strong>
              </div>
            )}

            {status && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            {videoInfo && (
              <div className="result-card">
                {videoInfo.thumbnail && (
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="result-thumbnail"
                  />
                )}
                <div className="result-info">
                  <p className="result-title">{videoInfo.title}</p>
                  {videoInfo.duration > 0 && (
                    <p className="result-duration">{formatDuration(videoInfo.duration)}</p>
                  )}

                  {videoInfo.qualities.length > 1 && (
                    <div className="quality-selector">
                      <label htmlFor="quality">Quality:</label>
                      <select
                        id="quality"
                        value={selectedQuality || ''}
                        onChange={(e) => setSelectedQuality(e.target.value)}
                      >
                        {videoInfo.qualities.map((q) => (
                          <option key={q.formatId} value={q.formatId}>
                            {q.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button className="btn-save" onClick={handleDownload}>
                    Download MP4
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="features-grid">
          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <h3>No Watermarks</h3>
            <p>Download clean videos without any watermarks or logos overlaid on your content.</p>
          </div>
          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <h3>Lightning Fast</h3>
            <p>Get your download link in seconds. No waiting, no queues, no registration needed.</p>
          </div>
          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <h3>All Platforms</h3>
            <p>Works with TikTok, Instagram, YouTube, Facebook, Pinterest and Twitch.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
