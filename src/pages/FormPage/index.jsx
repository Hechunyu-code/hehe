import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  message,
  Checkbox,
  Space,
  ConfigProvider, // 新增：AntD 主题配置组件
  Radio, // 新增：主题选择单选框
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
// 新增：引入 AntD 官方主题包（先安装依赖）
import "antd/dist/reset.css";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // 辅助主题切换
import zhCN from "antd/locale/zh_CN"; // 中文语言包

const { Option } = Select;

const FormPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // 新增：主题状态管理（默认亮色）
  const [theme, setTheme] = useState("light");

  // 新增：定义主题配置（AntD 支持的主题参数）
  const themeConfig = {
    light: {
      token: {
        colorPrimary: "#1677ff", // 蓝色（默认）
        borderRadius: 4,
        fontSize: 14,
      },
      algorithm: [], // 亮色算法
    },
    dark: {
      token: {
        colorPrimary: "#25b864", // 绿色
        borderRadius: 4,
        fontSize: 14,
      },
      algorithm: [ConfigProvider.darkAlgorithm], // 暗色算法
    },
    sakura: {
      token: {
        colorPrimary: "#ff6b8b", // 樱花粉
        borderRadius: 8,
        fontSize: 14,
      },
      algorithm: [], // 亮色+粉色主题
    },
  };

  // 新增：主题切换事件
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    message.success(
      `已切换为${
        e.target.value === "light"
          ? "亮色"
          : e.target.value === "dark"
          ? "暗色"
          : "樱花色"
      }主题✨`
    );
  };

  // 手机号校验逻辑（保留原有）
  const validatePhone = (_, value) => {
    if (!value) return Promise.reject(new Error("请输入手机号"));
    const reg =
      /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    if (!reg.test(value))
      return Promise.reject(
        new Error("请输入正确的手机号（支持13/14/15/16/17/18/19开头）")
      );
    return Promise.resolve();
  };

  // 表单提交逻辑（保留原有）
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("表单提交成功！");
      console.log("表单数据：", values);
      form.resetFields();
      form.setFieldsValue({ agree: false });
    } catch (err) {
      message.error("表单提交失败！");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 表单重置逻辑（保留原有）
  const onFinishFailed = (errorInfo) => {
    console.log("表单校验失败：", errorInfo);
  };

  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue({ agree: false });
    message.info("表单已重置！");
  };

  return (
    // 新增：ConfigProvider 包裹整个表单，应用主题
    <ConfigProvider theme={themeConfig[theme]} locale={zhCN}>
      <div
        style={{
          maxWidth: 600,
          margin: "20px auto",
          padding: "20px",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* 新增：主题切换区域 */}
        <div style={{ marginBottom: 20, textAlign: "right" }}>
          <span style={{ marginRight: 10 }}>选择主题：</span>
          <Radio.Group value={theme} onChange={handleThemeChange}>
            <Radio value="light">亮色</Radio>
            <Radio value="dark">暗色</Radio>
            <Radio value="sakura">樱花色</Radio>
          </Radio.Group>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          用户信息收集表单
        </h2>
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
          {/* 用户名 */}
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

          {/* 邮箱 */}
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          {/* 手机号 */}
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ validator: validatePhone }]}
          >
            <Input
              placeholder="请输入您的常用手机号（仅支持11位）"
              style={{ border: "1px solid green" }}
            />
          </Form.Item>

          {/* 性别 */}
          <Form.Item label="性别" name="gender" rules={[{ required: true }]}>
            <Select placeholder="请选择性别">
              <Option value="male">男</Option>
              <Option value="female">女</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>

          {/* 年龄 */}
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

          {/* 出生日期 */}
          <Form.Item
            label="出生日期"
            name="birthday"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          {/* 协议勾选 */}
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

          {/* 按钮区域 */}
          <Form.Item>
            <Space size="middle" style={{ width: "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ flex: 1 }}
              >
                提交表单
              </Button>
              <Button type="default" onClick={handleReset} style={{ flex: 1 }}>
                重置表单
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default FormPage;
