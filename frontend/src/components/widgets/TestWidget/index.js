import React from 'react';

const TestWidget = ({ item }) => {
    return (
        <>
            <div className="MyDragHandleClassName">
                Drag from Here - <span className="text">{item.i}</span>
            </div>
            <div style={{ marginTop: '80px' }}>Grid - {item.i}</div>
        </>
    );
};

export default TestWidget;
