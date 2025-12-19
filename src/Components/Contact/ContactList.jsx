import React from "react";

export default function ContactList({ contacts, onSelect }) {
  return (
    <section className="contact-list p-4">
      <ul className="space-y-2">
        {contacts.map(contact => (
          <li key={contact.id}>
            <button
              onClick={() => onSelect(contact)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
