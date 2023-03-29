'use client'
import { useState, useContext, useRef } from "react"
import { Modal } from "@/components"
import { financeContext } from "@/lib/store/finance-context"
import {v4 as uuidv4} from 'uuid'
import { toast } from "react-toastify"

const AddExpensesModal = ({show, onClose}) => {
    const [expenseAmount, setExpenseAmount] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [showAddExpense, setShowAddExpense] = useState(false)
    const {expenses, addExpenseItem, addCategory} = useContext(financeContext)

    const titleRef = useRef()
    const colorRef = useRef()

    const addExpenseItemHandler = async () => {
        const expense = expenses.find(e => e.id === selectedCategory)
        const newExpense = {
          color: expense.color,
          title: expense.title,
          total: expense.total + +expenseAmount,
          items: [
            ...expense.items,
            {
              amount: +expenseAmount,
              createdAt: new Date(),
              id: uuidv4(),
            },
          ],
        };
    
        try {
          await addExpenseItem(selectedCategory, newExpense)
          setExpenseAmount(''),
          setSelectedCategory(null)
          onClose()
          toast.success("Expense added successfully")
        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
        }
    }

    const addCategoryHandler = async () => {
      const title = titleRef.current.value
      const color = colorRef.current.value
      try {
        await addCategory({title, color, total: 0})
        setShowAddExpense(false)
        toast.success("Category added successfully")
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    }

  return (
    <Modal show={show} onClose={onClose}>
        <h3 className='text-xl font-black text-center mb-5'>+ Add new Expense</h3>
          <div className='input-group mb-2'>
            <label className='font-bold'>Amount</label>
            <input
              type='number'
              min={0.01}
              step={0.01}
              placeholder='Enter expense amount...'
              required
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </div>
          {expenseAmount > 0 && (
            <div className="flex flex-col gap-4 mt-6">
               <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-center">Select Expense category</h3>
                 <button onClick={() => {
                  setShowAddExpense(true)
                 }} className="text-lime-400">+ New Category</button>
               </div>
              {showAddExpense && (
              <div className="flex items-center justify-between">
                <input type="text" placeholder="Enter category name" ref={titleRef} />
                <label>Pick Color</label>
                <input type="color" ref={colorRef} className='w-24 h-10' />
                <button onClick={addCategoryHandler} className="btn btn-primary-outline">Create</button>
                <button onClick={() =>{
                  setShowAddExpense(false)
                }} className="btn btn-danger">Cancel</button>
               </div>
               )}
                <hr />
         {expenses.map((expense) => {
            return (
              <button className="self-start" key={expense.id} onClick={() => setSelectedCategory(expense.id)}>
                <div style={{
                    boxShadow: expense.id === selectedCategory ? '1px 1px 4px' : 'none'
                }} className="flex items-center justify-between px-3 py-3 bg-slate-700 rounded-3xl">
                  <div className="flex items-center gap-2">
                    <div className="w-[25px] h-[25px] rounded-full" style={{ backgroundColor: expense.color}} />
                    <h4 className="capitalize text-sm font-bold">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
         </div>
          )}
        {expenseAmount > 0 && selectedCategory && (
            <div className="mt-6">
            <button className="btn btn-primary" onClick={addExpenseItemHandler}>Add Expense</button>
          </div>
        )}
    </Modal>
  )
}
export default AddExpensesModal