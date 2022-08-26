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
  const [articlesList, setArticlesList] = useState([]);

  const articleCollectionRef = collection(db, 'articles');

  const publishArticle = data => addDoc(articleCollectionRef, data);

  const getPublicArticles = async () => {
    const q = query(
      articleCollectionRef,
      where('visibility', '==', 'public'),
      orderBy('time', 'desc')
    );
    const data = await getDocs(q);
    setArticlesList(data.docs.map(doc => ({ ...doc.data() })));

    return articlesList;
  };

  return (
    <DbContext.Provider
      value={{ publishArticle, getPublicArticles, articlesList }}
    >
      {children}
    </DbContext.Provider>
  );
};
