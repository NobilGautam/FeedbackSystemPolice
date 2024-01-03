import {Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Feedback from "./Pages/Feedback"
import Navbar from './components/Navbar'
import Single from './Pages/Single';
import Form from './Pages/Form';
import {useAuthState} from "react-firebase-hooks/auth"
import { Auth } from './Firebase';
import Error from './Pages/Error';
import Chat from './Chat';
import NewVisit from './Pages/NewVisit';
import MyVisits from './Pages/MyVisits';

function App() {
  const [user]=useAuthState(Auth);
  return (
  <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      {user &&  <Route path="/myfeedback" element={<Feedback/>}></Route>}
      <Route path="/single/:id" element={<Single/>}></Route>
      { user && <Route path="/myVisits" element={<MyVisits/>}></Route>}
      { user && <Route path="/chat" element={<Chat/>}></Route>}
      { user && <Route path='/newFeedback/:documentId' element={<Form/>} />}
      <Route path="/newVisit" element={<NewVisit />} />
      <Route path="*" element={<Error/>}></Route>

      </Routes>
  </div>
  );
}

export default App;
