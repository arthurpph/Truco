import { useEffect } from "react";
import Game from "./pages/Game/Game";

const App = () => {
  useEffect(() => {
    // const socket = getSocketConnection();
    // socket.createRoom({
    //   name: "test",
    //   leaderName: "nome teste" 
    // },
    // () => {});
  }, []);

  return (
    <Game/>
  );
}

export default App
