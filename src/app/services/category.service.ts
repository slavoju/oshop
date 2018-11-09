import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Category } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): AngularFireList<Category> {
    return this.db.list('/categories',
      ref => ref.orderByChild('name')
   );
  }
}
