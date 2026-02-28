import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!;

let initialized = false;

export function initMixpanel() {
  if (initialized || typeof window === 'undefined') return;
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
    autocapture: false,
    record_sessions_percent: 100,
  });
  initialized = true;
}

export { mixpanel };
