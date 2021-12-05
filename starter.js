const fs = require('fs');

const getData = (path) => {
    try {
        return fs.readFileSync(path, 'utf8').split('\n');
    } catch (error) {
        console.error(error);
    }
};

exports.getData = getData;
