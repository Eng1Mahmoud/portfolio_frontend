## Portfolio presentation
- Project screenshots sit in a fixed 16:10 window above the card details, as native focusable vertical scroll regions with intrinsic image proportions; never overlay text on them, scale or parallax them, so full-page captures never look stretched and scroll top to bottom.
- Hero columns use zero-minimum grid tracks with a larger bounded visual track and an orbit that shrinks to its available width; section entrances respect reduced motion, so larger skills stay clear of text at every viewport.
- Keep all public content on one scrolling page, with legacy section URLs redirecting to retained anchors, so existing links keep working.
- Section rhythm uses one shared padding scale that only tightens as the viewport shrinks, so the page reads as a continuous scroll and spacing stays compact rather than growing.
- One shared fixed backdrop — a faint grid, a soft light that settles on the section being read and a vignette — is painted below the scroll root and carries every section, so sections stay transparent and never add their own background layers; the light only moves with scroll and stays parked for reduced-motion visitors.


- Group career with education; preserve every data item through sliders or expandable timelines.
- The hero carries the person only: role, name, the full profile biography and the social links — no buttons, figures or spec-sheet detail rows — and the 3D skills visual is top-aligned with the text column, so the page opens with the description and the orbit reads from the same line.


- Keep API actions, dashboard, tracking integrations and data models unchanged when redesigning presentation.
- Use #page-scroll as the only public-page scroll root, with accessible seek and back-to-top controls; fixed navigation must leave its native scrollbar unobstructed.
- Floating social actions use existing profile destinations and social-click tracking, expanding above the existing chat assistant; the assistant broadcasts its open state so floating controls cannot overlap its panel.
- Render skills as compact category rows with stable icon tiles and contact as unframed details beside a labelled form, preserving the existing data and form actions.

- Reduced-motion hooks use a server-safe external-store snapshot so accessibility preferences do not change initial server markup.
- The hero portrait uses existing profile data, falling back to the verified existing portrait when image fields are empty, as a stable overlay shared by animated and static skill rings so the person stays visible without rotating or depending on WebGL.
- Fixed navigation spans the viewport with symmetric horizontal spacing; mobile menus use a scrollable viewport-height dialog with bounded text tracks, focus containment and scroll locking, so the bar stays centered and destinations remain reachable.
- Mobile navigation animates only opacity over an opaque surface, never a clipped backdrop-filter layer; hold scroll locking through exit and focus without scrolling to avoid mobile compositor flashes and page jumps.
- Contact submission uses its existing EmailJS action with shared client/server validation and persistent inline feedback; clear values only after the provider accepts delivery so failed attempts retain visitor input.
- Share a deterministic count-based floating layout between animated and static hero skills; independent drift uses screen-space separation and portrait/edge bounds, while a shared DOM overlay outside Canvas avoids per-skill React roots and keeps every dashboard item visible on every viewport.
- Keep global CSS limited to semantic theme/effect tokens, browser-wide base rules, keyframes and registered animation properties; put component styling and screen-width variants directly in JSX utilities so presentation remains local and readable.
- Hide animated skill badges until their first positioned frame and reveal each icon after image decoding; animate transforms rather than layout properties to prevent first-load stacking and image flashes.
