import React from 'react';
import Planner from '../components/Planner';
import Footer from '../components/Footer';

import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link
}from "react-router-dom" 


const PlannerPage = () =>
{
    return(
        <React.Fragment>
        <div>
            <Planner />
        </div>
        </React.Fragment>
    );
};
export default PlannerPage;