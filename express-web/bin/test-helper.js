/**
 * Test helper
 *
 * Usage: node test-helper.js
 *
 * Functions
 * - list test
 * - create test for existed module/route
 * - delete test
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = 'what to do with test(s): list, create, delete ? ';
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
            listTests();
            break;
        case 'create':
            createTest(arg);
            console.log('done');
            break;
        case 'delete':
            deleteTest(arg);
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
    readFilesInDir(dir).forEach((file) => fs.unlinkSync(file));
    fs.rmdirSync(dir);
}
function copy (source, target) {
    fs.copyFileSync(source, target);
}
function read(source) {
    return fs.readFileSync(source, 'utf8');
}
function write(target, content) {
    fs.writeFileSync(target, content);
}

const ROOT = path.resolve(__dirname, '../');
const MOD = `${ROOT}/module`;
const TEST = `${ROOT}/test`;

function listTests() {
    const mods = readDirsInDir(MOD).map(m => removePrefixSlash(m.replace(MOD, '')));
    let tests = readDirsInDir(TEST).map(m => removePrefixSlash(m.replace(TEST, '')));

    console.log('modules --> tests');
    mods.forEach(m => {
        if (!tests.includes(m)) {
            console.log(`${m} --> ?`);
            return;
        }

        const i = tests.indexOf(m);
        tests = tests.slice(0, i).concat(tests.slice(i + 1));
        console.log(`${m} --> ${m}`);
    });
    tests.forEach(m => {
        console.log(`? --> ${m}`);
    });
}
function createTest(arg = []) {
    const indexTmpl = `${__dirname}/template/test.tmpl`;

    arg.forEach((d) => {
        if (exists(`${TEST}/${d}`)) {
            console.log(`${d} exists`);
            return;
        }

        createDir(`${TEST}/${d}`);

        if (!exists(`${MOD}/${d}`)) {
            if (exists(indexTmpl)) {
                write(`${TEST}/${d}/index.js`, read(indexTmpl).replace('{route}', `${d}/index tests`));
            }
            return;
        }

        if (!exists(`${MOD}/${d}/route`)) return;
        const routes = readFilesInDir(`${MOD}/${d}/route`);
        routes.forEach(r => {
            const n = removePrefixSlash(r.replace(`${MOD}/${d}/route`, ''));
            if (exists(indexTmpl)) {
                write(`${TEST}/${d}/${n}`, read(indexTmpl).replace('{route}', `${d}/${n} tests`));
            }
        });
    });
}
function deleteTest(arg = []) {
    arg.forEach((d) => {
        if (!exists(`${TEST}/${d}`)) {
            console.log(`${d} lost`);
            return;
        }

        deleteDir(`${TEST}/${d}`);
    });
}
