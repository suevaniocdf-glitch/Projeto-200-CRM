// Persistencia do Projeto 200.
// Usa o Firestore quando o firebase-config.js estiver preenchido;
// caso contrario, usa o localStorage do navegador (modo offline/local).
import { db, firebaseReady } from "./firebase-config.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

const KEY = "crm200:data:v12";       // chave local
const COL = "projeto200";            // colecao no Firestore
const DOC = "estado";                // documento unico com todo o estado

export async function load() {
  if (firebaseReady && db) {
    try {
      const snap = await getDoc(doc(db, COL, DOC));
      if (snap.exists() && snap.data().payload) return snap.data().payload;
    } catch (e) {
      console.warn("Falha ao ler do Firestore, usando dados locais:", e);
    }
  }
  try {
    const r = localStorage.getItem(KEY);
    if (r) return JSON.parse(r);
  } catch (e) {}
  return null;
}

export async function persist(d) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
  if (firebaseReady && db) {
    try {
      await setDoc(doc(db, COL, DOC), { payload: d, updatedAt: Date.now() });
    } catch (e) {
      console.warn("Falha ao gravar no Firestore:", e);
    }
  }
}
