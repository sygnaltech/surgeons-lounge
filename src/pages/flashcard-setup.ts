
/*
 * Page | Flashcard Setup 
 * 
 */

import { IModule } from "@sygnal/sse";

import memberstackDOM from "@memberstack/dom";
import { User } from "../utils/user";
import { Data } from "../utils/data";
import { Display } from "../utils/display";


const memberstack = memberstackDOM.init(
  {
    publicKey: "pk_4c3139f988f49cf84e09",
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

    /**
     * Initialize UX 
     */

    this.initUX(); 

    /**
     * User login 
     */

    this.user = await User.create();

    if (this.user.loggedIn) { 

      // console.log("user", this.user)

      // Enable page 
      this.enablePage(); 

    } else {

      // Show login message
      const elements = document.querySelectorAll('[app-message="login"]');
      elements.forEach(elem => {
        (elem as HTMLElement).style.display = 'block';
      }); 
      
      console.log("No user is logged in");
      return; 
    }

    /**
     * Load Data 
     */
    
    await this.loadData(); 

  }

  /**
   * Load data into the Page. 
   */

  async loadData() {


    /**
     * Load data from data structures 
     */

    // Load List of Categories 
    const dataCategories = new Data("categories"); 
    // dataCategories.forEach((key, dataObj, item) => {
    //     console.log('Category:', key);
    // });

    // Load List of Flashcards 
    const dataFlashcards = new Data("flashcards"); 
    // dataFlashcards.forEach((key, dataObj, item) => {
    //     console.log('Card:', key, dataObj.category);
    // });






    // Process user data 
    // Get member JSON 
    await this.user.loadData(); 

//    console.log("USER DATA", this.user.data); 

    if(this.user.data.cards) {

      Object.entries(this.user.data.cards).forEach(([key, card]) => {
          // console.log("KEY:", key);
          // console.log("CARD:", card); 

          // Verify card exists by key 
          if(!dataFlashcards.getByKey(key)) {
            console.error("Unable to get card key", key);
            return; 
          }

          dataFlashcards.getByKey(key)!.f = (card as any).f;

      });

    }

//    console.log("DATA-FLASHCARDS 2", dataFlashcards) 

    // Iterate through Flashcards 
    // count cards into category groups 
    dataFlashcards.forEach((key, dataObj, item) => {
        // console.log("Key:", key);
        // console.log("Data:", dataObj);

//        console.log("11", key, dataObj)

        // Increment category item count 
        dataCategories.getByKey(dataObj.category).cards++; 

        switch(dataObj.f) {
          case "l":
//            console.log("Applying", dataObj.f, "to", dataObj.category)
            dataCategories.getByKey(dataObj.category).low++;
            break;
          case "m":
//            console.log("Applying", dataObj.f, "to", dataObj.category)
            dataCategories.getByKey(dataObj.category).medium++;
            break;
          case "h":
//            console.log("Applying", dataObj.f, "to", dataObj.category)
            dataCategories.getByKey(dataObj.category).high++;
            break;
        }

    });

    // Iterate through Dategories 
    // Display values 

    const display = new Display();  

    dataCategories.forEach((key, dataObj, item) => {

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

  }

  initUX() {

    /**
     * Init Settings UI 
     */

    // Filter Questions 
    // Select All radio button 
    const radio = document.querySelector<HTMLInputElement>('input[type="radio"][name="type"][value="all"]');
    if (radio) {
        radio.checked = true;
    }

    // Setup Clear button 
    const btn = document.getElementById('btn-clear-data');
    btn?.addEventListener('click', async () => {
      if (confirm('Are you sure?')) {
        console.log('User confirmed clear data');

        await this.user.clearData(); 

        // Show message, this is important to
        // give the clear command time to execute before refresh 
        alert("User data cleared.");

        window.location.reload(); 

      }
    });


    /**
     * Form validation 
     */

    // Get form 
    const form = document.querySelector('form#setup-form') as HTMLFormElement | null;
    if(!form) {
      console.error("cannot find form.");  
      return; 
    }

    form?.addEventListener('submit', (e) => {

      // Validate checkboxes 
      const categoryFieldset = document.getElementById('categorys') as HTMLFieldSetElement; 
      const checkboxes = categoryFieldset.querySelectorAll('input[type="checkbox"]');
      const oneChecked = Array.from(checkboxes).some(cb => (cb as HTMLInputElement).checked);

      if (!oneChecked) {
        e.preventDefault();
        alert('Please select at least one category.');
      } 

      // Ensure form is valid before submission 
      if (!form.checkValidity()) {
        console.log('Form is invalid');
        return;
      }

      // Change submit button text 
      const submitBtn = form.querySelector('input[type="submit"]') as HTMLInputElement | null;
      if (submitBtn) {
        submitBtn.value = 'Setting Up Deck...';
      } 

    });

  } 



  /**
   * Enable settings UI 
   */

  enablePage() {
    const fieldset = document.getElementById("deck-setup") as HTMLFieldSetElement | null;

    if (fieldset) {
      fieldset.disabled = false;

      console.log("Flashcards enabled.");
    } else {
      console.warn("fieldset#deck-setup not found.");
    }
  }

}
