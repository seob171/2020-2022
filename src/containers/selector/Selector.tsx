import React from 'react';

import {
  Button,
  Icon,
  Input,
  Menu,
  MenuItem,
} from '../../components';

type Props = {
  list: string[];
  placeholder: string;
  selected: string[];
  onSubmit(arg: string[]): void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

const Selector = ({
  list,
  placeholder,
  selected,
  onSubmit,
  onChange,
}: Props) => {
  /* [여기에 코드 추가/수정/삭제] */
  return (
    <div>
      <Button>
        밸류 선택
        <Icon color="#b2b8bf" size={16}>
          expand_more
        </Icon>
        <Icon color="#b2b8bf" size={16}>
          expand_less
        </Icon>
      </Button>
      {/* <Input placeholder="밸류 선택" /> */}
      <Menu>
        <ul>
          <li>
            <MenuItem itemType="checkbox" checked>
              메뉴 1
            </MenuItem>
          </li>
          <li>
            <MenuItem itemType="checkbox" checked={false}>
              메뉴 2
            </MenuItem>
          </li>
        </ul>
      </Menu>
    </div>
  );
};

export default Selector;
