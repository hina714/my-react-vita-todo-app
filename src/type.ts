// src/type.ts
export type TodoItemType = {
    id: number
    title: string
    completed: boolean
    createdAt: Date
    completedAt?: Date
    tags: string[]           // ←追加
  }
  