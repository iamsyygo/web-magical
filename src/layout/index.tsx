import { createUnitiveIcon } from '@/utils/icon';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Dropdown, Input, Layout, Menu, theme } from 'antd';
import React, { createElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

interface MenuInfo {
  key: string;
  keyPath: string[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

const dropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Magical',
    icon: createUnitiveIcon('i-solar-user-bold-duotone', 14),
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
export const AppLayout: React.FC<{
  children?: React.ReactNode;
  menuItems?: MenuItems;
  isDark?: boolean;
  switchAppearance?: () => void;
  basePath?: string;
  siderWidth?: number;
}> = ({ children, menuItems, isDark, switchAppearance, basePath = '/main', siderWidth = 200 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;
  const themeIcon = isDark ? 'moon-stars-bold' : 'i-solar-sun-2-bold';
  const collapIcon = collapsed
    ? 'i-solar-round-double-alt-arrow-right-bold'
    : 'i-solar-round-double-alt-arrow-left-bold';

  const navigate = useNavigate();
  function handleMenuclick({ item, key, keyPath, domEvent }: MenuInfo) {
    const incompletePath = (keyPath as string[]).concat('').reverse().join('/');
    const fullPath = basePath + incompletePath;
    navigate(fullPath, { replace: true });
  }

  console.log(1);
  return (
    <Layout className="h-full">
      <Header className="flex items-center justify-between px-22px">
        <div className="w-120px min-w-120px flex items-center gap-10px">
          <img src="/logo.svg" className="w-25px h-25px" />
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
      <Layout className="flex-1">
        <Sider width={siderWidth} style={{ background: colorBgContainer }} className="h-full" collapsed={collapsed}>
          <Input
            placeholder="搜索菜单"
            className="w-94% m-3% b-0 bg-[#F5F5F5] focus-within:shadow-none focus-within:bg-[#F5F5F5] hover:bg-[#F5F5F5]"
          />
          <Menu
            className="border-r-0 select-none bg-transparent"
            items={menuItems}
            mode="inline"
            onClick={handleMenuclick}
          />
          <i
            className={`${collapIcon} text-16px cursor-pointer absolute bottom-8px right--6px`}
            onClick={setCollapsed.bind(null, !collapsed)}
          ></i>
        </Sider>

        <Layout className="p-10px pt-0">
          <Breadcrumb
            className="mt-5px mb-3px"
            separator={createElement('i', { className: 'mx-5px' }, '/')}
            items={[
              {
                href: '',
                title: (
                  <div className="flex items-center gap-3px h-full">
                    {createUnitiveIcon('i-solar-home-angle-bold', 12)}
                  </div>
                ),
              },
              {
                href: '',
                title: (
                  <div className="flex items-center gap-3px h-full">
                    {createUnitiveIcon('i-solar-user-bold-duotone', 12)}
                    <span>系统管理</span>
                  </div>
                ),
              },
              {
                href: '',
                title: (
                  <div className="flex items-center gap-3px h-full">
                    {createUnitiveIcon('i-solar-book-2-linear', 12)}
                    <span>内容管理</span>
                  </div>
                ),
              },
              {
                href: '',
                title: (
                  <div className="flex items-center gap-3px h-full">
                    {createUnitiveIcon('i-solar-settings-minimalistic-line-duotone', 12)}
                    <span>设置</span>
                  </div>
                ),
              },
            ]}
          />
          <Content
            className="p-8px m-0 overflow-hidden"
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
