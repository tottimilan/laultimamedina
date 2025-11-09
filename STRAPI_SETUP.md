# Guía de Configuración de Strapi

Esta guía detalla cómo configurar Strapi como CMS headless para La Última Medina.

## 📦 Instalación Base

```bash
# Crear proyecto Strapi
npx create-strapi-app@latest laultimamedina-cms --quickstart

cd laultimamedina-cms

# Instalar dependencias adicionales
npm install @strapi/plugin-i18n
npm install @strapi/provider-upload-cloudflare-r2
```

## 🌍 Configuración de i18n

1. Ve a **Settings → Internationalization**
2. Añade locales:
   - [X] ✅ **Spanish (es)** - Default
   - [X] ✅ **English (en)**
   - [ ] **ARABE - (ar)**

## 📝 Content Types

### 1. Topic (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
name: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: name
  - Required: Yes
  - Unique per locale: Yes

description: Text (Long)
  - Localized: Yes

parent: Relation (Topic has one Topic)

color: Text
  - Max length: 7 (hex color)

icon: Text
  - Max length: 50
```

### 2. Series (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

description: Text (Long)
  - Localized: Yes

cover: Media (Single image)

order: Number (integer)
  - Default: 0

scope: Enumeration
  - Values: read, watch, listen, learn
  - Required: Yes
```

### 3. People (Collection)

**Settings:**

- ✅ Enable draft & publish
- ❌ NO internationalization (los nombres no se traducen)

**Fields:**

```
name: Text
  - Required: Yes

role: Text
  - Localized: Yes

photo: Media (Single image)

short_bio: Text (Long)
  - Localized: Yes

long_bio: Rich Text
  - Localized: Yes

socials: JSON
  Example: {"twitter": "handle", "linkedin": "url"}

is_author: Boolean (default: false)
is_team: Boolean (default: false)
is_board: Boolean (default: false)
```

### 4. Article (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

excerpt: Text (Long)
  - Localized: Yes
  - Max: 300 chars

body: Rich Text
  - Required: Yes
  - Localized: Yes

cover: Media (Single image)

type: Enumeration
  - Values: paper, ebook, blog, report, translation, printable
  - Required: Yes

topics: Relation (Article has many Topics)

series: Relation (Article belongs to one Series)

authors: Relation (Article has many People)

reading_time: Number (integer)
  - Min: 1

pdf: Media (Single file)

assets: Media (Multiple files/images)

published_at: DateTime

seo: Component (SEO) - repeatable: No
```

### 5. Video (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

synopsis: Text (Long)
  - Localized: Yes

provider: Enumeration
  - Values: youtube, vimeo, other
  - Required: Yes

video_id: Text
  - For YouTube/Vimeo IDs

embed_url: Text (Long)

transcript: Rich Text
  - Localized: Yes

date: Date
  - Required: Yes

thumbnail: Media (Single image)

topics: Relation (Video has many Topics)

series: Relation (Video belongs to one Series)

seo: Component (SEO)
```

### 6. PodcastSeries (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

description: Text (Long)
  - Localized: Yes

cover: Media (Single image)

rss_url: Text (Long)
```

### 7. PodcastEpisode (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
series: Relation (PodcastEpisode belongs to one PodcastSeries)
  - Required: Yes

title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

synopsis: Text (Long)
  - Localized: Yes

audio_url: Text (Long)

embed_url: Text (Long)

transcript: Rich Text
  - Localized: Yes

date: Date
  - Required: Yes

topics: Relation (PodcastEpisode has many Topics)

seo: Component (SEO)
```

### 8. LearnModule (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
kind: Enumeration
  - Values: conversations, conviction_circles, curriculum_unit, curriculum_lesson, talk_toolkit, wisay_qa
  - Required: Yes

title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

summary: Text (Long)
  - Localized: Yes

goals: JSON
  - Array of strings

resources: Media (Multiple)

audience: Text
  - Localized: Yes

steps: Rich Text
  - Localized: Yes

faq: JSON
  - Array of {question, answer}

topics: Relation (LearnModule has many Topics)

series: Relation (LearnModule belongs to one Series)

# Campos específicos de Curriculum Unit
grade: Text
duration: Text
unit_number: Number
lessons: Relation (LearnModule has many LearnModule)

# Campos específicos de Curriculum Lesson
lesson_number: Number
materials: Text (Long)
assessment: Text (Long)
standards: Text (Long)

# Campos específicos de WISAY Q&A
question: Text (Long)
answer: Rich Text
related: Relation (LearnModule has many LearnModule)

seo: Component (SEO)
```

### 9. Job (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

department: Text
  - Required: Yes

location: Text
  - Required: Yes

type: Enumeration
  - Values: full-time, part-time, contract, volunteer
  - Required: Yes

description: Rich Text
  - Required: Yes
  - Localized: Yes

requirements: Rich Text
  - Localized: Yes

apply_url: Text (Long)

status: Enumeration
  - Values: open, closed
  - Default: open
  - Required: Yes

seo: Component (SEO)
```

### 10. Document (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

year: Number (integer)

file: Media (Single file)

external_url: Text (Long)

