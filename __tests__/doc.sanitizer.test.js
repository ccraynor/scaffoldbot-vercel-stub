jest.setTimeout(15000);
const BASE = "https://scaffoldbot-vercel-stub.vercel.app/api";

describe("doc sanitizer", () => {
  test("GET is 405 and has handler header", async () => {
    const res = await fetch(`${BASE}/doc`, { method: "GET" });
    expect(res.status).toBe(405);
    expect(res.headers.get("x-handler")).toBe("root-sanitizer");
  });

  test("POST drops unknown languages (e.g., Klingon)", async () => {
    const body = { family_note: { languages: ["english", "KLINGON"] } };
    const res = await fetch(`${BASE}/doc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.family_note.languages).toEqual(["English"]);
    expect(json.family_note._meta.dropped_unknown_languages).toEqual(["KLINGON"]);
  });
});
