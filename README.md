# App de Facturas con Supabase

Una aplicación sencilla para gestionar facturas con autenticación usando Supabase y Shadcn UI.

## Características

- 🔐 Autenticación con Supabase (registro e inicio de sesión)
- 📝 CRUD completo de facturas
- 🎨 Interfaz moderna con Shadcn UI
- ⚡ Construida con Next.js 14 y TypeScript

## Requisitos Previos

- Node.js 18+ instalado
- Una cuenta en [Supabase](https://supabase.com)

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ve a Settings > API y copia:
   - Project URL
   - anon/public key

### 3. Crear la tabla de facturas

En el SQL Editor de Supabase, ejecuta este script:

```sql
-- Crear tabla de facturas
CREATE TABLE facturas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  numero TEXT NOT NULL,
  cliente TEXT NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha DATE NOT NULL,
  concepto TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar Row Level Security
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios solo vean sus propias facturas
CREATE POLICY "Users can view own facturas"
  ON facturas FOR SELECT
  USING (auth.uid() = user_id);

-- Política para que los usuarios solo puedan insertar sus propias facturas
CREATE POLICY "Users can insert own facturas"
  ON facturas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política para que los usuarios solo puedan actualizar sus propias facturas
CREATE POLICY "Users can update own facturas"
  ON facturas FOR UPDATE
  USING (auth.uid() = user_id);

-- Política para que los usuarios solo puedan eliminar sus propias facturas
CREATE POLICY "Users can delete own facturas"
  ON facturas FOR DELETE
  USING (auth.uid() = user_id);
```

### 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

## Ejecutar la aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. **Registro/Login**: Crea una cuenta o inicia sesión con tus credenciales
2. **Crear Factura**: Haz clic en "Nueva Factura" y completa el formulario
3. **Editar Factura**: Haz clic en el icono de editar en cualquier factura
4. **Eliminar Factura**: Haz clic en el icono de eliminar y confirma

## Estructura del Proyecto

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/          # Componentes de Shadcn UI
│   ├── LoginForm.tsx
│   └── FacturasList.tsx
├── lib/
│   ├── supabase.ts  # Cliente de Supabase
│   └── utils.ts     # Utilidades
└── package.json
```

## Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Supabase** - Backend y autenticación
- **Shadcn UI** - Componentes de UI
- **Tailwind CSS** - Estilos
- **Radix UI** - Componentes primitivos accesibles

## Licencia

MIT

