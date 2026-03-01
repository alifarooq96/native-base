# Production setup checklist

Use this after deploying to **Production** (e.g. `https://native-base-pink.vercel.app`) with the prod DB and env vars. Perform these steps in order.

---

## 1. Vercel environment variables

In **Vercel** → your project → **Settings** → **Environment Variables**, add (or confirm) for **Production**:

- `DATABASE_URL` — prod Neon pooled URL  
- `DIRECT_URL` — prod Neon unpooled URL  
- `JWT_SECRET` — your prod secret  
- `APP_BASE_URL` — `https://native-base-pink.vercel.app`  
- `NEXT_PUBLIC_SITE_URL` — `https://native-base-pink.vercel.app` (for metadata/OG)  
- `GOOGLE_CLIENT_ID`  
- `GOOGLE_CLIENT_SECRET`  
- `GOOGLE_REDIRECT_URI` — **must be prod callback** (see step 2 first)  
- `GOOGLE_CALENDAR_ID` — `primary` (or your calendar ID)  
- `STRIPE_SECRET_KEY` — live key  
- `STRIPE_WEBHOOK_SECRET` — from Stripe **after** adding webhook (step 4)  
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — live key  
- `STRIPE_STARTER_PRICE_ID` — live price ID  
- `STRIPE_PRO_PRICE_ID` — live price ID  
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token (can reuse or create prod store)  
- `NEXT_PUBLIC_MIXPANEL_TOKEN` — if you use a separate prod project  
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — optional; GA4 Measurement ID (e.g. `G-XXXXXXXXXX`). Omit to disable Google Analytics.

Redeploy after changing env vars so they are applied.

---

## 2. Google Cloud Console — OAuth redirect URIs

You use **two** OAuth flows; both need the **production** callback URLs added.

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → your project → **APIs & Services** → **Credentials**.
2. Open the **OAuth 2.0 Client ID** you use for this app (Web application type).
3. Under **Authorized redirect URIs**, add:
   - **Sign-in / Sign-up:**  
     `https://native-base-pink.vercel.app/api/auth/google-signup/callback`
   - **Google Calendar:**  
     `https://native-base-pink.vercel.app/api/auth/google/callback`
4. Under **Authorized JavaScript origins** (if required), add:
   - `https://native-base-pink.vercel.app`
5. Save.

No new client needed; same client, extra URIs for prod.

---

## 3. Google Calendar API

1. In the same Google Cloud project, go to **APIs & Services** → **Library**.
2. Search for **Google Calendar API** and ensure it’s **Enabled**.
3. In **Credentials**, confirm the OAuth client from step 2 has Calendar scopes when users sign in (your app already requests `https://www.googleapis.com/auth/calendar` for the calendar flow).

No extra API keys needed if you only use OAuth.

---

## 4. Linking Google Calendar to the app (after first deploy)

Calendar is linked **per environment** via OAuth; prod has its own token.

1. Deploy the app with prod env vars (including `GOOGLE_REDIRECT_URI` = `https://native-base-pink.vercel.app/api/auth/google/callback`).
2. Open in the browser:  
   **`https://native-base-pink.vercel.app/api/auth/google`**
3. Sign in with the **Google account that owns the calendar** you want to use (e.g. the one with `GOOGLE_CALENDAR_ID=primary`).
4. Approve the Calendar scope. You’ll be redirected back to `/`; the app stores the refresh token in the **prod** DB (`AdminToken` for `google_calendar`).
5. (Optional) Trigger a one-off sync: call or visit whatever triggers `/api/gcal/sync` (e.g. from your admin or a one-off request).  
   Google Calendar push notifications (webhook) will use `APP_BASE_URL/api/gcal/webhook` automatically once the channel is registered.

---

## 5. Stripe — production

1. In [Stripe Dashboard](https://dashboard.stripe.com/), switch to **Live** (top toggle).
2. **Products & Prices:** Ensure you have live **Products** and **Prices** for Starter and Pro. Copy the **Price IDs** and set `STRIPE_STARTER_PRICE_ID` and `STRIPE_PRO_PRICE_ID` in Vercel.
3. **Developers** → **API keys:** Copy **Secret key** and **Publishable key**; set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in Vercel.
4. **Developers** → **Webhooks** → **Add endpoint**:
   - **Endpoint URL:** `https://native-base-pink.vercel.app/api/stripe/webhook`
   - **Events to send:**  
     - `checkout.session.completed`  
     - `customer.subscription.updated`  
     - `customer.subscription.deleted`
   - Create the endpoint, then copy the **Signing secret** and set `STRIPE_WEBHOOK_SECRET` in Vercel.
5. Redeploy so the webhook secret is in use.

---

## 6. Database (Neon prod)

- You already have prod **DATABASE_URL** and **DIRECT_URL** in `.env.production` / Vercel.
- Run migrations against prod once (from your machine or CI):

  ```bash
  DATABASE_URL="<prod-pooled-url>" DIRECT_URL="<prod-unpooled-url>" npx prisma migrate deploy
  ```

  Or use a script that loads from `.env.production` if you prefer.

- Optional: seed prod DB if you have a seed script; otherwise create an admin user and link Google Calendar as in step 4.

---

## 7. Vercel Blob (optional)

- If you use a single Blob store for dev and prod, reuse `BLOB_READ_WRITE_TOKEN`.
- If you want a separate prod store: Vercel → **Storage** → create a new Blob store for production, then set `BLOB_READ_WRITE_TOKEN` to that store’s token in Production env vars.

---

## 8. Quick verification

- **Auth:** Sign up / log in with Google on prod (`/signup`, `/login`) and confirm redirect back to the app.
- **Calendar:** Open `https://native-base-pink.vercel.app/api/auth/google`, complete OAuth, then book a test call and check that the event appears in Google Calendar and sync works.
- **Stripe:** Run a test subscription in Live mode (or use a live test card if you use one); confirm webhook is received in Stripe Dashboard and subscription status updates in your app.
- **OG / share:** Share `https://native-base-pink.vercel.app` on LinkedIn/Twitter and confirm the OG image and title/description.

---

## Summary table

| What | Where | Action |
|------|--------|--------|
| OAuth redirect URIs | Google Cloud Console → Credentials | Add prod callbacks for signup + calendar |
| Calendar API | Google Cloud Console → Library | Ensure Calendar API enabled |
| Link calendar to prod | Browser | Visit `/api/auth/google` on prod once |
| Stripe keys & prices | Stripe Dashboard (Live) | Set live keys and price IDs in Vercel |
| Stripe webhook | Stripe Dashboard → Webhooks | Add prod URL, get signing secret, set in Vercel |
| DB | Neon + Vercel | Set prod URLs in Vercel; run `prisma migrate deploy` |
| Site URL / base URL | Vercel env | `APP_BASE_URL` and `NEXT_PUBLIC_SITE_URL` = prod URL |
