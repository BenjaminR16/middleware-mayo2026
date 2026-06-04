import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// VALIDACIÓN Y DIAGNÓSTICO
if (!supabaseUrl || !supabaseKey) {
    throw new Error('[Supabase Error]: Faltan URL o KEY (anon) en el .env');
}

// Log de diagnóstico para verificar la carga de la clave de servicio
if (!supabaseServiceKey) {
    console.warn('\x1b[33m%s\x1b[0m', '[ADVERTENCIA]: SUPABASE_SERVICE_ROLE_KEY no detectada en el entorno.');
} else {
    console.log('\x1b[32m%s\x1b[0m', `[Supabase]: Clave de servicio detectada (Longitud: ${supabaseServiceKey.length})`);
}

/**
 * Cliente estándar: Se usa para operaciones que deben respetar el RLS (Frontend / Consultas normales).
 * Este cliente actúa con los permisos limitados de la clave 'anon'.
 */
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
});

/**
 * Cliente Administrativo: Tiene permisos de "Superusuario".
 * Se utiliza para bypass de RLS y gestión de Auth.
 * ES CRÍTICO: Debe usarse en UserRepository y TenantRepository para operaciones de escritura.
 */
export const supabaseAdmin = createClient(
    supabaseUrl,
    supabaseServiceKey || 'MISSING_KEY',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false
        },
        db: {
            schema: 'public'
        }
    }
);
