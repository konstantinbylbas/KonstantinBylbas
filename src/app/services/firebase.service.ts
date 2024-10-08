/** @format */

import { iFirebaseService } from '@app/types/injector.type';
import {
    FirebaseCollection,
    FirebaseTable,
} from '@app/types/portfolio/data.type';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@app/firebaseConfig';

export class FirebaseService implements iFirebaseService {
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
