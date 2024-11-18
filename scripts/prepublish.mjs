console.log('start prepublish');
/**
    执行 npm publish
    1. 提交代码到git仓库（校验分支等）
    2. 提交到npm仓库
    3. 发送邮件通知
 */

import { simpleGit } from 'simple-git'
import { join } from 'path'
import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'
import { execa } from 'execa'
import prettier from 'prettier'
import semver from 'semver'
import { readFileSync, writeFileSync } from 'fs';
import { delay, UPDATE_VERSION_COMMIT_MESSAGE } from './utils.mjs';


const git = simpleGit({ baseUrl: join(import.meta.url, '../../') })
const spinner = ora()
const packagePath = join(process.cwd(), './package.json')


async function checkGitCommit() {
    const status = await git.status()
    if (status.files.length === 0) return

    const { autoCommit } = await inquirer.prompt([
        {
            type: 'list',
            message: '存在未保存文件，是否自动化处理',
            choices: ['自动化处理', '退出发布，手动进行 commit'],
            name: 'autoCommit'
        }
    ])

    if (autoCommit !== '自动化处理') {
        throw new Error('请手动 commmit 后重试')
    }

    const { message } = await inquirer.prompt([{ type: 'input', message: '请输入commit 信息', name: 'message' }])
    await git.add('.')
    await git.commit(message)
    await git.pull()
}

async function checkVersion(alpha) {
    spinner.start('获取库版本中...')

    const packageInfo = JSON.parse(readFileSync(packagePath).toString())
    let { stdout } = await execa('pnpm', ['show', packageInfo.name, 'versions'], { serialization: 'advanced' })
    // console.log('stdout', stdout, typeof stdout);
    if (!stdout) throw new Error('获取库版本失败')
    if (stdout.split(',').length === 1) stdout = `["${stdout}"]`
    // console.log('stdout split', stdout.split(','));

    const list = new Function(`return ${stdout}`)() || []

    let maxVersion = list[0]

    if (!maxVersion) {
        throw new Error('获取库版本失败, maxVersion: ' + maxVersion)
    }
    for (let i = 1; i < list.length; i++) {
        if (semver.lt(maxVersion, list[i])) maxVersion = list[i]
    }

    spinner.succeed('获取库版本成功，最新版本为：' + chalk.green(maxVersion))
    const version = await updateVersion(maxVersion, alpha)

    const data = JSON.stringify({ ...packageInfo, version }).replace("workspace:*", "latest")
    const d = await prettier.format(data, { parser: 'json' })
    writeFileSync(packagePath, d, 'utf-8')
    spinner.succeed('写入新版本成功!')
    await delay()

    console.log('message version ', UPDATE_VERSION_COMMIT_MESSAGE + ':' + version);
    // 版本文件写入成功，提交到git远端
    await git.add('.')
    await git.commit(UPDATE_VERSION_COMMIT_MESSAGE + ':' + version)
    await git.pull()
    await git.push()
}


async function updateVersion(maxVersion = '0.0.0', alpha = false) {
    const Ver = semver.parse(maxVersion)
    console.log('ver', Ver);
    const actionList = ['修复BUG', '升级功能或加功能', '大版本更新（重构）']
    const { action } = await inquirer.prompt([
        { type: 'list', name: 'action', message: '本次更新内容', choices: actionList }
    ])

    let versionList = []
    if (action === actionList[0]) {
        versionList = [semver.inc(Ver.version, 'patch')]
    } else if (action === actionList[1]) {
        versionList = [semver.inc(Ver.version, 'minor')]
    } else {
        versionList = [semver.inc(Ver.version, 'major')]
    }
    console.log('versionList', versionList);

    if (alpha) {
        const { version } = semver.parse(versionList[0])
        const prerelease = Ver.prerelease?.[1] || 1

        versionList[0] = semver.inc(version, 'prerelease', 'alpha', prerelease)
        versionList.push(semver.inc(Ver.version, 'prerelease', 'alpha', prerelease + 1))
    }

    let res = await inquirer.prompt([
        { type: 'list', name: 'version', message: `请选择新版本号, 当前最新版${maxVersion}`, choices: [...versionList, '自定义输入'] }
    ])
    // console.log('res', res); // { version: '0.1.1-alpha.1' }

    if (res.version !== '自定义输入') return res.version

    res = await inquirer.prompt([
        {
            type: 'input',
            name: 'version',
            message: '请输入版本号',
            validate: val => {
                console.log('输入的版本号:', val);

                if (!semver.valid(val)) throw new Error('输入的版本号不合法')
                if (semver.lt(val, maxVersion)) throw new Error('输入版本号不能小于旧版本')
                if (alpha && !semver.parse(val).prerelease.includes('alpha')) {
                    throw new Error('当前为dev分支，版本号必须带上 -alpha.1 标识')
                }

                // return Promise.resolve(val)
                return val
            }
        }
    ])
    console.log('输入的版本号222:', val);
    return res.version
}

async function main() {
    const branch = await git.branch()
    // console.log('branch', branch);
    spinner.start('正在检查分支...')
    const currentBranch = branch.current // 获取当前所在分支
    if (!/^dev$/.test(currentBranch)) {
        // throw new Error('当前分支不是dev分支，不允许发布')
        throw new Error(chalk.red('当前分支不是') + chalk.green('dev') + chalk.red('分支'))
        // process.exit(1)
    }
    spinner.succeed('分支正确')


    // 提交检查
    await checkGitCommit();

    await checkVersion(branch.current === 'dev')
}


main().catch(err => {
    setTimeout(() => {
        spinner.fail(err.message)
        process.exit(1)
    }, 3000);
})

