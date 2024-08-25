import mongoose from "mongoose";
import modelRegistry from "./modelRegistry.js";
import connectionManager from "./connectionManager.js";

async function getBackendModel(modelName) {
    const connection = await connectionManager.getBackendConnection();
    return getModel(connection, "backend", modelName);
}

async function getStandaloneModel(modelName) {
    const connection = await connectionManager.getStandaloneConnection();
    return getModel(connection, "standalone", modelName);
}

async function getTenantModel(tenantDbName, modelName) {
    const connection = await connectionManager.getTenantConnection(tenantDbName);
    return getModel(connection, "tenant", modelName);
}


async function getModel(connection, modelContext, modelName) {
    if (!modelContext || !modelName) {
        throw new Error(`getModel: modelContext and modelName are required.`);
    }

    // Check if the model is already registered
    if (connection.models[modelName]) {
        return connection.models[modelName];
    }

    // Get the schema from the registry
    const schema = modelRegistry[modelContext][modelName];
    if (!schema) {
        throw new Error(`Model schema for ${modelContext} model '${modelName}' not found`);
    }

    // Create and return the model
    return connection.model(modelName, schema);
}


export { getBackendModel, getStandaloneModel, getTenantModel };
