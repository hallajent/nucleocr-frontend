// postcss.config.js
export default {
  plugins: {
    /* 
      On utilise désormais le plugin "@tailwindcss/postcss" au lieu de "tailwindcss" 
      pour l’étape PostCSS. 
    */
    '@tailwindcss/postcss': {},
    autoprefixer: {}
  }
};
