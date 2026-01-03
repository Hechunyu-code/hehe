import { Input, Button, List, Checkbox, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "../../store/redux/todoSlice";

const { Title } = Typography;

const TodoRedux = () => {
  const [inputValue, setInputValue] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addTodo(inputValue));
    setInputValue("");
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <Title level={4}>TodoList（Redux Toolkit）</Title>
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
              <Button
                type="text"
                danger
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                删除
              </Button>,
            ]}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
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

export default TodoRedux;
