import { FileText, SearchX, StickyNote } from 'lucide-react'

export type EmptyType = 'no-notes' | 'no-result' | 'no-selection'

interface EmptyTipProps {
  type: EmptyType
}

const EMPTY_MAP: Record<
  EmptyType,
  { icon: typeof FileText; title: string; desc: string }
> = {
  'no-notes': {
    icon: StickyNote,
    title: '暂无笔记',
    desc: '点击上方「新建笔记」开始记录',
  },
  'no-result': {
    icon: SearchX,
    title: '搜索无结果',
    desc: '换个关键词试试吧',
  },
  'no-selection': {
    icon: FileText,
    title: '未选择笔记',
    desc: '从左侧列表选择一篇笔记开始编辑',
  },
}

export default function EmptyTip({ type }: EmptyTipProps) {
  const { icon: Icon, title, desc } = EMPTY_MAP[type]
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
      <Icon className="h-10 w-10 text-gray-600" strokeWidth={1.5} />
      <p className="text-sm font-medium text-gray-400">{title}</p>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  )
}
