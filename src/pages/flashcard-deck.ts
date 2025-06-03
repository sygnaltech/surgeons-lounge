
/*
 * Page | Flashcard Deck
 */

import { IModule } from "@sygnal/sse";
import { FlashcardDeckComponent, FlashcardTopics } from "../components/deck";
 

// Entry 
// https://surgeonslounge.webflow.io/deck?dentoalveolar=on&focused-additional-short-topics-fast=on&implants=on  


export class FlashcardDeckPage implements IModule {

  deck!: FlashcardDeckComponent; 

  constructor() {
  }

  setup() {
        
  }

  exec() {

    console.log("Flashcard Deck")

    const element = document.querySelector('[sse-component="deck"]') as HTMLElement;

    if (!element) {
      console.error('Deck element not found');
      return;
    }

    this.deck = new FlashcardDeckComponent(element);


    this.initDeck(); 

  } 

  initDeck() {



console.log("initDeck"); 
    // Get config from querystring
 

//     // Parse query params from current URL
//     const params = new URLSearchParams(window.location.search);

//     // Check each topic
//     FlashcardTopics.forEach(topic => {
//       if (params.get(topic) === "on") {
// //        console.log(`Enabled: ${topic}`);
//         this.deck.addTopic(topic); 
//       }
//     });

//     this.deck.initDeck(); 

    // Remove unnecessary cards 

    // Randomize 

    // Reset and save localStorage 

    /**
     * Setup card 
     */

    // [card-action=flip] 
    // [card-action=next] 
    // [card-action=prev] 


  }

}
