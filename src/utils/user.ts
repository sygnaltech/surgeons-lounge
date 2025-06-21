import { MemberStack } from "./memberstack";






export class User {

    memberstack: MemberStack; 
    _user: any;
    data: any = {}; 

    get user(): any {
        return this._user; 
    }

    get loggedIn(): boolean {

        if(!this.user)
            return false; 

        // https://docs.memberstack.com/hc/en-us/articles/8517501248539-Check-if-a-Member-is-Logged-in-or-Logged-out 
        if(!this.user.data)
            return false; 

        return true;

//        return !!this._user;
    }

    private constructor(memberstack: MemberStack, user: any) {
        this.memberstack = memberstack;
        this._user = user;
    }

    static async create(): Promise<User> {
        const memberstack = new MemberStack();
        const user = await memberstack.getCurrentMember();
        return new User(memberstack, user);
    }


    async loadData() {

        this.data = await this.memberstack.getMemberJSON(); 

    }

    async saveData() {

//        await this.memberstack.updateMemberJSON({json: data});
        await this.memberstack.updateMemberJSON(this.data);

    }

    async clearData() {

console.log(this.data)

        this.data = {};
        await this.saveData(); 

        console.log(this.data)
        
        console.log(
            '%cUSER DATA CLEARED',
            'color: red; background: yellow; font-weight: bold; font-size: 16px; padding: 2px 6px;'
        );

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

