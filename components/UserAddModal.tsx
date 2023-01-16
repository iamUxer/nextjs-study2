import { Dispatch, SetStateAction, useContext } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AppContext } from 'context/context';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface GreetingsProps {
  setSelectedGroup: (value: string | number | undefined) => void;
}

const UserAddModal = ({ setSelectedGroup }: GreetingsProps) => {
  const { isModalOpen, setIsModalOpen } = useContext(AppContext);
  const [form] = Form.useForm();

  interface usersForm {
    name: string;
    phone_number?: number | null;
    group_id?: number | null;
    birthday?: Date | null;
    description?: string;
    image_url?: object;
  }

  const onFinish = (users: usersForm) => {
    console.log('usersForm:::::', users);

    fetch(`/api/add-users`, {
      method: 'POST',
      body: JSON.stringify({
        ...users,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setSelectedGroup('');
        setIsModalOpen(false);
      });
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
      <Form
        name="users-form"
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="phone_number" label="Phone Number">
          <Input />
        </Form.Item>
        <Form.Item name="group_id" label="Select Group">
          <Select>
            <Select.Option value="1">Default</Select.Option>
            <Select.Option value="2">Friends</Select.Option>
            <Select.Option value="3">Colleague</Select.Option>
            <Select.Option value="4">Study-Parties</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="image_url"
          label="Picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default UserAddModal;
