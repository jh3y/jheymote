# Project Terrace

A Markdown-first slide deck solution built with Astro, Supabase, and View Transitions.

### Setting up Supabase
1. `./node_modules/.bin/supabase init`
2. `./node_modules/.bin/supabase start`
3. Grab the `anon key` and `API URL` from the `start` function and use them in `.env`

### Pushing to Live
1. Run migrations
2. Make sure you create an authenticated user
3. Make sure you enable Realtime on the table

### Installing GSAP
1. Grab the `gsap-bonus.tgz` file from your club files.
2. Drop it into the root of the repo.
3. `yarn add ./gsap-bonus.tgz`