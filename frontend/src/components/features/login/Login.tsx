import { atom, useRecoilState } from 'recoil';

import styles from './LoginRegister.module.scss';
import { useState } from 'react';
import api from '../../../helpers/generalHelper';
import { useError } from "../../../contexts/ErrorContext";

function Login() {
    const permissionMapState = atom({key: 'permissionMap', default: {}});
    const [permissionMap, setPermissionMap] = useRecoilState(permissionMapState);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { showError, clearError } = useError();

    async function handleClick() {        
        // Clear any error from previous attempt.
        clearError();
        
        api
            .post("auth/login", { email, password })
            .then(data => {
                console.log('data', data)
                if (!data.success) {
                    showError(data.message);    
                }

                setPermissionMap(data.permissionMap);
            })
            .catch(err => {
                console.log('error', err);
                showError(err.message)
            })
    }

    return (
        <div className={styles.loginContainer}>
            <label>Email address:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button className={styles.submit} onClick={handleClick}>
                Login
            </button>
        </div>
    );
}

export default Login;