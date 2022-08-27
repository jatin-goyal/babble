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
  updateDoc,
} from 'firebase/firestore';

import { db } from '../firebase';
import { UserAuth } from './AuthContext';

const DbContext = createContext();

export const UseDatabase = () => useContext(DbContext);

export const DbContextProvider = ({ children }) => {
  const { user } = UserAuth();
  const [articlesList, setArticlesList] = useState([]);
  const [article, setArticle] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [showTags, setShowTags] = useState(false);

  const articleCollectionRef = collection(db, 'articles');

  const publishArticle = data => addDoc(articleCollectionRef, data);

  const deleteArticle = async id => {
    const userArticle = doc(db, 'articles', id);
    await deleteDoc(userArticle);
    getUserArticles();
  };

  const updateArticle = async (id, data) => {
    const docRef = doc(articleCollectionRef, id);
    await updateDoc(docRef, data);
  };

  const getPublicArticles = async () => {
    const q = query(
      articleCollectionRef,
      where('visibility', '==', 'public'),
      orderBy('time', 'desc')
    );
    const data = await getDocs(q);
    setArticlesList(data.docs.map(doc => ({ ...doc.data() })));
  };

  const getArticle = async id => {
    const q = query(articleCollectionRef, where('articleId', '==', id));
    const data = await getDocs(q);
    setArticle(data.docs.map(doc => ({ ...doc.data() })));
  };

  const getUserArticles = async () => {
    const q = query(
      articleCollectionRef,
      where('autherEmail', '==', user.email),
      orderBy('time', 'desc')
    );
    const data = await getDocs(q);
    setUserArticles(data.docs.map(doc => ({ ...doc.data() })));
  };

  return (
    <DbContext.Provider
      value={{
        publishArticle,
        getPublicArticles,
        articlesList,
        getArticle,
        article,
        getUserArticles,
        userArticles,
        showTags,
        setShowTags,
        deleteArticle,
        updateArticle,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
