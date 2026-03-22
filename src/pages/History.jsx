import { useState } from 'react';
import './History.css';

export default function History() {
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem('download_history') || '[]')
  );

  const clearHistory = () => {
    localStorage.removeItem('download_history');
    setHistory([]);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Download History</h1>
        <p className="page-subtitle">Your recent downloads are stored locally in your browser.</p>

        {history.length > 0 ? (
          <>
            <div className="history-toolbar">
              <span>{history.length} item{history.length !== 1 ? 's' : ''}</span>
              <button className="btn-clear" onClick={clearHistory}>
                Clear History
              </button>
            </div>
            <div className="history-list">
              {history.map((item, i) => (
                <div className="history-item" key={i}>
                  <div className="history-info">
                    <div className="history-platform">{item.platform}</div>
                    <div className="history-url" title={item.url}>{item.url}</div>
                  </div>
                  <div className="history-date">{formatDate(item.date)}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>No downloads yet. Go to Home and paste a video link!</p>
          </div>
        )}
      </div>
    </div>
  );
}
