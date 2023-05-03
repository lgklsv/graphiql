import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const API_KEY = import.meta.env.VITE_FB_API_KEY;
const DOMAIN = import.meta.env.VITE_FB_AUTH_DOMAIN;
const PROJ_ID = import.meta.env.VITE_FB_PROJ_ID;
const STORAGE = import.meta.env.VITE_FB_STORAGE;
const MESSAGE = import.meta.env.VITE_FB_MESSAGE_SENDER;
const ID = import.meta.env.VITE_FB_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: DOMAIN,
  projectId: PROJ_ID,
  storageBucket: STORAGE,
  messagingSenderId: MESSAGE,
  appId: ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
