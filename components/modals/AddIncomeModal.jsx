'use client'
import { useRef, useContext } from 'react'
import { Modal } from '@/components'
import { currencyFormatter } from '@/lib/utils'
import {FaRegTrashAlt} from 'react-icons/fa'
import { financeContext } from '@/lib/store/finance-context'

const AddIncomeModal = ({show, onClose}) => {
    const amountRef = useRef()
    const descriptionRef = useRef()
    const {income, addIncomeItem, removeIncomeItem } = useContext(financeContext)

    const addIncomeHandler = async (e) => {
        e.preventDefault()
        const newIncome = { amount: +amountRef.current.value, description: descriptionRef.current.value, createdAt: new Date() }
        try {
            await addIncomeItem(newIncome)
            amountRef.current.value = ''
            descriptionRef.current.value = ''  
        } catch (error) {
            console.log(error)
        }
      }
    
      const deleteIncomeHandler = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId)
        } catch (error) {
            console.log(error)
        }
      }

  return (
    <Modal show={show} onClose={onClose}>
        <h3 className='text-xl font-black text-center mb-5'>+ Add new Income</h3>
        <form onSubmit={addIncomeHandler} className='mt-2 input-group'>
          <div className='input-group mb-2'>
            <label htmlFor='amount' className='font-bold'>Amount</label>
            <input
              ref={amountRef}
              type='number'
              name='amount'
              min={0.01}
              step={0.01}
              id='amount'
              placeholder='Enter income amount...'
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor='description' className='font-bold'>Description</label>
            <input
              ref={descriptionRef}
              type='text'
              name='description'
              id='description'
              placeholder='Enter income description...'
              required
            />
          </div>
          <button type="submit" className='btn btn-primary mt-5 self-start'>Add Entry</button>
        </form>
        <div className="flex flex-col gap-4 mt-3 text-sm">
          <h3 className="text-2xl font-bold text-center">Income History</h3>
          <hr />
          {income.map((i) => (
            <div className="flex items-center justify-between" key={i.id}>
              <div>
                <p className='font-semibold'>{i.description}</p>
                <small className='text-[10px]'>{i.createdAt.toLocaleString()}</small>
              </div>
              <p className="flex items-center text-lime-400 font-bold gap-2">{currencyFormatter(i.amount)}
               <button onClick={() => deleteIncomeHandler(i.id)}><FaRegTrashAlt className="text-red-400 ml-2" /></button>
              </p>
            </div>
          ))}
        </div>
      </Modal>
  )
}
export default AddIncomeModal