import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { setComments } from 'features/userSlice';

// Функция для получения всех комментариев по movieId
const getCommentsByMovieId = async (movieId, dispatch) => {
    try {
        // Получаем ссылку на коллекцию комментариев
        const commentsCollectionRef = collection(db, 'comments');

        // Создаем запрос, чтобы получить только те документы, у которых movieId совпадает с переданным значением
        const q = query(commentsCollectionRef, where("movieId", "==", movieId));

        // Выполняем запрос
        const querySnapshot = await getDocs(q);

        // Извлекаем данные из каждого документа и возвращаем их в виде массива
        const comments = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const sortedComments = comments.toSorted((a, b) => b.date - a.date)

        dispatch(setComments(sortedComments))
        // return comments; // Возвращаем массив комментариев

    } catch (e) {
        console.error("Error getting documents: ", e);
        return []; // Возвращаем пустой массив в случае ошибки
    }
};

export default getCommentsByMovieId;