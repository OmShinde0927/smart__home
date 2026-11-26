# Smart Home – React + Express + Framer Motion

## Run (development)
    npm run install:all
    npm run dev
Open http://localhost:5173 (React, proxies /api to Express on :5000).

## Run (production)
    npm run build
    npm start
Open http://localhost:5000 (Express serves client/dist).

## Structure
- server/index.js – Express API: GET /api/content, GET/POST /api/feedback (in-memory)
- server/data.js – all site content (edit to expand copy)
- client/src/App.jsx – routes + AnimatePresence page switching
- client/src/components/Intro.jsx – animation when the site opens
- client/src/components/PageTransition.jsx – animation when the path changes
- client/src/pages/ – Home, Problems, Architecture, Impact, Feedback
