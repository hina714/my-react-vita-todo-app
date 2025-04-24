import { Fragment } from 'react';
import { TodoItemType } from '../type';
import { TodoHeading } from './TodoHeading';
import { TodoItem } from './TodoItem';

type Props = {
  /** セクションのタイトル */
  title: string;
  /** 見出しの色 */
  color: string;
  /** 全 TODO 一覧 */
  todos: TodoItemType[];
  /** このセクションに表示する completed フラグ */
  showCompleted: boolean;
  /** トグル時のハンドラ */
  onToggle: (id: number) => void;
   /** タイトル編集時のハンドラ */
   onEdit?: (id: number, newTitle: string) => void
};

export function TodoSection({
  title,
  color,
  todos,
  showCompleted,
  onToggle,
  onEdit,
}: Props) {
  // 完了済／未完了でフィルタ
  const sectionTodos = todos.filter(t => t.completed === showCompleted);

  // 0件なら何も返さない（非表示）
  if (sectionTodos.length === 0) return null;

  return (
    <section style={{ marginBottom: '2rem' }}>
      <TodoHeading title={title} color={color} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionTodos.map(todo => (
          <Fragment key={todo.id}>
            {showCompleted
              ? (
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
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    style={{ marginRight: '10px' }}
                  />
                  <span>{todo.title}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#aaa' }}>
                    完了日: {todo.completedAt?.toLocaleDateString()} {todo.completedAt?.toLocaleTimeString()}
                  </span>
                </div>
              )
              : (
               
                <TodoItem
                 key={todo.id}
                 todo={todo}
                 onClick={() => onToggle(todo.id)}
                 /* onEdit が渡されていれば呼び出す */
                 onEdit={(newTitle: string) => onEdit?.(todo.id, newTitle)}
     />
              )
            }
          </Fragment>
        ))}
      </div>
    </section>
  );
}
