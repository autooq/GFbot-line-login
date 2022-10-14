import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';

function App() {

  const [pictureUrl, setpictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayname] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setuserId] = useState("");

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const initLine= () => {
    liff.init({ liffId: '1657515293-pZdWdW1y' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () =>  {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayname(profile.displayName);
      setpictureUrl(profile.pictureUrl)
      setStatusMessage(profile.statusMessage);
      setuserId(profile.userId);
    }).catch(err => console.error(err));
  }

    useEffect(() => {
      initLine();
    }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div style={{textAlign: "center" }}>
        <h1>React with LINE Login</h1>
        <hr/>
        <img src={pictureUrl} width="300px" height="300px"/>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> { idToken }</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> { displayName }</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> { statusMessage }</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> { userId }</p>

        <button onClick={() => logout() } style={{width: "100%", height: 30 }}>Logout</button>
      </div>
      </header>
    </div>
  );
}

export default App;
