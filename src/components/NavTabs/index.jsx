import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const NavTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "/", label: "TodoList（Context）" },
    { key: "/redux-todo", label: "TodoList（Redux）" },
    { key: "/zustand-todo", label: "TodoList（Zustand）" },
    { key: "/form", label: "表单校验" },
  ];

  const handleTabChange = (key) => {
    navigate(key);
  };

  return (
    <Tabs
      activeKey={location.pathname}
      onChange={handleTabChange}
      items={items}
      style={{ marginBottom: 20 }}
    />
  );
};

export default NavTabs;
