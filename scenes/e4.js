// EXPERIENCE 4: "How teenagers heard the music" (deck slide 10). Six places, six ways to hear a record.
{
  const { PAL, INK, PAPER, F, at, inkWorld, props, snd } = INKTOON;
  // ---------------------------------------------------------------- content (from the slide)
  const PLACES = [
    { word: 'RECORD SHOP', note: '45 rpm single: one hit a side', thing: '45 rpm single' },
    { word: 'BEDROOM', note: 'a small record player of your own', thing: 'record player' },
    { word: 'DINER', note: 'jukebox: drop in a coin, pick a song', thing: 'jukebox' },
    { word: 'ANYWHERE', note: 'transistor radio: DJs played the hits', thing: 'transistor radio' },
    { word: 'LIVING ROOM', note: 'television showed the stars', thing: 'television' },
    { word: 'SCHOOL GYM', note: 'sock hop: dancing in socks, to records', thing: 'sock hop' },
  ];
  const ENDING = { note: 'teens could choose, buy and carry their music' };
  const STEP = 33, GAP = 5.2;
  const T = { at: PLACES.map((_, i) => at(i * STEP)), end: at(6 * STEP + 2), play: at(6 * STEP + 34) }; T.quiz = T.play + 0.4;
  const X = PLACES.map((_, i) => (i - 2.5) * GAP);

  registerStyle({
    id: 'e4', name: 'Ink and Toon', title: 'How teenagers heard the music', slides: 'Slide 10', question: 'Name three ways teenagers listened to music in the 1950s.',
    duration: T.play + 0.6, play: T.play, quizAt: T.quiz,
    fonts: ['260px "Anton"', '700 150px "Caveat"'],
    render: { samples: 16, preview: 2, shutter: 0, tone: 'linear', exposure: 1, bloom: 0, vignette: 0, grain: 0, fov: 26, background: PAL.teal.lit },
    beats: [
      { t0: T.at[0], t1: T.at[1], key: T.at[0] + 20 * F, text: [PLACES[0].word, PLACES[0].note], moves: 'Opens on a crate of 45s. A coin flips in and lands on the crate; one 45 jumps up out of it, bought.', camera: 'Long lens on the crate, slow drift.', sound: 'Coin ping and clink, cardboard rustle, vinyl pop as the record jumps.' },
      { t0: T.at[1], t1: T.at[2], key: T.at[1] + 22 * F, text: [PLACES[1].word, PLACES[1].note], moves: 'The same 45 flies along the table and drops onto the spindle of a small record player; the arm swings over and notes rise.', camera: 'Whips right, following the record to the player.', sound: 'Swish, vinyl slap on the platter, needle crackle, a few notes of a tune.' },
      { t0: T.at[2], t1: T.at[3], key: T.at[2] + 22 * F, text: [PLACES[2].word, PLACES[2].note], moves: 'A coin arcs into the slot of a jukebox. Its arch flashes, the record in the window turns and notes come out.', camera: 'Whips right to the jukebox, pulled back for its height.', sound: 'Coin in a metal slot, mechanical clunk, the same tune louder with a bass thump.' },
      { t0: T.at[3], t1: T.at[4], key: T.at[3] + 22 * F, text: [PLACES[3].word, PLACES[3].note], moves: 'A pocket radio walks along the table by itself, bobbing on twos with speed lines behind it and notes trailing.', camera: 'Whips right and tracks slowly with the radio.', sound: 'Dial click, the tune thin and tinny (band-passed), plastic footsteps.' },
      { t0: T.at[4], t1: T.at[5], key: T.at[4] + 22 * F, text: [PLACES[4].word, PLACES[4].note], moves: 'A television set: its screen snaps on, a star pops onto it and twinkles, the rabbit ears twitch.', camera: 'Whips right to the TV.', sound: 'CRT switch-on thump and whine, applause-like noise burst, a ding for the star.' },
      { t0: T.at[5], t1: T.play, key: T.play - 0.3, text: [PLACES[5].word, PLACES[5].note, ENDING.note], moves: 'A record player spins a 45 on the gym floor and a pair of bobby socks dances beside it, hopping in turn. Holds on the dance.', camera: 'Whips right to the last stop; eases back a little and holds the final second.', sound: 'The tune at full strength with the backbeat, soft sock thuds on the floor, ends on a ding.' },
    ],
    quiz: { key: T.quiz, prompt: 'Where was it heard? Tap the object that belongs in each place.', how: 'All six objects stand on the table. A place tag comes up (DINER, BEDROOM, ANYWHERE, LIVING ROOM, RECORD SHOP, SCHOOL GYM), one at a time in shuffled order; tap the object that belongs there. One point each.', points: 6 },

    check: [
      { type: 'match', prompt: 'Where was it heard? Tap the object that belongs in each place.', shuffle: true,
        names: { shop: 'crate of 45 singles', bedroom: 'small record player', diner: 'jukebox', anywhere: 'pocket radio', living: 'television', gym: 'socks and record player' },
        clues: [['RECORD SHOP', 'shop'], ['BEDROOM', 'bedroom'], ['DINER', 'diner'], ['ANYWHERE', 'anywhere'], ['LIVING ROOM', 'living'], ['SCHOOL GYM', 'gym']] },
    ],
    build(S) {
      const { THREE, K, scene } = S, W = inkWorld(S, { wide: 14, centre: [0, -0.3] }), P = props(W), { M, ink, group, pop, wobble, rig } = W, { mark, burst, arc } = ink;
      const st = PLACES.map((_, i) => { const g = group(); g.position.x = X[i]; return g; });

      // 1 record shop: a crate of 45s, a coin, and the hero record
      const crate = P.box(1.7, 0.62, 0.9, 0.06, M.wood, 0, 0.31, 0, st[0]); ink.line3(st[0], [[-0.7, 0.42, 0.455], [0.7, 0.42, 0.455]], 0.012); ink.line3(st[0], [[-0.7, 0.2, 0.455], [0.7, 0.2, 0.455]], 0.012);
      [[-0.45, -0.1, M.mustard], [0.0, -0.22, M.tealProp], [0.42, -0.02, M.paper]].forEach(([x, z, m], i) => { const r = P.record45(m); r.rotation.x = Math.PI / 2 - 0.12; r.rotation.z = (i - 1) * 0.08; r.position.set(x, 0.95, z); st[0].add(r); });
      const coin1 = P.coin(), coin1Rig = rig(coin1); const coin2 = P.coin(), coin2Rig = rig(coin2);
      const hero = P.record45(M.red), heroRig = rig(hero);
      const buy = W.sprite(mark(burst(9, 0.75, 0.75, 0.35, 0.07, 5)));

      // 2 bedroom: the record player
      const player = P.player(); player.rotation.y = -0.15; st[1].add(player);
      const pc = [X[1] - 0.15 * Math.cos(0.15) + 0.05 * Math.sin(-0.15), 0.47, 0.05 * Math.cos(0.15) + 0.15 * Math.sin(-0.15) * -1];
      const notes2 = [0, 1, 2].map((i) => W.sprite(P.note(i % 2 ? PAL.mustard.lit : PAPER, 0.8, i === 1))), rise2 = P.rise(notes2, { t0: T.at[1] + 12 * F, t1: T.at[2] + 4 * F, from: [X[1] + 0.2, 1.1, 0.4], dx: 0.9, dy: 1.0, period: 1.2 });

      // 3 diner: the jukebox
      const juke = P.jukebox(); juke.position.z = -0.3; juke.rotation.y = -0.18; st[2].add(juke);
      const flash = [0, 1].map((k) => W.sprite(mark(burst(12, 1.25, 1.5, 0.45, 0.08, 20 + k))));
      const notes3 = [0, 1, 2].map((i) => W.sprite(P.note(i % 2 ? PAPER : PAL.mustard.lit, 0.9, i === 0))), rise3 = P.rise(notes3, { t0: T.at[2] + 13 * F, t1: T.at[3] + 4 * F, from: [X[2] + 1.0, 1.9, 0.4], dx: 0.8, dy: 0.9, period: 1.2 });

      // 4 anywhere: the pocket radio out for a walk
      const radio = P.pocketRadio(); radio.rotation.y = -0.3; const radioG = group(st[3]); radioG.add(radio);
      const speed = [0, 1].map((k) => { const m = W.sprite(mark([[[[-1.5, 0.9 + k * 0.1], [-0.75, 0.9 + k * 0.1]], 0.06, 'tail'], [[[-1.7, 0.55 - k * 0.08], [-0.8, 0.55 - k * 0.08]], 0.07, 'tail'], [[[-1.4, 0.2 + k * 0.06], [-0.75, 0.2 + k * 0.06]], 0.05, 'tail']])); return m; });
      const notes4 = [0, 1, 2].map((i) => W.sprite(P.note(i % 2 ? PAL.mustard.lit : PAPER, 0.75, i === 2))), rise4 = P.rise(notes4, { t0: T.at[3] + 8 * F, t1: T.at[4] + 4 * F, from: [X[3] + 0.45, 1.35, 0.4], dx: 0.9, dy: 0.8, period: 1.2 });

      // 5 living room: the television
      const tv = P.tv(); tv.position.z = -0.3; tv.rotation.y = -0.2; st[4].add(tv);
      const stars = [0, 1].map((k) => { const m = P.star5(k ? 0.36 : 0.3, PAL.mustard.lit); m.position.set(-0.2, 1.1, 0.63); m.rotation.z = k * 0.3 - 0.1; tv.add(m); return m; });
      const tvOn = W.sprite(mark(burst(9, 0.95, 0.75, 0.35, 0.06, 12)));

      // 6 school gym: a record player and a pair of dancing socks
      const gymPlayer = P.player({ body: M.red }); gymPlayer.position.set(-0.75, 0, -0.2); gymPlayer.rotation.y = 0.2; st[5].add(gymPlayer);
      const gymDisc = P.record45(M.mustard); gymPlayer.userData.spin.add(gymDisc); gymPlayer.userData.arm.rotation.y = -0.62;
      const socks = [1, -1].map((s) => { const g = group(st[5]); g.add(P.sock(s)); g.userData.home = [0.95 + (s > 0 ? 0 : 0.62), 0, 0.55 + (s > 0 ? 0 : -0.25)]; return g; });
      const hop = [0, 1].map((k) => W.sprite(mark(burst(6, 0.32, 0.12, 0.2, 0.05, 40 + k))));
      const notes6 = [0, 1, 2].map((i) => W.sprite(P.note(i % 2 ? PAPER : PAL.mustard.lit, 0.85, i === 1))), rise6 = P.rise(notes6, { t0: T.at[5] + 7 * F, from: [X[5] - 0.5, 1.15, 0.3], dx: 0.5, dy: 1.1, period: 1.2 });

      const frame = (i, dx = 0, y = 0.9, el = 26, az = -5, d = 7.4) => [X[i] + dx, y, 0.1, el, az, d], keys = [];
      const FR = [[0.15, 1.0, 27, -6, 7.4], [0.1, 0.8, 30, 4, 7.0], [0.2, 1.3, 23, -4, 9.2], [0.25, 0.95, 25, 5, 6.6], [-0.3, 1.25, 24, -4, 8.4], [0.25, 0.85, 28, 3, 7.8]];
      FR.forEach((f, i) => { const a = frame(i, ...f), b = a.slice(); b[4] += 3.5; b[5] -= 0.2; b[0] += i === 3 ? 0.35 : 0.05; keys.push([i ? T.at[i] + F : 0, a, 'inOutQuint'], [(i < 5 ? T.at[i + 1] : T.play) - 4 * F, b, 'linear']); });
      keys[keys.length - 1][0] = T.play; keys.push([T.play + 0.02, [0, 1.0, 0, 35, 0, 14.6], 'linear'], [T.quiz + 1, [0, 1.0, 0, 35, 0, 14.6]]);
      W.setCamera(keys);

      const SPOTS = [[[-0.42, 0.66, 0.4], [0.3, -0.72, -0.5]], [[-0.46, 0.66, 0.4], [0.3, -0.74, -0.5]], [[-0.52, 0.6, 0.4], [-0.36, -0.74, -0.5]], [[-0.46, 0.66, 0.4], [0.2, -0.74, -0.5]], [[-0.5, 0.66, 0.4], [-0.3, -0.76, -0.5]], [[-0.44, 0.66, 0.4], [0, -0.76, -0.5]]];
      const BIG = [1, 1, 1.25, 0.95, 1.15, 1.05];                         // lettering scaled to each framing's distance
      PLACES.forEach((p, i) => { W.label({ word: p.word }, i ? T.at[i] + 6 * F : -1, i < 5 ? T.at[i + 1] - 5 * F : T.play + 0.005, SPOTS[i][0], null, { height: 0.5 * BIG[i], look: T.at[i] + 1.0 });
        W.label({ note: p.note }, i ? T.at[i] + 9 * F : -1, i < 5 ? T.at[i + 1] - 5 * F : T.end + 4 * F, null, SPOTS[i][1], { tilt: i % 2 ? 0.03 : -0.03, cap: 0.36 * BIG[i], look: T.at[i] + 1.0 }); });
      W.label(ENDING, T.end + 7 * F, T.play + 0.005, null, [0, -0.76, -0.5], { tilt: 0.02, cap: 0.36, look: T.play - 0.2 });

      // the hero record: up out of the crate, across to the player, down the spindle
      const A = [X[0] + 0.05, 0.95, 0.35], B = [X[0] + 0.15, 1.75, 0.55], t1 = T.at[1];
      const heroPos = (q) => { if (q < at(12)) return A; if (q < t1 - 4 * F) { const u = K.seg(q, at(12), at(16), K.ease.out); return [K.lerp(A[0], B[0], u), K.lerp(A[1], B[1], u), K.lerp(A[2], B[2], u)]; }
        const u = K.seg(q, t1 - 4 * F, t1 + 5 * F); return [K.lerp(B[0], pc[0], u), K.lerp(B[1], pc[1], u) + 1.5 * Math.sin(Math.PI * u), K.lerp(B[2], pc[2], u)]; };
      const coinArc = (q, t0, from, to, h) => { const u = K.seg(q, t0, t0 + 5 * F); return [K.lerp(from[0], to[0], u), K.lerp(from[1], to[1], u) + h * Math.sin(Math.PI * u), K.lerp(from[2], to[2], u)]; };
      const slot = [X[2] + 0.6 * Math.cos(0.18) + 0.2, 1.33, 0.4];
      const QUIZ = [[-3.3, 1.9], [0, 1.9], [-3.3, -1.5], [3.2, 2.1], [0, -1.5], [3.3, -1.3]];   // quiz pose: two rows of three

      return {
        targets: { shop: st[0], bedroom: [st[1], heroRig.outer], diner: st[2], anywhere: st[3], living: st[4], gym: st[5] },
        update(t) {
          const [q, n] = W.onTwos(t), quiz = t >= T.play + 0.01;
          W.shoot(t);
          st.forEach((g, i) => { if (quiz) g.position.set(QUIZ[i][0], 0, QUIZ[i][1]); else g.position.set(X[i], 0, 0); });

          // 1: coin in, record out
          const c1 = coinArc(q, at(3), [X[0] - 3.2, 1.2, 0.6], [X[0] - 0.55, 0.62, 0.25], 1.6); coin1Rig.set(c1, coinArc(q - F, at(3), [X[0] - 3.2, 1.2, 0.6], [X[0] - 0.55, 0.62, 0.25], 1.6)); coin1Rig.outer.visible = q >= at(3) && !quiz; coin1.rotation.x = q < at(8) ? n * 1.3 : 0;
          const hp = heroPos(q), hp0 = heroPos(q - F), up = K.seg(q, at(12), at(16), K.ease.out), down = K.seg(q, t1 - 2 * F, t1 + 5 * F);
          heroRig.set(hp, hp0, 0.6); hero.rotation.x = (Math.PI / 2 - 0.12) * (1 - down) ; hero.rotation.y = q > t1 + 6 * F ? -(n - (STEP + 6)) * 0.5 : 0; hero.rotation.z = 0.25 * wobble(q - at(16), 3, 6);
          const bx = q - at(15); buy.visible = bx >= 0 && bx < 2 * F - 1e-3; buy.position.set(B[0], B[1], B[2]); buy.scale.setScalar(bx < F - 1e-3 ? 0.85 : 1.1);
          if (quiz) { heroRig.set([QUIZ[1][0] - 0.16, 0.47, QUIZ[1][1] + 0.03], [QUIZ[1][0] - 0.16, 0.47, QUIZ[1][1] + 0.03]); hero.rotation.set(0, 0, 0); }

          // 2: the player plays
          const play2 = q >= t1 + 5 * F; player.userData.arm.rotation.y = -0.62 * K.seg(q, t1 + 6 * F, t1 + 10 * F, K.ease.out); W.squash(player, 1 - 0.12 * wobble(q - t1 - 5 * F + F * 0.5, 3.4, 8)); rise2(q, !quiz);

          // 3: coin in the slot, the jukebox lights up
          const j0 = T.at[2] + 5 * F, c2 = coinArc(q, j0, [X[2] - 2.6, 0.9, 1.0], slot, 1.5); coin2Rig.set(c2, coinArc(q - F, j0, [X[2] - 2.6, 0.9, 1.0], slot, 1.5)); coin2Rig.outer.visible = q >= j0 && q < j0 + 5 * F && !quiz; coin2.rotation.z = Math.PI / 2; coin2.rotation.x = n * 1.1;
          const lit = q - (j0 + 6 * F), on3 = lit >= 0 && q < T.at[3] + 4 * F; W.squash(juke, 1 + 0.1 * wobble(lit + F * 0.5, 3.2, 8) + (on3 && lit > 0.5 ? 0.02 * (Math.floor(n / 2) % 2 ? 1 : -1) : 0));
          juke.userData.rec.rotation.z = lit > 0 ? -n * 0.7 : 0;
          flash.forEach((m, k) => { const on = on3 && !quiz && (lit < 2 * F - 1e-3 ? k === (lit < F - 1e-3 ? 0 : 1) : Math.floor(n / 4) % 2 === k && n % 4 < 2); m.visible = on; m.position.set(X[2] + 0.05, 1.5, 0.3); m.scale.setScalar(k ? 1.08 : 0.95); });
          rise3(q, !quiz);

          // 4: the radio walks
          const walk = q >= T.at[3] - 4 * F && !quiz, wx = walk ? 0.35 * K.seg(q, T.at[3], T.at[4]) : 0;
          radioG.position.set(wx, walk ? [0, 0.14, 0, 0.1][n % 4] : 0, 0.2); radioG.rotation.z = walk ? [-0.1, -0.04, 0.08, 0.03][n % 4] : 0;
          speed.forEach((m, k) => { m.visible = walk && q >= T.at[3] + 4 * F && q < T.at[4] && Math.floor(n / 2) % 2 === k; m.position.set(X[3] + wx, 0.1, 0.2); });
          rise4(q, !quiz);

          // 5: the TV switches on
          const tx = q - (T.at[4] + 9 * F), on5 = tx >= 0; stars.forEach((m, k) => { m.visible = (on5 || quiz) && (quiz ? k === 0 : Math.floor(n / 3) % 2 === k); m.scale.setScalar(quiz ? 1 : pop(tx, 0.2)); });
          tvOn.visible = tx >= 0 && tx < 2 * F - 1e-3; tvOn.position.set(X[4] - 0.25, 1.15, 0.45); tvOn.scale.setScalar(tx < F - 1e-3 ? 0.9 : 1.1);
          W.squash(tv, 1 + 0.08 * wobble(tx + F * 0.5, 3.2, 8));

          // 6: the sock hop
          const dance = q >= T.at[5] - 4 * F && !quiz; gymDisc.rotation.y = dance ? -n * 0.5 : 0;
          socks.forEach((g, k) => { const h = g.userData.home, ph = (Math.floor(n / 2) + k * 2) % 4, upk = dance && ph < 2; g.position.set(h[0] + (dance ? [0.1, 0.16, 0, -0.06][ph] * (k ? -1 : 1) : 0), upk ? (ph === 0 ? 0.3 : 0.16) : 0, h[2]); g.rotation.y = 0.9 + (dance ? [0.5, 0.3, -0.2, -0.4][ph] * (k ? -1 : 1) : 0); g.rotation.z = upk ? (k ? 0.18 : -0.18) : 0; W.squash(g.children[0], dance && ph === 2 ? 0.9 : 1); });
          hop.forEach((m, k) => { const ph = (Math.floor(n / 2) + k * 2) % 4; m.visible = dance && q >= T.at[5] + 4 * F && ph === 2 && n % 2 === 0; const h = socks[k].userData.home; m.position.set(X[5] + h[0] + 0.1, 0.06, h[2] + 0.3); });
          rise6(q, !quiz);

          W.finish(quiz ? 200 : q);
        },
      };
    },

    sound(k) {
      const j0 = T.at[2] + 5 * F;
      k.bed('room', 0, T.play, { gain: 0.7 });
      for (let i = 1; i < 6; i++) k.play('whoosh', T.at[i] - 4 * F, { gain: 0.75, dur: 0.38 });
      PLACES.forEach((p, i) => { k.play('stamp', i ? T.at[i] + 6 * F : 0, { gain: i ? 0.85 : 0.5, pan: -0.3 }); k.play('slap', (i ? T.at[i] + 9 * F : 0.1), { gain: 0.25, pan: 0.2 }); });
      // 1 the shop: a coin for a record
      k.play('swish', at(3), { gain: 0.5, dur: 0.3, pan: -0.5 }); k.tone(at(8), { f: 2700, dur: 0.2, gain: 0.14 }); k.tone(at(8), { f: 4100, dur: 0.12, gain: 0.06 }); k.play('tock', at(8), { gain: 0.5, f: 500 });
      k.play('paper', at(11), { gain: 0.5, dur: 0.12 }); k.play('pop', at(12), { gain: 0.9, f: 520 }); k.play('ding', at(15), { gain: 0.45, f: 'G6' });
      // 2 the bedroom: the record goes on
      k.play('swish', T.at[1] - 4 * F, { gain: 0.6, dur: 0.5 }); k.play('slap', T.at[1] + 5 * F, { gain: 0.6 }); k.play('thud', T.at[1] + 5 * F, { gain: 0.5 }); k.play('click', T.at[1] + 9 * F, { gain: 0.9 });
      k.bed('vinyl', T.at[1] + 9 * F, T.at[2], { gain: 1.2 }); snd.riff(k, T.at[1] + 12 * F, T.at[2] - 2 * F, 'player');
      // 3 the diner: the jukebox
      k.play('swish', j0, { gain: 0.5, dur: 0.3, pan: -0.4 }); k.play('tock', j0 + 5 * F, { gain: 0.8, f: 1300, pan: 0.2 }); k.tone(j0 + 5 * F, { f: 3100, dur: 0.14, gain: 0.08, pan: 0.2 });
      k.play('thud', j0 + 6 * F, { gain: 0.8, f: 110 }); k.play('neon', j0 + 6 * F, { gain: 0.5, dur: 0.25 }); snd.riff(k, j0 + 8 * F, T.at[3] - 2 * F, 'juke'); snd.bass(k, j0 + 8 * F, T.at[3] - 2 * F, { gain: 0.16 });
      // 4 anywhere: the pocket radio
      k.play('click', T.at[3] + 5 * F, { gain: 0.9 }); snd.riff(k, T.at[3] + 6 * F, T.at[4] - 2 * F, 'radio');
      k.withMinor(() => { for (let n = 0; n < STEP - 6; n += 4) k.play('tock', T.at[3] + n * F, { gain: 0.25, f: 640 + (n % 8) * 20 }); });
      // 5 the living room: television
      k.play('crtOn', T.at[4] + 9 * F, { gain: 0.9 }); k.play('ding', T.at[4] + 9 * F, { gain: 0.6, f: 'E6' }); k.noise(T.at[4] + 11 * F, { dur: 1.1, color: 'pink', filter: 'bandpass', f: 2600, q: 0.5, gain: 0.1, a: 0.25, hold: 0.4, verb: 0.2 });
      snd.riff(k, T.at[4] + 12 * F, T.at[5] - 2 * F, 'tv');
      // 6 the school gym: the whole thing, with the backbeat
      const g0 = Math.ceil((T.at[5] + 6 * F) / 0.8) * 0.8, g1 = T.play - 0.5;
      snd.riff(k, g0, g1, 'full'); snd.bass(k, g0, g1); snd.backbeat(k, g0, g1, { gain: 0.8 });
      k.withMinor(() => { for (let t = T.at[5] + 4 * F; t < g1; t += 4 * F) k.play('thud', t, { gain: 0.22, f: 70, pan: 0.3 }); });
      k.play('slap', T.end + 7 * F, { gain: 0.35 }); k.play('ding', g1, { gain: 0.6, f: 'C6' }); snd.guitar(k, g1, ['C3', 'G3', 'C4', 'E4'], { dur: 0.6, gain: 0.05, strum: 0.012 });
    },
  });
}
