import React, { useState } from "react";

interface FormData {
  cashier_id: string;
  employee_id: string;
  card_id: string;
  amount: number;
  total_ar: number;
  total_ca: number;
  transaction_type: number; 
}

interface EpassTransactionProps {
  initialCardId: string;
  employeeId: string;
  totalAr: number;
  totalCa: number;
  onClose: () => void;
}

const EpassTransaction: React.FC<EpassTransactionProps> = ({
  initialCardId,
  employeeId,
  totalAr,
  totalCa,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    cashier_id: "",
    employee_id: employeeId, // Pre-fill the employee_id field
    card_id: initialCardId,   // Pre-fill the card_id field
    amount: 0,
    total_ar: totalAr,         // Pre-fill the total_ar field
    total_ca: totalCa,         // Pre-fill the total_ca field
    transaction_type: 0,      // Initial value for transaction_type
  });

  const onAmountChange = (value: number) => {
    setFormData({ ...formData, amount: value });
  };

  const cashierOptions = [
    { id: "E12345", name: "Cashier 1" },
    { id: "E67890", name: "Cashier 2" },
    { id: "E54321", name: "Cashier 3" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "amount" || name === "total_ar" || name === "total_ca" || name === "transaction_type"
          ? name === "transaction_type"
            ? value // For transaction_type, directly set value
            : parseFloat(value) || 0
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    onClose(); // Close the modal after submitting
  };

  return (
    <div
      className="absolute top-0 left-0 z-50 w-full max-w-lg bg-white p-6 rounded shadow-lg overflow-auto fixed" 
      style={{
        maxHeight: "90vh",
        top: "-12em",
      }}
    >
      <h2 className="text-lg font-semibold mb-4">Transaction Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Cashier ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cashier ID
          </label>
          <select
            name="cashier_id"
            value={formData.cashier_id}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Cashier</option>
            {cashierOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Type
          </label>
          <select
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Type</option>
            <option value="CA">CA</option>
            <option value="AR">AR</option>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4 group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || parseFloat(value) >= 0) {
                setFormData({ ...formData, amount: value ? parseFloat(value) : 0 });
              }
            }}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
            style={{ letterSpacing: '1.5px' }}
            autoComplete="off"
          />
        </div>

        {/* Employee ID (label-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <span className="text-gray-700">{formData.employee_id}</span>
        </div>

        {/* Card ID (label-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card ID
          </label>
          <span className="text-gray-700">{formData.card_id}</span>
        </div>

        {/* Total CA (label-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total CA
          </label>
          <span className="text-gray-700">{formData.total_ca}</span>
        </div>

        {/* Total AR (label-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total AR
          </label>
          <span className="text-gray-700">{formData.total_ar}</span>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EpassTransaction;
