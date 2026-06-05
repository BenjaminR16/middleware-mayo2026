import { supabase, supabaseAdmin } from "../config/supabase.config.js"

const productModel = {
    find: async (query = {}) => {
        try {
            if (!query || Object.keys(query).length === 0) {
                const res = await supabase.from('productos').select('nombre, descripcion, precio')
                if (res.error) throw res.error
                console.log(res)
                return res.data || []
            }

            const [key, value] = Object.entries(query)[0]
            const res = await supabase.from('productos').select('nombre, descripcion, precio')
            if (res.error) throw res.error
        } catch (error) {
            console.error('Error en find (Supabase):', error.message || error);
        }
    },

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

    insertOne: async (data) => {
        try {
            const res = await supabaseAdmin.from('productos').insert(data).select('nombre, descripcion,precio').single()
            if (res.error) throw res.error
            return res.data || null
        } catch (error) {
            console.error('Error al insertar el productooo', error.message || error);
            return null;
        }
    },

    updateOne: async (query, updateData) => {
        try {
            const [key, value] = Object.entries(query)[0];
            const res = await supabaseAdmin.from("productos").update(updateData).eq(key, value).select('id', 'nombre').maybeSingle()

            if (res.error) throw res.error
            return res.data || null

        } catch (error) {
            console.error('❌ Error en updateOne (Supabase):', error.message || error);
            return null;
        }
    },

    deleteOne: async (query) => {
        try {
            const [key, value] = Object.entries(query)[0];
            const res = await supabaseAdmin.from('productos').delete().eq(key, value)
            if (res.error) throw res.error
            return true
        } catch (error) {
            console.error('❌ Error en deleteOne (Supabase):', error.message || error);
            return null;
        }
    }
}

export function model() {
    return productModel
}

