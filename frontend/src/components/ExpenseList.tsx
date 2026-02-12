import type { Expense } from "../types";
import { formatCurrency } from "../utils/format";

type ExpenseListProps = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

export default function ExpenseList({
  expenses,
  onEdit,
  onDelete,
}: ExpenseListProps) {
  if (!expenses.length) {
    return <p className="card empty">No expenses yet.</p>;
  }

  return (
    <div className="card list">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th className="list__amount">Amount</th>
            <th className="list__actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="list__date">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="list__description">{expense.description}</td>
              <td className="list__category">{expense.category}</td>
              <td className="list__amount">{formatCurrency(expense.amount)}</td>
              <td className="list__actions">
                <button
                  className="button button--ghost"
                  onClick={() => onEdit(expense)}
                >
                  Edit
                </button>
                <button
                  className="button button--danger"
                  onClick={() => onDelete(expense)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
