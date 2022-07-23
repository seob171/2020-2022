import styled from '@emotion/styled'

export const RelativeContainer = styled.div`
  position: relative;
`
export const InputContainer = styled.div`
  flex-shrink: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(229, 233, 238);
`

export const MenuListContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 120px;
  max-height: 300px;
  margin-top: 2px;
  background-color: white;
  border: 1px solid rgb(195, 201, 208);
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px, rgb(0 0 0 / 6%) 0px 0px 2px;
  border-radius: 3px;
  z-index: 40;
`
