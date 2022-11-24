import { Avatar, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const AppAvatar = styled(Avatar)`
  background: cornflowerblue;
`;

type userType = {
  id: string;
  properties: {
    id: string;
    name: string;
  }[];
};

const UserList = () => {
  const [userlist, setUserlist] = useState<userType[]>([]);
  useEffect(() => {
    fetch('/api/get-user')
      .then((res) => res.json())
      .then((data) => setUserlist(data?.items));
  }, []);
  //   useEffect(() => {
  //     console.log('setUserlist : ', userlist[0]);
  //     console.log(Object.entries(userlist.properties));
  //   }, [userlist]);

  return (
    <List itemLayout="horizontal">
      {userlist &&
        userlist.map((item) => (
          <List.Item key={item.id}>
            {/* {Object.values(item.properties.name)} */}
            {/* {item.properties && console.log(Object.entries(item.properties))} */}
            <List.Item.Meta
              avatar={<AppAvatar src={<UserOutlined />} />}
              title={
                <a href="">
                  {JSON.stringify(item.properties)}
                  {/* {Object.entries(item.properties)} */}
                  {/* {item.properties} */}
                </a>
              }
              description="Message"
            />
          </List.Item>
        ))}
    </List>
  );
};

export default UserList;
