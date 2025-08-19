// api/pdf.js
export default async function handler(req, res) {
  // const { kpi } = req.body || {};

  // Return a *clickable* PDF URL (placeholder).
  // You can swap this to your own hosted PDF link later.
  return res.status(200).json({
    ok: true,
    id: `pdf_${Date.now()}`,
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  });
}
