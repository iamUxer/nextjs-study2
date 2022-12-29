import { useContext, useEffect } from 'react';
import { Modal, Form } from 'antd';
import { UserAddModalContext } from 'pages/_app';

const UserAddModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(UserAddModalContext);

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
