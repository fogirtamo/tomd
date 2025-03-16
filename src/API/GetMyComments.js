import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { setMyComments } from 'features/userSlice';

// Функция для получения всех комментариев по userId
const getMyComments = async (userId, dispatch) => {
    try {
        // Получаем ссылку на коллекцию комментариев
        const commentsCollectionRef = collection(db, 'comments');

        // Создаем запрос, чтобы получить только те документы, у которых userId совпадает с переданным значением
        const q = query(commentsCollectionRef, where("userId", "==", userId));

        // Выполняем запрос
        const querySnapshot = await getDocs(q);

        // Извлекаем данные из каждого документа и возвращаем их в виде массива
        const comments = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Сортируем комментарии по дате, если необходимо
        const sortedComments = comments.sort((a, b) => b.date - a.date);

        // Диспатчим результат в Redux
        dispatch(setMyComments(sortedComments));

        // return sortedComments; // Возвращаем отсортированный массив комментариев

    } catch (e) {
        console.error("Error getting documents: ", e);
        dispatch(setMyComments([]));
        // return []; // Возвращаем пустой массив в случае ошибки
    }
};

export default getMyComments;