import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import GlobalStyles from '~/components/GlobalStyles';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { ShopProvider } from './Shop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <ShopProvider>
                <HelmetProvider>
                    <PayPalScriptProvider deferLoading={true}>
                            <App />
                    </PayPalScriptProvider>
                </HelmetProvider>
            </ShopProvider>
        </GlobalStyles>
    </React.StrictMode>,
);
