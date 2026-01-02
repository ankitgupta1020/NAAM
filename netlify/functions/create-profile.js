const SUPA_URL = process.env.SUPA_URL;
const SUPA_KEY = process.env.SUPA_SERVICE_ROLE_KEY;

exports.handler = async function(event) {
  const body = JSON.parse(event.body || '{}');
  const res = await fetch(`${SUPA_URL}/rest/v1/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ display_name: body.name, city: body.city })
  });
  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data[0]) };
};
