/*
 * SITE
 * Main entry point
 * 
 * https://engine.sygnal.com/
 * 
 * ENGINE MODE
 * ?engine.mode=dev
 * ?engine.mode=prod
 * 
 */

import { HomePage } from "./pages/home";
import { RouteDispatcher } from "@sygnal/sse";
import { Site } from "./site";
import { FlashcardPage } from "./pages/flashcard-setup";
import { FlashcardDeckPage } from "./pages/flashcard-deck";
import { TestPage } from "./pages/test";
import { DataPage } from "./pages/data";

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher(Site);
    routeDispatcher.routes = {

        // Site paes
        '/': HomePage,
        '/flashcards': FlashcardPage,
        '/deck': FlashcardDeckPage,
        '/deck2': FlashcardDeckPage,

        // TEST Pages
        '/test': TestPage,
        '/data': DataPage,

    };

    return routeDispatcher;
}

