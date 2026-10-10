export const profile = {
  name: "Your Name",
  monogram: "YN",
  program: "Bachelor of Science in Information Technology",
  school: "Your university",
  graduation: "Your graduation year",
  email: "",
  github: "",
  linkedin: "",
  statistics: [
    { label: "Projects completed", value: null as number | null },
    { label: "Technologies explored", value: null as number | null },
    { label: "Years of learning", value: null as number | null },
  ],
};

export const skillGroups = [
  { name: "Frontend", icon: "frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"] },
  { name: "Backend", icon: "backend", items: ["Node.js", "PHP", "Python"] },
  { name: "Databases", icon: "database", items: ["MySQL", "PostgreSQL", "Firebase"] },
  { name: "Tools & Workflow", icon: "tools", items: ["Git", "GitHub", "VS Code", "Figma"] },
] as const;

export const interests = [
  { icon: "ideas", title: "Side projects & new ideas", text: "Exploring possibilities and making small ideas tangible." },
  { icon: "gaming", title: "Gaming & technology", text: "Curious about the experiences and systems that bring us together." },
  { icon: "community", title: "Open source & learning", text: "Sharing knowledge, learning from others, and growing together." },
] as const;

export const projects = [
  { id: "folio", name: "Personal Portfolio", category: "DESIGN & DEVELOPMENT", description: "A personal corner of the internet. A thoughtful space for projects, ideas, and the journey behind them.", tech: ["React", "Tailwind CSS", "Motion"], kind: "portfolio", concept: "Explore an expressive portfolio concept with a clear visual identity, accessible navigation, and considered motion." },
  { id: "task", name: "Taskflow", category: "WEB APPLICATION", description: "A little less chaos. A simple, focused workspace for organizing tasks and keeping ideas moving.", tech: ["React", "Node.js", "PostgreSQL"], kind: "tasks", concept: "A task management application concept: boards, task assignments, due dates, and progress tracking." },
  { id: "student", name: "Student Management", category: "INFORMATION SYSTEM", description: "A clearer way to organize student records and academic information.", tech: ["PHP", "MySQL"], kind: "students", concept: "A student management system concept for student records, enrollment, and academic information." },
  { id: "shop", name: "Everyday Store", category: "E-COMMERCE", description: "A considered shopping experience, from discovery to checkout.", tech: ["React", "Node.js"], kind: "shop", concept: "An e-commerce concept for product discovery, shopping carts, and a streamlined checkout." },
  { id: "campus", name: "Campus Connect", category: "STUDENT UTILITY", description: "Campus essentials, events, and community in one place.", tech: ["React", "Firebase"], kind: "campus", concept: "A campus utility concept bringing together event listings, announcements, and student resources." },
] as const;

export type Project = (typeof projects)[number];