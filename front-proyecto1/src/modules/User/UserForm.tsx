import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import MyTable from './Table';

function Userform() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Todos los datos del formulario:', values);
  };

  return (
    <>
    <Form
      form={form}
      name="basic"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
    <MyTable/>
    </>
  );
}

export default Userform;
