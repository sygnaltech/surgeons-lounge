export class WebflowCollectionList {
  listElem: HTMLElement;
  itemsWrapper: HTMLElement | null = null;
  items: HTMLElement[] = [];
  paginationWrapper: HTMLElement | null = null;
  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;
  paginationId: string | null = null;
  pageNum: number | null = null;
  totalPages: number | null = null;

  constructor(listElem: HTMLElement) {
    this.listElem = listElem;

    this.itemsWrapper = listElem.querySelector('.w-dyn-items');
    if (this.itemsWrapper) {
      this.items = Array.from(this.itemsWrapper.querySelectorAll('.w-dyn-item'));
    }

    this.paginationWrapper = listElem.querySelector('.w-pagination-wrapper');
    if (this.paginationWrapper) {
      const nextLink = this.paginationWrapper.querySelector('.w-pagination-next') as HTMLAnchorElement;
      const prevLink = this.paginationWrapper.querySelector('.w-pagination-previous') as HTMLAnchorElement;

      this.nextPageUrl = nextLink?.href ?? null;
      this.prevPageUrl = prevLink?.href ?? null;

      const refUrl = this.nextPageUrl || this.prevPageUrl;
      if (refUrl && refUrl.includes('?')) {
        const qs = refUrl.split('?')[1];
        const params = new URLSearchParams(qs);
        params.forEach((_, key) => {
          const match = key.match(/^(.+?)_/);
          if (match && !this.paginationId) {
            this.paginationId = match[1];
          }
        });
      }

      const countElem = this.paginationWrapper.querySelector('.w-page-count');
      if (countElem) {
        const match = countElem.textContent?.trim().match(/^(\d+)\s*\/\s*(\d+)$/);
        if (match) {
          this.pageNum = parseInt(match[1], 10);
          this.totalPages = parseInt(match[2], 10);
        }
      }
    }

    this.logDebug();
  }

  logDebug() {
    console.log('List Element:', this.listElem);
    console.log('Items Wrapper:', this.itemsWrapper);
    console.log('Items:', this.items);
    console.log('Pagination Wrapper:', this.paginationWrapper);
    console.log('Next Page URL:', this.nextPageUrl);
    console.log('Prev Page URL:', this.prevPageUrl);
    console.log('Pagination ID:', this.paginationId);
    console.log('Current Page:', this.pageNum);
    console.log('Total Pages:', this.totalPages);
  }

  static initAll() {
    const lists = document.querySelectorAll<HTMLElement>('.w-dyn-list');
    return Array.from(lists).map(el => new WebflowCollectionList(el));
  }

  async depaginate(batchLimit: number = Infinity) {
    if (!this.paginationId || !this.itemsWrapper || !this.totalPages) {
      console.warn('Depagination not possible: missing pagination ID, items wrapper, or totalPages');
      return;
    }

    const baseUrl = location.pathname;
    const urls: string[] = [];

    for (let i = 2; i <= this.totalPages && urls.length < batchLimit; i++) {
      const qs = `${this.paginationId}_page=${i}`;
      urls.push(`${baseUrl}?${qs}`);
    }

    for (const url of urls) {
      try {
        const res = await fetch(url);
        const html = await res.text();
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // Find matching list by same paginationId
        const matchingList = temp.querySelector(`.w-pagination-next[href*="${this.paginationId}_page"]`)?.closest('.w-dyn-list');
        const newItemsWrapper = matchingList?.querySelector('.w-dyn-items');

        if (matchingList && newItemsWrapper) {
          const newItems = Array.from(newItemsWrapper.querySelectorAll('.w-dyn-item'));
          newItems.forEach(item => this.itemsWrapper!.appendChild(item));
          console.log(`Appended ${newItems.length} items from ${url}`);
        } else {
          console.warn(`No matching list found on ${url}`);
        }
      } catch (err) {
        console.error(`Failed to fetch ${url}`, err);
      }
    }

    // Optionally hide pagination
    this.paginationWrapper?.remove();
  }
}
