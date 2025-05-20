# 🩺 Patient Registration App

A frontend-only patient registration system built using **React + TypeScript**, powered by **SQLite in the browser** using **PGlite** with persistent storage via IndexedDB.

🌐 **Live App:**  
👉 https://patient-registration-rdfl0jbl3-santra-subhojits-projects.vercel.app/

---

## 🚀 Setup & Usage

```bash
# 1. Clone the repository
git clone https://github.com/your-username/patient-registration-app.git
cd patient-registration-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# App runs at http://localhost:5173
```

---

## 📦 Deploy to Vercel

```bash
# Make sure changes are committed
git add .
git commit -m "Deploy updates"

# Push to GitHub
git push origin main

# Then deploy manually or via CLI:
vercel --prod
```

---

## 🧩 Features

- Register patient: `name`, `age`, `gender`, `disease`
- Automatic `date_of_entry` (only date, no time)
- Display full patient list (persisted in browser)
- Custom SQL query panel
- Cross-tab synchronisation via `BroadcastChannel`
- Dark/Light theme responsive UI

---

## 🛠 Git Commit History

```bash

git init
git add README.md
git commit -m "first commit"

# 1. Scaffold Vite + React + TypeScript
git add package.json tsconfig.json vite.config.ts
git commit -m "Scaffold Vite + React + TypeScript project"  
# vite.config.ts excerpt:
#   optimizeDeps: { exclude: ['@electric-sql/pglite'] }, worker: { format: 'es' }

# 2. Add PGlite worker and base patient schema
git add src/pglite-worker.ts
git commit -m "Add PGlite worker and base patient table schema"  
# src/pglite-worker.ts:
#   await db.query(`CREATE TABLE IF NOT EXISTS patient ( id SERIAL PRIMARY KEY, name TEXT NOT NULL, age INTEGER, gender TEXT );`);

# 3. Implement registration form & list in App.tsx
git add src/App.tsx
git commit -m "Add patient registration form and list functionality"  
# App.tsx excerpt:
#   <form onSubmit={addPatient}>...<input placeholder="Name" />...</form>
#   useEffect(() => loadPatients(), []);

# 4. Add disease & entry date columns safely
git add src/pglite-worker.ts
git commit -m "Add disease and date_of_entry columns with safe ALTER TABLE"  
# src/pglite-worker.ts excerpt:
#   await db.query(`ALTER TABLE patient ADD COLUMN IF NOT EXISTS disease TEXT;`);
#   await db.query(`ALTER TABLE patient ADD COLUMN IF NOT EXISTS date_of_entry DATE NOT NULL DEFAULT CURRENT_DATE;`);

# 5. Display disease and formatted entry date
git add src/App.tsx
git commit -m "Display disease and formatted date_of_entry in list"  
# App.tsx excerpt:
#   {p.date_of_entry && `Entry: ${String(p.date_of_entry).slice(0,10)}`}
#   {p.disease && `Disease: ${p.disease}`}

# 6. Apply global styling and scrollable list
git add src/index.css
git commit -m "Add unified styling and scrollable patient list"  
# index.css excerpt:
#   form input, form select { width: 100%; }
#   .table-container { max-height: 400px; overflow-y: auto; }

# 7. Deploy to Vercel
git add .
git commit -m "Deploy to Vercel"
vercel --prod

---

## 💾 Local Database (PGlite + IndexedDB)

- Uses `@electric-sql/pglite` for SQLite in browser
- Data stored in IndexedDB via `idb://patients`
- Schema migrations handled with `ALTER TABLE ADD COLUMN IF NOT EXISTS`

---

## 🧠 Development Challenges & Solutions

- **Schema migrations**: Used `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` safely
- **Date formatting**: Ensured only date part is shown via slicing
- **Cross-tab sync**: Implemented `BroadcastChannel` for real-time updates
- **Styling consistency**: Applied `width: 100%` to all form elements

---

## 📁 Project Structure

```
patient-registration-app/
├── src/
│   ├── App.tsx
│   ├── pglite-worker.ts
│   ├── index.css
│   └── main.tsx
├── public/
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Technologies Used

- React + TypeScript
- Vite
- PGlite (SQLite WASM)
- IndexedDB
- Vercel

---

## 📬 Feedback

Open issues or PRs on GitHub!
