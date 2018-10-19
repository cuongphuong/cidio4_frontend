var obj = {
    lstCategory: [],
    infoUpdate : {
        id: 'null',
        name : 'null',
        mota: 'null'
    },
}

var StateCategory = (state = obj, action) => {
    switch (action.type) {
        case 'ADD_INDO_CATEGORY':
            state = {};
            return state = action.item;
        default:
            return state;
    }
}

module.exports = StateCategory;