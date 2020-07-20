import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardAction, dashboardSelector } from './slice';

import RGL, { WidthProvider } from 'react-grid-layout';

import TestWidget from 'components/widgets/TestWidget';

import { doTest } from 'api';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css';
import 'components/widgets/TestWidget/styles.css';

const ReactGridLayout = WidthProvider(RGL);

const Dashboard = () => {
    const dispatch = useDispatch();
    // const [layouts, setLayouts] = useState([
    //     { i: '1', x: 0, y: 0, w: 1, h: 2, minH: 2, maxH: 2 },
    //     { i: '2', x: 1, y: 0, w: 1, h: 2, minH: 2, maxH: 2 },
    //     { i: '3', x: 0, y: 1, w: 1, h: 2, minH: 2, maxH: 2 },
    //     { i: '4', x: 1, y: 1, w: 1, h: 2, minH: 2, maxH: 2 },
    // ]);
    const { layouts } = useSelector(dashboardSelector.all);

    // const dispatchLayouts = useCallback(() => {
    //     console.log(this);
    //     dashboardAction.getLayouts();
    // }, []);

    // useEffect(() => {
    //     dispatchLayouts();
    // }, [dispatchLayouts]);

    useEffect(() => {
        dispatch(dashboardAction.getLayouts());

        doTest().then((res) => {
            alert(res);
        });
    }, []);

    const onLayoutChange = (layouts) => {
        dashboardAction.setLayouts(layouts);
    };

    const onResize = (layouts) => {
        dashboardAction.setLayouts(layouts);
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
