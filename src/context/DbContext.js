import { createContext, useState, useEffect, useContext } from 'react';
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
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
  const [article, setArticle] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [showTags, setShowTags] = useState(false);

  const articleCollectionRef = collection(db, 'articles');

  const publishArticle = data => addDoc(articleCollectionRef, data);

  const deleteArticle = async documentId => {
    const userArticle = doc(db, 'articles', documentId);
    await deleteDoc(userArticle);
    getUserArticles();
  };

  const updateArticle = async (documentId, data) => {
    const docRef = doc(articleCollectionRef, documentId);
    await updateDoc(docRef, data);
  };

  const getPublicArticles = async () => {
    const q = query(
      articleCollectionRef,
      where('visibility', '==', 'public'),
      orderBy('time', 'desc')
    );
    const data = await getDocs(q);
    setArticlesList(
      data.docs.map(doc => ({ documentId: doc.id, ...doc.data() }))
    );
  };

  const getArticle = documentId => {
    const docRef = doc(articleCollectionRef, documentId);
    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          setArticle({ ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      })
      .catch(err => console.log(err.message));
  };

  const getUserArticles = async () => {
    const q = query(
      articleCollectionRef,
      where('autherEmail', '==', user.email),
      orderBy('time', 'desc')
    );
    const data = await getDocs(q);
    setUserArticles(
      data.docs.map(doc => ({ documentId: doc.id, ...doc.data() }))
    );
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
