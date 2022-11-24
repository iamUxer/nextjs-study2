import { Avatar } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

const AppProfile = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 3em 1em;
`;

const Profile = () => {
  return (
    <AppProfile>
      <Avatar
        style={{
          backgroundColor: 'orange',
          verticalAlign: 'middle',
        }}
        size={128}
      >
        {'User'}
      </Avatar>
    </AppProfile>
  );
};

export default Profile;
