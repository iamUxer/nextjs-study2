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
import { UserAddModalContext } from 'pages/_app';

const UserAddModal = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { isModalOpen, setIsModalOpen } = useContext(UserAddModalContext);
  console.log('sampleUserAddModalContext:', UserAddModalContext);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default UserAddModal;
