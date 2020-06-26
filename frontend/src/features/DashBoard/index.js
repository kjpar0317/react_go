import React, { useState, useEffect } from 'react';

import RGL, { WidthProvider } from 'react-grid-layout';

import TestWidget from '../../components/widgets/TestWidget';

import { doTest } from '../../api'

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css';
import '../../components/widgets/TestWidget/styles.css';

const ReactGridLayout = WidthProvider(RGL);

const Dashboard = () => {
    const [layouts, setLayouts] = useState([
        { i: '1', x: 0, y: 0, w: 1, h: 2, minH: 2, maxH: 2 },
        { i: '2', x: 1, y: 0, w: 1, h: 2, minH: 2, maxH: 2 },
        { i: '3', x: 0, y: 1, w: 1, h: 2, minH: 2, maxH: 2 },
        { i: '4', x: 1, y: 1, w: 1, h: 2, minH: 2, maxH: 2 },
    ]);

    useEffect(() => {
        doTest().then((res) => {
            alert(res);
        })
    }, [])

    const onLayoutChange = (layouts) => {
        setLayouts(layouts);
    };

    const onResize = (layouts) => {
        setLayouts(layouts);
    };

    return (
        <ReactGridLayout
            rowHeight={150}
            cols={2}
            onResize={onResize}
            width={100}
            layout={layouts}
            onLayoutChange={onLayoutChange}
            draggableHandle=".MyDragHandleClassName"
            draggableCancel=".MyDragCancel"
        >
            {layouts.map((item) => (
                <div className="item" key={item.i}>
                    <TestWidget item={item} />
                </div>
            ))}
        </ReactGridLayout>
    );
};

export default Dashboard;
