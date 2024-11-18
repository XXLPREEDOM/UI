import { fileURLToPath } from 'url'
import { join } from 'path'
import { simpleGit } from 'simple-git'

// const git = simpleGit({ baseDir: join(fileURLToPath(import.meta.url), '../../') })
export async function getChangesCommit() {
    const git = simpleGit({ baseDir: join(fileURLToPath(import.meta.url), '../../') })
    console.log('path', join(fileURLToPath(import.meta.url), '../../'));

    
    return 22
}
