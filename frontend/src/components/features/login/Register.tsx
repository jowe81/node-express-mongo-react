import styles from './LoginRegister.module.scss';
import { useState } from 'react';
import api from '../../../helpers/generalHelper';
import { useNavigate } from 'react-router-dom';
import { useFlashMessage } from '../../../contexts/FlashMessageContext.tsx';

function Register(props: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("backend");

    const navigate = useNavigate();
    const { flashError, flashMessage } = useFlashMessage();

    async function handleClick() {        
        api
            .post("auth/register", { accountType, email, password })
            .then(data => {
                if (!data.success) {
                    flashError(data.message);
                    return;
                }
                console.log('Response data', data);
                flashMessage(`Account registered successfully. You may login now.`, 5000, 1);
                navigate("/login");
            });        
    }

    return (
        <div className={styles.loginContainer}>
            <label>Account Type:</label>
            <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                <option value="backend">Backend User</option>
                <option value="standalone">Standalone User</option>
                <option value="tenant">Tenant User</option>
            </select>
            <label>Email Address:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className={styles.submit} onClick={handleClick}>
                Register
            </button>
        </div>
    );
}

export default Register;