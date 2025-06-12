import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from "axios";
import { toast } from "react-toastify";
const AgentForm = ({propertyId} : {propertyId: string} ) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    PerfectoPartneredLender: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Only defined for checkboxes
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      propertyId: propertyId,
      prequalification: formData.PerfectoPartneredLender || false,
      status: "pending",
    };

    try {
      const response = await fetch('/api/crud/addContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        PerfectoPartneredLender: false
      });

      // Show success message
      toast.success('Thank you for your message. We will contact you soon!');
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-auto mx-auto p-6 border border-gray-300"
    >
      <h2 className="text-[16px] font-semibold mb-6">CONTACT AGENT(S)</h2>
      <Input
        label="Name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        name="name"
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        name="email"
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        name="phone"
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-2 flex items-center">
        <input
          type="checkbox"
          name="prequalification"
          checked={formData.PerfectoPartneredLender}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
        <label className="text-[14px]">
          Would you like to speak with Perfecto Partnered lender?
        </label>
      </div>
      <div className="text-[14px] text-[#6c6c6c] mb-6">
        By clicking "send message", you expressly agree that Perfecto Homes
        Inc., its agents, affiliates, and associated third parties may contact
        you, including with calls or texts by an automated dialing system for
        marketing or promotional purposes - to the number provided above.
        Message/data rates may apply. Accepting this consent is not required to
        obtain real estate service. 
      </div>
      <Button className="w-full" placeholder="Send Message" variant="blue" onClick={undefined} children={undefined} />
    </form>
  );
};

export default AgentForm;
