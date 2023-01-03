import { useEffect, useState, useContext } from 'react';
import { groups, users } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { List, Select, Segmented, Input, Button, Modal, Form } from 'antd';
import {
  SearchOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { AppAvatar } from './styled/AppAvatar.styled';
import { FILTERS } from 'constants/users';

import { AppContext } from 'context/context';
import UserAddModal from './UserAddModal';

const UserList = () => {
  const { isModalOpen, setIsModalOpen } = useContext(AppContext);

  const [userlist, setUserlist] = useState<users[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | number>();
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    FILTERS[0].value
  );

  const [searchValue, setSearchValue] = useState('');

  const { data: groupsData } = useQuery<{ items: groups[] }, unknown, groups[]>(
    ['/api/get-groups'],
    () => fetch('/api/get-groups').then((res) => res.json()),
    { select: (data) => data.items }
  );

  useEffect(() => {
    fetch(
      `/api/get-users?group=${selectedGroup}&orderBy=${selectedFilter}&contains=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => setUserlist(data?.items));
  }, [selectedGroup, selectedFilter, searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelect = (value: string) => {
    setSelectedFilter(value);
    console.log('handleSelect', value);
  };

  return (
    <>
      {groupsData && (
        <Segmented
          defaultValue={'All'}
          value={selectedGroup}
          onChange={setSelectedGroup}
          options={[
            'All',
            ...groupsData.map((group) => ({
              label: group.name,
              value: String(group.id),
            })),
          ]}
        />
      )}
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
      <p>
        <TeamOutlined /> {userlist?.length}
      </p>
      <Button
        type="primary"
        icon={<UserAddOutlined />}
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      <UserAddModal />
      <List itemLayout="horizontal">
        {userlist &&
          userlist.map((item: users) => (
            <List.Item key={'user-' + item?.id}>
              <List.Item.Meta
                avatar={<AppAvatar src={item?.image_url} />}
                title={item?.name}
                // description={item?.createdAt}
              />
              <div>0{item.phone_number}</div>
            </List.Item>
          ))}
      </List>
    </>
  );
};

export default UserList;
