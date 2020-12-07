import React from 'react';
import { Redirect } from 'react-router-dom'

export const requireAuth = (component) => {
    const accessToken = sessionStorage.getItem('access-token');
    if (!accessToken) {
        // clear sessionStorage
        sessionStorage.clear();

        return <Redirect to='/' />;
    }

    return component;
};
