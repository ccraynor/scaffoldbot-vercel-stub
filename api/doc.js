import { ok, fail } from './_helpers/response.js';
export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return fail(res, 'Method not allowed', 405);
  }
  const body = req.body || {};
  ok(res, {
    kind: 'doc',
    url: process.env.SB_DOCS_SCRIPT_URL || 'https://docs.google.com/document/d/FAKE_DOC_ID/edit',
    meta: body.family_note || null
  });
}
