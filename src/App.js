import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

function App() {
  const [todoItems, setTodoItems] = useState([])
  const [newTodoItem, setNewTodoItem] = useState('')
  const [supabaseClient, setSupabaseClient] = useState()

  useEffect(() => {
    const newClient = createClient(
      'https://lzpbefehvaczommiiwbb.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6cGJlZmVodmFjem9tbWlpd2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjUwODMsImV4cCI6MjAwMjM0MTA4M30.x1unuW8CPEJYslx1fG9BUx_IC6OOI3GKJxNo9SRSI9E'
    )
    setSupabaseClient(newClient)
    newClient
      .from('items')
      .select('*')
      .then(response => setTodoItems(response.data))
  }, [])

  const insertRow = async (todoText) => {
    const { data, error } = await supabaseClient
      .from('items')
      .insert({ todo_text: todoText })
      .select()
    setTodoItems([...todoItems, data[0]])
  }

  return (
    <div className="App">
      <input 
        type="text"
        onChange={(changeEvent) => {
          setNewTodoItem(changeEvent.target.value)
        }}
        onKeyDown={(keyEvent) => {
          if (keyEvent.key === 'Enter') {
            insertRow(newTodoItem)
          }
        }} 
      />
      {todoItems.map((item, index) => <p key={index}>{item.todo_text}</p>)}
    </div>
  );
}

export default App;
