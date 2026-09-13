 # JESVEL Technologies — Website

Premium corporate website for JESVEL Technologies Pvt. Ltd.

## Status

- [x] Brand mark and logo set (`assets/logo/`, `assets/icons/favicon.svg`)
- [x] Design system (`css/style.css`)
- [x] Homepage (`index.html`)
- [ ] About page (`about.html`)
- [ ] Services page (`services.html`)
- [ ] Projects page (`projects.html`)
- [x] Contact page (`contact.html`)

## How to preview

No build step is needed — this is plain HTML/CSS/JS.

1. Open the `jesvel-website` folder.
2. Double-click `index.html` to open it in your browser, **or**
3. If you have VS Code, install the "Live Server" extension, right-click `index.html` and choose "Open with Live Server" (recommended — this makes the sticky header and smooth scroll behave exactly as in production).

The internal links to `about.html`, `services.html`, `projects.html` and `contact.html` will 404 until those pages are built in the next steps — that's expected at this stage.

## Folder structure

```
jesvel-website/
├── index.html
├── about.html        (coming next)
├── services.html      (coming next)
├── projects.html      (coming next)
├── contact.html        (coming next)
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── logo/
│   │   ├── jesvel-mark.svg            – icon only, transparent
│   │   ├── jesvel-icon-badge.svg      – icon in rounded badge (app icon / social)
│   │   ├── jesvel-logo-horizontal.svg – mark + wordmark, color
│   │   └── jesvel-logo-mono.svg       – mark + wordmark, single color
│   ├── images/
│   └── icons/
│       └── favicon.svg
└── README.md
```
