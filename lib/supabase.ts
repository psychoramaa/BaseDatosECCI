import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Faltan las variables de entorno de Supabase.\n\n' +
    'Por favor:\n' +
    '1. Crea un archivo .env.local en la raíz del proyecto\n' +
    '2. Agrega tus credenciales de Supabase:\n' +
    '   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co\n' +
    '   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_aqui\n\n' +
    'Obtén tus credenciales en: https://supabase.com → Tu Proyecto → Settings → API'
  )
}

// Validar que la URL sea válida
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  throw new Error(
    '❌ La URL de Supabase no es válida.\n\n' +
    'La URL debe comenzar con http:// o https://\n' +
    'Ejemplo: https://xxxxx.supabase.co\n\n' +
    'Verifica tu archivo .env.local y asegúrate de tener una URL válida de Supabase.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

