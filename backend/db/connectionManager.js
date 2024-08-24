import mongoose from "mongoose";
import dotenv from "dotenv";
import getLogger from "../utilities/log.js";

dotenv.config();
const log = getLogger();

class ConnectionManager {
    constructor() {
        // Singleton: Only one instance of this can exist.
        if (!ConnectionManager.instance) {
            this.connections = {}; // Cache to store connections
            ConnectionManager.instance = this;
        }

        return ConnectionManager.instance;
    }

    async init() {
        return this.getBackendConnection();
    }

    async getTenantConnection(tenantDbName) {
        const fullTenantDbName = `${provess.env.DB_TENANT_PREFIX}${tenantDbName}`;
        return this.#getConnection(fullTenantDbName);
    }

    async getBackendConnection() {
        return this.#getConnection(process.env.DB_BACKEND);
    }

    async getStandaloneConnection() {
        return this.#getConnection(process.env.DB_STANDALONE);
    }

    async #getConnection(dbName) {
        if (this.connections[dbName]) {
            return this.connections[dbName];
        }

        const mongoURI = process.env.MONGO_URI + dbName;
        const connection = await mongoose.createConnection(mongoURI, {});

        this.connections[dbName] = connection;
        log.info(`Connected to database '${dbName}'`);
        return connection;
    }
}

const instance = new ConnectionManager();
Object.freeze(instance);

export default instance;
