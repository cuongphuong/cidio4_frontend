import React, { Component } from 'react';
class Success extends Component {
    handleOnclick() {
        window.location = "/admin/service/build-package"
    }

    handleOnclickQuayLai() {
        window.location = "/admin/service/package/lst"
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleOnclick()} type="button" class="btn btn-primary btn-rounded btn-fw">Tiếp tục build</button>
                <button onClick={() => this.handleOnclickQuayLai()} type="button" class="btn btn-secondary btn-rounded btn-fw">Quay về danh sách gói</button>
            </div>
        );
    }
}

export default Success;