seo: Component (SEO)
```

### 11. Page (Collection)

**Settings:**

- ✅ Enable internationalization
- ✅ Enable draft & publish

**Fields:**

```
title: Text
  - Required: Yes
  - Localized: Yes

slug: UID
  - Attached field: title
  - Required: Yes
  - Unique per locale: Yes

blocks: Dynamic Zone
  - Components: Hero, TextBlock, ImageBlock, CallToAction, FAQ, etc.

seo: Component (SEO)
```

### 12. Redirect (Collection)

**Settings:**

- ✅ Enable internationalization
- ❌ NO draft & publish (redirects deben ser inmediatos)

**Fields:**

```
from: Text
  - Required: Yes
  - Unique per locale: Yes

to: Text
  - Required: Yes

status: Enumeration
  - Values: 301, 302
  - Default: 301
  - Required: Yes

locale_scope: Text
  - Optional: específico a un locale o global
```

### 13. Menu (Collection)

**Settings:**

- ✅ Enable internationalization
- ❌ NO draft & publish

**Fields:**

```
location: Enumeration
  - Values: header, footer, learn
  - Required: Yes

items: JSON
  - Array of {label, url, relation}
  - Localized: Yes
```

## 🎨 Component: SEO (Reusable)

**Create Component:** `shared.seo`

**Fields:**

```
title: Text
  - Max: 60 chars

description: Text
  - Max: 160 chars

keywords: Text (repeatable)

og_image: Media (Single image)

no_index: Boolean (default: false)

canonical: Text (Long)
```

## 🔐 Permisos y Roles

### Rol: Public

**Permisos necesarios para el frontend:**

✅ **Topic**: find, findOne
✅ **Series**: find, findOne
✅ **People**: find, findOne
✅ **Article**: find, findOne
✅ **Video**: find, findOne
✅ **PodcastSeries**: find, findOne
✅ **PodcastEpisode**: find, findOne
✅ **LearnModule**: find, findOne
✅ **Job**: find, findOne (solo status: open)
✅ **Document**: find, findOne
✅ **Page**: find, findOne
✅ **Redirect**: find
✅ **Menu**: find, findOne

❌ Ningún permiso de `create`, `update`, `delete` para Public

### Rol: Author

Puede crear y editar contenido, pero no publicar.

### Rol: Editor

Puede publicar contenido.

### Rol: Admin

Acceso completo.

## 🔗 API Tokens

1. Ve a **Settings → API Tokens**
2. Crea un token:
   - **Name**: Frontend Production
   - **Token type**: Read-only
   - **Token duration**: Unlimited
3. Copia el token y guárdalo en `.env`:
   ```
   STRAPI_API_TOKEN=tu_token_aqui
   ```

## 📤 Webhooks

Configura webhooks para revalidar el frontend cuando se publique contenido:

1. Ve a **Settings → Webhooks**
2. Crea webhook:
   - **Name**: Revalidate Frontend
   - **URL**: `https://tudominio.com/api/revalidate`
   - **Headers**:
     ```
     Authorization: Bearer TU_SECRET_TOKEN
     ```
   - **Events**:
     - `entry.publish`
     - `entry.unpublish`
     - `entry.delete`

## 🗄️ Base de Datos

### PostgreSQL (Recomendado para producción)

`config/database.js`:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'laultimamedina'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
      },
    },
    debug: false,
  },
});
```

### SQLite (Solo para desarrollo local)

Ya viene configurado por defecto en desarrollo.

## 📦 Media Storage - Cloudflare R2

1. Instala el provider:

```bash
npm install @strapi/provider-upload-cloudflare-r2
```

2. Configura `config/plugins.js`:

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudflare-r2',
      providerOptions: {
        accessKeyId: env('R2_ACCESS_KEY_ID'),
        secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
        params: {
          Bucket: env('R2_BUCKET_NAME'),
        },
        cloudflareAccount: env('R2_ACCOUNT_ID'),
        cloudflareBucketURL: env('NEXT_PUBLIC_R2_PUBLIC_URL'),
      },
    },
  },
});
```

## 🚀 Despliegue en Railway

1. Crea proyecto en Railway
2. Añade PostgreSQL desde el marketplace
3. Conecta tu repositorio de Strapi
4. Configura variables de entorno:

```env
NODE_ENV=production
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_SSL=true
APP_KEYS=generado_con_openssl
API_TOKEN_SALT=generado_con_openssl
ADMIN_JWT_SECRET=generado_con_openssl
JWT_SECRET=generado_con_openssl
```

Para generar secretos:

```bash
openssl rand -base64 32
```

## 📝 Contenido de Ejemplo

Después de configurar los modelos, crea contenido de ejemplo:

1. **Topics**: Fe, Corán, Historia, Espiritualidad, Cultura
2. **Series**: Conversaciones Islámicas, Fundamentos de la Fe
3. **People**: Autores y equipo
4. **Articles**: 3-5 artículos de ejemplo por tipo
5. **Videos**: 2-3 videos de ejemplo
6. **Podcasts**: 1 serie con 2-3 episodios

---

**¡Strapi configurado! Ahora conecta el frontend con las funciones en `src/lib/strapi.ts`**
