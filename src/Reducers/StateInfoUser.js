var StateInfoUser = (state = { id : null, token : null , hoten : null, id_chucvu : null}, action) => {
    switch (action.type) {
        case 'ADD_INFO_USER':
            state = {};
            return state = action.item;
        default:
            return state;
    }
}

module.exports = StateInfoUser;