export class UpperCaseTransformer {
  to(entityValue: string): string {
    return entityValue?.trim().toUpperCase();
  }
  from(databaseValue: string): string {
    return databaseValue;
  }
}
