
/*
 * Site
 */

import { IModule, Page } from "@sygnal/sse";
// import memberstackDOM from "@memberstack/dom"; 


// import gsap from 'gsap'; 
 

export class Site implements IModule {

//  memberstack: 
    // memberstack = memberstackDOM.init(
    //   {
    //     publicKey: "app_clv5nzj1400cy0sw1629ihb5o",
    //     useCookies: true  
    //   }
    // );

  constructor() {
  }

  /**
   * Setup code runs synchronously, inline, at the end of the </head>. 
   * It's used for special init tasks that must be performed early, and which do not require
   * the DOM to be loaded. 
   */
  setup() {

    Page.loadEngineCSS("site.css"); 
   
  }

  /**
   * Exec code runs after the DOM has processed. 
   */
  exec() {

    console.log("setup Memberstack v2")



    // Put your site-level custom code here
    // it will have full access to the DOM 

  }

}
