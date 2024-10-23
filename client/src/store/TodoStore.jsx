import { create } from 'zustand'
import { listTodo, addTodo, removeTodo, checkedTodo } from '../api/todo'
import { toast } from 'react-toastify'

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  // ดึงข้อมูล todos
  fetchTodos: async () => {
    try {
      set({ loading: true })
      const res = await listTodo()
      set({ todos: res.data })
    } catch (error) {
      console.error('Error fetching todos:', error)
      toast.error('Failed to fetch todos')
    } finally {
      set({ loading: false })
    }
  },

  // เพิ่ม todo
  addTodo: async (formData) => {
    try {
      set({ loading: true })
      await addTodo(formData)
      // fetch ข้อมูลใหม่หลังจากเพิ่มสำเร็จ
      await get().fetchTodos()
      toast.success('Task added successfully')
    } catch (error) {
      console.error('Error adding todo:', error)
      toast.error('Failed to add task')
    } finally {
      set({ loading: false })
    }
  },

  // ลบ todo
  removeTodo: async (id) => {
    try {
      set({ loading: true })
      await removeTodo(id)
      await get().fetchTodos()
      toast.success('Task deleted successfully')
    } catch (error) {
      console.error('Error deleting todo:', error)
      toast.error('Failed to delete task')
    } finally {
      set({ loading: false })
    }
  },

  // complete checked
  checked: async (Id, is_checked ) => {
    try {
      set({ loading: true })
      await checkedTodo(Id, is_checked)
      await get().fetchTodos()
    } catch (error) {
      console.error('Error ckecking todo:', error)
      toast.error('Failed to check task')
    } finally {
      set({ loading: false })
    }
  }

}))

