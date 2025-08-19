import { ok, fail } from './_helpers/response.js';
export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return fail(res, 'Method not allowed', 405);
  }
  const samplePdf = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  ok(res, {
    kind: 'pdf',
    url: process.env.SB_PDF_SERVICE_URL || samplePdf
  });
}
