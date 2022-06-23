import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'

import Brands from './screens/Brands'
import Sidebar from './components/Sidebar'
import Topbar from "./components/Topbar";
import AddBrand from "./screens/AddBrand";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="main-content flex-1 bg-gray-200">
          <Topbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="brands" element={<Brands />} />
            <Route path="brands/add" element={<AddBrand />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
