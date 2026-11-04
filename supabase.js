

const SUPABASE_URL = "https://dhrezvqrtcqdbbusvmoh.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_B_3CISvH6mDad-fEbFrL4Q_767Blgte";

const { createClient } = supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.supabaseClient = supabaseClient;

console.log("Navaja Studio: conexión con Supabase preparada.");