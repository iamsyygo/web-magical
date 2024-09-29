import type { MappingAlgorithm } from 'antd';
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import Main from './pages/Main';

function App() {
  const [isDark, setIsDark] = useState(false);
  let algorithm: MappingAlgorithm[] = [theme.compactAlgorithm];
  function switchAppearance() {
    // const isDarkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(!isDark);
    if (isDark) {
      algorithm.push(theme.darkAlgorithm);
    } else {
      algorithm = algorithm.filter((item) => item !== theme.darkAlgorithm);
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {},
        cssVar: true,
        algorithm,
      }}
    >
      <Main switchAppearance={switchAppearance} isDark={isDark} />
    </ConfigProvider>
  );
}

export default App;
