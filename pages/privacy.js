// pages/privacy.js
import Head from "next/head";

export default function PrivacyPage() {
  const isoDate = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Head>
        <title>Privacy Policy – ScaffoldBot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <main style={styles.main}>
        <article style={styles.card}>
          <h1 style={styles.h1}>Privacy Policy</h1>
          <p style={styles.muted}>Last updated: {isoDate}</p>

          <p>
            <strong>ScaffoldBot</strong> is designed for educators. We do not
            collect student personal information. Please do not paste student
            names, IDs, grades, or other sensitive data.
          </p>

          <h2 style={styles.h2}>Data We Handle</h2>
          <ul>
            <li>
              <strong>Inputs you provide:</strong> prompts, settings, and
              context used to generate scaffolds and lessons.
            </li>
            <li>
              <strong>Generated outputs:</strong> lesson scaffolds/resources
              produced for your use.
            </li>
            <li>
              <strong>Operational logs:</strong> minimal, non-student technical
              logs for reliability and abuse prevention.
            </li>
          </ul>

          <h2 style={styles.h2}>How Data Is Used</h2>
          <ul>
            <li>
              Inputs are processed by AI providers (e.g., OpenAI) to generate
              outputs.
            </li>
            <li>
              We may analyze aggregate, de-identified usage to improve UX and
              performance.
            </li>
          </ul>

          <h2 style={styles.h2}>What We Don’t Do</h2>
          <ul>
            <li>We don’t sell your data.</li>
            <li>We don’t run targeted advertising.</li>
            <li>We don’t knowingly collect or store student PII.</li>
          </ul>

          <h2 style={styles.h2}>Security</h2>
          <p>
            We use reasonable technical and organizational measures (HTTPS,
            least-privilege access, environment-scoped secrets). No system is
            100% secure; use in accordance with your district policies.
          </p>

          <h2 style={styles.h2}>Your Choices</h2>
          <ul>
            <li>Avoid entering student PII.</li>
            <li>
              Export outputs (PDF/Docs/Slides) and store them per your district
              policy.
            </li>
            <li>Contact us to raise questions or request changes.</li>
          </ul>

          <h2 style={styles.h2}>Contact</h2>
          <p>
            Proof Point Learning •{" "}
            <a href="mailto:support@proofpointlearning.com">
              support@proofpointlearning.com
            </a>
          </p>
        </article>
      </main>
    </>
  );
}

const styles = {
  main: {
    fontFamily:
      'system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
    maxWidth: 880,
    margin: "2rem auto",
    padding: "0 1rem",
    lineHeight: 1.6,
  },
  card: {
    background: "white",
    borderRadius: 12,
    padding: "1.5rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  h1: { fontSize: "1.8rem", margin: "0 0 .5rem" },
  h2: { marginTop: "1.5rem" },
  muted: { color: "#6b7280", margin: 0 },
};
