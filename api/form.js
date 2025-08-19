// api/form.js
export default async function handler(req, res) {
  // Optional: read KPI payload
  // const { kpi } = req.body || {};

  // Return a *clickable* URL (placeholder here)
  return res.status(200).json({
    ok: true,
    id: `form_${Date.now()}`,
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfAKE_FORM_ID/viewform"
  });
}
