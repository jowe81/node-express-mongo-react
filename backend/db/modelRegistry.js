import UserGlobal from "./schemas/UserGlobal.js";
import BackendUser from "./models/BackendUser.js";

// Add more schemas here as needed
const modelRegistry = {
    backend: {
        UserGlobal,
        BackendUser,
    },
    standalone: {

    },
    tenant: {

    },    
};

export default modelRegistry;
