const SUPA_URL = process.env.SUPA_URL;
const SUPA_KEY = process.env.SUPA_SERVICE_ROLE_KEY;

exports.handler = async function() {
  const res = await fetch(`${SUPA_URL}/rest/v1/weekly_leaderboard?select=id,display_name,city,weekly_total&order=weekly_total.desc&limit=10`, {
    headers: {
      'apikey': SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`
    }
  });
  const data = await res.json();
  return { 
    statusCode: 200, 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data) 
  };
};
