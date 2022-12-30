import { useContext } from 'react';
import { Modal, Form } from 'antd';
import { appContext } from 'context/context';

const UserAddModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(appContext);

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
