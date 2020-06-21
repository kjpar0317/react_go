import React from 'react';
// import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

import Header from './Header';
import Sidebar from './Sidebar';
import Loader from './Loader';
import ErrorView from './ErrorView';

import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    title: '공통 컴포넌트',
    component: Welcome,
};

export const HeaderStory = () => <Header />;

HeaderStory.story = {
    name: '공통헤더',
};

export const SidebarStory = () => <Sidebar />;

SidebarStory.story = {
    name: '공통 사이드바',
};

export const LoaderStory = () => <Loader />;

LoaderStory.story = {
    name: '공통 로딩',
};

export const ErrorViewStory = () => <ErrorView />;

ErrorViewStory.story = {
    name: '공통 에러',
};
