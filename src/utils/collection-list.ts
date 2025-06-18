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

    // Items wrapper and items
    this.itemsWrapper = listElem.querySelector('.w-dyn-items');
    if (this.itemsWrapper) {
      this.items = Array.from(this.itemsWrapper.querySelectorAll('.w-dyn-item'));
    }

    // Pagination
    this.paginationWrapper = listElem.querySelector('.w-pagination-wrapper');
    if (this.paginationWrapper) {
      const nextLink = this.paginationWrapper.querySelector('.w-pagination-next') as HTMLAnchorElement;
      const prevLink = this.paginationWrapper.querySelector('.w-pagination-previous') as HTMLAnchorElement;

      this.nextPageUrl = nextLink?.href ?? null;
      this.prevPageUrl = prevLink?.href ?? null;

      // Extract pagination ID from querystring keys
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

      // Page count
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
}
