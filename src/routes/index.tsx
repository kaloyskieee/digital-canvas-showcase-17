import { createFileRoute } from "@tanstack/react-router";
import { Header, Hero, About, Skills, Projects, Education, Interests, Contact } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — IT Student & Aspiring Developer" },
      { name: "description", content: "A curious mind. A builder at heart. Explore an IT student's portfolio, development interests, project concepts, and learning journey." },
      { property: "og:title", content: "Your Name — IT Student & Aspiring Developer" },
      { property: "og:description", content: "Turning ideas into digital experiences. A personal portfolio of creative exploration, technology, and continuous learning." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <><Header /><main id="main"><Hero /><About /><Skills /><Projects /><Education /><Interests /><Contact /></main></>;
}
