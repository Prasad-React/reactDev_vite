import React, { useEffect, useState } from "react";
import SendEmail from "./SendEmail";
import axios from "axios";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/contacts/getAll")
      .then(res => setContacts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Contacts List</h2>

      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr
              key={contact.id}
              className="cursor-pointer hover:bg-blue-100"
              onClick={() => setSelectedContact(contact)}  // 👍 SELECT CONTACT
            >
              <td className="border p-2">{contact.name}</td>
              <td className="border p-2">{contact.email}</td>
              <td className="border p-2">{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SendEmail selectedContact={selectedContact} />
    </div>
  );
}
