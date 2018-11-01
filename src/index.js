import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import Login from './components/account/login';
import Register from './components/account/register';
import { BrowserRouter as Router ,Switch,Route,withRouter } from 'react-router-dom';



class Root extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path ="/" component={App} />
                <Route path ="/login" component={Login} />
                <Route path ="/register" component={Register} />
            </Switch>
        )
    }
}

const RootWithAuth=withRouter(Root);

ReactDOM.render(
<Router>
    <RootWithAuth />
</Router>, document.getElementById('root'));
serviceWorker.unregister();
