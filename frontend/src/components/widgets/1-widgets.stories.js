import React from 'react';
// import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

import TestWidget from './TestWidget';

import './TestWidget/styles.css';

export default {
    title: '위젯 컴포넌트',
    component: Welcome,
};

const layout = [{ i: '1', x: 0, y: 0, w: 1, h: 2, minH: 2, maxH: 2 }];

export const TestWidgetStory = () => <TestWidget item={layout} />;

TestWidgetStory.story = {
    name: '테스트 위젯',
};
