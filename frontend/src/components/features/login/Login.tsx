import styles from './LoginRegister.module.scss';
import { useState } from 'react';
import api from '../../../helpers/generalHelper';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleClick() {        
        const data = await api.post("auth/login", { email, password });
        console.log('response data', data);
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