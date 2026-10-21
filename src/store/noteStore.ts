import { useCallback, useEffect, useMemo, useState } from 'react'
import { loadJSON, saveJSON } from '../utils/storage'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'notes'

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/** 预置示例笔记，首次打开页面即可预览 Markdown 效果 */
function buildSampleNotes(): Note[] {
  const now = new Date().toISOString()
  return [
    {
      id: createId(),
      title: '欢迎使用 Markdown 笔记',
      content: [
        '# 欢迎使用 Markdown 笔记',
        '',
        '这是一款**纯前端**的 Markdown 笔记工具，数据保存在浏览器 *LocalStorage* 中，刷新页面不会丢失。',
        '',
        '## 功能一览',
        '',
        '- 左侧输入 Markdown，右侧**实时预览**',
        '- 支持代码块语法高亮',
        '- 支持笔记搜索、新建、删除',
        '',
        '> 小提示：点击左上角「新建笔记」开始记录你的想法吧。',
        '',
        '## 代码高亮示例',
        '',
        '```ts',
        'interface User {',
        '  name: string',
        '  age: number',
        '}',
        '',
        'function greet(user: User): string {',
        '  return `Hello, ${user.name}!`',
        '}',
        '```',
        '',
        '行内代码也可以，例如 `console.log("hi")`。',
        '',
        '更多用法请查看另一篇《Markdown 语法速查》。',
        '',
        '[React 官网](https://react.dev)',
      ].join('\n'),
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createId(),
      title: 'Markdown 语法速查',
      content: [
        '# Markdown 语法速查',
        '',
        '## 文字样式',
        '',
        '**加粗**、*斜体*、`行内代码`',
        '',
        '## 列表',
        '',
        '1. 有序列表项一',
        '2. 有序列表项二',
        '',
        '- 无序列表项',
        '  - 嵌套列表项',
        '',
        '## 引用',
        '',
        '> 知识就是力量。',
        '> —— 弗朗西斯·培根',
        '',
        '## 代码块',
        '',
        '```python',
        'def fib(n):',
        '    if n <= 1:',
        '        return n',
        '    return fib(n - 1) + fib(n - 2)',
        '```',
        '',
        '```css',
        '.note-card {',
        '  border-radius: 8px;',
        '  background: #1f2937;',
        '}',
        '```',
        '',
        '## 链接',
        '',
        '[Markdown 官方文档](https://daringfireball.net/projects/markdown/)',
      ].join('\n'),
      createdAt: now,
      updatedAt: now,
    },
  ]
}

export function useNoteStore() {
  const [notes, setNotes] = useState<Note[]>(() =>
    loadJSON<Note[]>(STORAGE_KEY, buildSampleNotes()),
  )
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id ?? null)
  const [keyword, setKeyword] = useState('')

  // 笔记变化时同步持久化到 LocalStorage
  useEffect(() => {
    saveJSON(STORAGE_KEY, notes)
  }, [notes])

  // 删除笔记后若激活项失效，自动切换到列表第一条
  useEffect(() => {
    if (activeId && !notes.some((n) => n.id === activeId)) {
      setActiveId(notes[0]?.id ?? null)
    }
  }, [notes, activeId])

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeId) ?? null,
    [notes, activeId],
  )

  const filteredNotes = useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    if (!kw) return notes
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(kw) ||
        n.content.toLowerCase().includes(kw),
    )
  }, [notes, keyword])

  const addNote = useCallback(() => {
    const now = new Date().toISOString()
    const note: Note = {
      id: createId(),
      title: '未命名笔记',
      content: '',
      createdAt: now,
      updatedAt: now,
    }
    setNotes((prev) => [note, ...prev])
    setActiveId(note.id)
  }, [])

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const updateNote = useCallback(
    (id: string, patch: Partial<Pick<Note, 'title' | 'content'>>) => {
      const now = new Date().toISOString()
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: now } : n)),
      )
    },
    [],
  )

  return {
    notes,
    filteredNotes,
    activeNote,
    activeId,
    keyword,
    setKeyword,
    setActiveId,
    addNote,
    deleteNote,
    updateNote,
  }
}
