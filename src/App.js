import Game from './components/Game';
import { Switch, Route } from 'react-router-dom'
import './App.css';

function App() {

  return (
    <Switch>
      <Route path='/'>
      <Game/>
      </Route>
    </Switch>
  );
}

export default App;
