import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { MainserviceService } from 'src/app/service/mainservice.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, Subject, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiUrls } from 'src/app/config/ApiUrls';
@Component({
  selector: 'app-broadcast-mgt',
  templateUrl: './broadcast-mgt.component.html',
  styleUrls: ['./broadcast-mgt.component.scss']
})
export class BroadcastMgtComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  form : FormGroup;
  filteredFruits : Subscription;
  users: string[] = [];
  userList: any [] = [];
  allUser :  any;
  // fruitCtrl =new FormControl('')

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  isallUser: boolean = false;
  alluserList: any =[];
  allUsers: any = [];
  selectedIdArr: any = [];
  constructor(private service :  MainserviceService) {
    

  }
  ngOnInit(){
   this.form =  new FormGroup({
     "textArea" :  new FormControl('', Validators.required),
     fruitCtrl :new FormControl('')

   });
  this.userListApi();
  // .debounceTime(500) //before emitting last event
  // .distinctUntilChanged()
   this.form.valueChanges.subscribe((res)=>{
     if (res.fruitCtrl!=''){
       setTimeout(() => {
         this.userListApi(); 
       }, 8000);
       this.allUsers = this._filter(res.fruitCtrl );
     }
   
     if (res.fruitCtrl===''){
     this.userListApi();
    }
  });
  }
  
  changeUser(event){
    this.isallUser = event
  }

  userListApi() {
    const data = {
      search :""
    }
    this.service.postApi(ApiUrls.userList ,data ,1).subscribe((res)=>{
     if (res.responseCode==200){
       this.userList = res.result ?  res.result : [] ;  
       this.allUsers = []
       res.result.forEach(ele => {
         if (ele.firstName != undefined){
         
          this.allUsers.push({name : ele.firstName , id : ele._id});
         }
       
       });
       res.result.forEach(ele => {
        this.alluserList.push(ele._id)
      });
      }
     else{
      this.userList = res.result ?  res.result : [] ;  
     }
   },err=>{
     this.service.hideSpinner();
    this.service.errorToast(err.responseMessage)
    })
  }

  sendMessage(){
    if (this.form.valid){
       let data;
        if (this.isallUser == true){
          this.users = [];
           let data1 = [...new Set(this.alluserList)];
           data = {
            users :  data1,
            message : this.form.value.textArea
           }
           this.service.showSpinner();
           this.service.postApi(ApiUrls.sendNotification, data, 1).subscribe((res: any) => {
             if (res.responseCode == 200) {
               this.service.hideSpinner();
               this.isallUser = false;
               this.service.successToast('Notification sent successfully')
               this.form.reset()
             }
           })

        }
         if (this.isallUser == false){
          let data1 = [...new Set(this.selectedIdArr)];
           data = {
            users :  data1,
            message : this.form.value.textArea
          }
          this.service.showSpinner();
          this.service.postApi(ApiUrls.sendNotification, data, 1).subscribe((res: any) => {
            if (res.responseCode == 200) {
              this.service.hideSpinner();
              this.service.successToast('Notification sent successfully')
              this.form.reset()
            }
          })
        }
   
      
    }else{
      this.service.errorToast('Message is required')
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value).trim()) {
      this.allUsers.forEach(ele => {
        if (ele.name === value){
          this.users.push(value.trim());
          return false
        }
        else{
          this.service.errorToast('this user is not exist');
          return false
        }
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    // this.form.setValue({
    //   fruitCtrl : null,
    //   textArea : null
    // });
    }

  remove(fruit: string): void {
    const index = this.users.indexOf(fruit);
    if (index >= 0) {
      this.users.splice(index, 1);
      this.allUsers.forEach(ele => {
        if (ele.name == fruit){
          const index =  this.selectedIdArr.indexOf(ele.id);
          this.selectedIdArr.splice(index , 1);          
        }
      });
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
     this.users.push(event.option.viewValue);
    this.selectedIdArr.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    // this.form.setValue({
    //   fruitCtrl : null,
    //   textArea : null
    // });
  }

  private _filter(value) {
    if (value != null){
      const filterValue = value.toLowerCase();
      return this.allUsers.filter(data => data.name.toLowerCase().includes(filterValue) ) ;
    } 
  }

}
