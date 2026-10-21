import EditorPanel from './components/EditorPanel'
import EmptyTip from './components/EmptyTip'
import PreviewPanel from './components/PreviewPanel'
import Sidebar from './components/Sidebar'
import { useNoteStore } from './store/noteStore'

export default function App() {
  const {
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
  } = useNoteStore()

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-950 text-gray-100 md:flex-row">
      <Sidebar
        notes={filteredNotes}
        totalCount={notes.length}
        activeId={activeId}
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSelect={setActiveId}
        onAdd={addNote}
        onDelete={deleteNote}
      />
      <main className="flex min-h-0 flex-1 flex-col md:flex-row">
        {activeNote ? (
          <>
            <EditorPanel note={activeNote} onUpdate={updateNote} />
            {/* 分隔线：移动端横线，桌面端竖线 */}
            <div className="h-px w-full bg-gray-800 md:h-full md:w-px" />
            <PreviewPanel note={activeNote} />
          </>
        ) : (
          <div className="flex-1 bg-gray-950">
            <EmptyTip type="no-selection" />
          </div>
        )}
      </main>
    </div>
  )
}
