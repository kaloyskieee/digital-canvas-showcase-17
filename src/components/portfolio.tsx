import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Github,
  ExternalLink,
  Code2,
  Braces,
  Atom,
  Database,
  Terminal,
  Layers,
  Mail,
  Linkedin,
  GraduationCap,
  Lightbulb,
  Gamepad2,
  GitBranch,
  MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { projects, profile, skillGroups, interests, type Project } from "@/lib/portfolio-data";
import heroArt from "@/assets/hero-sculpture.jpg";
import { ProjectPreview } from "@/components/project-preview";

const sections = ["Home", "About", "Skills", "Projects", "Education", "Contact"];
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0.85, y: 16 }}
      animate={reduce ? { opacity: 1, y: 0 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduce = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const offset = window.innerWidth <= 820 ? 100 : 116;
      let current = "home";
      for (const section of sections) {
        const target = document.getElementById(section.toLowerCase());
        if (target && target.getBoundingClientRect().top <= offset) current = section.toLowerCase();
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4)
        current = "contact";
      setActive(current);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 820) setOpen(false);
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Element && !event.target.closest(".site-header")) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  const links = sections.map((s) => (
    <a
      key={s}
      href={`#${s.toLowerCase()}`}
      className={`nav-link ${active === s.toLowerCase() ? "active" : ""}`}
      aria-current={active === s.toLowerCase() ? "location" : undefined}
      onClick={() => {
        setActive(s.toLowerCase());
        setOpen(false);
      }}
    >
      {s}
    </a>
  ));
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="page-width header-inner">
          <a href="#home" className="wordmark" aria-label={`${profile.name}, home`}>
            <span className="logo-mark">&lt;/&gt;</span>
            <span>
              {profile.name.toLowerCase().replaceAll(" ", "")}
              <span className="wordmark-dot">.</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links}
          </nav>
          <Button asChild variant="quiet" className="header-cta text-xs">
            <a href="#contact">
              Let's Talk <ArrowUpRight />
            </a>
          </Button>
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="mobile-menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="mobile-nav"
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            >
              {links}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
