import { Input, Button, List, Checkbox, Space, Typography } from "antd";
import { useState } from "react";
import { TodoProvider, useTodoContext } from "./TodoContext";

const { Title } = Typography;

const TodoContent = () => {
  const [inputValue, setInputValue] = useState("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoContext();

  const handleAdd = () => {
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <Title level={4}>TodoList（Context + useState）</Title>
      <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
        <Input
          placeholder="请输入待办事项"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
        />
        <Button type="primary" onClick={handleAdd}>
          添加
        </Button>
      </Space.Compact>
      <List
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button type="text" danger onClick={() => deleteTodo(todo.id)}>
                删除
              </Button>,
            ]}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            >
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#999" : "inherit",
                }}
              >
                {todo.text}
              </span>
            </Checkbox>
          </List.Item>
        )}
        bordered
        locale={{ emptyText: "暂无待办事项" }}
      />
    </div>
  );
};

const TodoContextPage = () => {
  return (
    <TodoProvider>
      <TodoContent />
    </TodoProvider>
  );
};

export default TodoContextPage;
