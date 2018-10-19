import React, { Component } from 'react';

class ArticleList extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Manage Tickets</h5>
                            <div className="fluid-container">
                                <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                                    <div className="col-md-1">
                                        <img className="img-sm rounded-circle mb-4 mb-md-0" src="images/faces/face1.jpg" alt="profile " />
                                    </div>
                                    <div className="ticket-details col-md-9">
                                        <div className="d-flex">
                                            <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">James :</p>
                                            <p className="text-primary mr-1 mb-0">[#23047]</p>
                                            <p className="mb-0 ellipsis">Donec rutrum congue leo eget malesuada.</p>
                                        </div>
                                        <p className="text-gray ellipsis mb-2">Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim vivamus.</p>
                                        <div className="row text-gray d-md-flex d-none">
                                            <div className="col-4 d-flex">
                                                <small className="mb-0 mr-2 text-muted text-muted">Last responded :</small>
                                                <small className="Last-responded mr-2 mb-0 text-muted text-muted">3 hours ago</small>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <small className="mb-0 mr-2 text-muted text-muted">Due in :</small>
                                                <small className="Last-responded mr-2 mb-0 text-muted text-muted">2 Days</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ticket-actions col-md-2">
                                        <div className="btn-group dropdown">
                                            <button type="button" className="btn btn-success dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Manage
    </button>
                                            <div className="dropdown-menu" x-placement="bottom-start" style={{ position: 'absolute', willChange: 'transform', top: 0, left: 0, transform: 'translate3d(0px, 29px, 0px)' }}>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-reply fa-fw" />Quick reply</a>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-history fa-fw" />Another action</a>
                                                <div className="dropdown-divider" />
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-check text-success fa-fw" />Resolve Issue</a>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-times text-danger fa-fw" />Close Issue</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                                    <div className="col-md-1">
                                        <img className="img-sm rounded-circle mb-4 mb-md-0" src="images/faces/face2.jpg" alt="profile " />
                                    </div>
                                    <div className="ticket-details col-md-9">
                                        <div className="d-flex">
                                            <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">Stella :</p>
                                            <p className="text-primary mr-1 mb-0">[#23135]</p>
                                            <p className="mb-0 ellipsis">Curabitur aliquet quam id dui posuere blandit.</p>
                                        </div>
                                        <p className="text-gray ellipsis mb-2">Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Curabitur non nulla sit amet
                                          nisl.
  </p>
                                        <div className="row text-gray d-md-flex d-none">
                                            <div className="col-4 d-flex">
                                                <small className="mb-0 mr-2 text-muted">Last responded :</small>
                                                <small className="Last-responded mr-2 mb-0 text-muted">3 hours ago</small>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <small className="mb-0 mr-2 text-muted">Due in :</small>
                                                <small className="Last-responded mr-2 mb-0 text-muted">2 Days</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ticket-actions col-md-2">
                                        <div className="btn-group dropdown">
                                            <button type="button" className="btn btn-success dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Manage
    </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-reply fa-fw" />Quick reply</a>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-history fa-fw" />Another action</a>
                                                <div className="dropdown-divider" />
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-check text-success fa-fw" />Resolve Issue</a>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-times text-danger fa-fw" />Close Issue</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ticket-card mt-3">
                                    <div className="col-md-1">
                                        <img className="img-sm rounded-circle mb-4 mb-md-0" src="images/faces/face3.jpg" alt="profile " />
                                    </div>
                                    <div className="ticket-details col-md-9">
                                        <div className="d-flex">
                                            <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">John Doe :</p>
                                            <p className="text-primary mr-1 mb-0">[#23246]</p>
                                            <p className="mb-0 ellipsis">Mauris blandit aliquet elit, eget tincidunt nibh pulvinar.</p>
                                        </div>
                                        <p className="text-gray ellipsis mb-2">Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus. Lorem ipsum dolor sit amet.</p>
                                        <div className="row text-gray d-md-flex d-none">
                                            <div className="col-4 d-flex">
                                                <small className="mb-0 mr-2 text-muted">Last responded :</small>
                                                <small className="Last-responded mr-2 mb-0 text-muted">3 hours ago</small>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <small className="mb-0 mr-2 text-muted">Due in :</small>
                                                <small className="Last-responded mr-2 mb-0 text-muted">2 Days</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ticket-actions col-md-2">
                                        <div className="btn-group dropdown">
                                            <button type="button" className="btn btn-success dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Manage</button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-reply fa-fw" />Quick reply</a>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-history fa-fw" />Another action</a>
                                                <div className="dropdown-divider" />
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-check text-success fa-fw" />Resolve Issue</a>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fa fa-times text-danger fa-fw" />Close Issue</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ArticleList;
