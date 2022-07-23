import React, { useCallback, useState } from 'react'

import { Button, Icon, Input, Menu, Ul, MenuItem } from '../../components'
import { RelativeContainer } from '../../components/container/container'

type Props = {
  list: string[]
  placeholder: string
  selected: string[]
  onSubmit(arg: string[]): void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Selector = ({
  list,
  placeholder,
  selected,
  onSubmit,
  onChange,
}: Props) => {
  // 메뉴 open 상태 state
  const [isOpen, setIsOpen] = useState(false)

  // 메뉴 open 토글 함수
  const toggle = () => setIsOpen((prev) => !prev)

  const handleSelectItem = useCallback((item: string) => {
    onSubmit([item])
    toggle()
  }, [])

  /* [여기에 코드 추가/수정/삭제] */
  return (
    <RelativeContainer>
      <Button>
        {selected.length === 0 ? placeholder : selected[0]}
        {/*selector 확장 컴포넌트*/}
        <div onClick={toggle}>
          {isOpen ? (
            <Icon color="#b2b8bf" size={16}>
              expand_less
            </Icon>
          ) : (
            <Icon color="#b2b8bf" size={16}>
              expand_more
            </Icon>
          )}
        </div>
      </Button>
      {/* <Input placeholder="밸류 선택" /> */}
      {isOpen && (
        <Menu>
          <Ul>
            {list.map((v, i) => {
              return (
                <li key={v + i} onClick={() => handleSelectItem(v)}>
                  <MenuItem itemType="checkbox" checked={selected.includes(v)}>
                    {v}
                  </MenuItem>
                </li>
              )
            })}
          </Ul>
        </Menu>
      )}
    </RelativeContainer>
  )
}

export default Selector
