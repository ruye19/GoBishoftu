# Deploying to Vercel

Your Next.js app lives in the **`Client`** folder, not at the repo root. For the build to succeed on Vercel you must set the **Root Directory** to `Client`.

## Steps

1. Open your [Vercel Dashboard](https://vercel.com/dashboard) and select this project.
2. Go to **Settings** → **General**.
3. Under **Build and development settings**, find **Root Directory**.
4. Click **Edit**, set it to **`Client`**, and save.
5. Trigger a new deployment (e.g. push a commit or use **Redeploy**).

After this, Vercel will run `npm install` and `npm run build` inside `Client`, and the deployment should succeed.

## Optional: lockfile

The `Client` folder has both `package-lock.json` and `pnpm-lock.yaml`. If you see install issues, remove the one you don’t use (e.g. delete `pnpm-lock.yaml` if you use npm) so Vercel uses a single package manager.
