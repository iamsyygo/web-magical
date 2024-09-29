import { Button, Checkbox, Divider, Form, FormProps, Input } from 'antd';
import React from 'react';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const SignIn: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-white">
      <div className="w-120px min-w-120px flex items-center gap-10px fixed top-24px left-24px">
        <img src="/logo.svg" alt="" className="w-25px h-25px" />
        <div className="text-16px font-bold text-black ml-8px">Admin</div>
      </div>
      <div className="text-center">
        <div className="text-26px font-bold text-black">Welcome to Admin！</div>
        <div className="text-12px text-[#a1a1aa]">App management designed for teams and ingvviduals</div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-320px text-left mt-24px"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: <div className="text-10px color-red">请输入用户名！</div> }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: <div className="text-10px color-red">请输入密码！</div> }]}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ span: 24 }}>
            <Checkbox className="text-12px">记得我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className="w-full">
              登入
            </Button>
          </Form.Item>
        </Form>
        <Divider>Or</Divider>
        <div className="flex items-center justify-center gap-18px text-18px">
          <div className="i-logos:github-icon w-1em h-1em cursor-pointer"></div>
          <div className="i-logos:google-icon w-1em h-1em cursor-pointer"></div>
        </div>
      </div>

      <div className="w-full fixed bottom-12px left-0 text-[#a1a1aa] text-12px text-center">
        By clicking "Sign in with Google" or "Continue with email" you agree to our Terms of Use and Privacy policy.
      </div>
    </div>
  );
};

export default SignIn;
