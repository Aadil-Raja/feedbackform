import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feedback from "./components/Feedback";
import Login from "./components/Login/Login";
import ProtectedRouteWigwam from "./components/utils/ProtectedRoute";


import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRouteWigwam />}>
          <Route path="/feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
