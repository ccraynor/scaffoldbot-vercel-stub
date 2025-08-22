set -euo pipefail

BASE="${BASE:-https://scaffoldbot-vercel-stub.vercel.app/api}"
status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/doc")
echo "GET /doc => $status"
test "$status" = "405" && echo "GET 405 ok"
hdr=$(curl -sD - -o /dev/null "$BASE/doc" \
  | tr '[:upper:]' '[:lower:]' \
  | grep -Fi 'x-handler: root-sanitizer' || true)
[ -n "$hdr" ] && echo "x-handler header ok"
resp=$(curl -sS -X POST -H "Content-Type: application/json" \
  -d '{"family_note":{"languages":["english","KLINGON"]}}' "$BASE/doc")

echo "$resp" | jq -e \
  '.family_note.languages==["English"] and .family_note._meta.dropped_unknown_languages==["KLINGON"]' >/dev/null

echo "POST sanitizer ok"
