const debug = require('debug')('server:lib:file');
const fs = require('fs');
const path = require('path');

const removePostfixSlash = (name) => name.replace(/\/+$/, '');
const removePrefixSlash = (name) => name.replace(/^\/+/, '');

const readEntitiesInDir = (dir, type = 'dir') => {
    const isDirectory = type === 'dir';
    const isFile = !isDirectory;

    const files = [];

    if (!dir) return  files;

    try {
        const result = fs.readdirSync(dir, { withFileTypes: true });
        if (result.length === 0) return  files;

        result.forEach((f) => {
            if ( (isFile && f.isFile()) || (isDirectory && f.isDirectory()) ) {
                files.push(`${removePostfixSlash(dir)}/${f.name}`);
            }
        });
    } catch (e) {

    }

    return files;
};
const readDirsInDir = (dir) => readEntitiesInDir(dir, 'dir');
const readFilesInDir = (dir) => readEntitiesInDir(dir, 'file');

const exists = (file) => fs.existsSync(file);

const dirname = (file) => {
    try {
        return path.dirname(file);
    } catch (e) {
        return '';
    }
};
const basename = (file) => {
    try {
        return path.basename(file);
    } catch (e) {
        return '';
    }
};

const requireOrExit = (dir) => {
    try {
        const mod = require(dir);
        return mod;
    } catch (e) {
        console.log(e.message);
        process.exit();
    }
};

module.exports = {
    removePostfixSlash,
    removePrefixSlash,

    readDirsInDir,
    readFilesInDir,

    exists,

    dirname,
    basename,

    requireOrExit
};
