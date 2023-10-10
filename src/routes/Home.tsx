import React from 'react'
import { Link, useNavigation } from 'react-router-dom'

export default function Home() {

    return (
        <div>

            Home
            <Link to={'/casos'}>Casos</Link>
        </div>

    )
}
