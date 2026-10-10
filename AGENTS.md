<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep editable portfolio examples and personal details in `src/lib/portfolio-data.ts` so confirmed content can replace examples without changing presentation.
- Keep this portfolio as one scrolling index route with section anchors because the requested navigation explicitly uses smooth scrolling between sections.
- Use reusable portfolio components and semantic styles in the global design system so sections share motion, spacing, and visual behavior.
- Open sample project details locally and expose external destinations only when supplied, so placeholder content never creates fabricated links.
