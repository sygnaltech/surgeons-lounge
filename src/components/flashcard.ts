
/*
 * Component | Flashcard 
 *
 */


import { IModule } from "@sygnal/sse";
import { Sa5Switch } from "../engine/switch";


export class FlashcardComponent implements IModule {

  elem: HTMLElement;
  switch: Sa5Switch; 

  id: string = "";
  category: string = "";

  get isFront(): boolean {
    return this.switch.value === "front";
    // const front = this.elem.querySelector<HTMLElement>('[component-part="front"]');
    // return front?.classList.contains('w--current') ?? false;
  }
  set isFront(value: boolean) {
    if (value) {
      this.switch.value = 'front';
    } else {
      this.switch.value = 'back';
    }
  }



  constructor(elem: HTMLElement) {

    this.elem = elem; 
    this.switch = new Sa5Switch(elem); 
    this.switch.value = 'front';

    this.id = this.elem.getAttribute("app-card-id") || "";
    this.category = this.elem.getAttribute("app-card-category") || "";

  }

  setup() {
        
  }

  exec() {

    const sa5: any = window['sa5' as any];

    const actions = this.elem.querySelectorAll<HTMLElement>('[card-action]');

    // // Hide it 
    // this.elem.style.display = "none";

    actions.forEach(actionElem => {
      const action = actionElem.getAttribute('card-action');

      if (!action) return;

      actionElem.addEventListener('click', (e) => {
        switch (action) { 

          case 'settings': 
            this.handleSettings(); 
            break;

          // Navigation 
          case 'prev':
            this.handlePrev();
            break;
          case 'next':
            this.handleNext();
            break;
          case 'flip':
            this.handleFlip();
            break;

          // Answer 
          case 'freq-low': 
            this.handleAnswer("low");
            break; 
          case 'freq-medium': 
            this.handleAnswer("medium");
            break; 
          case 'freq-high': 
            this.handleAnswer("high");
            break; 

          default:
            console.warn(`Unknown card-action: ${action}`);
        }
      });
    }); 

  }

  handleAnswer(freq: string): void {

    // Emit custom event
    this.elem.dispatchEvent(new CustomEvent("flashcard:answer", {
      bubbles: true, // so it can bubble up to the deck
      detail: {
        card: this,
        freq: freq, 
      }
    }));

  }

  handleSettings(): void { 

// console.log("settings clicked.")

    // Emit custom event
    this.elem.dispatchEvent(new CustomEvent("flashcard:settings", {
      bubbles: true, // so it can bubble up to the deck
      detail: {
        card: this
      }
    }));

    // const btn = document.getElementById('deck-settings');
    // btn?.addEventListener('click', (e) => {
    //   e.preventDefault(); // Stop the default navigation

    //   if (confirm('Leaving this view will restart your deck, are you sure?')) {
    //     const href = (btn as HTMLAnchorElement).href;
    //     window.location.href = href; // Manually navigate
    //   }
    // });

  }

  handlePrev(): void {

    // Emit custom event
    this.elem.dispatchEvent(new CustomEvent("flashcard:prev", {
      bubbles: true, // so it can bubble up to the deck
      detail: {
        card: this
      }
    }));

  }

  handleNext(): void {

    // Emit custom event
    this.elem.dispatchEvent(new CustomEvent("flashcard:next", {
      bubbles: true, // so it can bubble up to the deck
      detail: {
        card: this
      }
    }));

  }

  handleFlip(): void { 

    console.log("flip")
    this.isFront ? this.isFront=false: this.isFront = true; 

  }

  // clickPart(name: string): void { 

  //   const part = this.elem.querySelector<HTMLElement>(`[component-part="${name}"]`);
  //   if (part) {
  //     part.click();
  //   } else {
  //     console.warn(`No element found with component-part="${name}"`);
  //   } 

  // }

}
