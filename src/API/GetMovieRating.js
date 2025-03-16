import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Импортируем настроенную базу данных
import { setCurrentRating } from "features/userSlice";

// Функция для получения оценки фильма по email и movieID
const getMovieRating = async (email, movieID, dispatch) => {
    console.log(email, movieID); // Логирование для отладки
    try {
        // Получаем все документы из коллекции users
        const usersCollectionRef = collection(db, "users");
        const userQuerySnapshot = await getDocs(usersCollectionRef);

        let userFound = false;

        // Перебираем все документы и ищем пользователя по email
        userQuerySnapshot.forEach((docSnapshot) => {
            const userData = docSnapshot.data();
            if (userData.email === email) {
                userFound = true;
                // Находим в массиве ratings объект с соответствующим movieID
                const ratingObject = userData.ratings.find(rating => rating.movieID === movieID);

                // Если объект с нужным movieID найден, возвращаем rating
                if (ratingObject) {
                    dispatch(setCurrentRating(ratingObject.rating));
                } else {
                    // Если такого фильма нет в ratings
                    dispatch(setCurrentRating(0)); // Устанавливаем дефолтное значение
                }
            }
        });

        if (!userFound) {
            console.error("User not found with email:", email);
            dispatch(setCurrentRating(0)); // Если пользователь не найден, возвращаем дефолтное значение
        }

    } catch (error) {
        console.error("Error fetching rating: ", error);
        dispatch(setCurrentRating(0)); // В случае ошибки возвращаем 0
    }
};

export default getMovieRating;