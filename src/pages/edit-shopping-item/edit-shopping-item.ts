import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {  FirebaseObjectObservable ,AngularFireDatabase  } from 'angularFire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';


@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {


  shoppingItem={} as ShoppingItem;
  shoppingItemRef$:FirebaseObjectObservable<ShoppingItem>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database :AngularFireDatabase) {

    const shoppingItemId = this.navParams.get('shoppingItemId');

    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

    this.shoppingItemRef$.subscribe( 
      shoppingItem => this.shoppingItem = shoppingItem)

  }

  editShoppingItem(shoppingItem:ShoppingItem) {

    this.shoppingItemRef$.update(shoppingItem);

      // reset object 
      this.shoppingItem={} as ShoppingItem;
      
          // navigate to list page
          this.navCtrl.pop();
  }

}
