# Local development

Install Node.js 24 LTS (includes npm) and Git. Next.js requires Node >=20.9.
Open a terminal in your cloned cloudpress-ai-secure folder.

```sh
git status
git pull --ff-only origin main
npm ci
npm run dev
```

Open http://localhost:3000/admin. Stop with Ctrl+C.
If port 3000 is occupied: npm run dev -- --port 3001.

If you have not cloned the repository:
```sh
git clone https://github.com/gowthamjaganathan244/cloudpress-ai-secure.git
cd cloudpress-ai-secure
npm ci
npm run dev
```

Run checks with npm run lint and npm run build. Preview production with npm run start after building.
Do not discard local changes if git pull reports a conflict. Commit or safely stash them first.

A pull request proposes changes on GitHub; git pull downloads changes to your PC.
This is a frontend demo: no AWS keys, .env file, backend, or cloud account is required.
Only navigation and theme switching are implemented; feature screens are clearly marked as planned.
Never use confidential data here: authentication and authorisation are not implemented.
