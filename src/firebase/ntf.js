import { db } from "@/app/firebaseConfig";
import { ref, get, set, push, off, onValue, remove } from "firebase/database";


export const updateNtfData = async (data) => {
    try {
      if (data) {
        const ntfRef = ref(db, "ntf/" + data?._id);
        const snapshot = await get(ntfRef);
        const existingNtfData = snapshot.val() || {};
        if (existingNtfData) {
          const updatedMsgUnseen = 0;
          await set(ntfRef, {
            ...existingNtfData,
            msgUnseen: updatedMsgUnseen,
            id: null,
            msgtime: Date.now(),
          });
        }
      }
    } catch (error) {
      console.error("Error updating ntf data:", error);
    } finally {
    }
  }