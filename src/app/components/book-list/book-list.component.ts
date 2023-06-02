import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  Books:any = [];
constructor(private curdApi:CurdService){

}
ngOnInit(): void {
    this.curdApi.getAllBook().subscribe(res=>{
      this.Books =res;
     // console.log(res);
    })
}
deleteBook(id:any,i:any){
  console.log(id)
  if(window.confirm("Are you want to delete this book")){
    this.curdApi.deleteBok(id).subscribe(res=>{
      this.Books.splice(i, 1);
    })
  }
}
}
