# Cédric VTC — Passe « Autre dimension » (Awwwards / Norme 42)

> Objectif : élever la maquette statique au niveau Awwwards. Palette conservée
> (noir #080808 · velin #f5f2ec · champagne #d6c08d). Contenu/copy conservés
> (honnêteté : pas de faux chiffres/numéros). Logique métier intouchée
> (form mailto, JSON-LD, SEO).

## Direction artistique
- **Concept** : « La nuit, conduite » — palace de nuit toulousain. Cinématique
  lente, noir profond, hairlines champagne, lumière rare.
- **Tension typo** : caps grotesk Geist (identité wordmark existante) ×
  **Cormorant Garamond italique** (mots-clés en serif, échelle display).
- **Signature motion** : rideau d'ouverture + reveals ligne par ligne +
  parallaxe photo + lignes qui se dessinent (carte trajets) + marquee scrubbed
  au scroll (jamais d'animation continue parasite).

## Phase 0 — Fondation  ✓
- [x] `@gsap/react` installé, SplitText dispo (gsap 3.15, plugins free)
- [x] Cormorant Garamond variable (roman + italique) self-hosted woff2 (77 Ko)
- [x] `src/lib/gsap.ts` — register central (ScrollTrigger, SplitText, useGSAP) + types window
- [x] `SmoothScroll` — Lenis sync ticker GSAP + `window.__lenis` + guard reduced-motion
- [x] `scroll-behavior: smooth` retiré (Lenis), Navbar → `lenis.scrollTo` (force si stopped)

## Phase 1 — Conducteur d'animations  ✓
- [x] `PageAnimations` — chef d'orchestre data-attributes unique :
      `data-split` / `data-reveal(-group/-item)` / `data-clip(="frame")` /
      `data-parallax` / `data-line(-scope)` / `data-count` / `data-marquee-track` /
      `data-mask-stagger` / `data-hero=…`. Tout sous
      `matchMedia("prefers-reduced-motion: no-preference")` → rien n'est caché
      ni animé en reduced. Splits après `document.fonts.ready`.
- [x] `Preloader` — rideau SSR (kicker mono + « *Cédric* VTC » serif + hairline
      champagne), event `vtc:intro` + flag `__vtcIntroDone` (anti-race), skip
      sessionStorage + reduced, failsafe CSS pur si JS mort, lift `expo.inOut`.

## Phase 2 — Sections  ✓
- [x] **Hero** : image scale 1.18→1.04 expo, wordmark 2 lignes masquées
      (`.u-mask`, padding anti-clip accents), topline/lead/actions staggerés,
      parallaxe média + fondu contenu au scroll, cue hairline champagne
- [x] **Navbar** : hide/show quickTo selon direction, scrim dégradé `is-scrolled`,
      menu = timeline GSAP (backdrop blur, panel expo.inOut, brand + liens 01-04
      staggerés, hairline champagne), `lenis.stop/start`, reduced → timeScale 99
- [x] **Marquee** destinations serif italique + points champagne, scrub scroll
- [x] **Booking** : split « Demande de *trajet* », steps staggerés, panel gradient
      + hairline champagne top, inputs caret/focus champagne + ring, submit magnétique
- [x] **Services** : crossfade média FM (`AnimatePresence` sync), texte/compteur
      mode wait, indicateur actif `layoutId`, `MotionConfig reducedMotion="user"`
- [x] **Tesla** : clip reveals + parallaxe 2 vitesses (+6 / −8), liste staggerée
- [x] **Trajets** : lignes carte `data-line` (rotation préservée), pins pop
      `back.out` + ping 2 pulses (pas de boucle infinie), count-up durées
      (reduced = valeurs finales directes), ticks `+` aux coins
- [x] **FAQ** : reveals groupés, marqueur `+`→`×`, bordure champagne hover/open,
      fade d'ouverture CSS
- [x] **Footer** : wordmark masqué staggeré au scroll, colonnes groupées
- [x] **Magnetic** (hero ×2, nav CTA, 2 CTA sections, submit) — pointer fine
      + no-reduced uniquement, elastic.out

## Phase 3 — Atmosphère & détails  ✓
- [x] Grain SVG statique opacité 5 % (sans mix-blend — perf), z-index 120
- [x] Serif italique sur mots-clés des 5 H2 (`em.serif`, text-transform none)
- [x] Scrollbar fine `scrollbar-color` champagne, curseur custom hover champagne
- [x] Respirations sections 120→140 px, panel padding 28
- [x] a11y : aria intouché, focus-visible conservé, reduced-motion complet
      (préloader display:none + kill-all existant + guards JS)

## Phase 4 — Vérification  ✓ (preuves)
- [x] `npm run lint` — 0 erreur
- [x] `npm run build` — compile 5,5 s, TS OK, 4 pages statiques
- [x] Harnais `qa-shots.mjs` sur build prod (`next start` :3002) :
      **desktop + mobile × normal + reduced = 0 erreur console, 0 px overflow**
- [x] Passes scroll : reveals/counts/lignes déclenchés (count capturé à 18-27
      en plein comptage ✓), reduced full-page = tout visible, valeurs finales
- [x] Sonde Playwright ciblée : préloader → hero posé (wordmark + lead serif)
      → menu ouvert (blur + stagger) → crossfade Soirée 04/05 → footer.
      Marquee unique à y=900 = pile sous le hero. 0 erreur console.
- [ ] Lighthouse mobile ≥ 95 — à mesurer sur https://vtc-sigma.vercel.app (PSI)
- [x] Déployé Vercel production (06/07, « go » founder) — merge avec la passe
      wizard id-a2 (wizard 5 étapes + autocomplete + popover mail + FAQ
      accordéon préservés sous la couche spectacle). Push `0e83bab`, live à
      t+20 s, QA harnais sur la prod : 0 erreur console, 0 overflow,
      desktop+mobile × normal+reduced.

## Revue de la passe
- Site statique → couche spectacle complète : préloader, intro hero chorégraphiée,
  reveals system-wide, parallaxes, carte animée, count-ups, marquee scrubbed,
  menu GSAP, boutons magnétiques, grain, curseur champagne.
- **Un seul langage de mouvement** (power4/expo, staggers 0.06-0.14) piloté par
  un conducteur central déclaratif — 0 JS d'anim par section (pattern Locomotive).
- Reduced-motion : première classe (matchMedia GSAP + MotionConfig FM + CSS).
  Rien de caché, rien qui bouge. Vérifié aux captures.
- Typo : pairing Norme 42 serif-display (Cormorant italique) × grotesk (Geist)
  × mono (labels), self-hosted.
- Aucune modif logique : form mailto, JSON-LD, metadata, constants intacts.

## Hypothèses (héritées — inchangées)
- Client : Cédric VTC, chauffeur privé Toulouse. Tesla noire uniquement.
- Contact réel non confirmé : réservation par formulaire/email, aucun faux numéro.
- URL locale : port 3002 (3000 occupé). Prod : vtc-sigma.vercel.app.

## Suivis hors passe
- [ ] Photos additionnelles (soirée/centre-ville) à shooter ou générer — pour
      dé-doublonner Services (3 photos pour 5 services : Matabiau et Soirée
      réutilisent la photo Capitole, Longue distance réutilise Blagnac)
- [ ] Les 2 photos extérieures montrent 2 modèles différents (Model S au
      Capitole, Model Y à Blagnac) — à trancher côté client
