export function addUser(payload) {
    return { type: 'ADD_USER', payload }
};

export function deleteUser(payload) {
    return {type: 'DELETE_USER', payload}
}

export function editUser(payload) {
    return {type: 'EDIT_USER', payload}
}

export function updateUser(payload) {
    return {type: 'UPDATE_USER', payload}
}