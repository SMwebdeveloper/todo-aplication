import './App.css';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Navbar from './Navbar';
import Home from './component/Home/Home';
import Todo from './component/Todo/Todo';
import Create from './component/Create/Create';

function App() {
  return (
    <div>
    <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/todo/:id' element={<Todo/>} />
          <Route path='/create' element={<Create/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
