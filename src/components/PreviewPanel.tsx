import { Eye } from 'lucide-react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Note } from '../store/noteStore'

interface PreviewPanelProps {
  note: Note
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-4 mt-6 border-b border-gray-800 pb-2 text-2xl font-bold text-gray-100 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-6 text-xl font-semibold text-gray-100">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-4 text-lg font-semibold text-gray-200">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-2 mt-3 text-base font-semibold text-gray-200">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-gray-300">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-1 pl-6 text-gray-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6 text-gray-300">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-6">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-4 rounded-r-md border-l-4 border-blue-500/50 bg-gray-800/50 px-4 py-2 text-gray-400 [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-400 underline decoration-blue-400/40 underline-offset-2 transition-colors duration-200 hover:text-blue-300"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-100">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
  hr: () => <hr className="my-6 border-gray-800" />,
  // 块级代码由 code 组件统一接管，去掉默认 pre 包裹
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children }) => {
    const match = /language-(\w+)/.exec(className ?? '')
    const text = String(children).replace(/\n$/, '')
    // 带语言的代码块：语法高亮
    if (match) {
      return (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '0 0 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.8125rem',
            background: '#111827',
            border: '1px solid #1f2937',
          }}
        >
          {text}
        </SyntaxHighlighter>
      )
    }
    // 未指定语言的多行代码块：深色普通代码块
    if (text.includes('\n')) {
      return (
        <pre className="mb-4 overflow-x-auto rounded-lg border border-gray-800 bg-gray-950 p-3 font-mono text-[0.8125rem] leading-6 text-gray-300">
          <code>{text}</code>
        </pre>
      )
    }
    // 行内代码
    return (
      <code className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-[0.8125rem] text-amber-300">
        {children}
      </code>
    )
  },
}

export default function PreviewPanel({ note }: PreviewPanelProps) {
  const hasContent = note.content.trim().length > 0
  return (
    <section className="flex min-h-0 flex-1 flex-col bg-gray-950">
      <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-2 text-xs font-medium text-gray-500">
        <Eye className="h-3.5 w-3.5" />
        预览
      </div>
      <div className="min-h-40 flex-1 overflow-y-auto p-4 md:p-6">
        {hasContent ? (
          <ReactMarkdown components={markdownComponents}>
            {note.content}
          </ReactMarkdown>
        ) : (
          <p className="text-sm text-gray-600">
            预览区域：在左侧输入 Markdown 内容后，这里会实时渲染
          </p>
        )}
      </div>
    </section>
  )
}
