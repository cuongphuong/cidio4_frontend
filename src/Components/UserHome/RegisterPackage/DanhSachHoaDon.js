import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

class BuildPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.props.StateInfoUser)
        var ckdata = cookie.load('logintc');
        var formData = new FormData();
        formData.append('token',ckdata);
        fetch(this.props.StateInfoSystem.domain + '/api/get-by-user/hoadon/' + this.props.StateInfoUser.id, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                // if (response.status === true) {
                //     console.log(response.data);
                // }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                danh sasch hoa don
            </div>
        );
    }
}

export default connect(function (state) {
    return { StatePackage: state.StatePackage, StateInfoSystem: state.StateInfoSystem, StateInfoUser: state.StateInfoUser }
})(BuildPackage);