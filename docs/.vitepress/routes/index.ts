import * as  glob from 'glob'
import os from 'os'
import { readFileSync } from 'fs'
import { join, parse } from 'path'
import type { DefaultTheme } from 'vitepress'

export default function (file: string) {
  const matchPath =
    os.platform() === 'win32'
      ? join(__dirname, `..\\..\\${file}\\**\\*.md`).replace(/\\/g, '/')
      : join(__dirname, `../../${file}/**/*.md`)
  let fileList = glob.sync(matchPath)

  const menu: DefaultTheme.SidebarItem[] = []

  fileList.map(path => {
    const data = readFileSync(path).toString()
    const text =
      data
        .match(/\<\!--.*?--\>/)?.[0]
        ?.replace(/(\.*<\!--|--\>.*)/gi, '')
        ?.trim() || '基础'
    const { dir } = parse(path)
    const title = data.match(/\#.*/)?.[0]?.replace('#', '').trim() || dir

    const result: DefaultTheme.SidebarItem = {
      text: title,
      link: `/${file}${path.split(file)[1].replace('.md', '')}`
    }

    const selectData = menu.find(item => item.text === text)
    if (selectData) {
      selectData.items!.push(result)
    } else {
      menu.push({ text, items: [result] })
    }
  })

  return menu
}
