import './HowItWorks.css';

const steps = [
  {
    title: 'Copy the video link',
    desc: 'Open the video on TikTok, Instagram, YouTube or any supported platform. Tap the Share button and copy the link to clipboard.',
  },
  {
    title: 'Paste it into SaveClip',
    desc: 'Go to the SaveClip home page and paste the copied URL into the input field. The platform will be detected automatically.',
  },
  {
    title: 'Click Download',
    desc: 'Press the Download button and wait a few seconds while we process your link and prepare the file.',
  },
  {
    title: 'Save the file',
    desc: 'Once the processing is complete, click the "Save File" button to download the video to your device — without any watermarks.',
  },
];

export default function HowItWorks() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">How It Works</h1>
        <p className="page-subtitle">Downloading videos is simple — just 4 easy steps.</p>

        <div className="steps">
          {steps.map((step, i) => (
            <div className="step" key={i}>
              <div className="step-number">{i + 1}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
