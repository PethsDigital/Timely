import "./assets/css/styles.min.css";
import Player from "./contexts/PlayerContextWrap";
import TimeContextWrap from "./contexts/TimeContextWrap";
import Play from "./pages/Play";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Form from "./pages/Form";

function App() {
  return (
    <Router>
      <div className="App">
        <TimeContextWrap>
          <Player>
            <main>
              <Switch>
                <Route exact path="/">
                  <Form />
                </Route>
                <Route exact path="/play">
                  <Play />
                </Route>
              </Switch>
            </main>
          </Player>
        </TimeContextWrap>
      </div>
    </Router>
  );
}

export default App;
