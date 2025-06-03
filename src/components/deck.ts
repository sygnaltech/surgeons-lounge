
/*
 * Component | Flashcard Desk 
 */

import { IModule } from "@sygnal/sse";
import { HtmlUtils } from "../utils/html";
import { FlashcardComponent } from "./flashcard";

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

  cards: FlashcardComponent[] = []; 

  _cardNum: number = 1; 
  get cardNum(): number {
    return this._cardNum;
  }
  set cardNum(num: number) {
    if(num > this.count) 
      this._cardNum = this.count; 
    else if(num < 1)
      this._cardNum = 1; 
    else
      this._cardNum = num; 

    this.showCard(this._cardNum); 
  }

  get count(): number {
    return this.cards.length; 
  }

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

    // Random sort 
    HtmlUtils.randomSort(this.elem);




    // Iterate through the children of this.elem
    // Remove elements whose [app-card-category] is not in this.topics
    const children = Array.from(this.elem.children) as HTMLElement[];

    children.forEach(child => {
      const category = child.getAttribute("app-card-category");

      if (category && this.topics.includes(category)) {
        const card = new FlashcardComponent(child);
        
        this.cards.push(card);

        card.exec(); // init 
      } else {
        child.remove(); // remove if not matching
      }
    });



    this.showCard(1); 


  this.elem.addEventListener("flashcard:prev", (e: Event) => {
    const customEvent = e as CustomEvent<{ card: FlashcardComponent }>;
    const card = customEvent.detail.card;
    
    console.log("Card prev:", card);
    this.onCardPrev(card);
  });

  this.elem.addEventListener("flashcard:next", (e: Event) => {
    const customEvent = e as CustomEvent<{ card: FlashcardComponent }>;
    const card = customEvent.detail.card;
    
    console.log("Card next:", card);
    this.onCardNext(card);
  });



  }


private onCardPrev(card: FlashcardComponent) {
  // Deck-level logic goes here
  this.cardNum--; 
}


private onCardNext(card: FlashcardComponent) {
  // Deck-level logic goes here
  this.cardNum++; 
}


  showCard(num: number) {


    this.cards.forEach(card => {

      // Hide it 
      card.elem.style.display = "none";
        
    });

    this.cards[num - 1].elem.style.display = "block"; 

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
