

/**
 * Memberstack interface. 
 * 
 */

import memberstackDOM from "@memberstack/dom";


// const memberstack = memberstackDOM.init(
//   {
//     publicKey: "pk_4c3139f988f49cf84e09",
//     useCookies: true  
//   }
// ); 



export class MemberStack {

    memberstack: any; 

    constructor() {

        this.memberstack = memberstackDOM.init(
            {
                publicKey: "pk_4c3139f988f49cf84e09",
                useCookies: true  
            }
        );         

    }

    async getCurrentMember(): Promise<any> {

        return this.memberstack.getCurrentMember();  

    }

    async getMemberJSON(): Promise<any> {

//        return this.memberstack.getMemberJSON(); 
        const result = await this.memberstack.getMemberJSON();
        return result?.data;
    }

    async updateMemberJSON(data: any) {

//        this.memberstack.updateMemberJSON({json: data});
        this.memberstack.updateMemberJSON({json: data});


    }





}


// npm install pako

// // Compress 

// import pako from "pako";

// // Original JSON object
// const original = {
//   cards: {
//     a: { f: "h", d: 1749112800000 },
//     b: { f: "m", d: 1749050000000 }
//   }
// };

// // Step 1: Minify the JSON
// const json = JSON.stringify(original);

// // Step 2: Compress
// const compressed = pako.deflate(json);

// // Step 3: Encode as base64
// const base64 = Buffer.from(compressed).toString("base64");

// // Save this base64 string in your JSON storage
// const final = JSON.stringify({ compressed: base64 });




// // Decompress

// const decoded = Buffer.from(base64, "base64");
// const decompressed = pako.inflate(decoded, { to: "string" });
// const restored = JSON.parse(decompressed);


// Pako

// 🔧 What is pako?
// A pure JavaScript implementation of the zlib/gzip/deflate compression formats.

// It’s a drop-in alternative to zlib, but runs entirely in the browser or Node.js.

// It supports compression and decompression, with very good performance.

// Works in all modern browsers	✅
// Small bundle size (~55 KB minified)	✅
// No dependencies	✅
// Fast (uses typed arrays and optimizations)	✅
// Runs in Web Workers (if needed)	✅
// Suitable for large JSON (100KB–5MB+)	✅

// ✅ Yes, pako is efficient and well-suited for client-side use

// 🔧 Works great for compressing/decompressing structured JSON

// 🛠 Can be paired with btoa/atob or Buffer (Node.js)

// 🚀 For large payloads, offload to Web Workers if responsiveness matters

