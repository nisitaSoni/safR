// Firebase configuration for SafeTrip Admin
// TODO: Replace with actual Firebase config values
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';

const firebaseConfig = {
  // TODO: Add your Firebase config here
  apiKey: "demo-api-key",
  authDomain: "safetrip-admin.firebaseapp.com",
  databaseURL: "https://safetrip-admin-default-rtdb.firebaseio.com",
  projectId: "safetrip-admin",
  storageBucket: "safetrip-admin.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

// Authentication functions
export const loginUser = async (email: string, password: string, role: 'police' | 'tourism') => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // TODO: Verify user role against Firestore
    localStorage.setItem('userRole', role);
    return { user: userCredential.user, role };
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('userRole');
  } catch (error) {
    throw error;
  }
};

// Get current user role
export const getCurrentUserRole = (): 'police' | 'tourism' | null => {
  return localStorage.getItem('userRole') as 'police' | 'tourism' | null;
};

// Tourist management functions
export const getTourists = async () => {
  try {
    const touristsRef = collection(db, 'tourists');
    const snapshot = await getDocs(touristsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching tourists:', error);
    return [];
  }
};

// Alerts management functions
export const getAlerts = async () => {
  try {
    const alertsRef = collection(db, 'alerts');
    const snapshot = await getDocs(alertsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

export const updateAlertStatus = async (alertId: string, status: string, responderId?: string) => {
  try {
    const alertRef = doc(db, 'alerts', alertId);
    await updateDoc(alertRef, {
      status,
      responderId,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating alert:', error);
    throw error;
  }
};

// Real-time location tracking
export const subscribeToLocations = (callback: (locations: any[]) => void) => {
  const locationsRef = ref(realtimeDb, 'tourist-locations');
  return onValue(locationsRef, (snapshot) => {
    const data = snapshot.val();
    const locations = data ? Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value as any
    })) : [];
    callback(locations);
  });
};

// Risk zones management
export const getRiskZones = async () => {
  try {
    const zonesRef = collection(db, 'risk-zones');
    const snapshot = await getDocs(zonesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching risk zones:', error);
    return [];
  }
};