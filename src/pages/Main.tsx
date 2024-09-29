import React from 'react';
import AdminLayout from '../layout';
import { createUnitiveIcon } from '@/utils/icon';

const items = [
  {
    key: 'system',
    icon: createUnitiveIcon('i-solar-box-minimalistic-outline'),
    label: '系统管理',
    children: [
      { key: 'system-user', label: '用户管理' },
      { key: 'system-role', label: '角色管理' },
      { key: 'system-permission', label: '权限管理' },
    ],
  },
  {
    key: 'content',
    label: '内容管理',
    icon: createUnitiveIcon('i-solar-book-2-linear'),
    children: [
      { key: 'content-article', label: '文章管理' },
      { key: 'content-category', label: '分类管理' },
      { key: 'content-tag', label: '标签管理' },
    ],
  },
  {
    key: 'settings',
    icon: createUnitiveIcon('i-solar-settings-minimalistic-line-duotone'),
    label: '设置',
    children: [
      { key: 'settings-profile', label: '个人设置', icon: createUnitiveIcon('i-solar-user-broken') },
      {
        key: 'settings-security',
        label: '安全设置',
        icon: createUnitiveIcon('i-solar-user-check-rounded-line-duotone'),
      },
    ],
  },
];

const Main: React.FC<{
  switchAppearance: () => void;
  isDark: boolean;
}> = ({ isDark, switchAppearance }) => {
  return (
    <AdminLayout isDark={isDark} switchAppearance={switchAppearance} menuItems={items}>
      111
    </AdminLayout>
  );
};

export default Main;
