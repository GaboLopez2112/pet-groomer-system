export class LowerCaseTransformer {
  to(entityValue: string): string {
    return entityValue?.trim().toLowerCase();
  }
  from(databaseValue: string): string {
    return databaseValue;
  }
}
