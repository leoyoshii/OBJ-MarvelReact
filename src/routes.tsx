import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { CharacterDetail } from './Pages/CharacterDetail';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/details/:id" exact component={CharacterDetail} />
      </Switch>
    </BrowserRouter>
  );
};
