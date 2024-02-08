import './App.css';
import ChatPage from './Screens/ChatPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
    
    <Routes>


      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chatpage" element={<ChatPage />} />




    </Routes>

    </Router>
    </>
  );
}

export default App;
