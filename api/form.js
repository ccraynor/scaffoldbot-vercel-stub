import { ok, fail } from './_helpers/response.js';
export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return fail(res, 'Method not allowed', 405);
  }
  // Echo KPI if provided; otherwise include a stub
  const body = req.body || {};
  const kpi = body.kpi || { topic: "Main Idea", gradeBand: "3-5" };
  // Return a fake Google Form URL for now
  ok(res, {
    kind: 'form',
    url: process.env.SB_FORMS_SCRIPT_URL || 'https://docs.google.com/forms/d/e/FAKE_FORM_ID/viewform',
    kpi
  });
}
