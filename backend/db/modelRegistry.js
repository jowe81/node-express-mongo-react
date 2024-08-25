import UserGlobal from "./schemas/UserGlobal.js";
import BackendUser from "./schemas/BackendUser.js";
import StandaloneUser from "./schemas/StandaloneAndTenantUser.js";
import TenantUser from "./schemas/StandaloneAndTenantUser.js";

// Add more schemas here as needed
const modelRegistry = {
    backend: {
        UserGlobal,
        User: BackendUser,
    },
    standalone: {
        User: StandaloneUser,
    },
    tenant: {
        User: TenantUser,
    },
};

export default modelRegistry;
