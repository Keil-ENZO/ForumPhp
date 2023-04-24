// const textArea = document.getElementById("textArea");
// const message = document.getElementById("message");

// // Fonction pour afficher les messages
// function displayMsg() {
//   fetch(`http://localhost:8888/ForumPhp/Api/Display/displayMsg.php`)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         const messages = data.Messages;
//         messages.forEach((msg) => {
//           const date = new Date(msg.date_envoi);
//           const dateNow = formatDate(date);
//           const pseudo = msg.pseudo;
//           const text = msg.message;

//           message.insertAdjacentHTML(
//             "afterbegin",
//             `
//             <div class="card">
//               <p class="author">${pseudo}</p>
//               <p>${text}</p>
//               <p class="date">${dateNow}</p>
//             </div>
//           `
//           );
//         });
//       } else {
//         alert(data.message);
//       }
//     })
//     .catch((error) => {
//       alert("Une erreur est survenue : " + error);
//     });
// }

// displayMsg();

// function displayMsg(topicId) {
//     const url = `http://localhost:8888/ForumPhp/Api/Display/displayMsg.php?topic_id=${topicId}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         const date = new Date();
//         const dateNow = formatDate(date);
//         const pseudo = data.pseudo;

//         message.insertAdjacentHTML(
//           "afterbegin",
//           `
//               <div class="card">
//                 <p class="author">${pseudo}</p>
//                 <p>${data.message}</p>
//                 <p class="date">${dateNow}</p>
//               </div>
//             `
//         );
//       })
//       .catch((error) => console.error(error));
//   }
