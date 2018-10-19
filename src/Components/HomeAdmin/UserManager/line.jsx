import React from 'react';

const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

const line = props => {
    return (
        <tr>
            <td className="py-1">
                <img src="../../images/faces-clipart/pic-1.png" alt="avatart" />
            </td>
            <td>{props.hoten}</td>
            <td>{props.sodienthoai}</td>
            <td> {(props.gioitinh === 1) ? 'Nam' : (props.gioitinh === 0) ? 'Nử' : 'Chưa xác định'}</td>
            <td>{new Date(props.create).toLocaleDateString('vi', DATE_OPTIONS)} </td>
        </tr>
    );
};

export default line;