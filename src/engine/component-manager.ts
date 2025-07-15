import { SubmitButtonComponent } from "../components/submitbutton";
import { TestComponent } from "../components/test";

export class ComponentManager {

    private components: Map<string, any[]> = new Map();
  
    // Method to register a component with a type
    registerComponent(type: string, component: any): void {
      if (!this.components.has(type)) {
        this.components.set(type, []);
      }
      this.components.get(type)?.push(component);
    }
  
    // Method to retrieve all components of a specific type
    getComponentsByType<T>(type: string): T[] {
      return this.components.get(type) || [];
    }

    getComponentByFullname(name: string): any {
      return this.components.get(name);  
    }

    initComponent(elem: HTMLElement) {

        // Get the value of the SSE-component attribute
        const componentType = elem.getAttribute('sse-component');
        const componentNamespace = elem.getAttribute('sse-component-ns');
        const componentName = elem.getAttribute('sse-component-name');
        const componentFullName = componentNamespace
          ? `${componentNamespace}.${componentName}`
          : componentName;

        let component: any = null;

        if (componentType) {
            // Run a switch statement based on the attribute value
            switch (componentType) {
                case 'test':
 
                    component = new TestComponent(elem);
//                    (new TestComponent(elem)).exec();

                case 'submitbutton':

                    component = new SubmitButtonComponent(elem);

                    // window.componentManager.registerComponent("a", component); 
                    // component.exec();

                    break;
                case 'flashcard':
 
//                    (new FlashcardComponent(element)).exec();

                    break;
                case 'deck':
 
//                    (new FlashcardDeckComponent(element)).exec();

                    break;
                default:
                    console.log('Unknown component:', componentType);
                    break;
            } 

            if(component) {

              component.exec();

              if(componentFullName) {
                window.componentManager.registerComponent(componentFullName, component); 
              } 

            }

        }

    }

}
  