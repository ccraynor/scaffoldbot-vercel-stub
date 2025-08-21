const ALLOWED = [
  "English","Spanish","Chinese","Arabic","Vietnamese","Tagalog","Somali","Marshallese"
];
const CANON = new Map(ALLOWED.map(n => [n.toLowerCase(), n]));

function sanitizeLanguages(incoming) {
  const final = [];
  const unknown = [];

  if (Array.isArray(incoming)) {
    for (const raw of incoming) {
      if (typeof raw !== "string") continue;
      const key = raw.trim().toLowerCase();
      const canonical = CANON.get(key);
      if (canonical) {
        if (!final.includes(canonical)) final.push(canonical);
      } else {
        unknown.push(raw);
      }
    }
  }
  if (final.length === 0) return { final: [...ALLOWED], unknown };
  return { final, unknown };
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }
  const incoming = req.body?.family_note?.languages;
  const { final, unknown } = sanitizeLanguages(incoming);

  return res.status(200).json({
    ok: true,
    kind: "doc",
    family_note: {
      languages: final,
      ...(unknown.length ? { _meta: { dropped_unknown_languages: unknown } } : {})
    }
  });
}
