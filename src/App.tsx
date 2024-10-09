import type { ThemeConfig } from 'antd';
import { ConfigProvider, theme } from 'antd';
import zh_CN from 'antd/locale/zh_CN';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const globalTheme: ThemeConfig = {
    token: {},
    // cssVar: true,
    algorithm: [theme.compactAlgorithm],
    components: {
      Table: {
        headerBg: 'hsl(220 14.3% 95.9%)',
        headerSplitColor: 'hsl(216 12.2% 83.9%)',
        headerBorderRadius: 8,
        rowHoverBg: 'rgba(254,244,236,0.5)',
      },
    },
  };

  return (
    <ConfigProvider theme={globalTheme} locale={zh_CN}>
      <Suspense>
        <Outlet />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
