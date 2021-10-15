import './App.css';
import Top from './components/design/Top.jsx';
import Home from './components/gear/main/Home';
import LoginPage from './components/gear/main/LoginPage'
import {Switch,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Top/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
