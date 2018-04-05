import React, { Component } from 'react';
import CurrentUser from './current-user.jsx'; 
class Header extends Component {

    render() {
        return (
            <header>
                <div id='logo'><img src="https://tmpfilecdn.freelogodesign.org/25509366-03c0-456e-bf26-874b57734441.png" /></div>
								<h1> Snackify v2.0</h1>
                <ul>
                {/* need link href to logout route!!! */}
                {/* Need to build user component */}
                    <li className="logout"><a href="/auth/logout">Logout</a></li>  
                    <li><CurrentUser username={this.props.username} avatar={this.props.avatar}/></li>
                </ul>
            </header>
        );
    }
}

export default Header;