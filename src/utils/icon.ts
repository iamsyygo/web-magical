import { createElement } from 'react';

export const createUnitiveIcon = (icon: string, size?: number) => {
  return createElement('i', { className: icon, style: { fontSize: size || 16 + 'px', display: 'inline-block' } });
};
