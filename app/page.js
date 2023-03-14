'use client'
import { useState, useContext, useEffect } from 'react'
import { AddExpensesModal, AddIncomeModal, ExpenseCategoryItem, SignIn, Stats } from '@/components'
import { currencyFormatter } from '@/lib/utils'
import { financeContext } from '@/lib/store/finance-context'
import { authContext } from '@/lib/store/auth-context'


export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false)
  const [balance, setBalance] = useState(0)
  const {expenses, income} = useContext(financeContext)
  const {user, loading} = useContext(authContext)

  useEffect(() => {
    const newBalance = income.reduce((total, i) => total + i.amount, 0) - expenses.reduce((total, e) => total + e.total, 0)
    setBalance(newBalance)
  }, [expenses, income])

  if(!user) {
    return <SignIn />
  }

  return (
    <>
      <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />
      <AddExpensesModal show={showAddExpensesModal} onClose={setShowAddExpensesModal} />
      <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-3'>
          <small className='text-gray-400 text-md'>My Balance</small>
          <h2 className='text-4xl font-black'>{currencyFormatter(balance)}</h2>
        </section>
        <section className='flex items-center gap-3 py-3'>
          <button onClick={() => setShowAddExpensesModal(true)} className='btn btn-primary'>+ Expenses</button>
          <button onClick={() => setShowAddIncomeModal(true)} className='btn btn-primary-outline'>+ Incomes</button>
        </section>
        <section className='py-6'>
          <h3 className='text-2xl font-bold'>My Expenses</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {expenses.map((expense) => (
              <ExpenseCategoryItem key={expense.id} expense={expense} />
            ))}
          </div>
        </section>
        <Stats expenses={expenses} />
      </main>
    </>
  )
}
