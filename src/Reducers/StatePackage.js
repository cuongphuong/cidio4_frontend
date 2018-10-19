var obj = {
    selectedDichVu: [],
    allDichVu: [],
    allDoUong: [],
    selectedDoUong: [],
    allDVKhac: [],
    selectedDVKhac: []
}

var StatePackage = (state = obj, action) => {
    switch (action.type) {
        case 'ADD_INFO_PACKAGE':
            state = {};
            return action.item;
        case 'ADD_ITEM_TO_ORDER':
            var data = state.allDichVu.find(i => i.id_dichvu === action.item);
            var tmpState = {
                ...state, selectedDichVu: [
                    ...state.selectedDichVu, data]
            };
            var lstShow = tmpState.allDichVu.filter(i => i.id_dichvu !== action.item)
            tmpState = {
                ...tmpState, allDichVu: lstShow
            }
            return tmpState;
        case 'REMOVE_ITEM_TO_ORDER':
            data = state.selectedDichVu.find(i => i.id_dichvu === action.item);
            tmpState = {
                ...state, allDichVu: [
                    ...state.allDichVu, data]
            };
            lstShow = tmpState.selectedDichVu.filter(i => i.id_dichvu !== action.item)
            tmpState = {
                ...tmpState, selectedDichVu: lstShow
            }
            return tmpState;
        case 'ADD_ITEM_TO_DOUONG':
            data = state.allDoUong.find(i => i.id_dichvu === action.item);
            data = { ...data, soluong: 1 }
            tmpState = {
                ...state, selectedDoUong: [
                    ...state.selectedDoUong, data]
            };
            lstShow = tmpState.allDoUong.filter(i => i.id_dichvu !== action.item)
            tmpState = {
                ...tmpState, allDoUong: lstShow
            }
            return tmpState;
        case 'REMOVE_ITEM_TO_DOUONG':
            data = state.selectedDoUong.find(i => i.id_dichvu === action.item);
            tmpState = {
                ...state, allDoUong: [
                    ...state.allDoUong, data]
            };
            lstShow = tmpState.selectedDoUong.filter(i => i.id_dichvu !== action.item)
            tmpState = {
                ...tmpState, selectedDoUong: lstShow
            }
            return tmpState;
        case 'UPDATE_SOLUONG':
            var index = state.selectedDoUong.findIndex(i => i.id_dichvu === action.item.id)
            state.selectedDoUong[index].soluong = action.item.soluong;
            return state;
        case 'ADD_ITEM_IN_DVKHAC':
            data = state.allDVKhac.find(i => i.id_dichvu === action.item);
            tmpState = {
                ...state, selectedDVKhac: [
                    ...state.selectedDVKhac, data]
            };
            lstShow = tmpState.allDVKhac.filter(i => i.id_dichvu !== action.item)
            tmpState = {
                ...tmpState, allDVKhac: lstShow
            }
            return tmpState;
        case 'REMOVE_ITEM_IN_DVKHAC':
            data = state.selectedDVKhac.find(i => i.id_dichvu === action.item);
            tmpState = {
                ...state, allDVKhac: [
                    ...state.allDVKhac, data]
            };
            lstShow = tmpState.selectedDVKhac.filter(i => i.id_dichvu !== action.item)
            tmpState = {
                ...tmpState, selectedDVKhac: lstShow
            }
            return tmpState;
        case 'RESET_PACKAGE':
            return {
                selectedDichVu: [],
                allDichVu: [],
                allDoUong: [],
                selectedDoUong: [],
                allDVKhac: [],
                selectedDVKhac: []
            }
        default:
            return state;
    }
}

module.exports = StatePackage;