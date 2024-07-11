import React, { useState, useEffect } from 'react';
import WikiList from '../components/wiki/WikiList';
import WikiArticle from '../components/wiki/WikiList';
import WikiEditor from '../components/wiki/WikiEditor';
import { getArticles, getArticle, saveArticle } from '../services/wikiService';
import '../styles/WikiPages.css';

const WikiPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const articleList = await getArticles();
    setArticles(articleList);
  };

  const handleSelectArticle = async (id) => {
    const article = await getArticle(id);
    setSelectedArticle(article);
    setIsEditing(false);
  };

  const handleSaveArticle = async (articleData) => {
    await saveArticle(articleData);
    await loadArticles();
    setIsEditing(false);
  };

  return (
    <div className="wiki-page">
      <WikiList articles={articles} onSelectArticle={handleSelectArticle} />
      {selectedArticle && !isEditing && (
        <>
          <WikiArticle article={selectedArticle} />
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}
      {isEditing && (
        <WikiEditor onSave={handleSaveArticle} initialArticle={selectedArticle} />
      )}
      {!selectedArticle && !isEditing && (
        <button onClick={() => setIsEditing(true)}>Crear nuevo artículo</button>
      )}
    </div>
  );
};

export default WikiPage;