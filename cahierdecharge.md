# MODULE 1: Auth System (Users)
**Goal**: Signup/Login + JWT + Protected routes

## Tasks
- Create MongoDB User model (email, passwordHash)
- Setup /auth/register + /auth/login routes  
- Use bcrypt to hash passwords
- Generate and verify JWT
- Add middleware to protect routes
- In RTK Query, set up baseQuery to auto attach token

### Docs
- JWT Basics
- RTK Query baseQuery auth setup

# MODULE 2: Contact Management (CRUD) 
**Goal**: User can create, edit, delete, and view contacts

## Tasks
- Define Contact schema (name, email, notes[], userId)
- Setup /contacts routes (CRUD)
- Add route guards: only owner can CRUD their contacts
- In React, set up RTK Query slice for contacts
- Create pages/UI:
  - Contact list
  - Create/Edit form
  - Delete confirmation
  - Persist auth across refreshes

### Docs
- RTK Query CRUD
- Mongoose basics

# MODULE 3: AI Summarizer with Gemini API
**Goal**: Summarize notes about a contact

## Tasks
- Create route /contacts/:id/summary
- Collect all notes, send to Gemini API
- Return summarized version
- Show summary on frontend with loading UI

### Docs
- Gemini API (Use the REST version for easy setup)

# MODULE 4: Resend + Arcjet Integration
**Goal**: Email a contact + secure endpoints

## Tasks
### Resend
- Setup Resend account + API key
- Create /contacts/:id/email route
- Use Resend to email the contact (e.g. "Welcome!")
- Add RTK endpoint and button to trigger it

### Arcjet
- Install and setup Arcjet SDK
- Add protection middleware to /contacts/*
- Add basic rate limiting to email + summary routes

### Docs
- Resend API
- Arcjet for Node.js

# MODULE 5: UI with Tailwind + Polish
**Goal**: Responsive, fast, clean UI

## Tasks
- Set up Tailwind (PostCSS or Vite plugin)
- Build:
  - Auth forms
  - Contact cards
  - Modals for editing
  - Toasts for actions
- Make it responsive
- Dark mode toggle (optional)

### Docs
- Tailwind Docs
- Heroicons for icons
- Headless UI for modals

# RECOMMENDED WORKFLOW
## Dev loop
1. Backend route first (test with Postman)
2. RTK Query endpoint (check cache, errors, loading)
3. Build the frontend UI
4. Wire it all up