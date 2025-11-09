# Checklist de Lanzamiento - La Última Medina

> Usar esta lista para verificar que todo está listo antes de lanzar a producción.

## 🔧 Configuración Técnica

### Frontend (Vercel)
- [ ] Proyecto conectado a Vercel
- [ ] Variables de entorno configuradas en Vercel
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `NEXT_PUBLIC_STRAPI_URL`
  - [ ] `STRAPI_API_TOKEN`
  - [ ] `STRAPI_WEBHOOK_SECRET`
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET`
  - [ ] `NEXT_PUBLIC_GTM_ID`
  - [ ] `NEXT_PUBLIC_GA4_ID`
  - [ ] `NODE_ENV=production`
- [ ] Build exitoso sin errores
- [ ] Preview deployment funcionando
- [ ] Custom domain configurado
- [ ] SSL/HTTPS habilitado

### CMS (Railway)
- [ ] Strapi desplegado en Railway
- [ ] PostgreSQL provisionado
- [ ] Variables de entorno configuradas
- [ ] API tokens generados
- [ ] Webhooks configurados
- [ ] Cloudflare R2 conectado
- [ ] Backups automáticos activados
- [ ] Custom domain `cms.laultimamedina.org` configurado

### Base de Datos
- [ ] Migraciones ejecutadas
- [ ] Datos de producción cargados
- [ ] Backups configurados (diarios)
- [ ] Retention policy establecido (30 días)

### Media Storage (Cloudflare R2)
- [ ] Bucket creado
- [ ] CORS configurado
- [ ] Public access configurado
- [ ] CDN URL configurada
- [ ] Versionado activado

## 📝 Contenido

### Modelos Strapi
- [ ] Todos los Content Types creados
- [ ] Relaciones configuradas
- [ ] Campos SEO en todos los tipos
- [ ] i18n activado para ES/EN
- [ ] Validaciones configuradas

### Contenido Mínimo Viable
- [ ] Al menos 10 artículos publicados (5 ES, 5 EN)
- [ ] Al menos 5 vídeos publicados
- [ ] Al menos 3 series de podcast con 2-3 episodios cada uno
- [ ] Al menos 2 módulos Learn por programa
- [ ] Topics principales creados
- [ ] Series principales creadas
- [ ] Team/Authors con biografías

### Páginas Institucionales
- [ ] About → Mission publicada
- [ ] About → Scholarly Rigor publicada
- [ ] About → Fundraising Philosophy publicada
- [ ] Annual Reports (al menos 1)
- [ ] Privacy Policy publicada (ES/EN)
- [ ] Donor Privacy Policy publicada (ES/EN)
- [ ] Contact page funcional

## 🔍 SEO

### Configuración Básica
- [ ] Google Search Console verificado (ES y EN)
- [ ] Bing Webmaster Tools verificado
- [ ] Sitemaps enviados a Search Console
- [ ] robots.txt verificado en producción
- [ ] Canonical URLs correctos
- [ ] hreflang tags correctos en todas las páginas

### Sitemaps
- [ ] Sitemap principal generado
- [ ] Sitemap de artículos ES
- [ ] Sitemap de artículos EN
- [ ] Sitemap de vídeos ES
- [ ] Sitemap de vídeos EN
- [ ] Sitemap de podcasts ES
- [ ] Sitemap de podcasts EN
- [ ] Sitemap de Learn ES
- [ ] Sitemap de Learn EN

### Schema.org
- [ ] Organization schema en todas las páginas
- [ ] WebSite schema con SearchAction
- [ ] BreadcrumbList en páginas de detalle
- [ ] Article schema en artículos
- [ ] VideoObject schema en vídeos
- [ ] PodcastEpisode schema en podcasts
- [ ] Validado con Rich Results Test

### Open Graph
- [ ] OG images por defecto por sección
- [ ] OG tags en todas las páginas
- [ ] Twitter Card tags configurados
- [ ] Preview correcto en Facebook Debugger
- [ ] Preview correcto en Twitter Card Validator

### Performance
- [ ] Lighthouse Performance ≥ 90 en Home
- [ ] Lighthouse Performance ≥ 85 en hubs
- [ ] Lighthouse Performance ≥ 85 en páginas de detalle
- [ ] LCP < 2.5s en Home
- [ ] CLS < 0.1 en todas las páginas
- [ ] TBT < 200ms en detalle

## ♿ Accesibilidad

### Tests
- [ ] Lighthouse Accessibility ≥ 95
- [ ] AXE scan sin errores críticos
- [ ] Navegación por teclado funcional
- [ ] Focus visible en todos los elementos interactivos
- [ ] Skip-to-content link funcional

### Contenido
- [ ] Alt text en todas las imágenes
- [ ] Transcripciones para vídeos principales
- [ ] Transcripciones para podcasts principales
- [ ] Labels en todos los formularios
- [ ] Contraste de colores ≥ AA en todas las páginas

## 💳 Stripe

### Configuración
- [ ] Cuenta Stripe en modo LIVE
- [ ] Claves de producción configuradas
- [ ] Webhooks en modo LIVE configurados
- [ ] Endpoint `/api/stripe/webhook` accesible públicamente
- [ ] Firma de webhooks verificada
- [ ] Test de donación one-time exitoso
- [ ] Test de suscripción mensual exitoso
- [ ] Emails de confirmación funcionando

### Legal
- [ ] Donor Privacy Policy clara y accesible
- [ ] Terms & Conditions para donaciones
- [ ] Información fiscal visible
- [ ] Información de deducibilidad clara

## 🍪 Privacidad y Consentimiento

### Consent Manager
- [ ] Cookie banner implementado
- [ ] Opciones de consentimiento claras
- [ ] GTM bloqueado hasta consentimiento
- [ ] Preferencias persistentes
- [ ] Funciona en ES y EN
- [ ] Cumple GDPR
- [ ] Cumple TTDSG (Alemania)

### Políticas
- [ ] Privacy Policy completa (ES/EN)
- [ ] Cookie Policy visible
- [ ] Donor Privacy Policy específica
- [ ] Links a políticas en footer

## 📊 Analytics

### Google Tag Manager
- [ ] Container publicado
- [ ] GA4 configurado dentro de GTM
- [ ] Google Ads Conversion Tracking configurado
- [ ] Data Layer implementado
- [ ] Eventos personalizados configurados:
  - [ ] `view_content` (detalle)
  - [ ] `filter_applied` (hubs)
  - [ ] `donate_started`
  - [ ] `purchase` (donación completada)

### Google Analytics 4
- [ ] Propiedad creada
- [ ] Streams configurados (web)
- [ ] Conversiones configuradas
- [ ] Eventos personalizados validados
- [ ] Audiencias básicas creadas

### Google Ads (Opcional)
- [ ] Cuenta creada
- [ ] Conversion tracking instalado
- [ ] Remarketing tag instalado

## 🔐 Seguridad

### Headers
- [ ] CSP configurado correctamente
- [ ] HSTS habilitado
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] Permissions-Policy configurado

### Secrets
- [ ] Todos los secrets rotados antes de lanzamiento
- [ ] `.env` nunca commiteado
- [ ] API tokens con permisos mínimos necesarios
- [ ] Webhooks secrets únicos y seguros

### Rate Limiting
- [ ] Rate limit en `/api/stripe/webhook`
- [ ] Rate limit en `/api/revalidate`
- [ ] Rate limit en formulario de contacto

## 🧪 Testing

### Navegación
- [ ] Home carga correctamente
- [ ] Todos los hubs cargan
- [ ] Filtros funcionan
- [ ] Paginación funciona
- [ ] Cambio de idioma funciona
- [ ] Todas las páginas institucionales cargan
- [ ] Contact form funciona

### Donaciones
- [ ] Flujo completo one-time funciona
- [ ] Flujo completo monthly funciona
- [ ] Success page muestra correctamente
- [ ] Cancel page muestra correctamente
- [ ] Webhooks se reciben correctamente
- [ ] Emails de confirmación se envían

### E2E Tests
- [ ] Smoke tests pasando
- [ ] Tests de navegación pasando
- [ ] Tests de filtros pasando
- [ ] Tests de donaciones pasando
- [ ] Tests de i18n pasando

### Cross-browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Responsive
- [ ] Mobile (320px)
- [ ] Tablet (768px)
- [ ] Desktop (1440px)
- [ ] Menú móvil funcional

## 📧 Email

### Configuración SMTP
- [ ] Servidor SMTP configurado
- [ ] SPF record añadido a DNS
- [ ] DKIM configurado
- [ ] DMARC configurado

### Templates
- [ ] Email de donación one-time (ES/EN)
- [ ] Email de suscripción mensual (ES/EN)
- [ ] Email de contacto - auto-respuesta (ES/EN)
- [ ] Email interno de contacto

## 🌐 DNS

### Records
- [ ] A record → Vercel IP
- [ ] CNAME www → alias a domain principal
- [ ] CNAME cms → Railway URL
- [ ] TXT record para verificación (Google/Bing)
- [ ] SPF record
- [ ] DKIM record
- [ ] DMARC record

## 🚀 Pre-Launch

### 48 horas antes
- [ ] Anuncio preparado para redes sociales
- [ ] Newsletter preparado
- [ ] Press release (si aplica)
- [ ] Backups completos
- [ ] Monitoring configurado

### 24 horas antes
- [ ] Smoke test completo en staging
- [ ] Verificar que no hay issues abiertos críticos
- [ ] Team alertado del lanzamiento
- [ ] Support email monitoreado

### Día del lanzamiento
- [ ] DNS propagado (24-48h)
- [ ] Verificar SSL activo
- [ ] Verificar todas las páginas cargan
- [ ] Enviar sitemaps a Search Console
- [ ] Anunciar en redes sociales
- [ ] Enviar newsletter
- [ ] Monitoring activo

## 📈 Post-Launch (Primera Semana)

### Día 1
- [ ] Verificar que Analytics recibe datos
- [ ] Verificar que no hay errores 500
- [ ] Monitorear logs de Stripe
- [ ] Revisar feedback inicial

### Días 2-7
- [ ] Revisar métricas de performance
- [ ] Revisar cobertura en Search Console
- [ ] Ajustar basado en feedback
- [ ] Optimizar según métricas
- [ ] Responder a errores reportados

---

## ✅ Aprobación Final

Antes de lanzar, el siguiente equipo debe aprobar:

- [ ] **Tech Lead**: Código y arquitectura
- [ ] **Content Manager**: Todo el contenido revisado
- [ ] **SEO Specialist**: Configuración SEO completa
- [ ] **Legal**: Políticas de privacidad aprobadas
- [ ] **Marketing**: Materiales de lanzamiento listos

---

**Fecha planeada de lanzamiento**: __________

**Responsable del lanzamiento**: __________

**Notas**: 
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

