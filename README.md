# 🕌 La Última Medina

Plataforma web para educación islámica accesible, rigurosa y transformadora.

## 🎯 Objetivo

Construir una plataforma de contenido educativo islámico con cuatro pilares principales:
- **Read** (Leer): Artículos, investigaciones y traducciones
- **Watch** (Ver): Vídeos y conferencias
- **Listen** (Escuchar): Podcasts
- **Learn** (Aprender): Módulos educativos estructurados

---

## 🚀 Stack Tecnológico

### Frontend
- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** + **styled-components**
- **next-intl** para i18n (ES/EN/AR)
- **Framer Motion** para animaciones
- **NextAuth.js** para autenticación
- **Prisma** para base de datos

### Backend
- **Strapi** (Headless CMS)
- **PostgreSQL** (Railway)

### Servicios
- **Vercel** (Frontend hosting)
- **Railway** (Strapi + PostgreSQL)
- **Stripe** (Pagos y membresías)

---

## ⚡ Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# 3. Iniciar base de datos
npx prisma generate
npx prisma db push

# 4. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000/es`

---

## 🌍 Idiomas Soportados

- 🇪🇸 **Español (ES)** - Idioma por defecto
- 🇬🇧 **Inglés (EN)**
- 🇸🇦 **Árabe (AR)**

Todas las rutas usan el patrón: `/{locale}/ruta`

---

## 📁 Estructura del Proyecto

```
laultimamedina/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Rutas con i18n
│   │   │   ├── read/          # Hub de artículos
│   │   │   ├── watch/         # Hub de vídeos
│   │   │   ├── listen/        # Hub de podcasts
│   │   │   ├── learn/         # Hub educativo
│   │   │   ├── donate/        # Donaciones
│   │   │   └── ...
│   │   └── api/               # API Routes
│   │       ├── stripe/        # Webhooks de Stripe
│   │       ├── auth/          # NextAuth endpoints
│   │       └── ...
│   ├── components/            # Componentes React
│   │   ├── pages/            # Páginas completas
│   │   ├── cards/            # Cards de contenido
│   │   └── ...
│   ├── lib/                   # Utilidades
│   │   ├── strapi.ts         # Cliente de Strapi
│   │   ├── seo.ts            # SEO helpers
│   │   ├── auth.ts           # NextAuth config
│   │   └── prisma.ts         # Prisma client
│   ├── styles/
│   │   └── theme.ts          # Tokens de diseño
│   └── types/                 # TypeScript types
├── messages/                  # Traducciones i18n
│   ├── es.json
│   ├── en.json
│   └── ar.json
├── prisma/
│   └── schema.prisma         # Schema de base de datos
├── laultimamedina-cms/       # Strapi CMS (separado)
└── public/                    # Assets estáticos
```

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | 🚀 Guía completa de deployment (Vercel + Railway) |
| **[INSTALL.md](./INSTALL.md)** | 📦 Instalación local y configuración |
| **[STRAPI_SETUP.md](./STRAPI_SETUP.md)** | 🗄️ Configuración de Strapi CMS |
| **[blueprint.md](./blueprint.md)** | 📋 Especificación completa del proyecto |
| **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** | ✅ Estado actual del desarrollo |

---

## 🧪 Testing

```bash
# Linting y type-checking
npm run lint
npm run type-check

# Tests E2E con Playwright
npm run test:e2e
npm run test:e2e:ui
```

---

## 🚀 Deployment

### Opción Recomendada: Vercel + Railway

**Frontend (Next.js) → Vercel**
- Deploy automático desde GitHub
- Edge functions y ISR
- SSL y CDN incluidos

**Backend (Strapi) → Railway**
- PostgreSQL incluido
- Volúmenes persistentes
- Fácil configuración

👉 **Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para guía paso a paso**

---

## 💳 Stripe Integration

El proyecto incluye integración completa con Stripe:
- ✅ Donaciones únicas
- ✅ Donaciones mensuales (membresías)
- ✅ Webhooks configurados
- ✅ Gestión de suscripciones

Ver [STRIPE_WEBHOOKS_CONFIGURADOS.md](./STRIPE_WEBHOOKS_CONFIGURADOS.md) para detalles.

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` con:

```bash
# Frontend
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=es

# Strapi CMS
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=tu_token_aqui

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_una_clave_secreta

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/laultimamedina

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 📊 Estado del Proyecto

### ✅ Completado
- Setup inicial de Next.js 14 + TypeScript
- Sistema de i18n con 3 idiomas (ES/EN/AR)
- Todos los hubs principales (Read, Watch, Listen, Learn)
- Integración completa de Stripe
- Sistema de autenticación con NextAuth
- SEO técnico (metadata, sitemaps, schema.org)
- Componentes base y layouts

### 🚧 En Progreso
- Conexión con Strapi para contenido dinámico
- Páginas de detalle por tipo de contenido
- PWA avanzado
- Analytics (GTM + GA4)

Ver [PROJECT_STATUS.md](./PROJECT_STATUS.md) para detalles completos.

---

## 🎨 Diseño y Marca

Los tokens de diseño están centralizados en:
- `src/styles/theme.ts` - Tema de styled-components
- `tailwind.config.ts` - Configuración de Tailwind
- `src/app/globals.css` - Variables CSS globales

**Paleta de colores:**
- Primary: `#1a5632` (Verde islámico)
- Secondary: `#c9a961` (Dorado)
- Accent: `#8b4513` (Terracota)

---

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm start                # Servidor de producción

# Base de datos
npx prisma studio        # UI para ver la BD
npx prisma generate      # Generar cliente Prisma
npx prisma db push       # Sincronizar schema

# Calidad
npm run lint             # ESLint
npm run type-check       # TypeScript

# Testing
npm run test:e2e         # Tests E2E
npm run test:e2e:ui      # Tests en modo UI
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

**Nota:** Sigue las convenciones definidas en `.cursorrules`

---

## 📄 Licencia

Copyright © 2024 La Última Medina. Todos los derechos reservados.

---

## 🆘 Soporte

¿Necesitas ayuda?
1. Revisa la [documentación completa](./DEPLOYMENT.md)
2. Consulta el [blueprint del proyecto](./blueprint.md)
3. Revisa los [issues abiertos](../../issues)

---

**Desarrollado con ❤️ para la comunidad musulmana**

*"El conocimiento es luz, y la luz de Allah ilumina todos los corazones"*

