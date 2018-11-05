import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import Login from './components/account/login';
import Register from './components/account/register';
import Spinner from './Spinner';
import { createStore, applyMiddleware } from 'redux';
import { Provider , connect } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore,  getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { BrowserRouter as Router ,Switch,Route,withRouter } from 'react-router-dom';
import {setUser , clearUser} from './actions/userAction';
import { composeWithDevTools } from "redux-devtools-extension";

import firebaseConfig from './config/firebase';

const store=createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({getFirestore,getFirebase})),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebaseConfig)
    )
);

class Root extends React.Component {
    componentDidMount() {
        firebaseConfig.auth().onAuthStateChanged(user => {
          if (user) {
            console.log(user);
            this.props.setUser(user);
            this.props.history.push("/");
          } else {
            this.props.history.push("/login");
            this.props.clearUser();
          }
        });
    }
    render() {
        return this.props.isLoading ? (
          <Spinner />
        ) : (
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        );
    }
}

const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
});

const RootWithAuth=withRouter(connect(mapStateFromProps,{setUser,clearUser})(Root));

ReactDOM.render(<Provider store={store}>
<Router>
    <RootWithAuth />
</Router>
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
