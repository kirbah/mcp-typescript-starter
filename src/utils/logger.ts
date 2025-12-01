/**
 * Safe Logger for MCP Servers
 * 
 * Writes all logs to stderr to avoid breaking the MCP JSON-RPC protocol
 * which communicates over stdout.
 */
export class Logger {
    private static formatMessage(level: string, message: string, ...args: any[]): string {
        const timestamp = new Date().toISOString();
        const formattedArgs = args.length > 0 ? ' ' + args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ') : '';
        return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
    }

    static debug(message: string, ...args: any[]): void {
        console.error(this.formatMessage('DEBUG', message, ...args));
    }

    static info(message: string, ...args: any[]): void {
        console.error(this.formatMessage('INFO', message, ...args));
    }

    static warn(message: string, ...args: any[]): void {
        console.error(this.formatMessage('WARN', message, ...args));
    }

    static error(message: string, ...args: any[]): void {
        console.error(this.formatMessage('ERROR', message, ...args));
    }
}
