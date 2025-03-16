import { db } from '../firebase';  // Ваш Firebase конфиг
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";

// Функция для добавления или обновления рейтинга
const addRatingToMovie = async (email, movieID, rating, movieTitle) => {
    try {
        // Ссылка на коллекцию пользователей
        const usersCollectionRef = collection(db, "users");

        // Запрос для поиска пользователя по email
        const q = query(usersCollectionRef, where("email", "==", email));

        // Получаем документы, соответствующие запросу
        const querySnapshot = await getDocs(q);

        // Если пользователи с таким email найдены
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (docSnapshot) => {
                const userDocRef = doc(db, "users", docSnapshot.id); // Ссылка на документ пользователя

                // Получаем текущие рейтинги пользователя
                const userDoc = docSnapshot.data();
                const currentRatings = userDoc.ratings || [];

                // Проверяем, есть ли уже оценка для данного фильма
                const existingRatingIndex = currentRatings.findIndex(rating => rating.movieID === movieID);

                // Если оценка существует, удаляем старую
                if (existingRatingIndex !== -1) {
                    const oldRating = currentRatings[existingRatingIndex];

                    // Удаляем старую оценку из массива
                    await updateDoc(userDocRef, {
                        ratings: arrayRemove(oldRating)
                    });
                }

                // Добавляем новую оценку
                await updateDoc(userDocRef, {
                    ratings: arrayUnion({ movieID, rating, movieTitle }) // arrayUnion добавляет объект в массив, если его там ещё нет
                });
                console.log(`Рейтинг для фильма ${movieID} обновлен для пользователя с email: ${email}`);
            });
        } else {
            console.log("Пользователь с таким email не найден.");
        }
    } catch (e) {
        console.error("Ошибка при добавлении рейтинга:", e);
    }
}

export default addRatingToMovie;