# Guía de Despliegue

## 🚀 Desplegar en Vercel (Recomendado)

Vercel es la plataforma creada por el equipo de Next.js, por lo que es la opción más fácil y optimizada.

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/facturas-app.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Haz clic en "Add New Project"
   - Selecciona tu repositorio
   - Vercel detectará automáticamente que es Next.js

3. **Configura las variables de entorno:**
   - En la sección "Environment Variables", agrega:
     ```
     NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     ```
   - Haz clic en "Deploy"

4. **¡Listo!** Tu app estará en línea en unos minutos.

### Opción 2: Desde la CLI de Vercel

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión:**
   ```bash
   vercel login
   ```

3. **Despliega:**
   ```bash
   vercel
   ```
   - Sigue las instrucciones
   - Cuando pregunte por variables de entorno, agrega:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Para producción:**
   ```bash
   vercel --prod
   ```

---

## 🌐 Desplegar en Netlify

### Opción 1: Desde GitHub

1. **Sube tu código a GitHub** (igual que arriba)

2. **Conecta con Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Inicia sesión con GitHub
   - Haz clic en "Add new site" → "Import an existing project"
   - Selecciona tu repositorio

3. **Configuración de Build:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework preset: Next.js

4. **Variables de entorno:**
   - Ve a Site settings → Environment variables
   - Agrega:
     ```
     NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     ```

5. **Despliega:**
   - Haz clic en "Deploy site"

### Opción 2: Desde la CLI de Netlify

1. **Instala Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Inicia sesión:**
   ```bash
   netlify login
   ```

3. **Despliega:**
   ```bash
   netlify init
   netlify deploy --prod
   ```

---

## 📝 Notas Importantes

### Variables de Entorno

Asegúrate de agregar estas variables en la plataforma que elijas:

- `NEXT_PUBLIC_SUPABASE_URL` - Tu URL de Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Tu clave anónima de Supabase

### Base de Datos

Antes de desplegar, asegúrate de:
1. ✅ Haber ejecutado el script SQL en Supabase
2. ✅ Tener las credenciales de Supabase listas
3. ✅ Configurar las variables de entorno en la plataforma

### Dominio Personalizado

Ambas plataformas te dan un dominio gratuito, pero puedes agregar uno personalizado:
- **Vercel:** Settings → Domains
- **Netlify:** Site settings → Domain management

---

## 🔧 Solución de Problemas

### Error: "Module not found"
- Asegúrate de que todas las dependencias estén en `package.json`
- Ejecuta `npm install` localmente para verificar

### Error: "Environment variables not found"
- Verifica que las variables estén configuradas en la plataforma
- Reinicia el despliegue después de agregar variables

### Error de Build
- Revisa los logs de build en la plataforma
- Prueba hacer build localmente: `npm run build`

---

## 🎉 ¡Listo!

Una vez desplegado, tu aplicación estará disponible en:
- **Vercel:** `tu-app.vercel.app`
- **Netlify:** `tu-app.netlify.app`

¡Disfruta tu app de facturas en producción! 🚀

