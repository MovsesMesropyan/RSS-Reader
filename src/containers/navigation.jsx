import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Navigation extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">RSS Reader</Link>
                    </div>
                </div>
            </nav>
        )
    }
}
