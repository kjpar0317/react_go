import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
// import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';

import Header from './Header';
import Sidebar from './Sidebar';
import Loader from './Loader';
import ErrorView from './ErrorView';

import 'bootstrap/dist/css/bootstrap.min.css';

storiesOf('공통 컴포넌트', module)
    .addDecorator((story) => (
        <Router>
            <Route path="/" component={() => story()} />
        </Router>
    ))
    .add('공통 헤더', () => <Header />)
    .add('공통 사이드바', () => <Sidebar />)
    .add('공통 로딩', () => <Loader />)
    .add('공통 에러', () => <ErrorView />);
