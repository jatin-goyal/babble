import { createContext, useState, useContext } from 'react';
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
          setArticle({ documentId: documentId, ...docSnap.data() });
          setLoading(false);
          getComments();
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

  const commentsCollectionRef = collection(db, 'comments');

  const postComment = async data => await addDoc(commentsCollectionRef, data);

  const getComments = async () => {
    const q = query(commentsCollectionRef, orderBy('time', 'desc'));

    getDocs(q).then(data => {
      setComments(data.docs.map(doc => ({ commentId: doc.id, ...doc.data() })));
    });
  };

  const deleteComment = async commentId => {
    const userComment = doc(db, 'comments', commentId);
    await deleteDoc(userComment);
    getComments();
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
        postComment,
        getComments,
        comments,
        deleteComment,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
