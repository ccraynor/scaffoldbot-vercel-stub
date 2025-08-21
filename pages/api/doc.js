// pages/api/doc.js — sanitizer version (hardcoded allowed list)

const ALLOWED = [
  "English",
  "Spanish",
  "Chinese",
  "Arabic",
  "Vietnamese",
  "Tagalog",
  "Somali",
  "Marshallese",
];

const CANON = new Map(ALLOWED.map((L) => [L.toLowerCase(), L]));

/** Returns { final, unknown } */
function sanitizeLanguages(incoming) {
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return { final: [...ALLOWED], unknown: [] };
  }
  const final = [];
  const unknown = [];
  for (const raw of incoming) {
    const s = String(raw ?? "").trim();
    if (!s) continue;
    const canon = CANON.get(s.toLowerCase());
    if (canon) {
      if (!final.includes(canon)) final.push(canon);
    } else {
      unknown.push(s);
    }
  }
  if (final.length === 0) {
    return { final: [...ALLOWED], unknown };
  }
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
      ...(unknown.length ? { _meta: { dropped_unknown_languages: unknown } } : {}),
    },
  });
}
