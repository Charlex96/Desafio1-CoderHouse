import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar los documentos YAML
const productsSwaggerDocument = yaml.load(path.resolve(__dirname, '../src/docs/products/products.yaml'));
const cartSwaggerDocument = yaml.load(path.resolve(__dirname, '../src/docs/cart/cart.yaml'));

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Documentación de AdoptMe API",
            description: "API pensada para usar de ejemplo en la clase 39-swagger",
        },
    },
    apis: [`${__dirname}/../docs/**/*.yaml`]
};

export default (app) => {
    app.use('/api-docs/products', swaggerUi.serve, swaggerUi.setup(productsSwaggerDocument));
    app.use('/api-docs/cart', swaggerUi.serve, swaggerUi.setup(cartSwaggerDocument));
};
