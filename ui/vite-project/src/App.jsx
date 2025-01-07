import { BrowserRouter, Routes, Route } from "react-router-dom";

import Feedback  from "./components/Feedback";'../src/components/Feedback'
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
function App() {
  return (
    <>
      <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<Feedback />} />
        
        
        </Routes>
  
      </BrowserRouter>
    </>
  );
}

export default App;