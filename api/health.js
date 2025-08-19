import { ok } from './_helpers/response.js';
export default function handler(req, res) {
  ok(res, { status: 'ok', ts: new Date().toISOString() });
}
