import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

export const addTaskToFirestore = async (task) => {
  try {
    await addDoc(tasksCollection, task);
  } catch (e) {
    console.error("Error adding task: ", e);
  }
};

export const getTasksFromFirestore = async (userId) => {
  try {
    const q = query(tasksCollection, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tasks;
  } catch (e) {
    console.error("Error getting tasks: ", e);
  }
};

export const updateTaskInFirestore = async (taskId, updatedData) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
  } catch (e) {
    console.error("Error updating task: ", e);
  }
};

export const deleteTaskFromFirestore = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (e) {
    console.error("Error deleting task: ", e);
  }
};
