import './App.css';
import List from './containers/pages/List'
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/users/list'} component={List} />
          <Route path={'*'}>
            <Redirect to="/users/list" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
