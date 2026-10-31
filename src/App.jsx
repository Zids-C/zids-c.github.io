import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function Arrow({ diagonal = false }) {
  return <span className={`arrow ${diagonal ? 'arrow--diagonal' : ''}`} aria-hidden="true">↗</span>;
}

function SectionLabel({ children, light = false }) {
  return (
    <div className={`section-label ${light ? 'section-label--light' : ''}`}>
      <span className="section-label__rule" />
      <span>{children}</span>
    </div>
  );
}

/* U-Net schematic: the architecture family at the centre of the research,
   drawn in the site's own palette. Encoder (left) → bottleneck → decoder (right),
   with skip connections between matching levels. */
const UNET_LEVELS = [
  { y: 168, w: 168 },
  { y: 252, w: 134 },
  { y: 336, w: 100 },
  { y: 420, w: 68 },
];
const ENC_X = 132;
const DEC_X = 428;

function FeatureBlock({ cx, cy, w, tone }) {
  const fills = { enc: '#eff0df', dec: '#bac99a', mid: '#d8ee52' };
  return (
    <g>
      <rect x={cx - w / 2 + 7} y={cy - 17 - 7} width={w} height={34} fill={fills[tone]} fillOpacity=".55" stroke="#38574b" strokeOpacity=".5" strokeWidth="1.2" />
      <rect x={cx - w / 2} y={cy - 17} width={w} height={34} fill={fills[tone]} stroke="#38574b" strokeWidth="1.5" />
      <path d={`M${cx - w / 2 + 10} ${cy}H${cx + w / 2 - 10}`} stroke="#38574b" strokeOpacity=".35" strokeDasharray="2 4" />
    </g>
  );
}

function PixelGrid({ x, y, size, cells, mask = false }) {
  const cell = size / 6;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill="#f8f7f1" stroke="#38574b" strokeWidth="1.5" />
      {Array.from({ length: 36 }, (_, i) => {
        const cx = x + (i % 6) * cell;
        const cy = y + Math.floor(i / 6) * cell;
        const on = cells.includes(i);
        return (
          <rect key={i} x={cx} y={cy} width={cell} height={cell}
            fill={on ? (mask ? '#e47558' : '#38574b') : 'none'}
            fillOpacity={on ? (mask ? 1 : 0.28) : 0}
            stroke="#38574b" strokeOpacity=".22" strokeWidth=".7" />
        );
      })}
    </g>
  );
}

