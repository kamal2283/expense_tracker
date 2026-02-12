import { useEffect, useMemo, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import PageTitle from "../components/PageTitle";
import type { Expense } from "../types";
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from "../api/expenses";

const emptyForm = {
  amount: 0,
  category: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
};

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);

  const formValues = useMemo(() => {
    if (!editing) {
      return emptyForm;
    }

    return {
      amount: editing.amount,
      category: editing.category,
      description: editing.description,
      date: editing.date.slice(0, 10),
    };
  }, [editing]);

  useEffect(() => {
    fetchExpenses()
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  async function handleCreate(values: typeof emptyForm) {
    setError(null);
    try {
      const created = await createExpense(values);
      setExpenses((prev) => [created, ...prev]);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleUpdate(values: typeof emptyForm) {
    if (!editing) {
      return;
    }

    setError(null);
    try {
      const updated = await updateExpense(editing.id, values);
      setExpenses((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
      setEditing(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleDelete(expense: Expense) {
    setError(null);
    try {
      await deleteExpense(expense.id);
      setExpenses((prev) => prev.filter((item) => item.id !== expense.id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <section className="page">
      <PageTitle
        title="Expenses"
        subtitle="Capture every purchase and keep it organized."
      />

      {error ? <p className="error">{error}</p> : null}

      <div className="grid">
        <div>
          <h3>{editing ? "Edit expense" : "Add expense"}</h3>
          <ExpenseForm
            initialValues={formValues}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={editing ? () => setEditing(null) : undefined}
            submitLabel={editing ? "Update" : "Add"}
          />
        </div>
        <div>
          <h3>Recent expenses</h3>
          {loading ? (
            <p className="card">Loading...</p>
          ) : (
            <ExpenseList
              expenses={expenses}
              onEdit={(expense) => setEditing(expense)}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </section>
  );
}
