import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'

import Sidebar from './components/Sidebar'
import Topbar from "./components/Topbar";

import AddBrand from "./screens/AddBrand";
import Dashboard from "./screens/Dashboard";
import ViewBrand from "./screens/ViewBrand";
import DataTable from "./screens/DataTable";
import axios from "axios";

function App() {

  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

  return (
    <BrowserRouter>

      <div className="flex">
        <Sidebar />
        <div className="main-content flex-1 bg-gray-200">
          <Topbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="brands" element={<DataTable />} />
            <Route path="brands/add" element={<AddBrand />} />
            <Route path="/brands/view/:id" element={<ViewBrand />} />
            <Route path="/brands/edit/:id" element={<AddBrand />} />
            <Route path="products" element={<DataTable />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
