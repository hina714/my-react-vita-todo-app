import { useState } from 'react'
import { TodoItemType } from '../type'

type Props = {
  todo: TodoItemType
  onClick: () => void
  onEdit: (newTitle: string) => void
}

export function TodoItem({ todo, onClick, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)

  // 編集モード中
  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
        <button
          onClick={() => {
            const trimmed = draft.trim()
            if (trimmed) {
              onEdit(trimmed)
            }
            setIsEditing(false)
          }}
        >
          保存
        </button>
        <button
          onClick={() => {
            setDraft(todo.title)
            setIsEditing(false)
          }}
        >
          キャンセル
        </button>
      </div>
    )
  }

  // 通常表示
  return (
    <div className="todo-item">
      <span onDoubleClick={() => setIsEditing(true)}>
        {todo.title}
      </span>
      <button onClick={onClick}
        style={{
              backgroundColor: '#e83c3c',  // ボタンの背景色
              color: '#faeded',                // 文字色
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer'
        }}
      >
        完了
      </button>
    </div>
  )
}
