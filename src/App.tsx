import { useEffect, useState } from 'react'
import './App.css'

type TodoItem = {
  id: number,
  title: string,
  // 完了してたら true, そうでなければ false
  completed: boolean,
  // 登録日
  createdAt: Date,
  // 完了日
  completedAt?: Date,
}

const LocalStorageKey = 'todos'

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])

  // TODOの追加処理
  const addTodo = (title: string) => {
    const newTodo: TodoItem = {
      id: Math.floor(Math.random() * 10000),
      title,
      completed: false,
      createdAt: new Date(),
    }

    const newTodos = [...todos, newTodo]

    // setTodos を使って、todos の状態を更新する
    // 1. prevTodos を引数に取る関数を渡す
    // 2. prevTodos の配列に新しい TODO を追加して返す
    // 3. 新しい TODO を追加した配列を setTodos に渡す
    setTodos(newTodos)
    // todos をローカルストレージに保存する
    writeTodos(newTodos)
  }

  // TODOの完了
  const toggleTodo = (id: number) => {
    // setTodos を使って、todos の状態を更新する
    // 1. prevTodos を引数に取る関数を渡す
    // 2. prevTodos の配列の中から、id が一致する TODO を探す
    // 3. 一致する TODO の completed を反転させて返す
    // 4. 新しい TODO を追加した配列を setTodos に渡す
    const newTodos = todos.map((todo) => {
      // id が一致する TODO を探す
      if (todo.id === id) {
        // 一致する TODO の completed を反転させる
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: todo.completed ? undefined : new Date(),
        }
      }
      // 一致しない TODO はそのまま返す
      return todo
    })

    setTodos(newTodos)
    // todos をローカルストレージに保存する
    writeTodos(newTodos)
  }

  const [inputValue, setInputValue] = useState('')

  const writeTodos = (todos: TodoItem[]) => {
    const todosString = JSON.stringify(todos)

    // ローカルストレージに todos を保存する
    localStorage.setItem(LocalStorageKey, todosString)
    console.log('todosString', todosString)
  }    

  const fetchTodos = () => {
    // ローカルストレージから todos を取得する
    const todos = localStorage.getItem(LocalStorageKey)
    console.log('todos', todos)
    if (todos) {
      // JSON.parse を使って、文字列をオブジェクトに変換する
      const parsedTodos: TodoItem[] = JSON.parse(todos)
      // parsedTodos の中の completedAt を Date 型に変換する
      const todosWithDate = parsedTodos.map((todo) => {
        return {
          ...todo,
          createdAt: new Date(todo.createdAt),
          completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
        }
      })
      // setTodos を使って、todos の状態を更新する
      setTodos(todosWithDate)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])


  return (
    <>
      <h1>今日の一日やること リスト</h1>
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          type="text"
          placeholder="TODOを追加"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '100%',
            height: '40px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0 10px'
          }}
        />
        <button
          onClick={() => {
            addTodo(inputValue)
            // 入力値をリセット
            setInputValue('')
          }}
          style={{
            marginLeft: '10px',
            width: '100px',
            height: '40px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '0 20px'
          }}
        >
          追加
        </button>
      </div>

      <div
        style={{
          marginTop: '20px',
          borderTop: '1px solid #ccc',
          paddingTop: '10px',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#007bff',
          }}
        >
          未完了のタスク
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {todos.map((todo) => {
            // 完了している TODO は表示しない
            if (todo.completed) {
              return <></>
            }

            return (
              <div
                key={todo.id}
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
                  onChange={() => toggleTodo(todo.id)}
                  style={{
                    marginRight: '10px',
                  }}
                />
                {/* TODOのタイトル */}
                <span>
                  {todo.title}
                </span>
                {/* TODOの登録日 日時*/}
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '12px',
                    color: '#aaa',
                  }}
                >
                  登録日: {todo.createdAt.toLocaleDateString()} {todo.createdAt.toLocaleTimeString()}
                </span>
              </div>
            )
          })}
        </div>

        <h2
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#28a745',
          }}
        >
          完了したタスク
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {todos.map((todo) => {
            // 未完了の TODO は表示しない
            if (!todo.completed) {
              return <></>
            }

            return (
              <div
                key={todo.id}
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
                  onChange={() => toggleTodo(todo.id)}
                  style={{
                    marginRight: '10px',
                  }}
                />
                {/* TODOのタイトル */}
                <span>
                  {todo.title}
                </span>
                {/* TODOの登録日 日時*/}
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '12px',
                    color: '#aaa',
                  }}
                >
                  完了日: {todo.completedAt?.toLocaleDateString()} {todo.completedAt?.toLocaleTimeString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
