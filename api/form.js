export default async function handler(req, res) {
  const body = (req.method === 'POST' ? req.body : {}) || {};
  res.status(200).json({
    ok: true,
    kind: "form",
    kpi: body.kpi || {}
  });
}
