import {
  Atom,
  ArrowUpRight,
  Check,
  Command,
  Headphones,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import { profile } from "@/lib/portfolio-data";
import heroArt from "@/assets/hero-sculpture.jpg";
import headphones from "@/assets/headphones.jpg";

const taskColumns = [
  {
    name: "To do",
    tasks: [
      { name: "Explore website concepts", tag: "Design", date: "Monday" },
      { name: "Map out the user journey", tag: "Research", date: "Tuesday" },
    ],
  },
  {
    name: "In progress",
    tasks: [
      { name: "Build the design system", tag: "Development", date: "Today" },
      { name: "Refine interactions", tag: "Design", date: "Thursday" },
    ],
  },
  { name: "Done", tasks: [{ name: "Plan the project", tag: "Planning", date: "Complete" }] },
];

function AppSidebar({ student = false }: { student?: boolean }) {
  return (
    <div className="preview-sidebar">
      <div className="preview-app-logo">{student ? <Users /> : <Command />}</div>
      <LayoutDashboard />
      <Users />
      <Settings />
      <div className="preview-sidebar-avatar">{profile.monogram}</div>
    </div>
  );
}

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div
      className={`project-preview preview-${project.kind}`}
      role="img"
      aria-label={`${project.name}: illustrative concept, not a completed project`}
    >
      <div className="preview-index" aria-hidden="true">
        {project.category}
      </div>
      <div className="browser-preview" aria-hidden="true">
        <div className="browser-bar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="browser-address">
            {project.name.toLowerCase().replaceAll(" ", "-")} / concept
          </span>
          <span className="browser-security">◇</span>
        </div>
        {project.kind === "portfolio" ? (
          <div className="mini-portfolio">
            <img src={heroArt} alt="" loading="lazy" decoding="async" width={1536} height={1024} />
            <div className="mini-portfolio-content">
              <div className="mini-brand">
                <Atom /> {profile.name.toLowerCase().replaceAll(" ", "")}
                <span className="text-primary">.</span>
              </div>
              <div className="mini-eyebrow">DEVELOPER & CREATIVE THINKER</div>
              <div className="mini-title">
                Ideas into
                <br />
                <span className="text-primary">experiences.</span>
              </div>
              <div className="mini-caption">Curiosity is where it all begins.</div>
              <div className="mini-cta">
                Explore the work <ArrowUpRight />
              </div>
            </div>
            <div className="mini-portfolio-footer">
              DESIGN WITH PURPOSE <span>01 / 05</span>
            </div>
          </div>
        ) : project.kind === "tasks" ? (
          <div className="preview-app">
            <AppSidebar />
            <div className="preview-app-main">
              <div className="mini-app-head">
                <strong>
                  taskflow<span className="text-primary">.</span>
                </strong>
                <div>
                  <Search />
                  <span className="preview-avatar">{profile.monogram}</span>
                </div>
              </div>
              <div className="preview-heading-row">
                <div>
                  <div className="mini-app-heading">A little more focus.</div>
                  <div className="mini-app-sub">My workspace / Project board</div>
                </div>
                <span className="preview-new">
                  <Plus /> New task
                </span>
              </div>
              <div className="mini-board">
                {taskColumns.map((column, index) => (
                  <div className="mini-column" key={column.name}>
                    <div className="mini-column-title">
                      <span>
                        <i className={`task-status status-${index}`} />
                        {column.name}
                      </span>
                      <MoreHorizontal />
                    </div>
                    {column.tasks.map((task) => (
                      <div className="mini-task" key={task.name}>
                        <span className="mini-task-tag">{task.tag}</span>
                        <div>{task.name}</div>
                        <div className="mini-task-footer">
                          <span>{task.date}</span>
                          <span className="preview-avatar">{profile.monogram}</span>
                        </div>
                      </div>
                    ))}
                    <div className="mini-add">
                      <Plus /> Add task
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : project.kind === "students" ? (
          <div className="preview-app">
            <AppSidebar student />
            <div className="preview-app-main">
              <div className="mini-app-head">
                <strong>student hub</strong>
                <Search />
              </div>
              <div className="mini-app-heading">Student overview</div>
              <div className="mini-app-sub">A clearer view of your academic community.</div>
              <div className="preview-summary">
                <div>
                  <Users />
                  <span>Student records</span>
                  <strong>Organized.</strong>
                </div>
                <div>
                  <Check />
                  <span>Enrollment</span>
                  <strong>Connected.</strong>
                </div>
              </div>
              <div className="mini-table table-head">
                <span>Student</span>
                <span>Program</span>
                <span>Status</span>
              </div>
              {["Sample student A", "Sample student B", "Sample student C"].map((name) => (
                <div className="mini-table" key={name}>
                  <span className="preview-student">
                    <i />
                    {name}
                  </span>
                  <span>Information Technology</span>
                  <span className="preview-enrolled">Enrolled</span>
                </div>
              ))}
            </div>
          </div>
        ) : project.kind === "shop" ? (
          <div className="shop-preview">
            <div className="mini-app-head">
              <strong>
                EVERYDAY<span className="text-primary">®</span>
              </strong>
              <span>Essentials　 /　 Collection</span>
              <Headphones />
            </div>
            <div className="shop-preview-content">
              <div className="shop-copy">
                <div className="mini-eyebrow">LESS, BUT BETTER.</div>
                <div className="shop-title">
                  Sound.
                  <br />
                  Considered.
                </div>
                <div className="mini-app-sub">
                  Everyday essentials.
                  <br />
                  Extraordinary details.
                </div>
                <div className="shop-link">
                  Explore the collection <ArrowUpRight />
                </div>
              </div>
              <img
                src={headphones}
                alt=""
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="shop-bottom">
              <span>01 — THE AUDIO EDIT</span>
              <span>THOUGHTFULLY CHOSEN.</span>
            </div>
          </div>
        ) : (
          <div className="campus-preview">
            <div className="mini-app-head">
              <strong>↗ campus connect</strong>
              <span>Discover　 ·　 Community</span>
              <span className="preview-avatar">{profile.monogram}</span>
            </div>
            <div className="campus-banner">
              <div>
                <div className="mini-eyebrow">YOUR NEXT CONNECTION STARTS HERE</div>
                <div className="campus-title">
                  Your campus.
                  <br />
                  Your community.
                </div>
                <div className="campus-caption">Discover what's happening around you.</div>
              </div>
              <div className="campus-symbol" aria-hidden="true">
                ↗
              </div>
            </div>
            <div className="campus-grid">
              {[
                {
                  category: "EXPLORE",
                  title: "Campus events",
                  description: "Find your next experience.",
                },
                {
                  category: "LEARN",
                  title: "Student resources",
                  description: "Everything you need, together.",
                },
                {
                  category: "CONNECT",
                  title: "The community",
                  description: "Good ideas start with people.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <ArrowUpRight />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
