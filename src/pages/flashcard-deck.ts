
/*
 * Page | Flashcard Deck
 */

import { IModule } from "@sygnal/sse";
import { FlashcardDeckComponent, FlashcardTopics } from "../components/deck";
import memberstackDOM from "@memberstack/dom";


const memberstack = memberstackDOM.init(
  {
    publicKey: "pk_4c3139f988f49cf84e09", // "app_clv5nzj1400cy0sw1629ihb5o",
    useCookies: true  
  }
);

// Entry 
// https://surgeonslounge.webflow.io/deck?dentoalveolar=on&focused-additional-short-topics-fast=on&implants=on  


export class FlashcardDeckPage implements IModule {

  deck!: FlashcardDeckComponent; 

  constructor() {
  }

  setup() {
        
  }

  async exec() {

    console.log("Flashcard Deck")

    const member = await memberstack.getCurrentMember();

    if (member) {
        console.log("User is logged in:", member);


    // Get member JSON 
    let json: any = await memberstack.getMemberJSON(); 

    // Access data 
    console.log(json.userName); 
    console.log(json.avatarURL);

    console.log(json); 

    json = null;

// json = { 
//   test: "foo",
//   cards: {
//     "123": "medium",
//     "458": "easy",
//   }
// }

await memberstack.updateMemberJSON({json});


    } else {

      console.log("No user is logged in");

    }


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
