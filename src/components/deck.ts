
/*
 * Component | Flashcard Desk 
 */

import { IModule } from "@sygnal/sse";
import { HtmlUtils } from "../utils/html";

// Get config from querystring
export const FlashcardTopics = [
  "adult-medicine-anesthesia",
  "dentoalveolar",
  "emergency-management",
  "focused-additional-short-topics-fast",
  "implants",
  "infection",
  "orthognathic",
  "pathology",
  "pediatric-medicine-anesthesia",
  "reconstruction",
  "tmj",
  "trauma"
];

export class FlashcardDeckComponent implements IModule {

  elem: HTMLElement;
  private topics: string[] = [];

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



    // Parse query params from current URL
    const params = new URLSearchParams(window.location.search);

    // Check each topic
    FlashcardTopics.forEach(topic => {
      if (params.get(topic) === "on") {
//        console.log(`Enabled: ${topic}`);
        this.addTopic(topic); 
      }
    });

//    this.initDeck(); 


    // Iterate through the children of this.elem
    // Remove elements whose [app-card-category] is not in this.topics
    const children = Array.from(this.elem.children);

    children.forEach(child => {
      const category = child.getAttribute('app-card-category');
      if (category && !this.topics.includes(category)) {
        child.remove();
      }
    });



    // Random sort 
    HtmlUtils.randomSort(this.elem);

  }

  addTopic(topic: string) {
    if (FlashcardTopics.includes(topic) && !this.topics.includes(topic)) {
      this.topics.push(topic);
      console.log(`Topic added: ${topic}`);
    }
  }

  getTopics(): string[] {
    return [...this.topics];
  }

}
