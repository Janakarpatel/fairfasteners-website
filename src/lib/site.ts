/**
 * When false (default), the public site shows the under-development banner
 * and unfinished routes redirect home. Set NEXT_PUBLIC_SITE_LIVE=true to unlock
 * the full site for local development or launch.
 */
export function isSiteLive(): boolean {
  return process.env.NEXT_PUBLIC_SITE_LIVE === 'true';
}
