import { groups, users } from '@prisma/client';
import { FILTERS } from 'constants/users';
import { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { List, Select, Segmented, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AppAvatar } from './styled/AppAvatar.styled';

type filterType = {
  handleSelect: (value: string) => void;
  value: string;
  label: string;
};

const UserList = () => {
  const [userlist, setUserlist] = useState<users[]>([]);
  const [groups, getGroups] = useState<groups[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | number>();
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    FILTERS[0].value
  );

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch(
      `/api/get-users?group=${selectedGroup}&orderBy=${selectedFilter}&contains=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => setUserlist(data?.items));
  }, [selectedGroup, selectedFilter, searchValue]);
  useEffect(() => {
    fetch('/api/get-groups')
      .then((res) => res.json())
      .then((data) => getGroups(data?.items));
  }, []);

  useEffect(() => {
    console.log('selectedGroup: ', selectedGroup, 'groups: ', groups);
  }, [selectedGroup, groups]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelect = (value: string) => {
    setSelectedFilter(value);
    console.log('handleSelect', value);
  };

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
      <Select
        defaultValue={'byname'}
        value={selectedFilter}
        onChange={handleSelect}
        options={FILTERS}
      />
      <Input
        placeholder="Search by name"
        prefix={<SearchOutlined />}
        onChange={handleSearch}
        value={searchValue}
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
