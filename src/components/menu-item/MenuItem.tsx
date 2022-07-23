import React from 'react';
import styled from '@emotion/styled';

type BaseProps = {
  itemType?: 'default' | 'checkbox';
  checked?: boolean;
};

const MenuItemBase = styled.button<BaseProps>(
  ({ itemType = 'default', checked }) => `
  display: flex;
  align-items: center;

  width: 100%;
  height: 32px;
  padding: 0 12px;

  text-align: left;
  font-size: 13px;
  color: #666a6e;

  border: none;
  background: none;

  &:hover,
  &:focus {
    background-color: #f8fafb;
  }

  ${
    itemType === 'checkbox'
      ? `
    &:before {
      display: inline-flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;

      width: 14px;
      height: 14px;
      margin-top: -2px;
      margin-right: 6px;

      font-family: 'Material Icons';
      font-size: ${13 - 4}px;
      line-height: 14px;
      color: white;

      border-radius: 3px;
      box-shadow: inset 0 0 0 2px ${checked ? '#5096fa' : '#ced4dc'};
      background-color: ${checked ? '#5096fa' : '#white'};
      content: '${checked ? '\\e5ca' : ''}';
    }
  `
      : ''
  }
`,
);

type Props = React.ComponentProps<typeof MenuItemBase>;

const MenuItem = React.forwardRef<HTMLButtonElement, Props>(
  ({ type, ...props }, ref) => (
    <MenuItemBase {...props} ref={ref} type="button" />
  ),
);

export default MenuItem;
