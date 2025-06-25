

export class Sa5Switch {
  private elem: HTMLElement;
  private cases: HTMLElement[] = [];
  private defaultCases: HTMLElement[] = [];
  private currentValue: string | null = null;

  constructor(elem: HTMLElement) {
    this.elem = elem;

    // Gather all cases
    this.cases = Array.from(elem.querySelectorAll<HTMLElement>('[wfu-switch-case]'));

    // Identify defaults (any truthy value for wfu-switch-default)
    this.defaultCases = this.cases.filter(el =>
      el.hasAttribute('wfu-switch-default') &&
      !['', 'false', '0', 'no', 'off'].includes(
        el.getAttribute('wfu-switch-default')?.trim().toLowerCase() ?? ''
      ) 
    );

    // Initially hide all cases
    this.cases.forEach(el => el.style.display = 'none');

    // Show defaults if any
    this.defaultCases.forEach(el => el.style.display = '');
  }

  public set value(val: string) {
    this.currentValue = val;

console.log("setting value", val)

    // Hide all
    this.cases.forEach(el => el.style.display = 'none');

    // Show matches
    const matched = this.cases.filter(el =>
      el.getAttribute('wfu-switch-case') === val
    );

    if (matched.length > 0) {
      matched.forEach(el => el.style.display = '');
    } else {
      this.defaultCases.forEach(el => el.style.display = '');
    }
  }

  public get value(): string | null {
    return this.currentValue;
  }

  // Static utility: init all on page
  public static initAll(): Sa5Switch[] {
    const switches = Array.from(document.querySelectorAll<HTMLElement>('[wfu-switch]'));
    return switches.map(el => new Sa5Switch(el));
  }
}
