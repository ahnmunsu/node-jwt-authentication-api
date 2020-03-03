const config = require('config.json');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

let refreshTokens = {};

/* Tokens are expired quickly for testing */
const ACCESS_TOKEN_EXPIRE_IN_SEC = 60;
const REFRESH_TOKEN_EXPIRE_IN_SEC = 300;

module.exports = {
    authenticate,
    refresh,
    reject,
    getAll
};

function getNowInSec() {
    return Math.floor(Date.now() / 1000);
}

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ 
                iss: "github.com/ahnmunsu",
                aud: user.id,
                iat: getNowInSec(),
                exp: getNowInSec() + ACCESS_TOKEN_EXPIRE_IN_SEC
            }, 
            config.secret
        );
        const refreshToken = randtoken.uid(256);
        const { password, ...userWithoutPassword } = user;
        refreshTokens[refreshToken] = {
            userId: user.id,
            exp: getNowInSec() + REFRESH_TOKEN_EXPIRE_IN_SEC
        };
        return {
            ...userWithoutPassword,
            accessToken: token,
            refreshToken
        };
    }
}

async function refresh({ userId, accessToken, refreshToken }) {
    try {
        let decoded = jwt.verify(accessToken, config.secret);
    } catch (err) {
        return null;
    }

    if ((refreshToken in refreshTokens) && 
        (refreshTokens[refreshToken].userId === userId) &&
        (refreshTokens[refreshToken].exp > getNowInSec())) {
        const token = jwt.sign({ 
                iss: "github.com/ahnmunsu",
                aud: userId,
                iat: getNowInSec(),
                exp: getNowInSec() + ACCESS_TOKEN_EXPIRE_IN_SEC  
            }, 
            config.secret
        );
        return {
            accessToken: token
        };
    } else {
        return null;
    }
}

async function reject({ refreshToken }) {
    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken];
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
