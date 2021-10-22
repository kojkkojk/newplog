import './App.css';
import Top from './components/design/Top.jsx';
import Home from './components/gear/main/Home';
import LoginPage from './components/gear/main/LoginPage';
import SideBar from './components/design/SideBar'
import BBSRouting from './components/gear/Routing/BBSRouting';
import NoticeRouting from './components/gear/Routing/NoticeRouting';
import PublicRoute from './components/gear/Public-Private/PublicRoute';
import Write from './components/gear/main/Write';
import PrivateRoute from './components/gear/Public-Private/PrivateRoute';
/*Modules*/
import { useQuery } from './configs/querySetting';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loginUser } from './redux/action/authAct'
import { useEffect, useState } from 'react';

function App() {
  const query = useQuery();
  const auth = getAuth();
  const [userOn, setUserOn] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserOn(user)
      dispatch(loginUser(user))
    })
  }, [dispatch])
  return (
    <div className="App">
      <Top/>
      <div className='homehwamyun'>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute restricted={true} component={LoginPage} path={"/login"} exact></PublicRoute>
          <PrivateRoute component={Write} path="/create" exact></PrivateRoute>
          <Route path={"/notice"} ><NoticeRouting noticeId={query.get("noticeId")} /></Route>
          <Route path={"/freeBoard"}><BBSRouting bbsId={query.get("freebbs")} /></Route>
        </Switch>
        <SideBar userOn={userOn}/>
      </div>
    </div>
  );
}

export default App;