export function Hero() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 40, damping: 25 });
  const y = useSpring(pointerY, { stiffness: 40, damping: 25 });
  useEffect(() => {
    if (reduce) {
      pointerX.set(0);
      pointerY.set(0);
    }
  }, [reduce, pointerX, pointerY]);
  return (
    <>
      <section
        id="home"
        className="hero"
        onMouseMove={(e) => {
          if (!reduce && window.matchMedia("(pointer:fine)").matches) {
            const bounds = e.currentTarget.getBoundingClientRect();
            pointerX.set(((e.clientX - bounds.left) / bounds.width - 0.5) * 12);
            pointerY.set(((e.clientY - bounds.top) / bounds.height - 0.5) * 12);
          }
        }}
        onMouseLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <motion.img
          className="hero-art"
          src={heroArt}
          alt="Sculptural blue and chrome ribbons intertwined into a futuristic knot"
          width={1536}
          height={1024}
          fetchPriority="high"
          style={{ x, y }}
        />
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-width hero-inner">
          <Reveal>
            <div className="availability">
              <span className="status-dot" /> IT Student • Aspiring Developer
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              <span className="hero-line">Turning ideas</span>
              <span className="hero-line">
                into <span className="blue-line">digital</span>
              </span>
              <span className="hero-line blue-line">experiences.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="hero-intro">
              Hi, I'm <strong>{profile.name}</strong> — an IT student driven by curiosity.
              <br />
              Exploring web development, software engineering, and design to build things that make
              a difference.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hero-actions">
              <Button asChild variant="portfolio">
                <a href="#projects">
                  Explore My Work <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="quiet">
                <a href="#contact">
                  Get In Touch <ArrowRight />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="page-width hero-bottom">
          <a href="#about" className="scroll-link">
            <span className="mouse" aria-hidden="true" /> Scroll to discover
          </a>
          <div className="hero-coordinates">
            <span>CURIOUS MIND. CREATIVE CODE.</span>
            <span>01 / 06</span>
          </div>
        </div>
      </section>
      <div className="tech-strip">
        <div className="page-width tech-strip-inner">
          <span className="tech-strip-label">
            A few technologies
            <br />
            on my learning radar
          </span>
          <span className="tech-logo">
            <Atom /> React
          </span>
          <span className="tech-logo">
            <Braces /> JavaScript
          </span>
          <span className="tech-logo">
            <Code2 /> Node.js
          </span>
          <span className="tech-logo">
            <Layers /> Tailwind CSS
          </span>
          <span className="tech-logo">
            <GitBranch /> Git
          </span>
          <span className="tech-logo">
            <MousePointer2 /> Figma
          </span>
        </div>
      </div>
    </>
  );
}
export function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return (
    <div className="section-label">
      {number} / {children}
    </div>
  );
}
export function About() {
  const lines = [
    <>
      <span className="code-accent">const</span> developer = {"{"}
    </>,
    <>
      {" "}
      name: <span className="code-string">"{profile.name}"</span>,
    </>,
    <>
      {" "}
      role: <span className="code-string">"IT Student"</span>,
    </>,
    <>
      {" "}
      mindset: <span className="code-string">"Always learning"</span>,
    </>,
    <> interests: [</>,
    <>
      {" "}
      <span className="code-string">"Development"</span>,
    </>,
    <>
      {" "}
      <span className="code-string">"Design"</span>,{" "}
      <span className="code-string">"Technology"</span>
    </>,
    <> ],</>,
    <>
      {" "}
      nextStep: <span className="code-string">"Build something great"</span>
    </>,
    <>{"}"};</>,
  ];
  return (
    <section id="about" className="section">
      <div className="page-width about-grid">
        <Reveal>
          <div className="code-window">
            <div className="window-top">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>about-me.ts</span>
              <Code2 size={13} />
            </div>
            <div className="code-body">
              {lines.map((line, i) => (
                <div className="code-row" key={i}>
                  <span className="code-number">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <SectionLabel number="01">A little about me</SectionLabel>
          <h2>
            A curious mind.
            <br />
            <span className="subtle">A builder at heart.</span>
          </h2>
          <p className="section-description">
            I'm an Information Technology student with a love for solving problems and bringing
            ideas to life through code. I’m drawn to the space where thoughtful design meets useful
            technology.
          </p>
          <p className="section-description">
            My approach? Learn by doing, ask better questions, and keep improving. I'm exploring web
            development, UI/UX, and software engineering — one experiment at a time.
          </p>
          <div className="stats">
            {profile.statistics.map((stat) => (
              <div key={stat.label}>
                <div className="stat-number">{stat.value ?? "—"}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          <span className="example-label mt-4">Personal details & statistics to be added</span>
        </Reveal>
      </div>
    </section>
  );
}
const skillIcons = { frontend: Code2, backend: Terminal, database: Database, tools: Braces };
export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="page-width">
        <Reveal className="section-top">
          <div>
            <SectionLabel number="02">My learning toolkit</SectionLabel>
            <h2>Tools of the trade.</h2>
            <p className="section-description">
              A growing collection of technologies to explore, experiment with, and build on.
            </p>
          </div>
          <span className="example-label">
            Example learning interests · proficiency unconfirmed
          </span>
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((group, i) => {
            const Icon = skillIcons[group.icon];
            return (
              <Reveal key={group.name} delay={i * 0.06} className="skill-card">
                <Icon className="skill-icon" />
                <h3>{group.name}</h3>
                <div className="badges">
                  {group.items.map((item) => (
                    <span key={item} className="badge">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="interest-line">
          <span className="text-foreground">Also curious about</span>
          <span>UI/UX Design</span>
          <span>Responsive Web Design</span>
          <span>Cybersecurity</span>
          <span>Networking</span>
          <span>Cloud Computing</span>
        </div>
      </div>
    </section>
  );
}
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [detailView, setDetailView] = useState<"project" | "source">("project");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <section id="projects" className="section">
      <div className="page-width">
        <Reveal className="section-top">
          <div>
            <SectionLabel number="03">Selected work</SectionLabel>
            <h2>Ideas. Built into something.</h2>
            <p className="section-description">
              A space for experiments, thoughtful solutions, and work that reflects the way I think.
            </p>
          </div>
          <span className="example-label">05 editable project concepts</span>
        </Reveal>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 2) * 0.08}
              className={`project-card ${i === 0 ? "project-featured" : ""}`}
            >
              <ProjectPreview project={project} />
              <div className="project-info">
                <div className="project-category">
                  <span>{project.category}</span>
                  <span className="text-muted-foreground">
                    CONCEPT {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="badges">
                  {project.tech.map((t) => (
                    <span className="badge" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <Button
                    variant="editorial"
                    aria-label={`View Project: ${project.name}`}
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setDetailView("project");
                      setSelected(project);
                    }}
                  >
                    View Project <ArrowUpRight />
                  </Button>
                  <Button
                    variant="editorial"
                    aria-label={`Source Code: ${project.name}`}
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setDetailView("source");
                      setSelected(project);
                    }}
                  >
                    <Github /> Source Code
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="max-h-[85svh] overflow-y-auto max-w-xl"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <DialogTitle>
            {selected?.name}
            {detailView === "source" ? " · Source code" : ""}
          </DialogTitle>
          <DialogDescription>
            {detailView === "source"
              ? "No repository has been linked to this concept yet."
              : "Example project concept — not a completed project."}
          </DialogDescription>
          {selected && (
            <>
              <ProjectPreview project={selected} />
              <p className="text-sm leading-relaxed text-muted-foreground">{selected.concept}</p>
              <div className="badges">
                {selected.tech.map((t) => (
                  <span className="badge" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-detail-note">
                <Github size={16} />
                <p>
                  {detailView === "source"
                    ? "Source code will be available when a real project repository is added. No sample GitHub URL is presented as your work."
                    : "Concept study · Your own project screenshots, live website, and repository can replace this example."}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
export function Education() {
  return (
    <section id="education" className="section">
      <div className="page-width journey-grid">
        <Reveal>
          <SectionLabel number="04">The journey so far</SectionLabel>
          <h2>
            Learning today.
            <br />
            <span className="subtle">Building tomorrow.</span>
          </h2>
          <p className="section-description">
            Every lesson, late-night experiment, and small breakthrough is part of the journey.
          </p>
          <span className="example-label mt-6">
            <GraduationCap size={14} /> Education details to be personalized
          </span>
        </Reveal>
        <div className="timeline">
          {[
            {
              date: "PRESENT · YOUR GRADUATION YEAR",
              title: profile.program,
              text: `${profile.school} · Expected graduation: ${profile.graduation}.`,
              extra:
                "Example coursework: programming, database systems, web development, networking, and software engineering.",
            },
            {
              date: "YOUR DATES",
              title: "Beyond the classroom",
              text: "Add your certifications, workshops, and academic milestones here. Every opportunity to learn is a step forward.",
            },
            {
              date: "WHAT'S NEXT",
              title: "Keep learning. Keep building.",
              text: "Learning goals: develop useful applications, contribute to open source, and explore opportunities to grow into a thoughtful software developer.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="timeline-item">
              <div className="timeline-date">{item.date}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.extra && <p>{item.extra}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Interests() {
  return (
    <section className="section">
      <div className="page-width">
        <Reveal>
          <SectionLabel number="05">Beyond the code</SectionLabel>
          <h2>Driven by curiosity.</h2>
          <p className="section-description">
            A few example interests — a little of the person behind the screen.
          </p>
        </Reveal>
        <div className="interests-grid">
          {interests.map((item, i) => {
            const Icon = { ideas: Lightbulb, gaming: Gamepad2, community: GitBranch }[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.07} className="interest-card">
                <Icon />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function Contact() {
  const [channel, setChannel] = useState<string | null>(null);
  const contactTrigger = useRef<HTMLButtonElement | null>(null);
  const openContact = (event: React.MouseEvent<HTMLButtonElement>, value: string) => {
    contactTrigger.current = event.currentTarget;
    setChannel(value);
  };
  return (
    <>
      <section id="contact" className="contact-section">
        <Reveal className="page-width">
          <SectionLabel number="06">Let's connect</SectionLabel>
          <h2>
            Have an idea?
            <br />
            Let's build something <span className="text-primary">great.</span>
          </h2>
          <p>
            I'm open to conversations, collaborations, and opportunities to learn. Great things
            often start with a simple hello.
          </p>
          <Button variant="portfolio" size="lg" onClick={(event) => openContact(event, "Email")}>
            Say Hello <ArrowUpRight />
          </Button>
          <div className="contact-socials">
            <Button variant="ghost" onClick={(event) => openContact(event, "GitHub")}>
              <Github /> GitHub <ArrowUpRight />
            </Button>
            <Button variant="ghost" onClick={(event) => openContact(event, "LinkedIn")}>
              <Linkedin /> LinkedIn <ArrowUpRight />
            </Button>
            <Button variant="ghost" onClick={(event) => openContact(event, "Email")}>
              <Mail /> Email <ArrowUpRight />
            </Button>
          </div>
          <span className="example-label mt-5">Contact details to be added</span>
        </Reveal>
      </section>
      <Dialog
        open={!!channel}
        onOpenChange={(open) => {
          if (!open) setChannel(null);
        }}
      >
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            contactTrigger.current?.focus();
          }}
        >
          <DialogTitle>{channel} · Your contact details</DialogTitle>
          <DialogDescription>
            Your {channel === "Email" ? "email address" : `${channel} profile link`} hasn’t been
            added yet. This is a placeholder, not a connected contact service.
          </DialogDescription>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Replace this with your own contact information to let visitors connect with you.
          </p>
        </DialogContent>
      </Dialog>
      <footer className="site-footer">
        <div className="page-width footer-inner">
          <span>© 2026 {profile.name}. All rights reserved.</span>
          <span>
            Designed with curiosity and built with code<span className="text-primary">.</span>
          </span>
          <a href="#home" className="flex items-center gap-2">
            Back to top <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
    </>
  );
}
