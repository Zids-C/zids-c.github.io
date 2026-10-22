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

function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? 'section-label--light' : ''}`}>
      <span className="section-label__number">{number}</span>
      <span className="section-label__rule" />
      <span>{children}</span>
    </div>
  );
}

function SegmentationGraphic() {
  return (
    <div className="hero-plate reveal" aria-label="Original illustration inspired by medical image segmentation">
      <div className="hero-plate__top"><span>FIELD NOTE / 001</span><span>CV + SEGMENTATION</span></div>
      <div className="hero-plate__image-wrap">
        <img src="/assets/segmentation-plate.svg" alt="Abstract technical illustration of layered segmentation regions inspired by cervical spine MRI research" />
        <span className="plate-marker plate-marker--one">A</span>
        <span className="plate-marker plate-marker--two">B</span>
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
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? 'is-active' : ''} onClick={closeMenu}>
              <span className="site-nav__index">0{index + 1}</span>{item.label}
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
          <SegmentationGraphic />
          <a href="#work" className="scroll-cue" aria-label="Scroll to selected work"><span className="scroll-cue__line" /><span>SCROLL TO EXPLORE</span></a>
        </section>

        <div className="discipline-band" aria-label="Areas of focus">
          <span>01 / DEEP LEARNING</span><span className="discipline-band__asterisk">✳</span>
          <span>02 / COMPUTER VISION</span><span className="discipline-band__asterisk">✳</span>
          <span>03 / LLM APPLICATIONS</span><span className="discipline-band__asterisk">✳</span>
          <span>04 / SOFTWARE SYSTEMS</span>
        </div>

        <section className="work section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading reveal">
            <SectionLabel number="01">SELECTED WORK</SectionLabel>
            <div className="section-heading__main">
              <h2 id="work-title">Built to <em>be useful.</em></h2>
              <p>Two projects at the intersection of thoughtful engineering and practical outcomes.</p>
            </div>
          </div>

          <article className="project project--rag reveal">
            <div className="project__identity">
              <div className="project__number">01<span> / 02</span></div>
              <p className="project__type">LLM APPLICATION · DOCUMENT INTELLIGENCE</p>
              <h3>RAG PDF<br /><em>Analyzer</em></h3>
              <p className="project__lede">Ask documents better questions. Get answers grounded in their content.</p>
              <div className="tech-list" aria-label="Technologies used"><span>Python</span><span>FastAPI</span><span>LlamaIndex</span><span>Gemini</span><span>Qdrant</span><span>Inngest</span></div>
            </div>
            <div className="project__visual project__visual--rag" aria-label="Workflow illustration: PDF document to chunks to embeddings to semantic retrieval to answer">
              <div className="workflow-head"><span>PROCESS MAP / 001</span><span>RETRIEVAL PIPELINE</span></div>
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
              <div className="workflow-foot"><span>01 / INGESTION</span><span>02 / VECTOR SEARCH</span><span>03 / GENERATION</span></div>
              <div className="project__visual-note"><span className="note-cross">✳</span><p>Reliable document processing, connected through an orchestrated workflow.</p></div>
            </div>
            <div className="project__details">
              <p>01—A question-answering workflow for PDFs, with semantic retrieval between the document and the language model.</p>
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
              <div className="project__number">02<span> / 02</span></div>
              <p className="project__type">BACKEND ENGINEERING · API DESIGN</p>
              <h3>Hospital<br /><em>Management</em></h3>
              <p className="project__lede">A structured backend built around maintainability and persistent data.</p>
              <div className="tech-list" aria-label="Technologies used"><span>C#</span><span>ASP.NET</span><span>REST APIs</span><span>SQL Server</span></div>
            </div>
            <div className="project__visual project__visual--hospital" aria-label="Architecture illustration showing REST API, application structure, and SQL Server">
              <div className="workflow-head"><span>SYSTEM MAP / 002</span><span>APPLICATION LAYERS</span></div>
              <div className="architecture">
                <div className="architecture__side-label">REQUEST → RESPONSE</div>
                <div className="architecture__stack">
                  <div className="architecture__layer architecture__layer--api"><span className="architecture__index">01</span><span><b>REST API</b><small>ASP.NET endpoints</small></span><span className="architecture__symbol">↔</span></div>
                  <div className="architecture__connector"><span /><span /><span /></div>
                  <div className="architecture__layer architecture__layer--logic"><span className="architecture__index">02</span><span><b>Application structure</b><small>Object-oriented design · SOLID</small></span><span className="architecture__symbol">⌘</span></div>
                  <div className="architecture__connector"><span /><span /><span /></div>
                  <div className="architecture__layer architecture__layer--db"><span className="architecture__index">03</span><span><b>SQL Server</b><small>Persistent data</small></span><span className="architecture__symbol">▤</span></div>
                </div>
                <div className="architecture__stamp">C#<br /><span>STACK</span></div>
              </div>
              <div className="workflow-foot"><span>API DESIGN</span><span>MAINTAINABILITY</span><span>DATA PERSISTENCE</span></div>
            </div>
            <div className="project__details">
              <p>02—RESTful APIs and relational storage, organized to be easier to understand, maintain, and extend.</p>
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
              <SectionLabel number="02" light>RESEARCH NOTEBOOK</SectionLabel>
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
                  <div><span className="research-facts__num">01</span><p>Prepared the Duke spine MRI dataset to meet the input requirements of different model families.</p></div>
                  <div><span className="research-facts__num">02</span><p>Trained and evaluated multiple segmentation architectures with comparable performance metrics.</p></div>
                  <div><span className="research-facts__num">03</span><p>Compared results to identify the strongest-performing models within the study.</p></div>
                </div>
                <p className="research__stack">PYTORCH <span>·</span> DEEP LEARNING <span>·</span> COMPUTER VISION</p>
              </div>
            </div>
            <div className="research__bottom reveal"><span>FIG. 02 / RESEARCH IN PROGRESS</span><span>FROM IMAGE TO STRUCTURE <span className="research__arrow">↘</span></span></div>
          </div>
        </section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <div className="section-heading section-heading--about reveal">
            <SectionLabel number="03">THE PERSON BEHIND THE WORK</SectionLabel>
            <div className="section-heading__main">
              <h2 id="about-title">Curious by nature.<br /><em>Precise by practice.</em></h2>
              <p>I work across the model and the application around it — with an engineer’s attention to structure, and a researcher’s instinct to test assumptions.</p>
            </div>
          </div>
          <div className="about__grid">
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
        </section>

        <section className="toolkit section-shell" aria-labelledby="toolkit-title">
          <div className="toolkit__intro reveal">
            <SectionLabel number="04">TOOLS & METHODS</SectionLabel>
            <h2 id="toolkit-title">A versatile<br /><em>toolkit.</em></h2>
            <p>From experiments to production-shaped applications, these are the tools and foundations I work with.</p>
          </div>
          <div className="skill-list reveal">
            <div className="skill-row"><span className="skill-row__index">01</span><h3>AI / ML</h3><p>PyTorch, deep learning, computer vision, U-Net segmentation, RAG, embeddings, semantic search, Gemini API, LlamaIndex</p><span className="skill-row__glyph">⌁</span></div>
            <div className="skill-row"><span className="skill-row__index">02</span><h3>Engineering</h3><p>Python, C#, C++, JavaScript, FastAPI, ASP.NET, Node.js, RESTful APIs</p><span className="skill-row__glyph">↗</span></div>
            <div className="skill-row"><span className="skill-row__index">03</span><h3>Data & workflow</h3><p>Microsoft SQL Server, Qdrant, Inngest, Git, workflow orchestration</p><span className="skill-row__glyph">⇄</span></div>
            <div className="skill-row"><span className="skill-row__index">04</span><h3>Foundations</h3><p>Data structures, algorithms, object-oriented programming, SOLID principles, debugging, performance optimization</p><span className="skill-row__glyph">⌘</span></div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact__inner section-shell">
            <div className="contact__top reveal"><SectionLabel number="05" light>OPEN A CONVERSATION</SectionLabel><span className="contact__availability"><span className="status-dot status-dot--acid" /> OPEN TO AI/ML ENGINEERING OPPORTUNITIES</span></div>
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
