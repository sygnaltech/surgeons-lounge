
/*
 * Component | Flashcard Desk 
 */

import { IModule } from "@sygnal/sse";
import { HtmlUtils } from "../utils/html";


export class FlashcardDeckComponent implements IModule {

  elem: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem; 

  }

  setup() {
        
  }
  
  exec() {
    const sa5: any = window['sa5' as any];

    // Clean dynlist DIVs 
    const nodesToUnwrap = this.elem.querySelectorAll<HTMLElement>(
      'div.w-dyn-item, div.w-dyn-items, div.w-dyn-list'
    );

    nodesToUnwrap.forEach(node => HtmlUtils.unwrap(node));

    // Random sort 
    HtmlUtils.randomSort(this.elem);

  }


}
