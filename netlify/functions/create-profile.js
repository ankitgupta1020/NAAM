// create-profile.js
const SUPA_URL = process.env.SUPA_URL;
const SUPA_KEY = process.env.SUPA_SERVICE_ROLE_KEY;

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  const body = JSON.parse(event.body || '{}');
  const name = (body.name || '').trim();
  const city = (body.city || '').trim();
  if(!name) return { statusCode: 400, body: JSON.stringify({ error: 'Name required' }) };

  const res = await fetch(`${SUPA_URL}/rest/v1/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ display_name: name, city })
  });

  const data = await res.json();
  return { statusCode: res.status, body: JSON.stringify(data[0] || data) };
};
