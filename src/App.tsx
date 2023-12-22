import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import StepOne from './pages/NewWallet/StepOne';
import StepTwo from './pages/NewWallet/StepTwo';
import StepThree from './pages/NewWallet/StepThree';
import StepFour from './pages/NewWallet/StepFour';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Landing />}/>
          <Route path="/NewWallet/StepOne" element={<StepOne />} />
          <Route path="/NewWallet/StepTwo" element={<StepTwo />} />
          <Route path="/NewWallet/StepThree" element={<StepThree />} />
          <Route path="/NewWallet/StepFour" element={<StepFour />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;