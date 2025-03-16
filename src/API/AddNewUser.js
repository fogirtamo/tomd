import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase'

const addNewUser = async (email, nickname, userId) => {
    try {
        // const date = new Date();
        // // Функция для добавления ведущего нуля, если число меньше 10
        // const pad = (num) => num.toString().padStart(2, '0');
        // // Форматируем дату
        // const formattedDate = `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
        const usersCollectionRef = collection(db, "users");
        const docRef = await addDoc(usersCollectionRef, {
            email: email,
            nickname: nickname,
            userId: userId,
            ratings: [],
            // date: formattedDate
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default addNewUser;