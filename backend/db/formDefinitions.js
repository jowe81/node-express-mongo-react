import TenantEntity from "./formDefinitions/TenantEntity.js";
import BackendUser from "./formDefinitions/BackendUser.js";
import StandaloneAndTenantUser from "./formDefinitions/StandaloneAndTenantUser.js";
import UserGlobal from "./formDefinitions/UserGlobal.js";

const formDefinitions = {
    backend: {
        UserGlobal,
        User: BackendUser,
        TenantEntity,
    },
    standalone: {
        User: StandaloneAndTenantUser,
    },
    tenant: {
        User: StandaloneAndTenantUser,
    },
};

export default formDefinitions;