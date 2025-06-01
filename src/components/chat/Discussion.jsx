import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import { FaUsers, FaCircle } from 'react-icons/fa';

const Discussion = ({ missionId }) => {
  const [messages, setMessages] = useState([]);
  const [discussion, setDiscussion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = currentUser?.token;
  console.log("TOKEN utilisé :", token);

  // Configure axios
  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // Fetch discussion for the mission
  const fetchDiscussion = async () => {
    try {
      console.log('Fetching discussion for mission:', missionId);
      const response = await api.get(`/discussion/mission/${missionId}`);
      console.log('Discussion response:', response.data);
      setDiscussion(response.data);
      return response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération de la discussion:', err.response || err);
      if (err.response?.status === 401) {
        setLoading(false);
        return null;
      }
      setError("Impossible de charger la discussion");
      return null;
    }
  };

  // Fetch messages for a discussion
  const fetchMessages = async (discussionId) => {
    try {
      console.log('Fetching messages for discussion:', discussionId);
      const response = await api.get(`/message/discussion/${discussionId}`);
      console.log('Messages response:', response.data);
      // Log pour voir le format des dates
      if (response.data && response.data.length > 0) {
        console.log('Format des dates reçues:', {
          premierMessage: response.data[0],
          dateCreation: response.data[0].dateCreation,
          typeDate: typeof response.data[0].dateCreation
        });
      }
      setMessages(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des messages:', err.response || err);
      if (err.response?.status === 401) {
        setLoading(false);
        return;
      }
      setError("Impossible de charger les messages");
    } finally {
      setLoading(false);
    }
  };

  // Fetch participants
  const fetchParticipants = async () => {
    try {
      const response = await api.get(`/mission/${missionId}/participants`);
      setParticipants(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des participants:', err);
    }
  };

  // Send a new message
  const sendMessage = async (formData) => {
    if (!discussion) {
      console.error('No discussion available');
      return;
    }

    try {
      // Vérifier si c'est un FormData ou un message texte simple
      const isFormData = formData instanceof FormData;
      
      if (isFormData) {
        // Cas d'un message avec fichier
        formData.append('idDiscussion', discussion.id);
        
        const response = await api.post('/message/send', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        
        console.log('Message with file sent response:', response.data);
        setMessages(prev => [...prev, response.data]);
      } else {
        // Cas d'un message texte simple
        const response = await api.post('/message/send', {
          idDiscussion: discussion.id,
          contenu: formData
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        
        console.log('Text message sent response:', response.data);
        setMessages(prev => [...prev, response.data]);
      }
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err.response || err);
      if (err.response?.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
        // Optionnel : rediriger vers la page de connexion
        // navigate('/login');
      } else {
        setError("Impossible d'envoyer le message");
      }
    }
  };

  // Gérer l'état de frappe
  const handleTypingState = (isUserTyping) => {
    setIsTyping(isUserTyping);
    setTypingUser(isUserTyping ? currentUser : null);
  };

  useEffect(() => {
    const initializeDiscussion = async () => {
      if (!missionId) {
        console.error('No missionId provided');
        setError("ID de mission manquant");
        return;
      }

      const discussionData = await fetchDiscussion();
      if (discussionData) {
        await fetchMessages(discussionData.id);
        await fetchParticipants();
      }
    };

    initializeDiscussion();
  }, [missionId]);

  if (!currentUser || !token) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg p-8 space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Rejoignez la discussion !
          </h3>
          <p className="text-gray-600">
            Connectez-vous pour participer à la discussion de cette mission
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Se connecter
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200"
          >
            S'inscrire
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Discussion de la mission</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaCircle className="text-green-500 h-2 w-2" />
            <span>{participants.length} participants actifs</span>
          </div>
        </div>
        <div className="relative group">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaUsers className="text-gray-600 h-5 w-5" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-10">
            {participants.map((participant, index) => (
              <div key={index} className="px-4 py-2 hover:bg-gray-100">
                <div className="font-medium">{participant.benevole?.prenom} {participant.benevole?.nom}</div>
                <div className="text-sm text-gray-500">{participant.benevole?.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <ChatWindow messages={messages} currentUser={currentUser} />

      {/* Typing indicator */}
      {isTyping && typingUser && typingUser.id !== currentUser.id && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="px-4 py-2 text-sm text-gray-500 italic"
        >
          {typingUser.prenom} est en train d'écrire...
        </motion.div>
      )}

      {/* Message input */}
      <MessageInput
        onSendMessage={sendMessage}
        isTyping={isTyping}
        setIsTyping={handleTypingState}
      />
    </div>
  );
};

export default Discussion; 