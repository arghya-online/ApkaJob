Hey folks..

Just shipped this little project called **ApkaJob** while grinding through React and all the modern frontend jazz.

I was tired of building yet another todo app, so I went for something that actually feels like a real thing – auth, roles, backend calls, UI polish, and yeah... plenty of bugs to cry over at 2am 😂

This is 100% a **learning project**, not me quitting my college to start a startup lol.

---

### What's this thing?

Tiny hiring platform with two sides:

**Recruiter vibes:**
- Post jobs
- Open/close hiring
- Check out applications
- Update statuses (accepted, rejected, etc.)

**Candidate vibes:**
- Browse open jobs
- Search + filter like a boss
- Apply with your resume
- Track where your apps stand
- Save jobs you like

Simple on paper, but it forced me to deal with all the messy real-world stuff.

---

### Why I built it

Tutorials are cool and all, but they skip the fun parts:
- Auth edge cases that make you question life
- "Wait why can't this user see that?" permission drama
- APIs randomly breaking
- Bugs that only appear at 2am

So I built this to intentionally break stuff, fix it, and actually understand WHY it broke. Learned 10x more this way 🤌

---

### Stuff I got hands-on with

- Solid React component structure
- Role-based UI (same app, totally different views depending on who's logged in)
- Drawers, tables, responsive layouts that don't suck on mobile
- Proper form handling (validation, file uploads, etc.)
- Real API calls that can fail
- Supabase RLS (hurt my brain but worth it)
- Not accidentally sending strings where numbers should be 😅

---

### Tech stack

**Frontend:**
- React
- Vite (blazing fast)
- React Router
- Tailwind CSS
- Shadcn UI components (they're clean af)

**Backend & Auth:**
- Supabase (Postgres + RLS + storage)
- Clerk for auth (way smoother than rolling my own)

---

### How to run it locally

1. Drop a `.env` file in the root with these:
   - VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key 
   - VITE_SUPABASE_URL=your_supabase_url 
   - VITE_SUPABASE_ANON_KEY=your_anon_key

2. Then:
```bash
git clone [https://github.com/your-username/ApkaJob.git](https://github.com/your-username/ApkaJob.git)
cd ApkaJob
npm install
npm run dev   
