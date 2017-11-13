import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Navigation from './containers/navigation';
import Home from './containers/home';
import RssView from './containers/rssView';

import GlobalAlert from './components/globalAlert';
import 'react-select/dist/react-select.css';
import './styles/baseStyles.css';

/* REDUCERS */
import reducers from './reducers/index';

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = (process.env.NODE_ENV !== 'production') ? createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk))) : createStore(reducers, {}, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="main-container">
                <Navigation />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/news/:year/:month/:day/:alias' component={RssView}/>
                    <Redirect to='/' />
                </Switch>
                <GlobalAlert />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app-root')
);
