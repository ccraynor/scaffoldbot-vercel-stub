# ScaffoldBot Vercel Stub API

Minimal serverless API for smoke-testing GPT Actions buttons.

## Endpoints
- `GET /health` — returns `{ ok: true, status: "ok" }`
- `POST /form` — echoes KPI JSON and returns a stub Google Form URL
- `POST /doc` — echoes `family_note` and returns a stub Google Doc URL
- `POST /pdf` — returns a stub PDF URL

## Deploy
1. Create a new project at https://vercel.com/new and import this folder.
2. (Optional) Set environment variables:
   - `SB_FORMS_SCRIPT_URL`
   - `SB_DOCS_SCRIPT_URL`
   - `SB_PDF_SERVICE_URL`
3. Deploy. Your base URL will look like `https://<project-name>.vercel.app`.

## Local Dev
- Install Vercel CLI: `npm i -g vercel`
- Run: `vercel dev`


```bash
npm run dev
BASE="http://localhost:3000/api" ./scripts/smoke.sh

```

<!-- seed: 2025-08-31T22:06:38Z -->
