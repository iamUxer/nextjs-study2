import { useEffect, useState } from 'react';
import internal from 'stream';
import { List, Skeleton } from 'antd';
import { AppAvatar } from './styled/Avatar.styled';

type userType = {
  id: string;
  name: string;
  image_url: string;
  createdAt: string;
  phone_number: string;
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
              avatar={<AppAvatar src={item.image_url} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.createdAt}
            />
            <div>{item.phone_number}</div>
          </List.Item>
        ))}
    </List>
  );
};

export default UserList;
