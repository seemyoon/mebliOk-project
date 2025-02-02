export class TransformHelper {
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase() : value;
  }

  public static toTrim({ value }: { value: string }): string {
    return value ? value.toString().trim() : value;
  }
}