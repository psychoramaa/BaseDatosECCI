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
