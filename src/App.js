import {Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Feedback from "./Pages/Feedback"
import {useState } from 'react';
import Navbar from './components/Navbar'
import Single from './Pages/Single';
import Form from './Pages/Form';
import {useAuthState} from "react-firebase-hooks/auth"
import { Auth } from './Firebase';

function App() {
  const [user]=useAuthState(Auth);
  return (
  <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      {user &&  <Route path="/myfeedback" element={<Feedback/>}></Route>}
      <Route path="/single/:id" element={<Single/>}></Route>
     { user && <Route path="/form" element={<Form/>}></Route>}
      </Routes>
  </div>
  );
}

export default App;
