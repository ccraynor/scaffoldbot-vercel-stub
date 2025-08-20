// api/doc.js
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

// Fallback list if YAML isn't present or doesn't contain the key
const FALLBACK_LANGS = [
  'English',
  'Spanish',
  'Chinese',
  'Arabic',
  'Vietnamese',
  'Tagalog',
  'Somali',
  'Marshallese',
];

let _cachedAllowed = null;

/**
 * Load allowed languages from ELL_ESL_CorePlus_v1_6.yaml
 * Path: output_templates.family_note.supported_languages
 */
function getAllowedLanguages() {
  if (_cachedAllowed) return _cachedAllowed;

  try {
    const yamlPath = path.resolve(process.cwd(), 'ELL_ESL_CorePlus_v1_6.yaml');
    const raw = fs.readFileSync(yamlPath, 'utf8');
    const doc = YAML.parse(raw);
    const langs =
      doc?.output_templates?.family_note?.supported_languages;

    if (Array.isArray(langs) && langs.every(s => typeof s === 'string')) {
      _cachedAllowed = dedupePreserveOrder(langs);
      return _cachedAllowed;
    }
  } catch {
    // ignore; we'll use fallback
  }

  _cachedAllowed = FALLBACK_LANGS.slice();
  return _cachedAllowed;
}

function dedupePreserveOrder(arr) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const key = String(item);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

/**
 * Sanitize incoming list against allowed languages (case-insensitive),
 * returning canonical casing from allowed list. Unknowns are reported.
 */
function sanitizeLanguages(incoming) {
  const allowed = getAllowedLanguages();
  const mapLowerToCanonical = new Map(
    allowed.map(a => [a.toLowerCase(), a])
  );

  const requested = Array.isArray(incoming)
    ? incoming.filter(x => typeof x === 'string').map(s => s.trim()).filter(Boolean)
    : [];

  const final = [];
  const unknown = [];
  const seen = new Set();

  for (const req of requested) {
    const key = req.toLowerCase();
    if (mapLowerToCanonical.has(key)) {
      const canonical = mapLowerToCanonical.get(key);
      if (!seen.has(canonical)) {
        seen.add(canonical);
        final.push(canonical);
      }
    } else {
      unknown.push(req);
    }
  }

  // If nothing valid was provided, default to the allowed list
  const result = final.length ? final : allowed.slice();
  return { final: result, unknown };
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ ok: false, error: 'Method Not Allowed' });
  }

  const body = req.body || {};
  const incoming = body?.family_note?.languages;

  const { final, unknown } = sanitizeLanguages(incoming);

  const payload = {
    ok: true,
    kind: 'doc',
    family_note: {
      languages: final,
    },
  };

  if (unknown.length) {
    payload.family_note._meta = { dropped_unknown_languages: unknown };
  }

  return res.status(200).json(payload);
}
