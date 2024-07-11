import React, { useState } from 'react';

const WikiEditor = ({ onSave, initialArticle }) => {
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [content, setContent] = useState(initialArticle?.content || '');
  const [media, setMedia] = useState(initialArticle?.media || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content, media });
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia([...media, { type: file.type.startsWith('image') ? 'image' : 'video', url: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="wiki-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título del artículo"
        className="wiki-editor-title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido del artículo"
        className="wiki-editor-content"
      />
      <div className="wiki-editor-media">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaUpload}
          className="wiki-editor-media-input"
        />
        <div className="wiki-editor-media-preview">
          {media.map((item, index) => (
            <div key={index} className="wiki-editor-media-item">
              {item.type === 'image' ? (
                <img src={item.url} alt="Preview" />
              ) : (
                <video src={item.url} controls />
              )}
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="wiki-editor-submit">Guardar</button>
    </form>
  );
};

export default WikiEditor;