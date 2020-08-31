import React from 'react';
import ReactDom from 'react-dom';

import './backgroundShadow.css';

class BackgroundShadow extends React.Component {
    render() {
        return ReactDom.createPortal(<div className="background-shadow" onClick={this.props.onClick}></div>, document.getElementById("background-shadow-root"));
    }
}

export default BackgroundShadow;