export class HtmlUtils {

  static unwrap(element: HTMLElement): void {
    const parent = element.parentElement;
    if (!parent) return;

    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }

    parent.removeChild(element);
  }


  static randomSort(container: HTMLElement): void {
    const children = Array.from(container.children);
    const shuffled = children
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    shuffled.forEach(child => container.appendChild(child));
  }


}
