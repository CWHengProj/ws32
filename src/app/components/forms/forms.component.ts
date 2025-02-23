import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: false,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  private fb =inject(FormBuilder)
  protected userForm!: FormGroup
  userArray!:FormGroup[]
  ngOnInit(): void {
    this.userForm=this.createForm() 
  }
  createForm(): FormGroup{
    //create the form here.the form includes the array which will change in size once we edit it
    this.userArray=[]
    return this.fb.group({
      description: this.fb.control<string>('',[Validators.required, Validators.minLength(5)]),
      priority:this.fb.control<string>('low',[Validators.required]),
      due:this.fb.control<string>('',[Validators.required])
    })
  }
  protected isValid():boolean{
    return !this.userForm.valid
  }
  protected addItemToList():void{
    console.log('Task has been added.',this.userForm)
    this.userArray.push(this.userForm)
  }

}
