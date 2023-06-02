import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{
 bookForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private ngZone :NgZone,
    private crudApi : CurdService
    ){
      this.bookForm = this.fb.group({
        name:[],
        price:[],
        description:[]
      })
    }
  ngOnInit(): void {} 
  onSubmit():any{
    this.crudApi.addBook(this.bookForm.value).subscribe(res=>{
      console.log("Data Added succesfully"+res);
      this.ngZone.run(()=> this.router.navigateByUrl('/book-list'))
    },(err)=>{
      console.log(err)
    });
  }

}