function UNetGraphic() {
  const arrow = (x1, y1, x2, y2) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38574b" strokeWidth="1.4" markerEnd="url(#unet-arrow)" />
  );
  const blob = [8, 9, 14, 15, 16, 20, 21, 22, 27];
  const mask = [8, 9, 14, 15, 20, 21, 22, 27];
  return (
    <div className="hero-plate reveal">
      <div className="hero-plate__top"><span>ARCHITECTURE STUDY</span><span>U-NET / SEGMENTATION</span></div>
      <div className="hero-plate__image-wrap">
        <svg className="unet" viewBox="0 0 560 620" role="img" aria-labelledby="unet-title unet-desc" fill="none">
          <title id="unet-title">U-Net architecture schematic</title>
          <desc id="unet-desc">An encoder path that compresses an image, a bottleneck, and a decoder path that rebuilds a segmentation mask, joined by skip connections at each level.</desc>
          <defs>
            <pattern id="unet-grid" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0H0V22" stroke="#718075" strokeOpacity=".22" strokeWidth=".8" />
            </pattern>
            <linearGradient id="unet-fade" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#f1f0e4" />
              <stop offset="1" stopColor="#d2d9bd" />
            </linearGradient>
            <marker id="unet-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M1 1L9 5L1 9" fill="none" stroke="#38574b" strokeWidth="1.5" />
            </marker>
          </defs>
          <rect width="560" height="620" fill="url(#unet-fade)" />
          <rect x="26" y="26" width="508" height="568" fill="url(#unet-grid)" />

          {/* input and output */}
          <PixelGrid x={ENC_X - 30} y={50} size={60} cells={blob} />
          <PixelGrid x={DEC_X - 30} y={50} size={60} cells={mask} mask />
          {arrow(ENC_X, 116, ENC_X, UNET_LEVELS[0].y - 28)}
          {arrow(DEC_X, UNET_LEVELS[0].y - 28, DEC_X, 116)}

          {/* skip connections */}
          {UNET_LEVELS.map((l) => (
            <g key={`skip-${l.y}`}>
              <line x1={ENC_X + l.w / 2 + 10} y1={l.y} x2={DEC_X - l.w / 2 - 4} y2={l.y} stroke="#e47558" strokeWidth="1.4" strokeDasharray="4 5" markerEnd="url(#unet-arrow)" />
              <circle cx="280" cy={l.y} r="3.5" fill="#e47558" />
            </g>
          ))}

          {/* encoder / decoder */}
          {UNET_LEVELS.map((l, i) => (
            <g key={`lvl-${l.y}`}>
              <FeatureBlock cx={ENC_X} cy={l.y} w={l.w} tone="enc" />
              <FeatureBlock cx={DEC_X} cy={l.y} w={l.w} tone="dec" />
              {i < UNET_LEVELS.length - 1 && (
                <>
                  {arrow(ENC_X, l.y + 24, ENC_X, UNET_LEVELS[i + 1].y - 28)}
                  {arrow(DEC_X, UNET_LEVELS[i + 1].y - 28, DEC_X, l.y + 24)}
                </>
              )}
            </g>
          ))}

          {/* bottleneck */}
          {arrow(ENC_X, UNET_LEVELS[3].y + 24, ENC_X, 502)}
          <path d={`M${ENC_X} 520Q${ENC_X} 534 ${ENC_X + 18} 534H${DEC_X - 18}Q${DEC_X} 534 ${DEC_X} 520`} stroke="#38574b" strokeWidth="1.4" />
          <path d={`M${DEC_X} 520V${UNET_LEVELS[3].y + 24}`} stroke="#38574b" strokeWidth="1.4" markerEnd="url(#unet-arrow)" />
          <FeatureBlock cx={280} cy={534} w={64} tone="mid" />

          {/* labels */}
          <g fill="#38574b" fontFamily="'DM Mono', 'Courier New', monospace" fontSize="9.5" letterSpacing="1.3">
            <text x="46" y="206" transform="rotate(-90 46 206)" opacity=".85">ENCODER</text>
            <text x="514" y="206" transform="rotate(90 514 206)" opacity=".85">DECODER</text>
            <text x="280" y="298" textAnchor="middle" opacity=".85">SKIP CONNECTIONS</text>
            <text x="280" y="578" textAnchor="middle" opacity=".85">BOTTLENECK</text>
            <text x={ENC_X} y="44" textAnchor="middle">IMAGE</text>
            <text x={DEC_X} y="44" textAnchor="middle">MASK</text>
          </g>
        </svg>
      </div>
      <div className="hero-plate__bottom"><span>STRUCTURE, MADE LEGIBLE.</span><span>DHAKA / BD</span></div>
    </div>
  );
}

