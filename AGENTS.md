## Portfolio presentation
- Hero columns use zero-minimum grid tracks and a bounded orbit; section entrances trigger once when scrolled into view and respect reduced motion, so small screens cannot clip content or miss animations.
- Keep all public content on one scrolling page, with legacy section URLs redirecting to retained anchors, so existing links keep working.
- Group biography with skills and career with education; preserve every data item through sliders or expandable timelines.
- Keep API actions, dashboard, tracking integrations and data models unchanged when redesigning presentation.
- Render the full profile biography only in About; the intro uses the existing name, role and counts to avoid repetition.
- Use #page-scroll as the only public-page scroll root, with accessible seek and back-to-top controls; fixed navigation must leave its native scrollbar unobstructed.
- Floating social actions use existing profile destinations and social-click tracking, expanding above the existing chat assistant; the assistant broadcasts its open state so floating controls cannot overlap its panel.
- Render skills as compact category rows with stable icon tiles and contact as unframed details beside a labelled form, preserving the existing data and form actions.

- Reduced-motion hooks use a server-safe external-store snapshot so accessibility preferences do not change initial server markup.
