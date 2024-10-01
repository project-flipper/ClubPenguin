export enum LogLevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    WARNING = WARN,
    CRITICAL = ERROR
}

/**
 * Returns a human-readable string representation of a log level.
 * @param level The log level.
 * @returns The string representation.
 */
export function getLevelName(level: LogLevel): string {
    switch (level) {
        case LogLevel.TRACE:
            return 'TRACE';
        case LogLevel.DEBUG:
            return 'DEBUG';
        case LogLevel.INFO:
            return 'INFO';
        case LogLevel.WARN:
            return 'WARN';
        case LogLevel.ERROR:
            return 'ERROR';
        default:
            return 'UNKNOWN';
    }
}

export const DEFAULT_LEVEL = LogLevel.WARN;

/**
 * Represents a record waiting to be logged.
 * You typically do not create these and instead employ a {@link Logger}.
 */
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
            'now': new Date().toISOString(),
            'level': 'UNKNOWN'
        };
    }
}

/**
 * Provides record formatting before logging.
 */
export class Formatter {
    msgFormat: string;
    afterMsg: any[];

    constructor(msgFormat: string, afterMsg: any[]) {
        this.msgFormat = msgFormat;
        this.afterMsg = afterMsg;
    }

    /**
     * Transforms a record into a sequence of arguments for a {@link console} log method.
     * @param level The current log level.
     * @param record The record to be formatted.
     * @returns A sequence of ordered arguments to be fed into any {@link console} logging methods.
     */
    getConsoleArgs(level: LogLevel, record: LogRecord): any[] {
        record.mappings.level = record.mappings.level ?? getLevelName(level);

        let msg = this.msgFormat;

        for (let key in record.mappings) {
            msg = msg.replace(new RegExp('{' + key + '}', 'gi'), record.mappings[key]);
        }

        return [msg, ...this.afterMsg, ...record.args];
    }
}

/**
 * Identical to {@link Formatter} except a color argument gets inserted into the console arguments.
 * This color argument changes based on the log level, and can be customized as needed.
 */
export class ColorLevelFormatter extends Formatter {
    colors: Record<LogLevel, string>;
    colorArgIndex: number;

    constructor(msgFormat: string, afterMsg: any[], colors: Record<LogLevel, string>, colorArgIndex = 0) {
        super(msgFormat, afterMsg);

        this.colors = colors;
        this.colorArgIndex = colorArgIndex;
    }

    getConsoleArgs(level: LogLevel, record: LogRecord): any[] {
        this.afterMsg[this.colorArgIndex] = this.colors[level] ?? '';

        return super.getConsoleArgs(level, record);
    }
}

export const DEFAULT_FORMAT = new Formatter('[%c{now}%c] [%c{name}%c] %c{msg}%c', ['color:blue', '', 'color: red', '', 'color:grey', '']);

/**
 * The factory for record creation and logging.
 * You typically do not instantiate these directly, as {@link getLogger} will handle mapping and parents for you.
 */
export class Logger {
    _name: string;
    _level: LogLevel;
    _formatter: Formatter;

    constructor(name: string) {
        this._name = name;
    }

    /**
     * The name associated with this logger.
     * This is the full path to which this logger is mapped at.
     */
    get name(): string {
        return this._name;
    }

    /**
     * The parent of this logger.
     */
    get parent(): Logger {
        let parent = this.name.split('.');
        return getLogger(parent.slice(0, -1).join('.'));
    }

    /**
     * The level at which this logger can log at.
     * If none is set, gets the value from the parent logger.
     */
    get level(): LogLevel {
        return this._level ?? this.parent.level;
    }

    set level(level: LogLevel) {
        this._level = level;
    }

    /**
     * The formatter associated with this logger.
     * If none is set, gets the value from the parent logger.
     */
    get formatter(): Formatter {
        return this._formatter ?? this.parent.formatter;
    }

    set formatter(formatter: Formatter) {
        this._formatter = formatter;
    }

    /**
     * Gets or creates a logger that descends from this logger.
     * @param name The name of the child logger.
     * @returns The child logger.
     */
    getChild(name: string): Logger {
        return getLogger(`${this.name}.${name}`);
    }

    _log(level: LogLevel, record: LogRecord): void {
        let args = this.formatter.getConsoleArgs(level, record);

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

    /**
     * Creates and logs a record given a level.
     * @param level The level to log at.
     * @param messages The logging messages.
     */
    log(level: LogLevel, ...messages: any): void {
        let record = new LogRecord(this, messages);
        this._log(level, record);
    }

    /**
     * Logs a record at level TRACE.
     * @param messages The logging messages.
     */
    trace(...messages: any): void {
        this.log(LogLevel.TRACE, ...messages);
    }

    /**
     * Logs a record at level DEBUG.
     * @param messages The logging messages.
     */
    debug(...messages: any): void {
        this.log(LogLevel.DEBUG, ...messages);
    }

    /**
     * Logs a record at level INFO.
     * @param messages The logging messages.
     */
    info(...messages: any): void {
        this.log(LogLevel.INFO, ...messages);
    }

    /**
     * Logs a record at level WARN.
     * @param messages The logging messages.
     */
    warn(...messages: any): void {
        this.log(LogLevel.WARN, ...messages);
    }

    /**
     * Logs a record at level ERROR.
     * @param messages The logging messages.
     */
    error(...messages: any): void {
        this.log(LogLevel.ERROR, ...messages);
    }
}

/**
 * The root logger.
 * You should not instantiate this class yourself as this is just used as the fallback parent from which all loggers derive.
 * It is not recommended to alter the values of this logger unless you intend to make changes globally as a last resort. Avoid it otherwise.
 */
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

    /**
     * Undefined as a root logger has no parent.
     */
    get parent(): undefined {
        return;
    }
}

const mapping: Map<string, Logger> = new Map();
export const root = new RootLogger();

/**
 * Gets or creates a logger.
 * @param name The name of the logger.
 * @returns The logger. If no name was provided then returns the root logger.
 */
export function getLogger(name?: string): Logger | RootLogger;
/**
 * Gets the root logger.
 * @returns The root logger.
 */
export function getLogger(): RootLogger;
/**
 * Gets the root logger.
 * @returns The root logger.
 */
export function getLogger(name: ''): RootLogger;
/**
 * Gets the root logger.
 * @returns The root logger.
 */
export function getLogger(name: 'root'): RootLogger;
/**
 * Gets or creates a logger.
 * @param name The name of the logger.
 * @returns The logger.
 */
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
