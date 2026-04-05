// src/app/notes/page.tsx
import { createClient } from '@/lib/supabase/server'
import { addNote } from './actions'

export default async function NotesPage() {
  const supabase = await createClient()
  const { data: notes, error } = await supabase.from('notes').select('*')

  if (error) return <p>Error loading notes.</p>

  return (
    <div>
      <form action={addNote}>
        <input
          name="content"
          type="text"
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  )
}
