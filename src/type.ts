export type TodoItemType = {
    id: number,
    title: string,
    // 完了してたら true, そうでなければ false
    completed: boolean,
    // 登録日
    createdAt: Date,
    // 完了日
    completedAt?: Date,
}