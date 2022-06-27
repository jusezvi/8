import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Registration from './LoginRegister/registerRender';
import Login from './LoginRegister/loginRender'
import { useState } from 'react';

import AddNewBook from './AddNewBook';
import EditBook from './EditBook';


function App() {

  const [test, setTest] = useState(null)


  return (
    <div className="app">

      <BrowserRouter>
        <Routes>
          <Route>
            <Route exact path="/" element={<Home setTest={setTest} />} />

            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/add" component={<AddNewBook />}  />
            <Route path="/edit/:id" component={<EditBook />}  />


          </Route>
        </Routes>
      </BrowserRouter>

      {test}
    </div>
  );
}

export default App;
