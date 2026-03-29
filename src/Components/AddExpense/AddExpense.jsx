import { useState, useEffect } from "react";
import axios from "axios";
import './AddExpense.css';

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get("https://expense-tracker-2320d-default-rtdb.firebaseio.com/expenses.json")
      .then(res => {
        const data = res.data;
        let loadedExpenses = [];

        for (let key in data) {
          loadedExpenses.push({
            id: key,
            ...data[key]
          });
        }

        setExpenses(loadedExpenses);
      })
      .catch(err => console.log(err));
  }, []);

  const addExpense = () => {
    if (!amount || !description) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      amount,
      description,
      category,
    };

    axios.post(BASE_URL, newExpense)
      .then(res => {
        setExpenses([...expenses, { id: res.data.name, ...newExpense }]);
      })
      .catch(err => console.log(err));

    setAmount("");
    setDescription("");
  };

  return (
    <div className="expense-container">
      <h2>Add Expense</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
      </select>

      <button onClick={addExpense}>Add Expense</button>

      <h3>Expenses</h3>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.amount} - {exp.description} - {exp.category}
          </li>
        ))}
      </ul>
    </div>
  );
}