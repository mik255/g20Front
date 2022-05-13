

const base = 'http://localhost:3001'
const getUsers = 'http://localhost:3001/users'
const getUserById =id=> `http://localhost:3001/users/${id}`

export default {
    base: base,
    getUsers: getUsers,
    getUserById:getUserById
 };