
/*
 * Component | Submit Button 
 */

import { IModule } from "@sygnal/sse";


export class SubmitButtonComponent implements IModule {

  elem: HTMLInputElement;

  set isSubmitting(submitting: boolean) {

console.log("SUBMITTING", submitting)

    if(submitting)
      this.elem.value = this.elem.getAttribute("data-wait") || "Please wait...";
    else
      this.elem.value = this.elem.getAttribute("data-value") || "Submit";
  }
  // get isSubmitting(): boolean {

  // }

  constructor(elem: HTMLElement) {
    this.elem = elem as HTMLInputElement; 

  }

  setup() {
        
  }

  exec() {

    this.elem.setAttribute("data-value", this.elem.value); 

    // Initialize sa5 window var
//    const sa5: any = window['sa5' as any];

  }

}
