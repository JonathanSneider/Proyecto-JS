import React from 'react';

const WikiList = ({ articles, onSelectArticle }) => {
  return (
    <div className="wiki-list">
      <h2>Artículos Wiki</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id} onClick={() => onSelectArticle(article.id)}>
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WikiList;