
/*
 * Component | Flashcard Desk 
 * 
 */


import { IModule } from "@sygnal/sse";
import { HtmlUtils } from "../utils/html";
import { FlashcardComponent } from "./flashcard";
import { User } from "../utils/user";
// import { MemberStack } from "../utils/memberstack";


// import memberstackDOM from "@memberstack/dom";


// const memberstack = memberstackDOM.init(
//   {
//     publicKey: "pk_4c3139f988f49cf84e09", // "app_clv5nzj1400cy0sw1629ihb5o",
//     useCookies: true  
//   }
// ); 






// Get config from querystring 
// TODO: reconsider how to make this non-constant   
// export const FlashcardTopics = [
//   "adult-medicine-anesthesia",
//   "dentoalveolar",
//   "emergency-management",
//   "focused-additional-short-topics-fast",
//   "implants",
//   "infection",
//   "orthognathic",
//   "pathology",
//   "pediatric-medicine-anesthesia",
//   "reconstruction",
//   "tmj",
//   "trauma"
// ];




class DeckConfig {
  low: boolean = true;
  medium: boolean = true;
  high: boolean = true;
  type: "all" | "uncompleted" = "all";
  topics: string[] = []; 

  constructor() {
    this.reset();
  }

  private parseBoolean(value: string | null): boolean {
    if (!value) return false;
    const val = value.toLowerCase();
    return !(val === "false" || val === "0" || val === "no" || val === "off");
  }

  reset() {
    this.low = true;
    this.medium = true;
    this.high = true;
    this.type = "all"; 
  }

  loadFromQueryString() {
    const params = new URLSearchParams(window.location.search);

    const low = params.get("low");
    if (low !== null) this.low = this.parseBoolean(low);

    const medium = params.get("medium");
    if (medium !== null) this.medium = this.parseBoolean(medium);

    const high = params.get("high");
    if (high !== null) this.high = this.parseBoolean(high);

    params.delete("low"); 
    params.delete("medium"); 
    params.delete("high"); 

    const typeParam = params.get("type");
    if (typeParam === "all" || typeParam === "uncompleted") {
      this.type = typeParam;
    }

    params.delete("type"); 


//     // Check each topic
//     FlashcardTopics.forEach(topic => {
//       if (params.get(topic) === "on") {
// //        console.log(`Enabled: ${topic}`);   
//         this.addTopic(topic); 
//       }
//     });

    params.forEach((value, key) => {
      if (value === "on") {
  //      this.addTopic(key);
        this.topics.push(key);
      }
    });


  }


  getTopics(): string[] {
    return [...this.topics];
  }


}




    // // Parse query params from current URL
    // const params = new URLSearchParams(window.location.search);













type StatUpdateHandler = (name: string, value: string) => void; 

interface DeckConfig {
  low: boolean;
  medium: boolean;
  high: boolean;
  type: "all" | "uncompleted";
}


export class FlashcardDeckComponent implements IModule {
  private statHandler?: StatUpdateHandler; 

  user!: User; 
//  memberstack: MemberStack = new MemberStack(); 

  config: DeckConfig;

  elem: HTMLElement;
  elemCardsWrap: HTMLElement; 
  elemLoadingMessage: HTMLElement; 

  cards: FlashcardComponent[] = []; 

  completedCardNum: number = 0;

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

  constructor(elem: HTMLElement, statHandler?: StatUpdateHandler) {
    this.elem = elem; 

    if(!this.elem) {
      console.error("Unable to create component from a null element."); 
    }

    this.elemCardsWrap = elem.querySelector("[component-part='cards']")!; 
    this.elemLoadingMessage = elem.querySelector("[component-part='loading-message']")!; 
    if(!this.elemCardsWrap) {
      console.error("Cards sub-component not found."); 
    }
    if(!this.elemLoadingMessage) {
      console.error("Loading message sub-component not found."); 
    }

    this.statHandler = statHandler;

    this.config = new DeckConfig(); 
    this.config.loadFromQueryString(); 

    console.log("saving stat handler", statHandler)
  }

  setup() {
        
  }
  
  // member: any; 
  // memberJson: any;  

