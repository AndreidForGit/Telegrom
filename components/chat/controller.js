const store = require('./store');

function addChat(users) {
    console.log(users)
    if (!users || !Array.isArray(users)) {
        return Promise.reject('Invalid user list');
    };

    const chats = {
        users: users
    };
    return store.addChat(chats);
};

function listChats(userId) {
    return store.list(userId);
};

module.exports = {
    listChats,
    addChat,
}