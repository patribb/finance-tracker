'use client'
import { useContext } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { currencyFormatter } from '@/lib/utils';
import { Modal } from '..';
import { financeContext } from '@/lib/store/finance-context';

const ViewExpenseModal = ({ show, onClose, expense }) => {
    const {deleteExpenseItem, deleteExpenseCategory} = useContext(financeContext)

    const deleteExpenseHandler = async () => {
        try {
            await deleteExpenseCategory(expense.id)
        } catch (error) {
            console.log(error.message)  
        }
    }

    const deleteExpenseItemHandler = async (item) => {
        try {
            const updatedItems = expense.items.filter((i) => i.id!== item.id)
            const updatedExpense = {items: [...updatedItems], total: expense.total - item.amount}
            await deleteExpenseItem(updatedExpense, expense.id)
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <Modal show={show} onClose={onClose}>
      <div className='flex items-center justify-between mt-3 mb-4'>
        <h1 style={{color: expense.color}} className='text-4xl font-black'>{expense.title}</h1>
        <button onClick={deleteExpenseHandler} className='btn btn-danger'>Delete</button>
      </div>
      <hr />
      <div className=''>
        <h3 className='my-4 text-xl font-bold'>Expense History</h3>
        {expense.items.map((item) => (
          <div key={item.id} className='flex p-2 items-center justify-between mt-5'>
             <small>
                {item.createdAt.toMillis
                  ? new Date(item.createdAt.toMillis()).toLocaleString()
                  : item.createdAt.toLocaleString()}
              </small>
              <p style={{color: expense.color}} className="flex font-black items-center gap-2">{currencyFormatter(item.amount)}</p>
              <button onClick={() => {
                deleteExpenseItemHandler(item)
              }} className="btn btn-danger">
                <FaRegTrashAlt />
              </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default ViewExpenseModal;
