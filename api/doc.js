// api/doc.js
export default async function handler(req, res) {
  // const { family_note } = req.body || {};

  // Return a *clickable* Google Doc URL (placeholder)
  return res.status(200).json({
    ok: true,
    id: `doc_${Date.now()}`,
    url: "https://docs.google.com/document/d/1FAIpQLSfAKE_DOC_ID/edit"
  });
}
