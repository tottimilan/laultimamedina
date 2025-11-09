# Blueprint — Clon funcional de Yaqeen (Headless) para **La Última Medina**

> **Uso**: pega este archivo en **Cursor** como `BLUEPRINT.md`. Define las reglas, alcance, arquitectura, flujos y criterios de aceptación. **No contiene código**; es la guía de implementación para el equipo.

---

## 0) Objetivo

Construir un clon **funcional** de yaqeeninstitute.org con la identidad de **La Última Medina**, usando **stack Vibecoding** y **CMS headless**. Enfoque fuerte en **SEO**, **i18n desde el día 1** (ES/EN/AR), accesibilidad y rendimiento. Tráfico objetivo: bajo. Editor: 1 persona.

**Pilares funcionales**: Read (artículos), Watch (vídeos), Listen (podcasts), Learn (módulos), Donate (donaciones), About, Careers/Volunteer, Contact, Policies.

---

## 1) Alcance (MVP + nice-to-have)

- **MVP**
  - Home, hubs: **/read**, **/watch**, **/listen**, **/learn**.
  - Landings Learn: Conversations, Conviction Circles, Curriculum (Units/Lessons), Talk Toolkits, WISAY/Q&A.
  - Detalle por tipo (artículo, vídeo, podcast, módulo Learn).
  - About (Mission, Scholarly Rigor), Fundraising Philosophy, Annual Reports, Privacy, Contact.
  - Careers & Volunteer (listado + detalle job).
  - Donate (one‑time) + Sustain (mensual) con **Stripe**.
  - i18n ES/EN (rutas y contenido) + SEO técnico (sitemaps, hreflang, schema, OG).
  - Admin con flujo Autor → Editor → Publish, redirecciones y campos SEO.
- **Nice‑to‑have**
  - Buscador facetado (Meilisearch/Algolia) — *posponer si coste/tiempo*.
  - OG dinámico, GTM Server‑Side, portal de autores.

**No metas** (fase 1): tienda/merch, apps nativas, autenticación de usuarios finales.

---

## 2) Arquitectura y stack

- **Frontend**: Next.js (App Router), React 18, TypeScript, **Tailwind CSS** (utilidad/typography), **styled-components** (temas/brand tokens), Framer Motion (micro‑interacciones), PWA (offline básico), Next/Image.
- **CMS Headless**: **Strapi** (recomendado) autoalojado.
  - DB: PostgreSQL (Railway/Neon). Media: Cloudflare R2 (o S3 compatible).
  - Webhooks de publicación para revalidar ISR.
- **Hosting**: Vercel (FE) + Railway (Strapi + DB). CDN: Vercel/Cloudflare.
- **Pagos**: Stripe Checkout (one‑time) + Stripe Billing (recurring).
- **Analítica/Tags**: GA4 + Google Tag Manager + Google Ads conv. Consent Manager (GDPR/TTDSG).
- **Observabilidad**: Vercel Analytics; Sentry opcional.

**Criterios de la elección**: coste bajo, simplicidad operativa, i18n nativo en CMS, escalable a 2º idioma sin refactor.

---

## 3) Environments y DevOps

- Entornos: **local → preview (PR) → staging → producción**.
- Deploy FE: Vercel con **preview por PR**. Deploy CMS: Railway.
- Backups: snapshots automáticos de DB; versionado en bucket R2.
- CI: lint, type‑check, unit tests; **Playwright** E2E en staging (smoke: navegación hubs, filtros, detalle, donate, i18n, sitemap/robots).
- Gestión de secretos: Vercel/ Railway variables; `.env` no se comitea.

---

## 4) i18n (desde el día 1)

- **Rutas**: `/{locale}/...` con `defaultLocale=es`, locales: `es`, `en` (extensible).
- **Traducción de contenido** en CMS (Strapi i18n): cada entry admite variantes por idioma.
- **Slugs por idioma**: campos independientes. Debe existir **Redirect 301** si un slug cambia.
- **UI strings**: ficheros de mensajes por idioma (ej.: `messages/es.json`, `messages/en.json`).
- **SEO**: `hreflang` en todas las páginas, canonical por idioma, sitemaps por tipo/idioma.
- **Fallback**: si falta la traducción de un campo, usar `defaultLocale` (marcar visualmente en admin para completar).

**Criterios de aceptación i18n**:

- Todo el flujo de navegación es bilingüe.
- Slugs correctos por idioma y sin colisiones.
- Metas/OG traducibles.
- Sitemaps por idioma generados y probados en Search Console.

---

## 5) SEO técnico (checklist obligatorio)

