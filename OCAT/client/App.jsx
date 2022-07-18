import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { SiteWrapper } from './components';
import { MainSiteWrapper } from './components/MainSiteWrapper';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin';

import { NewAssessment } from './pages/Assessments/NewAssessment.jsx';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import { Login } from './pages/Login/login.jsx';
import { Logout } from './pages/Login/login.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {

  if (localStorage.getItem(`token`) === `password is right`) {
    return <SiteWrapper>
      <BrowserRouter>
        <Route path="/" component={DashboardBulletin} />
        <Route path="/assessment/new" component={NewAssessment} />
        <Route path="/assessment/list" component={AssessmentList} />
        <Route path="/user/logout" component={Logout} />

      </BrowserRouter>
    </SiteWrapper>;
  }

  return <MainSiteWrapper>
    <BrowserRouter>
      <Redirect to="/user/login" />
      <Route path="/user/login" component={Login} />
    </BrowserRouter>
  </MainSiteWrapper>;

};
