import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import reportWebVitals from "./reportWebVitals";
import firebase from "./firebase";
import Spinner from "./components/Spinner";

import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./actions";
import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        if (window.location.pathname === "/login") {
          this.props.history.push("/login");
          this.props.clearUser();
        } else if (window.location.pathname === "/register") {
          this.props.history.push("/register");
          this.props.clearUser();
        } else {
          this.props.history.push("/login");
          this.props.clearUser();
        }
      }
    });
  }
  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    isLoading: state.user.isLoading,
  };
};

const RootWithAuth = withRouter(
  connect(mapStatesToProps, { setUser, clearUser })(Root)
); // we have used connect function here to
// give the setUser action as props to Root

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
