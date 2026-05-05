(function () {
  var mount = document.getElementById('comments-mount');
  if (!mount) return;

  // Inject styles once
  if (!document.getElementById('comments-css')) {
    var s = document.createElement('style');
    s.id = 'comments-css';
    s.textContent = [
      '#comments-section{max-width:760px;margin:64px auto 0;padding:0 24px 64px}',
      '#comments-section h2{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#e8cc7a;margin:0 0 32px;padding-bottom:14px;border-bottom:1px solid #2a2d3e}',
      '.cc-comment{padding:20px 0;border-bottom:1px solid #1e2030}',
      '.cc-comment:last-child{border-bottom:none}',
      '.cc-meta{display:flex;align-items:center;gap:14px;margin-bottom:8px}',
      '.cc-name{color:#e8cc7a;font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.5px}',
      '.cc-time{color:#6b6880;font-size:12px}',
      '.cc-body{margin:0;line-height:1.7;color:#d4cfc6;font-size:15px}',
      '.cc-empty{color:#6b6880;font-style:italic;margin:0 0 32px;font-size:15px}',
      '#cc-form{display:flex;flex-direction:column;gap:14px;margin-top:36px}',
      '#cc-form input,#cc-form textarea{background:#111318;border:1px solid #2a2d3e;color:#d4cfc6;padding:13px 16px;font-size:15px;font-family:inherit;outline:none;width:100%;box-sizing:border-box;border-radius:3px;transition:border-color .2s}',
      '#cc-form input:focus,#cc-form textarea:focus{border-color:#8a6d2f}',
      '#cc-form textarea{resize:vertical;min-height:110px}',
      '#cc-form-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}',
      '#cc-form button{background:#c9a84c;color:#0a0a0c;border:none;padding:12px 28px;font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border-radius:3px;white-space:nowrap;transition:background .2s}',
      '#cc-form button:hover{background:#e8cc7a}',
      '#cc-form button:disabled{opacity:.45;cursor:not-allowed}',
      '#cc-msg{font-size:13px;color:#e8cc7a;font-family:"JetBrains Mono",monospace}'
    ].join('');
    document.head.appendChild(s);
  }

  var PAGE = location.pathname;

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function timeAgo(iso) {
    var sec = (Date.now() - new Date(iso + 'Z')) / 1000;
    if (sec < 60) return 'just now';
    if (sec < 3600) return Math.floor(sec / 60) + 'm ago';
    if (sec < 86400) return Math.floor(sec / 3600) + 'h ago';
    return Math.floor(sec / 86400) + 'd ago';
  }

  function commentHtml(c) {
    return '<div class="cc-comment">' +
      '<div class="cc-meta">' +
        '<span class="cc-name">' + esc(c.name) + '</span>' +
        '<span class="cc-time">' + timeAgo(c.created_at) + '</span>' +
      '</div>' +
      '<p class="cc-body">' + esc(c.body) + '</p>' +
    '</div>';
  }

  function load() {
    return fetch('/api/comments?page=' + encodeURIComponent(PAGE))
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; });
  }

  function render(comments) {
    document.getElementById('cc-list').innerHTML = comments.length
      ? comments.map(commentHtml).join('')
      : '<p class="cc-empty">No comments yet — be the first.</p>';
  }

  function init(comments) {
    mount.innerHTML =
      '<div id="comments-section">' +
        '<h2>Discussion</h2>' +
        '<div id="cc-list">' +
          (comments.length
            ? comments.map(commentHtml).join('')
            : '<p class="cc-empty">No comments yet — be the first.</p>') +
        '</div>' +
        '<form id="cc-form" novalidate>' +
          '<input name="hp" type="text" style="display:none" tabindex="-1" autocomplete="off">' +
          '<input name="name" type="text" placeholder="Your name" maxlength="100" required>' +
          '<textarea name="body" placeholder="Share your thoughts…" rows="4" maxlength="2000" required></textarea>' +
          '<div id="cc-form-row">' +
            '<button type="submit">Post comment</button>' +
            '<span id="cc-msg"></span>' +
          '</div>' +
        '</form>' +
      '</div>';

    document.getElementById('cc-form').onsubmit = function (e) {
      e.preventDefault();
      var f = e.target;
      var btn = f.querySelector('button');
      var msg = document.getElementById('cc-msg');
      btn.disabled = true;
      btn.textContent = 'Posting…';
      msg.textContent = '';

      fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: PAGE, name: f.name.value, body: f.body.value, hp: f.hp.value }),
      })
        .then(function (r) {
          if (!r.ok) throw new Error();
          f.reset();
          msg.textContent = '✓ Posted!';
          return load();
        })
        .then(render)
        .catch(function () {
          msg.textContent = 'Something went wrong — try again.';
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = 'Post comment';
        });
    };
  }

  load().then(init);
})();
