import Link from 'next/link';
import { PhoneOutlined } from '@ant-design/icons';
import { AppLayoutStyled, AppMenu } from './styled/AppLayout.styled';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <AppMenu mode="horizontal">
        <AppMenu.Item icon={<PhoneOutlined />} key="home">
          <Link href="/">
            <a>My Phone Book</a>
          </Link>
        </AppMenu.Item>
      </AppMenu>
      <AppLayoutStyled style={{ height: '100%' }}>{children}</AppLayoutStyled>
    </>
  );
};

export default AppLayout;
