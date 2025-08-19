export function ok(res, data = {}) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({ ok: true, ...data }, null, 2));
}
export function fail(res, message = 'Bad Request', status = 400) {
  res.setHeader('Content-Type', 'application/json');
  res.status(status).send(JSON.stringify({ ok: false, error: message }, null, 2));
}
