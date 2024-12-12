// ./Routes/debugger.js

function dbBefore(message) {
    console.log('Before:', message);
}

function dbAfter(message) {
    console.log('After:', message);
}

module.exports = {
    dbBefore,
    dbAfter
};


