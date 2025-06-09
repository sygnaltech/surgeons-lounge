
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

    /**
     * Install Deck Settings button 
     */

    const btn = document.getElementById('deck-settings');
    btn?.addEventListener('click', (e) => {
      e.preventDefault(); // Stop the default navigation

      if (confirm('Leaving this view will restart your deck, are you sure?')) {
        const href = (btn as HTMLAnchorElement).href;
        window.location.href = href; // Manually navigate
      }
    });


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

//    this.deck = new FlashcardDeckComponent(element);
    this.deck = new FlashcardDeckComponent(element, (name, value) => {
      this.setStats(name, value);
    });
    this.deck.exec(); 

    // this.setStats("total", "20");
    // this.setStats("remain", "40"); 

  }

  setStats(name: string, value: string) {

console.log("UPDATING STAT", name, value) 

    // find text element with [app-stat=(name)] 
    // set innerText to value 
    document.querySelectorAll(`[app-stat="${name}"]`).forEach(elem => {
      elem.textContent = value;
    });
  }

}
