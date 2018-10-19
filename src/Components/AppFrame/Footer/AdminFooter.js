import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid clearfix">
                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                        Copyright © 2018
                    <a href="/" target="_blank">Bootstrapdash</a>
                        . All rights reserved.
                    </span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                        Hand-crafted &amp; made with
                    <i className="mdi mdi-heart text-danger" />
                    </span>
                </div>
            </footer>
        );
    }
}

export default Footer;
