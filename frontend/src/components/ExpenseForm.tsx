import { useState } from "react";
import type { Expense } from "../types";

export type ExpenseFormValues = Omit<Expense, "id" | "createdAt">;

type ExpenseFormProps = {
  initialValues: ExpenseFormValues;
  onSubmit: (values: ExpenseFormValues) => void;
  onCancel?: () => void;
  submitLabel: string;
};

export default function ExpenseForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
}: ExpenseFormProps) {
  const [formValues, setFormValues] =
    useState<ExpenseFormValues>(initialValues);

  function updateValue<K extends keyof ExpenseFormValues>(
    key: K,
    value: ExpenseFormValues[K],
  ) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      className="card form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formValues);
      }}
    >
      <label>
        Amount
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={formValues.amount}
          onChange={(event) =>
            updateValue("amount", Number(event.target.value))
          }
          required
        />
      </label>
      <label>
        Category
        <input
          value={formValues.category}
          onChange={(event) => updateValue("category", event.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          value={formValues.description}
          onChange={(event) => updateValue("description", event.target.value)}
          required
        />
      </label>
      <label>
        Date
        <input
          type="date"
          value={formValues.date}
          onChange={(event) => updateValue("date", event.target.value)}
          required
        />
      </label>
      <div className="form__actions">
        <button type="submit" className="button button--primary">
          {submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            className="button button--ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
