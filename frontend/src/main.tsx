import React from 'react'
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client'
import { FlashMessageProvider } from './contexts/FlashMessageContext'; // Adjust the path as needed
import DynamicRoutes from './dynamicRoutes';
import './globalStyles/index.scss'
import "./globalStyles/formElements.scss"


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RecoilRoot>
            <FlashMessageProvider>                
                <DynamicRoutes />
            </FlashMessageProvider>
        </RecoilRoot>
    </React.StrictMode>
);

