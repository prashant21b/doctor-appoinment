import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Login } from "./screens/Login";

import { Register } from "./screens/Register";
import { Home } from "./screens/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoutes } from "./components/PublicRoutes";
import { ApplyDoctor } from "./screens/ApplyDoctor";
import Profile from "./screens/Profile";
import { Appoinment } from "./screens/Appoinment";

import { User } from "./screens/User";
import { Doctor } from "./screens/Doctor";
import { Notification } from "./screens/Notification";
const App = () => {
  return (
<>
<BrowserRouter>
<Routes>
<Route path="/" 
element={
  
    <Login/>
   
}
/>
<Route path="/home" 
element={
  <ProtectedRoute>
    <Home/>
    </ProtectedRoute>
}
/>
<Route path="/users" 
element={
  <ProtectedRoute>
    <User/>
    </ProtectedRoute>
}
/>
<Route path="/notification" 
element={
  <ProtectedRoute>
    <Notification/>
    </ProtectedRoute>
}
/>
<Route path="/doctors" 
element={
  <ProtectedRoute>
    <Doctor/>
    </ProtectedRoute>
}
/>
<Route path="/appointments" 
element={
  <ProtectedRoute>
    <Appoinment/>
    </ProtectedRoute>
}
/>
<Route path="/apply-doctor" 
element={
  <ProtectedRoute>
    <ApplyDoctor/>
    </ProtectedRoute>
}
/>
<Route path="/profile" 
element={
  <ProtectedRoute>
    <Profile/>
    </ProtectedRoute>
}
/>
<Route path="/login" element={<PublicRoutes>
  <Login/>
</PublicRoutes>

}/>
<Route path="/register" element={
  <PublicRoutes>
<Register/>
  </PublicRoutes>
}/>


</Routes>
</BrowserRouter>
</>
  );
};

export default App;
