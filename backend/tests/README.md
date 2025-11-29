# Smoke Tests README

This folder contains a simple smoke test runner for the projects API.

Requirements
- Node 18+ (global fetch) or install `node-fetch` and adjust the script.

Run (PowerShell):

  $env:BASE_URL='http://localhost:3000'; node .\backend\tests\run_smoke_tests.js

Run (CMD):

  set BASE_URL=http://localhost:3000 && node backend\tests\run_smoke_tests.js

The script performs basic GET calls to `/api/projects` and `/api/projects/:id` and exits non-zero on failure.
