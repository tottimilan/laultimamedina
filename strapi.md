

# 📝 Strapi - Guía Paso a Paso

> **Estás aquí**: Content-Type Builder con "Create new collection type"

---

## 1️⃣ CREAR COLLECTION TYPE: **Article**

### Paso 1: Click en "Create new collection type"

### Paso 2: Configuración básica

```

Display name: Article

API ID (singular): article

API ID (plural): articles

```

**Click "Continue"**

### Paso 3: Añadir campos uno por uno

#### Campo 1: **title**

- Click "+ Add another field"
- Selecciona: **Text**
- Name: `title`
- Type: Short text
- ✅ Required field
- ✅ Enable localization (para i18n)

-**Click "Finish"**

#### Campo 2: **slug**

- Click "+ Add another field"
- Selecciona: **UID**
- Name: `slug`
- Attached field: `title`
- ✅ Required field

-**Click "Finish"**

#### Campo 3: **excerpt**

- Click "+ Add another field"
- Selecciona: **Text**
- Name: `excerpt`
- Type: Long text
- ✅ Enable localization

-**Click "Finish"**

#### Campo 4: **body**

- Click "+ Add another field"
- Selecciona: **Rich Text**
- Name: `body`
- ✅ Required field
- ✅ Enable localization

-**Click "Finish"**

#### Campo 5: **cover**

- Click "+ Add another field"
- Selecciona: **Media**
- Name: `cover`
- Type: Single media
- Allowed types: images

-**Click "Finish"**

#### Campo 6: **type**

- Click "+ Add another field"
- Selecciona: **Enumeration**
- Name: `type`
- Values (una por línea):

  ```

  paper

  blog

  ebook

  report

  translation

  printable

  ```
- ✅ Required field

-**Click "Finish"**

#### Campo 7: **reading_time**

- Click "+ Add another field"
- Selecciona: **Number**
- Name: `reading_time`
- Number format: integer

-**Click "Finish"**

#### Campo 8: **published_at**

- Click "+ Add another field"
- Selecciona: **Date**
- Name: `publishedat`
- Type: datetime

-**Click "Finish"**

### Paso 4: Click "Save" (arriba a la derecha)

### Paso 5: Configurar i18n y draft

- Aparecerá en la lista de la izquierda "Article"
- Click en "Article"
- Pestaña "Settings"
- ✅ Enable internationalization
- ✅ Enable draft & publish

-**Click "Save"**

---

## 2️⃣ CREAR COLLECTION TYPE: **Topic**

### Paso 1: Click "Create new collection type"

### Paso 2:

```

Display name: Topic

API ID (singular): topic

API ID (plural): topics

```

### Paso 3: Añadir campos

#### name (Text, required, localized)

#### slug (UID, attached to name)

#### description (Long text, localized)

#### color (Text, max 7 chars - para hex #XXXXXX)

### Paso 4: Save

### Paso 5: Settings → Enable i18n

---

## 3️⃣ CREAR COLLECTION TYPE: **People** (Autores)

```

Display name: People

API ID (singular): person

API ID (plural): people

```

### Campos:

-**name** (Text, required) - NO localized (nombres no se traducen)

-**role** (Text, localized)

-**photo** (Media - Single image)

-**short_bio** (Long text, localized)

-**is_author** (Boolean, default false)

---

## 4️⃣ CREAR RELACIONES

Una vez tengas Article, Topic y People creados:

### Ir a Article → Edit

#### Añadir relación con Topics:

- Click "+ Add another field"
- Selecciona: **Relation**
- Relation with: Topic
- Relation type: **Article has many Topics** (many-to-many)
- Name: `topics`

-**Click "Finish"**

#### Añadir relación con Authors:

- Click "+ Add another field"
- Selecciona: **Relation**
- Relation with: People
- Relation type: **Article has many People**
- Name: `authors`

-**Click "Finish"**

**Click "Save"**

---

## ✅ LISTO PARA CREAR CONTENIDO

Ahora ve a:

**Content Manager → Article → Create new entry**

Y crea tu primer artículo!

---

## 🎯 CONTENT TYPES MÍNIMOS PARA EMPEZAR

1. ✅ **Article** (explicado arriba)
2. ✅ **Topic** (explicado arriba)
3. ✅ **People** (explicado arriba)

Con esos 3 ya puedes:

- Crear artículos
- Asignar temas
- Asignar autores
- ¡Ver todo en el frontend!

---

## 🔄 DESPUÉS PUEDES CREAR

-**Series** (para agrupar contenido)

-**Video** (similar a Article)

-**PodcastEpisode**

-**LearnModule**

- etc.

---

## 📞 ¿ATASCADO?

Si algo no está claro, dime en qué paso estás y te ayudo.

**Siguiente**: Crea Article, Topic y People, luego crea tu primer artículo de prueba.
