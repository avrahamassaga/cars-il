import './App.css';
import {HashRouter, Routes , Route} from 'react-router-dom'
import HomePage from './pages/homePage/HomePage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
