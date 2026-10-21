import { NotebookPen, Plus, Search, Trash2 } from 'lucide-react'
import type { Note } from '../store/noteStore'
import EmptyTip from './EmptyTip'

interface SidebarProps {
  notes: Note[]
  totalCount: number
  activeId: string | null
  keyword: string
  onKeywordChange: (kw: string) => void
  onSelect: (id: string) => void
  onAdd: () => void
  onDelete: (id: string) => void
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`
  }
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`
}

export default function Sidebar({
  notes,
  totalCount,
  activeId,
  keyword,
  onKeywordChange,
  onSelect,
  onAdd,
  onDelete,
}: SidebarProps) {
  const searching = keyword.trim().length > 0

  return (
    <aside className="flex w-full flex-col border-b border-gray-800 bg-gray-900 md:h-full md:w-72 md:shrink-0 md:border-b-0 md:border-r">
      {/* 头部：标题 + 新建按钮 */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <NotebookPen className="h-5 w-5 text-blue-400" />
          <h1 className="text-sm font-semibold text-gray-100">Markdown 笔记</h1>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-blue-500"
        >
          <Plus className="h-3.5 w-3.5" />
          新建笔记
        </button>
      </div>

      {/* 搜索框 */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="搜索笔记..."
            className="w-full rounded-md border border-gray-700 bg-gray-800 py-1.5 pl-8 pr-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 笔记列表 */}
      <ul className="max-h-56 flex-1 space-y-1 overflow-y-auto px-2 pb-3 md:max-h-none">
        {notes.map((note) => {
          const active = note.id === activeId
          return (
            <li key={note.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => onSelect(note.id)}
                onKeyDown={(e) => e.key === 'Enter' && onSelect(note.id)}
                className={`group flex cursor-pointer items-start justify-between gap-2 rounded-md px-3 py-2 transition-colors duration-200 ${
                  active
                    ? 'bg-gray-800 text-gray-100'
                    : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {note.title || '未命名笔记'}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {formatTime(note.updatedAt)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="删除笔记"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(note.id)
                  }}
                  className="mt-0.5 rounded p-1 text-gray-500 opacity-0 transition-all duration-200 hover:bg-gray-700 hover:text-red-400 group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          )
        })}
        {notes.length === 0 && (
          <li className="py-6">
            <EmptyTip type={searching ? 'no-result' : 'no-notes'} />
          </li>
        )}
      </ul>

      {/* 底部统计 */}
      <div className="border-t border-gray-800 px-4 py-2 text-xs text-gray-600">
        共 {totalCount} 篇笔记
      </div>
    </aside>
  )
}
