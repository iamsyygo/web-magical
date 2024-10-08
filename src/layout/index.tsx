/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createUnitiveIcon } from '@/utils/icon';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Divider, Dropdown, Input, Layout, Menu, theme } from 'antd';
import React, { createElement, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { version } from '@/../package.json';
import { MenuItemType } from '@/types/menu';

const { Header, Content, Sider } = Layout;
type MenuItemsType = MenuItemType[];
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
function findMenuItem(items: MenuItemsType, key: string): MenuItemType | undefined {
  return items.find((item) => {
    if (!item) return false;
    if (item.key === key) {
      return true;
    }
    if (item.children) {
      return findMenuItem(item.children as MenuItemsType, key);
    }
    return false;
  });
}

function handleMenuIcon(menus: MenuItemType[] = []) {
  return menus.map((value) => {
    const item = { ...value, icon: createUnitiveIcon(value.icon!) };
    if (value.children) {
      // @ts-expect-error
      item.children = handleMenuIcon(item.children!);
    }
    return item;
  });
}

export const AppLayout: React.FC<{
  children?: React.ReactNode;
  menuItems?: MenuItemsType;
  isDark?: boolean;
  switchAppearance?: () => void;
  siderWidth?: number;
}> = ({ children, menuItems, isDark, switchAppearance, siderWidth = 200 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;
  const themeIcon = isDark ? 'moon-stars-bold' : 'i-solar-sun-2-bold';
  const collapIcon = collapsed
    ? 'i-solar-round-double-alt-arrow-right-bold'
    : 'i-solar-round-double-alt-arrow-left-bold';

  const [breadcrumbs, setBreadcrumbs] = useState<MenuItemsType>([]);

  const navigate = useNavigate();
  const handleMenuclick = useCallback(
    function ({ key }: MenuInfo) {
      navigate(key, { replace: true });
      const item = findMenuItem(menuItems ?? [], key);
      if (item) {
        // document.title = item.label;

        setBreadcrumbs((prev) => {
          const index = prev.findIndex((i) => i.key === item.key);
          if (index === -1) {
            return [...prev, item];
          }
          return [...prev.splice(index + 1, 1), item];
        });
      }
    },
    [menuItems, navigate],
  );

  console.log('🌳');
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
          <div className="h-full flex flex-col">
            <Input
              placeholder="搜索菜单"
              className="w-94% m-3% b-0 bg-[#F5F5F5] focus-within:shadow-none focus-within:bg-[#F5F5F5] hover:bg-[#F5F5F5]"
            />
            <Menu
              className="border-r-0 select-none bg-transparent flex-shrink-0 flex-1"
              items={handleMenuIcon(menuItems)}
              mode="inline"
              onClick={handleMenuclick}
            />
            <Divider style={{ fontSize: '8px', padding: '0 10px', borderColor: '#ddd' }}>other</Divider>
            <div className="w-full pb-2 text-center text-2.5 text-gray-400">版本：v{version}</div>
          </div>
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
              ...breadcrumbs.map((item) => ({
                href: '',
                title: (
                  <div className="flex items-center gap-3px h-full">
                    {createUnitiveIcon(item.icon ?? 'i-solar-settings-minimalistic-line-duotone', 12)}
                    <span>{item.label}</span>
                  </div>
                ),
              })),
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
