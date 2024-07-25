import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import StepOne from './pages/NewWallet/Software/StepOne';
import StepTwo from './pages/NewWallet/Software/StepTwo';
import StepThree from './pages/NewWallet/Software/StepThree';
import StepFour from './pages/NewWallet/Software/StepFour';
import ExistingWalletOptions from './pages/ImportWallet/ExistingWalletOptions';
import NewWalletOptions from './pages/NewWallet/NewWalletOptions';
import Dashboard from './pages/Wallet/Dashboard';
import { getSettingsFromLocalStorage } from './functions/storageFunctions';
import { PasswordVisibilityProvider } from './config/contexts/PasswordVisibilityContext';

export default function App() {


  // Make dark mode the default
  useEffect(() => {
    const savedSettings = getSettingsFromLocalStorage();
    if (savedSettings === undefined || !savedSettings.lightTheme) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <PasswordVisibilityProvider>
      <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Landing />}/>
            <Route path="/NewWallet/Software/StepOne" element={<StepOne />} />
            <Route path="/NewWallet/Software/StepTwo" element={<StepTwo />} />
            <Route path="/NewWallet/Software/StepThree" element={<StepThree />} />
            <Route path="/NewWallet/Software/StepFour" element={<StepFour />} />
            <Route path="/ImportWallet/ExistingWalletOptions" element={<ExistingWalletOptions/>} />
            <Route path="/NewWallet/NewWalletOptions" element={<NewWalletOptions/>} />
            <Route path="/Wallet/Dashboard" element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
    </PasswordVisibilityProvider>
  );
}
