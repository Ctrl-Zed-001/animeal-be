import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'

import Sidebar from './components/Sidebar'
import Topbar from "./components/Topbar";

import AddBrand from "./screens/Brands/AddBrand";
import Dashboard from "./screens/Dashboard";
import ViewBrand from "./screens/Brands/ViewBrand";
import AllBrands from "./screens/Brands/AllBrands";
import axios from "axios";
import AllProducts from "./screens/Products/AllProducts";
import AddProduct from "./screens/Products/AddProduct";


function App() {

  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

  return (
    <BrowserRouter>

      <div className="flex">
        <Sidebar />
        <div className="main-content flex-1 ml-64">
          <Topbar />

          <div className="mt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="brands" element={<AllBrands />} />
              <Route path="brands/add" element={<AddBrand />} />
              <Route path="brands/view/:id" element={<ViewBrand />} />
              <Route path="brands/edit/:id" element={<AddBrand />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="/products/add" element={<AddProduct />} />
            </Routes>
          </div>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
