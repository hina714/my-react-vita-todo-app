import { useState } from 'react'
import { TodoItemType } from '../type'

type Props = {
  todo: TodoItemType
  onClick: () => void
  onEdit: (newTitle: string) => void
  onDelete?: () => void
}

export function TodoItem({ todo, onClick, onEdit, onDelete }: Props) {
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
              backgroundColor: '#62b7f0',  
              color: '#faeded',                
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer'
        }}
      >
        完了
      </button>

      {onDelete && (
      <button
         onClick={onDelete}
         style={{
           backgroundColor: '#dc3545', // 赤色
           color: '#fff',
           border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
           cursor: 'pointer',
         }}
      >
         削除
      </button>
     )}
     <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
       {todo.tags.map(tag => (
         <span 
           key={tag} 
           style={{
             backgroundColor: '#eee',
             padding: '2px 6px',
             borderRadius: '4px',
             fontSize: '12px'
           }}
        >
           {tag}
         </span>
      ))}
     </div>
    </div>
  )
}
