import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Spot from "./pages/Spot";
import ContactForm from "./pages/ContactForm";
import "./index.css";
import { SpotsProvider } from "./components/spotsContext";
import Category from "./pages/Category";
import Backstage from "./Backstage";
import Login from "./pages/Login";
import SpotManage from "./pages/SpotManage";
import CarouselManage from "./pages/CarouselManage";
import FormManage from "./pages/FormManage";
import StatisticsDashboard from "./pages/StatisticsDashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SpotsProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="spot" element={<Spot />} />
          <Route path="contacts" element={<ContactForm />} />
          <Route path="category" element={<Category />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        {/* 新增 Backstage 路由 */}
        <Route path="/backstage" element={<Backstage />}>
          <Route path="login" element={<Login />} />
          <Route path="spot-manage" element={<SpotManage />} />
          <Route path="carousel-manage" element={<CarouselManage />} />
          <Route path="form-manage" element={<FormManage />} />
          <Route path="index" element={<StatisticsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </SpotsProvider>,
);
