export async function onRequestGet({ request, env }) {
  const page = new URL(request.url).searchParams.get('page');
  if (!page) return Response.json({ error: 'missing page' }, { status: 400 });

  const { results } = await env.DB.prepare(
    'SELECT id, name, body, created_at FROM comments WHERE page = ? ORDER BY created_at ASC'
  ).bind(page).all();

  return Response.json(results);
}

export async function onRequestPost({ request, env }) {
  let data;
  try { data = await request.json(); }
  catch { return Response.json({ error: 'bad request' }, { status: 400 }); }

  const { page, name, body, hp } = data;
  if (hp) return Response.json({ ok: true }); // honeypot — drop silently
  if (!page || !name?.trim() || !body?.trim())
    return Response.json({ error: 'missing fields' }, { status: 400 });

  await env.DB.prepare(
    'INSERT INTO comments (page, name, body) VALUES (?, ?, ?)'
  ).bind(
    page.slice(0, 200),
    name.trim().slice(0, 100),
    body.trim().slice(0, 2000)
  ).run();

  return Response.json({ ok: true });
}
