interface SStyleStringifyable {
  /**
   * Stringifies the imported stylesheet for use with inline style tags
   */
  toString(): string;
}

interface SStyleSelectorNode {
  /**
   * Returns the specific selector from imported stylesheet as string
   */
  [key: string]: string;
}

interface SStyleUseable {
  locals: SStyleSelectorNode;

  use();
  unuse();
  ref();
  unref();
}

declare module '*.less' {
  const styles: SStyleStringifyable & SStyleUseable;
  export default styles;
}
