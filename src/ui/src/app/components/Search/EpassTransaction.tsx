import React, { useState, useEffect } from "react";

interface FormData {
  cashier_id: string;
  employee_id: string;
  card_id: string;
  amount: number;
  total_ar: number;
  total_ca: number;
  transaction_type: string;
  transaction_id: string; 
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
    employee_id: employeeId,
    card_id: initialCardId,
    amount: 0,
    total_ar: totalAr,
    total_ca: totalCa,
    transaction_type: "",
    transaction_id: "", 
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
        cashier_id: settings.employee_id, 
      }));
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(true); 
      }, 200); //
      return () => clearTimeout(timer); 
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
      const amount = formData.amount;
      if (value === "CA") {
        setRemainingCa(totalCa - amount);
        setRemainingAr(totalAr);
      } else if (value === "AR") {
        setRemainingAr(totalAr - amount);
        setRemainingCa(totalCa);
      } else if (value === "CA + AR") {
        const remainingCaAfterCa = totalCa - amount;
        if (remainingCaAfterCa >= 0) {
          setRemainingCa(remainingCaAfterCa);
          setRemainingAr(totalAr);
        } else {
          setRemainingCa(0);
          setRemainingAr(totalAr + remainingCaAfterCa); // Deduct the negative amount from AR
        }
      }
    }
  };

  const handleAmountChange = (value: number) => {
    setFormData({ ...formData, amount: value });
  
    const transactionType = formData.transaction_type;
    if (transactionType === "CA") {
      setRemainingCa(totalCa - value);
      setRemainingAr(totalAr);
      setFormData((prev) => ({
        ...prev,
        total_ca: totalCa - value
      }));
  
    } else if (transactionType === "AR") {
      setRemainingAr(totalAr - value);
      setRemainingCa(totalCa);
      setFormData((prev) => ({
        ...prev,
        total_ar: totalAr - value
      }));
  
    } else if (transactionType === "CA + AR") {
      const remainingCaAfterCa = totalCa - value;
      if (remainingCaAfterCa >= 0) {
        setRemainingCa(remainingCaAfterCa);
        setRemainingAr(totalAr);
        setFormData((prev) => ({
          ...prev,
          total_ca: remainingCaAfterCa,
          total_ar: totalAr
        }));
  
      } else {
        setRemainingCa(0);
        setRemainingAr(totalAr + remainingCaAfterCa);

        setFormData((prev) => ({
          ...prev,
          total_ca: 0,
          total_ar: totalAr + remainingCaAfterCa
        }));
      }
    }
  };
  
  const isSubmitDisabled = () => {
    if (formData.transaction_type === "CA + AR") {
      const totalAvailable = totalCa + totalAr;
      return (
        !formData.cashier_id ||
        !formData.transaction_type ||
        !formData.transaction_id ||
        formData.amount <= 0 ||
        totalAvailable < formData.amount
      );
    }
    return (
      !formData.cashier_id ||
      !formData.transaction_type ||
      !formData.transaction_id ||
      formData.amount <= 0 ||
      remainingCa < 0 ||
      remainingAr < 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    onClose();
  };

  return (
    <>
      <div
        className="bg-black bg-opacity-50 p-0 m-0 fixed w-[150vw] h-[150vh] flex justify-center items-center"
        style={{ top: "-500px" }}
      >
        <div
          className={`modal z-50 w-96 max-w-96 bg-white p-7 rounded shadow-lg overflow-auto px-9 fixed ${
            isModalOpen ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-300`}
          style={{ maxHeight: "90vh", width: "50vw", top: "24em", letterSpacing: "2.5px" }}
        >
          <h2 className="text-lg text-headings font-bold mb-7">Transaction Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-7 mb-10">
              {/* Left Grid */}
              <div className="grid grid-rows-2 gap-7">
                {/* Cashier ID */}
                <div>
                  <label className="block text-sm font-medium text-title mb-1 font-semibold">
                    Cashier ID
                  </label>
                  <span className="block w-full font-semibold text-gray-800 py-2">
                    {formData.cashier_id}
                  </span>
                </div>

                {/* Employee ID (label-only) */}
                <div>
                  <label className="block text-sm font-medium text-title mb-1 font-semibold">
                    Employee ID
                  </label>
                  <span className="font-semibold text-gray-800">{formData.employee_id}</span>
                </div>

                {/* Card ID (label-only) */}
                <div>
                  <label className="block text-sm font-medium text-title mb-1 font-semibold">
                    Card ID
                  </label>
                  <span className="font-semibold text-gray-800">{formData.card_id}</span>
                </div>
              </div>

              {/* Right Grid */}
              <div className="grid grid-rows-3 gap-11">
                {/* Total CA (label-only) */}
                <div>
                  <label className="block text-sm font-medium text-title mb-1 font-semibold">
                    Total CA
                  </label>
                  <span
                    className={`font-extrabold text-focusvalue ${
                      remainingCa < 0 ? "text-red-500" : ""
                    }`}
                  >
                    {remainingCa.toFixed(2)}
                  </span>
                </div>

                {/* Total AR (label-only) */}
                <div>
                  <label className="block text-sm font-medium text-title mb-1 font-semibold">
                    Total AR
                  </label>
                  <span
                    className={`font-extrabold text-focusvalue ${
                      remainingAr < 0 ? "text-red-500" : ""
                    }`}
                  >
                    {remainingAr.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

         {/* Transaction ID */}
          <div className="mb-9">
            <label className="block text-sm font-medium text-title mb-1 font-semibold">
              Transaction ID
            </label>
            <input
              type="text"
              name="transaction_id"
              value={formData.transaction_id}
              onChange={(e) =>
                setFormData({ ...formData, transaction_id: e.target.value })
              }
              className="pl-2 block w-full h-8 border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 font-bold text-focusvalue"
              autoComplete="off" 
            />
          </div>

            {/* Transaction Type */}
            <div className="mb-9">
              <label className="block text-sm font-medium text-title mb-1 font-semibold">
                Transaction Type
              </label>
              <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className="pl-2 block w-full h-8 border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 font-bold text-focusvalue"
                disabled={!formData.transaction_id} 
              >
                <option value="" disabled>
                  Select Transaction Type
                </option>
                <option value="CA">CA</option>
                <option value="AR">AR</option>
                <option value="CA + AR">CA + AR</option>
              </select>
            </div>

            {/* Amount */}
            <div className="mb-12 group">
              <label className="block text-sm font-medium text-title mb-1 font-semibold">
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
                className="pl-2 block w-full h-8 border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 appearance-none font-bold text-focusvalue"
                style={{ letterSpacing: "1.5px" }}
                autoComplete="off"
                disabled={!formData.transaction_type} // Disable if transaction_type is empty
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end mt-15">
            <button
              type="submit"
              disabled={isSubmitDisabled()}
              className={`px-4 py-2 bg-deepBlue text-white rounded font-semibold ${
                isSubmitDisabled() ? "disabled:opacity-50" : "hover:bg-blue-600"
              }`}
            >
              Submit
            </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 font-semibold hover:bg-blue-600"
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
