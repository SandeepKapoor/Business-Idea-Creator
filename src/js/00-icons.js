/* ---------- icon() ----------
   One helper, so every icon on the page comes out of the same sprite at the same stroke weight.
   Before this the page used ▶ ▼ ◀ ⓘ ★ ✓ ✕ ⚡ ⟳ ▸ — eleven fonts' idea of an icon, each with its
   own optical weight and baseline, none of them matching Inter. craft-floor refuses that
   outright: icons are drawn, in one consistent stroke.

   Returns markup, not a node, because almost every caller is building an innerHTML string.
   aria-hidden throughout: every icon here sits beside a real text label or inside a control that
   already carries an aria-label, so announcing it again would only add noise.

   size: '' 16px · 'sm' 13px · 'xs' 11px
   spin: 'up' | 'down' rotate the chevron rather than adding two more near-identical symbols. */
function icon(name, mod) {
  return `<svg class="i${mod ? ' i-' + mod.split(' ').join(' i-') : ''}" ` +
    `aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
}
