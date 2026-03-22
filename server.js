import express from 'express';
import cors from 'cors';
import ytdlp from 'yt-dlp-exec';

const app = express();
app.use(cors());
app.use(express.json());

// ── Get video info (all platforms via yt-dlp) ──
app.post('/api/info', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ status: 'error', message: 'No URL provided' });
  }

  try {
    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      noPlaylist: true,
    });

    const title = info.title || 'video';
    const thumbnail = info.thumbnail || null;
    const duration = info.duration || 0;

    // Find best mp4 formats with both video + audio
    const combinedFormats = (info.formats || [])
      .filter((f) => f.vcodec !== 'none' && f.acodec !== 'none' && f.ext === 'mp4')
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    // Also find video-only formats (for merging with best audio)
    const videoOnlyFormats = (info.formats || [])
      .filter((f) => f.vcodec !== 'none' && f.acodec === 'none' && f.ext === 'mp4')
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    // Build quality options
    const qualities = [];
    const seenHeights = new Set();

    for (const f of combinedFormats) {
      const h = f.height;
      if (h && !seenHeights.has(h)) {
        seenHeights.add(h);
        qualities.push({ label: `${h}p`, formatId: f.format_id, height: h });
      }
    }

    // Add higher quality video-only options (will be merged with audio by yt-dlp)
    for (const f of videoOnlyFormats) {
      const h = f.height;
      if (h && !seenHeights.has(h) && h >= 720) {
        seenHeights.add(h);
        qualities.push({ label: `${h}p`, formatId: `${f.format_id}+bestaudio[ext=m4a]/best`, height: h, merge: true });
      }
    }

    qualities.sort((a, b) => b.height - a.height);

    if (qualities.length === 0) {
      qualities.push({ label: 'Best', formatId: 'best', height: 0 });
    }

    res.json({
      status: 'success',
      title,
      thumbnail,
      duration,
      qualities,
    });
  } catch (err) {
    const msg = err.stderr || err.message || 'Failed to fetch video info';
    res.status(500).json({ status: 'error', message: msg });
  }
});

// ── Download video (all platforms via yt-dlp) ──
app.get('/api/download', async (req, res) => {
  const { url, format } = req.query;

  if (!url) {
    return res.status(400).json({ status: 'error', message: 'No URL provided' });
  }

  try {
    // Get title for filename
    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      noPlaylist: true,
    });

    const title = (info.title || 'video').replace(/[<>:"/\\|?*]/g, '');

    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    res.header('Content-Type', 'video/mp4');

    const formatArg = format || 'best[ext=mp4]/best';

    const subprocess = ytdlp.exec(url, {
      output: '-',
      format: formatArg,
      noCheckCertificates: true,
      noWarnings: true,
      noPlaylist: true,
      mergeOutputFormat: 'mp4',
    });

    subprocess.stdout.pipe(res);

    subprocess.stderr.on('data', (chunk) => {
      console.log('[yt-dlp]', chunk.toString());
    });

    subprocess.on('error', () => {
      if (!res.headersSent) {
        res.status(500).json({ status: 'error', message: 'Download failed' });
      }
    });

    req.on('close', () => {
      subprocess.kill?.();
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ status: 'error', message: err.stderr || err.message });
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
