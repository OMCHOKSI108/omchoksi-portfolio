// Simple smoke tests for public project API endpoints.
// Usage:
//   NODE (Node 18+) with global fetch
//   BASE_URL environment variable (default http://localhost:3000)
// Example (PowerShell):
//   $env:BASE_URL='http://localhost:3000'; node .\backend\tests\run_smoke_tests.js

const BASE = process.env.BASE_URL || 'http://localhost:3000';

function log(...args) { console.log('[smoke]', ...args); }

async function run() {
  log('Base URL:', BASE);

  try {
    // GET list
    const listRes = await fetch(`${BASE}/api/projects?page=1&limit=5&t=${Date.now()}`);
    if (!listRes.ok) throw new Error(`GET /api/projects failed (${listRes.status})`);
    const listJson = await listRes.json();
    if (!listJson?.success) throw new Error('GET /api/projects returned non-success');
    log('GET /api/projects ok, total=', listJson.data?.total ?? 'unknown');

    const items = listJson.data?.items || [];
    if (items.length > 0) {
      const id = items[0]._id;
      const getRes = await fetch(`${BASE}/api/projects/${id}?t=${Date.now()}`);
      if (!getRes.ok) throw new Error(`GET /api/projects/${id} failed (${getRes.status})`);
      const getJson = await getRes.json();
      if (!getJson?.success) throw new Error(`GET /api/projects/${id} returned non-success`);
      log(`GET /api/projects/${id} ok, title=`, getJson.data?.title || '(no title)');
    } else {
      log('No public projects found — ensure some projects are active or seed the DB.');
    }

    log('Smoke tests passed');
    process.exit(0);
  } catch (err) {
    console.error('[smoke] Failure:', err.message || err);
    process.exit(2);
  }
}

run();
