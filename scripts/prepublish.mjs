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
import semver from 'semver'
import { readFileSync } from 'fs';


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
    console.log('stdout', stdout);
    if (!stdout) throw new Error('获取库版本失败')
    if (stdout.split(',').length === 1) stdout = `["${stdout}"]`

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

    await git.add('.')
    await git.commit(UPDATE_VERSION_COMMIT_MESSAGE + ':' + version)
    await git.pull()
    await git.push()
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

