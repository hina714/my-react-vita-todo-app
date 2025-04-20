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
}   //全体・未完了・完了それぞれのタスク件数を画面上に表示する
export type TodoCountType = {
    all: number,
    uncompleted: number,
    completed: number,
}   //全体・未完了・完了それぞれのタスク件数を画面上に表示する
