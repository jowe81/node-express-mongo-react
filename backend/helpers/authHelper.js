import { getBackendModel, getStandaloneModel, getTenantModel } from "../db/getModel.js";
import getLogger from "../utilities/log.js";

const log = getLogger();

async function registerUser(accountType, email, password, tenantId = null) {
    async function registerBackendUser(email, password) {
        const BackendUser = await getBackendModel("BackendUser");
        const backendUser = await BackendUser.create({ email, password });
        log.info(`Created backend user ${backendUser._id} (${backendUser.email}).`);
        return backendUser;
    }

    const userGlobalData = { 
        accountType,
        email,
    };

    switch (accountType) {
        case "backend":
            const backendUser =  await registerBackendUser(email, password);
            userGlobalData.userDbName = "backend";
            userGlobalData.userRecordId = backendUser._id;
            break;
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

    const accountsInfo = userGlobalRecords.map(record => {
        let label;
        const { accountType, userRecordId, userDbName } = record;

        switch (accountType) {
            case "backend":
                label = "Backend";
                break;

            case "standalone":
                label = "Standalone User";
                break;

            case "tenant":
                label = "<Tenant Entity Name>";
                break;
        }

        return {
            accountType,
            label,
            userRecordId,
            userDbName,
        }
    });

    return accountsInfo;
}

async function verifyUserCredentials(accountType, userDbName, credentials) {
    const { email, password } = credentials;
    if (!email || !password || !accountType || !userDbName) {
        log.error(`verifyUserCredentials: Parameters missing`);
        return null;
    }

    let User;

    switch(accountType) {
        case "backend":
            User = await getBackendModel("BackendUser");
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
        return null;;
    }

    const passwordMatches = await user.matchPassword(password);
    if (!passwordMatches) {
        log.info(`Failed verification for ${email} on ${userDbName}.`);
        return null;
    }
     
    // Login successful.
    log.info(`Successful verification for ${email} on ${userDbName}.`);
    return { status: "success", userInfo: user.toObject() };
}

export { getAccountsInfoFromEmail, registerUser, verifyUserCredentials };