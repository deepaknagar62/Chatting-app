import './App.css';
import UserState from './Components/UserProvider';
import ChatPage from './Screens/ChatPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <> 
    <UserState> 
    
    
    <Router>
    
    <Routes>


      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chatpage" element={<ChatPage />} />




    </Routes>

    </Router>
    
    
    </UserState>

    </>
  );
}

export default App;
