import React from 'react'

type Props = {
  title: string    // 見出しテキスト
  color: string   // テキストカラー（任意）
}

export const TodoHeading: React.FC<Props> = ({ title, color }) => {

  return (
    <h2
      style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        // Memo: 変数名とプロパティが同じ場合は省略できる
        // color: color
        color
      }}
    >
      {title}
    </h2>
  )
}
