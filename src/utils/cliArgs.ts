/**
 * Helper to parse CLI arguments like --name=value
 * @param name - argument name without leading dashes
 * @param defaultValue - value to return if argument is not provided
 * @returns string | undefined
 */
export function getArgValue(name: string, defaultValue: string): string {
    const arg = process.argv.find(arg => arg.startsWith(`--${name}=`));
    return arg ? arg.split('=')[1] : defaultValue;
}
