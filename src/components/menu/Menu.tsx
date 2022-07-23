import styled from '@emotion/styled';

const Menu = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-width: 120px;
  max-height: 300px;

  padding: 5px 0;
  flex-grow: 1;
  overflow-y: scroll;

  background-color: white;
  border: 1px solid #c3c9d0;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 0 2px rgba(0, 0, 0, 0.06);
  border-radius: 3px;

  z-index: 40;
`;

export default Menu;
