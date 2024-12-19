import React, { useState, useEffect } from "react";

interface FormData {
  cashier_id: string;
  employee_id: string;
  card_id: string;
  amount: number;
  total_ar: number;
  total_ca: number;
  transaction_type: string;
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
    cashier_id: "", // Will be updated from local storage
    employee_id: employeeId,
    card_id: initialCardId,
    amount: 0,
    total_ar: totalAr,
    total_ca: totalCa,
    transaction_type: "",
  });

  const [remainingCa, setRemainingCa] = useState(totalCa);
  const [remainingAr, setRemainingAr] = useState(totalAr);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setFormData((prevFormData) => ({
        ...prevFormData,
        cashier_id: settings.employee_id, // Set cashier_id from local storage
      }));
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(true); // Ensure the modal transition occurs
      }, 200); // 0.2 seconds delay
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isModalOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "transaction_type" && formData.amount > 0) {
      if (value === "CA") {
        setRemainingCa(totalCa - formData.amount);
        setRemainingAr(totalAr);
      } else if (value === "AR") {
        setRemainingAr(totalAr - formData.amount);
        setRemainingCa(totalCa);
      }
    }
  };

  const handleAmountChange = (value: number) => {
    setFormData({ ...formData, amount: value });

    if (formData.transaction_type === "CA") {
      setRemainingCa(totalCa - value);
    } else if (formData.transaction_type === "AR") {
      setRemainingAr(totalAr - value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    onClose();
  };

  const isSubmitDisabled = () => {
    return (
      !formData.cashier_id ||
      !formData.transaction_type ||
      formData.amount <= 0 ||
      remainingCa < 0 ||
      remainingAr < 0 ||
      (remainingCa < 0 && formData.transaction_type === "CA") ||
      (remainingAr < 0 && formData.transaction_type === "AR")
    );
  };

  return (
    <>
     <div className="bg-black bg-opacity-50 p-0 m-0 fixed w-[150vw] h-[150vh] flex justify-center items-center" style={{ top: '-500px' }}>
      <div
        className={`modal z-50 w-96 max-w-96 bg-white p-7 rounded shadow-lg overflow-auto px-9 fixed ${
          isModalOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300`}
        style={{ maxHeight: "90vh", width:"50vw",  top: "25.5em", letterSpacing: "2.5px" }}
      >
        <h2 className="text-lg text-headings font-semibold mb-7">Transaction Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-7 mb-10">
            {/* Left Grid */}
            <div className="grid grid-rows-2 gap-7">
              {/* Cashier ID */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 font-semibold">
                  Cashier ID
                </label>
                <span className="block w-full font-semibold text-gray-800  py-2">
                  {formData.cashier_id}
                </span>
              </div>

              {/* Employee ID (label-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 font-semibold">
                  Employee ID
                </label>
                <span className="font-semibold text-gray-800">{formData.employee_id}</span>
              </div>

              {/* Card ID (label-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 font-semibold">
                  Card ID
                </label>
                <span className="font-semibold text-gray-800">{formData.card_id}</span>
              </div>
            </div>

            {/* Right Grid */}
            <div className="grid grid-rows-3 gap-11">
              {/* Total CA (label-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 font-semibold">
                  Total CA
                </label>
                <span className="font-extrabold text-focusvalue">{remainingCa.toFixed(2)}</span>
              </div>

              {/* Total AR (label-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 font-semibold">
                  Total AR
                </label>
                <span className="font-extrabold text-focusvalue">{remainingAr.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Transaction Type */}
          <div className="mb-9">
            <label className="block text-sm font-medium text-gray-500 mb-1 font-semibold">
              Transaction Type
            </label>
            <select
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
              className="pl-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-bold text-focusvalue"
              disabled={!formData.cashier_id}
            >
              <option value="" disabled>
                Select Transaction Type
              </option>
              <option value="CA">CA</option>
              <option value="AR">AR</option>
            </select>
          </div>

          {/* Amount */}
          <div className="mb-12 group">
            <label className="block text-sm font-medium text-gray-500 mb-1 font-semibold">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || parseFloat(value) >= 0) {
                  handleAmountChange(value ? parseFloat(value) : 0);
                }
              }}
              className=" pl-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none font-bold text-focusvalue"
              style={{ letterSpacing: "1.5px" }}
              autoComplete="off"
              disabled={!formData.transaction_type}
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end mt-15">
            <button
              type="submit"
              disabled={isSubmitDisabled()}
              className="px-4 py-2 bg-deepBlue text-white rounded disabled:opacity-50"
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
      </div>
    </>
  );
};

export default EpassTransaction;
