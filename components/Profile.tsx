import { AppProfile } from './styled/Profile.styled';
import { Avatar } from 'antd';

const Profile = () => {
  return (
    <AppProfile>
      <Avatar size={128}>{'User'}</Avatar>
    </AppProfile>
  );
};

export default Profile;
