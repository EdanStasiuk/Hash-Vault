import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import StepOne from './pages/NewWallet/Software/StepOne';
import StepTwo from './pages/NewWallet/Software/StepTwo';
import StepThree from './pages/NewWallet/Software/StepThree';
import StepFour from './pages/NewWallet/Software/StepFour';
import ExistingWalletOptions from './pages/ImportWallet/ExistingWalletOptions';
import NewWalletOptions from './pages/NewWallet/NewWalletOptions';
import Dashboard from './pages/Wallet/Dashboard';

function App() {
  return (
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
  );
}

export default App;