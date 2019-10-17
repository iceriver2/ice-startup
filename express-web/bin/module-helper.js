/**
 * Module helper
 *
 * Usage: node module-helper.js
 *
 * Functions
 * - list modules
 * - create module
 * - delete module
 * - show urls of a module
 * - show urls of all modules
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = 'what to do with module(s): list, create, delete ? ';
rl.question(question, answer => {
    // answer could be `list` or `create x xx xxx` or `delete x xx xxx`
    const words = answer.toLocaleLowerCase().split(' ').filter( n => n && n.trim());
    if (words.length === 0) {
        console.log('nothing to do');
        process.exit();
    }

    const cmd = words.shift();
    const arg = words;

    switch (cmd) {
        case 'list':
            listModules();
            break;
        case 'create':
            createModule(arg);
            console.log('done');
            break;
        case 'delete':
            deleteModule(arg);
            console.log('done');
            break;
        default:
            console.log('nothing to do');
    }
    process.exit();
});


function removePostfixSlash (name) {
    return name.replace(/\/+$/, '');
}
function removePrefixSlash (name) {
    return name.replace(/^\/+/, '');
}

function readEntitiesInDir (dir, type = 'dir') {
    if (!dir) return  [];

    const isDirectory = type === 'dir';
    const isFile = !isDirectory;

    const files = [];
    try {
        const result = fs.readdirSync(dir, { withFileTypes: true });
        if (result.length === 0) return  [];

        result.forEach((f) => {
            if ( (isFile && f.isFile()) || (isDirectory && f.isDirectory()) ) {
                files.push(`${removePostfixSlash(dir)}/${f.name}`);
            }
        });
    } catch (e) {
    }

    return files;
}
function readDirsInDir (dir) {
    return readEntitiesInDir(dir, 'dir');
}
function readFilesInDir (dir) {
    return readEntitiesInDir(dir, 'file');
}

function exists (file) {
    return fs.existsSync(file);
}

function createDir (dir) {
    fs.mkdirSync(dir);
}
function deleteDir (dir) {
    readDirsInDir(dir).forEach((sub) => {
        readFilesInDir(sub).forEach(f => fs.unlinkSync(f));
        fs.rmdirSync(sub);
    });
    readFilesInDir(dir).forEach((file) => fs.unlinkSync(file));
    fs.rmdirSync(dir);
}
function copy (source, target) {
    fs.copyFileSync(source, target);
}

const ROOT = path.resolve(__dirname, '../');
const MOD = `${ROOT}/module`;

function listModules() {
    const dirs = readDirsInDir(MOD);
    console.log('modules: ', dirs.map(n => removePrefixSlash(n.replace(MOD, ''))));
}
function createModule(arg = []) {
    const template = `${__dirname}/module-index-template.js`;

    arg.forEach((d) => {
        if (exists(`${MOD}/${d}`)) {
            console.log(`${d} exists`);
            return;
        }

        createDir(`${MOD}/${d}`);
        createDir(`${MOD}/${d}/model`);
        createDir(`${MOD}/${d}/route`);
        if (exists(template)) copy(template, `${MOD}/${d}/index.js`);
    });
}
function deleteModule(arg = []) {
    arg.forEach((d) => {
        if (!exists(`${MOD}/${d}`)) {
            console.log(`${d} lost`);
            return;
        }

        deleteDir(`${MOD}/${d}`);
    });
}

function listUrlsOfModule() {

}
function listUrlsOfModules() {

}