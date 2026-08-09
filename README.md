# Edwin Choi Portfolio

A static Next.js portfolio with a technical-blueprint theme (light and dark), driven by YAML content and auto-deployed to GitHub Pages.

## Editing content

All the text lives in YAML, so you don't need to touch the code:

- `data/content.yaml`: hero copy, about, skills, contact, socials
- `data/projects.yaml`: one block per project card (copy a block to add one)
- `data/experience.yaml`: one block per role (tenure, title, company, location, description)

Push to `main` and the site rebuilds and redeploys automatically.

## Theme and design

Colours and fonts are tokens in `lib/config.tsx`, not scattered through the CSS:

- `themes.light` and `themes.dark` hold the two colour palettes. Edit a value and the whole site restyles.
- `fonts` sets the typefaces (Fraunces for display, IBM Plex Sans for body, IBM Plex Mono for labels). Change the family here and update the Google Fonts link in `app/layout.tsx`.

`config.tsx` injects these tokens into `:root` as CSS variables (`--bg`, `--accent`, `--mono`, and so on); `app/globals.css` reads them. The theme follows the visitor's system preference and can be flipped with the toggle in the nav, which remembers the choice in `localStorage`. A small inline script in `app/layout.tsx` applies the saved choice before first paint so there's no flash.

## Contact form

The contact section shows a form only when you give it an endpoint. In `data/content.yaml` under `contact`:

- Set `form_action` to a Formspree endpoint (it looks like `https://formspree.io/f/abcdwxyz`) to show the form. Submissions go to Formspree, so your email address never appears on the page.
- Leave `form_action: ""` and the form is hidden; only the social links show.

## Local development

    npm install
    npm run dev      # http://localhost:3000
    npm run build    # outputs the static site to ./out

## First-time deploy

1. Create a **public** repo named exactly `Edwin-Choi.github.io`.
2. Push these files to the `main` branch.
3. On github.com: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
4. Give the Action a minute or two to finish. Live at https://edwin-choi.github.io

## Where things live

- `data/*.yaml`: all site text.
- `lib/content.ts`: reads and types the YAML.
- `lib/config.tsx`: central config. Theme tokens, the fonts, the no-flash script, and the content re-exports. Everything imports from here.
- `app/layout.tsx`: document head, fonts, injected theme.
- `app/page.tsx`: page markup.
- `app/ThemeToggle.tsx`: the light/dark toggle.
- `app/Reveal.tsx`: scroll-in animation.
- `app/globals.css`: the blueprint styles.

## Notes

- `next.config.mjs` has `output: "export"`, which produces the static `out/` folder.
- `public/.nojekyll` stops GitHub Pages from hiding the `_next` assets folder.
- This is a **user site** served at the root, so `basePath` is empty. For a project repo instead, set `basePath` and `assetPrefix` to `"/repo-name"`.

## Still to personalize

- Replace the placeholder card in `data/projects.yaml` with real work.
- Paste a Formspree endpoint into `contact.form_action` if you want the contact form (otherwise it stays hidden).
