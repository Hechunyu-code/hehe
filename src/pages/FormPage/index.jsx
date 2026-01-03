import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  message,
  Checkbox,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const { Option } = Select;

const FormPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const validatePhone = (_, value) => {
    if (!value) return Promise.reject(new Error("请输入手机号"));
    const reg = /^1[3-9]\d{9}$/;
    if (!reg.test(value))
      return Promise.reject(new Error("请输入正确的手机号"));
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("表单提交成功！");
      console.log("表单数据：", values);
      form.resetFields();
    } catch (err) {
      message.error("表单提交失败！");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("表单校验失败：", errorInfo);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          gender: "male",
          birthday: dayjs("2000-01-01"),
          agree: false,
        }}
        validateMessages={{
          required: "${label}为必填项！",
          types: {
            email: "${label}格式不正确！",
            number: "${label}必须为数字！",
          },
        }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true },
            { min: 3, max: 10, message: "用户名长度需在3-10个字符之间" },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "用户名只能包含字母、数字、下划线",
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ validator: validatePhone }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item label="性别" name="gender" rules={[{ required: true }]}>
          <Select placeholder="请选择性别">
            <Option value="male">男</Option>
            <Option value="female">女</Option>
            <Option value="other">其他</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          rules={[
            { required: true, type: "number" },
            { min: 18, max: 100, message: "年龄需在18-100之间" },
          ]}
        >
          <InputNumber
            min={18}
            max={100}
            style={{ width: "100%" }}
            placeholder="请输入年龄"
          />
        </Form.Item>

        <Form.Item
          label="出生日期"
          name="birthday"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("请同意用户协议")),
            },
          ]}
        >
          <Checkbox>我已阅读并同意《用户协议》</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            提交表单
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPage;
