export interface AdminLevelObject {
  readonly level: number;
  readonly name: string;
  readonly code?: string;
}

// eslint-disable-next-line no-shadow
export enum ADMIN_LEVEL_CODES {
  STATE_CODE = 1,
  COUNTY_CODE = 2,
}

export default class AdminLevel {
  private readonly level: number;

  private readonly name: string;

  private readonly code?: string;

  private constructor({ level, name, code }: AdminLevelObject) {
    this.level = level;
    this.name = name;
    this.code = code;
  }

  public static create(object: AdminLevelObject): AdminLevel {
    return new this(object);
  }

  public toObject(): AdminLevelObject {
    return {
      level: this.level,
      name: this.name,
      code: this.code,
    };
  }

  public getLevel(): number {
    return this.level;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): undefined | string {
    return this.code;
  }
}
