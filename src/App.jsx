import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import NavTabs from "./components/NavTabs";
import TodoContext from "./components/TodoContext";
import TodoRedux from "./components/TodoRedux";
import TodoZustand from "./components/TodoZustand";
import FormPage from "./pages/FormPage";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        <NavTabs />
        <Routes>
          <Route path="/" element={<TodoContext />} />
          <Route path="/redux-todo" element={<TodoRedux />} />
          <Route path="/zustand-todo" element={<TodoZustand />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
