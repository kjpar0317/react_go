import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import TestWidget from './TestWidget';

import './TestWidget/styles.css';

const layout = [{ i: '1', x: 0, y: 0, w: 1, h: 2, minH: 2, maxH: 2 }];

storiesOf('위젯 컴포넌트', module)
    .addDecorator((story) => (
        <Router>
            <Route path="/" component={() => story()} />
        </Router>
    ))
    .add('공통 헤더', () => <TestWidget {...props} />);
