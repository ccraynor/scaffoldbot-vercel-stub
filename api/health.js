// api/health.js
module.exports = (req, res) => {
  res.status(200).json({ status: 'ok', service: 'scaffoldbot-vercel-stub' });
};
