
/*
 * Component | Flashcard Desk 
 * 
 */


import { IModule } from "@sygnal/sse";
import { HtmlUtils } from "../utils/html";
import { FlashcardComponent } from "./flashcard";


import memberstackDOM from "@memberstack/dom";


const memberstack = memberstackDOM.init(
  {
    publicKey: "pk_4c3139f988f49cf84e09", // "app_clv5nzj1400cy0sw1629ihb5o",
    useCookies: true  
  }
); 






// Get config from querystring 
// TODO: reconsider how to make this non-constant   
export const FlashcardTopics = [
  "adult-medicine-anesthesia",
  "dentoalveolar",
  "emergency-management",
  "focused-additional-short-topics-fast",
  "implants",
  "infection",
  "orthognathic",
  "pathology",
  "pediatric-medicine-anesthesia",
  "reconstruction",
  "tmj",
  "trauma"
];

export class FlashcardDeckComponent implements IModule {

  elem: HTMLElement;
  private topics: string[] = [];

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

  constructor(elem: HTMLElement) {
    this.elem = elem; 

  }

  setup() {
        
  }
  
  member: any; 
  memberJson: any;  

  async exec() {



    console.log("Flashcard Deck")

    this.member = await memberstack.getCurrentMember();

    if (this.member) { 

      // Get member JSON 
      this.memberJson = await memberstack.getMemberJSON(); 
      console.log("memberJson", this.memberJson); 

    } else {
        console.error("No User logged in:");
    }



    // Access data 
    // console.log(json.userName); 
    // console.log(json.avatarURL);

    // console.log(json); 

//    json = null;

// json = { 
//   test: "foo",
//   cards: {
//     "123": "medium",
//     "458": "easy",
//   }
// }




    const sa5: any = window['sa5' as any];

    // Clean dynlist DIVs 
    const nodesToUnwrap = this.elem.querySelectorAll<HTMLElement>(
      'div.w-dyn-item, div.w-dyn-items, div.w-dyn-list'
    );

    nodesToUnwrap.forEach(node => HtmlUtils.unwrap(node));



    // Parse query params from current URL
    const params = new URLSearchParams(window.location.search);

    // Check each topic
    FlashcardTopics.forEach(topic => {
      if (params.get(topic) === "on") {
//        console.log(`Enabled: ${topic}`);
        this.addTopic(topic); 
      }
    });

//    this.initDeck(); 

    // Random sort 
    HtmlUtils.randomSort(this.elem);




    // Iterate through the children of this.elem
    // Remove elements whose [app-card-category] is not in this.topics
    const children = Array.from(this.elem.children) as HTMLElement[];

    children.forEach(child => {
      const category = child.getAttribute("app-card-category");

      if (category && this.topics.includes(category)) {
        const card = new FlashcardComponent(child);
        
        this.cards.push(card);

        card.exec(); // init 
      } else {
        child.remove(); // remove if not matching
      }
    });


    // Show 1st card 
    this.showCard(1); 


    /**
     * Init event listeners 
     */

  this.elem.addEventListener("flashcard:answer", async (e: Event) => {
    const customEvent = e as CustomEvent<{ card: FlashcardComponent, freq: string }>;
    const card = customEvent.detail.card;
    const freq = customEvent.detail.freq; 
    
    console.log("Card answer:", card, freq);

    // update count complete 
    if(this.completedCardNum < this.cardNum)
      this.completedCardNum = this.cardNum; 

    let date: Date = new Date(); // current time

    switch (freq) {
      case "low":
        date.setHours(date.getHours() + 24); // add 1 day
        break;

      case "medium":
        date.setHours(date.getHours() + 12); // add 12 hours
        break;

      case "high":
        // no change
        break;
    }

    // save freq and timestamp
    // Ensure the structure exists

//     this.memberJson.data ??= {};
// this.memberJson.data.z = date.toISOString(); 

    this.memberJson.cards ??= {};
    this.memberJson.cards[card.id] ??= {};

    this.memberJson.cards[card.id].freq = freq;
    this.memberJson.cards[card.id].date = date.toISOString(); // or just `date` if you're storing as Date

console.log("Saving", this.memberJson); 

    await memberstack.updateMemberJSON({json: this.memberJson});

    // flip to front 
    card.isFront = true; 

    // advance
    this.onCardNext(card); 

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



  }


private onCardPrev(card: FlashcardComponent) {
  // Deck-level logic goes here
  this.cardNum--; 
}


private onCardNext(card: FlashcardComponent) {
  // Deck-level logic goes here
  this.cardNum++; 
}


  showCard(num: number) {


    this.cards.forEach(card => {

      // Hide it 
      card.elem.style.display = "none";
        
    });

    this.cards[num - 1].elem.style.display = "block"; 

  }

  addTopic(topic: string) {
    if (FlashcardTopics.includes(topic) && !this.topics.includes(topic)) {
      this.topics.push(topic);
      console.log(`Topic added: ${topic}`);
    }
  }

  getTopics(): string[] {
    return [...this.topics];
  }

}
