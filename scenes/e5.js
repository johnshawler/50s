// EXPERIENCE 5: "Five artists to remember" (deck slide 11: its four artists, plus Sister Rosetta Tharpe from the slide's footer). One object and one action for each.
{
  const { PAL, INK, PAPER, F, at, inkWorld, props, snd } = INKTOON;
  // ---------------------------------------------------------------- content (from the slide)
  const ARTISTS = [
    { word: 'SISTER ROSETTA THARPE', name: 'Sister Rosetta Tharpe', note: 'before them all: gospel on lead electric guitar', n: '1930s' },
    { word: 'ELVIS PRESLEY', name: 'Elvis Presley', note: 'blended country and R&B: rock’s first superstar' },
    { word: 'CHUCK BERRY', name: 'Chuck Berry', note: 'witty songs about teen life; shaped rock guitar' },
    { word: 'LITTLE RICHARD', name: 'Little Richard', note: 'gospel power, wild energy, pounding piano' },
    { word: 'BUDDY HOLLY', name: 'Buddy Holly', note: 'wrote his own hits, led his band The Crickets' },
  ];
  const STEP = 34;
  const T = { at: ARTISTS.map((_, i) => at(i * STEP)), wide: at(5 * STEP), names: at(5 * STEP + 6), play: at(5 * STEP + 32) }; T.quiz = T.play + 0.4;
  const X = [-10, -5, 0, 5, 10], XL = [-5.1, -2.75, -0.45, 2.45, 5.25];   // spread out for the solos, closed up for the line-up of five

  registerStyle({
    id: 'e5', name: 'Ink and Toon', title: 'Five artists to remember', slides: 'Slide 11', question: 'Pick one artist. What did that person add to rock and roll?',
    duration: T.play + 0.6, play: T.play, quizAt: T.quiz,
    fonts: ['260px "Anton"', '700 150px "Caveat"'],
    render: { samples: 16, preview: 2, shutter: 0, tone: 'linear', exposure: 1, bloom: 0, vignette: 0, grain: 0, fov: 26, background: PAL.teal.lit },
    beats: [
      { t0: T.at[0], t1: T.at[1], key: T.at[0] + 20 * F, text: [ARTISTS[0].word, '1930s', ARTISTS[0].note], moves: 'Opens on a hollow-body electric guitar standing alone. It rings: jagged lines and bolts jump off the strings on twos.', camera: 'Long lens on the guitar, drifting.', sound: 'A gritty electric guitar lick (sawtooth through a band-pass), hand claps, room tone.' },
      { t0: T.at[1], t1: T.at[2], key: T.at[1] + 24 * F, text: [ARTISTS[1].word, ARTISTS[1].note], moves: 'A microphone. Two small 45s, a mustard one (country) and a teal one (R&B), fly in from either side, meet above it and burst into a gold star that stays, twinkling.', camera: 'Whips right to the microphone.', sound: 'Two swishes, an impact where they meet, sparkle and a ding for the star.' },
      { t0: T.at[2], t1: T.at[3], key: T.at[2] + 24 * F, text: [ARTISTS[2].word, ARTISTS[2].note], moves: 'A cutaway hollow-body guitar hops from side to side across the table (the duck walk) while a pencil scribbles lines onto a page beside it.', camera: 'Whips right; drifts with the hopping guitar.', sound: 'A two-string guitar riff, pencil strokes on paper, wood hops.' },
      { t0: T.at[3], t1: T.at[4], key: T.at[3] + 24 * F, text: [ARTISTS[3].word, ARTISTS[3].note], moves: 'An upright piano: keys slam down in changing clusters on every drawing pair, the whole piano shakes and impact ticks fly off the keyboard.', camera: 'Whips right, a little wider for the piano.', sound: 'Pounded piano clusters (stacked detuned tones) in fast eighths, a whoop-like rising tone.' },
      { t0: T.at[4], t1: T.wide, key: T.at[4] + 24 * F, text: [ARTISTS[4].word, ARTISTS[4].note], moves: 'A solid-body guitar hops in, a pair of horn-rimmed glasses lands in front of it, and a pencil writes on a page: his own song.', camera: 'Whips right to the last artist.', sound: 'Wood tock, a light click for the glasses, pencil strokes, a bright strummed chord.' },
      { t0: T.wide, t1: T.play, key: T.play - 0.3, text: ARTISTS.map((a) => a.name), moves: 'All five set-ups hop together into one row, each still doing its action; a name slip pops under each from left to right. Holds on the five.', camera: 'Pulls far back to hold the whole line-up for the last second and a half.', sound: 'Five paper slaps in a run, all the instruments together on a last chord that rings out.' },
    ],
    quiz: { key: T.quiz, prompt: 'Who did it? Tap the artist for each clue.', how: 'Five clues, one at a time in shuffled order. Tap the matching set-up in the line-up of five. One point each.', points: 5 },

    check: [
      { type: 'match', prompt: 'Who did it? Tap the artist for each clue.', shuffle: true,
        names: { tharpe: 'Sister Rosetta Tharpe', elvis: 'Elvis Presley', berry: 'Chuck Berry', richard: 'Little Richard', holly: 'Buddy Holly' },
        clues: [['played gospel on a lead electric guitar from the late 1930s', 'tharpe'], ['blended country and R&B and became rock’s first superstar', 'elvis'], ['wrote witty songs about teen life and shaped rock guitar', 'berry'], ['brought gospel power, wild energy, and pounding piano', 'richard'], ['wrote his own hits and led his own band, The Crickets', 'holly']] },
    ],
    build(S) {
      const { THREE, K, scene } = S, W = inkWorld(S, { wide: 9, centre: [0, -0.3], sunSize: 11 }), P = props(W), { M, ink, group, pop, wobble, rig } = W, { mark, burst } = ink;
      const st = ARTISTS.map((_, i) => { const g = group(); g.position.x = X[i]; return g; });
      const page = (parent, x, z, ry) => { const s = P.sheets(1); s.position.set(x, 0, z); s.rotation.y = ry; parent.add(s); return s; };

      // 0 Sister Rosetta Tharpe: the hollow-body electric guitar that came first
      const g0 = P.guitar('arch', { body: M.cream }); g0.scale.setScalar(0.95); g0.rotation.set(-0.1, 0.2, 0); st[0].add(g0);
      const ring0 = [0, 1].map((k) => [0, 1, 2].map((i) => W.sprite(i === 2 ? P.zig(0.9, 0.16, 0.09, PAL.mustard.lit) : P.bolt(i ? PAL.persimmon.lit : PAL.mustard.lit, 0.85))));

      // 1 Elvis Presley: a microphone, two styles meeting, a star
      const mic = P.mic(); mic.scale.setScalar(1.2); mic.rotation.y = 0.25; st[1].add(mic);
      const fly = [M.mustard, M.tealProp].map((m) => { const d = P.record45(m); d.scale.setScalar(0.62); return { d, r: rig(d) }; });
      const star = W.sprite(P.star5(0.42)), star2 = W.sprite(P.star5(0.5)), meet = W.sprite(mark(burst(11, 0.6, 0.6, 0.45, 0.08, 8)));
      const MEET = [X[1], 2.75, 0.3];

      // 2 Chuck Berry: the guitar that walks, the pencil that writes
      const g2 = P.guitar('archcut'), g2G = group(st[2]); g2.scale.setScalar(0.9); g2.rotation.set(-0.08, 0.15, 0); g2G.add(g2);
      const page2 = page(st[2], 1.4, 0.6, -0.2), pen2 = P.pencil(); st[2].add(pen2);
      const hopMark = [0, 1].map((k) => W.sprite(mark(burst(6, 0.5, 0.14, 0.22, 0.05, 70 + k))));

      // 3 Little Richard: the pounded piano
      const piano = P.piano(14), pianoG = group(st[3]); piano.scale.setScalar(0.92); piano.rotation.y = -0.22; pianoG.add(piano);
      const pound = [0, 1].map((k) => W.sprite(mark(burst(9, 1.0, 0.3, 0.45, 0.08, 80 + k))));
      const loud = [0, 1].map((k) => W.sprite(P.bolt(k ? PAL.mustard.lit : PAL.persimmon.lit, 1)));

      // 4 Buddy Holly: guitar, glasses, his own song
      const g4 = P.guitar('strat', { body: M.red }), g4Rig = rig(g4, st[4]); g4.scale.setScalar(0.9); g4.rotation.set(-0.08, -0.15, 0);
      const specs = P.glasses(), specsRig = rig(specs, st[4]); specs.scale.setScalar(1.0); specs.rotation.y = 0.3;
      const page4 = page(st[4], 1.5, 0.95, 0.25), pen4 = P.pencil(); st[4].add(pen4);

      const FR = [[-1.55, 1.3, 23, -6, 8.8], [-0.95, 1.5, 22, 5, 8.4], [-0.5, 1.25, 24, -4, 9.0], [-0.55, 1.2, 24, 5, 9.4], [-0.45, 1.25, 24, -4, 9.0]], keys = [];
      FR.forEach((f, i) => { const a = [X[i] + f[0], f[1], 0.2, f[2], f[3], f[4]], b = a.slice(); b[4] += 3.5; b[5] -= 0.2; keys.push([i ? T.at[i] + F : 0, a, 'inOutQuint'], [(i < 4 ? T.at[i + 1] : T.wide) - 4 * F, b, 'linear']); });
      keys.push([T.wide + 3 * F, [0.2, 0.3, 0.3, 27, 0, 18.4], 'inOutQuint'], [T.play, [0.2, 0.3, 0.3, 28, 1.2, 18.1], 'linear'], [T.quiz + 1, [0.2, 0.3, 0.3, 28, 1.2, 18.1]]);
      W.setCamera(keys);

      ARTISTS.forEach((a, i) => { W.label({ word: a.word, n: a.n }, i ? T.at[i] + 6 * F : -1, (i < 4 ? T.at[i + 1] : T.wide) - 5 * F, [-0.5, 0.68, 0.4], null, { height: i ? 0.5 : 0.33, look: T.at[i] + 1.0, badge: PAL.mustard.lit });
        W.label({ note: a.note }, i ? T.at[i] + 9 * F : -1, (i < 4 ? T.at[i + 1] : T.wide) - 5 * F, null, [-0.1, -0.78, -0.5], { tilt: i % 2 ? 0.02 : -0.02, cap: 0.38, look: T.at[i] + 1.0 }); });
      // name slips for the final line-up (and the quiz)
      const names = ARTISTS.map((a, i) => { const c = ink.caption(a.name, { height: 0.46 }), g = group(); g.add(c); const s = W.spot(T.play - 0.2, 0, 0, 0); g.quaternion.copy(s.rot); g.position.set(XL[i] + [0.45, 0.7, 0.3, 0.2, -0.25][i], 0.4, 2.2 + (i % 2) * 0.9); c.rotation.z = (i % 2 ? 0.03 : -0.03); W.onTop(g, 23); return g; });

      const flyPos = (q, s) => { const t0 = T.at[1] + 8 * F, u = K.seg(q, t0, t0 + 6 * F, K.ease.inOut); return [MEET[0] + s * 4.2 * (1 - u), MEET[1] - 1.2 * (1 - u) + 1.2 * Math.sin(Math.PI * u) * 0.8, MEET[2]]; };
      const g4Pos = (q) => { const u = K.seg(q, T.at[4] + F, T.at[4] + 5 * F); return [4.2 * (1 - u), 2.4 * Math.sin(Math.PI * u) * (1 - u * 0.6), 0]; };
      const specPos = (q) => { const u = K.seg(q, T.at[4] + 8 * F, T.at[4] + 12 * F, K.ease.in); return [-0.95, 4.2 * (1 - u), 0.85]; };
      const write = (pen, base, q, t0, on) => { const x = Math.max(0, q - t0), k = Math.floor(x * 15 + 1e-3), row = Math.floor(k / 6) % 4, u = (k % 6) / 5; pen.visible = true; pen.rotation.set(0.5, 0, -0.5);
        pen.position.set(base[0] - 0.3 + (on ? u * 0.55 : 0.2), 0.03 + (on && k % 2 ? 0.03 : 0), base[1] - 0.35 + (on ? row * 0.18 : 0.1)); };

      return {
        targets: { tharpe: [st[0], names[0]], elvis: [st[1], names[1]], berry: [st[2], names[2]], richard: [st[3], names[3]], holly: [st[4], names[4]] },
        update(t) {
          const [q, n] = W.onTwos(t), quiz = t >= T.play + 0.01, all = q >= T.wide - 1e-3 && !quiz;
          W.shoot(t);
          // for the line-up every set-up hops sideways to close the gaps
          const lu = quiz ? 1 : K.seg(q, T.wide - 3 * F, T.wide + 3 * F), XS = X.map((x, i) => K.lerp(x, XL[i], lu)); st.forEach((g, i) => g.position.set(XS[i], 0.9 * Math.sin(Math.PI * lu) * (i === 2 ? 0.3 : 1), 0));
          const act = (i) => (q >= T.at[i] + 6 * F && (all || q < (i < 4 ? T.at[i + 1] + 4 * F : 99))) && !quiz;

          // 0: the guitar rings
          const a0 = (q >= 0.2 && q < T.at[1] + 4 * F || all) && !quiz, k0 = Math.floor(n / 2) % 2, x0 = (n % 4) / 4;
          g0.rotation.z = a0 ? 0.03 * (n % 2 ? 1 : -1) : 0;
          ring0.forEach((set, k) => set.forEach((m, i) => { const on = a0 && k === k0 && Math.floor(n / 4) % 2 === 0 || (a0 && k === k0 && i === 2); m.visible = on; if (!on) return; const a = [2.3, 0.9, 0][i] + k * 0.4, r = 1.0 + x0 * 0.5; m.position.set(XS[0] + (i === 2 ? 0.55 : Math.cos(a) * r), (i === 2 ? 1.0 + k * 0.3 : 1.2 + Math.sin(a) * r), 0.6); }));

          // 1: two styles meet over the microphone and make a star
          const tm = T.at[1] + 14 * F, met = q >= tm - 1e-3;
          fly.forEach(({ d, r }, k) => { const s = k ? 1 : -1; r.set(flyPos(q, s), flyPos(q - F, s)); r.outer.visible = q >= T.at[1] + 8 * F && !met && !quiz; d.rotation.x = 1.1; d.rotation.y = n * 0.8 * s; });
          const mx = q - tm; meet.visible = mx >= 0 && mx < 2 * F - 1e-3; meet.position.set(XS[1], MEET[1], MEET[2]); meet.scale.setScalar(mx < F - 1e-3 ? 0.9 : 1.3);
          const tw = Math.floor(n / 3) % 2; star.visible = (met || quiz) && (quiz || tw === 0); star2.visible = met && !quiz && tw === 1; star.position.set(XS[1], MEET[1], MEET[2]); star2.position.set(XS[1], MEET[1], MEET[2]); star.scale.setScalar(quiz ? 1 : pop(mx, 0.22)); 
          W.squash(mic, 1 + 0.1 * wobble(mx + F * 0.5, 3.2, 8)); mic.scale.multiplyScalar(1.2);

          // 2: the duck walk, and the songwriting
          const a2 = act(2), ph = Math.floor(n / 2) % 6, dx = a2 ? [-0.5, -0.25, 0, 0.25, 0.5, 0][ph] : 0, upk = a2 && n % 2 === 1;
          g2G.position.set(dx, upk ? 0.22 : 0, 0); g2G.rotation.z = a2 ? -0.16 + (upk ? 0.05 : 0) : 0;
          hopMark.forEach((m, k) => { m.visible = a2 && n % 2 === 0 && k === ph % 2; m.position.set(XS[2] + dx, 0.06, 0.5); });
          write(pen2, [1.4, 0.6], q, T.at[2] + 8 * F, a2);

          // 3: the piano takes a pounding
          const a3 = act(3), beat3 = Math.floor(n / 2), kd = piano.userData;
          kd.keys.forEach((k, i) => { k.position.y = kd.keyY - (a3 && K.hash(i, beat3) > 0.62 ? 0.05 : 0); });
          kd.blacks.forEach((k, i) => { k.position.y = 1.115 - (a3 && K.hash(i + 40, beat3) > 0.75 ? 0.04 : 0); });
          pianoG.position.y = a3 && n % 2 === 0 ? 0.05 : 0; pianoG.rotation.z = a3 ? 0.012 * (beat3 % 2 ? 1 : -1) : 0;
          pound.forEach((m, k) => { m.visible = a3 && n % 2 === 0 && beat3 % 2 === k; m.position.set(XS[3] + 0.05, 1.2, 0.75); });
          loud.forEach((m, k) => { m.visible = a3 && beat3 % 4 === k * 2; m.position.set(XS[3] + (k ? 1.75 : -1.7), 2.1 + k * 0.2, 0.3); });

          // 4: guitar in, glasses down, pencil writing
          const gp = g4Pos(q), l4 = q - (T.at[4] + 5 * F); g4Rig.set(gp, g4Pos(q - F)); g4Rig.outer.visible = q >= T.at[4] + F || quiz; W.squash(g4, 1 - 0.14 * wobble(l4 + F * 0.5, 3.2, 8)); g4.scale.multiplyScalar(0.9);
          const sp = specPos(q), l5 = q - (T.at[4] + 12 * F); specsRig.set(sp, specPos(q - F), 0.4); specsRig.outer.visible = q >= T.at[4] + 8 * F || quiz; W.squash(specs, 1 - 0.2 * wobble(l5 + F * 0.5, 3.4, 8)); specs.scale.multiplyScalar(1.0);
          write(pen4, [1.5, 0.95], q, T.at[4] + 14 * F, act(4) && q >= T.at[4] + 14 * F);

          names.forEach((g, i) => { const x = quiz ? 9 : q - (T.names + i * 3 * F); g.visible = x >= 0; g.scale.setScalar(Math.max(pop(x, 0.22), 1e-3)); });
          W.finish(quiz ? 200 : q);
        },
      };
    },

    sound(k) {
      const E8 = snd.E8, LICK = ['E4', 'G4', 'A4', 'Bb4', 'A4', 'G4', 'E4', 'D4'], KEYS = ['C4', 'E4', 'G4', 'Bb4', 'C5', 'Eb5', 'G5'];
      k.bed('room', 0, T.play, { gain: 0.7 });
      for (let i = 1; i < 5; i++) k.play('whoosh', T.at[i] - 4 * F, { gain: 0.75, dur: 0.38 });
      ARTISTS.forEach((a, i) => { k.play('stamp', i ? T.at[i] + 6 * F : 0, { gain: i ? 0.85 : 0.5, pan: -0.3 }); k.play('slap', i ? T.at[i] + 9 * F : 0.1, { gain: 0.25 }); });
      // 0 Tharpe: a gritty lead guitar over hand claps
      for (let t = 0.4, i = 0; t < T.at[1] - 0.45; t += E8, i++) { snd.guitar(k, t, LICK[i % 8], { gain: 0.085, f2: 1500, bend: i % 4 === 2 ? 0.08 : 0 }); if (i % 4 === 2) snd.clap(k, t, { gain: 0.45, pan: 0.3 }); }
      // 1 Elvis: two styles meet, a star is born
      const tm = T.at[1] + 14 * F; k.play('swish', T.at[1] + 8 * F, { gain: 0.8, dur: 0.4, pan: -0.6 }); k.play('swish', T.at[1] + 9 * F, { gain: 0.8, dur: 0.4, pan: 0.6 });
      k.play('impact', tm, { gain: 0.7 }); k.play('sparkle', tm, { gain: 1.2 }); k.play('ding', tm, { gain: 0.7, f: 'C6' }); k.play('ding', tm + 3 * F, { gain: 0.5, f: 'G6' });
      // 2 Chuck Berry: the two-string riff, and a pencil
      for (let t = Math.ceil((T.at[2] + 6 * F) / E8) * E8, i = 0; t < T.at[3] - 0.45; t += E8, i++) snd.guitar(k, t, ['A2', i % 4 < 2 ? 'E3' : 'F#3'], { gain: 0.075, f2: 1300, dur: 0.18 });
      for (let n = 8; n < STEP - 8; n += 7) k.play('stroke', T.at[2] + n * F, { material: 'pencil', dur: 0.3, gain: 0.8, pan: 0.4, minor: true });
      k.withMinor(() => { for (let n = 6; n < STEP - 6; n += 2) k.play('tock', T.at[2] + n * F, { gain: 0.14, f: 300 }); });
      // 3 Little Richard: the piano takes a pounding
      for (let n = 6, i = 0; n < STEP - 4; n += 2, i++) { const pick = KEYS.filter((_, j) => K.hash(j, i) > 0.5); snd.piano(k, T.at[3] + n * F, pick.length ? pick : ['C4', 'G4'], { gain: 0.075, dur: 0.16 }); if (i % 3 === 0) k.play('thud', T.at[3] + n * F, { gain: 0.3, f: 85 }); }
      k.tone(T.at[3] + 18 * F, { f: [[0, 640], [0.3, 1500]], dur: 0.36, gain: 0.07, a: 0.05, verb: 0.3 });
      // 4 Buddy Holly: guitar, glasses, his own song
      k.play('swish', T.at[4] + F, { gain: 0.6, dur: 0.25, pan: 0.5 }); k.play('tock', T.at[4] + 5 * F, { gain: 0.8, f: 420 }); k.play('click', T.at[4] + 12 * F, { gain: 1.2 }); k.play('tock', T.at[4] + 12 * F, { gain: 0.4, f: 900 });
      for (let n = 14; n < STEP - 6; n += 7) k.play('stroke', T.at[4] + n * F, { material: 'pencil', dur: 0.3, gain: 0.8, pan: 0.4, minor: true });
      snd.guitar(k, T.at[4] + 16 * F, ['E3', 'B3', 'E4', 'G#4', 'B4'], { dur: 0.9, gain: 0.05, f2: 2600, strum: 0.02 }); snd.guitar(k, T.at[4] + 22 * F, ['A3', 'E4', 'A4', 'C#5'], { dur: 0.8, gain: 0.05, f2: 2600, strum: 0.02 });
      // the line-up
      k.play('whoosh', T.wide - 3 * F, { gain: 0.9, dur: 0.5 }); k.play('thud', T.wide + 3 * F, { gain: 0.7, f: 90 });
      ARTISTS.forEach((a, i) => k.play('slap', T.names + i * 3 * F, { gain: 0.5, pan: (i - 2) * 0.35 }));
      const end = T.names + 17 * F; snd.guitar(k, end, ['E3', 'B3', 'E4', 'G#4'], { dur: 1.3, gain: 0.06, strum: 0.014, verb: 0.3 }); snd.piano(k, end, ['E4', 'G#4', 'B4', 'E5'], { gain: 0.08, dur: 1.2 }); snd.clap(k, end, { gain: 0.9, verb: 0.5 }); k.play('ding', end, { gain: 0.5, f: 'E6' });
    },
  });
}
