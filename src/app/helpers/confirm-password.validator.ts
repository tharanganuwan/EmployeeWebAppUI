import { FormGroup } from "@angular/forms";

export function ComfirmPasswordValidater(controlName:string,matchControlName:string){
   return(formGroup:FormGroup)=>{
    const npasswordControl = formGroup.controls[controlName];
    const cpasswordControl = formGroup.controls[matchControlName];

    if(npasswordControl.errors && cpasswordControl.errors){
      return;
    }
    if(npasswordControl.value!=cpasswordControl.value){
      cpasswordControl.setErrors({comfirmPasswordValidater:true})
    }else{
      cpasswordControl.setErrors(null);
    }
   }
  }