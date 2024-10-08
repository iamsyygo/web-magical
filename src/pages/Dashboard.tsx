import { AppLayout } from '@/layout';
import { MenuItemType } from '@/types/menu';
import {} from '@/utils/icon';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const items: MenuItemType[] = [
  {
    key: 'system',
    icon: 'i-solar-box-minimalistic-outline',
    label: '系统管理',
    children: [
      {
        key: '/main/system/user',
        label: '用户管理',
      },
      {
        key: '/main/system/role',
        label: '角色管理',
      },
      {
        key: '/main/system/permission',
        label: '权限管理',
      },
    ],
  },
  {
    key: 'content',
    label: '内容管理',
    icon: 'i-solar-book-2-linear',
    children: [
      { key: '/main/content/article', label: '文章管理' },
      { key: '/main/content/ccategory', label: '分类管理' },
      { key: '/main/content/ctag', label: '标签管理' },
    ],
  },
  {
    key: 'setting',
    icon: 'i-solar-settings-minimalistic-line-duotone',
    label: '设置',
    children: [
      {
        key: '/main/setting/profile',
        label: '个人设置',
        icon: 'i-solar-user-broken',
      },
      {
        key: '/main/setting/security',
        label: '安全设置',
        icon: 'i-solar-user-check-rounded-line-duotone',
      },
    ],
  },
];

const Dashboard: React.FC = () => {
  const location = useLocation();
  return (
    <AppLayout menuItems={items}>
      <Suspense>
        <AnimatePresence mode="wait" initial={true}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet key={location.pathname} />
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </AppLayout>
  );
};

export default Dashboard;
