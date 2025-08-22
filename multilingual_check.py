import sys, yaml, re
FN = "ELL_ESL_CorePlus_v1_6.yaml"
TARGETS = ["English","Spanish","Chinese","Arabic","Vietnamese","Tagalog","Somali","Marshallese"]

with open(FN, "r", encoding="utf-8") as f:
    data = yaml.safe_load(f)

texts = [str(data)]
present = {t: bool(re.search(rf'\b{re.escape(t)}\b', str(data))) for t in TARGETS}

found_by_key = {}
def dig(obj, path=()):
    if isinstance(obj, dict):
        for k, v in obj.items():
            dig(v, path+(k,))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            dig(v, path+(str(i),))
    else:
        return
try:
    found_by_key["output_templates.family_note.supported_languages"] = data["output_templates"]["family_note"]["supported_languages"]
except: pass
try:
    found_by_key["compliance_and_enforcement.policies.family_note_enforcement.qa_metadata_defaults.languages"] = \
        data["compliance_and_enforcement"]["policies"]["family_note_enforcement"]["qa_metadata_defaults"]["languages"]
except: pass
try:
    found_by_key["templates.family_note_skeleton.qa.languages"] = \
        data["templates"]["family_note_skeleton"]["qa"]["languages"]
except: pass

print("=== Multilingual Expansion Check ===")
print("Targets:", ", ".join(TARGETS))
if found_by_key:
    print("\nFound in explicit language fields:")
    for k, vals in found_by_key.items():
        print(f"  - {k}: {vals}")

print("\nPresence anywhere in YAML:")
missing = []
for t in TARGETS:
    ok = present[t]
    print(f"  {t}: {'✅' if ok else '❌'}")
    if not ok: missing.append(t)

if missing:
    print("\nMissing languages:", ", ".join(missing))
    sys.exit(2)
else:
    print("\nAll target languages detected ✅")
