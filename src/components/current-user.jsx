import React, { Component } from 'react';

class CurrentUser extends Component {

    render() {
        return (
            <div id='currentUserDiv'>
                 {/*this needs to pull in getHub avatar */}
                {/* and user name */}
                <img id='currentUserImage' src={this.props.avatar} />
                <div id='currentUserName' >{this.props.userName}</div>
            </div>
        );
    }
}

export default CurrentUser