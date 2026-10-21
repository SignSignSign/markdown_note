import { PenLine } from 'lucide-react'
import type { Note } from '../store/noteStore'

interface EditorPanelProps {
  note: Note
  onUpdate: (id: string, patch: Partial<Pick<Note, 'title' | 'content'>>) => void
}

export default function EditorPanel({ note, onUpdate }: EditorPanelProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col bg-gray-900">
      <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-2 text-xs font-medium text-gray-500">
        <PenLine className="h-3.5 w-3.5" />
        编辑
      </div>
      <input
        value={note.title}
        onChange={(e) => onUpdate(note.id, { title: e.target.value })}
        placeholder="请输入笔记标题"
        className="border-b border-gray-800 bg-transparent px-4 py-3 text-lg font-semibold text-gray-100 placeholder-gray-600 outline-none transition-colors duration-200 focus:border-gray-700"
      />
      <textarea
        value={note.content}
        onChange={(e) => onUpdate(note.id, { content: e.target.value })}
        placeholder="使用 Markdown 语法开始书写..."
        className="min-h-40 flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-6 text-gray-300 placeholder-gray-600 outline-none"
      />
    </section>
  )
}
