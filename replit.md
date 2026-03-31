# Codefusion Portfolio

A personal portfolio website served with Node.js + Express.

## Structure

```
portfolio/
├── index.html          # Home page (hero, skills, featured projects, contact)
├── css/
│   ├── style.css       # Main styles
│   └── responsive.css  # Responsive / mobile styles
├── js/
│   └── main.js         # Navbar scroll, animations, filter, form
├── images/
│   ├── profile.jpg     # Profile photo (add your own)
│   ├── project1.png    # Project screenshot (add your own)
│   └── background.jpg  # Hero background image (add your own)
└── pages/
    ├── about.html      # About page — bio, timeline, skill bars
    └── projects.html   # Projects page — filterable project grid
```

## Server

- `server.js` — Express server, serves `portfolio/` as static files on port 5000
- `package.json` — Node.js project config

## Running

The "Start application" workflow runs `node server.js` on port 5000.

## Customising

- **Images**: Drop your own `profile.jpg`, `project1.png`, and `background.jpg` into `portfolio/images/`. Fallbacks are built in for missing images.
- **Content**: Edit the HTML files directly to update your name, bio, skills, projects, and contact info.
- **Colors**: CSS custom properties in `style.css` (`:root`) control the whole color palette.
