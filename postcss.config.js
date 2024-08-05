import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindNesting from "@tailwindcss/nesting";

export default {
  plugins: [tailwindNesting, tailwindcss, autoprefixer],
};
