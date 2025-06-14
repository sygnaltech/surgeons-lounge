
/*
 * Page | Test 
 */

import { IModule } from "@sygnal/sse";
import { User } from "../utils/user";
 

export class TestPage implements IModule {

  user!: User; 

  constructor() {
  }

  setup() {
        
  }

  async exec() { 

    this.user = await User.create();

    if (this.user.loggedIn) { 

      // Get member JSON 
      await this.user.loadData(); 

      console.log("memberJson", JSON.stringify(this.user.data, null, 2)); 

    } else {
        console.error("No User logged in:");
    }

    document.getElementById('clear')?.addEventListener('click', () => {
      console.log('Clear clicked');

      this.user.clearData();

    });

    document.getElementById('button-1')?.addEventListener('click', () => {
      console.log('Button 1 clicked');

      this.user.data = {abc: "def", ghi: "jkl"};
      this.user.saveData(); 

    });

    document.getElementById('button-2')?.addEventListener('click', () => {
      console.log('Button 2 clicked');
    });

  }

}
