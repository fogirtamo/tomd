import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase'; // Импортируем настроенную базу данных
import { setMyRatings } from "features/userSlice";

// Функция для получения документа пользователя по email
const getMyRatings = async (email, dispatch) => {
    try {
        // Создаем ссылку на коллекцию пользователей
        const usersCollectionRef = collection(db, "users");

        // Создаем запрос, чтобы найти документ с нужным email
        const q = query(usersCollectionRef, where("email", "==", email));

        // Получаем результаты запроса
        const querySnapshot = await getDocs(q);

        // Если пользователь найден, возвращаем его документ
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data(); // Берем первый найденный документ
            dispatch(setMyRatings(userDoc.ratings));
            // return userDoc; // Возвращаем данные документа
        } else {
            console.error("User not found with email:", email);
            dispatch(setMyRatings([]));
            // return null; // Возвращаем null, если пользователь не найден
        }
    } catch (error) {
        console.error("Error fetching user document: ", error);
        dispatch(setMyRatings([]));
        // return null; // В случае ошибки возвращаем null
    }
};

export default getMyRatings;