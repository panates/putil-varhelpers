declare module "putil-varhelpers" {
    export function camelize(v: string, upperCaseFirst?: boolean): string;

    export function coalesce(...args: any[]): any;

    export function coerceToArray(v: any, defaultValue?: any[]): any;

    export function coerceToString(v: any, defaultValue?: string): any;

    export function coerceToBoolean(v: any, defaultValue?: boolean): any;

    export function coerceToNumber(v: any, defaultValue?: number): any;

    export function coerceToInt(v: any, defaultValue?: number): any;

    export function mapDistinct<T = any>(a: T[], coercer: (v: any) => T): T[];
}
