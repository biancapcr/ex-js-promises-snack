import fetch from "node-fetch";
// funzione che restituisce una promise con il titolo del post
function getPostTitle(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("post non trovato");
        return res.json();
      })
      .then((data) => resolve(data.title))
      .catch((err) => reject(err.message));
  });
}

// test
getPostTitle(1)
  .then((title) => console.log("titolo del post:", title))
  .catch((error) => console.error("errore:", error));

// bonus
// funzione che restituisce una promise con il post e i dati dell'autore
function getPost(id) {
  return fetch(`https://dummyjson.com/posts/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("post non trovato");
      return res.json();
    })
    .then((post) => {
      // seconda chiamata per ottenere i dati dell'autore
      return fetch(`https://dummyjson.com/users/${post.userId}`)
        .then((res) => res.json())
        .then((user) => {
          post.user = user; // aggiunge la proprietà "user" al post
          return post;
        });
    });
}

// test
getPost(1)
  .then((post) => console.log("post con autore:", post))
  .catch((error) => console.error("errore:", error));
