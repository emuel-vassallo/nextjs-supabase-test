// src/app/notes/actions.ts
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addNote(formData: FormData) {
  const supabase = await createClient()
  const content = formData.get('content') as string

  const { error } = await supabase.from('notes').insert({ content })

  if (error) {
    console.error('Supabase insert error:', error)
    return
  }

  revalidatePath('/notes')
}
