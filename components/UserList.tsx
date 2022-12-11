import { groups, users } from '@prisma/client';
import { FILTERS } from 'constancts/users';
import { useEffect, useState } from 'react';
import internal from 'stream';
import { List, Skeleton, Segmented, Select } from 'antd';
import { AppAvatar } from './styled/AppAvatar.styled';
import styled from 'styled-components';

const UserList = () => {
  const [userlist, setUserlist] = useState<users[]>([]);
  const [groups, getGroups] = useState<groups[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>();
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    FILTERS[0].value
  );

  useEffect(() => {
    fetch(`/api/get-users?group=${selectedGroup}&orderBy=${selectedFilter}`)
      .then((res) => res.json())
      .then((data) => setUserlist(data?.items));
  }, [selectedGroup, selectedFilter]);
  useEffect(() => {
    fetch('/api/get-groups')
      .then((res) => res.json())
      .then((data) => getGroups(data?.items));
  }, []);

  useEffect(() => {
    console.log('selectedGroup: ', selectedGroup);
  }, [selectedGroup]);

  return (
    <>
      <Segmented
        defaultValue={'All'}
        value={selectedGroup}
        onChange={setSelectedGroup}
        options={[
          'All',
          ...groups?.map((item: groups) => ({
            label: item.name,
            value: String(item.id),
          })),
        ]}
      />
      <StyledSelect
        defaultValue={'byname'}
        value={selectedFilter}
        onChange={setSelectedFilter}
        options={FILTERS}
      />
      <List itemLayout="horizontal">
        {userlist &&
          userlist.map((item: users) => (
            <List.Item key={'user-' + item?.id}>
              <List.Item.Meta
                avatar={<AppAvatar src={item?.image_url} />}
                title={item?.name}
                // description={item?.createdAt}
              />
              <div>{item.phone_number}</div>
            </List.Item>
          ))}
      </List>
    </>
  );
};

export default UserList;

const StyledSelect = styled(Select)`
  width: 100px;
`;
