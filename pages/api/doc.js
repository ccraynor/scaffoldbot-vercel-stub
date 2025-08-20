import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

function loadCfg() {
  const p = path.join(process.cwd(), 'ELL_ESL_CorePlus_v1_6.yaml');
  try {
    const raw = fs.readFileSync(p, 'utf8');
    return YAML.parse(raw) || {};
  } catch (_) {
    return {};
  }
}

const cfg = loadCfg();

// Supported & defaults come from YAML; fall back to the 8-language set.
const SUPPORTED = new Set(
  cfg?.output_templates?.family_note?.supported_languages ??
  ['English','Spanish','Chinese','Arabic','Vietnamese','Tagalog','Somali','Marshallese']
);

const DEFAULTS =
  cfg?.templates?.family_note_skeleton?.qa?.languages ??
  Array.from(SUPPORTED);

function sanitizeLanguages(input) {
  const requested = Array.isArray(input) ? input : [];
  const valid = requested.filter(l => SUPPORTED.has(l));
  const unknown = requested.filter(l => !SUPPORTED.has(l));
  const final = (valid.length ? valid : DEFAULTS).slice(0);
  return { final, unknown };
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
  const incoming = req.body?.family_note?.languages;
  const { final, unknown } = sanitizeLanguages(incoming);

  return res.status(200).json({
    ok: true,
    kind: 'doc',
    family_note: {
      languages: final,
      ...(unknown.length ? { _meta: { dropped_unknown_languages: unknown } } : {})
    }
  });
}
