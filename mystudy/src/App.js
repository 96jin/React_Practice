import './App.css';
import { useState } from 'react';
import Page from './components/Page';
import { ThemeContext } from './context/ThemeContext';
// context를 생성한 ThemeContext 파일을 import해준다.
import { UserContext } from './context/UserContext';

function App() {
  const [isDark, setIsDark] = useState(false)

  // Provider로 감싸준다.
  // Provider로 감싸준 태그들은 우리가 value로 넣어준 isDark와 setIsDark에 접근할 수 있게된다.
  // Provider로 감싸지 않으면 하위 컴포넌트에서 context에서 값을 꺼내올 때 기본으로 넣어준 값을 가져온다.
  return (
    <UserContext.Provider value={'사용자'}>
      <ThemeContext.Provider value={{isDark,setIsDark}}>
        <Page/>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
