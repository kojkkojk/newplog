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
import Update from './components/gear/main/Update';
import IMGUpload from './components/gear/main/IMGUpload';
import GalleryRouting from './components/gear/Routing/GalleryRouting';
import Prologue from './components/gear/sub/Prologue';
import Event from './components/gear/main/Event';

/*Modules*/
import { useEffect, useState } from 'react';
import { useQuery } from './configs/querySetting';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loginUser } from './redux/action/authAct'
import { GiHamburgerMenu } from 'react-icons/gi'
import { hashremember } from './redux/action/hashact';

function App() {
  const query = useQuery();
  const auth = getAuth();
  const [userOn, setUserOn] = useState(null);
  const [slides, setSlides] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()
  const nowHash = window.location.hash
  
  const handleSide = () => {
    setSlides(!slides)
  }
  const hashChange = () => {
    setSlides(false)
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserOn(user)
      dispatch(loginUser(user))
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(hashremember())
  }, [nowHash])

  return (
    <div className="App">
      <Top />
      <div className='homehwamyun'>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute restricted={true} component={LoginPage} path={"/login"} exact></PublicRoute>
          <PrivateRoute component={Write} path="/create" exact></PrivateRoute>
          <PrivateRoute component={IMGUpload} path="/outstargram" exact></PrivateRoute>
          <PrivateRoute component={Event} path="/eventplus" exact></PrivateRoute>
          <Route path={"/update/:updateIndex"}><Update contentsIndex={query.get("contentid")} /></Route>
          <Route path={"/notice"} ><NoticeRouting userOn={userOn} noticeId={query.get("noticeId")} /></Route>
          <Route path={"/gallery"} ><GalleryRouting userOn={userOn} galleryId={query.get("galleryId")} /></Route>
          <Route path={"/freeBoard"}><BBSRouting userOn={userOn} bbsId={query.get("freebbs")} /></Route>
          <Route path={"/prologue"}><Prologue /></Route>
          <Route path={"/"}>404 ERORR</Route>
        </Switch>
        <div className="bbtn" onClick={() => {
          handleSide()
          window.onhashchange = hashChange
        }}>
          <GiHamburgerMenu />
        </div>
        <SideBar userOn={userOn} slides={slides} />
      </div>
    </div>
  );
}

export default App;
