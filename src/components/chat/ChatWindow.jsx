import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { format, isValid, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaCheckDouble, FaDownload, FaFile, FaFileImage, FaFilePdf, FaFileWord } from 'react-icons/fa';

const ChatWindow = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastMessageCountRef = useRef(messages.length);

  const scrollToBottom = (behavior = 'smooth') => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Calculer si l'utilisateur était déjà proche du bas avant le nouveau message
    const isNearBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 100;

    // Si de nouveaux messages sont arrivés et que l'utilisateur était proche du bas
    if (messages.length > lastMessageCountRef.current && isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior });
    }

    lastMessageCountRef.current = messages.length;
  };

  useEffect(() => {
    // Scroll instantané lors du chargement initial
    scrollToBottom('instant');
  }, []); // Uniquement au montage

  useEffect(() => {
    // Scroll fluide pour les nouveaux messages
    scrollToBottom('smooth');
  }, [messages]); // À chaque nouveau message

  const parseDate = (dateString) => {
    if (!dateString) return new Date();
    
    try {
      // Si c'est déjà un objet Date
      if (dateString instanceof Date) {
        return isValid(dateString) ? dateString : new Date();
      }

      // Si c'est une chaîne ISO
      const parsedDate = parseISO(dateString);
      if (isValid(parsedDate)) {
        return parsedDate;
      }

      // Si c'est un timestamp (nombre)
      if (typeof dateString === 'number') {
        const date = new Date(dateString);
        if (isValid(date)) {
          return date;
        }
      }

      // En cas d'échec, retourner la date actuelle
      return new Date();
    } catch (error) {
      console.error('Erreur lors du parsing de la date:', error);
      return new Date();
    }
  };

  const formatMessageDate = (dateString) => {
    const date = parseDate(dateString);
    return format(date, "HH:mm", { locale: fr });
  };

  const isConsecutiveMessage = (currentMessage, previousMessage) => {
    if (!previousMessage) return false;
    return currentMessage.utilisateur.id === previousMessage.utilisateur.id;
  };

  const shouldShowDate = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    
    const currentDate = parseDate(currentMessage.dateCreation);
    const previousDate = parseDate(previousMessage.dateCreation);

    if (!currentDate || !previousDate) {
      return false;
    }

    return currentDate.toDateString() !== previousDate.toDateString();
  };

  const formatDateForSeparator = (dateString) => {
    const date = parseDate(dateString);
    return format(date, "d MMMM yyyy", { locale: fr });
  };

  const renderDateSeparator = (date) => {
    return (
      <div className="flex items-center justify-center my-4">
        <div className="bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-600">
          {formatDateForSeparator(date)}
        </div>
      </div>
    );
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <FaFileImage className="h-5 w-5" />;
    if (fileType === 'application/pdf') return <FaFilePdf className="h-5 w-5" />;
    if (fileType.includes('word')) return <FaFileWord className="h-5 w-5" />;
    return <FaFile className="h-5 w-5" />;
  };

  const FileAttachment = ({ file }) => (
    <div className="mt-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        {getFileIcon(file.type)}
        <span className="text-sm text-gray-700 truncate max-w-[200px]">
          {file.name}
        </span>
      </div>
      <a
        href={file.url}
        download
        className="text-green-600 hover:text-green-700 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaDownload className="h-4 w-4" />
      </a>
    </div>
  );

  return (
    <div 
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50"
      style={{ scrollBehavior: 'smooth' }}
    >
      {messages.map((message, index) => {
        const isCurrentUser = message.utilisateur.id === currentUser.id;
        const isConsecutive = isConsecutiveMessage(message, messages[index - 1]);
        const showDate = shouldShowDate(message, messages[index - 1]);
        const date = parseDate(message.dateCreation);

        return (
          <React.Fragment key={message.id || index}>
            {showDate && renderDateSeparator(message.dateCreation)}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} ${!isConsecutive ? 'mt-4' : 'mt-1'}`}
            >
              <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[80%] group`}>
                {!isConsecutive && !isCurrentUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 mb-2">
                    <span className="text-sm font-medium text-white">
                      {message.utilisateur.prenom?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
                <div
                  className={`relative px-4 py-2 rounded-2xl ${
                    isCurrentUser
                      ? 'bg-green-600 text-white mr-2'
                      : 'bg-white text-gray-900 ml-2'
                  } ${!isConsecutive ? 'rounded-t-2xl' : ''} shadow-sm`}
                >
                  {!isConsecutive && !isCurrentUser && (
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {message.utilisateur.prenom} {message.utilisateur.nom}
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {message.contenu}
                  </div>
                  {message.fichier && (
                    <FileAttachment file={message.fichier} />
                  )}
                  <div
                    className={`text-[10px] ${
                      isCurrentUser ? 'text-green-100' : 'text-gray-500'
                    } mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    {formatMessageDate(message.dateCreation)}
                    {isCurrentUser && <FaCheckDouble className="h-3 w-3" />}
                  </div>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} style={{ height: 1 }} />
    </div>
  );
};

export default ChatWindow; 