import Link from 'next/link';
import { PhoneOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styled from 'styled-components';

const AppLayoutStyled = styled.div`
  height: 100%;
`;

const AppMenu = styled(Menu)`
  li {
    flex: 1;
    text-align: center;
  }
`;

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <AppMenu mode="horizontal">
        <Menu.Item icon={<PhoneOutlined />} key="home">
          <Link href="/">
            <a>My Phone Book</a>
          </Link>
        </Menu.Item>
      </AppMenu>
      <AppLayoutStyled>{children}</AppLayoutStyled>
    </>
  );
};

export default AppLayout;
