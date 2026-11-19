// EXPERIENCE 2: "Two worlds" (deck slides 3 and 4). Grown-up pop and teen rock.
{
  const { PAL, INK, PAPER, F, at, inkWorld, props, snd } = INKTOON;
  // ---------------------------------------------------------------- content (from the slides)
  const TEXT = {
    croon: { word: 'CROONER', note: 'a soft, warm voice, close to the mic' },
    orch: { note: 'big orchestras, songs written by pros' },
    rock: { word: 'ROCK AND ROLL', n: '1955', note: 'loud beat, electric guitar' },
    popSide: { word: 'TRADITIONAL POP', note: 'parents and whole families' },
    rockSide: { word: 'ROCK AND ROLL', note: 'teenagers' },
  };
  const BEAT = 8;                                                    // drawings between amp hits
  const T = { cut2: at(39), pages: at(46), cut3: at(75), gtr: at(76), gtrLand: at(80), plug: at(84), thump: at(88), cut4: at(120), sides: at(127), play: 11.2, quiz: 11.6 };
  const X = { mic: -2.4, sheets: -4.35, amp: 2.55, gtr: 1.2, pile: 3.9 };

  registerStyle({
    id: 'e2', name: 'Ink and Toon', title: 'Two worlds', slides: 'Slides 3 and 4', question: 'How was a crooner’s pop song different from rock and roll?',
    duration: 11.8, play: T.play, quizAt: T.quiz,
    fonts: ['260px "Anton"', '700 150px "Caveat"'],
    render: { samples: 16, preview: 2, shutter: 0, tone: 'linear', exposure: 1, bloom: 0, vignette: 0, grain: 0, fov: 26, background: PAL.teal.lit },
    beats: [
      { t0: 0, t1: T.cut2, key: 1.6, text: ['CROONER', 'a soft, warm voice, close to the mic'], moves: 'Opens on the crooner’s microphone. Soft cream sound-waves and round notes drift out of it slowly, re-drawn every third drawing.', camera: 'Long lens, level with the microphone, drifting right.', sound: 'A warm sine hum of a held note with slow vibrato, brushed-snare hiss, room tone.' },
      { t0: T.cut2, t1: T.cut3, key: T.pages + 16 * F, text: ['CROONER', 'big orchestras, songs written by pros'], moves: 'Three pages of sheet music flutter down and land in a neat pile beside the microphone; the soft notes keep drifting.', camera: 'Whips a little left and higher to make room for the pages.', sound: 'Three paper landings, a soft string-pad chord under the hum.' },
      { t0: T.cut3, t1: T.cut4, key: T.thump + 2 * BEAT * F + F, text: ['ROCK AND ROLL', '1955', 'loud beat, electric guitar'], moves: 'The camera whips to the other end of the table: a solid-body electric guitar hops in, its cable snaps into a small amplifier, and the amp jumps on every hit, throwing out bolts and jagged lines.', camera: 'Fast whip right across the empty table, then a slow drift.', sound: 'Whoosh, wood tock, jack click and hum, then a loud buzz-and-thud backbeat on each amp jump.' },
      { t0: T.cut4, t1: T.play, key: T.play - 0.25, text: ['TRADITIONAL POP', 'parents and whole families', 'ROCK AND ROLL', 'teenagers'], moves: 'Both ends of the table at once: the microphone still croons softly on the left, the amp still thumps on the right and three 45s pop into a pile beside it. Each side gets its audience caption.', camera: 'Pulls back to a wide two-shot and holds.', sound: 'Soft hum left, loud backbeat right (panned), three vinyl pops, two paper slaps for the captions.' },
    ],
    quiz: { key: T.quiz, prompt: 'Pop or rock? Tap the microphone or the guitar for each clue.', how: 'Six clue cards come up one at a time ("big orchestras", "loud beat", "teenagers", "Patti Page, Nat King Cole", "jukeboxes, 45s, DJ radio", "radio and TV variety shows"). Tap the microphone for traditional pop or the guitar for rock and roll: right answers make that side play, wrong ones buzz.', points: 6 },

    check: [
      { type: 'match', prompt: 'Pop or rock? Tap the microphone or the guitar.', names: { pop: 'microphone: traditional pop', rock: 'guitar and amp: rock and roll' },
        clues: [['smooth voices, big orchestras', 'pop'], ['loud beat, electric guitar', 'rock'], ['teenagers', 'rock'], ['Patti Page, Nat King Cole', 'pop'], ['jukeboxes, 45s, DJ radio', 'rock'], ['radio and TV variety shows', 'pop']] },
    ],
    build(S) {
      const { THREE, K, scene } = S, W = inkWorld(S, { wide: 3.5, centre: [0, -0.3] }), P = props(W), { M, ink, group, pop, wobble, rig } = W, { mark, burst } = ink;

      // ---- the crooner's world
      const mic = P.mic(); mic.position.set(X.mic, 0, 0.3); mic.rotation.y = 0.35; mic.scale.setScalar(1.25); scene.add(mic);
      const waves = [0, 1, 2].map((k) => W.sprite(P.wave(1.5, 0.16, k * 2.1, 0.07)));
      const waves2 = [0, 1, 2].map((k) => W.sprite(P.wave(1.1, 0.12, k * 2.1 + 1, 0.055)));
      const softNotes = [0, 1, 2].map((i) => W.sprite(P.note(PAPER, 0.75, i === 1)));
      const soft = P.rise(softNotes, { t0: 0.2 - 2.4, from: [X.mic + 0.7, 2.0, 0.6], dx: 0.9, dy: 0.7, period: 2.4 });
      const sheets = P.sheets(3); sheets.position.set(X.sheets, 0, 0.6); sheets.rotation.y = 0.3; scene.add(sheets);

      // ---- the teenagers' world
      const amp = P.amp(); amp.position.set(X.amp, 0, -0.3); amp.rotation.y = -0.3; scene.add(amp);
      const gtr = P.guitar('tele'), gtrRig = rig(gtr); gtr.scale.setScalar(0.82); gtr.rotation.set(-0.1, 0.25, 0);
      const cable = ink.solid(K.tube([[X.gtr + 0.38, 0.3, 0.6], [X.gtr + 0.55, 0.05, 0.9], [X.gtr + 1.0, 0.04, 1.0], [X.amp - 0.3, 0.04, 0.75], [X.amp - 0.45, 0.25, 0.35]], 0.03, { segments: 40, radial: 8 }), M.navyFlat, scene, { line: 2.6 });
      const bolts = [0, 1].map((k) => [0, 1, 2].map((i) => W.sprite(P.bolt(i % 2 ? PAL.persimmon.lit : PAL.mustard.lit, 0.9))));
      const blast = [0, 1].map((k) => W.sprite(mark(burst(10, 1.15, 0.95, 0.5, 0.09, 30 + k))));
      const pile = [0, 1, 2].map((i) => { const r = P.record45([M.red, M.mustard, M.tealProp][i]); r.position.set(X.pile + [0, 0.35, -0.2][i], 0.005 + i * 0.04, 0.9 + [0, 0.3, 0.45][i]); r.rotation.y = i; scene.add(r); return r; });

      W.setCamera([[0, [X.mic + 0.15, 1.15, 0.3, 22, -6, 7.0]], [T.cut2 - 5 * F, [X.mic + 0.2, 1.15, 0.3, 23, -2, 6.8], 'linear'], [T.cut2, [X.mic - 0.55, 0.85, 0.6, 29, 5, 7.8], 'inOutQuint'], [T.cut3 - 5 * F, [X.mic - 0.5, 0.85, 0.6, 30, 8, 7.6], 'linear'],
        [T.cut3, [2.05, 1.1, 0, 24, -5, 8.4], 'inOutQuint'], [T.cut4 - 6 * F, [2.1, 1.1, 0, 25, -1, 8.2], 'linear'], [T.cut4, [0.35, 1.05, 0.2, 28, 0, 12.8], 'inOutQuint'], [T.play, [0.35, 1.05, 0.2, 29, 2, 12.5], 'linear'], [T.quiz + 1, [0.35, 1.05, 0.2, 29, 2, 12.5]]]);

      W.label({ word: TEXT.croon.word }, -1, T.cut2 - 6 * F, [-0.46, 0.64, 0.4], null, { look: 0.5 });
      W.label({ word: TEXT.croon.word }, T.cut2 + F, T.cut3 - 6 * F, [-0.5, 0.66, 0.4], null, {});
      W.label({ note: TEXT.croon.note }, -1, T.cut2 - 6 * F, null, [0.4, -0.68, -0.4], { tilt: 0.03, look: 0.5 });
      W.label(TEXT.orch, T.pages + 4 * F, T.cut3 - 6 * F, null, [0.4, -0.72, -0.5], { tilt: -0.03 });
      W.label(TEXT.rock, T.gtrLand + F, T.cut4 - 7 * F, [-0.3, 0.66, 0.4], [-0.4, -0.7, -0.5], { tilt: 0.04, height: 0.5 });
      const sideWords = [W.label({ word: TEXT.popSide.word }, T.sides, 99, [-0.5, 0.66, 0], null, { height: 0.56, look: T.play - 0.2, block: PAL.navy.lit }), W.label({ word: TEXT.rockSide.word }, T.sides + 4 * F, 99, [0.5, 0.66, 0], null, { height: 0.56, look: T.play - 0.2 })];
      W.label({ note: TEXT.popSide.note }, T.sides + 3 * F, 99, null, [-0.52, -0.7, -1.2], { tilt: 0.03, cap: 0.5, look: T.play - 0.2 });
      W.label({ note: TEXT.rockSide.note }, T.sides + 7 * F, 99, null, [0.5, -0.7, -1.2], { tilt: -0.03, cap: 0.5, look: T.play - 0.2 });

      const gtrPos = (q) => { const u = K.seg(q, T.gtr, T.gtrLand); return [X.gtr + 4.5 * (1 - u), 2.6 * Math.sin(Math.PI * u) * (1 - u * 0.6), 0.45]; };

      return {
        targets: { pop: [mic, sheets], rock: [gtrRig.outer, amp, cable] },
        update(t) {
          const [q, n] = W.onTwos(t), quiz = t >= T.play + 0.01;
          W.shoot(t);

          // soft sound from the microphone, redrawn on threes
          const w = Math.floor(n / 3) % 3, sing = !quiz;
          waves.forEach((m, k) => { m.visible = sing && k === w; m.position.set(X.mic + 0.55, 1.62, 0.75); });
          waves2.forEach((m, k) => { m.visible = sing && k === (w + 1) % 3; m.position.set(X.mic + 0.6, 1.25, 0.75); });
          soft(q, sing);
          sheets.userData.pages.forEach((pg, i) => { const land = T.pages + i * 4 * F, u = K.seg(q, land - 4 * F, land, K.ease.in); pg.visible = q >= land - 4 * F; pg.position.y = 0.012 + i * 0.016 + 3.2 * (1 - u); pg.rotation.z = 0.7 * (1 - u) * (i % 2 ? 1 : -1); pg.rotation.x = 0.5 * (1 - u); });

          // the guitar arrives, plugs in, and the amp starts to hit
          const gl = q - T.gtrLand; gtrRig.set(gtrPos(q), gtrPos(q - F)); gtrRig.outer.visible = q >= T.gtr;
          cable.visible = q >= T.plug; cable.scale.setScalar(1);
          const hits = q >= T.thump && !quiz, kk = hits ? Math.floor((q - T.thump) / (BEAT * F) + 1e-3) : -1, hx = hits ? q - T.thump - kk * BEAT * F : -1;
          W.squash(amp, 1 + (hits ? 0.16 * wobble(hx + F * 0.6, 4, 9) : 0));
          W.squash(gtr, (1 - 0.16 * wobble(gl + F * 0.5, 3.2, 8)) ); gtr.scale.multiplyScalar(0.82); gtr.rotation.z = hits && hx < 3 * F ? 0.05 * (n % 2 ? 1 : -1) : 0;
          bolts.forEach((set, k) => set.forEach((m, i) => { const on = hits && k === kk % 2 && hx < 4 * F - 1e-3; m.visible = on; if (!on) return; const a = [2.5, 1.5, 0.6][i] + k * 0.35, r = 1.25 + hx * 3; m.position.set(X.amp + Math.cos(a) * r * 1.1, 0.8 + Math.sin(a) * r, 0.6); m.scale.setScalar(1 + hx * 2); }));
          blast.forEach((m, k) => { m.visible = hits && k === kk % 2 && hx < 2 * F - 1e-3; m.position.set(X.amp - 0.1, 0.72, 0.5); m.scale.setScalar(hx < F - 1e-3 ? 0.8 : 1.05); });
          pile.forEach((r, i) => { const x = q - (T.sides + (7 + i * 4) * F); r.visible = x >= 0; r.scale.setScalar(Math.max(pop(x, 0.22), 1e-3)); });

          W.finish(quiz ? 200 : q); if (quiz) for (const f of sideWords) f(T.play - 0.01);   // in the check the two names stay, the audience captions go
        },
      };
    },

    sound(k) {
      const hit = (t, pan, g = 1) => { snd.guitar(k, t, ['E2', 'B2', 'E3'], { dur: 0.3, gain: 0.085 * g, f2: 1100, pan }); k.play('thud', t, { gain: 0.7 * g, f: 110, pan }); snd.clap(k, t, { gain: 0.55 * g, pan }); };
      k.bed('room', 0, T.play, { gain: 0.7 });
      k.play('stamp', 0, { gain: 0.45 });
      // the crooner: one warm held note with a slow beat in it, over soft strings
      const croon = (t0, t1, g, pan) => { for (const [f, d] of [['A3', 0], ['A3', 9], ['E4', 0]]) k.tone(t0, { f, detune: d, dur: t1 - t0, gain: (f === 'E4' ? 0.035 : 0.07) * g, a: 0.5, hold: t1 - t0 - 1.1, pan, verb: 0.3 }); k.noise(t0, { dur: t1 - t0, filter: 'highpass', f: 6500, gain: 0.012 * g, a: 0.4, hold: t1 - t0 - 0.9, pan }); };
      croon(0.15, T.cut3 - 0.5, 1, -0.1);
      k.music('pad', 0, T.cut3 - 0.6, { bpm: 80, gain: 0.55, chords: [['F3', 'A3', 'C4', 'E4'], ['D3', 'F3', 'A3', 'C4']] });
      k.play('whoosh', T.cut2 - 5 * F, { gain: 0.45, dur: 0.4 }); k.play('stamp', T.cut2 + F, { gain: 0.5, pan: -0.3 });
      for (let i = 0; i < 3; i++) { k.play('paper', T.pages + i * 4 * F - 3 * F, { gain: 0.7, dur: 0.18, pan: -0.4 }); k.play('slap', T.pages + i * 4 * F, { gain: 0.3, pan: -0.4 }); }
      k.play('slap', T.pages + 4 * F, { gain: 0.3, pan: 0.3 });
      k.play('whoosh', T.cut3 - 5 * F, { gain: 1, dur: 0.45, pan: 0.3 });                      // a breath of quiet before it, then the other world
      k.play('swish', T.gtr, { gain: 0.8, dur: 0.22, pan: 0.5 }); k.play('tock', T.gtrLand, { gain: 0.9, f: 400, pan: 0.1 }); k.play('thud', T.gtrLand, { gain: 0.5, pan: 0.1 }); k.play('stamp', T.gtrLand + F, { gain: 0.9, pan: -0.3 });
      k.play('click', T.plug, { gain: 1, pan: 0.2 }); k.play('buzz', T.plug, { gain: 0.5, f: 60, dur: 0.22, pan: 0.2 }); k.bed('hum', T.plug, T.play, { gain: 0.5 });
      for (let t = T.thump, i = 0; t < T.play - 0.25; t += BEAT * F, i++) hit(t, t >= T.cut4 ? 0.45 : 0.15, t >= T.cut4 ? 0.8 : 1);
      k.play('whoosh', T.cut4 - 6 * F, { gain: 0.7, dur: 0.45 }); croon(T.cut4, T.play, 0.75, -0.55);
      k.play('stamp', T.sides, { gain: 0.7, pan: -0.45 }); k.play('stamp', T.sides + 4 * F, { gain: 0.7, pan: 0.45 });
      k.play('slap', T.sides + 3 * F, { gain: 0.3, pan: -0.45 }); k.play('slap', T.sides + 7 * F, { gain: 0.3, pan: 0.45 });
      for (let i = 0; i < 3; i++) k.play('pop', T.sides + (7 + i * 4) * F, { gain: 0.6, f: 480 + i * 90, pan: 0.6 });
    },
  });
}
