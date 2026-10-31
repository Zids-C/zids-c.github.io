# Osman Goni — Portfolio

A responsive React + Vite portfolio for GitHub Pages, designed in an editorial visual direction with a warm paper palette, forest-green ink, acid-lime accents, an original U-Net architecture illustration, and lightweight scroll reveals.

## Local development

Requirements: Node.js 22 or a compatible modern Node.js release.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Vite writes the static production website to `dist/`.

## Deploy to `https://Zids-C.github.io/`

1. Create or open the GitHub repository named **`Zids-C.github.io`**.
2. Put the contents of this project folder in the repository root (including `.github/workflows/deploy.yml`).
3. Commit and push the files to the `main` branch.
4. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
5. Open the **Actions** tab and check the “Deploy portfolio to GitHub Pages” workflow. Once it succeeds, the site should be available at `https://Zids-C.github.io/`.

The included workflow builds the Vite app and deploys the `dist/` output on pushes to `main`. This is a static site: there is no server, database, or API secret in the frontend.

## Personal details and project content

The portfolio text is based on the supplied resume. The résumé PDF is included at `public/osman-goni-resume.pdf` and linked from the site. The GitHub profile link points to `https://github.com/Zids-C`; no project-specific repository links or LinkedIn URL were supplied, so those have not been invented.

Before publishing, confirm that you want your résumé's phone number and email address visible publicly. GitHub Pages is public by default.