- **Sitemaps**: raíz + por tipo/idioma (articles‑es/en, videos‑es/en, podcasts‑es/en, learn‑es/en…).
- **`hreflang`** correcto en cada página indexable.
- **Schema.org**: Organization (global), WebSite + SearchAction, BreadcrumbList (detalle), Article/BlogPosting/ScholarlyArticle, VideoObject, PodcastEpisode.
- **Metas**: title/desc editables por CMS; OG/Twitter por defecto y override por entry.
- **Canonical**: por idioma. No indexar páginas duplicadas o listados vacíos.
- **Velocidad**: ISR + revalidate on publish; `preconnect` (Stripe/Fonts), Priority Hints, imágenes optimizadas.
- **Robots**: `robots.txt` y `x‑robots‑tag` por entorno; `noindex` en preview/staging.

**Definición de hecho SEO**: Lighthouse SEO ≥ 95 en Home/Detalle; cobertura sin errores en Search Console; sitemaps válidos.

---

## 6) Accesibilidad (A11y)

- WCAG 2.1 AA mínimo: contraste, focus visible, semántica correcta, navegación por teclado.
- Media: **transcripciones** para vídeo/podcast; alt text obligatorio; labels en formularios.
- Tests con AXE; Lighthouse A11y ≥ 95.

---

## 7) Rendimiento

- Objetivos: **LCP < 2.5s**, CLS < 0.1, TBT bajo en detalle.
- Estrategias: ISR con revalidación; `next/image`; fuentes con `display=swap` y size‑adjust; split por rutas; lazy en componentes pesados; evitar hydration extra en listados.

---

## 8) Seguridad

- **CSP** estricta (img‑src CDN/Stripe/YouTube; frame‑src Stripe/YT/Vimeo; script‑src self + GTM).
- HSTS, X‑Content‑Type‑Options, Permissions‑Policy.
- Anti‑spam en Contact (hCaptcha opc.).
- Rate‑limit en webhooks y endpoints públicos.

---

## 9) Modelado de contenido (Strapi)

> Sin código, sólo contrato de datos. Todos los modelos **con i18n** salvo indicación.

- **Topic**: name, slug, description, parent?, color?, icon?.
- **Series**: title, slug, description, cover, order, scope (read|watch|listen|learn).
- **People**: name, role, photo, short_bio, long_bio, socials[], flags (author/team/board).
- **Article**: title, slug, excerpt, body (rich), cover, type (paper|ebook|blog|report|translation|printable), topics[], series?, authors[], reading_time, pdf?, assets[], published_at, seo{}.
- **Video**: title, slug, synopsis, provider (youtube|vimeo|other), video_id/embed, transcript, date, thumbnail, topics[], series?, seo{}.
- **PodcastSeries**: title, slug, description, cover, rss?.
- **PodcastEpisode**: series (rel), title, slug, synopsis, audio_url/embed, transcript, date, topics[], seo{}.
- **LearnModule** (union): kind (conversations|conviction_circles|curriculum_unit|curriculum_lesson|talk_toolkit|wisay_qa), title, slug, summary, goals[], resources[], audience, steps, faq[], topics[], series?, seo{};
  - *unit*: grade?, duration, unit_number, lessons[]
  - *lesson*: lesson_number, materials, assessment, standards?
  - *wisay_qa*: question, answer, related[]
- **Job**: title, slug, department, location, type, description, requirements, apply_url/form, status, seo{}.
- **Document**: title, slug, year, file|external_url, seo{}.
- **Page**: title, slug, blocks[], seo{}.
- **Redirect**: from, to, status (301/302), locale_scope?.
- **Menu**: location (header|footer|learn), items[] { label, url|rel, locale_scope? }.

**Reglas**:

- Slugs únicos por idioma. Redirecciones obligatorias al cambiar slug.
- Campos SEO obligatorios en detalle.
- Validaciones: mínimo 1 topic en Article/Video/PodcastEpisode.

---

## 10) UX y componentes (sin código)

- **Header** con menús: Read / Watch / Listen / Learn / Donate.
- **Footer**: institucional (About, Annual Reports, Policies), apps, redes.
- **Home**: Hero + CTA; bloques destacados por pilar; CTA Donate/Newsletter.
- **Hubs**: grid, filtros facetados (type/topic/series), sort (latest/popular), paginación. Mantener estado en URL (SEO friendly: SSR del estado inicial).
- **Detalle**: cabecera con autor/fecha/serie, share; lectura estimada; relacionados por taxonomía; transcripción/descargas.
- **Learn**: landings por subproducto; módulos con objetivos/pasos/descargas; FAQ.
- **Donate**: montos + periodicidad; Stripe Checkout; políticas/FAQ visibles.
- **Careers**: listado + ficha (apply CTA). **Contact**: form con validación.

**Criterios de aceptación UI**: consistencia de spacing/typography; responsive 320→1440; estados de carga skeleton; vacíos con mensajes i18n.

