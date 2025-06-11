
/**
 * on Collection List [app-data=X] 
 * in Collection Item add <script type="data-item" data-key=(slug)> {  }
 */


export class DataItem {
    key: string;
    data: any;

    constructor(key: string, data: any) {
        this.key = key;
        this.data = data;
    }
}

export class Data {

    private items: DataItem[] = [];
    private itemMap: Map<string, DataItem> = new Map();
    private appDataName: string; 

    constructor(appDataName: string) {
        this.appDataName = appDataName; 

        this.init(); 
    }

    init(): void { 

        const container = document.querySelector(`[data\\:group="${this.appDataName}"]`);
        if (!container) {
            console.warn(`Data container not found: [data\\:group="${this.appDataName}"]`);
            return;
        }

        const scripts = container.querySelectorAll<HTMLScriptElement>('script[type="data"]');

        scripts.forEach(script => {
            const key = script.getAttribute(`data:key`);
            if (!key) {
                console.warn('Missing data:key attribute on script element');
                return;
            }

            try {
                const parsed = JSON.parse(script.textContent || '{}');
                const item = new DataItem(key, parsed);

                this.items.push(item);
                this.itemMap.set(key, item);
            } catch (e) {
                console.error(`Failed to parse JSON for key: ${key}`, e);
            }
        });
    }

    getByKey(key: string): any | undefined {
        return this.itemMap.get(key)?.data;
    }

    // forEach(callback: (item: DataItem) => void): void {
    //     this.items.forEach(callback);
    // }

    forEach(callback: (key: string, data: any, item: DataItem) => void): void {
        this.items.forEach(item => {
            callback(item.key, item.data, item);
        });
    }

    getAll(): DataItem[] {
        return this.items;
    }

}


