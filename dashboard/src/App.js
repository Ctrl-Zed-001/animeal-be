import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'

import Brands from './screens/Brands'
import Sidebar from './components/Sidebar'
import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="main-content flex-1 bg-gray-200">
        <Topbar />
        <BrowserRouter>
          <Routes>
            <Route path="/brands" element={<Brands />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
