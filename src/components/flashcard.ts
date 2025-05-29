
/*
 * Component | Test 
 */

import { IModule } from "@sygnal/sse";


export class FlashcardComponent implements IModule {

  elem: HTMLElement;

  get isFront(): boolean {
    const front = this.elem.querySelector<HTMLElement>('[component-part="front"]');
    return front?.classList.contains('w--current') ?? false;
  }

  set isFront(value: boolean) {
    if (value) {
      this.clickPart('front');
    } else {
      this.clickPart('back');
    }
  }



  constructor(elem: HTMLElement) {
    this.elem = elem; 

  }

  setup() {
        
  }

  exec() {

    const sa5: any = window['sa5' as any];
    const actions = this.elem.querySelectorAll<HTMLElement>('[card-action]');

    actions.forEach(actionElem => {
      const action = actionElem.getAttribute('card-action');

      if (!action) return;

      actionElem.addEventListener('click', (e) => {
        switch (action) {
          case 'pref':
            this.handlePref();
            break;
          case 'next':
            this.handleNext();
            break;
          case 'flip':
            this.handleFlip();
            break;
          default:
            console.warn(`Unknown card-action: ${action}`);
        }
      });
    }); 
    
  }

  handlePref(): void {
    console.log('Previous card');
    // your logic here
  }

  handleNext(): void {
    console.log('Next card');
    // your logic here
  }

  handleFlip(): void {
    console.log('Flip card', this.isFront); 
    // your logic here

    this.isFront ? this.isFront=false: this.isFront = true; 

  }

clickPart(name: string): void {
  const part = this.elem.querySelector<HTMLElement>(`[component-part="${name}"]`);
  if (part) {
    part.click();
  } else {
    console.warn(`No element found with component-part="${name}"`);
  }
}

}
