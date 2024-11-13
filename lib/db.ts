import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  DocumentData,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';

// Helper function to convert Firestore document to plain object
const convertDoc = (doc: QueryDocumentSnapshot<DocumentData>) => ({
  id: doc.id,
  ...doc.data()
});

// Profiles
export const profilesRef = collection(db, 'profiles');

export const getProfiles = async () => {
  const snapshot = await getDocs(query(profilesRef, orderBy('code')));
  return snapshot.docs.map(convertDoc);
};

export const getProfileByCode = async (code: string) => {
  const q = query(profilesRef, where('code', '==', code));
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : convertDoc(snapshot.docs[0]);
};

export const createProfile = async (data: any) => {
  return await addDoc(profilesRef, {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

// Accessories
export const accessoriesRef = collection(db, 'accessories');

export const getAccessories = async () => {
  const snapshot = await getDocs(query(accessoriesRef, orderBy('code')));
  return snapshot.docs.map(convertDoc);
};

export const getAccessoryByCode = async (code: string) => {
  const q = query(accessoriesRef, where('code', '==', code));
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : convertDoc(snapshot.docs[0]);
};

export const createAccessory = async (data: any) => {
  return await addDoc(accessoriesRef, {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

// Gaskets
export const gasketsRef = collection(db, 'gaskets');

export const getGaskets = async () => {
  const snapshot = await getDocs(query(gasketsRef, orderBy('code')));
  return snapshot.docs.map(convertDoc);
};

export const getGasketByCode = async (code: string) => {
  const q = query(gasketsRef, where('code', '==', code));
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : convertDoc(snapshot.docs[0]);
};

export const createGasket = async (data: any) => {
  return await addDoc(gasketsRef, {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};