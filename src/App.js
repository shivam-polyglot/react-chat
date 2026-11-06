import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";

const activeRoom = {
  id: "general",
  name: "Our Chat",
  isPrivate: false,
};

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="app-shell">
        <ChatBox activeRoom={activeRoom} />
      </div>
      <footer className="app-footer">
        Just the two of us ❤️
      </footer>
    </div>
  );
}

export default App;
