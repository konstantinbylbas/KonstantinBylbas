/** @format */

import { FirebaseCollection, FirebaseTable } from '@_types/portfolio/data.type';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export class firebaseService {
    public async getTableData(
        collection: FirebaseCollection,
        table: FirebaseTable,
    ): Promise<any[]> {
        const tableRef = doc(db, collection, table);

        try {
            const docSnap = await getDoc(tableRef);

            if (!docSnap.exists()) {
                throw 'No such document';
            }

            const dbData = docSnap.data();

            if (!dbData?.data) {
                throw 'No data received';
            }

            return dbData.data;
        } catch (error) {
            console.error('Error getting document:', error);
            return [];
        }
    }
}

export const FirebaseService = new firebaseService();
