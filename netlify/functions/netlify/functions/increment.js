const SUPA_URL = process.env.SUPA_URL;
const SUPA_KEY = process.env.SUPA_SERVICE_ROLE_KEY;

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };
  const body = JSON.parse(event.body || '{}');
  const user_id = body.user_id;
  const amount = Number(body.amount || 1);
  if(!user_id) return { statusCode: 400, body: JSON.stringify({ error: 'user_id required' }) };

  const date = new Date().toISOString().slice(0,10);

  const res = await fetch(`${SUPA_URL}/rest/v1/rpc/increment_daily_count`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`
    },
    body: JSON.stringify({ p_user_id: user_id, p_date: date, p_amount: amount })
  });

  return { statusCode: res.status, body: await res.text() };
};
