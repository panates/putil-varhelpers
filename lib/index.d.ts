declare module "putil-varhelpers" {

    export function coalesce(...args: any[]): any;

    export function coerceToArray<T = any>(v: any, defaultValue?: any[]): T[];

    export function coerceToString(v: any, defaultValue?: string): string;

    export function coerceToBoolean(v: any, defaultValue?: boolean): boolean;

    export function coerceToNumber(v: any, defaultValue?: number): number;

    export function coerceToInt(v: any, defaultValue?: number): number;

    export function camelize(v: string, upperCaseFirst?: boolean): string;

    export function upperFirst(v: string): string;

    export function mapDistinct<T = any>(a: T[], coercer?: (v: any) => T): T[];
}
