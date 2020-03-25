import React from 'react';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon/index';
import Register from './pages/register/index';
import Profile from './pages/Profile/index';
import NewIncident from './pages/NewIncident/index';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register} />
                <Route path="/Profile" component={Profile} />
                <Route path="/incident/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}