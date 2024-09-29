import { createUnitiveIcon } from '@/utils/icon';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Layout, Menu, theme } from 'antd';
import React from 'react';
import { useState, createElement } from 'react';

const { Header, Content, Sider } = Layout;

const dropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Magical',
    icon: createUnitiveIcon('i-solar-user-bold-duotone', 14),
    disabled: true,
  },
  { type: 'divider' },
  {
    key: '2',
    icon: createUnitiveIcon('i-solar-info-circle-bold-duotone', 14),
    label: '个人中心',
    extra: '⌘ P',
  },
  {
    icon: createUnitiveIcon('i-solar-settings-minimalistic-bold-duotone', 14),
    key: '3',
    label: '设置',
    extra: '⌘ B',
  },
  {
    key: '4',
    icon: createUnitiveIcon('i-solar-exit-bold-duotone', 14),
    label: '退出',
    extra: '⌘ S',
  },
];

type MenuItems = MenuProps['items'];
const AdminLayout: React.FC<{
  children?: React.ReactNode;
  menuItems?: MenuItems;
  isDark?: boolean;
  switchAppearance?: () => void;
}> = ({ children, menuItems, isDark, switchAppearance }) => {
  const [siderWidth, setSiderWidth] = useState(200);
  const [collapsed, setCollapsed] = useState(false);

  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;
  const themeIcon = isDark ? 'moon-stars-bold' : 'i-solar-sun-2-bold';
  const collapIcon = collapsed
    ? 'i-solar-round-double-alt-arrow-right-bold-duotone'
    : 'i-solar-round-double-alt-arrow-left-bold-duotone';

  return (
    <Layout style={{ height: '100%' }}>
      <Header className="flex items-center justify-between px-22px">
        <div className="w-120px min-w-120px flex items-center gap-10px">
          <img src="/logo.svg" alt="" className="w-25px h-25px" />
          <div className="text-16px font-bold text-white ml-8px">Admin</div>
        </div>
        <div className="flex items-center gap-12px">
          <div
            onClick={switchAppearance}
            className={`w-18px h-18px rounded-full cursor-pointer color-white transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-90 ${themeIcon}`}
          ></div>

          <Dropdown menu={{ items: dropdownItems }}>
            <Avatar style={{ verticalAlign: 'middle', cursor: 'pointer' }} size="large" gap={10}>
              Magical
            </Avatar>
          </Dropdown>
        </div>
      </Header>
      <Layout style={{ flex: 1 }}>
        <Sider width={siderWidth} style={{ background: colorBgContainer }} className="h-full" collapsed={collapsed}>
          <Menu
            className="h-full border-r-0 select-none"
            items={menuItems}
            theme={isDark ? 'dark' : 'light'}
            mode="inline"
          />
          <i
            className={`${collapIcon} text-16px cursor-pointer absolute bottom-8px right--6px`}
            onClick={setCollapsed.bind(null, !collapsed)}
          ></i>
        </Sider>

        <Layout className="p-10px">
          <Content
            className="p-8px m-0"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
