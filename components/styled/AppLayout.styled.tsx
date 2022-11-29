import styled from 'styled-components';
import { Menu } from 'antd';

export const AppLayoutStyled = styled.div`
  height: 100%;
`;

export const AppMenu = styled(Menu)`
  li {
    flex: 1;
    text-align: center;
  }
`;
