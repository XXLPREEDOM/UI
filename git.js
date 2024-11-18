const { simpleGit } = require('simple-git')
const git = simpleGit({ baseDir: './' })
console.log('git', git.status());
const res = git.add('.')
console.log('res', res.add);
// git.commit("update")
// git.push()