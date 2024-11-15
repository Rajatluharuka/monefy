import React, { useState, useEffect, useCallback } from "react";
import SingleExpense from "./SingleExpense";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../store/expense";
import { CSVLink } from "react-csv";
import styles from "./Expenses.module.css";

const Expenses = () => {
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [csvData, setCsv] = useState([]);

  const initialState = "Food";
  const [category, setCategory] = useState(initialState);

  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const expenses = useSelector((state) => state.expense.expenses);

  const getExpenses = useCallback(async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-96b76-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Fetching failed");
      }

      const data = await response.json();
      const loadedExpenses = [];

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          desc: data[key].desc,
          amount: data[key].amount,
          category: data[key].category,
        });
      }

      setCsv(loadedExpenses);
      localStorage.setItem("allExpense", JSON.stringify(loadedExpenses));
      dispatch(expenseAction.addExpenses(loadedExpenses));
    } catch (error) {
      alert(error.message);
    }
  }, [dispatch, email]);

  const expenseFormHandler = async (e) => {
    e.preventDefault();
    const expenseData = {
      amount: +amount,
      desc,
      category,
    };

    try {
      const url = isEdit
        ? `https://expense-tracker-96b76-default-rtdb.firebaseio.com/${email}/${expenseId}.json`
        : `https://expense-tracker-96b76-default-rtdb.firebaseio.com/${email}.json`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Failed to save expense");
      }

      setAmount(0);
      setDesc("");
      setCategory(initialState);
      setEdit(false);

      getExpenses();
    } catch (error) {
      alert(error.message);
    }
  };

  const editHandler = (id) => {
    const selectedExpense = expenses.find((expense) => expense.id === id);
    if (selectedExpense) {
      setEdit(true);
      setExpenseId(id);
      setAmount(selectedExpense.amount);
      setDesc(selectedExpense.desc);
      setCategory(selectedExpense.category);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-96b76-default-rtdb.firebaseio.com/${email}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
      getExpenses();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const csvHeaders = [
    { label: "Amount", key: "amount" },
    { label: "Description", key: "desc" },
    { label: "Category", key: "category" },
  ];

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={expenseFormHandler}>
          <div className={styles.allInput}>
            <div className={styles.form_input}>
              <h5>Enter Amount</h5>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className={styles.form_input}>
              <h5>Add Description</h5>
              <input
                type="text"
                value={desc}
                placeholder="Enter description"
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <div className={styles.form_input}>
              <h5>Add Category</h5>
              <select
                className={styles.input}
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
          </div>

          <div>
            <button className={styles.btn}>
              {isEdit ? "Edit Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.form}>
        {expenses.map((expense) => (
          <SingleExpense
            id={expense.id}
            key={expense.id}
            amount={expense.amount}
            desc={expense.desc}
            category={expense.category}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename="expenses.csv"
          className={styles.csvLink}
        >
          Download CSV
        </CSVLink>
      </div>
    </>
  );
};

export default Expenses;
