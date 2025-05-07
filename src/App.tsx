// src/App.tsx
import {  useState } from 'react'
import './App.css'
import { TodoItemType } from './type'

const LocalStorageKey = 'todos'

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [tagInput, setTagInput] = useState<string>('')  // ←追加

  // カウントはそのまま…

  // TODO 追加（tags も受け取る）
  const addTodo = (title: string, tags: string[]) => {
    const newTodo: TodoItemType = {
      id: Math.floor(Math.random() * 10000),
      title,
      completed: false,
      createdAt: new Date(),
      tags,      // ←ここに tags をセット
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    localStorage.setItem(LocalStorageKey, JSON.stringify(newTodos))
  }

  // 以降 toggleTodo / deleteTodo / updateTodoTitle / fetchTodos は省略…

  return (
    <>
      <h1>今日の一日やること リスト</h1>
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="TODOを追加"
          style={{ flex: 1 }}
        />
        <input
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          placeholder="タグをカンマ区切りで追加"
          style={{ flex: 1 }}
        />
        <button onClick={() => {
          const tags = tagInput
            .split(',')
            .map(t => t.trim())
            .filter(t => t !== '')  // ここで暗黙 any にはなりません
          addTodo(inputValue, tags)
          setInputValue('')
          setTagInput('')
        }}>
          追加
        </button>
      </div>
      {/* あとは既存の件数表示／TodoSection 呼び出し */}
    </>
  )
}
export default App
