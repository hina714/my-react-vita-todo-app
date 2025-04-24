// components/TodoItem.tsx
import { useState } from 'react';
import { TodoItemType } from '../type';

type Props = {
  /** TODO アイテム */
 todo: TodoItemType;
  onClick: () => void;
    /** タイトル編集時のハンドラ */
 onEdit: (newTitle: string) => void;
};

export function TodoItem({ todo, onClick, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  return isEditing ? (
    <div className="todo-item editing">
      <input
        value={draft}
        onChange={e => setDraft(e.target.value)}
      />
      <button
        onClick={() => {
          const trimmed = draft.trim();
          if (trimmed) {
            onEdit(trimmed);
          }
          setIsEditing(false);
        }}
      >
        保存
      </button>
      <button onClick={() => {
        setDraft(todo.title);
        setIsEditing(false);
      }}>
        キャンセル
      </button>
    </div>
  ) : (
    <div className="todo-item">
      <span onDoubleClick={() => setIsEditing(true)}>
        {todo.title}
      </span>
      <button onClick={onClick}>
        完了
      </button>
    </div>
  );
}
