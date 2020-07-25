import React, { Component }                                             from 'react';
import { positions, Provider as AlertProvider, transitions, withAlert } from 'react-alert';
import AlertTemplate                                                    from 'react-alert-template-basic';
import { Provider }                                          from 'react-redux';
import { applyMiddleware, createStore }                      from 'redux';
import thunk                                                 from 'redux-thunk';
import Home                                                  from 'src/screens/home/home.component';
import app                                                   from './reducer';

const middleware = applyMiddleware(thunk);
const store      = createStore(app, middleware);

const options = {
    position  : positions.BOTTOM_CENTER,
    timeout   : 3000,
    offset    : '30px',
    transition: transitions.SCALE,
};

class App extends Component {
    render() {
        
        return (
            
            <Provider store={ store }>
                <AlertProvider template={ AlertTemplate } { ...options }>
                    <Home/>
                </AlertProvider>
            </Provider>
        
        );
    }
}

export default App;