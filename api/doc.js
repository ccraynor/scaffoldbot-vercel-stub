// pages/api/doc.js
// Sanitizes family_note.languages and defaults to the top 8 if none provided.

const ORDERED_DEFAULTS = [
  "English",
  "Spanish",
  "Chinese",
  "Arabic",
  "Vietnamese",
  "Tagalog",
  "Somali",
  "Marshallese",
];

// case-insensitive allowlist -> canonical casing
const ALLOWED_MAP = new Map(
  ORDERED_DEFAULTS.map((name) => [name.toLowerCase(), name])
);

function sanitizeLanguages(input) {
  if (!Array.isArray(input)) return { final: ORDERED_DEFAULTS.slice(), unknown: [] };

  const seen = new Set();
  const final = [];
  const unknown = [];

  for (const raw of input) {
    if (typeof raw !== "string") continue;
    const key = raw.trim().toLowerCase();
    if (!key) continue;

    const canon = ALLOWED_MAP.get(key);
    if (canon) {
      if (!seen.has(canon)) {
        seen.add(canon);
        final.push(canon);
      }
    } else {
      unknown.push(raw);
    }
  }

  // If nothing valid, fall back to defaults
  return { final: final.length ? final : ORDERED_DEFAULTS.slice(), unknown };
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
