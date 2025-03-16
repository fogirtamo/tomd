import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'

const addCommentToMovie = async (nickname, id, comment, imdbID, title) => {
  try {
    const date = new Date();
    // Функция для добавления ведущего нуля, если число меньше 10
    const pad = (num) => num.toString().padStart(2, '0');
    // Форматируем дату
    const formattedDate = `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;

    const commentsCollectionRef = collection(db, "comments");
    const docRef = await addDoc(commentsCollectionRef, {
      nickname: nickname,
      userId: id,
      movieId: imdbID,
      comment: comment,
      formattedDate: formattedDate,
      date: Date.now(),
      movieTitle: title
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default addCommentToMovie;