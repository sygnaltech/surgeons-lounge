
/*
 * Page | Flashcard Setup 
 */

import { IModule } from "@sygnal/sse";

import memberstackDOM from "@memberstack/dom";


const memberstack = memberstackDOM.init(
  {
    publicKey: "pk_4c3139f988f49cf84e09", // "app_clv5nzj1400cy0sw1629ihb5o",
    useCookies: true  
  }
);



// const memberstack = window["$memberstackDom"];  


export class FlashcardPage implements IModule {

  constructor() {
  }

  setup() {
        
  }

  async exec() {

    console.log("Flashcard Setup")

    const member = await memberstack.getCurrentMember();

    if (member) {
        console.log("User is logged in:", member);

      this.enableFlashcards(); 


    } else {
      console.log("XX No user is logged in");



    }



  } 

enableFlashcards() {
  const fieldset = document.getElementById("deck-setup") as HTMLFieldSetElement | null;

  if (fieldset) {
    fieldset.disabled = false;
    console.log("Flashcards enabled.");
  } else {
    console.warn("fieldset#deck-setup not found.");
  }
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
