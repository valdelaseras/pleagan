import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { v4 as uuidV4} from 'uuid';
import firebase from 'firebase';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import { filter, mergeMap } from 'rxjs/operators';
import { filterNullOrUndefined } from '@shared/operator';
import TaskState = firebase.storage.TaskState;

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {}

  uploadFile( file: File ): Observable<string> {
    const _path = `${this.basePath}/${uuidV4()}`;

    const task = this.storage.upload( _path, file );

    return task.snapshotChanges().pipe(
      filterNullOrUndefined(),
      filter( ( snap: UploadTaskSnapshot ) => snap.state === TaskState.SUCCESS ),
      mergeMap( this.getUrl )
    );
  }

  private getUrl(snap: UploadTaskSnapshot): Observable<string> {
    return from( snap.ref.getDownloadURL() );
  }
}
