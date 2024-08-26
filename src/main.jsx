import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Spot from "./pages/Spot";
import ContactForm from "./pages/ContactForm";
import "./index.css";
import { SpotsProvider } from "./components/spotsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SpotsProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="spot" element={<Spot />} />
          <Route path="contacts" element={<ContactForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </SpotsProvider>,
);
