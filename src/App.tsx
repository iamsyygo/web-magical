import { ConfigProvider, theme } from 'antd';
import type { MappingAlgorithm } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const algorithm: MappingAlgorithm[] = [theme.compactAlgorithm];

  return (
    <ConfigProvider
      theme={{
        token: {},
        cssVar: true,
        algorithm,
      }}
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
