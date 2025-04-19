import { TodoItemType } from "../type"

type Props = {
    todo: TodoItemType,
    onClick: () => void,
}

export const TodoItem = ({ todo, onClick }: Props) => {

    const dateLabelData = todo.completed ? {
        label: "完了日",
        date: todo.completedAt,
    } : {
        label: "登録日",
        date: todo.createdAt,
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff',
        }}
      >
        {/* チェックボックス */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onClick}
          style={{
            marginRight: '10px',
          }}
        />
        {/* TODOのタイトル */}
        <span>
          {todo.title}
        </span>
        {/* TODOの日時*/}
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '12px',
            color: '#aaa',
          }}
        >
          {dateLabelData.label}: {dateLabelData?.date?.toLocaleDateString()} {dateLabelData?.date?.toLocaleTimeString()}
        </span>
      </div>
    )
}