import React from 'react';

import './Modal.css';

class Modal extends React.Component {
    render() {
        return (
            <div className="modal">
                <div className="modal-header">
                    {this.props.header}
                </div>
                <div className="modal-body">
                    {this.props.body}
                </div>
                <div className="modal-footer">
                    {this.props.footer}
                    <button className="pure-button pure-button-danger" onClick={this.props.closeModal}>CANCELAR</button>
                </div>
            </div>

        )
    }
}

export default Modal;