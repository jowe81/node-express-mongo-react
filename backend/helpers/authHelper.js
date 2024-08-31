import { getBackendModel, getStandaloneModel, getTenantModel } from "../db/getModel.js";
import getLogger from "../utilities/log.js";

const log = getLogger();

async function registerUser(accountType, email, password, tenantId = null) {
    async function registerBackendUser(email, password) {
        const BackendUser = await getBackendModel("User");
        const backendUser = await BackendUser.create({ email, password });
        log.info(`Created backend user ${backendUser._id} (${backendUser.email}).`);
        return backendUser;
    }

    async function registerStandaloneUser(email, password) {
        const StandaloneUser = await getStandaloneModel("User");
        const standaloneUser = await StandaloneUser.create({ email, password });
        log.info(`Created standalone user ${standaloneUser._id} (${standaloneUser.email}).`);
        return standaloneUser;
    }

    const userGlobalData = { 
        accountType,
        email,
    };

    let userCreated = false;

    switch (accountType) {
        case "backend":
            const backendUser =  await registerBackendUser(email, password);
            userGlobalData.userDbName = "backend";
            userGlobalData.userRecordId = backendUser._id;
            userCreated = true;
            break;

        case "standalone":
            const standaloneUser = await registerStandaloneUser(email, password);
            userGlobalData.userDbName = "standalone";
            userGlobalData.userRecordId = standaloneUser._id;
            userCreated = true;
            break;

    }

    if (!userCreated) {
        log.error(`Failed to create account of type ${accountType} for ${email}.`);
        throw new Error("Failed to create account.");
        return;
    }

    const UserGlobal = await getBackendModel("UserGlobal");
    const userGlobal = await UserGlobal.create(userGlobalData);
    log.info(`Created global user ${userGlobal._id} (${userGlobal.email})`);
    return userGlobal;
}


/**
 * Return all account types that the email has accounts registered with.
 * @param {string} email 
 */
async function getAccountsInfoFromEmail(email) {
    const UserGlobal = await getBackendModel("UserGlobal");
    const userGlobalRecords = await UserGlobal.find({email});

    const accountsInfo = userGlobalRecords.map((record) => {
        let label, userDbName;
        const accountType = record.accountType;        

        switch (accountType) {
            case "backend":
                label = "Backend";
                break;

            case "standalone":
                label = "Standalone User";
                break;

            case "tenant":
                label = "<Tenant Entity Name>";
                userDbName = record.userDbName;
                break;
        }

        return {
            accountType,
            label,
            userDbName,
        }
    });

    return accountsInfo;
}

async function verifyUserCredentials(credentials, accountType, userDbName = null) {
    const { email, password } = credentials;
    if (!email || !password || !accountType) {
        log.error(`verifyUserCredentials: Parameters missing`);
        return null;
    }

    let User;

    switch (accountType) {
        case "backend":
            User = await getBackendModel("User");
            break;

        case "standalone":
            User = await getStandaloneModel("User");
            break;

        case "tenant":
            User = await getTenantModel(userDbName, "User");
            break;

        default:
            log.error(`verifyUserCredentials: bad account type '${accountType}'`);
            return null;
    }

    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }

    const passwordMatches = await user.matchPassword(password);
    if (!passwordMatches) {
        log.info(`Verification failed for ${email}.`);
        return null;
    }

    // Login successful.
    log.info(`Verification successful for ${email}.`);
    return { status: "success", user };
}

export { getAccountsInfoFromEmail, registerUser, verifyUserCredentials };