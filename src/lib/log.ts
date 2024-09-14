export enum LogLevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    WARNING = WARN,
    CRITICAL = ERROR
}

export const DEFAULT_LEVEL = LogLevel.WARN;

export class LogRecord {
    msg: string;
    args: any[];

    mappings: Record<string, string>;

    constructor(logger: Logger, args: any[]) {
        if (args.length == 0) {
            this.msg = '';
            this.args = [];
        } else {
            this.msg = typeof args[0] == 'string' ? args.shift() : '';
            this.args = args;
        }

        this.mappings = {
            'msg': this.msg,
            'name': logger.name,
            'now': new Date().toISOString()
        };
    }
}

export class Formatter {
    msgFormat: string;
    afterMsg: any[];

    constructor(msgFormat: string, afterMsg: any[]) {
        this.msgFormat = msgFormat;
        this.afterMsg = afterMsg;
    }

    getConsoleArgs(record: LogRecord): any[] {
        let msg = this.msgFormat;

        for (let key in record.mappings) {
            msg = msg.replace(new RegExp('{' + key + '}', 'gi'), record.mappings[key]);
        }

        return [msg, ...this.afterMsg, ...record.args];
    }
}

export const DEFAULT_FORMAT = new Formatter('[%c{now}%c] [%c{name}%c] %c{msg}%c', ['color:blue', '', 'color: red', '', 'color:grey', '']);

export class Logger {
    _name: string;
    _level: LogLevel;
    _formatter: Formatter;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get parent(): Logger {
        let parent = this.name.split('.');
        return getLogger(parent.slice(0, -1).join('.'));
    }

    get level(): LogLevel {
        return this._level ?? this.parent.level;
    }

    set level(level: LogLevel) {
        this._level = level;
    }

    get formatter(): Formatter {
        return this._formatter ?? this.parent.formatter;
    }

    set formatter(formatter: Formatter) {
        this._formatter = formatter;
    }

    _log(level: LogLevel, record: LogRecord): void {
        let args = this.formatter.getConsoleArgs(record);

        if (level < this.level) return;

        switch (level) {
            case LogLevel.TRACE:
                console.trace(...args);
                break;
            case LogLevel.DEBUG:
                console.debug(...args);
                break;
            case LogLevel.INFO:
                console.info(...args);
                break;
            case LogLevel.WARN:
                console.warn(...args);
                break;
            case LogLevel.ERROR:
                console.error(...args);
                break;
        }
    }

    log(level: LogLevel, ...messages: any): void {
        let record = new LogRecord(this, messages);
        this._log(level, record);
    }

    trace(...messages: any): void {
        this.log(LogLevel.TRACE, ...messages);
    }

    debug(...messages: any): void {
        this.log(LogLevel.DEBUG, ...messages);
    }

    info(...messages: any): void {
        this.log(LogLevel.INFO, ...messages);
    }

    warn(...messages: any): void {
        this.log(LogLevel.WARN, ...messages);
    }

    error(...messages: any): void {
        this.log(LogLevel.ERROR, ...messages);
    }
}

class RootLogger extends Logger {
    constructor() {
        super('root');
        this.level = DEFAULT_LEVEL;
        this.formatter = DEFAULT_FORMAT;
    }

    get level(): LogLevel {
        return this._level;
    }

    set level(level: LogLevel) {
        this._level = level;
    }

    get formatter(): Formatter {
        return this._formatter;
    }

    set formatter(formatter: Formatter) {
        this._formatter = formatter;
    }

    get parent(): undefined {
        return;
    }
}

const mapping: Map<string, Logger> = new Map();
export const root = new RootLogger();

export function getLogger(): RootLogger;
export function getLogger(name: ''): RootLogger;
export function getLogger(name: 'root'): RootLogger;
export function getLogger(name: string): Logger;
export function getLogger(name?: string): Logger | RootLogger {
    if (!name || name == 'root') {
        return root;
    }

    if (!mapping.has(name)) {
        mapping.set(name, new Logger(name));
    }

    return mapping.get(name);
}
