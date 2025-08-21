// api/doc.js — sanitizer (root functions project)

const ALLOWED = ["English","Spanish","Chinese","Arabic","Vietnamese","Tagalog","Somali","Marshallese"];
const ALLOWED_LOWER = new Map(ALLOWED.map(n => [n.toLowerCase(), n]));

function sanitizeLanguages(input) {
  if (!Array.isArray(input) || input.length === 0) return { final: [...ALLOWED], unknown: [] };
  const final = [], unknown = [], seen = new Set();
  for (const raw of input) {
    if (typeof raw !== "string") { unknown.push(raw); continue; }
    const canonical = ALLOWED_LOWER.get(String(raw).trim().toLowerCase());
    if (canonical) { if (!seen.has(canonical)) { seen.add(canonical); final.push(canonical); } }
    else { unknown.push(raw); }
  }
  return final.length === 0 ? { final: [...ALLOWED], unknown } : { final, unknown };
}

export default function handler(req, res) {
  const HANDLER = "root-sanitizer";
  res.setHeader("x-handler", HANDLER);
  res.setHeader("Cache-Control", "no-store"); // ensure we always see fresh

  if (req.method !== "POST") {
    return res.status(405).json({ ok:false, error:"Method Not Allowed", _handler: HANDLER });
  }

  const incoming = req.body?.family_note?.languages;
  const { final, unknown } = sanitizeLanguages(incoming);
  return res.status(200).json({
    ok: true,
    kind: "doc",
    _handler: HANDLER,
    family_note: {
      languages: final,
      ...(unknown.length ? { _meta: { dropped_unknown_languages: unknown } } : {})
    }
  });
}
