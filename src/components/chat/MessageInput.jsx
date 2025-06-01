import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip, FaTimes } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const MessageInput = ({ onSendMessage, isTyping, setIsTyping }) => {
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const lineHeight = 24; // Hauteur approximative d'une ligne en pixels
      const minRows = 1;
      const maxRows = 5;
      
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newRows = Math.min(Math.max(Math.ceil(scrollHeight / lineHeight), minRows), maxRows);
      
      setRows(newRows);
      textareaRef.current.style.height = `${newRows * lineHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    // Fermer le sélecteur d'emojis lors d'un clic à l'extérieur
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
    }

    // Reset le timeout précédent
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Définit un nouveau timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        alert("Le fichier est trop volumineux. Taille maximum : 5MB");
        return;
      }

      setSelectedFile(file);

      // Créer une prévisualisation pour les images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl('');
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!message.trim() && !selectedFile) || (message.trim().length === 0 && !selectedFile)) {
      return;
    }

    try {
      if (selectedFile) {
        // Cas d'un message avec fichier
        const formData = new FormData();
        formData.append('file', selectedFile);
        if (message.trim()) {
          formData.append('contenu', message.trim());
        }
        await onSendMessage(formData);
      } else {
        // Cas d'un message texte simple
        await onSendMessage(message.trim());
      }

      setMessage('');
      setRows(1);
      removeFile();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        setIsTyping(false);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const onEmojiClick = (emojiObject) => {
    const cursor = textareaRef.current.selectionStart;
    const text = message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor);
    setMessage(text);
    setShowEmojiPicker(false);
    
    // Mettre à jour la position du curseur après l'insertion
    setTimeout(() => {
      textareaRef.current.selectionStart = cursor + emojiObject.emoji.length;
      textareaRef.current.selectionEnd = cursor + emojiObject.emoji.length;
      textareaRef.current.focus();
    }, 0);
  };

  return (
    <div className="p-4 bg-white border-t">
      {/* Prévisualisation du fichier */}
      {selectedFile && (
        <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaPaperclip className="text-gray-500" />
            <span className="text-sm text-gray-700 truncate max-w-[200px]">
              {selectedFile.name}
            </span>
          </div>
          {previewUrl && (
            <img src={previewUrl} alt="preview" className="h-10 w-10 object-cover rounded" />
          )}
          <button
            type="button"
            onClick={removeFile}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 relative">
          <div className="absolute left-3 bottom-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Ajouter un fichier"
            >
              <FaPaperclip className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute right-3 bottom-3">
            <div className="relative" ref={emojiPickerRef}>
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Ajouter un emoji"
              >
                <FaSmile className="h-5 w-5" />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    disableAutoFocus
                    searchPlaceholder="Rechercher un emoji..."
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              )}
            </div>
          </div>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Écrivez votre message..."
            className="w-full resize-none rounded-2xl border border-gray-200 px-12 py-3 focus:outline-none focus:border-green-500 transition-colors"
            style={{
              minHeight: '48px',
              maxHeight: '120px'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() && !selectedFile}
          className={`p-3 rounded-full transition-colors ${
            (message.trim() || selectedFile)
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <FaPaperPlane className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput; 