import Game from './components/Game';
import Auth from  './pages/Auth'
import { Switch, Route } from 'react-router-dom'
import './App.css';

function App() {

  return (
    <Switch>
    <Route path="/auth">
      <Auth/>
        </Route>
          <Route path='/game'>
           <Game/>
          </Route>
        <Route path="/">
       <Auth/>
     </Route>
  </Switch>
  );
}

export default App;
