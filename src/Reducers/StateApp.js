
var StateApp = (state = {name : 'Cường là đẹp trai vcl nhé!'}, action) => {
    switch (action.type) {
        case 'ADD_INFO_APP':
            if (state === null)
                state = {};
            return [...state, action.item];
        default:
            return state;
    }

}

module.exports = StateApp;