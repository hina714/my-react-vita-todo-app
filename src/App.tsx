import { useEffect, useState } from 'react'
import './App.css'
import { TodoItemType } from './type'
import { TodoSection } from './components/TodoSection'

const LocalStorageKey = 'todos'


function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  


  // カウント
  const totalCount      = todos.length
  const incompleteCount = todos.filter(t => !t.completed).length
  const completeCount   = todos.filter(t => t.completed).length

  // TODOの追加
  const addTodo = (title: string) => {
    const newTodo: TodoItemType = {
      id: Math.floor(Math.random() * 10000),
      title,
      completed: false,
      createdAt: new Date(),
      tags: [],   
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    writeTodos(newTodos)
  }

  // TODOの完了トグル
  const toggleTodo = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, completedAt: todo.completed ? undefined : new Date() }
        : todo
    )
    setTodos(newTodos)
    writeTodos(newTodos)
  }

  // 未完了タスクを削除
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(t => t.id !== id)
    setTodos(newTodos)
    writeTodos(newTodos)
  }

  // タイトル編集ハンドラ
  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, title: newTitle }
          : t
      )
    )
  }

  // ローカルストレージ書き込み
  const writeTodos = (todos: TodoItemType[]) => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(todos))
  }

  // ローカルストレージ読み込み
  const fetchTodos = () => {
    const stored = localStorage.getItem(LocalStorageKey)
    if (stored) {
      const parsed: TodoItemType[] = JSON.parse(stored)
      setTodos(parsed.map(t => ({
        ...t,
        createdAt: new Date(t.createdAt),
        completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
      })))
    }
  }

  useEffect(fetchTodos, [])

  return (
    <>
      <h1>今日の一日やること リスト</h1>
      {/* 入力フォーム */}
      <div className="todo-count" style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="TODOを追加"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          style={{ flex: 1, height: 40, padding: '0 10px', borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="タグをカンマ区切りで追加"
         value={tagInput}
         onChange={e => setTagInput(e.target.value)}
         style={{ flex: 1, height: 40, padding: '0 10px', borderRadius: 4, border: '1px solid #ccc' }}
       />
        <button onClick={() => { 
          const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean)
          addTodo(inputValue, tags); 
          setInputValue('') }}>
          setTagInput('')
          追加
        </button>
      </div>

      {/* 件数表示 */}
      <div className="todo-count" style={{ margin: '1rem 0', fontSize: 14 }}>
        全体: {totalCount} 件／未完了: {incompleteCount} 件／完了: {completeCount} 件
      </div>

      {/* セクション */}
      <div style={{ marginTop: 20, borderTop: '1px solid #ccc', paddingTop: 10 }}>
        <TodoSection
          title="未完了のタスク"
          color="#007bff"
          todos={todos}
          showCompleted={false}
          onToggle={toggleTodo}
          onEdit={updateTodoTitle}
          onDelete={deleteTodo}
        />
        <TodoSection
          title="完了したタスク"
          color="#28a745"
          todos={todos}
          showCompleted={true}
          onToggle={toggleTodo}
          // onDelete は渡さない
        />
      </div>
    </>
  )
}

export default App
