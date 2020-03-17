
const setUserList = (userList) => {
    localStorage.setItem('userList', JSON.stringify(userList));
}
const getUserList = () => {
    if(localStorage.getItem('userList') === null) {
        setUserList([]);
    }
    return JSON.parse(localStorage.getItem('userList'));
}
if(getUserList().length === 0){
    setUserList([]);
}
const initialState = {
    userList: getUserList(),
    currentUser: {}
};


const  rootReducer = (state = initialState, action) => {
    if (action.type === 'ADD_USER') {
        const list = [...state.userList];
        list.push(action.payload);
        setUserList(list);
        return {userList: list, currentUser: {}};
    }
    if (action.type === 'DELETE_USER') {
        const list = [...state.userList];
        list.splice(list.indexOf(action.payload), 1);
        setUserList(list);
        return {userList: list, currentUser: {}};
    }
    if (action.type === 'EDIT_USER') {
        const list = [...state.userList];
        setUserList(list);
        return {userList: list, currentUser: action.payload};
    }
    if (action.type === 'UPDATE_USER') {
        const list = [...state.userList];
        list[list.indexOf(state.currentUser)] = action.payload;
        setUserList(list);
        return {userList: list, currentUser: {}};
    }
    return state;
}
export default rootReducer;