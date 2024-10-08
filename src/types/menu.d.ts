import type React from 'react';

export type MenuItemType = {
  danger?: boolean;
  icon?: string;
  label: string;
  key: string;
  children?: MenuItemType[];
};
