export default function handler(req, res) {
  res.status(200).json({ ok: true, service: 'scaffoldbot-vercel-stub', ts: new Date().toISOString() });
}
