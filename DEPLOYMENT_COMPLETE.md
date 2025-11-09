# 🚀 Guía Completa de Deployment - La Última Medina

## 📋 Resumen Ejecutivo

Esta guía consolida toda la información necesaria para desplegar **La Última Medina** en producción siguiendo exactamente las recomendaciones del `blueprint.md`:

- **Frontend**: Next.js 14 + Vercel
- **CMS**: Strapi + Railway
- **Base de datos**: PostgreSQL + Railway
- **Pagos**: Stripe
- **Costo estimado**: ~$10/mes

---

## 🏗️ Arquitectura de Deployment

```
┌─────────────────┐         ┌──────────────────┐
│   Vercel        │ ◄─────► │   Railway        │
│   (Frontend)    │         │   (Strapi CMS)   │
│   Next.js 14    │         │   + PostgreSQL   │
└─────────────────┘         └──────────────────┘
        │
        ▼
┌─────────────────┐
│   Stripe        │
│   (Payments)    │
└─────────────────┘
```

**Seguridad**: HTTPS en todos los servicios, webhooks verificados, CORS configurado, backups automáticos.

---

## 📋 Pre-requisitos

- [ ] Cuenta en [Vercel](https://vercel.com)
- [ ] Cuenta en [Railway](https://railway.app)
- [ ] Cuenta en [Stripe](https://stripe.com)
- [ ] Repositorio en GitHub (`laultimamedina` y `laultimamedina-cms`)
- [ ] Dominio configurado (opcional)

---

## 🗄️ PARTE 1: Railway (PostgreSQL + Strapi)

### 1.1 Preparación del Repositorio CMS

```bash
# El repositorio laultimamedina-cms ya está listo
# Contiene: Strapi configurado, content types, schemas, etc.
```

### 1.2 Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app) y crea una cuenta
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu repositorio `laultimamedina-cms`

### 1.3 Configurar PostgreSQL

1. En tu proyecto de Railway, click en "+ New"
2. Selecciona "Database" → "PostgreSQL"
3. Railway creará automáticamente la base de datos
4. Copia la `DATABASE_URL` que aparece en las variables

### 1.4 Variables de Entorno en Railway

En el dashboard de Railway, añade estas variables:

```bash
# Database (Railway lo genera automáticamente)
DATABASE_URL=postgresql://postgres:[PASSWORD]@containers-us-west-1.railway.app:5432/railway

# Strapi Core
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=tu-app-key-1,tu-app-key-2,tu-app-key-3,tu-app-key-4
API_TOKEN_SALT=tu-api-token-salt
ADMIN_JWT_SECRET=tu-admin-jwt-secret
TRANSFER_TOKEN_SALT=tu-transfer-token-salt
JWT_SECRET=tu-jwt-secret

# URLs (actualizar después del deploy)
STRAPI_URL=https://tu-proyecto.up.railway.app
FRONTEND_URL=https://tu-dominio.vercel.app

# Stripe
STRIPE_SECRET_KEY=sk_live_tu_clave_secreta
```

**⚠️ Generar claves seguras:**
```bash
# Ejecuta este comando 5 veces para generar:
# APP_KEYS, API_TOKEN_SALT, ADMIN_JWT_SECRET, TRANSFER_TOKEN_SALT, JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 1.5 Configurar Build Settings

1. En Railway, ve a Settings de tu servicio
2. **Build Command:**
   ```bash
   cd laultimamedina-cms && npm install && npm run build
   ```
3. **Start Command:**
   ```bash
   cd laultimamedina-cms && npm run start
   ```
4. **Root Directory:** `/`

### 1.6 Configurar Volumen para Uploads

1. En Railway, ve a tu servicio de Strapi
2. Click en "Variables" → "Volumes"
3. Click en "+ New Volume"
4. **Mount Path:** `/app/laultimamedina-cms/public/uploads`

### 1.7 Deploy y Configuración Inicial

1. Railway detectará los cambios y empezará el deploy automáticamente
2. Espera a que termine (5-10 minutos)
3. Una vez completado, copia la URL (ej: `https://laultimamedina-production.up.railway.app`)

### 1.8 Configurar Strapi Admin

1. Ve a `https://tu-url-railway.up.railway.app/admin`
2. Crea tu cuenta de administrador
3. Ve a **Settings → Internationalization**
4. Activa i18n y añade idiomas: ES, EN, AR
5. Ve a **Settings → Users & Permissions → Roles → Public**
6. Habilita permisos:
   - `article`: find, findOne
   - `person`: find, findOne
   - `topic`: find, findOne
   - `video`: find, findOne
   - `podcastseries`: find, findOne
   - `podcastepisode`: find, findOne
7. Ve a **Settings → API Tokens**
8. Crea token "Read Only" para el frontend
9. **Copia el token generado** (lo necesitarás para Vercel)

---

## 🎨 PARTE 2: Vercel (Frontend Next.js)

### 2.1 Preparar Variables de Entorno

Asegúrate de que tu proyecto tenga todas las variables necesarias:

```bash
# URLs de producción
NEXT_PUBLIC_SITE_URL=https://laultimamedina.vercel.app
NEXTAUTH_URL=https://laultimamedina.vercel.app
NEXT_PUBLIC_DEFAULT_LOCALE=es

# Strapi (de Railway)
NEXT_PUBLIC_STRAPI_URL=https://tu-url-railway.up.railway.app
STRAPI_API_TOKEN=tu-token-de-strapi-read-only

# NextAuth
NEXTAUTH_SECRET=tu-clave-secreta-muy-segura-32-caracteres

# Database (Railway PostgreSQL)
DATABASE_URL=postgresql://postgres:[PASSWORD]@containers-us-west-1.railway.app:5432/railway

# Stripe (modo LIVE)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave_publica_aqui
STRIPE_SECRET_KEY=sk_live_tu_clave_secreta_aqui
STRIPE_WEBHOOK_SECRET=whsec_... (lo configuraremos después)

# Email (opcional - Brevo/Mailchimp)
BREVO_API_KEY=tu-api-key
MAILCHIMP_API_KEY=tu-api-key
MAILCHIMP_LIST_ID_ES=tu-list-id
MAILCHIMP_LIST_ID_EN=tu-list-id
MAILCHIMP_LIST_ID_AR=tu-list-id

# Analytics (opcional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 2.2 Crear Proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Click en "Add New" → "Project"
3. Importa tu repositorio `laultimamedina` de GitHub
4. Vercel detectará automáticamente que es Next.js

### 2.3 Configurar Variables de Entorno en Vercel

1. En la configuración del proyecto, ve a "Environment Variables"
2. Añade TODAS las variables listadas arriba
3. **Importante:** Selecciona los ambientes correctos (Production, Preview, Development)

### 2.4 Configurar Build Settings

Vercel debería detectar automáticamente:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x o superior

### 2.5 Deploy Inicial

1. Click en "Deploy"
2. Vercel empezará el build (2-5 minutos)
3. Una vez completado, tendrás una URL como `https://laultimamedina.vercel.app`

### 2.6 Configurar Dominio Personalizado (Opcional)

1. En Vercel, ve a **Settings → Domains**
2. Añade tu dominio (ej: `laultimamedina.com`)
3. Sigue las instrucciones DNS
4. Actualiza `NEXTAUTH_URL` y `NEXT_PUBLIC_SITE_URL` con tu dominio real
5. Redeploy automático

---

## 💳 PARTE 3: Stripe (Webhooks y Pagos)

### 3.1 Configurar Modo Live en Stripe

1. Ve a [dashboard.stripe.com](https://dashboard.stripe.com)
2. Asegúrate de estar en **modo Live** (no Test)
3. Verifica que tengas claves live activas

### 3.2 Crear Webhook en Stripe

1. Ve a **Developers → Webhooks**
2. Click en "Add endpoint"
3. **URL del endpoint:** `https://tu-dominio.vercel.app/api/stripe/webhook`
4. Selecciona estos eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### 3.3 Configurar Webhook Secret

1. Después de crear el webhook, Stripe te dará un "Signing secret" (empieza con `whsec_`)
2. Copia ese secret
3. Ve a **Vercel → Settings → Environment Variables**
4. Añade: `STRIPE_WEBHOOK_SECRET=whsec_tu_secret_aqui`
5. **Redeploy** el proyecto para que tome la nueva variable

### 3.4 Verificar Webhooks

1. En Stripe Dashboard, ve a tu webhook
2. Ve a la pestaña "Testing"
3. Envía un evento de prueba
4. Verifica que aparezca como "succeeded" en los logs de Vercel

---

## ✅ PARTE 4: Verificación Post-Deploy

### 4.1 Checklist de Verificación

- [ ] Frontend carga correctamente en Vercel
- [ ] Strapi admin panel accesible en Railway
- [ ] Contenido de Strapi se muestra en el frontend
- [ ] Cambio de idioma funciona (ES/EN/AR)
- [ ] Navegación completa funciona
- [ ] Autenticación funciona (login/registro)
- [ ] Dashboard de usuario accesible
- [ ] Stripe checkout funciona
- [ ] Webhooks de Stripe reciben eventos
- [ ] Búsqueda y filtros funcionan
- [ ] Imágenes cargan correctamente
- [ ] SEO metadata presente en todas las páginas
- [ ] Sitemap.xml accesible (`/sitemap.xml`)
- [ ] Robots.txt accesible (`/robots.txt`)

### 4.2 Probar Flujo Completo

1. **Navegación**: Prueba todas las secciones (Read, Watch, Listen, Learn)
2. **Contenido**: Verifica que los artículos cargan desde Strapi
3. **i18n**: Cambia entre idiomas ES/EN/AR
4. **Auth**: Registra un usuario nuevo
5. **Membresía**: Intenta hacer una donación de prueba
6. **Responsive**: Prueba en móvil, tablet y desktop
7. **SEO**: Verifica metadata, hreflang, schema markup

### 4.3 Monitoreo Inicial

**Vercel:**
- Analytics para ver tráfico inicial
- Logs para verificar que no hay errores críticos

**Railway:**
- Metrics para ver uso de recursos
- Logs para verificar que Strapi funciona correctamente

**Stripe:**
- Dashboard para ver eventos de webhook
- Payments para verificar transacciones de prueba

---

## 🔧 PARTE 5: Mantenimiento y Operaciones

### 5.1 Deploy Automático

Ambos servicios están configurados para deploy automático:
- **Push a `main`** → Deploy automático a producción
- **Pull Requests** → Preview deployments en Vercel

### 5.2 Actualizar Contenido

1. Ve a tu admin panel de Strapi en Railway
2. Edita/crea contenido normalmente
3. El frontend se actualiza automáticamente gracias a ISR (revalidación cada 1 hora)

### 5.3 Forzar Revalidación (Opcional)

Si necesitas forzar actualización inmediata:
```bash
curl -X POST https://tu-dominio.vercel.app/api/revalidate?secret=tu-revalidate-secret
```

### 5.4 Backup y Seguridad

**Railway:**
- Backups automáticos de PostgreSQL
- Monitoreo de logs y métricas

**Seguridad:**
- HTTPS en todos los endpoints
- Webhooks verifican signatures
- CORS configurado correctamente
- Rate limiting activo

### 5.5 Monitoreo Continuo

- **Vercel Analytics**: Tráfico, performance, errores
- **Railway Metrics**: CPU, RAM, database usage
- **Stripe Dashboard**: Transacciones, webhooks
- **Uptime monitoring**: Configurar alertas

---

## 🚨 PARTE 6: Troubleshooting

### Error: "Failed to fetch from Strapi"
**Solución:**
1. Verifica `NEXT_PUBLIC_STRAPI_URL` en Vercel
2. Verifica `STRAPI_API_TOKEN` válido
3. Verifica permisos en Strapi (Settings → Roles → Public)
4. Verifica CORS en Strapi settings

### Error: "Database connection failed"
**Solución:**
1. Verifica `DATABASE_URL` correcta
2. Verifica que PostgreSQL esté activo en Railway
3. Ejecuta `npx prisma db push` para sincronizar schema
4. Verifica logs en Railway

### Error: "Webhook signature verification failed"
**Solución:**
1. Verifica `STRIPE_WEBHOOK_SECRET` correcto
2. Verifica URL exacta en Stripe webhook
3. Verifica modo "live" vs "test"
4. Revisa logs de Vercel para detalles

### Error: "NextAuth configuration error"
**Solución:**
1. Verifica `NEXTAUTH_URL` coincide con dominio real
2. Verifica `NEXTAUTH_SECRET` configurado
3. Verifica `DATABASE_URL` correcta
4. Redeploy después de cambios

### Build falla en Vercel
**Solución:**
1. Revisa logs detallados en Vercel
2. Verifica todas las variables de entorno
3. Prueba build local: `npm run build`
4. Verifica TypeScript errors

### Strapi no inicia en Railway
**Solución:**
1. Revisa logs en Railway
2. Verifica variables de entorno completas
3. Verifica conexión a base de datos
4. Verifica "Start Command" en Railway settings

---

## 💰 PARTE 7: Costos y Escalabilidad

### Costos Estimados (según blueprint.md)

| Servicio | Plan | Costo Mensual |
|----------|------|---------------|
| **Vercel** | Hobby | **$0** (gratis) |
| **Railway** | Starter | **~$5** (PostgreSQL + Strapi) |
| **Railway** | PostgreSQL | **~$5** adicional |
| **Stripe** | Pay-as-you-go | 2.9% + 30¢ por transacción |

**Total estimado: ~$10/mes**

### Escalabilidad

**Vercel Pro** ($20/mes) cuando:
- Más de 100k pageviews/mes
- Necesites analytics avanzado
- Mayor límite de builds

**Railway Developer** ($10-20/mes) cuando:
- Más de 1GB de datos
- Mayor uso de CPU/RAM
- Necesites múltiples servicios

### Optimizaciones de Costo

- Usa Railway free trial inicialmente ($5 crédito)
- Monitorea uso mensual
- Configura alertas de presupuesto
- Optimiza imágenes y assets

---

## 📊 PARTE 8: Métricas de Éxito

### Día 1 (Lanzamiento)
- [ ] 0 errores críticos en logs
- [ ] Sitio carga en < 3 segundos
- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 95, A11y ≥ 95
- [ ] HTTPS activo
- [ ] Webhooks funcionando

### Semana 1
- [ ] Usuarios pueden registrarse
- [ ] Donaciones funcionan
- [ ] Contenido se actualiza desde Strapi
- [ ] i18n funciona correctamente

### Mes 1
- [ ] SEO indexado en Google
- [ ] Analytics configurado
- [ ] Performance estable
- [ ] Feedback de usuarios recopilado

---

## 📞 PARTE 9: Soporte y Recursos

### Contactos de Soporte
- **Vercel Support**: https://vercel.com/support
- **Railway Support**: https://railway.app/help
- **Stripe Support**: https://support.stripe.com
- **Strapi Community**: https://forum.strapi.io

### Documentación Oficial
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Strapi Docs](https://docs.strapi.io)
- [Stripe Docs](https://stripe.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

### Archivos de Configuración
- `blueprint.md` - Arquitectura y requisitos
- `INSTALL.md` - Configuración local
- `prisma/schema.prisma` - Schema de base de datos
- `.env.example` - Variables de entorno

---

## 🎉 ¡LISTO PARA PRODUCCIÓN!

**Tiempo estimado de despliegue: 45-60 minutos**

Una vez completados todos los pasos:
- ✅ Tu sitio web estará en producción
- ✅ CMS completamente funcional
- ✅ Sistema de pagos operativo
- ✅ Monitoreo y backups activos
- ✅ Listo para recibir usuarios

**¡La Última Medina está lista para cambiar vidas! 🚀**

---

*Última actualización: $(date)*