import { supabaseAdmin } from "../config/supabase.config.js";

const userModel = {
    /**
     * Encuentra un usuario por criterios (email, id, etc)
     */
    findOne: async (query) => {
        try {
            if (!query || Object.keys(query).length === 0) {
                const res = await supabaseAdmin
                    .from('crud-users')
                    .select('id, nombre, email, password, rol')
                    .limit(1)
                    .maybeSingle();
                if (res.error) throw res.error;
                return res.data || null;
            }

            const [key, value] = Object.entries(query)[0];
            const columnSelect = 'id, nombre, email, password, rol';
            let res;

            if (key === 'email' || key === 'id') {
                res = await supabaseAdmin.from('crud-users').select(columnSelect).eq(key, value).maybeSingle();
            } else {
                res = await supabaseAdmin.from('crud-users').select(columnSelect).eq(key, value).limit(1).maybeSingle();
            }

            if (res.error) throw res.error;
            return res.data || null;
        } catch (error) {
            console.error('❌ Error en findOne (Supabase):', error.message || error);
            console.log(error)
            return null;
        }
    },

    /**
     * Encuentra todos los usuarios
     */
    find: async (query = {}) => {
        try {
            if (!query || Object.keys(query).length === 0) {
                const res = await supabaseAdmin.from('crud-users').select('id, nombre, email, rol');
                if (res.error) throw res.error;
                return res.data || [];
            }

            const [key, value] = Object.entries(query)[0];
            const res = await supabaseAdmin.from('crud-users').select('id, nombre, email, rol').eq(key, value);
            if (res.error) throw res.error;
            return res.data || [];
        } catch (error) {
            console.error('❌ Error en find (Supabase):', error.message || error);
            return [];
        }
    },

    /**
     * Crea un nuevo usuario
     */
    insertOne: async (data) => {
        try {
            const res = await supabaseAdmin.from('crud-users').insert(data).select('id, nombre, email, rol').single();
            if (res.error) throw res.error;
            return res.data || null;
        } catch (error) {
            console.error('❌ Error en insertOne (Supabase):', error.message || error);
            return null;
        }
    },

    /**
     * Actualiza un usuario
     */
    updateOne: async (query, updateData) => {
        try {
            const [key, value] = Object.entries(query)[0];
            const res = await supabaseAdmin
                .from('crud-users')
                .update(updateData)
                .eq(key, value)
                .select('id, nombre, email')
                .maybeSingle();

            if (res.error) throw res.error;
            return res.data || null;
        } catch (error) {
            console.error('❌ Error en updateOne (Supabase):', error.message || error);
            return null;
        }
    },

    /**
     * Elimina un usuario
     */
    deleteOne: async (query) => {
        try {
            const [key, value] = Object.entries(query)[0];
            const res = await supabaseAdmin.from('crud-users').delete().eq(key, value);
            if (res.error) throw res.error;
            return true;
        } catch (error) {
            console.error('❌ Error en deleteOne (Supabase):', error.message || error);
            return false;
        }
    },
};

export function model() {
    return userModel;
}