export class Display {

    constructor() { }

    show(groupName: string = "", fieldName: string, value: any): void {
        let selector = "";

        if (groupName) {
            selector = `[display\\:group="${groupName}"][display\\:field="${fieldName}"]`;
        } else {
            selector = `:not([display\\:group])[display\\:field="${fieldName}"]`;
        }

        const elements = document.querySelectorAll<HTMLElement>(selector);
        elements.forEach(element => {
            element.innerText = value;
        });
    }

    forEach(groupName: string = "", fieldName: string, callback: (element: HTMLElement) => void): void {
        let selector = "";

        if (groupName) {
            selector = `[display\\:group="${groupName}"][display\\:field="${fieldName}"]`;
        } else {
            selector = `:not([display\\:group])[display\\:field="${fieldName}"]`;
        }

        const elements = document.querySelectorAll<HTMLElement>(selector);
        elements.forEach(element => {
            callback(element);
        });
    }

}
