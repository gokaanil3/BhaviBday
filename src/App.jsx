import { useEffect, useRef, useState } from 'react';
import { SITE_CONTENT } from './content';

const { password: PASSWORD, herName, siteTitle, sections, music: musicSettings } = SITE_CONTENT;

const JINZHAN_GIFS = [
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd29yb29kcXlwNHV2cnlsdGNvNDJwcHIzdXVvcWJtZjhhbjR5MGppaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TlHNHt600zyKkHTrBi/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDdhd2VoYWczaTY4bzFqZGFsOHZ4eDFtNWlidzNnaGdzcjRqOGdlOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iEpfNDvOe1UREdi1VO/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdThjcHZ3bGFqdXZ4cG51cDlvYzk2bXdyejFkNjZscWN2MHE0dXJseCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QWFJTTG5dMRGPZqG31/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDExbHZtcXZ4dGN4dGZ4dGN4dGZ4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f8tsej5s20oraBHkks/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDlnbXZ4dGN4dGZ4dGN4dGZ4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ph5x2qhA9EDXTExioP/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTgxeTkyMzF0ajF1ajJ2ejhpcnlqNHRuNzRnMnJlaG9ma3JucXBtaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/mLXh1ChsWovF3ESR4X/giphy.gif',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGM0bmw0b241MnZkamJ6dWozMml1c3owdTBzbjkycHhwcXNjMXhxYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/axSW6dcyNjQA3jahOR/giphy.gif',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjc5ajlnNWJiZ3ZpNm83dHMxb3IxdnFocjEzandpN3dqdGFjdGNjbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H4bepOm6SEMA7WH8yV/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3d4YmRnaHNub25hdXZ6MzRoMTJyMG9uMmptbXB0MXBjdDJreHZ1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/IuNmOyrZr6DRLR8Jj5/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGw0M2xmMnJ4ejJkM2E2MDB1N2Z3M2V0bmR0NmVpc3NlbmFrcnM5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/df2wtkpKRjBGAfYOkH/giphy.gif',
];

const GifGrid = ({ count = 8 }) => (
  <div className="jinzhan-grid">
    {JINZHAN_GIFS.slice(0, count).map((src, i) => (
      <img key={i} src={src} alt={`Jinzhan love ${i + 1}`} className="jinzhan-small" loading="lazy" />
    ))}
  </div>
);

