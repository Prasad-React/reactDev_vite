import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Layout/NavBar";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
// import LatestNews from "./Components/LatestNews";
// import PageWrapper from "./Components/Pagewrapper";
import Order from "./Components/Order";
// import SqlEditor from "./Components/SqlEditor";
import SqlEditor from "./SqlEditor/SqlEditor"


function App() {

    const [isOpen, setIsOpen] = useState(false);
  return (
    <BrowserRouter>
      <Header />
      <NavBar setIsOpen={setIsOpen} />

         <Routes>
        
        {/* <Route path="/" element={<PageWrapper></PageWrapper>} /> */}
           <Route
          path="/sidebar"
          element={<SqlEditor isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
         <Route
          path="/"
          element={<SqlEditor isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route path="/Order" element={<Order />} />
        </Routes>
        <Routes>
    


        {/* <Route path="/" element={<LatestNews></LatestNews>} /> */}
       
    
      </Routes>


      <Footer />
    </BrowserRouter>
  );
}

export default App;
