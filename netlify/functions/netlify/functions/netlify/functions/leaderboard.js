// leaderboard.js
const SUPA_URL = process.env.SUPA_URL;
const SUPA_KEY = process.env.SUPA_SERVICE_ROLE_KEY;

exports.handler = async function(event) {
  const res = await fetch(`${SUPA_URL}/rest/v1/weekly_leaderboard?select=id,display_name,city,weekly_total,week_key&order=weekly_total.desc&limit=10`, {
    headers: {
      'apikey': SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`
    }
  });
  const data = await res.json();
  return { statusCode: res.status, body: JSON.stringify(data) };
};
