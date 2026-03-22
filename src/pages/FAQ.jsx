import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: 'Is SaveClip free to use?',
    a: 'Yes, SaveClip is completely free. There are no hidden charges, subscriptions, or premium plans. Just paste a link and download.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No, you don\'t need to register or sign in. SaveClip works instantly without any account.',
  },
  {
    q: 'Will the video have a watermark?',
    a: 'No. SaveClip downloads the original video file without any overlaid watermarks, whenever possible.',
  },
  {
    q: 'What video quality is available?',
    a: 'SaveClip fetches the highest quality available from the source platform. The exact resolution depends on the original upload.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'We support TikTok, Instagram, YouTube, Facebook, Pinterest, and Twitch.',
  },
  {
    q: 'Is it safe?',
    a: 'SaveClip runs entirely in your browser. We don\'t store your data, videos, or links. Your download history is saved only in your browser\'s local storage.',
  },
  {
    q: 'Why did my download fail?',
    a: 'Some videos may be private, region-restricted, or protected by the platform. Double-check that the video is publicly accessible and try again.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Frequently Asked Questions</h1>
        <p className="page-subtitle">Everything you need to know about using SaveClip.</p>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-question" onClick={() => toggle(i)}>
                {item.q}
                <svg
                  className={`faq-arrow ${openIndex === i ? 'open' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="faq-answer">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
