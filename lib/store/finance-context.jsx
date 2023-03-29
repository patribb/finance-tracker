'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { authContext } from './auth-context'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../firebase';

export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
});

export const FinanceContextProvider = ({ children }) => {
  const [income, setIncome] = useState([])
  const [expenses, setExpenses] = useState([])
  const {user} = useContext(authContext)

  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, 'expenses');
      const docSnap = await addDoc(collectionRef, {
        uid: user.uid,
        ...category,
        items: [],
      });
      setExpenses((prev) => {
        return [...prev, { id: docSnap.id, uid: user.uid, items: [], ...category }];
      });
    } catch (error) {
      throw error;
    }
  };

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, 'expenses', expenseCategoryId);
    try {
      await updateDoc(docRef, { ...newExpense });
      setExpenses((prev) => {
        const updatedExpenses = [...prev];
        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });
        updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, 'expenses', expenseCategoryId);
      await updateDoc(docRef, { ...updatedExpense });
      setExpenses((prev) => {
        const updatedExpenses = [...prev];
        const pos = updatedExpenses.findIndex((ex) => {
          return ex.id === expenseCategoryId;
        });
        updatedExpenses[pos].items = [...updatedExpense.items];
        updatedExpenses[pos].total = updatedExpense.total;
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, 'expenses', expenseCategoryId);
      await deleteDoc(docRef);
      setExpenses((prev) => {
        const updatedExpenses = prev.filter(
          (expense) => expense.id !== expenseCategoryId
        );
        return [...updatedExpenses];
      });
    } catch (error) {
      throw error;
    }
  };

  const addIncomeItem = async (newIncome) => {
    const colectionRef = collection(db, 'income');
    try {
      const docSnap = await addDoc(colectionRef, newIncome);
      setIncome((prev) => {
        return [...prev, { id: docSnap.id, ...newIncome }];
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, 'income', incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prev) => {
        return prev.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if(!user) return
    const getIncomeData = async () => {
      const collectionRef = collection(db, 'income');
      const q = query(collectionRef, where('uid', '==', user.uid))
      const docsSnap = await getDocs(q)
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };
    const getExpenseData = async () => {
      const collectionRef = collection(db, 'expenses');
      const q = query(collectionRef, where('uid', '==', user.uid))
      const docsSnap = await getDocs(q)
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setExpenses(data);
    };
    getIncomeData();
    getExpenseData();
  }, [user]);

  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory,
  };

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
};

export default FinanceContextProvider;
