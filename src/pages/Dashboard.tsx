import { AppLayout } from '@/layout';
import { createUnitiveIcon } from '@/utils/icon';
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

const items = [
  {
    key: 'system',
    icon: createUnitiveIcon('i-solar-box-minimalistic-outline'),
    label: '系统管理',
    children: [
      { key: 'user', label: '用户管理' },
      { key: 'role', label: '角色管理' },
      { key: 'permission', label: '权限管理' },
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
    key: 'setting',
    icon: createUnitiveIcon('i-solar-settings-minimalistic-line-duotone'),
    label: '设置',
    children: [
      { key: 'profile', label: '个人设置', icon: createUnitiveIcon('i-solar-user-broken') },
      {
        key: 'security',
        label: '安全设置',
        icon: createUnitiveIcon('i-solar-user-check-rounded-line-duotone'),
      },
    ],
  },
];

const Dashboard: React.FC = () => {
  const location = useLocation();

  return (
    <AppLayout menuItems={items}>
      <Suspense>
        <SwitchTransition mode="out-in">
          <CSSTransition key={location.key} classNames="fade" timeout={300} appear unmountOnExit>
            <Outlet />
          </CSSTransition>
        </SwitchTransition>
      </Suspense>
    </AppLayout>
  );
};

export default Dashboard;