function App() {
  const [stage, setStage] = useState('envelope');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [musicOn, setMusicOn] = useState(false);
  const [imageModal, setImageModal] = useState({ open: false, src: '', caption: '', index: 0 });
  const [sparkles, setSparkles] = useState([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [gameComplete, setGameComplete] = useState(false);
  const musicAudioRef = useRef(null);
  const revealTimeoutRef = useRef(null);
  const noButtonRef = useRef(null);
  const btnRowRef = useRef(null);
  const slideshowTimerRef = useRef(null);

  const yesQuestions = [
    'Will you always love me? 💖',
    'Are you sure you love me forever? 💕',
    'Promise you will always be mine? 💍',
    'Will you love me no matter what? 🌟',
    'Say yes — you love me forever! 💘',
    'One more time — will you always love me? 💞',
    'Final question — will you love me always? 💝',
  ];

  useEffect(() => {
    return () => {
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current.currentTime = 0;
      }
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current);
      }
      if (slideshowTimerRef.current) {
        window.clearInterval(slideshowTimerRef.current);
      }
    };
  }, []);

  const startMusic = () => {
    setMusicOn(true);
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!musicOn) {
        setMusicOn(true);
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [musicOn]);

  useEffect(() => {
    if (!musicOn) return;

    if (musicSettings.backgroundMusicUrl) {
      const audio = new Audio(musicSettings.backgroundMusicUrl);
      audio.loop = true;
      audio.volume = 0.25;
      audio.play().catch(() => {});
      musicAudioRef.current = audio;

      return () => {
        audio.pause();
        audio.currentTime = 0;
        musicAudioRef.current = null;
      };
    }
  }, [musicOn, musicSettings.backgroundMusicUrl]);

  useEffect(() => {
    if (stage !== 'unlocked') return;
    const emojis = ['💖', '✨', '🌟', '💫', '🎂', '🎈', '💕', '🎁', '🌈', '💝'];
    const interval = setInterval(() => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const item = {
        id: `${Date.now()}-${Math.random()}`,
        emoji,
        left: `${Math.random() * 100}%`,
        duration: `${4 + Math.random() * 3}s`,
      };
      setFloatingEmojis((prev) => [...prev, item]);
      setTimeout(() => {
        setFloatingEmojis((prev) => prev.filter((e) => e.id !== item.id));
      }, 7000);
    }, 800);
    return () => clearInterval(interval);
  }, [stage]);

  const handleUnlock = (event) => {
    event.preventDefault();
    if (password.trim().toLowerCase() === PASSWORD.toLowerCase()) {
      setStage('opening');
      setError('');
      if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = setTimeout(() => setStage('unlocked'), 2000);
    } else {
      setError('That password is not correct. Try again.');
    }
  };

  const handleRibbonClick = () => {
    setEnvelopeOpen(true);
    setStage('password');
  };

  const createSparkle = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - event.currentTarget.clientLeft - rect.left;
    const y = event.clientY - event.currentTarget.clientTop - rect.top;
    const sparkle = { id: `${x}-${y}-${Date.now()}`, x, y };
    setSparkles((points) => [...points, sparkle]);
    setTimeout(() => {
      setSparkles((points) => points.filter((point) => point.id !== sparkle.id));
    }, 1000);
  };

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 6, y: x * 6 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const openImage = (src, caption, index = 0) => (event) => {
    event?.stopPropagation?.();
    setImageModal({ open: true, src, caption, index });
  };

  const closeImage = () => {
    setImageModal({ open: false, src: '', caption: '', index: 0 });
    if (slideshowTimerRef.current) {
      window.clearInterval(slideshowTimerRef.current);
      slideshowTimerRef.current = null;
    }
  };

  const nextImage = () => {
    const images = sections.gallery.images;
    const nextIndex = (imageModal.index + 1) % images.length;
    setImageModal((prev) => ({ ...prev, src: images[nextIndex].src, caption: images[nextIndex].caption, index: nextIndex }));
  };

  const prevImage = () => {
    const images = sections.gallery.images;
    const prevIndex = (imageModal.index - 1 + images.length) % images.length;
    setImageModal((prev) => ({ ...prev, src: images[prevIndex].src, caption: images[prevIndex].caption, index: prevIndex }));
  };

  useEffect(() => {
    if (imageModal.open) {
      if (slideshowTimerRef.current) {
        window.clearInterval(slideshowTimerRef.current);
      }
      slideshowTimerRef.current = window.setInterval(() => {
        setImageModal((prev) => {
          if (!prev.open) return prev;
          const images = sections.gallery.images;
          const nextIndex = (prev.index + 1) % images.length;
          return { ...prev, src: images[nextIndex].src, caption: images[nextIndex].caption, index: nextIndex };
        });
      }, 5000);

      return () => {
        if (slideshowTimerRef.current) {
          window.clearInterval(slideshowTimerRef.current);
          slideshowTimerRef.current = null;
        }
      };
    }
  }, [imageModal.open, sections.gallery.images]);

  const getRandomPosition = () => {
    if (!btnRowRef.current) return { x: 0, y: 0 };
    const container = btnRowRef.current;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const btnW = 120;
    const btnH = 44;
    const maxX = Math.max(0, cw - btnW - 10);
    const maxY = Math.max(0, ch - btnH - 10);
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };
  };

  const moveNoButton = () => {
    const pos = getRandomPosition();
    setNoPosition(pos);
  };

  const handleYes = () => {
    const next = yesCount + 1;
    setYesCount(next);

    if (next >= 7) {
      setGameComplete(true);
    }
  };

  const handleNo = () => {
    const next = noCount + 1;
    setNoCount(next);
    moveNoButton();

    if (next >= 7) {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setGameActive(false);
    setYesCount(0);
    setNoCount(0);
    setNoPosition({ x: 0, y: 0 });
    setGameComplete(false);
  };

  if (stage !== 'unlocked') {
    return (
      <div className="gate-screen">
        <div className="envelope-wrapper">
          <GifGrid count={8} />
          <div className="envelope">
            <div className="envelope-back" />
            <div className={`letter ${envelopeOpen ? 'letter-out' : ''}`}>
              <div className="letter-content">
                <div className="letter-header">💌</div>
                <h1>Happy Birthday!</h1>
                <p>A special surprise awaits inside.</p>
              </div>
            </div>
            <div className="envelope-front" />
            <div className="envelope-flap" />
            {!envelopeOpen && (
              <div className="butterfly-ribbon" onClick={handleRibbonClick} title="Click to open">
                <img src="/assets/butterfly-ribbon.png" alt="Butterfly ribbon" className="butterfly-img" />
              </div>
            )}
          </div>
          {stage === 'password' && (
            <div className="password-panel">
              <p className="eyebrow">Enter the secret code</p>
              <form onSubmit={handleUnlock}>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Type the password"
                  autoFocus
                />
                <button type="submit">Open letter 💌</button>
              </form>
              {error ? <span className="error">{error}</span> : null}
            </div>
          )}
          {stage === 'opening' && (
            <div className="opening-overlay">
              <div className="opening-letter">
                <img src={JINZHAN_GIFS[0]} alt="Jinzhan love" className="opening-gif" />
                <div className="opening-emoji">🎂</div>
                <h2>Happy Birthday, {herName}!</h2>
                <p>Your celebration is opening now...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell" onMouseMove={handleMove} onMouseLeave={resetTilt} onClick={createSparkle}>
      <div className="backdrop" />
      {floatingEmojis.map((item) => (
        <span key={item.id} className="floating-emoji" style={{ left: item.left, animationDuration: item.duration }}>
          {item.emoji}
        </span>
      ))}
      {sparkles.map((point) => (
        <span key={point.id} className="sparkle" style={{ left: point.x, top: point.y }} />
      ))}
      {imageModal.open && (
        <div className="image-modal" onClick={closeImage}>
          <button type="button" className="image-close" onClick={closeImage}>×</button>
          <button type="button" className="image-nav image-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <button type="button" className="image-nav image-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={imageModal.src} alt={imageModal.caption} className="image-modal-img" />
            <p className="image-caption">{imageModal.caption}</p>
            <div className="image-counter">{imageModal.index + 1} / {sections.gallery.images.length}</div>
            <div className="slideshow-progress">
              <div className="slideshow-bar" />
            </div>
          </div>
        </div>
      )}

      <main className="content-card" style={{ transform: `perspective(1200px) rotateX(${-tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <header className="topbar">
          <span className="site-title-text">{siteTitle}</span>
        </header>

        <section className="main-content" key={activeSection}>
          {activeSection === 'hero' && (
            <section className="hero-section" key="hero">
              <div className="hero-badge">🎉 It's Your Day!</div>
              <img src={sections.hero.image} alt="Hero" className="hero-image" onClick={openImage(sections.hero.image, 'Hero image')} />
              <h1 className="hero-title">{sections.hero.title}</h1>
              <p className="hero-message">{sections.hero.message}</p>
              <button className="cta-button" onClick={() => setActiveSection('reasons')}>
                Explore My Love For You 💕
              </button>
              <GifGrid count={6} />
            </section>
          )}

          {activeSection === 'reasons' && (
            <section className="reasons-section" key="reasons">
              <h2 className="section-title">{sections.reasons.title}</h2>
              <GifGrid count={6} />
              <div className="reasons-grid">
                {sections.reasons.items.map((item, index) => (
                  <div className="reason-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="reason-emoji">{item.emoji}</span>
                    <p className="reason-text">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="section-nav">
                <button onClick={() => setActiveSection('hero')}>← Reasons</button>
                <button onClick={() => setActiveSection('gallery')}>Gallery →</button>
              </div>
            </section>
          )}

          {activeSection === 'gallery' && (
            <section className="gallery-section" key="gallery">
              <h2 className="section-title">{sections.gallery.title}</h2>
              <GifGrid count={6} />
              <p className="section-subtitle">{sections.gallery.subtitle}</p>
              <div className="gallery-grid">
                {sections.gallery.images.map((img, index) => (
                  <div className="gallery-item" key={index} onClick={openImage(img.src, img.caption, index)}>
                    <img src={img.src} alt={img.caption} />
                    <div className="gallery-caption">{img.caption}</div>
                  </div>
                ))}
              </div>
              <div className="section-nav">
                <button onClick={() => setActiveSection('reasons')}>← Gallery</button>
                <button onClick={() => setActiveSection('letter')}>Letter →</button>
              </div>
            </section>
          )}

          {activeSection === 'letter' && (
            <section className="letter-section" key="letter">
              <h2 className="section-title">{sections.letter.title}</h2>
              <GifGrid count={5} />
              <div className="letter-paper">
                {sections.letter.paragraphs.map((para, index) => (
                  <p key={index} className="letter-para">{para}</p>
                ))}
                <p className="letter-signature">{sections.letter.signature}</p>
              </div>
              <div className="section-nav">
                <button onClick={() => setActiveSection('gallery')}>← Letter</button>
                <button onClick={() => setActiveSection('wishes')}>Wishes →</button>
              </div>
            </section>
          )}

          {activeSection === 'wishes' && (
            <section className="wishes-section" key="wishes">
              <h2 className="section-title">{sections.wishes.title}</h2>
              <GifGrid count={6} />
              <div className="wishes-grid">
                {sections.wishes.items.map((item, index) => (
                  <div className="wish-card" key={index} style={{ animationDelay: `${index * 0.15}s` }}>
                    <span className="wish-emoji">{item.emoji}</span>
                    <p className="wish-text">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="section-nav">
                <button onClick={() => setActiveSection('letter')}>← Wishes</button>
                <button onClick={() => setActiveSection('game')}>Game →</button>
              </div>
            </section>
          )}

          {activeSection === 'game' && (
            <section className="game-section" key="game">
              {!gameActive && !gameComplete && (
                <div className="game-intro">
                  <div className="game-emoji">💍</div>
                  <h2 className="section-title">One Last Thing...</h2>
                  <GifGrid count={4} />
                  <p className="game-intro-text">I have a very important question for you. Are you ready?</p>
                  <button className="game-start-btn" onClick={() => setGameActive(true)}>
                    I'm Ready 💖
                  </button>
                </div>
              )}

              {gameActive && !gameComplete && (
                <div className="game-area">
                  <div className="game-question-card">
                    <img src={JINZHAN_GIFS[3]} alt="Jinzhan heart love" className="game-gif" />
                    <div className="game-heart">💖</div>
                    <h3 className="game-question">
                      {yesQuestions[Math.min(yesCount, yesQuestions.length - 1)]}
                    </h3>
                    <div className="game-btn-row" ref={btnRowRef}>
                      <button className="yes-btn" onClick={handleYes}>Yes 💕</button>
                      {noCount < 7 && (
                        <button
                          ref={noButtonRef}
                          className="no-btn"
                          onClick={handleNo}
                          style={{
                            position: 'absolute',
                            left: `${noPosition.x}px`,
                            top: `${noPosition.y}px`,
                            transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                          }}
                        >
                          No
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {gameComplete && (
                <div className="game-complete">
                  <img src={JINZHAN_GIFS[2]} alt="Jinzhan marry me" className="complete-gif" />
                  <div className="complete-emoji">💍✨💖</div>
                  <h2 className="complete-title">
                    I Promise, I'll Always Be With You<br />Forever and Ever 💕
                  </h2>
                  <p className="complete-text">
                    No matter what, my love for you is eternal. You are my everything, and I will love you till the end of time.
                  </p>
                  <div className="complete-hearts">💖 💝 💘 💞 💕 💓 💗</div>
                  <button className="game-restart-btn" onClick={resetGame}>
                    Play Again 🔄
                  </button>
                </div>
              )}
            </section>
          )}

          {activeSection !== 'hero' && activeSection !== 'reasons' && activeSection !== 'gallery' && activeSection !== 'letter' && activeSection !== 'wishes' && activeSection !== 'game' && (
            <section className="hero-section" key="hero">
              <div className="hero-badge">🎉 It's Your Day!</div>
              <img src={sections.hero.image} alt="Hero" className="hero-image" onClick={openImage(sections.hero.image, 'Hero image')} />
              <h1 className="hero-title">{sections.hero.title}</h1>
              <p className="hero-message">{sections.hero.message}</p>
              <button className="cta-button" onClick={() => setActiveSection('reasons')}>
                Explore My Love For You 💕
              </button>
            </section>
          )}
        </section>

        <footer className="footer-note">
          <span>{sections.footer[0]}</span>
          <span>{sections.footer[1]}</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
