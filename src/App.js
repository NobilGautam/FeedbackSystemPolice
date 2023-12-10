import logo from './logo.svg';
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Feedback from "./components/Feedback"
import { useState } from 'react';





function App() {
  const [user,setUser]=useState("ramesh");

  return (
<div>
  
 
  <Routes>
    <Route path="/" element={<Home/>}></Route>
   {user &&  <Route path="/feedback" element={<Feedback/>}></Route>}
   {/* <Route path="/single/:id" element={<SinglePolice/>}></Route> */}
   {/* <Route path="/form" element={<Form/>}></Route> */}


  </Routes>
 

 
</div>
  );
}

export default App;
