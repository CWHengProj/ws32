import { Component, inject, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
  selectedDate!:any

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
  protected isValid(){
    return this.userForm.valid
  }
  protected dateIsInPast():boolean{
    const selectedDate= this.userForm.get('due')
    if (!selectedDate?.value) return false;

    const convertedDate= this.parseDateString(selectedDate.value);
    if (!convertedDate) return false;
    const todaysDate = new Date()
    todaysDate.setHours(0,0,0,0)
    return (convertedDate<new Date())
  }
  private parseDateString(value: string): Date | null {
    const pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = value.match(pattern);
  
    if (!match) return null;
  
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are 0-based
    const day = parseInt(match[3], 10);
  
    const date = new Date(year, month, day);
    
    // Check if the parsed date matches the input values
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return null;
    }
    
    date.setHours(0, 0, 0, 0);
    return date;
  }
  protected addItemToList():void{
    console.log('Task has been added.',this.userForm)
    this.userArray.push(this.userForm)
  }

}
