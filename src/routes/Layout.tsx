import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom';

export default function Layout() {
    const navigation = useNavigation();

    return (
        <div>{navigation.state === "loading" && <h1>Loading...</h1>}
            <Outlet />
        </div>
    )
}
