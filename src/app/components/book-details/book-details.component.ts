import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  getId: any
  updateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private NgZone: NgZone,
    private activetedRoute: ActivatedRoute,
    private api: CurdService,
    private router:Router
  ) {
    this.getId = this.activetedRoute.snapshot.paramMap.get('id');
    this.api.getBook(this.getId).subscribe(res => {
      //console.log(res);
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description'],
      });
    });

    this.updateForm = this.fb.group({
      name :[''],
      price :[''],
      description :[''],

    })
  }

  onUpdate(){
    this.api.updateBook(this.getId, this.updateForm.value).subscribe(res=>{
      console.log('Data Updated Succcessful');
      this.NgZone.run(()=>this.router.navigateByUrl('/book-list'))
    },error=>{
      console.log(error)
    })
  }
  ngOnInit(): void {} 
}
