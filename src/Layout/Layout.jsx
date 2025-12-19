import React from 'react';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import PostCropnames from '../Components/PostCropnames';
import Order from '../Components/Order';


 

function Layout() {
  return (
    <div>
        <BrowserRouter>

    <Routes>
       
        <Route path="/PostCropnames" element={<PostCropnames />} />
         <Route path="/Order" element={<Order />} />
      </Routes>
   
    </BrowserRouter>
    </div>
  )
}

export default Layout
