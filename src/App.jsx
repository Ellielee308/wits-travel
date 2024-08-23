import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <Button className="bg" variant="outline">
        Hello
      </Button> */}
    </>
  );
}

export default App;
