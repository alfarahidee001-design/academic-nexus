# School Portal (Vanilla JS) Implementation Plan

Transitioning the project from React to a pure HTML, CSS, and Vanilla JavaScript implementation as per the updated user request. This will remove all React dependencies and use standard web APIs for routing, state, and rendering.

## Scope Summary
- **Technology Stack:** HTML5, CSS3 (Tailwind via CDN), Vanilla JavaScript (ES6+).
- **Core Features:**
  - Dynamic role-based dashboards (Admin, Teacher, Student).
  - Mock authentication (Session-based via localStorage).
  - Data persistence via `localStorage`.
  - Component-based architecture using JS template strings.
- **Pages:**
  - Login (Role Selection).
  - Admin Dashboard: Stats & User Management.
  - Teacher Dashboard: Class lists & Grading.
  - Student Dashboard: Schedule & Grades.

## Assumptions & Open Questions
- **Icons:** Use Lucide icons via CDN.
- **Styling:** Use Tailwind CSS via CDN for rapid development without a build step.
- **Routing:** Simple hash-based router (`#dashboard`, `#login`) to handle SPAs without server-side configuration.

## Affected Areas
- `index.html`: Will become the single entry point.
- `src/`: All React files (`.tsx`) will be deprecated/ignored. New `.js` files will be created for logic.
- `package.json`: Scripts will be updated to reflect a static site (though Vite can still serve it).

## Auth & RLS model
**Auth in scope:** no (Local session only)
**Model:** no_auth_public_read (Simulated via JS logic)
**RLS strategy:** None (No Supabase)
**Frontend implication:** Role checks performed in JS before rendering views.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Phases

### Phase 1: Foundation (Vanilla JS)
- Clear/Replace `index.html` with a clean structure including Tailwind CDN and Lucide scripts.
- Implement `src/js/store.js` for data persistence (localStorage).
- Implement `src/js/router.js` for hash-based navigation.
- **Owner:** frontend_engineer

### Phase 2: Auth & Layout
- Create the Login view (HTML template in JS).
- Create a global `Layout` function that renders the Header and Sidebar.
- Implement login/logout logic.
- **Owner:** frontend_engineer

### Phase 3: Dashboard Views
- Implement `renderAdminDashboard()`, `renderTeacherDashboard()`, and `renderStudentDashboard()`.
- Use template literals for building tables, cards, and lists.
- **Owner:** frontend_engineer

### Phase 4: Interactivity & Data Management
- Add event listeners for "Add Student", "Enter Grade", and "Role Switching".
- Ensure the state updates correctly and re-renders the active view.
- **Owner:** frontend_engineer

### Phase 5: Cleanup & Polish
- Remove or move existing React files to a `deprecated/` folder if necessary, or simply overwrite the main entry points.
- Final CSS adjustments for a polished "Portal" look.
- **Owner:** quick_fix_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Core framework and view implementation.
2. quick_fix_engineer — Interactivity and final UI polish.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** Complete rewrite to Vanilla JS. Ensure the app works as an SPA using hash routing.
- **Files:** 
  - `index.html` (Overwrite existing)
  - `src/js/app.js` (Entry point)
  - `src/js/router.js`
  - `src/js/store.js`
  - `src/js/views/login.js`, `src/js/views/dashboard.js`, etc.
- **Acceptance criteria:**
  - No React code remains in the active execution path.
  - Role-based views work correctly.
  - UI looks professional using Tailwind classes.

### 2. quick_fix_engineer
- **Phases:** 5
- **Scope:** Visual polishing and event handling fixes.
- **Files:** `index.html`, `src/js/app.js`
- **Depends on:** frontend_engineer
- **Acceptance criteria:**
  - All buttons trigger expected JS actions.
  - Mobile responsiveness is functional.

**Do not dispatch:**
- supabase_engineer
