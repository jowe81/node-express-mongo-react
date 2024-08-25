import { atom, useRecoilState } from 'recoil';

import styles from './LoginRegister.module.scss';
import { useState } from 'react';
import api from '../../../helpers/generalHelper';
import { useFlashMessage } from "../../../contexts/FlashMessageContext.tsx";

function Login() {
    //const permissionMapState = atom({key: 'permissionMap', default: {}});
    //const [permissionMap, setPermissionMap] = useRecoilState(permissionMapState);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountIndex, setAccountIndex] = useState(0);
    const [accountsInfo, setAccountsInfo] = useState([]);

    const { flashError, clearFlash } = useFlashMessage();

    const accountSelectorActive = accountsInfo.length > 1;

    async function handleLoginBtnClick() {        
        // Clear any error from previous attempt.
        clearFlash();

        // Construct payload.
        const payload: any = {};

        payload.email = email;
        payload.password = password;

        if (accountsInfo.length > 1) {
            // The account selector is active, send back the info for the selected account.
            const accountInfo: any = accountsInfo[accountIndex];
            payload.accountType = accountInfo.accountType;
            payload.userDbName = accountInfo.userDbName;
        }

        api.post("auth/login", payload)
            .then((res) => {
                console.log("data", res);
                if (!res.success) {
                    return flashError(res.message);
                }

                const data = res.data;

                if (Array.isArray(data.accountsInfo)) {
                    setAccountsInfo(data.accountsInfo);
                }
                //setPermissionMap(data.permissionMap);
            })
            .catch((err) => {
                console.log("error", err);
                flashError(err.message);
            });
    }

    function handleSelectAccount(e) {
        const selectedIndex = e.target.value;
        setAccountIndex(selectedIndex);
    }

    return (
        <div className={styles.loginContainer}>
            {!accountSelectorActive && <></>}
            <label>Email address:</label>
            <input type="text" value={email} disabled={accountSelectorActive} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {accountSelectorActive && (
                <>
                    <label>Account:</label>
                    <select value={accountIndex} onChange={handleSelectAccount}>
                        {accountsInfo.map((accountInfo: any, index: number) => (
                            <option key={index} value={index}>
                                {accountInfo.label}
                            </option>
                        ))}
                    </select>
                </>
            )}
            <button className={styles.submit} onClick={handleLoginBtnClick}>
                Login
            </button>
        </div>
    );
}

export default Login;