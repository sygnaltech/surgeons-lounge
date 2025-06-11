
/*
 * Page | Flashcard Setup 
 */

import { IModule } from "@sygnal/sse";

import memberstackDOM from "@memberstack/dom";
import { User } from "../utils/user";
import { Data } from "../utils/data";
import { Display } from "../utils/display";


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


const radio = document.querySelector<HTMLInputElement>('input[type="radio"][name="type"][value="all"]');
if (radio) {
    radio.checked = true;
}



    /**
     * User login 
     */

    this.user = await User.create();

    if (this.user.loggedIn) { 

      this.enableFlashcards(); 

    } else {
      console.log("No user is logged in");
      return; 
    }


    /**
     * Load data 
     */

    // Load List of Categories 
    const dataCategories = new Data("categories"); 
//     console.log("DATA-CATEGORIES", dataCategories) 

    // Load List of Flashcards 
    const dataFlashcards = new Data("flashcards"); 
//    console.log("DATA-FLASHCARDS", dataFlashcards) 






    // Process user data 
    // Get member JSON 
    await this.user.loadData(); 

    console.log("USER DATA", this.user.data);

    Object.entries(this.user.data.cards).forEach(([key, card]) => {
        console.log("KEY:", key);
        console.log("CARD:", card); 

//        this.user.

      dataFlashcards.getByKey(key).f = (card as any).f;

        // card.d;
        // card.f;
    });

//    console.log("DATA-FLASHCARDS 2", dataFlashcards) 


    // Iterate through Flashcards 
    // count cards into category groups 
    dataFlashcards.forEach((key, dataObj, item) => {
        // console.log("Key:", key);
        // console.log("Data:", dataObj);

console.log("11", key, dataObj)

        // Increment category item count 
        dataCategories.getByKey(dataObj.category).cards++; 

        switch(dataObj.f) {
          case "l":

console.log("Applying", dataObj.f, "to", dataObj.category)

            dataCategories.getByKey(dataObj.category).low++;
            break;
          case "m":
console.log("Applying", dataObj.f, "to", dataObj.category)
            dataCategories.getByKey(dataObj.category).medium++;
            break;
          case "h":
console.log("Applying", dataObj.f, "to", dataObj.category)
            dataCategories.getByKey(dataObj.category).high++;
            break;
        }


    });

    // Iterate through Dategories 
    // Display values 

    const display = new Display();  

    dataCategories.forEach((key, dataObj, item) => {
        console.log("Key:", key);
        console.log("Data:", dataObj);

        display.show(key, "total", dataObj.cards); 

        display.show(key, "low", dataObj.low); 
        display.forEach(key, "low", (elem) => { 
            elem.setAttribute("val", dataObj.low); 
        });

        display.show(key, "medium", dataObj.medium); 
        display.forEach(key, "medium", (elem) => { 
            elem.setAttribute("val", dataObj.medium); 
        });

        display.show(key, "high", dataObj.high); 
        display.forEach(key, "high", (elem) => { 
            elem.setAttribute("val", dataObj.high); 
        });

    });




// display value 



    /**
     * Form validation 
     */

    // Setup validation on checkboxes 
    const form = document.querySelector('form#setup-form');
    const categoryFieldset = document.getElementById('categorys') as HTMLFieldSetElement;

    if(!form)
      console.error("cannot find form.");  

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
