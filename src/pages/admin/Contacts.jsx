// src/pages/admin/Contacts.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

export const ContactsAdmin = () => {
  const [messages, setMessages] = useState([
    { id: 1, nom: "Jean Dupont", email: "jean@mail.com", message: "Je voudrais devenir bénévole.", date: "2025-05-10" },
    { id: 2, nom: "Claire Martin", email: "claire@mail.com", message: "Comment puis-je faire un don ?", date: "2025-05-12" },
  ]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-2xl font-bold mb-6">Messages de Contact</h2>

        <div className="bg-white shadow rounded divide-y">
          {messages.length === 0 && <p className="p-6 text-gray-500">Aucun message reçu.</p>}
          {messages.map((msg) => (
            <div key={msg.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-green-700">{msg.nom} &lt;{msg.email}&gt;</p>
                  <p className="text-sm text-gray-500 italic">Reçu le {msg.date}</p>
                  <p className="mt-2 text-gray-700">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

