// Simulación de una API. En un proyecto real, estas funciones harían llamadas a un backend.

let articles = [
    { id: 1, title: 'Mi primer artículo', content: 'Este es el contenido de mi primer artículo.' },
    { id: 2, title: 'Otro artículo', content: 'Contenido del segundo artículo.' },
  ];
  
  export const getArticles = () => {
    return Promise.resolve(articles);
  };
  
  export const getArticle = (id) => {
    const article = articles.find(a => a.id === id);
    return Promise.resolve(article);
  };
  
  export const saveArticle = (articleData) => {
    if (articleData.id) {
      articles = articles.map(a => a.id === articleData.id ? { ...a, ...articleData } : a);
    } else {
      const newArticle = { ...articleData, id: Date.now() };
      articles.push(newArticle);
    }
    return Promise.resolve();
  };