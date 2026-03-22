import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>SaveClip &copy; {new Date().getFullYear()} &mdash; Free video downloader. No watermarks.</p>
      </div>
    </footer>
  );
}
