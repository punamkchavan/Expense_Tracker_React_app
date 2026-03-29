import { useState, useEffect } from "react";
import axios from "axios";
import './AddExpense.css';

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

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

    if (editId) {
      axios.put(`https://expense-tracker-2320d-default-rtdb.firebaseio.com/expenses/${editId}.json`, newExpense)
        .then(() => {
          const updated = expenses.map(exp =>
            exp.id === editId ? { id: editId, ...newExpense } : exp
          );

          setExpenses(updated);
          setEditId(null);
          alert("Expense updated");
        })
        .catch(err => console.log(err));
    } 
  
    else {
      axios.post("https://expense-tracker-2320d-default-rtdb.firebaseio.com/expenses.json", newExpense)
        .then(res => {
          setExpenses([...expenses, { id: res.data.name, ...newExpense }]);
        })
        .catch(err => console.log(err));
    }

    setAmount("");
    setDescription("");
  };


  const deleteExpense = (id) => {
    axios.delete(`https://expense-tracker-2320d-default-rtdb.firebaseio.com/expenses/${id}.json`)
      .then(() => {
        const filtered = expenses.filter(exp => exp.id !== id);
        setExpenses(filtered);
        alert("Expense successfully deleted");
      })
      .catch(err => console.log(err));
  };

  const editExpense = (exp) => {
    setAmount(exp.amount);
    setDescription(exp.description);
    setCategory(exp.category);
    setEditId(exp.id);
  };

  return (
    <div className="expense-container">
      <h2>{editId ? "Edit Expense" : "Add Expense"}</h2>

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

      <button onClick={addExpense}>
        {editId ? "Update Expense" : "Add Expense"}
      </button>

      <h3>Expenses</h3>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.amount} - {exp.description} - {exp.category}

            <button onClick={() => editExpense(exp)}>Edit</button>
            <button onClick={() => deleteExpense(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}