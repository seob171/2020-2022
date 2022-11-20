import styled from '@emotion/styled'

const Input = styled.input`
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  height: 32px;
  line-height: 1;
  border: 1px solid #dde1e8;
  border-radius: 3px;
  font-size: 12px;
  color: #575a5e;
  text-overflow: ellipsis;
  box-shadow: inset 1px 1px 2px 0 rgba(0, 0, 0, 0.04);

  &:focus {
    border: 1px solid #2f87f7;
    outline: none;
  }

  &::placeholder {
    color: #b2b8bf;
    line-height: inherit !important;
  }
`

export default Input
