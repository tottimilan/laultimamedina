# Guía de Instalación - La Última Medina

Esta guía te ayudará a configurar el proyecto en tu entorno local.

## 📋 Requisitos Previos

- **Node.js** >= 18.17.0
- **npm** >= 9.0.0
- **Git**

## 🚀 Instalación del Frontend

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd laultimamedina
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
# Frontend
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=es

# Strapi CMS (configura después de instalarlo)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=tu_token_aqui
STRAPI_WEBHOOK_SECRET=tu_secret_aqui

# Stripe (obtén de https://dashboard.stripe.com/)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Analítica (opcional, configura después)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000/es`

## 🗄️ Instalación de Strapi (CMS)

### Opción A: Local

1. Crear directorio para Strapi:

```bash
cd ..
npx create-strapi-app@latest laultimamedina-cms --quickstart
cd laultimamedina-cms
```

2. Instalar plugins necesarios:

```bash
npm install @strapi/plugin-i18n
npm install @strapi/provider-upload-cloudflare-r2
```

3. Configurar base de datos PostgreSQL en `config/database.js`

4. Iniciar Strapi:

```bash
npm run develop
```

Accede a `http://localhost:1337/admin` para configurar el admin.

### Opción B: Railway (Producción)

1. Ve a [Railway.app](https://railway.app)
2. Crea un nuevo proyecto
3. Añade PostgreSQL desde el marketplace
4. Despliega Strapi conectando tu repositorio
5. Configura las variables de entorno

## 🎨 Configuración de Modelos en Strapi

Una vez Strapi esté corriendo, configura los siguientes Content Types:

### 1. Topic
- `name` (Text, required, i18n)
- `slug` (UID, required, unique per locale)
- `description` (Text Long, i18n)
- `color` (Text)
- `icon` (Text)

### 2. Series
- `title` (Text, required, i18n)
- `slug` (UID, required, unique per locale)
- `description` (Text Long, i18n)
- `cover` (Media, Single)
- `order` (Number)
- `scope` (Enum: read, watch, listen, learn)

### 3. People
- `name` (Text, required)
- `role` (Text, i18n)
- `photo` (Media, Single)
- `short_bio` (Text Long, i18n)
- `long_bio` (Rich Text, i18n)
- `socials` (JSON)
- `is_author` (Boolean)
- `is_team` (Boolean)
- `is_board` (Boolean)

### 4. Article
- `title` (Text, required, i18n)
- `slug` (UID, required, unique per locale)
- `excerpt` (Text Long, i18n)
- `body` (Rich Text, i18n)
- `cover` (Media, Single)
- `type` (Enum: paper, ebook, blog, report, translation, printable)
- `topics` (Relation: many-to-many with Topic)
- `series` (Relation: many-to-one with Series)
- `authors` (Relation: many-to-many with People)
- `reading_time` (Number)
- `pdf` (Media, Single)
- `assets` (Media, Multiple)
- `published_at` (DateTime)
- `seo` (Component: SEO)

### 5. Video
- Similar a Article, pero con:
- `provider` (Enum: youtube, vimeo, other)
- `video_id` (Text)
- `embed_url` (Text Long)
- `transcript` (Text Long, i18n)
- `thumbnail` (Media, Single)

### 6. PodcastSeries
- `title` (Text, required, i18n)
- `slug` (UID, required, unique per locale)
- `description` (Text Long, i18n)
- `cover` (Media, Single)
- `rss_url` (Text)

### 7. PodcastEpisode
- `series` (Relation: many-to-one with PodcastSeries)
- `title` (Text, required, i18n)
- `slug` (UID, required, unique per locale)
- `synopsis` (Text Long, i18n)
- `audio_url` (Text)
- `embed_url` (Text)
- `transcript` (Text Long, i18n)
- `date` (Date)
- `topics` (Relation: many-to-many with Topic)
- `seo` (Component: SEO)

### Componente SEO (reusable)
- `title` (Text)
- `description` (Text Long)
- `keywords` (Text, multiple)
- `og_image` (Media, Single)
- `no_index` (Boolean)
- `canonical` (Text)

## 🔐 Configuración de Stripe

### 1. Crear cuenta en Stripe

Ve a [stripe.com](https://stripe.com) y crea una cuenta.

### 2. Obtener claves API

En el Dashboard de Stripe:
- Developers → API keys
- Copia la **Publishable key** y **Secret key**

### 3. Configurar webhooks

1. En Dashboard: Developers → Webhooks
2. Añade un endpoint: `https://tudominio.com/api/stripe/webhook`
3. Selecciona eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copia el **Signing secret**

### 4. Pruebas locales

Instala Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 🧪 Testing

### Linting y Type Checking

```bash
npm run lint
npm run type-check
```

### Tests E2E con Playwright

```bash
# Instalar navegadores
npx playwright install

# Ejecutar tests
npm run test:e2e

# Ejecutar en modo UI
npm run test:e2e:ui
```

## 🚀 Despliegue

### Frontend (Vercel)

1. Crea cuenta en [Vercel](https://vercel.com)
2. Importa el repositorio
3. Configura variables de entorno
4. Deploy automático en cada push

### CMS (Railway)

1. Crea proyecto en [Railway](https://railway.app)
2. Provisiona PostgreSQL
3. Despliega Strapi
4. Configura dominio custom: `cms.tudominio.com`

## 📝 Notas Importantes

- **Nunca** commitees el archivo `.env`
- Las claves de Stripe en modo `test` solo funcionan en desarrollo
- Configura webhooks tanto para test como para producción
- Activa i18n en Strapi desde Settings → Internationalization
- Configura permisos públicos para los Content Types necesarios

## 🆘 Soporte

Si encuentras problemas:

1. Revisa la documentación en `blueprint.md`
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de estar usando las versiones correctas de Node/npm
4. Revisa los logs de Strapi y Next.js

## 🔄 Próximos Pasos

Después de la instalación:

1. Configura los modelos en Strapi
2. Crea contenido de prueba
3. Prueba las donaciones con Stripe test mode
4. Configura webhooks de Strapi → Next.js para revalidación
5. Añade Google Tag Manager y Google Analytics
6. Configura Consent Manager

---

**¡Listo para desarrollar! 🎉**

