import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup , FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
  data:any;
  getId: any
  updateForm! : FormGroup;
  constructor(
    private fb: FormBuilder,
    private NgZone: NgZone,
    private activetedRoute: ActivatedRoute,
    private api: CurdService,
    private router:Router
  ) {
   this.getId = this.activetedRoute.snapshot.paramMap.get('id');
   this.api.getBook(this.getId).subscribe(res=>{
    
   this.data = this.updateForm.setValue({
      name:res['name'],
      price:res['price'],
      description:res['description'],

    })
   })
  //  this.api.getBook(this.getId).subscribe(res=>{
  //   this.data = res.reduce((obj:any,item:any)=> Object.assign(obj,{[item.name]:item.price}))
  //   console.log(this.data);
  //   this.updateForm.setValue({
  //     name:this.data['name'],
  //     price:this.data['price'],
  //     description:this.data['description'],

  //   })
  //  })

   this.updateForm = this.fb.group({
    name:[''],
      price:[''],
      description:['']

   })
  }

  onUpdate(){
    let abc = JSON.stringify(this.updateForm.value)
    console.log(abc+"  abc Value")
    this.api.updateBook(this.getId, abc).subscribe(res=>{
      console.log('Data Updated Succcessful');
      console.log(JSON.stringify(res)+"  form Value" ) 
      this.NgZone.run(()=>this.router.navigateByUrl('/book-list'))
    },error=>{
      console.log(error)
    })
  }
  ngOnInit(): void {
  
  } 
}
