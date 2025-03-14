/**
 * Convierte un texto en un slug amigable para URLs.
 * 
 * La función toma un texto y lo transforma a minúsculas, reemplaza caracteres especiales como tildes y ñ por sus equivalentes sin tildes o con caracteres permitidos, 
 * elimina caracteres no alfanuméricos y reemplaza los espacios por guiones.
 * 
 * @param {string} text - El texto de entrada que se desea convertir en un slug.
 * @returns {string} El slug generado a partir del texto de entrada.
 * 
 * @example
 * const title = "¡Hola, mundo! ¿Cómo estás?";
 * const slug = generateSlug(title);
 * console.log(slug); // "hola-mundo-como-estas"
 */
export const generateSlug = (text) => {
    // Convierte el texto a minúsculas
    let slug = text.toLowerCase();

    // Reemplaza caracteres especiales con guiones
    slug = slug
        .normalize("NFD")                       // Descompone los caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "")        // Elimina los caracteres de acentuación
        .toLowerCase()                          // Convierte a minúsculas
        .replace(/\s+/g, "-")                   // Reemplaza los espacios por guiones
        .replace(/[^\w-]+/g, "");               // Elimina caracteres no alfanuméricos

    return slug;
};

