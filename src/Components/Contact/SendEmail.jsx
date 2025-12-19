import React, { useState } from "react";

export default function SendEmail({ selectedContact }) {
  const [message, setMessage] = useState("");

  const sendMail = () => {
    if (!selectedContact) {
      alert("Please select a contact!");
      return;
    }
    window.location.href = `mailto:${selectedContact.email}?subject=Hello ${selectedContact.name}&body=${message}`;
  };

  return (
    <div className="p-4 bg-gray-100 mt-4 rounded">
      <h3 className="text-xl font-bold">Send Email</h3>

      <p><strong>Email to:</strong> {selectedContact?.email || "No contact selected"}</p>

      <textarea
        className="border p-2 w-full mt-2"
        rows="4"
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={sendMail}
      >
        Send Mail
      </button>
    </div>
  );
}
