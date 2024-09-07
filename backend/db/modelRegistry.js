import { buildSchemaFromFormDefinition } from "./schemaHelper.js";
import formDefinitions from "./formDefinitions.js";


/**
 * Returns a schemas object like so:
 * {
 *      backend: {
 *          UserGlobal
 *          User,
 *          OtherModels...
 *      },
 *      standalone: {
 *          User,
 *          ...
 *      }
 *      tenant: {
 *          User,
 *          ...
 *      }
 * }
 */
async function getSchemas(formDefinitions) {
    const schemas = {};

    const rootKeys = Object.keys(formDefinitions); // backend, standalone, tenant
    for (const rootKey of rootKeys) {
        schemas[rootKey] = {};

        for (const key of Object.keys(formDefinitions[rootKey])) {
            schemas[rootKey][key] = await buildSchemaFromFormDefinition(formDefinitions[rootKey][key]);
        }
    }

    return schemas;
}

const modelRegistry = {
    ...await getSchemas(formDefinitions)
};

export default modelRegistry;
