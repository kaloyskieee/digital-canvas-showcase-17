export const profile = {
  name: "Your Name",
  monogram: "YN",
  program: "Bachelor of Science in Information Technology",
  school: "Your university",
  graduation: "Your graduation year",
  email: "",
  github: "",
  linkedin: "",
};

export const projects = [
  { id: "folio", name: "Personal Portfolio", category: "DESIGN & DEVELOPMENT", description: "A personal corner of the internet. A thoughtful space for projects, ideas, and the journey behind them.", tech: ["React", "Tailwind CSS", "Motion"], kind: "portfolio", concept: "Explore an expressive portfolio concept with a clear visual identity, accessible navigation, and considered motion." },
  { id: "task", name: "Taskflow", category: "WEB APPLICATION", description: "A little less chaos. A simple, focused workspace for organizing tasks and keeping ideas moving.", tech: ["React", "Node.js", "PostgreSQL"], kind: "tasks", concept: "A task management application concept: boards, task assignments, due dates, and progress tracking." },
  { id: "student", name: "Student Management", category: "INFORMATION SYSTEM", description: "A clearer way to organize student records and academic information.", tech: ["PHP", "MySQL"], kind: "students", concept: "A student management system concept for student records, enrollment, and academic information." },
  { id: "shop", name: "Everyday Store", category: "E-COMMERCE", description: "A considered shopping experience, from discovery to checkout.", tech: ["React", "Node.js"], kind: "shop", concept: "An e-commerce concept for product discovery, shopping carts, and a streamlined checkout." },
  { id: "campus", name: "Campus Connect", category: "STUDENT UTILITY", description: "Campus essentials, events, and community in one place.", tech: ["React", "Firebase"], kind: "campus", concept: "A campus utility concept bringing together event listings, announcements, and student resources." },
] as const;

export type Project = (typeof projects)[number];