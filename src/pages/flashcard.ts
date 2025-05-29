
/*
 * Page | Flashcard
 */

import { IModule } from "@sygnal/sse";
 

export class FlashcardPage implements IModule {

  constructor() {
  }

  setup() {
        
  }

  exec() {

    console.log("Flashcards")

  } 

  initDeck() {

    // Get config from querystring

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
