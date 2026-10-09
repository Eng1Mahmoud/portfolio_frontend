## Portfolio presentation
- Hero columns use zero-minimum grid tracks with a larger bounded visual track and an orbit that shrinks to its available width; section entrances respect reduced motion, so larger skills stay clear of text at every viewport.
- Keep all public content on one scrolling page, with legacy section URLs redirecting to retained anchors, so existing links keep working.
- Group career with education; preserve every data item through sliders or expandable timelines.
- The full profile biography renders in the hero and there is no separate About section; the details that used to sit in a spec sheet stay as one compact line beside the figures, so nothing is lost while the page opens with the person.
- Keep API actions, dashboard, tracking integrations and data models unchanged when redesigning presentation.
- Use #page-scroll as the only public-page scroll root, with accessible seek and back-to-top controls; fixed navigation must leave its native scrollbar unobstructed.
- Floating social actions use existing profile destinations and social-click tracking, expanding above the existing chat assistant; the assistant broadcasts its open state so floating controls cannot overlap its panel.
- Render skills as compact category rows with stable icon tiles and contact as unframed details beside a labelled form, preserving the existing data and form actions.

- Reduced-motion hooks use a server-safe external-store snapshot so accessibility preferences do not change initial server markup.
- The hero portrait uses existing profile data, falling back to the verified existing portrait when image fields are empty, as a stable overlay shared by animated and static skill rings so the person stays visible without rotating or depending on WebGL.
- Fixed navigation spans the viewport with symmetric horizontal spacing; mobile menus use a scrollable viewport-height dialog with bounded text tracks, focus containment and scroll locking, so the bar stays centered and destinations remain reachable.
- Contact submission uses its existing EmailJS action with shared client/server validation and persistent inline feedback; clear values only after the provider accepts delivery so failed attempts retain visitor input.
