import { useContext } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AppContext } from 'context/context';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const UserAddModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(AppContext);
  const [form] = Form.useForm();

  const onFinish = (users: any) => {
    console.log(users);
    fetch(`/api/add-users`, {
      method: 'POST',
      body: JSON.stringify({
        ...users,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log('fetch result:::', result));
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
        <Form.Item name="birthday" label="Birthday">
          <DatePicker />
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
