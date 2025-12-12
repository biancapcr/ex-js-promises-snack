// funzione che restituisce una promise che si risolve dopo 3 secondi
function lanciaDado() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const incastro = Math.random() < 0.2; // 20% dei casi
      if (incastro) {
        reject("il dado si è incastrato");
      } else {
        const numero = Math.floor(Math.random() * 6) + 1;
        resolve(numero);
      }
    }, 3000);
  });
}

// test
lanciaDado()
  .then((numero) => console.log("numero uscito:", numero))
  .catch((errore) => console.log("errore:", errore));

//bonus
// funzione hof che crea una closure per memorizzare l'ultimo risultato
function creaLanciaDado() {
  let ultimoLancio = null; // variabile privata interna alla closure

  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const incastro = Math.random() < 0.2;
        if (incastro) {
          reject("il dado si è incastrato");
        } else {
          const numero = Math.floor(Math.random() * 6) + 1;

          // controllo se il numero è uguale all'ultimo
          if (numero === ultimoLancio) {
            console.log("incredibile");
          }

          ultimoLancio = numero; // aggiorna la memoria
          resolve(numero);
        }
      }, 3000);
    });
  };
}

// test
const lancia = creaLanciaDado();

lancia()
  .then((n) => console.log("lancio 1:", n))
  .catch((err) => console.log("errore:", err));

lancia()
  .then((n) => console.log("lancio 2:", n))
  .catch((err) => console.log("errore:", err));
