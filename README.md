# Tutor de Inglés con Claude listo para publicar en Internet

Este proyecto está preparado para Vercel. Tus clientes solo verán un link público y tu API key queda oculta en las variables de entorno.

## Pasos rápidos con Vercel

1. Crea una cuenta en https://vercel.com
2. Sube esta carpeta a un repositorio de GitHub.
3. En Vercel, selecciona Add New Project e importa el repositorio.
4. En Settings > Environment Variables agrega:
   - ANTHROPIC_API_KEY = tu clave real de Anthropic
   - CLAUDE_MODEL = claude-haiku-4-5-20251001
5. Presiona Deploy.
6. Vercel te dará un link público tipo https://tu-proyecto.vercel.app

## Prueba local opcional

Instala Node.js y ejecuta:

npm install
npx vercel dev

Luego abre http://localhost:3000
