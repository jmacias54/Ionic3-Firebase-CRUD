import { Component } from '@angular/core';
import {  NavController, NavParams , ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import {  FirebaseListObservable ,AngularFireDatabase  } from 'angularFire2/database';
import{ShoppingItem} from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../../pages/edit-shopping-item/edit-shopping-item';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$:FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database :AngularFireDatabase , 
    private actionSheetController:ActionSheetController) {
    this.shoppingListRef$ = this.database.list('shopping-list')
  }

  selectShoppingItem(shoppingItem:ShoppingItem){
    this.actionSheetController.create({
      title : `${shoppingItem.itemName}`,
      buttons : [
        {
          text:'Edit',
          handler: () =>{
              this.navCtrl.push(EditShoppingItemPage,{shoppingItemId:shoppingItem.$key});
          }
        },
        {
          text:'Delete',
          role:'destructuve',
          handler: () =>{
              this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text:'Cancel',
          role:'cancel',
          handler: () =>{

          }
        }
      ]
    }).present();
  }

  navigateToAddShoppingPage(shoppingItem:ShoppingItem){
    // navigate user to add shoping page 
    this.navCtrl.push(AddShoppingPage);
  }

}
