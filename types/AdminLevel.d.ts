export interface AdminLevelObject {
    readonly level: number;
    readonly name: string;
    readonly code?: string;
}
export default class AdminLevel {
    private readonly level;
    private readonly name;
    private readonly code?;
    private constructor();
    static create(object: AdminLevelObject): AdminLevel;
    toObject(): AdminLevelObject;
    getLevel(): number;
    getName(): string;
    getCode(): undefined | string;
}
//# sourceMappingURL=AdminLevel.d.ts.map