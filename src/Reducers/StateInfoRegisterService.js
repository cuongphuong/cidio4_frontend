var obj = {
    id_goi_dichvu: null,
    info:{
        diadiem: 'Nhà hàng 254NVL',
        thoigian: new Date(),
        mota: '',
        soban: 10
    },
}

var StateInfoRegisterService = (state = obj, action) => {
    switch (action.type) {
        case 'ADD_INFO_REGISTER_SERVICE':
            state = {};
            return action.item;
        default:
            return state;
    }
}

module.exports = StateInfoRegisterService;