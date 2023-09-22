import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <HeaderComponent/>
            <div className="container">
              <Routes>
                  <Route exact path = "/" Component={ListEmployeeComponent}></Route>
                  <Route exact path = "/employees" Component={ListEmployeeComponent}></Route>
                  <Route exact path = "/add-employee" Component={AddEmployeeComponent}></Route>
                  <Route exact path = "/edit-employee/:id" Component={AddEmployeeComponent}></Route>                           
              </Routes>
              </div>
          {/* <FooterComponent/> */}
          </div>
      </Router>
    </div>    
  );
}

export default App;