---

## 11) Donaciones (Stripe) — reglas

- **One‑time** en `/donate`; **monthly** en `/sustain`.
- Páginas `/success` y `/cancel` localizadas.
- Webhook: persistir `customer`, `payment_intent|subscription`, estado (active|canceled), enviar email de agradecimiento.
- Etiqueta interna “Sustainer” para donantes mensuales.
- Tracking: `purchase` (Ads) y `donate_started`.

---

## 12) Analítica, tags y consentimiento

- **GTM** como única etiqueta directa; GA4 y Ads dentro de GTM.
- Consent Manager: bloquear GTM hasta consentimiento; guardar estado por idioma.
- Eventos mínimos: view_content (detalle), search (si aplica), filter_applied, donate_started, purchase.

---

## 13) Brand / Diseño

- **Fuente**: Google Fonts según identidad de **La Última Medina**.
- **Tokens**: paleta, tipografías, radios, sombras, espaciados; exportar como variables (aplicado vía styled‑components y Tailwind config).
- OG templates con branding.

**Criterios de aceptación brand**: contraste AA, coherencia visual entre ES/EN, favicon/manifest con branding.

---

## 14) Roadmap y entregables

- W1: Kickoff, arquitectura, definición modelos, tokens de marca, árboles de rutas.
- W2‑W3: Configuración Strapi + i18n + relaciones; layouts base; Home/Read/Watch/Listen/Learn (listados).
- W4‑W5: Páginas detalle + Learn; About/Policies; Annual Reports.
- W6: Donate + Careers/Volunteer + Contact; Consent + GTM/GA4/Ads.
- W7: SEO avanzado (sitemaps/hreflang/schema), PWA, accesibilidad.
- W8: QA, performance, formación de editor, checklist de lanzamiento.

**Entregables**: repos (FE/CMS), despliegues (staging/prod), guía de editor, sitemaps, matriz de redirects, checklist A11y/SEO, manual de marca aplicado.

---

## 15) Criterios de aceptación (DoD)

- Navegación completa ES/EN con slugs correctos y `hreflang` en todas las páginas indexables.
- Hubs con filtros persistentes en URL y SSR del estado inicial.
- Detalle con schema correcto por tipo y OG específicos.
- Donate (one‑time + monthly) operativo con Stripe y webhook registrando donantes.
- Sitemaps por tipo/idioma publicados y validados.
- Lighthouse: **Performance ≥ 90**, **SEO ≥ 95**, **A11y ≥ 95** en Home y una página de detalle por tipo.
- Consent Manager operativo; GTM cargado tras consentimiento.

---

## 16) Coste operativo esperado (referencia)

- Vercel (FE): 0 € (Hobby).
- Railway (Strapi+DB): ~5 US$/mes.
- R2 (media): 5–10 €/mes (volumen moderado).
- Stripe: comisión por transacción (sin fijo mensual).

---

## 17) Riesgos y mitigación

- **i18n incompleto** → checklist por release; fallback claro en FE; tablero de pendientes por idioma.
- **Cambios de slug** → gestor de redirects obligatorio; pruebas de enlaces rotos.
- **Rendimiento en hubs** → ISR + límites de página; precarga de filtros comunes.
- **Privacidad** → bloquear tags hasta consentimiento; política clara por idioma.

---

## 18) Tareas iniciales (orden de ejecución)

1) Crear repos FE/CMS; configurar entornos y secretos.
2) Implementar modelos en Strapi con i18n y relaciones.
3) Conectar webhooks de publish → revalidate FE.
4) Montar layouts (Home, hubs), luego detalle por tipo.
5) Integrar Stripe (donate/sustain) + páginas de retorno + webhooks.
6) Añadir pages institucionales, Careers/Volunteer, Contact.
7) Implementar i18n de UI y slugs; sitemap/hreflang/schema.
8) Consent + GTM/GA4/Ads; PWA.
9) QA (E2E + Lighthouse + AXE); formación de editor.

---

## 19) Naming y convenciones (sin código)

- Rutas en minúsculas, guiones, slugs por idioma.
- Topics/Series con nombre singular; enums en minúsculas.
- SEO: title máx. ~60 chars; desc ~155; OG image por defecto por sección.

---

## 20) Checklist de lanzamiento

- [ ] DNS a Vercel y subdominio `cms.` a Railway.
- [ ] Variables de entorno seguras.
- [ ] Políticas (Privacy/Donor Privacy) publicadas y enlazadas en footer.
- [ ] Sitemaps enviados en Search Console ES/EN.
- [ ] Stripe en modo live, claves rotadas, webhooks verificados.
- [ ] Consent probado en EU; GTM dispara tras aceptación.
- [ ] Backups y alertas activas.
