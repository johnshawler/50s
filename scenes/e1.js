// EXPERIENCE 1: "Small, cheap, and yours" (deck slides 5 and 2). New technology put music in teen hands.
{
  const { PAL, INK, F, at, inkWorld, props, snd } = INKTOON;
  // ---------------------------------------------------------------- content (from the slides)
  const TEXT = {
    old: { word: '78 RPM', note: 'before 1949: big and heavy' }, smash: { note: 'shattered if dropped!' },
    single: { word: '45 RPM', n: '1949', note: 'one song a side, under a dollar' },
    radio: { word: 'POCKET RADIO', n: '1954', note: 'a transistor radio fit in a pocket' },
    tv: { word: 'TELEVISION', note: 'U.S. homes with a TV (about)' },
    homes: [['1950', '9%'], ['1955', '65%'], ['1959', '86%']],
    end: { note: 'small, cheap, and yours' },
  };
  // ---------------------------------------------------------------- timing (drawings at 15 a second)
  const T = { tip: at(20), smash: at(24), cut2: at(42), drop45: at(40), land45: at(43), coins: at(58), cut3: at(78), radioIn: at(76), radioLand: at(80), cut4: at(111), tvIn: at(109), tvLand: at(113),
    pct: [at(120), at(131), at(142)], wide: at(157), endCap: at(163), play: 11.9, quiz: 12.3 };
  const X = { old: -4.3, single: -1.0, coins: 0.05, radio: 1.15, tv: 3.3 };

  registerStyle({
    id: 'e1', name: 'Ink and Toon', title: 'Small, cheap, and yours', slides: 'Slides 5 and 2', question: 'What made 1950s teenagers a new kind of music audience?',
    duration: 12.5, play: T.play, quizAt: T.quiz,
    fonts: ['260px "Anton"', '700 150px "Caveat"'],
    render: { samples: 16, preview: 2, shutter: 0, tone: 'linear', exposure: 1, bloom: 0, vignette: 0, grain: 0, fov: 26, background: PAL.teal.lit },
    beats: [
      { t0: 0, t1: T.cut2, key: T.smash + 5 * F, text: ['78 RPM', 'before 1949: big and heavy', 'shattered if dropped!'], moves: 'Opens on a ten-inch 78 standing on its edge, rocking. It tips over backwards and breaks into seven pieces that skid outwards; impact ticks for two drawings.', camera: 'Long lens, low, front-left of the record; slow drift in.', sound: 'Shellac wobble ticks, a hard crack and scatter on the frame it breaks, then a beat of silence.' },
      { t0: T.cut2, t1: T.cut3, key: T.coins + 9 * F, text: ['45 RPM', '1949', 'one song a side, under a dollar'], moves: 'A seven-inch 45 drops in beside the wreck, bounces twice and does not break. Three coins hop into a stack next to it.', camera: 'Whips right in a third of a second to the 45, a little higher, then drifts.', sound: 'Whoosh on the whip, two rubbery vinyl bounces, stamp on the word, three coin clinks.' },
      { t0: T.cut3, t1: T.cut4, key: T.radioLand + 16 * F, text: ['POCKET RADIO', '1954', 'a transistor radio fit in a pocket'], moves: 'A pocket transistor radio hops in from the right, lands with a squash and starts to play: notes pop out of the grille on twos.', camera: 'Whips right to the radio, eye-level with it.', sound: 'Plastic tock on landing, dial click, a tinny square-wave riff from the radio.' },
      { t0: T.cut4, t1: T.wide, key: T.pct[2] + 4 * F, text: ['TELEVISION', 'U.S. homes with a TV (about)', '1950 9% / 1955 65% / 1959 86%'], moves: 'A television set drops in. Its screen snaps through three readings: 1950 9%, 1955 65%, 1959 86%; the rabbit ears twitch on each.', camera: 'Whips right and back to take in the whole set.', sound: 'Heavy cabinet thud, CRT switch-on, a rising blip for each number, the last one a ding.' },
      { t0: T.wide, t1: T.play, key: T.play - 0.3, text: ['small, cheap, and yours'], moves: 'Nothing new arrives: the 45, the coins, the radio and the TV sit together as one teenage kit, radio still playing.', camera: 'Pulls back to hold all three inventions; holds for the last second.', sound: 'Paper slap for the caption, radio riff resolves, room tone.' },
    ],
    quiz: { key: T.quiz, prompt: 'Tap the three inventions that put music in teen hands.', how: 'The table holds the broken 78, the 45, the pocket radio and the TV. Three taps; each right object pops and scores a point, the 78 buzzes. Then: "About how many U.S. homes had a TV by 1959?" 9% / 65% / 86%.', points: 4 },

    check: [
      { type: 'pick', prompt: 'Tap the three inventions that put music in teen hands.', need: 3, right: ['single', 'radio', 'tv'], names: { old: 'the 78 record', single: 'the 45 single', radio: 'the pocket radio', tv: 'the television' } },
      { type: 'choice', prompt: 'About how many U.S. homes had a TV by 1959?', options: ['about 9%', 'about 65%', 'about 86%'], answer: 2 },
    ],
    build(S) {
      const { THREE, K, scene } = S, W = inkWorld(S, { wide: 3, centre: [0, -0.3] }), P = props(W), { M, ink, group, pop, wobble, rig } = W;
      const { mark, burst } = ink;

      // ---- the 78: stands on its edge, falls on its back, breaks
      const oldPivot = group(); oldPivot.position.set(X.old, 0, 0.5);
      const old = P.record78(); old.rotation.x = Math.PI / 2; old.position.y = 0.86; oldPivot.add(old);
      const shards = P.shards78(7, 5), shardG = group(); shardG.position.set(X.old, 0, 0.5 - 0.86);
      shards.forEach((s) => { s.rotation.x = -Math.PI / 2; shardG.add(s); });
      const crack = W.sprite(mark(burst(13, 1.1, 0.5, 0.55, 0.08, 3)));

      // ---- the 45 and the pocket money
      const single = P.record45(M.red), singleRig = rig(single);
      const coins = [0, 1, 2].map((i) => { const c = P.coin(); c.position.set(X.coins + (i - 1) * 0.02, 0.046 * i, 1.0 + (i % 2) * 0.02); scene.add(c); return c; });
      const coinTick = W.sprite(mark(burst(7, 0.3, 0.2, 0.2, 0.05, 9)));

      // ---- the pocket radio and its notes
      const radio = P.pocketRadio(), radioRig = rig(radio); radio.rotation.y = -0.25;
      const notes = [0, 1, 2, 3].map((i) => W.sprite(P.note(i % 2 ? PAL.mustard.lit : undefined, 0.8, i === 2)));

      // ---- the television
      const tv = P.tv(), tvRig = rig(tv); tv.rotation.y = -0.22;
      const readings = TEXT.homes.map(([year, pct]) => { const g = new THREE.Group(), a = K.textPlane(pct, { font: '260px "Anton"', color: INK, height: 0.46 }), b = K.textPlane(year, { font: '260px "Anton"', color: PAL.persimmon.shade, height: 0.2 });
        a.position.y = -0.1; b.position.y = 0.29; g.add(a, b); g.position.set(-0.2, 1.1, 0.63); tv.add(g); return g; });
      const tvTick = W.sprite(mark(burst(9, 0.9, 0.7, 0.35, 0.06, 12)));

      W.setCamera([[0, [X.old + 0.1, 0.8, 0.2, 24, -7, 7.9]], [T.cut2 - 5 * F, [X.old + 0.2, 0.55, 0.1, 27, -3, 7.5], 'linear'], [T.cut2, [X.single + 0.45, 0.4, 0.75, 33, 4, 6.2], 'inOutQuint'], [T.cut3 - 5 * F, [X.single + 0.5, 0.4, 0.75, 34, 8, 6.0], 'linear'],
        [T.cut3, [X.radio, 0.95, 0.2, 25, -7, 6.3], 'inOutQuint'], [T.cut4 - 5 * F, [X.radio, 0.95, 0.2, 26, -3, 6.1], 'linear'], [T.cut4, [X.tv, 1.3, -0.3, 24, 5, 8.6], 'inOutQuint'], [T.wide - 6 * F, [X.tv, 1.3, -0.3, 25, 8, 8.3], 'linear'],
        [T.wide, [1.45, 0.95, 0.1, 29, 1, 9.9], 'inOutQuint'], [T.play, [1.45, 0.95, 0.1, 30, 3, 9.6], 'linear'], [T.play + 0.02, [-0.45, 0.8, 0.1, 33, 0, 13], 'linear'], [T.quiz + 1, [-0.45, 0.8, 0.1, 33, 0, 13]]]);

      W.label(TEXT.old, -1, T.cut2 - 6 * F, [-0.5, 0.64, 0.5], [0.5, 0.66, 0.2], { tilt: 0.03, look: 0.5 });
      W.label(TEXT.smash, T.smash + F, T.cut2 - 6 * F, null, [0.46, -0.62, -0.5], { tilt: -0.05, look: 1.9 });
      W.label(TEXT.single, T.land45, T.cut3 - 6 * F, [-0.44, 0.6, 0.4], [0.3, -0.68, -0.6], { tilt: -0.04, badge: PAL.mustard.lit });
      W.label(TEXT.radio, T.radioLand + F, T.cut4 - 6 * F, [-0.36, 0.62, 0.4], [0.42, -0.68, -0.5], { tilt: 0.04, height: 0.5 });
      W.label(TEXT.tv, T.tvLand + F, T.wide - 7 * F, [-0.52, 0.66, 0.4], [-0.46, -0.7, -0.6], { tilt: 0.03, height: 0.5 });
      W.label(TEXT.end, T.endCap, T.play + 0.005, null, [-0.42, 0.62, -0.6], { tilt: -0.02, cap: 0.5, look: T.play - 0.2 });

      const bounce = K.track([[T.drop45, 3.4], [T.land45, 0, 'in'], [T.land45 + 3 * F, 0.62, 'out'], [T.land45 + 6 * F, 0, 'in'], [T.land45 + 8 * F, 0.2, 'out'], [T.land45 + 10 * F, 0, 'in']]);
      const radioPos = (q) => { const u = K.seg(q, T.radioIn, T.radioLand); return [X.radio + 5.2 * (1 - u), 2.2 * Math.sin(Math.PI * Math.min(1, u * 0.98)) * (1 - u) * 2.2, 0.2]; };
      const tvPos = (q) => [X.tv, 5.5 * (1 - K.seg(q, T.tvIn, T.tvLand, K.ease.in)), -0.4];

      return {
        targets: { old: shardG, single: [singleRig.outer, ...coins], radio: radioRig.outer, tv: tvRig.outer },
        update(t) {
          const [q, n] = W.onTwos(t), quiz = t >= T.play + 0.01;
          W.shoot(t);

          // the 78 rocks, tips and breaks
          const fall = K.seg(q, T.tip, T.smash, K.ease.in), broken = q >= T.smash - 1e-3;
          oldPivot.visible = !broken; oldPivot.rotation.x = -Math.PI / 2 * fall; oldPivot.rotation.z = q < T.tip ? 0.07 * [0, 1, 0, -1][Math.floor(n / 2) % 4] : 0;
          const fly = K.seg(q, T.smash - F, T.smash + 4 * F, K.ease.out);
          shards.forEach((s) => { const d = s.userData, k = 1 + 0.55 * d.far * fly; s.visible = broken; s.position.set(d.home[0] * k, 0.012 + 0.35 * d.far * Math.sin(Math.PI * fly), -d.home[1] * k); s.rotation.z = d.spin * fly * 0.9; });
          const cx = q - T.smash; crack.visible = cx >= 0 && cx < 2 * F - 1e-3; crack.position.set(X.old, 0.25, 0.1); crack.scale.setScalar(cx < F - 1e-3 ? 0.85 : 1.15);

          // the 45 bounces, the coins hop in
          const y45 = bounce(q), y0 = bounce(q - F); singleRig.set([X.single, y45, 0.6], [X.single, y0, 0.6], 0.5); singleRig.outer.visible = q >= T.drop45;
          single.rotation.z = 0.2 * wobble(q - T.land45, 3, 6); single.rotation.x = 0.12 * wobble(q - T.land45 - 6 * F, 3, 7);
          coins.forEach((c, i) => { const x = q - (T.coins + i * 3 * F); c.visible = x >= 0; c.scale.setScalar(Math.max(pop(x, 0.2), 1e-3)); });
          const ck = (q - T.coins) / (3 * F), ci = Math.floor(ck + 1e-3); coinTick.visible = ck >= 0 && ci < 3 && (ck - ci) * 3 < 1 - 1e-3; coinTick.position.set(X.coins, 0.12 + 0.046 * ci, 1.0);

          // the radio hops in and plays
          const rp = radioPos(q), rl = q - T.radioLand; radioRig.set(rp, radioPos(q - F)); radioRig.outer.visible = q >= T.radioIn;
          W.squash(radio, 1 - 0.2 * wobble(rl + F * 0.5, 3.2, 8) + (rl > 0.5 ? 0.03 * (Math.floor(n / 2) % 2 ? 1 : -1) : 0));
          notes.forEach((m, i) => { const x = (((q - T.radioLand - 0.45 - i * 0.4) % 1.6) + 1.6) % 1.6, on = q > T.radioLand + 0.45 + i * 0.4 && x < 1.1 && !quiz; m.visible = on; if (!on) return;
            const k = Math.floor(x * 7.5) / 7.5; m.position.set(X.radio + 0.3 + (i % 2 ? 0.75 : 0.45) * k + 0.25, 1.2 + k * 0.85 + (i % 2) * 0.1, 0.5); m.scale.setScalar(pop(x, 0.2) * (1 - K.seg(x, 0.95, 1.1))); m.rotation.z = 0.2 * Math.sin(n + i); });

          // the television lands and counts the homes
          const tl = q - T.tvLand; tvRig.set(tvPos(q), tvPos(q - F), 0.5); tvRig.outer.visible = q >= T.tvIn; W.squash(tv, 1 - 0.14 * wobble(tl + F * 0.5, 3, 8));
          const idx = quiz ? -1 : q >= T.pct[2] ? 2 : q >= T.pct[1] ? 1 : q >= T.pct[0] ? 0 : -1;
          readings.forEach((g, i) => { g.visible = i === idx; if (i === idx) g.scale.setScalar(0.9 + 0.1 * pop(q - T.pct[i], 0.18)); });
          const tk = idx >= 0 ? q - T.pct[idx] : -1; tvTick.visible = tk >= 0 && tk < 2 * F - 1e-3; tvTick.position.set(X.tv - 0.25, 1.15, 0.6); tvTick.scale.setScalar(tk < F - 1e-3 ? 0.9 : 1.1);

          W.finish(quiz ? 200 : q);
        },
      };
    },

    sound(k) {
      // every time below is a frame the picture also changes on (see T)
      k.bed('room', 0, T.play, { gain: 0.7 });
      k.play('stamp', 0, { gain: 0.5 });
      k.withMinor(() => { for (let n = 2; n < 20; n += 4) k.play('tock', at(n), { gain: 0.35, f: 260 + (n % 8) * 12, pan: -0.3 }); });
      k.play('swish', T.tip, { gain: 0.6, dur: 0.25, pan: -0.3 });
      k.play('impact', T.smash, { gain: 0.9, f: 170, pan: -0.25 }); k.play('slap', T.smash, { gain: 0.9, pan: -0.25 });
      for (let i = 0; i < 7; i++) { k.noise(T.smash + i * 0.03, { dur: 0.06, filter: 'bandpass', f: 2400 + i * 520, q: 4, gain: 0.34, pan: -0.5 + i * 0.12 }); k.tone(T.smash + 0.02 + i * 0.03, { f: 1900 + (i * 577) % 1500, dur: 0.09, gain: 0.05, pan: -0.5 + i * 0.12 }); }
      k.play('slap', T.smash + F, { gain: 0.35, pan: 0.3 });
      k.play('whoosh', T.cut2 - 5 * F, { gain: 0.8, dur: 0.4 });
      k.play('tock', T.land45, { gain: 0.9, f: 480 }); k.play('pop', T.land45, { gain: 0.6, f: 380 }); k.play('stamp', T.land45, { gain: 0.8, pan: -0.3 });
      k.play('tock', T.land45 + 6 * F, { gain: 0.6, f: 520 }); k.play('tock', T.land45 + 10 * F, { gain: 0.3, f: 560 });
      for (let i = 0; i < 3; i++) { const t = T.coins + i * 3 * F; k.tone(t, { f: 2500 + i * 330, dur: 0.16, gain: 0.12, pan: 0.2 }); k.tone(t, { f: 3900 + i * 410, dur: 0.1, gain: 0.05, pan: 0.2 }); k.play('tick', t, { gain: 0.7, pan: 0.2 }); }
      k.play('whoosh', T.cut3 - 5 * F, { gain: 0.8, dur: 0.4, pan: 0.2 }); k.play('swish', T.radioIn, { gain: 0.8, dur: 0.22, pan: 0.5 });
      k.play('tock', T.radioLand, { gain: 0.9, f: 720 }); k.play('thud', T.radioLand, { gain: 0.4, f: 150 }); k.play('stamp', T.radioLand + F, { gain: 0.85, pan: -0.3 });
      k.play('click', T.radioLand + 5 * F, { gain: 0.8 });
      snd.riff(k, T.radioLand + 0.45, T.play - 0.25, 'radio', { pan: -0.1 });
      k.play('whoosh', T.cut4 - 5 * F, { gain: 0.8, dur: 0.4, pan: 0.3 }); k.play('thud', T.tvLand, { gain: 1, f: 100, pan: 0.2 }); k.play('tock', T.tvLand, { gain: 0.6, f: 240, pan: 0.2 }); k.play('stamp', T.tvLand + F, { gain: 0.8, pan: -0.3 });
      k.play('crtOn', T.pct[0], { gain: 0.8 }); k.play('blip', T.pct[0], { f: 'E5', dur: 0.1, gain: 1.4 }); k.play('blip', T.pct[1], { f: 'A5', dur: 0.1, gain: 1.4 }); k.play('ding', T.pct[2], { f: 'E6', gain: 0.8, pan: 0.2 });
      k.play('whoosh', T.wide - 6 * F, { gain: 0.6, dur: 0.4 }); k.play('slap', T.endCap, { gain: 0.5, pan: -0.3 }); k.play('paper', T.endCap, { gain: 0.6, dur: 0.15, pan: -0.3 });
      k.play('ding', T.play - 0.4, { f: 'C6', gain: 0.5 });
    },
  });
}