  async exec() {



    console.log("Flashcard Deck")


    /**
     * Retrieve User Data 
     */

    this.user = await User.create();

//    this.member = await this.memberstack.getCurrentMember();

    if (this.user.loggedIn) { 

      // Get member JSON 
      await this.user.loadData(); 


//      this.memberJson = await this.memberstack.getMemberJSON(); 
      console.log("memberJson", JSON.stringify(this.user.data, null, 2)); 

    } else {
        console.error("No User logged in:");
    }



    // Access data 
    // console.log(json.userName); 
    // console.log(json.avatarURL);

    // console.log(json); 

//    json = null;

// this.user.data = {};
// this.user.saveData();
// json = { 
//   test: "foo",
//   cards: {
//     "123": "medium",
//     "458": "easy",
//   }
// }






    const sa5: any = window['sa5' as any];

    // Clean dynlist DIVs 
    const nodesToUnwrap = this.elemCardsWrap.querySelectorAll<HTMLElement>(
      'div.w-dyn-item, div.w-dyn-items, div.w-dyn-list'
    );

    nodesToUnwrap.forEach(node => HtmlUtils.unwrap(node));




    // this.config = new DeckConfig(); 
    // this.config.loadFromQueryString(); 


//     // Parse query params from current URL
//     const params = new URLSearchParams(window.location.search);


// params.delete("type"); 

// params.delete("low"); 
// params.delete("medium"); 
// params.delete("high"); 

// type=all&low=on&medium=on&high=on



//     // Check each topic
//     FlashcardTopics.forEach(topic => {
//       if (params.get(topic) === "on") {
// //        console.log(`Enabled: ${topic}`);   
//         this.addTopic(topic); 
//       }
//     });





//    this.initDeck(); 

    // Random sort 
    HtmlUtils.randomSort(this.elemCardsWrap);


  // this.user.data = {};
  // this.user.saveData();

    // Iterate through the children of this.elem
    // Remove elements whose [app-card-category] is not in this.topics
    const children = Array.from(this.elemCardsWrap.children) as HTMLElement[];

    console.log("STARTING CARDS", this.elemCardsWrap.children.length); 

    children.forEach(child => {

// console.log(child)

      const card = new FlashcardComponent(child);

      console.log("CARD", card.id, card.category)

      // Check category 
      const category = card.category; // child.getAttribute("app-card-category");
      
      if(!category) {
        console.error("  Card does not have app-card-category"); 
        child.remove(); // remove if not matching
        return;
      }
      if (!this.config.topics.includes(category)) {
        console.log("  removing (category mismatch)")
        child.remove(); // remove if not matching
        return;
      }


      // Check type all or uncompleted 
      switch(this.config.type) {
        case "all":

          // do nothing 

          break;
        case "uncompleted":

          // Check to see if a freq was previously assigned 
          const freq = this.user?.data?.cards?.[card.id]?.f;
          if(freq) {
            console.log("  Removing card completed before, freq", freq)
            child.remove(); 
            return; 
          } 

          break;
      }


      // Check timestamp 
      const d = this.user?.data?.cards?.[card.id]?.d;

      if (typeof d === 'number') {
        const now = Date.now(); // current timestamp in ms
        let diffMs = d - now;   // future time

        if (diffMs < 0) {
//          console.log("HISTORY", card.id, "Time has passed");
        } else {
          const minutes = Math.floor(diffMs / 60000) % 60;
          const hours = Math.floor(diffMs / 3600000) % 24;
          const days = Math.floor(diffMs / 86400000);

          const parts = [];
          if (days) parts.push(`${days}d`);
          if (hours) parts.push(`${hours}h`);
          if (minutes || (!days && !hours)) parts.push(`${minutes}m`);

      //    console.log("HISTORY", card.id, parts.join(' '));

          if(d > now) {
              console.log("  removing, not ready for", parts.join(' '))
              child.remove(); // remove if not matching
              return;
          }

        }
      } else {
//        console.log("HISTORY", card.id, "Invalid or missing timestamp");
      }


      console.log("  KEEP"); 


      // if (category && this.topics.includes(category)) {
      //   const card = new FlashcardComponent(child);
        
      //   this.cards.push(card);

      //   card.exec(); // init 
      // } else {
      //   child.remove(); // remove if not matching
      // }

      // Add card 
      this.cards.push(card);
      card.exec(); // init 




      

    });


    console.log("FINISHING CARDS", this.elem.children.length); 


    this.updateStat("total", this.cards.length.toString()); 
    this.updateStat("remain", (this.cards.length - this.cardNum + 1).toString()); 


    // Show 1st card 
    console.log("Showing first card.")
    this.showCard(1); 


    /**
     * Init event listeners 
     */

    this.elem.addEventListener("flashcard:answer", async (e: Event) => {
      const customEvent = e as CustomEvent<{ card: FlashcardComponent, freq: string }>;
      const card = customEvent.detail.card;


      console.log("Card answer:", card, customEvent.detail.freq);

      // update count complete 
      if(this.completedCardNum < this.cardNum)
        this.completedCardNum = this.cardNum; 

      let date: Date = new Date(); // current time
      let freq: string = "h"; 

      switch (customEvent.detail.freq) {
        case "low":
          freq = "l"; 
          date.setHours(date.getHours() + 24); // add 1 day
          break;

        case "medium":
          freq = "m"; 
          date.setHours(date.getHours() + 12); // add 12 hours
          break;

        case "high":
          freq = "h"; 
          // no change
          break;
      }

      // save freq and timestamp
      // Ensure the structure exists

  //     this.memberJson.data ??= {};
  // this.memberJson.data.z = date.toISOString(); 

      console.log("PRE-SAVE", JSON.stringify(this.user.data));

      this.user.data.v = 1; // version 1
      this.user.data.cards ??= {};
      this.user.data.cards[card.id] ??= {};

      this.user.data.cards[card.id].f = freq;
      this.user.data.cards[card.id].d = date.getTime(); // .toISOString(); // or just `date` if you're storing as Date 

  // Or switch to 
  // {
  //   "c": {
  //     "a": ["h", 1749112800000],
  //     "b": ["m", 1749050000000]
  //   }
  // }

      console.log("Saving", JSON.stringify(this.user.data)); 


      
      // Save data 
//      await 
//      this.user.data = this.user.
      await this.user.saveData();

      this.updateStat("total", this.cards.length.toString()); 
      this.updateStat("remain", (this.cards.length - this.cardNum + 1).toString()); 

      // flip to front 
      card.isFront = true; 

      // advance
      this.onCardNext(card); 

    });

    this.elem.addEventListener("flashcard:settings", (e: Event) => {
      const customEvent = e as CustomEvent<{ card: FlashcardComponent }>;
      const card = customEvent.detail.card;
      
      window.location.href = "/flashcards"; // Manually navigate


      console.log("Card settings:", card);
      this.onCardPrev(card);
    });

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


    /**
     * Activate UI 
     */

    console.log("Done, activating UI.")

    // Hide message
    // [app-message="loading"] 
    this.elemLoadingMessage.style.display = 'none'; 

    // Show desk
    // [component-part="cards"] 
    this.elemCardsWrap.style.display = 'block';

  }

  updateStat(name: string, value: string) {

    console.log("updating stat", name, value, this.statHandler)

    this.statHandler?.(name, value);
  }

  private onCardPrev(card: FlashcardComponent) {
    // Deck-level logic goes here
    this.cardNum--; 
  }


  private onCardNext(card: FlashcardComponent) {

    console.log("NEXT CARD", this.cardNum, this.count);  

    // Are we at the last card?
    if (this.cardNum >= this.count) {
      window.location.href = "/flashcards"; 
      alert("Done!\nReturn to the settings screen to review stats\nand choose new settings."); 
    }

    // Advance to the next card 
    this.cardNum++; 
  }


  showCard(num: number) {


    this.cards.forEach(card => {

      // Hide it 
      card.elem.style.display = "none";
        
    });

    if(!this.cards[num - 1]) {
      console.error("Unable to show card", num, "does not exist");
      return;
    }

    this.cards[num - 1].elem.style.display = "block"; 

  }

}
