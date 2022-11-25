import { Avatar, List, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const AppAvatar = styled(Avatar)`
  background: cornflowerblue;
`;

type userType = {
  id: string;
  name: string;
  image_url: string;
};

const UserList = () => {
  const [userlist, setUserlist] = useState<userType[]>([]);
  useEffect(() => {
    fetch('/api/get-user')
      .then((res) => res.json())
      .then((data) => setUserlist(data?.items));
  }, []);

  return (
    <List itemLayout="horizontal">
      {userlist &&
        userlist.map((item) => (
          <List.Item key={'user-' + item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item.image_url} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={'user - ' + item.id}
            />
          </List.Item>
        ))}
    </List>
  );
};

export default UserList;
