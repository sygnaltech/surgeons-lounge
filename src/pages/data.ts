
/*
 * Page | Data 
 */

import { IModule } from "@sygnal/sse";
import { User } from "../utils/user";
import { WebflowCollectionList } from "../utils/collection-list";
 

export class DataPage implements IModule {

  constructor() {
  }

  setup() {
        
  }

  async exec() { 

    const lists = WebflowCollectionList.initAll();
    lists[0].depaginate(); // or .depaginate(5) to limit to 5 pages

  }

}
