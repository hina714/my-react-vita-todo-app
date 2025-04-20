export type TodoItemType = {
    id: number,
    title: string,
    // 完了してたら true, そうでなければ false
    completed: boolean,
    // 登録日
    createdAt: Date,
    // 完了日
    completedAt?: Date,
    // 完了／未完了タスクが0件の場合は、該当セクションを非表示にする
    isHiddenCompleted?: boolean,
    isHiddenUncompleted?: boolean,
}