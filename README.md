# Israel Olashore — Portfolio

A Vite + React portfolio with an animated introduction, a gesture-controlled project carousel, six individual project views, skills, an About section, expandable services, and contact options.

## Run locally

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
```

Serve `dist/` with a static web host. Project detail views use hash routes, so they work without custom server rewrites. No API keys are required.

## Content

- `src/projects.jsx`: project descriptions, screenshots and live URLs.
- `src/skills.jsx`: skills and local logo files.
- `src/about.jsx`: biography and portrait.
- `src/services.jsx`: service descriptions.
- `src/contact-links.js`: email, WhatsApp, GitHub and LinkedIn destinations.
- `src/style.css`: responsive styling and motion preferences.
- `src/theme.jsx`: light/dark control and saved theme preference.

The theme initially follows the visitor’s system preference and remembers their choice in local storage. Both the homepage and project views include a theme toggle.

Contact enquiries prepare a WhatsApp message or an email draft for visitors to review and send. The website does not send messages directly or store enquiries in a database.

All logos and preview images are served locally. Skill logos come from Devicon; the accompanying license is in `public/skills/DEVICON-LICENSE.txt`.
