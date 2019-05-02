/**
 * @file 创建新页面目录命令
 * @date 2019/04/01
 * @author hpuhouzhiqiang@gmail.com
 */
const fs = require('fs-extra');
const path = require('path');
const argsList = process.argv.splice(2);
const routesPath = path.resolve(__dirname, '../src/routes');
const originDir = path.resolve(__dirname, '../src/routes/test');

const createDir = `${routesPath}/${argsList[0]}`;

const ensureCreateDir = fs.existsSync(createDir);

if (ensureCreateDir) {
    console.log(`********** 您所要创建的目录${argsList[0]}已存在！***********`);
    return;
}

console.log(`********** 您所要创建的目录${argsList[0]}不存在，开始创建...***********`);

fs.ensureDirSync(createDir);
fs.copySync(originDir, createDir);

// 修改template文件名
fs.renameSync(`${createDir}/test.html`, `${createDir}/${argsList[0]}.html`);

console.log(`********** 目录${createDir} 创建完成！***********`);
