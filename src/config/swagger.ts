import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tu API',
      version: '1.0.0',
      description:
        'SoundScape is a RESTful API that empowers you to create personalized playlists based on your mood and music preferences.',
    },
  },
  apis: ['./src/routes/*.ts'], // Rutas de tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);
