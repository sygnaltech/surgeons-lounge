
/*
 * Page | Flashcard Setup 
 */

import { IModule } from "@sygnal/sse";

import memberstackDOM from "@memberstack/dom";
import { User } from "../utils/user";


const memberstack = memberstackDOM.init(
  {
    publicKey: "pk_4c3139f988f49cf84e09", // "app_clv5nzj1400cy0sw1629ihb5o",
    useCookies: true  
  }
);



// const memberstack = window["$memberstackDom"];  


export class FlashcardPage implements IModule {

  user!: User; 

  constructor() {
  }

  setup() {
        
  }

  async exec() {

    console.log("Flashcard Setup")

    this.user = await User.create();

    if (this.user.loggedIn) { 

      this.enableFlashcards(); 

    } else {
      console.log("No user is logged in");
      return; 
    }


    // Setup validation on checkboxes 
    const form = document.querySelector('form#setup-form');
    const categoryFieldset = document.getElementById('categorys') as HTMLFieldSetElement;

    if(!form)
      console.error("cannot find form.")

    form?.addEventListener('submit', (e) => {
      const checkboxes = categoryFieldset.querySelectorAll('input[type="checkbox"]');
      const oneChecked = Array.from(checkboxes).some(cb => (cb as HTMLInputElement).checked);

      if (!oneChecked) {
        e.preventDefault();
        alert('Please select at least one category.');
      }
    });



    // Setup Clear button 
    const btn = document.getElementById('btn-clear-data');
    btn?.addEventListener('click', () => {
      if (confirm('Are you sure?')) {
        console.log('User confirmed clear data');

        this.user.clearData(); 

      }
    });



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
