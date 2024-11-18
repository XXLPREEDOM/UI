import { fileURLToPath } from 'url'
import { join } from 'path'
import { simpleGit } from 'simple-git'

export async function getChangesCommit(maxCount = 100) {
    const git = simpleGit({ baseDir: join(fileURLToPath(import.meta.url), '../../') })
    // console.log('path', join(fileURLToPath(import.meta.url), '../../'));

    // 获取所有提交记录
    const logs = await git.log({ maxCount })
    const authorList = new Set()
    // console.log('logs all', logs);

    const updateMessage = logs.filter((item) => {
        item.message
        return !!item.message
    }).map(item => {
        authorList.add(item.author_name)
        return item
    });


    return {
        authorList,
        updateMessage
    }
}


export async function delay(time = 500) {
    return new Promise((res) => {
        setTimeout(res, time)
    })
}

export const UPDATE_VERSION_COMMIT_MESSAGE = 'update:version'
