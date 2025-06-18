
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

    WebflowCollectionList.initAll(); 

  }

}
