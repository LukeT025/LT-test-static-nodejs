<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dice Roller API - Test</title>
<style>
  body{font:16px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin:2rem; line-height:1.5}
  button{padding:.55rem .9rem; margin:.25rem .4rem 1rem 0; cursor:pointer}
  input{width:6rem; padding:.3rem .4rem}
  pre{background:#f7f7f7; padding:.75rem; border:1px solid #ddd; overflow:auto; max-width:900px}
  .row{margin:.4rem 0}
</style>

<h1>Dice Roller API — Test Page</h1>
<p>This page only <strong>tests</strong> the REST endpoints. It is <em>not</em> the dice roller UI.</p>

<section>
  <h2>Endpoints</h2>
  <ul>
    <li><code>GET /api/wakeup</code></li>
    <li><code>GET /api/roll?sides=6</code></li>
    <li><code>GET /api/rolls?dice=5&amp;sides=6</code></li>
    <li><code>GET /api/blocked</code> (no CORS — cross-origin should fail)</li>
  </ul>
</section>

<section>
  <h2>Try them</h2>
  <div class="row">
    <button id="wakeupBtn">/api/wakeup</button>
    <button id="oneRollBtn">/api/roll?sides=6</button>
  </div>
  <div class="row">
    <label>dice <input id="dice" type="number" value="5" min="1" step="1"></label>
    <label style="margin-left:.5rem">sides <input id="sides" type="number" value="6" min="2" step="1"></label>
    <button id="rollsBtn">/api/rolls</button>
  </div>
  <div class="row">
    <button id="blockedBtn">/api/blocked (no CORS)</button>
  </div>
  <pre id="out"></pre>
</section>

<script>
const out = document.getElementById('out');
const log = (x)=> out.textContent = typeof x === 'string' ? x : JSON.stringify(x, null, 2);
const j = (p)=> fetch(p).then(r=>r.json());

document.getElementById('wakeupBtn').onclick = ()=> j('/api/wakeup').then(log).catch(e=>log(String(e)));
document.getElementById('oneRollBtn').onclick = ()=> j('/api/roll?sides=6').then(log).catch(e=>log(String(e)));
document.getElementById('rollsBtn').onclick = ()=>{
  const d = document.getElementById('dice').value;
  const s = document.getElementById('sides').value;
  j('/api/rolls?dice='+d+'&sides='+s).then(log).catch(e=>log(String(e)));
};
document.getElementById('blockedBtn').onclick = ()=> fetch('/api/blocked').then(r=>r.text()).then(log).catch(e=>log(String(e)));
</script>
