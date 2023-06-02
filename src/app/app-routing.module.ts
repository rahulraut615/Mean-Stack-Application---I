import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { EditbookComponent } from './components/editbook/editbook.component';

const routes: Routes = [
  {path:'',redirectTo:'add-book',pathMatch:'full'},
  {path:'book-list',component:BookListComponent},
  {path:'add-book',component:AddBookComponent},
  {path:'edit-book/:id',component:EditbookComponent},
  {path:'book-list/edit-book/:id',component:EditbookComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
