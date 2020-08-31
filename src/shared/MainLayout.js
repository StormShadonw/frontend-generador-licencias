import React from 'react';

import './MainLayout.css';
import MainHeader from '../shared/MainHeader';

class MainLayout extends React.Component {
    render() {
            return (
            <div className="MainLayout">
                <MainHeader></MainHeader>
                {this.props.children}
            </div>
        )
    }
}

export default MainLayout;