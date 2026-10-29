// Checkpoint — protótipo de app: agendamento de aulas + check-in social (estilo GymRats)
(() => {
  const D = window.CP_DATA;
  const $ = (s) => document.querySelector(s);
  const STORE_KEY = 'checkpoint-proto-v2';
  const DAY = 864e5;
  const WD = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  const WD_LONG = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const REACTIONS = { fire: '🔥', muscle: '💪', clap: '👏' };
  const POINTS = { checkin: 10, classBonus: 5 };

  // ---------- Ícones (SVG inline) ----------
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5.5h3V7a3.5 3.5 0 0 1-3.5 3.5M7 5.5H4V7a3.5 3.5 0 0 0 3.5 3.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
    camera: '<path d="M4 7.5h3L9 4.5h6l2 3h3a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.8"/>',
    flame: '<path d="M12 22c4.4 0 7.5-3 7.5-7.2 0-3.6-2.4-6.3-4.3-8.3-.2 2.1-1.2 3.6-2.6 4.3C12.9 7.3 11 3.9 8.2 2c.4 3.1-3.7 6.6-3.7 12.4C4.5 18.9 7.6 22 12 22z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3.5 21l1.4-4.6A8.5 8.5 0 1 1 21 12z"/>',
    check: '<path d="M5 12.5 10 17 19 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    bike: '<circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5 9 9.5h5.5l4 7M9 9.5l3 7M13 6h3"/>',
    leaf: '<path d="M5 20c0-9 6-15 15-15 0 9-6 15-15 15z"/><path d="M5 20l8-8"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    kettlebell: '<path d="M8.5 8.5a3.5 3.5 0 0 1 7 0"/><path d="M7.5 8.5h9l1.8 3.2A7 7 0 1 1 5.7 11.7z"/>',
    run: '<circle cx="14.5" cy="4.5" r="2"/><path d="m7 21 3.5-5.5 3 2.5V22M6 11.5l3-3.5 4 1 2.5 3.5h3.5M10.5 15.5 13 9"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.3L3 16M3 21v-5h5"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/>',
  };
  const icon = (name) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  // Aproximação do símbolo da marca. Trocar pelo arquivo oficial quando houver.
  const logoMark = () => `
    <svg class="brand-mark" viewBox="0 0 80 56" aria-label="Checkpoint">
      <defs><linearGradient id="cpg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FF7A2E"/><stop offset="0.55" stop-color="#FF4D1F"/><stop offset="1" stop-color="#E01E0A"/>
      </linearGradient></defs>
      <path fill="url(#cpg)" d="M22 14H48L44 24H30L24 40H46L42 50H8Z"/>
      <path fill="url(#cpg)" fill-rule="evenodd" d="M54 4H78L70 30H46ZM58.5 11.5H68.5L65.5 22.5H55.5Z"/>
    </svg>`;
  const brandLockup = () => `
    <div class="brand">${logoMark()}
      <div class="brand-word">CHECK<br>POINT<small>CENTRO DE TREINAMENTO FÍSICO</small></div>
    </div>`;

  // ---------- Utilidades ----------
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const pad = (n) => String(n).padStart(2, '0');
  const sum = (arr, f) => arr.reduce((a, x) => a + f(x), 0);
  const firstName = (uid) => D.users[uid].name.split(' ')[0];
  const TODAY = startOfDay(new Date());

  function hash(s) {
    let h = 2166136261;
    for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function daysFromToday(d) { return Math.round((startOfDay(d) - TODAY) / DAY); }
  function dayLabel(d) {
    const n = daysFromToday(d);
    if (n === 0) return 'Hoje';
    if (n === 1) return 'Amanhã';
    if (n === -1) return 'Ontem';
    return `${WD[d.getDay()].charAt(0)}${WD[d.getDay()].slice(1).toLowerCase()} ${pad(d.getDate())}`;
  }
  function dayLong(d) {
    const n = daysFromToday(d);
    const base = `${WD_LONG[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
    return n === 0 ? `Hoje, ${base}` : n === 1 ? `Amanhã, ${base}` : base.charAt(0).toUpperCase() + base.slice(1);
  }
  function timeAgo(ts) {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 1) return 'agora';
    if (m < 60) return `há ${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `há ${h} h`;
    if (h < 48) return 'ontem';
    return `há ${Math.floor(h / 24)} dias`;
  }

  // ---------- Grade de aulas ----------
  function rawClassesFor(date) {
    const wd = date.getDay();
    const slots = wd === 0 ? D.schedule.sunday : wd === 6 ? D.schedule.saturday : wd % 2 ? D.schedule.weekdayA : D.schedule.weekdayB;
    return slots.map(([time, mod, focus, coach, room, cap, dur]) => {
      const id = `${iso(date)}_${time}`;
      const [h, m] = time.split(':').map(Number);
      const start = new Date(date); start.setHours(h, m, 0, 0);
      const seed = hash(id);
      const baseTaken = seed % 9 === 0 ? cap : Math.min(cap - 1, Math.round(cap * 0.3) + (seed % Math.round(cap * 0.65)));
      return { id, time, mod, focus, coach: D.coaches[coach], room, cap, dur, start, baseTaken };
    });
  }
  function classesFor(date) {
    return rawClassesFor(date).map((c) => {
      const mine = store.bookings.includes(c.id);
      const taken = Math.min(c.cap, c.baseTaken + (mine ? 1 : 0));
      const end = c.start.getTime() + c.dur * 60000;
      return { ...c, mine, taken, started: c.start.getTime() <= Date.now(), ended: end <= Date.now() };
    });
  }
  function findClass(id) {
    if (!id) return null;
    const [d] = id.split('_');
    return classesFor(new Date(`${d}T00:00:00`)).find((c) => c.id === id) || null;
  }
  function upcomingBookings() {
    return store.bookings.map(findClass).filter((c) => c && !c.ended).sort((a, b) => a.start - b.start);
  }

  // ---------- Estado (fica no localStorage do navegador) ----------
  function defaultStore() {
    // Já começa com uma aula reservada para a tela inicial não ficar vazia
    const soon = Date.now() + 30 * 60000;
    let first = null;
    for (let i = 0; i < 3 && !first; i++) {
      first = rawClassesFor(addDays(TODAY, i)).find((c) => c.start.getTime() > soon && c.baseTaken < c.cap);
    }
    return {
      v: 2,
      bookings: first ? [first.id] : [],
      waitlist: [],
      myPosts: [],
      reactions: {},
      comments: {},
      joined: ['geral', 'turma6h', 'squad'],
      customGroups: [],
    };
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && s.v === 2) return s;
    } catch (e) { /* armazenamento indisponível: segue com o padrão */ }
    return defaultStore();
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }
    catch (e) { toast('Não foi possível salvar no navegador', 'x'); }
  }
  let store = load();

  const ui = { tab: 'home', feedGroup: 'all', agendaDay: 0, agendaFilter: 'all', rankGroup: 'geral', rankMetric: 'points', openComments: {} };

  // ---------- Grupos ----------
  const allGroups = () => [...D.groups, ...store.customGroups];
  const joinedGroups = () => allGroups().filter((g) => store.joined.includes(g.id));
  const membersOf = (g) => (g.members === 'all' ? Object.keys(D.users) : g.members);
  const groupSub = (g) => (g.members === 'all' ? g.sub : `${g.members.length} ${g.members.length === 1 ? 'membro' : 'membros'}`);

  // ---------- Posts e estatísticas ----------
  const SEED_NOW = Date.now();
  const seedPosts = D.posts.map((p) => ({ ...p, ts: SEED_NOW - p.ago * 60000, points: POINTS.checkin + POINTS.classBonus }));

  function allPosts() { return [...store.myPosts, ...seedPosts].sort((a, b) => b.ts - a.ts); }
  function postVisibleIn(p, g) { return p.groups.includes(g.id) || (g.custom && g.members.includes(p.user)); }
  function feedPosts() {
    const groups = ui.feedGroup === 'all' ? joinedGroups() : joinedGroups().filter((g) => g.id === ui.feedGroup);
    return allPosts().filter((p) => groups.some((g) => postVisibleIn(p, g)));
  }
  function reactionCount(p, k) { return (p.reactions[k] || 0) + (store.reactions[p.id]?.[k] ? 1 : 0); }
  function commentsOf(p) { return [...(p.comments || []), ...(store.comments[p.id] || [])]; }

  function historySet() {
    const s = new Set(D.me.historyDaysAgo.map((n) => iso(addDays(TODAY, -n))));
    store.myPosts.forEach((p) => s.add(iso(new Date(p.ts))));
    return s;
  }
  function currentStreak() {
    const h = historySet();
    let d = h.has(iso(TODAY)) ? TODAY : addDays(TODAY, -1);
    let n = 0;
    while (h.has(iso(d))) { n++; d = addDays(d, -1); }
    return n;
  }
  function bestStreak() {
    const days = [...historySet()].sort();
    let best = 0, run = 0, prev = null;
    for (const s of days) {
      const d = new Date(`${s}T00:00:00`);
      run = prev && Math.round((d - prev) / DAY) === 1 ? run + 1 : 1;
      best = Math.max(best, run);
      prev = d;
    }
    return best;
  }
  function myStats() {
    const mine = store.myPosts;
    return {
      checkins: D.me.historyDaysAgo.length + mine.length,
      minutes: D.me.minutes + sum(mine, (p) => p.min),
      points: D.me.points + sum(mine, (p) => p.points),
      classes: D.me.classesAttended + mine.filter((p) => p.classId).length,
    };
  }
  const statsOf = (uid) => (uid === 'me' ? myStats() : D.stats[uid]);
  function ranking(g, metric) {
    return membersOf(g)
      .map((id) => ({ id, val: statsOf(id)[metric] }))
      .sort((a, b) => b.val - a.val || (a.id === 'me' ? -1 : b.id === 'me' ? 1 : 0));
  }
  const myRank = (g = D.groups[0], metric = 'points') => ranking(g, metric).findIndex((r) => r.id === 'me') + 1;
  const checkedInToday = () => store.myPosts.some((p) => daysFromToday(new Date(p.ts)) === 0);

  // ---------- Componentes ----------
  const avatar = (uid, cls = '') => {
    const u = D.users[uid];
    return `<div class="avatar ${cls} ${uid === 'me' ? 'me' : ''}" style="background:${u.color}">${u.short}</div>`;
  };

  function postCard(p) {
    const u = D.users[p.user];
    const m = D.modalities[p.act];
    const comments = commentsOf(p);
    const open = ui.openComments[p.id];
    const media = p.photo ? `<img src="${p.photo}" alt="Foto do treino">` : `<div class="watermark">${icon(m.icon)}</div>`;
    return `
      <article class="card post">
        <div class="post-head">
          ${avatar(p.user)}
          <div class="who"><b>${esc(u.name)}</b><span class="xs muted">${timeAgo(p.ts)}${p.className ? ` · ${esc(p.className)}` : ''}</span></div>
          <span class="tag">+${p.points} pts</span>
        </div>
        <div class="photo ${p.photo ? '' : `t${p.theme ?? 0}`}">
          ${media}
          <div class="shade"></div>
          <div class="stamp">${icon('check')} Check-in</div>
          <div class="stats">
            <div><div class="display mod">${m.name}</div><div class="display big">${p.min}<small>MIN</small></div></div>
          </div>
        </div>
        ${p.text ? `<div class="post-body"><p>${esc(p.text)}</p></div>` : ''}
        <div class="reactions">
          ${Object.entries(REACTIONS).map(([k, e]) => `
            <button class="react ${store.reactions[p.id]?.[k] ? 'on' : ''}" data-action="react" data-id="${p.id}" data-k="${k}">${e} ${reactionCount(p, k)}</button>`).join('')}
          <button class="react comment" data-action="comments" data-id="${p.id}">${icon('chat')} ${comments.length}</button>
        </div>
        ${open ? `
          <div class="comments">
            ${comments.map((c) => `<div class="comment"><b>${esc(D.users[c.user].name)}</b>${esc(c.text)}</div>`).join('') || '<div class="xs muted">Seja o primeiro a comentar.</div>'}
            <form class="comment-form" data-form="comment" data-id="${p.id}">
              <input class="input" name="text" placeholder="Mande um incentivo..." autocomplete="off">
              <button class="btn primary sm" aria-label="Enviar">${icon('send')}</button>
            </form>
          </div>` : ''}
      </article>`;
  }

  function nextClassCard(c) {
    const m = D.modalities[c.mod];
    const label = c.started ? 'Agora' : dayLabel(c.start);
    return `
      <button class="card next-class" style="width:100%;text-align:left" data-action="class" data-id="${c.id}">
        <div class="time-box"><b>${c.time}</b><span>${label}</span></div>
        <div class="info">
          <div class="h3">${m.name} · ${c.focus}</div>
          <div class="small muted">${c.coach} · ${c.room} · ${c.dur} min</div>
          <div class="tag mt-6">${icon('users')} ${c.taken}/${c.cap} confirmados</div>
        </div>
        ${icon('chevron')}
      </button>`;
  }

  function classCard(c) {
    const m = D.modalities[c.mod];
    const left = c.cap - c.taken;
    const full = left <= 0;
    const waiting = store.waitlist.includes(c.id);
    let action;
    if (c.ended && c.mine && daysFromToday(c.start) === 0) {
      action = `<button class="btn primary sm" data-action="checkin" data-class="${c.id}">${icon('camera')} Fazer check-in</button>`;
    } else if (c.started) {
      action = `<span class="xs muted">${c.ended ? 'Encerrada' : 'Em andamento'}</span>`;
    } else if (c.mine) {
      action = `<button class="btn ok sm" data-action="class" data-id="${c.id}">${icon('check')} Agendado</button>`;
    } else if (full) {
      action = waiting
        ? `<span class="tag lilac">${icon('clock')} Na lista de espera</span>`
        : `<button class="btn sm" data-action="waitlist" data-id="${c.id}">Entrar na lista de espera</button>`;
    } else {
      action = `<button class="btn primary sm" data-action="class" data-id="${c.id}">Agendar</button>`;
    }
    return `
      <div class="card class-card ${c.mine ? 'mine' : ''} ${c.started && !c.mine ? 'past' : ''}">
        <div class="class-time"><b>${c.time}</b><span>${c.dur} min</span></div>
        <div class="class-info">
          <div class="title">${icon(m.icon)}<span class="h3">${m.name}</span><span class="tag lilac">${c.focus}</span></div>
          <div class="class-meta"><span>${c.coach}</span><span>${c.room}</span></div>
          <div class="spots">
            <div class="bar ${full ? 'full' : ''}"><i style="width:${(c.taken / c.cap) * 100}%"></i></div>
            <span class="xs ${full ? 'dim' : 'muted'}">${full ? 'Lotada' : `${left} ${left === 1 ? 'vaga' : 'vagas'}`}</span>
          </div>
          <div class="class-actions">${action}</div>
        </div>
      </div>`;
  }

  // ---------- Telas ----------
  function screenHome() {
    const st = myStats();
    const streak = currentStreak();
    const hist = historySet();
    const monday = addDays(TODAY, -((TODAY.getDay() + 6) % 7));
    const week = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
    const next = upcomingBookings()[0];
    const posts = feedPosts();
    const done = checkedInToday();
    return `
      <header class="topbar">
        ${brandLockup()}
        <button class="pill hot" data-action="tab" data-tab="profile" aria-label="Sequência">${icon('flame')} ${streak}</button>
      </header>

      <section class="hero">
        <div class="streak-row">
          <div>
            <div class="xs upper muted">Sua sequência</div>
            <div class="display streak-num mt-6">${icon('flame')}${streak} <span class="h2">${streak === 1 ? 'dia' : 'dias'}</span></div>
          </div>
          <div style="text-align:right">
            <div class="xs upper muted">Pontos</div>
            <div class="display h1 mt-6">${st.points}</div>
            <div class="xs muted mt-6">#${myRank()} no ${D.challenge.name}</div>
          </div>
        </div>
        <div class="week">
          ${week.map((d) => {
            const k = iso(d);
            const isToday = daysFromToday(d) === 0;
            const cls = hist.has(k) ? 'done' : d > TODAY ? 'future' : '';
            return `<div class="week-day">${WD[d.getDay()].charAt(0)}<div class="week-dot ${cls} ${isToday ? 'today' : ''}">${hist.has(k) ? icon('check') : ''}</div></div>`;
          }).join('')}
        </div>
        ${done
          ? `<div class="tag ok mt-14">${icon('check')} Check-in de hoje feito. Amanhã tem mais!</div>`
          : `<button class="btn primary block mt-14 display-btn" data-action="checkin">${icon('camera')} Fazer check-in de hoje</button>`}
      </section>

      <section class="section">
        <div class="section-head"><h2 class="display h2">Próxima aula</h2><button class="link" data-action="tab" data-tab="agenda">Ver agenda</button></div>
        ${next ? nextClassCard(next) : `
          <div class="card row between">
            <div><div class="h3">Nenhuma aula reservada</div><div class="small muted mt-6">Garanta sua vaga nas coletivas.</div></div>
            <button class="btn primary sm" data-action="tab" data-tab="agenda">Agendar</button>
          </div>`}
      </section>

      <section class="section">
        <div class="section-head"><h2 class="display h2">Feed</h2><span class="xs muted">${posts.length} check-ins</span></div>
        <div class="chips">
          <button class="chip ${ui.feedGroup === 'all' ? 'on' : ''}" data-action="feed-group" data-id="all">Todos</button>
          ${joinedGroups().map((g) => `<button class="chip ${ui.feedGroup === g.id ? 'on' : ''}" data-action="feed-group" data-id="${g.id}">${esc(g.name)}</button>`).join('')}
        </div>
        ${posts.map(postCard).join('') || `<div class="empty">${icon('camera')}<div>Nenhum check-in neste grupo ainda.<br>Que tal ser o primeiro?</div></div>`}
      </section>`;
  }

  function screenAgenda() {
    const days = Array.from({ length: 7 }, (_, i) => addDays(TODAY, i));
    const sel = days[ui.agendaDay];
    const all = classesFor(sel);
    const mods = [...new Set(all.map((c) => c.mod))];
    if (ui.agendaFilter !== 'all' && !mods.includes(ui.agendaFilter)) ui.agendaFilter = 'all';
    const list = all.filter((c) => ui.agendaFilter === 'all' || c.mod === ui.agendaFilter);
    const mine = upcomingBookings();
    const bookedDays = new Set(mine.map((c) => iso(c.start)));
    return `
      <div class="page-title">
        <h1 class="display h1">Agendar <span class="accent">aula</span></h1>
        <p class="small muted">Reserve sua vaga nas aulas coletivas da Checkpoint.</p>
      </div>
      ${mine.length ? `
        <div class="section-head mt-14"><span class="xs upper muted">Suas reservas</span></div>
        <div class="chips">
          ${mine.map((c) => `<button class="chip on-accent" data-action="class" data-id="${c.id}">${icon('check')} ${dayLabel(c.start)} ${c.time} · ${D.modalities[c.mod].name} ${c.focus}</button>`).join('')}
        </div>` : ''}
      <div class="days">
        ${days.map((d, i) => `
          <button class="day ${i === ui.agendaDay ? 'on' : ''}" data-action="agenda-day" data-i="${i}">
            <span>${i === 0 ? 'HOJE' : WD[d.getDay()]}</span><b>${pad(d.getDate())}</b>
            <div class="dot ${bookedDays.has(iso(d)) ? '' : 'none'}"></div>
          </button>`).join('')}
      </div>
      <div class="chips mt-14">
        <button class="chip ${ui.agendaFilter === 'all' ? 'on' : ''}" data-action="agenda-filter" data-id="all">Todas</button>
        ${mods.map((k) => `<button class="chip ${ui.agendaFilter === k ? 'on' : ''}" data-action="agenda-filter" data-id="${k}">${icon(D.modalities[k].icon)} ${D.modalities[k].name}</button>`).join('')}
      </div>
      <div class="xs muted mt-14">${dayLong(sel)} · ${list.length} ${list.length === 1 ? 'aula' : 'aulas'}</div>
      ${list.map(classCard).join('')}`;
  }

  function screenRanking() {
    const ch = D.challenge;
    const day = ch.startedDaysAgo + 1;
    const groups = joinedGroups();
    const g = groups.find((x) => x.id === ui.rankGroup) || groups[0];
    ui.rankGroup = g.id;
    const metric = ui.rankMetric;
    const unit = { checkins: 'check-ins', points: 'pts', minutes: 'min' }[metric];
    const rows = ranking(g, metric);
    const meIdx = rows.findIndex((r) => r.id === 'me');
    const top = rows.slice(0, 3);
    const podiumOrder = [[top[1], 'second', 2], [top[0], 'first', 1], [top[2], 'third', 3]].filter(([r]) => r);
    const ahead = rows[meIdx - 1];
    return `
      <div class="page-title"><h1 class="display h1">Ran<span class="accent">king</span></h1></div>

      <section class="hero challenge mt-10">
        <span class="tag">${icon('trophy')} ${ch.subtitle}</span>
        <div class="display h1 mt-10">${ch.name}</div>
        <div class="small muted mt-6">Dia ${day} de ${ch.length} · faltam ${ch.length - day} dias</div>
        <div class="progress"><div class="bar"><i style="width:${(day / ch.length) * 100}%"></i></div></div>
      </section>

      <div class="section-head section"><span class="xs upper muted">Grupos</span></div>
      <div class="chips">
        ${groups.map((x) => `<button class="chip ${x.id === g.id ? 'on' : ''}" data-action="rank-group" data-id="${x.id}">${esc(x.name)}</button>`).join('')}
        <button class="chip dashed" data-action="group-sheet">${icon('plus')} Novo grupo</button>
      </div>

      <div class="seg">
        ${[['points', 'Pontos'], ['checkins', 'Check-ins'], ['minutes', 'Minutos']].map(([k, l]) => `<button class="${metric === k ? 'on' : ''}" data-action="rank-metric" data-k="${k}">${l}</button>`).join('')}
      </div>

      ${rows.length > 1 ? `
        <div class="podium">
          ${podiumOrder.map(([r, cls, pos]) => `
            <div class="podium-col ${cls}">
              ${avatar(r.id, 'md')}
              <div class="name">${r.id === 'me' ? 'Você' : esc(firstName(r.id))}</div>
              <div class="val">${r.val} ${unit}</div>
              <div class="podium-step">${pos}</div>
            </div>`).join('')}
        </div>` : `<div class="empty">${icon('users')}<div>Só você por aqui ainda.<br>Compartilhe o código do grupo!</div></div>`}

      <div class="card mt-14 row between">
        <div>
          <div class="xs upper muted">Sua posição</div>
          <div class="display h1 mt-6">#${meIdx + 1} <span class="h3 muted">de ${rows.length}</span></div>
        </div>
        <div class="small" style="text-align:right;max-width:55%">
          ${ahead ? `Faltam <b class="accent">${ahead.val - rows[meIdx].val + 1} ${unit}</b> para passar ${esc(firstName(ahead.id))}` : 'Você lidera o grupo! 👑'}
        </div>
      </div>

      <div class="rank-list">
        ${rows.slice(3).map((r, i) => `
          <div class="card rank-row ${r.id === 'me' ? 'me' : ''}">
            <span class="pos">${i + 4}</span>${avatar(r.id)}
            <span class="nm">${r.id === 'me' ? 'Você' : esc(D.users[r.id].name)}</span>
            <span class="sc">${r.val} <span class="xs muted">${unit}</span></span>
          </div>`).join('')}
      </div>

      <section class="card section">
        <div class="h3">Como pontuar</div>
        <div class="rules">
          <div class="rule"><span>Check-in com treino</span><b>+${POINTS.checkin} pts</b></div>
          <div class="rule"><span>Check-in vinculado a aula agendada</span><b>+${POINTS.classBonus} pts</b></div>
          <div class="rule"><span>Vale 1 check-in por treino. Foto é opcional, mas a galera adora.</span></div>
        </div>
      </section>

      ${g.code ? `
        <section class="card section row between">
          <div><div class="xs upper muted">Código do grupo</div><div class="display h2 mt-6">${esc(g.code)}</div></div>
          <button class="btn sm" data-action="copy-code" data-id="${g.id}">${icon('copy')} Convidar</button>
        </section>` : ''}`;
  }

  function screenProfile() {
    const st = myStats();
    const streak = currentStreak();
    const best = bestStreak();
    const rank = myRank();
    const level = Math.floor(st.points / 50) + 1;
    const hist = historySet();
    const first = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    const daysInMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0).getDate();
    const offset = (first.getDay() + 6) % 7;
    const badges = [
      { ic: 'flame', name: '5 dias seguidos', got: best >= 5, sub: best >= 5 ? 'Desbloqueada' : `${streak}/5 dias` },
      { ic: 'sun', name: 'Madrugador', got: true, sub: 'Aula das 6h' },
      { ic: 'run', name: 'Simulado Hyrox', got: store.myPosts.some((p) => p.className?.includes('Simulado')), sub: 'Faça 1 simulado' },
      { ic: 'calendar', name: '10 aulas', got: st.classes >= 10, sub: st.classes >= 10 ? 'Desbloqueada' : `${st.classes}/10` },
      { ic: 'crown', name: 'Top 3', got: rank <= 3, sub: rank <= 3 ? 'No desafio' : `Você é #${rank}` },
      { ic: 'trophy', name: 'Rato de academia', got: st.checkins >= 50, sub: `${st.checkins}/50 check-ins` },
    ];
    return `
      <div class="profile-head">
        ${avatar('me', 'lg')}
        <h1 class="display h1">Você</h1>
        <div class="small muted mt-6">${D.me.plan} · aluno desde ${D.me.memberSince}</div>
        <div class="tag mt-10">${icon('bolt')} Nível ${level} · faltam ${level * 50 - st.points} pts</div>
      </div>

      <div class="stat-grid">
        <div class="card stat"><div class="display val">${st.checkins}</div><div class="lbl">Check-ins no desafio</div></div>
        <div class="card stat"><div class="display val accent">${streak}</div><div class="lbl">Dias seguidos (recorde ${best})</div></div>
        <div class="card stat"><div class="display val">${st.points}</div><div class="lbl">Pontos · #${rank} geral</div></div>
        <div class="card stat"><div class="display val">${Math.round(st.minutes / 60)}<span class="h3">h</span></div><div class="lbl">Treinadas no desafio</div></div>
      </div>

      <section class="card section">
        <div class="row between"><div class="h3">${MONTHS[TODAY.getMonth()].charAt(0).toUpperCase() + MONTHS[TODAY.getMonth()].slice(1)}</div><span class="xs muted">${[...hist].filter((k) => k.startsWith(iso(first).slice(0, 7))).length} dias treinados</span></div>
        <div class="cal">
          ${['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d) => `<div class="wd">${d}</div>`).join('')}
          ${Array.from({ length: offset }, () => '<div class="c blank"></div>').join('')}
          ${Array.from({ length: daysInMonth }, (_, i) => {
            const d = new Date(TODAY.getFullYear(), TODAY.getMonth(), i + 1);
            return `<div class="c ${hist.has(iso(d)) ? 'on' : ''} ${daysFromToday(d) === 0 ? 'today' : ''}">${i + 1}</div>`;
          }).join('')}
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2 class="display h2">Conquistas</h2><span class="xs muted">${badges.filter((b) => b.got).length}/${badges.length}</span></div>
        <div class="badges">
          ${badges.map((b) => `<div class="card badge ${b.got ? '' : 'locked'}"><div class="ico">${icon(b.ic)}</div><b>${b.name}</b><span>${b.sub}</span></div>`).join('')}
        </div>
      </section>

      <section class="card section" style="padding-top:4px;padding-bottom:4px">
        <div class="list-row">${icon('card')}<span class="grow">${D.me.plan}</span><span class="tag ok">Ativo</span></div>
        <button class="list-row" style="width:100%;text-align:left" data-action="tab" data-tab="agenda">${icon('calendar')}<span class="grow">Minhas reservas</span><span class="muted small">${upcomingBookings().length}</span>${icon('chevron')}</button>
        <button class="list-row" style="width:100%;text-align:left" data-action="reset">${icon('refresh')}<span class="grow">Reiniciar dados do protótipo</span></button>
      </section>
      <p class="xs dim mt-14" style="text-align:center">Protótipo Checkpoint · dados fictícios</p>`;
  }

  const SCREENS = { home: screenHome, agenda: screenAgenda, ranking: screenRanking, profile: screenProfile };

  function renderTabbar() {
    const tab = (id, ic, label) => `<button class="tab ${ui.tab === id ? 'on' : ''}" data-action="tab" data-tab="${id}">${icon(ic)}${label}</button>`;
    $('#tabbar').innerHTML = `
      ${tab('home', 'home', 'Início')}
      ${tab('agenda', 'calendar', 'Agenda')}
      <button class="tab-fab" data-action="checkin" aria-label="Fazer check-in"><span class="fab">${icon('camera')}</span><span>Check-in</span></button>
      ${tab('ranking', 'trophy', 'Ranking')}
      ${tab('profile', 'user', 'Perfil')}`;
  }

  function render({ keepScroll = false } = {}) {
    const v = $('#view');
    const top = v.scrollTop;
    v.innerHTML = SCREENS[ui.tab]();
    if (keepScroll) v.scrollTop = top;
    else { v.scrollTop = 0; v.classList.remove('screen-enter'); void v.offsetWidth; v.classList.add('screen-enter'); }
    renderTabbar();
  }

  // ---------- Bottom sheet, toast, celebração ----------
  let closeTimer = null;
  function openSheet(html) {
    clearTimeout(closeTimer);
    $('#sheet-root').innerHTML = `<div class="sheet-backdrop" data-action="close-sheet"></div><div class="sheet" id="sheet" role="dialog" aria-modal="true">${html}</div>`;
  }
  function updateSheet(html) {
    const s = $('#sheet');
    if (!s) return;
    const top = s.scrollTop;
    s.innerHTML = html;
    s.scrollTop = top;
  }
  function closeSheet() {
    const root = $('#sheet-root');
    const s = root.querySelector('.sheet');
    if (!s) return;
    s.classList.add('closing');
    root.querySelector('.sheet-backdrop').classList.add('closing');
    closeTimer = setTimeout(() => { root.innerHTML = ''; }, 200);
  }

  function toast(msg, ic = 'check') {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${icon(ic)}<span>${esc(msg)}</span>`;
    $('#toast-root').appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 260); }, 2600);
  }

  function celebrate(pts, streak) {
    const el = document.createElement('div');
    el.className = 'celebrate';
    el.innerHTML = `
      <div>
        ${logoMark()}
        <div class="display big">Check-in<br><span class="accent">feito!</span></div>
        <div class="display pts">+${pts} pts</div>
        <div class="mt-14 muted row" style="justify-content:center">${icon('flame')} ${streak} ${streak === 1 ? 'dia' : 'dias'} seguidos</div>
      </div>`;
    $('#app').appendChild(el);
    const dismiss = () => { el.classList.add('out'); setTimeout(() => el.remove(), 300); };
    el.addEventListener('click', dismiss);
    setTimeout(dismiss, 1900);
  }

  // ---------- Sheet: aula ----------
  function classSheetHTML(c) {
    const m = D.modalities[c.mod];
    const canBook = !c.started && !c.mine && c.taken < c.cap;
    return `
      <div class="grabber"></div>
      <div class="sheet-head"><span class="tag">${icon(m.icon)} Aula coletiva</span><button class="icon-btn" data-action="close-sheet" aria-label="Fechar">${icon('x')}</button></div>
      <h2 class="display h1">${m.name}</h2>
      <div class="tag lilac mt-10">${c.focus}</div>
      <div class="detail-list mt-18">
        <div class="detail">${icon('calendar')} ${dayLong(c.start)} · ${c.time}</div>
        <div class="detail">${icon('clock')} ${c.dur} minutos</div>
        <div class="detail">${icon('user')} ${c.coach}</div>
        <div class="detail">${icon('pin')} ${c.room}</div>
        <div class="detail">${icon('users')} ${c.taken}/${c.cap} vagas preenchidas</div>
      </div>
      <div class="note">${c.mine
        ? 'Sua vaga está garantida. Cancelamento sem custo até 2h antes da aula.'
        : `Depois da aula, faça o check-in vinculado a ela e ganhe +${POINTS.classBonus} pts extras no desafio.`}</div>
      <div class="mt-18">
        ${c.mine && !c.started ? `<button class="btn block lg" data-action="cancel-booking" data-id="${c.id}">Cancelar reserva</button>` : ''}
        ${canBook ? `<button class="btn primary block lg display-btn" data-action="confirm-booking" data-id="${c.id}">${icon('check')} Confirmar reserva</button>` : ''}
        ${c.mine && c.ended && daysFromToday(c.start) === 0 ? `<button class="btn primary block lg display-btn" data-action="checkin" data-class="${c.id}">${icon('camera')} Fazer check-in</button>` : ''}
      </div>`;
  }

  // ---------- Sheet: check-in ----------
  let draft = null;
  function openCheckin(classId) {
    const todays = classesFor(TODAY).filter((c) => c.mine);
    const linkedId = classId || todays.find((c) => c.started)?.id || null;
    const c = findClass(linkedId);
    draft = {
      photo: null,
      act: c ? c.mod : 'crossfit',
      min: c ? c.dur : 60,
      text: '',
      classId: linkedId,
      groups: store.joined.slice(),
    };
    openSheet(checkinHTML());
  }
  function checkinHTML() {
    const todays = classesFor(TODAY).filter((c) => c.mine);
    const pts = POINTS.checkin + (draft.classId ? POINTS.classBonus : 0);
    return `
      <div class="grabber"></div>
      <div class="sheet-head"><h2 class="display h1">Check-<span class="accent">in</span></h2><button class="icon-btn" data-action="close-sheet" aria-label="Fechar">${icon('x')}</button></div>
      <label class="upload ${draft.photo ? 'has' : ''}">
        ${draft.photo
          ? `<img src="${draft.photo}" alt="Prévia da foto"><span class="btn sm swap">${icon('camera')} Trocar</span>`
          : `<div>${icon('camera')}<div class="h3 mt-6">Adicionar foto do treino</div><div class="xs muted mt-6">Aquela selfie suada vale muito 😉</div></div>`}
        <input type="file" accept="image/*" data-input="photo" aria-label="Foto do treino">
      </label>
      ${todays.length ? `
        <div class="field">
          <span class="field-label">Aula de hoje</span>
          <div class="detail-list">
            ${todays.map((c) => `
              <button class="toggle-card ${draft.classId === c.id ? 'on' : ''}" data-action="draft-class" data-id="${c.id}">
                <span class="check">${draft.classId === c.id ? icon('check') : ''}</span>
                <span class="grow"><b>${D.modalities[c.mod].name} ${c.focus} · ${c.time}</b><br><span class="xs muted">${c.coach} · ${c.room}</span></span>
                <span class="tag">+${POINTS.classBonus} pts</span>
              </button>`).join('')}
          </div>
        </div>` : ''}
      <div class="field">
        <span class="field-label">O que você treinou?</span>
        <div class="chips">
          ${Object.entries(D.modalities).map(([k, m]) => `<button class="chip ${draft.act === k ? 'on-accent' : ''}" data-action="draft-act" data-k="${k}">${icon(m.icon)} ${m.name}</button>`).join('')}
        </div>
      </div>
      <div class="field">
        <span class="field-label">Duração</span>
        <div class="stepper">
          <button class="icon-btn" data-action="draft-min" data-d="-5" aria-label="Menos 5 minutos">−</button>
          <div class="display val">${draft.min}<small>min</small></div>
          <button class="icon-btn" data-action="draft-min" data-d="5" aria-label="Mais 5 minutos">+</button>
        </div>
      </div>
      <div class="field">
        <label for="ci-text">Legenda</label>
        <textarea id="ci-text" class="input" data-input="text" maxlength="280" placeholder="Como foi o treino hoje?">${esc(draft.text)}</textarea>
      </div>
      <div class="field">
        <span class="field-label">Publicar em</span>
        <div class="chips">
          ${joinedGroups().map((g) => {
            const locked = g.id === 'geral';
            const on = locked || draft.groups.includes(g.id);
            return `<button class="chip ${on ? 'on' : ''}" data-action="draft-group" data-id="${g.id}" ${locked ? 'title="O desafio geral conta todos os check-ins"' : ''}>${on ? icon('check') : ''} ${esc(g.name)}</button>`;
          }).join('')}
        </div>
      </div>
      <button class="btn primary block lg display-btn mt-18" data-action="submit-checkin">${icon('check')} Fazer check-in · +${pts} pts</button>`;
  }

  function readPhoto(file) {
    // Reduz a foto antes de guardar para não estourar o localStorage
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const max = 900;
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * s);
        canvas.height = Math.round(img.height * s);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('imagem inválida')); };
      img.src = url;
    });
  }

  function submitCheckin() {
    const c = findClass(draft.classId);
    const points = POINTS.checkin + (c ? POINTS.classBonus : 0);
    const post = {
      id: `m${Date.now()}`,
      user: 'me',
      ts: Date.now(),
      act: draft.act,
      min: draft.min,
      text: draft.text.trim(),
      photo: draft.photo,
      classId: c ? c.id : null,
      className: c ? `${D.modalities[c.mod].name} ${c.focus} ${c.time}` : null,
      groups: [...new Set(['geral', ...draft.groups])],
      reactions: { fire: 0, muscle: 0, clap: 0 },
      comments: [],
      points,
      theme: hash(String(Date.now())) % 4,
    };
    store.myPosts.unshift(post);
    save();
    closeSheet();
    ui.tab = 'home';
    ui.feedGroup = 'all';
    render();
    celebrate(points, currentStreak());

    // Um colega reage depois de alguns segundos, para dar o clima de grupo
    setTimeout(() => {
      const p = store.myPosts.find((x) => x.id === post.id);
      if (!p) return;
      p.reactions.fire += 1;
      p.comments.push({ user: 'u1', text: 'Boaaa! Bora manter a sequência 🔥' });
      save();
      if (ui.tab === 'home') render({ keepScroll: true });
      toast('Rafaela reagiu 🔥 ao seu check-in', 'flame');
    }, 3800);
  }

  // ---------- Sheet: grupos ----------
  let gs = null;
  function groupSheetHTML() {
    return `
      <div class="grabber"></div>
      <div class="sheet-head"><h2 class="display h1">Gru<span class="accent">pos</span></h2><button class="icon-btn" data-action="close-sheet" aria-label="Fechar">${icon('x')}</button></div>
      <p class="small muted">Crie um desafio com os amigos ou entre num grupo com o código de convite.</p>
      <div class="seg two">
        <button class="${gs.mode === 'create' ? 'on' : ''}" data-action="gs-mode" data-k="create">Criar grupo</button>
        <button class="${gs.mode === 'join' ? 'on' : ''}" data-action="gs-mode" data-k="join">Entrar com código</button>
      </div>
      ${gs.created ? `
        <div class="code-box">
          <div class="xs upper muted">Grupo "${esc(gs.created.name)}" criado</div>
          <div class="display mt-10"><b>${gs.created.code}</b></div>
          <div class="xs muted mt-10">Mande esse código para a galera entrar.</div>
        </div>
        <button class="btn primary block lg mt-14" data-action="copy-code" data-id="${gs.created.id}">${icon('copy')} Copiar convite</button>
        <button class="btn block mt-10" data-action="go-group" data-id="${gs.created.id}">Ver ranking do grupo</button>`
      : gs.mode === 'create' ? `
        <form data-form="create-group">
          <div class="field"><label for="g-name">Nome do grupo</label><input id="g-name" class="input" name="name" maxlength="28" placeholder="Ex.: Família na Checkpoint" autocomplete="off"></div>
          <button class="btn primary block lg mt-18 display-btn">${icon('plus')} Criar grupo</button>
        </form>`
      : `
        <form data-form="join-group">
          <div class="field"><label for="g-code">Código de convite</label><input id="g-code" class="input" name="code" maxlength="12" placeholder="CKP-XXXX" autocomplete="off" style="text-transform:uppercase"></div>
          <div class="note">No protótipo, qualquer código coloca você no grupo de exemplo "${D.joinableGroup.name}".</div>
          <button class="btn primary block lg mt-18 display-btn">Entrar no grupo</button>
        </form>`}`;
  }

  async function copyInvite(groupId) {
    const g = allGroups().find((x) => x.id === groupId);
    if (!g) return;
    const text = `Bora treinar comigo no grupo "${g.name}" da Checkpoint! Código: ${g.code}`;
    try { await navigator.clipboard.writeText(text); toast('Convite copiado'); }
    catch (e) { toast(`Código: ${g.code}`, 'copy'); }
  }

  // ---------- Ações ----------
  const actions = {
    tab: (el) => { ui.tab = el.dataset.tab; render(); },
    checkin: (el) => { openCheckin(el.dataset.class); },
    'close-sheet': () => closeSheet(),

    'feed-group': (el) => { ui.feedGroup = el.dataset.id; render({ keepScroll: true }); },
    react: (el) => {
      const { id, k } = el.dataset;
      const r = (store.reactions[id] = store.reactions[id] || {});
      r[k] = !r[k];
      save();
      render({ keepScroll: true });
    },
    comments: (el) => {
      const id = el.dataset.id;
      ui.openComments[id] = !ui.openComments[id];
      render({ keepScroll: true });
      if (ui.openComments[id]) document.querySelector(`[data-form="comment"][data-id="${id}"] input`)?.focus({ preventScroll: true });
    },

    'agenda-day': (el) => { ui.agendaDay = Number(el.dataset.i); render({ keepScroll: true }); },
    'agenda-filter': (el) => { ui.agendaFilter = el.dataset.id; render({ keepScroll: true }); },
    class: (el) => { const c = findClass(el.dataset.id); if (c) openSheet(classSheetHTML(c)); },
    'confirm-booking': (el) => {
      const c = findClass(el.dataset.id);
      if (!c || c.started || c.taken >= c.cap) return;
      store.bookings.push(c.id);
      save();
      closeSheet();
      render({ keepScroll: true });
      toast(`${D.modalities[c.mod].name} ${c.focus} ${dayLabel(c.start).toLowerCase()} às ${c.time} agendado!`, 'calendar');
    },
    'cancel-booking': (el) => {
      store.bookings = store.bookings.filter((id) => id !== el.dataset.id);
      save();
      closeSheet();
      render({ keepScroll: true });
      toast('Reserva cancelada', 'x');
    },
    waitlist: (el) => {
      store.waitlist.push(el.dataset.id);
      save();
      render({ keepScroll: true });
      toast('Você entrou na lista de espera. Avisamos se abrir vaga.', 'clock');
    },

    'draft-class': (el) => {
      draft.classId = draft.classId === el.dataset.id ? null : el.dataset.id;
      const c = findClass(draft.classId);
      if (c) { draft.act = c.mod; draft.min = c.dur; }
      updateSheet(checkinHTML());
    },
    'draft-act': (el) => { draft.act = el.dataset.k; updateSheet(checkinHTML()); },
    'draft-min': (el) => { draft.min = Math.min(240, Math.max(5, draft.min + Number(el.dataset.d))); updateSheet(checkinHTML()); },
    'draft-group': (el) => {
      const id = el.dataset.id;
      if (id === 'geral') { toast('O desafio geral conta todos os check-ins', 'trophy'); return; }
      draft.groups = draft.groups.includes(id) ? draft.groups.filter((x) => x !== id) : [...draft.groups, id];
      updateSheet(checkinHTML());
    },
    'submit-checkin': () => submitCheckin(),

    'rank-group': (el) => { ui.rankGroup = el.dataset.id; render({ keepScroll: true }); },
    'rank-metric': (el) => { ui.rankMetric = el.dataset.k; render({ keepScroll: true }); },
    'group-sheet': () => { gs = { mode: 'create', created: null }; openSheet(groupSheetHTML()); },
    'gs-mode': (el) => { gs.mode = el.dataset.k; gs.created = null; updateSheet(groupSheetHTML()); },
    'copy-code': (el) => copyInvite(el.dataset.id),
    'go-group': (el) => { ui.tab = 'ranking'; ui.rankGroup = el.dataset.id; closeSheet(); render(); },

    reset: () => {
      try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignora */ }
      store = defaultStore();
      Object.assign(ui, { tab: 'home', feedGroup: 'all', agendaDay: 0, agendaFilter: 'all', rankGroup: 'geral', openComments: {} });
      render();
      toast('Dados do protótipo reiniciados', 'refresh');
    },
  };

  const forms = {
    comment: (form) => {
      const text = form.text.value.trim();
      if (!text) return;
      const id = form.dataset.id;
      (store.comments[id] = store.comments[id] || []).push({ user: 'me', text });
      save();
      render({ keepScroll: true });
      document.querySelector(`[data-form="comment"][data-id="${id}"] input`)?.focus({ preventScroll: true });
    },
    'create-group': (form) => {
      const name = form.name.value.trim();
      if (!name) { toast('Dê um nome para o grupo', 'x'); return; }
      const code = `CKP-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      const g = { id: `g${Date.now()}`, name, code, members: ['me'], custom: true };
      store.customGroups.push(g);
      store.joined.push(g.id);
      save();
      gs.created = g;
      updateSheet(groupSheetHTML());
      render({ keepScroll: true });
    },
    'join-group': (form) => {
      const code = form.code.value.trim().toUpperCase();
      if (!code) { toast('Digite o código de convite', 'x'); return; }
      const existing = allGroups().find((g) => g.code === code);
      let g = existing;
      if (!g) {
        g = store.customGroups.find((x) => x.id === D.joinableGroup.id);
        if (!g) { g = { ...D.joinableGroup, code, custom: true }; store.customGroups.push(g); }
      }
      if (!store.joined.includes(g.id)) store.joined.push(g.id);
      save();
      closeSheet();
      ui.tab = 'ranking';
      ui.rankGroup = g.id;
      render();
      toast(`Você entrou em "${g.name}"`, 'users');
    },
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el || !actions[el.dataset.action]) return;
    e.preventDefault();
    actions[el.dataset.action](el);
  });
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();
    forms[form.dataset.form]?.(form);
  });
  document.addEventListener('input', (e) => {
    if (e.target.dataset.input === 'text' && draft) draft.text = e.target.value;
  });
  document.addEventListener('change', async (e) => {
    if (e.target.dataset.input !== 'photo' || !draft) return;
    const file = e.target.files?.[0];
    if (!file) return;
    try { draft.photo = await readPhoto(file); updateSheet(checkinHTML()); }
    catch (err) { toast('Não consegui abrir essa imagem', 'x'); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

  render();
})();