function ProjectDisclosure({ title, children }) {
  return (
    <details className="project-disclosure">
      <summary><span>{title}</span><span className="disclosure-symbol" aria-hidden="true">+</span></summary>
      <div className="project-disclosure__body">{children}</div>
    </details>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll('.reveal');
    let revealObserver;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });
      revealItems.forEach((item) => revealObserver.observe(item));
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id || 'top');
      });
    }, { rootMargin: '-38% 0px -52% 0px' });
    document.querySelectorAll('main section[id], header[id]').forEach((section) => sectionObserver.observe(section));

    return () => {
      revealObserver?.disconnect();
      sectionObserver.disconnect();
      revealItems.forEach((item) => item.classList.remove('is-visible'));
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="Osman Goni, back to top" onClick={closeMenu}>
          <span className="brand__mark">OG<span>.</span></span>
          <span className="brand__descriptor">SOFTWARE ENGINEER<br />AI / ML</span>
        </a>

        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className={`menu-toggle__icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>

        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} id="site-navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? 'is-active' : ''} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-contact" href="mailto:osmancgoni@gmail.com" onClick={closeMenu}>Let’s talk <Arrow /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow reveal"><span className="status-dot" /> PORTFOLIO / 2026 <span className="eyebrow__divider">—</span> DHAKA, BANGLADESH</p>
            <h1 className="hero__title reveal" id="hero-title">
              I build where<br />
              <em>intelligence</em><br />
              <span className="hero__final-phrase">meets <br className="hero__mobile-break" />engineering<span className="title-stop">.</span></span>
            </h1>
            <p className="hero__intro reveal">I’m Osman Goni, a software engineer working across AI/ML, computer vision, and LLM applications — turning complex ideas into useful, dependable software.</p>
            <div className="hero__actions reveal">
              <a className="text-link text-link--strong" href="#work">Explore selected work <Arrow /></a>
              <a className="text-link" href="/osman-goni-resume.pdf" target="_blank" rel="noreferrer">Read my résumé <span className="text-link__arrow" aria-hidden="true">↗</span></a>
            </div>
            <div className="hero__footnote reveal"><span className="hero__footnote-mark">↳</span><span>RESEARCH-MINDED.<br />SYSTEMS-BUILT.</span></div>
          </div>
          <UNetGraphic />
          <a href="#work" className="scroll-cue" aria-label="Scroll to selected work"><span className="scroll-cue__line" /><span>SCROLL TO EXPLORE</span></a>
        </section>

        <div className="discipline-band" aria-label="Areas of focus">
          <span>DEEP LEARNING</span><span className="discipline-band__asterisk">✳</span>
          <span>COMPUTER VISION</span><span className="discipline-band__asterisk">✳</span>
          <span>LLM APPLICATIONS</span><span className="discipline-band__asterisk">✳</span>
          <span>SOFTWARE SYSTEMS</span>
        </div>

        <section className="work section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading reveal">
            <SectionLabel>SELECTED WORK</SectionLabel>
            <div className="section-heading__main">
              <h2 id="work-title">Built to <em>be useful.</em></h2>
              <p>Two projects at the intersection of thoughtful engineering and practical outcomes.</p>
            </div>
          </div>

          <article className="project project--rag reveal">
            <div className="project__identity">
              <p className="project__type">LLM APPLICATION · DOCUMENT INTELLIGENCE</p>
              <h3>RAG PDF<br /><em>Analyzer</em></h3>
              <p className="project__lede">Ask documents better questions. Get answers grounded in their content.</p>
              <div className="tech-list" aria-label="Technologies used"><span>Python</span><span>FastAPI</span><span>LlamaIndex</span><span>Gemini</span><span>Qdrant</span><span>Inngest</span></div>
            </div>
            <div className="project__visual project__visual--rag" aria-label="Workflow illustration: PDF document to chunks to embeddings to semantic retrieval to answer">
              <div className="workflow-head"><span>PROCESS MAP</span><span>RETRIEVAL PIPELINE</span></div>
              <div className="workflow">
                <div className="workflow__node workflow__node--document"><span className="node-icon node-icon--page" aria-hidden="true"><i /><i /><i /></span><b>PDF</b><small>source</small></div>
                <span className="workflow__arrow" aria-hidden="true">→</span>
                <div className="workflow__node"><span className="node-icon node-icon--chunks" aria-hidden="true"><i /><i /><i /><i /></span><b>Chunk</b><small>split text</small></div>
                <span className="workflow__arrow" aria-hidden="true">→</span>
                <div className="workflow__node"><span className="node-icon node-icon--embed" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span><b>Embed</b><small>vectors</small></div>
                <span className="workflow__arrow" aria-hidden="true">→</span>
                <div className="workflow__node"><span className="node-icon node-icon--search" aria-hidden="true">⌕</span><b>Retrieve</b><small>Qdrant</small></div>
                <span className="workflow__arrow" aria-hidden="true">→</span>
                <div className="workflow__node workflow__node--answer"><span className="node-icon node-icon--answer" aria-hidden="true">“ ”</span><b>Answer</b><small>Gemini</small></div>
              </div>
              <div className="workflow-foot"><span>INGESTION</span><span>VECTOR SEARCH</span><span>GENERATION</span></div>
              <div className="project__visual-note"><span className="note-cross">✳</span><p>Reliable document processing, connected through an orchestrated workflow.</p></div>
            </div>
            <div className="project__details">
              <p>A question-answering workflow for PDFs, with semantic retrieval between the document and the language model.</p>
              <ProjectDisclosure title="How it works">
                <ul className="detail-list">
                  <li>PDF reading, chunking, and embedding generation using LlamaIndex and Gemini embeddings.</li>
                  <li>Qdrant stores vectors and supports semantic search over document content.</li>
                  <li>FastAPI provides the backend, while Inngest orchestrates document processing for reliability and fault tolerance.</li>
                </ul>
              </ProjectDisclosure>
            </div>
          </article>

          <article className="project project--hospital reveal">
            <div className="project__identity">
              <p className="project__type">BACKEND ENGINEERING · API DESIGN</p>
              <h3>Hospital<br /><em>Management</em></h3>
              <p className="project__lede">A structured backend built around maintainability and persistent data.</p>
              <div className="tech-list" aria-label="Technologies used"><span>C#</span><span>ASP.NET</span><span>REST APIs</span><span>SQL Server</span></div>
            </div>
            <div className="project__visual project__visual--hospital" aria-label="Architecture illustration showing REST API, application structure, and SQL Server">
              <div className="workflow-head"><span>SYSTEM MAP</span><span>APPLICATION LAYERS</span></div>
              <div className="architecture">
                <div className="architecture__side-label">REQUEST → RESPONSE</div>
                <div className="architecture__stack">
                  <div className="architecture__layer architecture__layer--api"><span><b>REST API</b><small>ASP.NET endpoints</small></span><span className="architecture__symbol">↔</span></div>
                  <div className="architecture__connector"><span /><span /><span /></div>
                  <div className="architecture__layer architecture__layer--logic"><span><b>Application structure</b><small>Object-oriented design · SOLID</small></span><span className="architecture__symbol">⌘</span></div>
                  <div className="architecture__connector"><span /><span /><span /></div>
                  <div className="architecture__layer architecture__layer--db"><span><b>SQL Server</b><small>Persistent data</small></span><span className="architecture__symbol">▤</span></div>
                </div>
                <div className="architecture__stamp">C#<br /><span>STACK</span></div>
              </div>
              <div className="workflow-foot"><span>API DESIGN</span><span>MAINTAINABILITY</span><span>DATA PERSISTENCE</span></div>
            </div>
            <div className="project__details">
              <p>RESTful APIs and relational storage, organized to be easier to understand, maintain, and extend.</p>
              <ProjectDisclosure title="Engineering focus">
                <ul className="detail-list">
                  <li>Designed RESTful APIs in C# and ASP.NET with a clean, organized code structure.</li>
                  <li>Used Microsoft SQL Server for database management and persistent data storage.</li>
                  <li>Applied SOLID principles to support maintainability and scalability.</li>
                </ul>
              </ProjectDisclosure>
            </div>
          </article>
        </section>

        <section className="research" id="research" aria-labelledby="research-title">
          <div className="research__inner section-shell">
            <div className="research__top reveal">
              <SectionLabel light>RESEARCH NOTEBOOK</SectionLabel>
              <span className="research__year">2025 — 2026</span>
            </div>
            <div className="research__grid">
              <div className="research__headline reveal">
                <p className="project__type">MEDICAL IMAGE ANALYSIS / PYTORCH</p>
                <h2 id="research-title">Making anatomy<br />computable<span>.</span></h2>
                <div className="research-status"><span className="status-dot status-dot--acid" /> PAPER UNDER REVIEW</div>
              </div>
              <div className="research__content reveal">
                <h3>Cervical Spine MRI Segmentation: U-Net Comparison</h3>
                <p className="research__summary">A comparative study of convolutional, Transformer, and hybrid U-Net architectures for cervical spine MRI segmentation.</p>
                <div className="research-facts">
                  <div><span className="research-facts__mark" aria-hidden="true" /><p>Prepared the Duke spine MRI dataset to meet the input requirements of different model families.</p></div>
                  <div><span className="research-facts__mark" aria-hidden="true" /><p>Trained and evaluated multiple segmentation architectures with comparable performance metrics.</p></div>
                  <div><span className="research-facts__mark" aria-hidden="true" /><p>Compared results to identify the strongest-performing models within the study.</p></div>
                </div>
                <p className="research__stack">PYTORCH <span>·</span> DEEP LEARNING <span>·</span> COMPUTER VISION</p>
              </div>
            </div>
            <div className="research__bottom reveal"><span>RESEARCH IN PROGRESS</span><span>FROM IMAGE TO STRUCTURE <span className="research__arrow">↘</span></span></div>
          </div>
        </section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <div className="section-heading section-heading--about reveal">
            <SectionLabel>THE PERSON BEHIND THE WORK</SectionLabel>
            <div className="section-heading__main">
              <h2 id="about-title">Curious by nature.<br /><em>Precise by practice.</em></h2>
              <p>I work across the model and the application around it — with an engineer’s attention to structure, and a researcher’s instinct to test assumptions.</p>
            </div>
          </div>
          <div className="about__grid">
            <figure className="portrait reveal">
              <div className="portrait__top"><span>OSMAN GONI</span><span>DHAKA / BD</span></div>
              <img className="portrait__img" src="/assets/osman-goni.jpg" width="960" height="1280" loading="lazy" decoding="async" alt="Portrait of Osman Goni, wearing glasses and a cream embroidered panjabi, standing in front of a tree" />
              <figcaption className="portrait__bottom"><span>SOFTWARE ENGINEER, AI / ML</span></figcaption>
            </figure>
            <div className="about__content">
              <div className="about__statement reveal">
                <span className="about__quote-mark">“</span>
                <p>The goal is not to add AI everywhere. It is to build systems where intelligence solves a real problem.</p>
                <span className="about__statement-caption">A WORKING PRINCIPLE</span>
              </div>
              <div className="about__facts reveal">
                <div className="fact-row"><span className="fact-row__label">EDUCATION</span><div><b>B.Sc. in Computer Science & Engineering</b><p>American International University-Bangladesh (AIUB)</p></div></div>
                <div className="fact-row"><span className="fact-row__label">ALGORITHMS</span><div><b>500+ problems on Codeforces</b><p>1,000+ competitive programming problems overall</p></div></div>
                <div className="fact-row"><span className="fact-row__label">RATINGS</span><div><b>Codeforces 1109</b><p>CodeChef · 2-star · 1405</p></div></div>
                <div className="fact-row"><span className="fact-row__label">FOCUS</span><div><b>AI/ML engineering</b><p>Deep learning, computer vision, LLM-powered systems</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="toolkit section-shell" aria-labelledby="toolkit-title">
          <div className="toolkit__intro reveal">
            <SectionLabel>TOOLS & METHODS</SectionLabel>
            <h2 id="toolkit-title">A versatile<br /><em>toolkit.</em></h2>
            <p>From experiments to production-shaped applications, these are the tools and foundations I work with.</p>
          </div>
          <div className="skill-list reveal">
            <div className="skill-row"><h3>AI / ML</h3><p>PyTorch, deep learning, computer vision, U-Net segmentation, RAG, embeddings, semantic search, Gemini API, LlamaIndex</p><span className="skill-row__glyph">⌁</span></div>
            <div className="skill-row"><h3>Engineering</h3><p>Python, C#, C++, JavaScript, FastAPI, ASP.NET, Node.js, RESTful APIs</p><span className="skill-row__glyph">↗</span></div>
            <div className="skill-row"><h3>Data & workflow</h3><p>Microsoft SQL Server, Qdrant, Inngest, Git, workflow orchestration</p><span className="skill-row__glyph">⇄</span></div>
            <div className="skill-row"><h3>Foundations</h3><p>Data structures, algorithms, object-oriented programming, SOLID principles, debugging, performance optimization</p><span className="skill-row__glyph">⌘</span></div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact__inner section-shell">
            <div className="contact__top reveal"><SectionLabel light>OPEN A CONVERSATION</SectionLabel><span className="contact__availability"><span className="status-dot status-dot--acid" /> OPEN TO AI/ML ENGINEERING OPPORTUNITIES</span></div>
            <div className="contact__main reveal">
              <div><p className="eyebrow eyebrow--light">HAVE A PROBLEM WORTH SOLVING?</p><h2 id="contact-title">Let’s make<br /><em>something matter.</em></h2></div>
              <a className="contact__email" href="mailto:osmancgoni@gmail.com"><span>osmancgoni@gmail.com</span><Arrow diagonal /></a>
            </div>
            <div className="contact__bottom reveal">
              <div className="contact__meta"><span>BASED IN DHAKA, BANGLADESH</span><a href="tel:+8801872318280">+880 1872-318280</a></div>
              <div className="contact__links"><a href="https://github.com/Zids-C" target="_blank" rel="noreferrer">GitHub profile <Arrow diagonal /></a><a href="/osman-goni-resume.pdf" target="_blank" rel="noreferrer">Download résumé <Arrow diagonal /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="footer-brand" href="#top">OG<span>.</span></a>
        <span>DESIGNED TO BE CLEAR. BUILT TO BE USEFUL.</span>
        <span>© 2026 OSMAN GONI</span>
      </footer>
    </>
  );
}

export default App;
