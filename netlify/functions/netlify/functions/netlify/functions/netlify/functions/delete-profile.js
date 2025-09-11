// delete-profile.js
const SUPA_URL = process.env.SUPA_URL;
const SUPA_KEY = process.env.SUPA_SERVICE_ROLE_KEY;

exports.handler = async function(event) {
  if(event.httpMethod !== 'POST') return { statusCode:405 };
  const { user_id } = JSON.parse(event.body || '{}');
  if(!user_id) return { statusCode:400, body: JSON.stringify({error:'user_id required'}) };

  const res = await fetch(`${SUPA_URL}/rest/v1/profiles?id=eq.${user_id}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`
    }
  });
  return { statusCode: res.status, body: JSON.stringify({ ok: res.status === 204 || res.status === 200 }) };
};
