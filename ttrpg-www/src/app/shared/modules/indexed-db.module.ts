import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

// export function migrationFactory() {
//   return {
//     1: (db: any, transaction: { objectStore: (arg0: string) => any; }) => {
//       const store = transaction.objectStore('people');
//       store.createIndex('country', 'country', { unique: false });
//     },
//     3: (db: any, transaction: { objectStore: (arg0: string) => any; }) => {
//       const store = transaction.objectStore('people');
//       store.createIndex('age', 'age', { unique: false });
//     }
//   };
// }

const dbConfig: DBConfig  = {
  name: 'TTRPG-DB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'clutch',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'honorific', keypath: 'honorific', options: { unique: false } },
        { name: 'expertise', keypath: 'expertise', options: { unique: false } },
        { name: 'quirk', keypath: 'quirk', options: { unique: false } },
        { name: 'dream', keypath: 'dream', options: { unique: false } },
        { name: 'heirloom', keypath: 'heirloom', options: { unique: false } },
        { name: 'goblins', keypath: 'goblins', options: { unique: false } }
      ]
    }
  ],
  // migrationFactory
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  exports: [
  ]
})
export class IndexedDBModule { }
