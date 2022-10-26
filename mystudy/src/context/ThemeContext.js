import {createContext} from 'react'

// 먼저 context를 만들어야하기 때문에 새로 파일을 만들어서 생성해준다.
// 기본값으로 null 을 넣어준다.
export const ThemeContext = createContext('hello')