const { simpleGit } = require('simple-git')
const git = simpleGit({ baseDir: './' })
console.log('git', git.status());
git.add('.')