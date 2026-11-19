// prop sheet: every prop on one table, for checking shapes
{
  const { PAL, at, inkWorld, props } = INKTOON;
  registerStyle({ id: 'sheet', name: 'prop sheet', duration: 2, fonts: ['260px "Anton"', '700 150px "Caveat"'],
    render: { samples: 16, preview: 2, shutter: 0, tone: 'linear', exposure: 1, bloom: 0, vignette: 0, grain: 0, fov: 26, background: PAL.teal.lit },
    build(S) {
      const W = inkWorld(S, { wide: 4, sunSize: 9 }), P = props(W), { scene } = S;
      const put = (o, x, z, ry = 0, s = 1) => { o.position.set(x, o.position.y, z); o.rotation.y += ry; o.scale.multiplyScalar(s); scene.add(o); return o; };
      put(P.record78(), -5.6, 1.6); put(P.record45(), -4.2, 1.9); put(P.coin(), -3.3, 2.2);
      P.shards78().forEach((s, i) => { s.rotation.x = -Math.PI / 2; s.position.set(-5.4 + s.userData.home[0] * 1.5, 0.01, -0.6 - s.userData.home[1] * 1.5); scene.add(s); });
      put(P.pocketRadio(), -3.6, 0.6, 0.3); put(P.tv(), -1.6, -1.2, 0.2); put(P.mic(), -2.2, 1.6, 0.2);
      put(P.guitar('tele'), 0.2, 0.6, 0, 0.8); put(P.guitar('strat', { body: W.M.persimmon }), 1.5, 0.6, 0, 0.8); put(P.guitar('arch', { body: W.M.cream }), 2.9, 0.6, 0, 0.8); put(P.guitar('archcut'), 4.3, 0.6, 0, 0.8);
      put(P.amp(), 0.6, -1.6, -0.2); put(P.sheets(), -0.8, 2.3, 0.2); put(P.player(), 2.6, 2.4, -0.2); put(P.jukebox(), 3.0, -1.8, -0.15);
      put(P.sock(1), 5.4, 1.8); put(P.sock(-1), 5.9, 1.9); put(P.piano(), 5.9, -1.6, -0.25); put(P.glasses(), 1.0, 2.6, 0.2); const pc = P.pencil(); pc.rotation.z = 1.2; put(pc, -2.0, 2.8);
      const n = P.note(); n.position.set(-4.6, 2.2, 0); scene.add(n); const b = P.bolt(); b.position.set(-4.0, 2.2, 0); scene.add(b); const n2 = P.note(undefined, 1, true); n2.position.set(-3.3, 2.2, 0); scene.add(n2);
      const v = (new URLSearchParams(location.search).get('cam') || '0,1.0,0.3,30,0,22').split(',').map(Number);
      W.setCamera([[0, v]]);
      return { update(t) { W.shoot(t); W.finish(t); } };
    } });
}
