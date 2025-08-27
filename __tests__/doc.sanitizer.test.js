// __tests__/doc.sanitizer.test.js

// Give the remote endpoint enough time on cold starts in CI
jest.setTimeout(15000);

const BASE = process.env.BASE || "http://localhost:3000/api";

describe("doc sanitizer", () => {
  test("GET is 405 and has handler header", async () => {
    const res = await fetch(`${BASE}/doc`, { method: "GET" });

    expect(res.status).toBe(405);
    // Header names are case-insensitive, but use the canonical form
    const handlerHeader = res.headers.get("x-handler") ?? res.headers.get("X-Handler");
    expect(handlerHeader).toBe("root-sanitizer");
  });

  test("POST drops unknown languages (e.g., Klingon)", async () => {
    const body = { family_note: { languages: ["english", "KLINGON"] } };

    const res = await fetch(`${BASE}/doc`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    expect(res.ok).toBe(true);

    const data = await res.json();

    // Support either { family_note: { languages: [...] } } or { languages: [...] }
    const languages =
      data?.family_note?.languages ??
      data?.languages ??
      [];

    expect(Array.isArray(languages)).toBe(true);
    expect(languages).toContain("english");
    // Ensure any unknown language (like KLINGON) was removed by the sanitizer
    const lower = languages.map((s) => String(s).toLowerCase());
    expect(lower).not.toContain("klingon");
  });
});
