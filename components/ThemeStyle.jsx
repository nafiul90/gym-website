/**
 * Server component — injects per-gym CSS variable overrides into the page.
 * Placed inside <head> via next/head or directly in the layout/page tree.
 */
export default function ThemeStyle({ theme }) {
  if (!theme) return null;

  const {
    primaryColor   = "#DC2626",
    secondaryColor = "#1F1F1F",
    backgroundColor = "#0F0F0F",
    textColor      = "#FFFFFF",
    navbarBg       = "#0F0F0F",
  } = theme;

  const css = `
    :root {
      --gym-primary:    ${primaryColor};
      --gym-secondary:  ${secondaryColor};
      --gym-bg:         ${backgroundColor};
      --gym-text:       ${textColor};
      --gym-navbar-bg:  ${navbarBg};
    }

    /* ── Page background & base text ─────────────────────────────────────── */
    body {
      background-color: var(--gym-bg) !important;
      color: var(--gym-text) !important;
    }

    /* ── Section / card backgrounds ──────────────────────────────────────── */
    .bg-primary-dark-900 { background-color: var(--gym-bg)        !important; }
    .bg-primary-dark-800 { background-color: var(--gym-secondary) !important; }
    .bg-primary-dark-700 { background-color: var(--gym-secondary) !important; }

    /* hover — must be !important to outrank the base rule above */
    .hover\\:bg-primary-dark-800:hover { background-color: var(--gym-secondary) !important; }
    .hover\\:bg-primary-dark-900:hover { background-color: var(--gym-bg)        !important; }

    /* ── Borders ─────────────────────────────────────────────────────────── */
    .border-primary-dark-700 { border-color: var(--gym-secondary) !important; }

    /* ── Primary text ────────────────────────────────────────────────────── */
    .text-primary-bright-100 { color: var(--gym-text) !important; }

    /* ── Primary (accent) colour — replaces all red-500/600 usages ───────── */
    .bg-red-600  { background-color: var(--gym-primary) !important; }
    .bg-red-500  { background-color: var(--gym-primary) !important; }
    .text-red-600 { color: var(--gym-primary) !important; }
    .text-red-500 { color: var(--gym-primary) !important; }
    .border-red-600 { border-color: var(--gym-primary) !important; }

    /* ── CTA button hover — restore the white/dark invert ────────────────── */
    .hover\\:bg-white:hover      { background-color: #ffffff          !important; }
    .hover\\:text-primary-dark-900:hover { color: var(--gym-bg)       !important; }
    .hover\\:border-transparent:hover   { border-color: transparent   !important; }
  `.trim();

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
