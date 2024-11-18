import { readFileSync } from 'fs';
import ora from 'ora'
import path from 'path'
import { getChangesCommit } from './utils.mjs'

const spinner = ora()

const packagePath = path.join(process.cwd(), './package.json')

async function main() {
    spinner.start('提交更新信息中...')
    await getChangesCommit()
    const pkgInfo = JSON.parse(readFileSync(packagePath, 'utf-8').toString())

    // ('当前版本  pkginfo...', pkgInfo.version)

    spinner.succeed('Build completed!')


}


main()

