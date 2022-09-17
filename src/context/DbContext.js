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
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [loading, setLoading] = useState(false);

  const articleCollectionRef = collection(db, 'articles');

  const commentsCollectionRef = collection(db, 'comments');

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

  const getPublicArticles = () => {
    setLoading(true);
    const q = query(
      articleCollectionRef,
      where('visibility', '==', 'public'),
      orderBy('time', 'desc')
    );
    getDocs(q)
      .then(data => {
        setArticlesList(
          data.docs.map(doc => ({ documentId: doc.id, ...doc.data() }))
        );
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const getArticle = documentId => {
    setLoading(true);
    const docRef = doc(articleCollectionRef, documentId);
    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          setArticle({ ...docSnap.data() });
          setLoading(false);
        } else {
          console.log('No such document!');
          setLoading(false);
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

  const postComment = async data => await addDoc(commentsCollectionRef, data);

  const getComments = articleId => {
    const q = query(commentsCollectionRef, where('articleId', '==', articleId));
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
        loading,
        setLoading,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
