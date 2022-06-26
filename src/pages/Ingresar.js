import React, { useState } from 'react';

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';

import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 14 },
};

export const Ingresar = () => {
  const history = useHistory();
  const [usuario] = useState(getUsuarioStorage());

  useHideMenu(false);

  const onFinish = ({ agente, escritorio }) => {
    localStorage.setItem('agente', agente);
    localStorage.setItem('escritorio', escritorio);

    history.push('/escritorio');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (usuario.agente && usuario.escritorio) {
    return <Redirect to="/escritorio" />;
  }

  return (
    <>
      <Title level={2}>Login</Title>
      <Text>Type your name and your desk</Text>
      <Divider />

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name of the Office Worker"
          name="agente"
          rules={[{ required: true, message: 'Please type your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desk"
          name="escritorio"
          rules={[{ required: true, message: 'Type the number of desk' }]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
