import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Etc */
import './assets/css/common.css';
import './assets/css/util.css';
import './assets/css/login.css';
import './assets/css/sidebar.css';
/* Login */
import Login from './components/Login';
/* Main */
import Body from './components/Body'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
            <Body />
            <Footer />
            </>
          }></Route>
          <Route path='/login' element={
            <Login />
          }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
