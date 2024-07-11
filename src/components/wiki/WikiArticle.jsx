import React from 'react';

const WikiArticle = ({ article }) => {
  return (
    <div className="wiki-article">
      <h2 className="wiki-article-title">{article.title}</h2>
      <div className="wiki-article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
      <div className="wiki-article-media">
        {article.media && article.media.map((item, index) => (
          <div key={index} className="wiki-article-media-item">
            {item.type === 'image' ? (
              <img src={item.url} alt={`Media ${index + 1}`} />
            ) : (
              <video src={item.url} controls />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WikiArticle;