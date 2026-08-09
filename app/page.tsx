import { content, projects, experience, formatTenure } from "@/lib/config";
import Reveal from "./Reveal";
import ThemeToggle from "./ThemeToggle";

// Blueprint-style section header: bracketed index/label, a dimension rule,
// then the drawn title.
function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="sec-head reveal">
      <span className="sec-tag">
        <span className="br">[</span> {index} <span className="sl">/</span> {label}{" "}
        <span className="br">]</span>
      </span>
      <span className="sec-rule" />
    </div>
  );
}

export default function Home() {
  const { profile, about, skills, contact } = content;
  const year = new Date().getFullYear();

  return (
    <>
      <Reveal />

      <header className="site">
        <div className="wrap nav">
          <a className="brand" href="#top">
            {profile.brand}
            <span className="tld">.dev</span>
          </a>
          <nav className="links" aria-label="Sections">
            <a href="#about">about</a>
            <a href="#projects">projects</a>
            <a href="#skills">skills</a>
            <a href="#experience">experience</a>
            <a href="#contact">contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top">
        {/* ---------- HERO ---------- */}
        <div className="hero">
          <span className="reg tl" aria-hidden="true" />
          <span className="reg tr" aria-hidden="true" />
          <span className="reg bl" aria-hidden="true" />
          <span className="reg br" aria-hidden="true" />
          <div className="wrap hero-inner">
            <p className="hero-eyebrow">
              // {profile.role} · {profile.location}
            </p>
            <h1>
              {profile.tagline_lead} <em>{profile.tagline_accent}</em>
            </h1>
            <p className="sub">{profile.intro}</p>
            <div className="hero-actions">
              <a className="btn solid" href="#projects">
                View projects <span aria-hidden="true">→</span>
              </a>
              <a className="btn ghost" href="#contact">
                Get in touch
              </a>
            </div>
            <div className="hero-readout" aria-hidden="true">
              <span>SHEET 01</span>
              <span>REV — {year}</span>
              <span>SCALE 1:1</span>
            </div>
          </div>
        </div>

        {/* ---------- ABOUT ---------- */}
        <section id="about">
          <div className="wrap">
            <SectionHead index="01" label="ABOUT" />
            <h2 className="sec-title reveal">A short introduction</h2>
            <div className="about-grid">
              <div className="about-copy reveal">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <dl className="fact-sheet panel reveal">
                {about.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------- PROJECTS ---------- */}
        <section id="projects">
          <div className="wrap">
            <SectionHead index="02" label="PROJECTS" />
            <h2 className="sec-title reveal">Selected work</h2>
            <div className="proj-grid">
              {projects.map((proj, i) => (
                <article className="proj panel reveal" key={proj.id}>
                  <div className="proj-top">
                    <span className="proj-no">
                      P.{String(i + 1).padStart(2, "0")}
                    </span>
                    {proj.status && <span className="status">{proj.status}</span>}
                  </div>
                  <h3>{proj.title}</h3>
                  <p>{proj.summary}</p>
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="chips">
                      {proj.tags.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.links && proj.links.length > 0 && (
                    <div className="links-row">
                      {proj.links.map((l) => (
                        <a key={l.label} href={l.url}>
                          {l.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- SKILLS ---------- */}
        <section id="skills">
          <div className="wrap">
            <SectionHead index="03" label="SKILLS" />
            <h2 className="sec-title reveal">Tools of the trade</h2>
            <div className="skills-grid">
              {skills.map((group) => (
                <div className="skill-col panel reveal" key={group.heading}>
                  <h3>{group.heading}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- EXPERIENCE ---------- */}
        <section id="experience">
          <div className="wrap">
            <SectionHead index="04" label="EXPERIENCE" />
            <h2 className="sec-title reveal">Where I've worked</h2>
            <div className="timeline">
              {experience.map((job, i) => (
                <div className="job reveal" key={i}>
                  <p className="period">{formatTenure(job.start, job.end)}</p>
                  <h3>{job.title}</h3>
                  <p className="org">
                    {job.company}
                    {job.location && <span className="loc">, {job.location}</span>}
                  </p>
                  <ul>
                    {job.description.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact">
          <div className="wrap contact-inner">
            <SectionHead index="05" label="CONTACT" />
            <h2 className="sec-title reveal">{contact.heading}</h2>
            <p className="reveal">{contact.body}</p>
            {contact.form_action?.trim() && (
              <form
                className="contact-form reveal"
                action={contact.form_action}
                method="POST"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  aria-label="Your email"
                  required
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your message"
                  aria-label="Your message"
                  required
                />
                <button className="btn solid" type="submit">
                  Send message <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
            <div className="contact-links reveal">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.url}>
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site">
        <div className="wrap foot">
          <span>
            © {year} {profile.name}
          </span>
          <span className="foot-meta">
            DRAWN IN NEXT.JS · HOSTED ON GITHUB PAGES
          </span>
        </div>
      </footer>
    </>
  );
}
