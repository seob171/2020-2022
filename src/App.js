import './App.css';
import {useEffect} from "react";

function App() {

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:3001')

    webSocket.onopen = ()=>{
      console.log('서버와 웹소켓 연결 성공!')
    }

    webSocket.onmessage = (event)=>{
      console.log(event)
      setTimeout(()=>
        webSocket.send('클라이언트에서 답장을 보냅니다 Client.'),2000
      )
    }

    return () => {
      webSocket.close()
    }
  }, []);

  return (
    <div className="App">
      <div>F12를 눌러 console 탭과 network 탭을 확인하세요.</div>

    </div>
  );
}

export default App;
