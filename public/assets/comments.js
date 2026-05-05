(function () {
  const mount = document.getElementById('comments-mount');
  if (!mount) return;

  const PAGE = location.pathname;

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function timeAgo(iso) {
    const s = (Date.now() - new Date(iso + 'Z')) / 1000;
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    return Math.floor(s / 86400) + 'd ago';
  }

  function commentHtml(c) {
    return '<div class="comment">' +
      '<div class="comment-meta">' +
        '<span class="comment-name">' + esc(c.name) + '</span>' +
        '<span class="comment-time">' + timeAgo(c.created_at) + '</span>' +
      '</div>' +
      '<p class="comment-body">' + esc(c.body) + '</p>' +
    '</div>';
  }

  function load() {
    return fetch('/api/comments?page=' + encodeURIComponent(PAGE))
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; });
  }

  function init(comments) {
    mount.innerHTML =
      '<section class="comments" id="comments">' +
        '<h2>Discussion</h2>' +
        '<div id="comments-list">' +
          (comments.length
            ? comments.map(commentHtml).join('')
            : '<p class="no-comments">No comments yet — be the first.</p>') +
        '</div>' +
        '<form id="comment-form" novalidate>' +
          '<input name="hp" type="text" style="display:none" tabindex="-1" autocomplete="off">' +
          '<input name="name" type="text" placeholder="Your name" maxlength="100" required>' +
          '<textarea name="body" placeholder="Leave a comment…" rows="4" maxlength="2000" required></textarea>' +
          '<button type="submit">Post comment</button>' +
          '<span class="form-msg" id="form-msg"></span>' +
        '</form>' +
      '</section>';

    document.getElementById('comment-form').onsubmit = function (e) {
      e.preventDefault();
      var f = e.target;
      var btn = f.querySelector('button');
      var msg = document.getElementById('form-msg');
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
          msg.textContent = '✓ Comment posted!';
          return load();
        })
        .then(function (fresh) {
          document.getElementById('comments-list').innerHTML = fresh.length
            ? fresh.map(commentHtml).join('')
            : '<p class="no-comments">No comments yet.</p>';
        })
        .catch(function () {
          msg.textContent = 'Something went wrong — please try again.';
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = 'Post comment';
        });
    };
  }

  load().then(init);
})();
