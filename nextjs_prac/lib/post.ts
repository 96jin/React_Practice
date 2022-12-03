import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
// gray-matter는 마크다운 파일을 parsing 해준다. content와 data로 나뉨

const postsDirectory = path.join(process.cwd(),'posts')

export function getSortedPostsData(){
  // posts 파일 이름을 잡아주기
  const fileNames = fs.readdirSync(postsDirectory)
  // fileNames 에 [pre-rendering.md , ...]

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/,'')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)
    
    return {
      id,
      ...allPostsData(matterResult.data as { date : string; title: string})
    }
  })
  // Sorting
  return allPostsData.sort((a,b)=>{
    if(a.date < b.date){
      return 1
    }
    else{
      return -1
    }
  })
}