export class Singleton {
  // eslint-disable-next-line no-use-before-define
  private static instance: Singleton;

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
