import express from 'express';
import dotenv from 'dotenv';
import getLogger from '../utilities/log.js';
import { protect } from '../middleware/auth.js';
import { registerUser, getAccountsInfoFromEmail, verifyUserCredentials } from "../helpers/authHelper.js";

dotenv.config();
const log = getLogger('auth');
const router = express.Router();

router.post("/register", async (req, res) => {
    const { accountType, email, password } = req.body;
    try {
        await registerUser(accountType, email, password);
        res.json({ success: true, data: {}});
    } catch (error) {
        let { message } = error;
        switch (error.code) {
            case 11000:
                message = `An account has already been registered with this email.`;
                break;
        }
        res.status(400).json({ message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let { accountType, userDbName } = req.body;

    try {
        const accountsInfo = await getAccountsInfoFromEmail(email);
        if (accountsInfo.length === 0) {
            // No account exists for this user.
            throw new Error(`Invalid credentials.`);
        }

        if (!accountType) {
            // Get here after initial submit (just email and password).
            if (accountsInfo.length > 1) {
                // There are multiple accounts for this user - they need to choose one.
                log.info(`Have ${accountsInfo.length} account(s) for ${email} - user needs to choose.`);
                return res.json({ success: true, data: { accountsInfo } });
            } else {
                // There's only one account - can proceed to login.
                userDbName = accountsInfo[0].userDbName;
                accountType = accountsInfo[0].accountType;
            }
        } else {
            // Get here after account disambiguation: account has been chosen, can proceed to login.
            log.info(`There are multiple accounts - User chose one.`);
        }

        // Now we know which account is being signed into.
        log.info(`Signing into account type ${accountType}, database ${userDbName}...`);

        const credentials = { email, password };
        const result = await verifyUserCredentials(credentials, accountType, userDbName);
        if (!result) {
            // Login failed.
            throw new Error(`Invalid credentials.`);
        }

        switch (result.status) {
            case "success":
                // Login successful.
                return res.json({ success: true, data: { userInfo: result.userInfo } });

            case "mfa":
                // Need more credentials.
                return res.json({ success: true, mfa: {} });
        }

        return res.status(500);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
});

router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

export default router;
