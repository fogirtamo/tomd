import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import { setUser } from "features/userSlice";

const getUserNickname = async (userId, dispatch) => {
    try {
        const usersCollectionRef = collection(db, "users");
        // Создаем запрос для поиска документа с нужным userId
        const q = query(usersCollectionRef, where("userId", "==", userId));

        // Получаем результаты запроса
        const querySnapshot = await getDocs(q);

        // Проверяем, был ли найден хотя бы один документ
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Получаем первый найденный документ
            const userData = userDoc.data(); // Извлекаем данные из документа
            console.log("User nickname:", userData.nickname); // Выводим nickname
            dispatch(setUser({ ...userData, id: userId })); // Сохраняем nickname и другие данные в Redux
        } else {
            console.log("No user found with the given userId");
        }
    } catch (error) {
        console.error("Error getting user document:", error);
    }
}

export default getUserNickname;