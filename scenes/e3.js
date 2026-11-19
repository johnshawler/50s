// EXPERIENCE 3: "Three styles in one" (deck slide 6). Rhythm and blues + country + gospel = rock and roll; the backbeat.
{
  const { PAL, INK, PAPER, F, at, inkWorld, props, snd } = INKTOON;
  // ---------------------------------------------------------------- content (from the slide)
  const STYLES3 = [
    { word: 'RHYTHM & BLUES', note: 'a driving beat, shouting vocals, honking sax', tag: 'rhythm and blues', label: 'tealProp' },
    { word: 'COUNTRY', note: 'guitars, storytelling, and a twang', tag: 'country', label: 'mustard' },
    { word: 'GOSPEL', note: 'powerful singing and call and response', tag: 'gospel', label: 'paper' },
  ];
  const RESULT = { word: 'ROCK AND ROLL', note: 'a new sound, about 1954' };
  const BACKBEAT = { note: 'backbeat: clap on 2 and 4' };
  const DECOYS = [{ tag: 'crooner pop', label: 'navy' }, { tag: 'doo-wop', label: 'steel' }];   // quiz only
  // ---------------------------------------------------------------- timing
  const STEP = 33, HOLD = 16, BEATN = 6;                             // drawings per style, hover before the drop, per count
  const T = { in: [0, at(STEP), at(2 * STEP)], spin: at(3 * STEP), blend: at(3 * STEP + 14), beat0: at(3 * STEP + 42), play: at(3 * STEP + 42 + 8 * BEATN + 5), };
  T.drop = T.in.map((t) => t + HOLD * F); T.land = T.drop.map((t) => t + 3 * F); T.quiz = T.play + 0.4;

  registerStyle({
    id: 'e3', name: 'Ink and Toon', title: 'Three styles in one', slides: 'Slide 6', question: 'Which three older styles blended to make rock and roll?',
    duration: T.play + 0.6, play: T.play, quizAt: T.quiz,
    fonts: ['260px "Anton"', '700 150px "Caveat"'],
    render: { samples: 16, preview: 2, shutter: 0, tone: 'linear', exposure: 1, bloom: 0, vignette: 0, grain: 0, fov: 26, background: PAL.teal.lit },
    beats: [
      { t0: 0, t1: T.in[1], key: T.in[0] + 12 * F, text: [STYLES3[0].word, STYLES3[0].note], moves: 'Opens on a 45 player with a teal-label record tipped towards us above its fat spindle. It levels and drops onto the platter; the player squashes under it.', camera: 'Long lens from the front-left, drifting.', sound: 'Stamp for the word, a honked sax-like square note, vinyl slap and thud on the landing.' },
      { t0: T.in[1], t1: T.in[2], key: T.in[1] + 12 * F, text: [STYLES3[1].word, STYLES3[1].note], moves: 'A mustard-label record pops in above the first, levels and drops on top of it.', camera: 'Snaps round to the front.', sound: 'Stamp, a twangy plucked note with a pitch bend, slap and thud.' },
      { t0: T.in[2], t1: T.spin, key: T.in[2] + 12 * F, text: [STYLES3[2].word, STYLES3[2].note], moves: 'A cream-label record pops in, levels and drops: three records stacked on the spindle.', camera: 'Snaps round to the front-right.', sound: 'Stamp, a two-note call and answer on voices-like tones with a hand clap, slap and thud.' },
      { t0: T.spin, t1: T.beat0, key: T.blend + 8 * F, text: [RESULT.word, RESULT.note], moves: 'The tone arm swings over, the stack spins up with speed lines, squashes down and bursts into ONE record with a persimmon label.', camera: 'Whips in closer and higher over the platter.', sound: 'Motor whirr rising, a riser, then an impact and a bright guitar-like stab on the frame of the burst.' },
      { t0: T.beat0, t1: T.play, key: T.beat0 + 5 * BEATN * F + 2 * F, text: ['1  2  3  4', BACKBEAT.note], moves: 'The record plays. Four count badges light in turn, twice through: on 2 and 4 the badge jumps big, the player hops and clap marks fly; 1 and 3 stay small.', camera: 'Eases back to show the counts over the player; holds.', sound: 'Kick-like thud on 1 and 3, loud snare-clap on 2 and 4, walking bass tones; ends on the last clap ringing out.' },
    ],
    quiz: { key: T.quiz, prompt: 'Two tasks: pick the three styles that blended, then clap the backbeat.', how: 'Five records lie in front of the player (rhythm and blues, country, gospel, crooner pop, doo-wop): tap the three that went on the spindle (3 points). Then the count runs 1-2-3-4 twice and you tap or press space on 2 and 4 (4 claps, scored on timing).', points: 7 },

    check: [
      { type: 'pick', prompt: 'Tap the three styles that blended into rock and roll.', need: 3, right: ['rb', 'country', 'gospel'], names: { rb: 'rhythm and blues', country: 'country', gospel: 'gospel', crooner: 'crooner pop', doowop: 'doo-wop' } },
      { type: 'clap', prompt: 'Clap the backbeat: tap on 2 and 4.', bars: 2, target: 'player' },
    ],
    build(S) {
      const { THREE, K, scene } = S, W = inkWorld(S, {}), P = props(W), { M, ink, group, pop, wobble } = W, { mark, burst, arc } = ink;
      const SC = 1.3, root = group(), player = P.player({ spindle: 0.5 }); player.scale.setScalar(SC); player.position.set(0.15 * SC, 0, -0.05 * SC); root.add(player);
      const BASE = player.userData.top * SC, TH = 0.036 * SC + 0.012, HOVER = 2.25;
      const stack = group(root); stack.position.y = BASE;
      const discs = STYLES3.map((s) => { const d = P.record45(M[s.label]); d.scale.setScalar(SC); stack.add(d); return d; });
      const rock = P.record45(M.red); rock.scale.setScalar(SC); stack.add(rock);
      const decoys = DECOYS.map((s) => { const d = P.record45(M[s.label]); d.scale.setScalar(SC); scene.add(d); return d; });
      const tags = [...STYLES3, ...DECOYS].map((s) => { const c = ink.caption(s.tag, { height: 0.34 }); scene.add(c); return c; });
      const spinMarks = [0, 1].map((k) => { const m = P.lay(mark([[arc(0.95, 0.3 + k, 1.7 + k, 16), 0.07, 'tail'], [arc(0.95, 3.4 + k, 4.8 + k, 16), 0.07, 'tail'], [arc(1.12, 1.9 + k, 2.9 + k, 12), 0.05, 'tail'], [arc(1.12, 5.0 + k, 6.0 + k, 12), 0.05, 'tail']])); m.position.y = BASE + 0.2; scene.add(m); return m; });
      const boom = W.sprite(mark(burst(14, 1.25, 0.7, 0.6, 0.09, 4)));
      const claps = [0, 1].map((k) => W.sprite(mark(burst(8, 0.4, 0.4, 0.3, 0.07, 50 + k))));
      const hitMarks = [0, 1].map((k) => W.sprite(mark(burst(9, 1.5, 0.8, 0.4, 0.07, 60 + k))));

      W.setCamera([[0, [0, 1.22, 0, 26, -9, 8.6]], [T.in[1] - 5 * F, [0, 1.22, 0, 27, -6, 8.4], 'linear'], [T.in[1], [0, 1.25, 0, 27, 0, 8.5], 'inOutQuint'], [T.in[2] - 5 * F, [0, 1.25, 0, 28, 3, 8.3], 'linear'],
        [T.in[2], [0, 1.28, 0, 27, 9, 8.6], 'inOutQuint'], [T.spin - 5 * F, [0, 1.28, 0, 28, 12, 8.4], 'linear'], [T.spin, [0, 0.85, 0, 37, 2, 7.2], 'inOutQuint'], [T.beat0 - 6 * F, [0, 0.85, 0, 38, -2, 7.0], 'linear'],
        [T.beat0, [0, 1.2, 0, 31, -4, 8.2], 'inOutQuint'], [T.play, [0, 1.2, 0, 32, 0, 8.0], 'linear'], [T.play + 0.02, [0, 0.55, 1.1, 38, 0, 12.6], 'linear'], [T.quiz + 1, [0, 0.55, 1.1, 38, 0, 12.6]]]);

      STYLES3.forEach((s, i) => W.label(s, i ? T.in[i] + 2 * F : -1, (i < 2 ? T.in[i + 1] : T.spin) - 5 * F, [-0.34, 0.68, 0.3], [0.1, -0.8, -0.5], { tilt: i % 2 ? 0.03 : -0.03, height: 0.5, look: T.in[i] + 0.7 }));
      W.label(RESULT, T.blend + F, T.beat0 - 6 * F, [-0.3, 0.68, 0.3], [0.2, -0.78, -0.4], { tilt: 0.03, height: 0.56, look: T.blend + 0.5 });
      W.label(BACKBEAT, T.beat0 + 3 * F, T.play + 0.005, null, [0, -0.78, -0.5], { tilt: -0.02, cap: 0.44, look: T.play - 0.2 });
      // the four counts, in the framing of the last beat
      const counts = [1, 2, 3, 4].map((c, j) => { const g = group(), b = ink.badge(String(c), { height: 0.95, color: c % 2 ? PAL.mustard.lit : PAL.persimmon.lit }), a = W.spot(T.play - 0.2, (j - 1.5) * 0.3, 0.62, 0.2); g.add(b); g.position.set(...a.pos); g.quaternion.copy(a.rot); W.onTop(g, 24); return g; });

      return {
        targets: { rb: [discs[0], tags[0]], country: [discs[1], tags[1]], gospel: [discs[2], tags[2]], crooner: [decoys[0], tags[3]], doowop: [decoys[1], tags[4]], player: root },
        update(t) {
          const [q, n] = W.onTwos(t), quiz = t >= T.play + 0.01;
          W.shoot(t);
          const blended = q >= T.blend - 1e-3, spinning = q >= T.spin + 4 * F;
          const turn = spinning ? -(n - Math.round((T.spin + 4 * F) * 15)) * (blended ? 0.55 : Math.PI / 3 * K.seg(q, T.spin + 4 * F, T.blend - 4 * F) + 0.3) : 0;

          // each record hovers tipped towards the lens, levels and drops onto the stack
          discs.forEach((d, i) => {
            if (quiz) { d.visible = true; return; }
            const x = q - T.in[i], drop = K.seg(q, T.drop[i], T.land[i], K.ease.in), y = K.lerp(HOVER - BASE + (i ? 0 : 0.05), i * TH, drop);
            d.visible = (x >= 0 || i === 0) && !blended; d.position.set(0, y, 0.25 * (1 - drop)); d.rotation.set(1.0 * (1 - drop), turn, 0); d.rotation.order = 'XYZ';
            const s = (i === 0 && x < 0.3 ? 1 : pop(x, 0.22)) * SC; d.scale.setScalar(Math.max(s, 1e-3));
          });
          rock.visible = blended; rock.position.set(0, 0, 0); rock.rotation.y = turn; rock.scale.setScalar(SC * (1 + 0.25 * wobble(q - T.blend + F * 0.5, 3, 7)));
          // the player takes each landing, squashes before the burst and hops on the backbeat
          let sy = 1; for (const tl of T.land) sy -= 0.1 * wobble(q - tl + F * 0.5, 3.4, 8);
          sy -= 0.18 * K.seg(q, T.blend - 4 * F, T.blend - F) * (blended ? 0 : 1); sy += 0.16 * wobble(q - T.blend + F * 0.5, 3, 7);
          const beating = q >= T.beat0 - 1e-3 && q < T.play + 0.005, bi = beating ? Math.floor((q - T.beat0) / (BEATN * F) + 1e-3) : -1, bx = beating ? q - T.beat0 - bi * BEATN * F : 9, back = bi >= 0 && bi % 2 === 1;
          if (back) sy += 0.14 * wobble(bx + F * 0.6, 4, 10);
          W.squash(root, sy); root.position.y = back && bx < 2 * F - 1e-3 ? 0.16 : 0;
          player.userData.arm.rotation.y = -0.62 * K.seg(q, T.spin, T.spin + 4 * F, K.ease.out);
          spinMarks.forEach((m, k) => { m.visible = spinning && !quiz && (q < T.blend + 6 * F) && n % 2 === k; });
          const bx0 = q - T.blend; boom.visible = bx0 >= 0 && bx0 < 2 * F - 1e-3; boom.position.set(0, BASE + 0.25, 0.4); boom.scale.setScalar(bx0 < F - 1e-3 ? 0.85 : 1.15);
          hitMarks.forEach((m, k) => { m.visible = back && bx < 2 * F - 1e-3 && k === (bi >> 1) % 2; m.position.set(0, 0.5, 0.6); });

          // the counts
          counts.forEach((g, j) => { const on = beating && bi % 4 === j; g.visible = beating; g.scale.setScalar(on ? (j % 2 ? 1.15 + 0.35 * (1 - K.seg(bx, 0, 4 * F)) : 0.9) : 0.62); g.children[0].rotation.z = on && j % 2 ? 0.12 * wobble(bx + 0.02, 5, 9) : 0; });
          claps.forEach((m, k) => { const on = back && bx < 2 * F - 1e-3 && k === (bx < F - 1e-3 ? 0 : 1); m.visible = on; if (on) { m.position.copy(counts[bi % 4].position); m.scale.setScalar(k ? 1.7 : 1.3); } });

          // quiz pose: five records fanned out in front of the player, each with its name
          [...discs, ...decoys].forEach((d, i) => { const tag = tags[i]; tag.visible = quiz; if (i >= 3) d.visible = quiz; if (!quiz) return;
            const order = [1, 3, 0, 4, 2][i], x = (order - 2) * 1.62, z = 2.3 - Math.abs(order - 2) * 0.22;
            if (i < 3) { stack.remove(d); scene.add(d); } d.position.set(x, 0.42, z); d.rotation.set(0.75, 0, 0); d.scale.setScalar(SC * 0.95); tag.position.set(x, 0.1, z + 0.75); tag.quaternion.copy(S.camera.quaternion); });
          if (!quiz) discs.forEach((d) => { if (d.parent !== stack) { scene.remove(d); stack.add(d); } });

          W.finish(quiz ? 200 : q);
        },
      };
    },

    sound(k) {
      k.bed('room', 0, T.play, { gain: 0.7 });
      const STING = [
        (t) => { for (const [d, n] of [[0, 'Bb2'], [0.2, 'Db3'], [0.4, 'Bb2']]) { k.tone(t + d, { f: n, type: 'sawtooth', dur: 0.19, gain: 0.16, hold: 0.1, filter: 'lowpass', f2: 950, q: 3 }); k.tone(t + d, { f: k.hz(n) * 2, type: 'square', dur: 0.19, gain: 0.03, hold: 0.1, filter: 'lowpass', f2: 1500 }); } k.play('thud', t, { gain: 0.4 }); k.play('thud', t + 0.4, { gain: 0.4 }); },   // honking sax
        (t) => { snd.guitar(k, t, 'E4', { bend: 0.1, dur: 0.3, f2: 2400, q: 3, gain: 0.08 }); snd.guitar(k, t + 0.2, 'G4', { dur: 0.2, f2: 2400, q: 3, gain: 0.07 }); snd.guitar(k, t + 0.4, 'A4', { bend: 0.12, dur: 0.4, f2: 2600, q: 3, gain: 0.08 }); },                 // a twang
        (t) => { for (const n of ['C4', 'E4', 'G4']) k.tone(t, { f: n, type: 'triangle', dur: 0.36, gain: 0.08, hold: 0.2, verb: 0.3 }); for (const n of ['F4', 'A4', 'C5']) k.tone(t + 0.4, { f: n, type: 'triangle', dur: 0.5, gain: 0.07, hold: 0.25, verb: 0.35, pan: 0.25 }); snd.clap(k, t + 0.2, { gain: 0.5 }); snd.clap(k, t + 0.6, { gain: 0.5 }); }, // call and response
      ];
      STYLES3.forEach((s, i) => { k.play('stamp', i ? T.in[i] + 2 * F : 0, { gain: i ? 0.85 : 0.5, pan: -0.3 }); if (i) k.play('pop', T.in[i], { gain: 0.7, f: 560 }); STING[i](T.in[i] + 6 * F);
        k.play('swish', T.drop[i], { gain: 0.7, dur: 0.2 }); k.play('slap', T.land[i], { gain: 0.6 }); k.play('thud', T.land[i], { gain: 0.6, f: 120 + i * 15 }); });
      for (const t of T.in.slice(1)) k.play('swish', t - 4 * F, { gain: 0.4, dur: 0.25 });
      k.play('whoosh', T.spin - 5 * F, { gain: 0.7, dur: 0.4 }); k.play('click', T.spin + 3 * F, { gain: 1, pan: 0.2 });
      const sp0 = T.spin + 4 * F, spd = T.blend - sp0;
      k.tone(sp0, { f: [[0, 55], [spd, 230]], type: 'sawtooth', dur: spd, gain: 0.1, a: spd * 0.7, filter: 'lowpass', f2: 700 }); k.play('riser', T.blend - 0.75, { gain: 0.9, dur: 0.75 });
      k.play('impact', T.blend, { gain: 1 }); snd.guitar(k, T.blend, ['E3', 'B3', 'E4', 'G#4'], { dur: 0.9, gain: 0.07, f2: 1800, strum: 0.012 }); k.play('stamp', T.blend + F, { gain: 0.9, pan: -0.3 });
      k.bed('vinyl', T.blend, T.play, { gain: 1 });
      k.play('whoosh', T.beat0 - 6 * F, { gain: 0.5, dur: 0.4 }); k.play('slap', T.beat0 + 3 * F, { gain: 0.3 });
      const t1 = T.beat0 + 8 * BEATN * F;
      snd.riff(k, T.beat0, t1, 'full'); snd.bass(k, T.beat0, t1);
      for (let b = 0; b < 8; b++) { const t = T.beat0 + b * BEATN * F; if (b % 2) { snd.clap(k, t, { gain: 1.25, verb: b === 7 ? 0.6 : 0.2 }); k.play('thud', t, { gain: 0.45, f: 180 }); } else k.play('thud', t, { gain: 0.6, f: 95 }); k.play('tick', t, { gain: 0.5, f: b % 2 ? 5200 : 3600 }); }
    },
  });
}
