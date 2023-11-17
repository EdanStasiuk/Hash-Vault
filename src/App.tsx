import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import StepOne from './Pages/NewWallet/StepOne';
import StepTwo from './Pages/NewWallet/StepTwo';
import StepThree from './Pages/NewWallet/StepThree';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Landing />}/>
          <Route path="/NewWallet/StepOne" element={<StepOne />} />
          <Route path="/NewWallet/StepTwo" element={<StepTwo />} />
          <Route path="/NewWallet/StepThree" element={<StepThree />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;