import { createContext, useState, useEffect, useContext } from 'react';
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  Timestamp,
  where,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '../firebase';
import { UserAuth } from './AuthContext';

const DbContext = createContext();

export const UseDatabase = () => useContext(DbContext);

export const DbContextProvider = ({ children }) => {
  const { user } = UserAuth();

  const articleCollectionRef = collection(db, 'articles');

  const publishArticle = data => addDoc(articleCollectionRef, data);

  const getPublicArticles = () => {};

  return (
    <DbContext.Provider value={{ publishArticle }}>
      {children}
    </DbContext.Provider>
  );
};
