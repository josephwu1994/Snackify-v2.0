import React, { Component } from 'react';
import CurrentUser from './current-user.jsx'; 
class Header extends Component {

    render() {
        return (
            <header>
                <div id='logo'>Snackify</div>
                <ul>
                {/* need link href to logout route!!! */}
                {/* Need to build user component */}
                    <li><a href="/auth/logout">Logout</a></li>  
                    <li><CurrentUser username={this.props.username} avatar={this.props.avatar}/></li>
                </ul>
            </header>
        );
    }
}

export default Header;