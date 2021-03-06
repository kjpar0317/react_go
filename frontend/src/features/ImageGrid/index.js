import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unsplashAction, unsplashSelector } from './slice';
import { useInfinteScroll } from 'hooks';

import './styles.css';
import Loader from 'components/common/Loader';
import ErrorView from 'components/common/ErrorView';

const ImageGrid = () => {
    const dispatch = useDispatch();
    const [target, setTarget] = useState(null);

    const { isLoading, images, error } = useSelector(unsplashSelector.all);

    useInfinteScroll({
        target,
        onIntersect: ([{ isIntersecting }]) => {
            if (isIntersecting) {
                dispatch(unsplashAction.loadMore());
            }
        },
    });

    const dispatchUnsplash = useCallback(() => {
        unsplashAction.load();
    }, []);

    useEffect(() => {
        dispatchUnsplash();
    }, [dispatchUnsplash]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorView />;
    }

    return (
        <div className="content">
            <section className="grid">
                {images &&
                    images.map((image, index) => (
                        <div
                            key={index}
                            className={`item item-${Math.ceil(
                                image.height / image.width,
                            )}`}
                        >
                            <img
                                src={image.urls.small}
                                alt={image.user.username}
                            />
                        </div>
                    ))}
                <div ref={setTarget} className="last-item">
                    <Loader size="s" />
                </div>
            </section>
        </div>
    );
};

export default ImageGrid;
