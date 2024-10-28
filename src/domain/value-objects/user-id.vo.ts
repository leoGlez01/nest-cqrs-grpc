export class UserId {
  constructor(public readonly id: string) {
    if (!id) {
      throw new Error('Id is required');
    }
  }

  static create(id: string): UserId {
    return new UserId(id);
  }
}
