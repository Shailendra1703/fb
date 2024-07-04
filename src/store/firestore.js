"use client";

import { create } from "zustand";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "@/config/firebase";

const useFirestoreStore = create((set) => ({
  documents: [],
  isLoading: false,
  error: null,

  addDocument: async (collectionName, data) => {
    set({ isLoading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      set((state) => ({
        documents: [...state.documents, { id: docRef.id, ...data }],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getDocuments: async (collectionName) => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ documents: docs, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useFirestoreStore;
