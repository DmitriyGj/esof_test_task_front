import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import {publicRoutes, privateRoutes} from './constants/routes';
import {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext } from './context/usercontext';

function App() {
  const {user} = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();

  const routesToRender = [...publicRoutes,
  ...( user ? privateRoutes: [])]

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    else{
      navigate('/tasks')
    }
  },[user])

  return (

    <div className="App">
        <Routes>
          {routesToRender.map((routeprops,index) =>(<Route key={`/route${index}`} {...routeprops} />) )}
        </Routes>
    </div>
  );
}

export default App;
