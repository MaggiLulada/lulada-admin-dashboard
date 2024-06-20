import { 
    db,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "@/lib/firebaseConfig";


/**
 * Create a new document in a specified collection.
 * @param {string} collectionName - The name of the collection.
 * @param {Object} data - The data to be stored in the document.
 * @returns {Promise<Object>} - The created document with its ID.
 */
export const createDocument = async (collectionName, data) => {
  if (!collectionName || typeof collectionName !== 'string') {
    throw new Error('Invalid collection name');
  }

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data');
  }

  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Error adding document');
  }
};

/**
 * Get a document by ID from a specified collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document.
 * @returns {Promise<Object>} - The document data.
 */
export const getDocumentById = async (collectionName, id) => {
  if (!collectionName || typeof collectionName !== 'string') {
    throw new Error('Invalid collection name');
  }

  if (!id || typeof id !== 'string') {
    throw new Error('Invalid document ID');
  }

  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('No such document');
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    throw new Error('Error getting document');
  }
};

/**
 * Get all documents from a specified collection.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<Array>} - An array of documents.
 */
export const getAllDocuments = async (collectionName) => {
  if (!collectionName || typeof collectionName !== 'string') {
    throw new Error('Invalid collection name');
  }

  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw new Error('Error getting documents');
  }
};

/**
 * Update a document by ID in a specified collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document.
 * @param {Object} data - The data to update.
 * @returns {Promise<Object>} - The updated document data.
 */
export const updateDocumentById = async (collectionName, id, data) => {
  if (!collectionName || typeof collectionName !== 'string') {
    throw new Error('Invalid collection name');
  }

  if (!id || typeof id !== 'string') {
    throw new Error('Invalid document ID');
  }

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data');
  }

  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    return { id, ...data };
  } catch (error) {
    console.error('Error updating document: ', error);
    throw new Error('Error updating document');
  }
};

/**
 * Delete a document by ID from a specified collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document.
 * @returns {Promise<Object>} - The ID of the deleted document.
 */
export const deleteDocumentById = async (collectionName, id) => {
  if (!collectionName || typeof collectionName !== 'string') {
    throw new Error('Invalid collection name');
  }

  if (!id || typeof id !== 'string') {
    throw new Error('Invalid document ID');
  }

  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return { id };
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw new Error('Error deleting document');
  }
};