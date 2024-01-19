import react from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Home from '../Home';
import OperatorList from '../Operator/List';
import VotesList from '../Votes/List';

const Routes = () => {
    return (
        <Router>

                <Route exact path='/home' component={Home} />
                <Route exact path='/votes' component={VotesList} />
                <Route exact path='/operator' component={OperatorList} />
                <Route exact path='/' component={Dashboard} />

        </Router>
    )
}

export default Routes;
