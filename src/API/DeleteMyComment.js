import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { setMyComments } from 'features/userSlice';

// Функция для удаления комментария по заданным параметрам
const deleteMyComment = async (userId, movieId, comment, date, dispatch) => {
  try {
    // Получаем ссылку на коллекцию комментариев
    const commentsCollectionRef = collection(db, 'comments');

    // Создаем запрос, чтобы найти документ с указанными параметрами
    const q = query(
      commentsCollectionRef,
      where("userId", "==", userId),
      where("movieId", "==", movieId),
      where("comment", "==", comment),
      where("date", "==", date)
    );

    // Выполняем запрос
    const querySnapshot = await getDocs(q);

    // Если документ найден, удаляем его
    if (!querySnapshot.empty) {
      // Получаем ссылку на первый найденный документ
      const docRef = doc(db, 'comments', querySnapshot.docs[0].id);

      // Удаляем документ из Firestore
      await deleteDoc(docRef);

      // После удаления, можно обновить список комментариев в Redux
      // Получаем обновленный список комментариев
      const updatedCommentsSnapshot = await getDocs(query(commentsCollectionRef, where("userId", "==", userId)));
      const updatedComments = updatedCommentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Сортируем обновленные комментарии по дате
      const sortedComments = updatedComments.sort((a, b) => b.date - a.date);

      // Диспатчим обновленный список в Redux
      dispatch(setMyComments(sortedComments));

    } else {
      console.log("Комментарий не найден");
    }
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export default deleteMyComment;