import './App.css';
import Top from './components/design/Top.jsx';
import Home from './components/gear/main/Home';
import LoginPage from './components/gear/main/LoginPage';
import SideBar from './components/design/SideBar'
import BBSRouting from './components/gear/Routing/BBSRouting';
import NoticeRouting from './components/gear/Routing/NoticeRouting';
/*Modules*/
import { useQuery } from './configs/querySetting';
import { Switch, Route } from 'react-router-dom'

function App() {
  let query = useQuery();

  return (
    <div className="App">
      <Top />
      <div className='homehwamyun'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path={"/notice"} ><NoticeRouting noticeId={query.get("noticeId")}/></Route>
          <Route path={"/freeBoard"}><BBSRouting bbsId={query.get("freebbs")}/></Route>
        </Switch>
        <SideBar />
      </div>
    </div>
  );
}

export default App;
