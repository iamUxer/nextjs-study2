import { useContext } from 'react';
import { Modal, Form } from 'antd';
import { AppContext } from 'context/context';

const UserAddModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(AppContext);

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={() => {
        setIsModalOpen(false);
      }}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <p>Some contents...</p>
    </Modal>
  );
};

export default UserAddModal;
