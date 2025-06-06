
/*
 * Page | Flashcard Deck
 */

import { IModule } from "@sygnal/sse";
import { FlashcardDeckComponent, FlashcardTopics } from "../components/deck";
import { MemberStack } from "../utils/memberstack";
import { User } from "../utils/user";

// Entry 
// https://surgeonslounge.webflow.io/deck?dentoalveolar=on&focused-additional-short-topics-fast=on&implants=on  


export class FlashcardDeckPage implements IModule {

  deck!: FlashcardDeckComponent; 
  user!: User; 

  constructor() {

  }

  setup() {
        
  }

  async exec() {

    console.log("Flashcard Deck")

    // Get User info (pause) 
    this.user = await User.create();


//    const member = await this.memberstack.getCurrentMember();

    if (this.user.loggedIn) {
        console.log("User is logged in:", this.user.user);

        // Access data 
        console.log(this.user.user.userName); 
        console.log(this.user.user.avatarURL);

    } else {

      console.log("No user is logged in");

      // TODO: redirect? 

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
