// === DateUtils.js ===
import { dateConfig as userDateConfig } from './DateConfig.js';

// ================= 默认配置（保证最小化运行） =================

const DEFAULT_CONFIG = {

    季节划分规则: [
        { name: "冬天", desc: "", start: [12, 1], end: [2, 31] }, // 31日会自动限制到当月的最后一天
        { name: "春天", desc: "", start: [3, 1], end: [5, 31] },
        { name: "夏天", desc: "", start: [6, 16], end: [8, 31] },
        { name: "秋天", desc: "", start: [9, 11], end: [11, 31] },
    ],

    月份天气分布配置: {
        1: [
            { type: '晴朗', weight: 40 }, { type: '多云', weight: 20 }, { type: '阴天', weight: 15 },
            { type: '小雨', weight: 5 },  { type: '大风', weight: 8 },  { type: '小雪', weight: 5 },
            { type: '中雪', weight: 2 },   { type: '雾',   weight: 3 },  { type: '大雾', weight: 2 },
        ],
        2: [
            { type: '晴朗', weight: 38 }, { type: '多云', weight: 22 }, { type: '阴天', weight: 14 },
            { type: '小雨', weight: 8 },  { type: '大风', weight: 7 },  { type: '小雪', weight: 5 },
            { type: '中雪', weight: 2 },   { type: '雾',   weight: 2 },  { type: '大雾', weight: 2 },
        ],
        3: [
            { type: '晴朗', weight: 30 }, { type: '多云', weight: 25 }, { type: '阴天', weight: 15 },
            { type: '小雨', weight: 12 }, { type: '中雨', weight: 5 },  { type: '大风', weight: 6 },
            { type: '沙尘', weight: 4 },  { type: '浮尘', weight: 2 },  { type: '雾',   weight: 1 },
        ],
        4: [
            { type: '晴朗', weight: 35 }, { type: '多云', weight: 25 }, { type: '阴天', weight: 15 },
            { type: '小雨', weight: 11 }, { type: '中雨', weight: 6 },  { type: '大风', weight: 4 },
            { type: '沙尘', weight: 2 },  { type: '浮尘', weight: 1 },  { type: '雾',   weight: 1 },
        ],
        5: [
            { type: '晴朗', weight: 35 }, { type: '多云', weight: 22 }, { type: '阴天', weight: 14 },
            { type: '小雨', weight: 12 }, { type: '中雨', weight: 6 },  { type: '雷阵雨', weight: 6 },
            { type: '大风', weight: 3 },  { type: '雾',   weight: 2 },
        ],
        6: [
            { type: '晴朗', weight: 12 }, { type: '多云', weight: 18 }, { type: '阴天', weight: 22 },
            { type: '小雨', weight: 22 }, { type: '中雨', weight: 14 }, { type: '大雨', weight: 6 },
            { type: '雷阵雨', weight: 4 },{ type: '雾',   weight: 2 },
        ],
        7: [
            { type: '晴朗', weight: 25 }, { type: '多云', weight: 18 }, { type: '阴天', weight: 12 },
            { type: '小雨', weight: 12 }, { type: '中雨', weight: 8 },  { type: '大雨', weight: 5 },
            { type: '雷阵雨', weight: 12 },{ type: '桑拿天', weight: 8 },
        ],
        8: [
            { type: '晴朗', weight: 28 }, { type: '多云', weight: 16 }, { type: '阴天', weight: 10 },
            { type: '小雨', weight: 12 }, { type: '中雨', weight: 7 },  { type: '大雨', weight: 5 },
            { type: '雷阵雨', weight: 12 },{ type: '暴雨', weight: 3 }, { type: '大暴雨', weight: 1 },
            { type: '桑拿天', weight: 6 },
        ],
        9: [
            { type: '晴朗', weight: 30 }, { type: '多云', weight: 22 }, { type: '阴天', weight: 12 },
            { type: '小雨', weight: 14 }, { type: '中雨', weight: 8 },  { type: '大雨', weight: 4 },
            { type: '雷阵雨', weight: 5 }, { type: '暴雨', weight: 2 }, { type: '雾',   weight: 2 },
            { type: '大雾', weight: 1 },
        ],
        10: [
            { type: '晴朗', weight: 40 }, { type: '多云', weight: 25 }, { type: '阴天', weight: 12 },
            { type: '小雨', weight: 10 }, { type: '中雨', weight: 4 },  { type: '雾',   weight: 5 },
            { type: '大雾', weight: 4 },
        ],
        11: [
            { type: '晴朗', weight: 40 }, { type: '多云', weight: 25 }, { type: '阴天', weight: 12 },
            { type: '小雨', weight: 8 },  { type: '中雨', weight: 3 },  { type: '大风', weight: 5 },
            { type: '雾',   weight: 4 },  { type: '大雾', weight: 3 },
        ],
        12: [
            { type: '晴朗', weight: 42 }, { type: '多云', weight: 22 }, { type: '阴天', weight: 14 },
            { type: '小雨', weight: 6 },  { type: '大风', weight: 7 },  { type: '小雪', weight: 3 },
            { type: '中雪', weight: 1 },   { type: '雾',   weight: 3 }, { type: '大雾', weight: 2 },
        ],
    },

    月度温度范围配置: {
        1:  { min: -1, max: 10 },   2:  { min: 0,  max: 11 },
        3:  { min: 4,  max: 15 },   4:  { min: 9,  max: 20 },
        5:  { min: 14, max: 24 },   6:  { min: 18, max: 26 },
        7:  { min: 22, max: 30 },   8:  { min: 23, max: 32 },
        9:  { min: 20, max: 28 },   10: { min: 14, max: 22 },
        11: { min: 8,  max: 17 },   12: { min: 2,  max: 12 },
    },

    天气配置: {
        '晴朗':   { minAdj: 2,  maxAdj: 5,   amplitudeAdj: 1.5 },
        '多云':   { minAdj: 0,  maxAdj: 0,   amplitudeAdj: 1.0 },
        '阴天':   { minAdj: -1, maxAdj: -2,  amplitudeAdj: 0.5 },
        '小雨':   { minAdj: -1, maxAdj: -3,  amplitudeAdj: 0.3 },
        '中雨':   { minAdj: -2, maxAdj: -4,  amplitudeAdj: 0.2 },
        '大雨':   { minAdj: -2, maxAdj: -5,  amplitudeAdj: 0.1 },
        '暴雨':   { minAdj: -2, maxAdj: -4,  amplitudeAdj: 0.1 },
        '大暴雨': { minAdj: -3, maxAdj: -6,  amplitudeAdj: 0.1 },
        '雷阵雨': { minAdj: -1, maxAdj: -3,  amplitudeAdj: 0.4 },
        '小雪':   { minAdj: -3, maxAdj: -8,  amplitudeAdj: 0.8 },
        '中雪':   { minAdj: -5, maxAdj: -10, amplitudeAdj: 0.5 },
        '大雪':   { minAdj: -8, maxAdj: -15, amplitudeAdj: 0.3 },
        '雨夹雪': { minAdj: -4, maxAdj: -7,  amplitudeAdj: 0.4 },
        '冻雨':   { minAdj: -5, maxAdj: -9,  amplitudeAdj: 0.2 },
        '雾':     { minAdj: -1, maxAdj: -1,  amplitudeAdj: 0.2 },
        '大雾':   { minAdj: -1, maxAdj: -1,  amplitudeAdj: 0.1 },
        '雾凇':   { minAdj: -8, maxAdj: -3,  amplitudeAdj: 1.1 },
        '大风':   { minAdj: -3, maxAdj: -5,  amplitudeAdj: 0.9 },
        '沙尘':   { minAdj: -2, maxAdj: -6,  amplitudeAdj: 0.4 },
        '浮尘':   { minAdj: -1, maxAdj: -3,  amplitudeAdj: 0.7 },
        '桑拿天': { minAdj: 3,  maxAdj: 2,   amplitudeAdj: 0.2 },
        '台风':   { minAdj: -3, maxAdj: -8,  amplitudeAdj: 0.1 },
        'default': { minAdj: 0, maxAdj: 0,   amplitudeAdj: 1.0 }
    },

    温度计算系数: {
        振幅限制: { 最小振幅: 2, 下限容差: 3, 上限容差: 2 },
        夜间振幅衰减: 0.7,
        雨雪天气: { 夜间升温: 2, 白天降温: -1 }
    },

    // ═══ 统一格式的事件配置 ═══
    天气事件配置: {},

    节日配置: [],

    星期配置: [
        "星期日", "星期一", "星期二",
        "星期三", "星期四", "星期五", "星期六"
    ],
};

/**
 * 深度合并配置：用户配置覆盖默认配置（对象递归合并，数组直接覆盖）
 * @param {object} defaultConfig
 * @param {object} userConfig
 * @returns {object}
 */
function deepMerge(defaultConfig, userConfig) {
    if (!userConfig || typeof userConfig !== 'object') return { ...defaultConfig };
    const result = { ...defaultConfig };
    for (const key in userConfig) {
        if (Object.prototype.hasOwnProperty.call(userConfig, key)) {
            const userVal = userConfig[key];
            const defaultVal = defaultConfig[key];
            // 两者都是普通对象时递归合并
            if (userVal && typeof userVal === 'object' && !Array.isArray(userVal) &&
                defaultVal && typeof defaultVal === 'object' && !Array.isArray(defaultVal)) {
                result[key] = deepMerge(defaultVal, userVal);
            } else {
                // 其他情况（数组、基本类型、函数等）直接覆盖
                result[key] = userVal;
            }
        }
    }
    return result;
}

/**
 * 规范化配置：保证所有必需的字段都存在
 * @param {object} config - 用户传入的配置（可能为 undefined 或不完整）
 * @returns {object} 完整的配置对象
 */
function normalizeConfig(config) {
    // 如果用户没有传 config 或传了空值，使用默认配置
    if (!config || typeof config !== 'object') {
        return { ...DEFAULT_CONFIG };
    }
    // 合并默认配置与用户配置
    return deepMerge(DEFAULT_CONFIG, config);
}

// ================= 私有工具函数 =================

/** DJB2 哈希：输入字符串，返回确定性正整数 */
function simpleHash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
        h = (h ^ (h >>> 16)) >>> 0;
    }
    h ^= h >>> 13;
    h = Math.imul(h, 0x85ebca6b);
    h ^= h >>> 15;
    return h >>> 0;
}

function toYear(dateStr) {
    return parseInt(dateStr.substring(0, 4), 10);
}

/** 将 UTC 午夜 Date 格式化为 YYYY-MM-DD */
function formatDateKey(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

/** 获取指定年月的第 n 个星期一（基于 UTC 计算） */
function getNthMonday(year, month, n) {
    const firstDay = new Date(Date.UTC(year, month - 1, 1));
    const dayOfWeek = firstDay.getUTCDay(); // 0=周日, 1=周一 ...
    const firstMonday = dayOfWeek === 1 ? 1 : (9 - dayOfWeek) % 7 + 1;
    return firstMonday + (n - 1) * 7;
}

function getSimpleHolidays(year, config) {
    // config 已经经过 normalizeConfig，肯定有 节日配置
    const holidayRules = config.节日配置 || [];
    return holidayRules.map(规则 => {
        let day = 规则.day;
        if (规则.类型 === '第n个星期一') day = getNthMonday(year, 规则.month, 规则.n);
        return { date: new Date(Date.UTC(year, 规则.month - 1, day)), name: 规则.name };
    });
}

function 获取小时温度系数(hour) {
    const hourRad = (hour - 5) * (2 * Math.PI / 24);
    return (Math.sin(hourRad) + 1) / 2;
}

// ================= 归一化输入（消除时区，全部以 UTC 午夜为基准） =================

/**
 * 将任意日期时间输入归一化为 UTC 午夜基准，并提取必要信息
 * @param {string|Date} input - 日期字符串（YYYY-MM-DD 或 ISO 8601）或 Date 对象
 * @returns {object} { midnight: Date, dateKey: string, hour: number, year: number, month: number, day: number }
 */
function normalizeDateInput(input) {
    let year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0, weekday;

    if (typeof input === 'string') {
        const datetimeMatch = input.match(
            /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?)?/
        );
        if (!datetimeMatch) {
            throw new Error(`Invalid date string: ${input}`);
        }
        year = parseInt(datetimeMatch[1], 10);
        month = parseInt(datetimeMatch[2], 10);
        day = parseInt(datetimeMatch[3], 10);
        if (datetimeMatch[4] !== undefined) {
            hour = parseInt(datetimeMatch[4], 10);
            minute = parseInt(datetimeMatch[5] || '0', 10);
            second = parseInt(datetimeMatch[6] || '0', 10);
            if (datetimeMatch[7]) {
                let msStr = datetimeMatch[7].padEnd(3, '0').slice(0, 3);
                millisecond = parseInt(msStr, 10);
            }
        }
    } 
    else if (input instanceof Date) {
        year = input.getFullYear();
        month = input.getMonth() + 1;
        day = input.getDate();
        hour = input.getHours();
        minute = input.getMinutes();
        second = input.getSeconds();
        millisecond = input.getMilliseconds();
    } 
    else if (typeof input === 'object' && input !== null && 'year' in input && 'month' in input && 'day' in input) {
        year = input.year;
        month = input.month;
        day = input.day;
        hour = input.hour ?? 0;
        minute = input.minute ?? 0;
        second = input.second ?? 0;
        millisecond = input.millisecond ?? 0;
    } 
    else {
        throw new Error('Input must be a string, Date object, or { year, month, day } object');
    }

    // ==========================================
    // 新增：月份不变的前提下，将日期归到合理范围
    // ==========================================
    // 1. 保证月份在 1-12 之间（防止传入 13月 导致月份也进位）
    month = Math.max(1, Math.min(month, 12));
    
    // 2. 计算该年该月的实际最大天数（巧妙利用 JS Date 第0天即上个月最后一天的特效）
    // 注意：这里传入的是 month，因为 JS 月份从0开始，所以 month 就是下个月的0天，即当月最后一天
    const maxDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    
    // 3. 将 day 限制在 1 到 maxDay 之间
    // 这样 2月30日 -> 2月29日(闰年)或2月28日，4月31日 -> 4月30日
    day = Math.max(1, Math.min(day, maxDay));
    // ==========================================

    // 构造日期零点（UTC），此时 day 已经是安全值，不会再触发自动进位
    const midnight = new Date(Date.UTC(year, month - 1, day));
    const dateKey = formatDateKey(midnight); // 假设 formatDateKey 返回 'YYYY-MM-DD'
    
    // 统一使用 midnight 计算星期，避免重复 new Date
    weekday = midnight.getUTCDay();

    return {
        midnight,      // Date 对象（UTC 零点）
        dateKey,       // 字符串，如 '2026-04-16'
        year,
        month,         // 1-12
        day,           // 归后的合法日期 1-maxDay
        hour,          // 0-23
        minute,        // 0-59
        second,        // 0-59
        millisecond,   // 0-999
        weekday        // 0=周日, 1=周一, ..., 6=周六
    };
}

export { normalizeDateInput };

export { normalizeDateInput };

// ================= 天气事件系统（支持类型与优先级） =================

function 生成年度事件(year, config) {
    const events = [];
    const 事件配置 = config.天气事件配置 || {};
    for (const [eventName, 配置] of Object.entries(事件配置)) {
        if (配置.起始日范围 && 配置.年发生次数范围) {
            生成多次事件(year, eventName, 配置, events);
        }
    }
    events.sort((a, b) => a.startTime - b.startTime);
    return events;
}

function 生成多次事件(year, eventName, 配置, events) {
    const 次数范围 = 配置.年发生次数范围;
    const 目标次数 = 次数范围[0] + (simpleHash(String(year) + eventName + 'count') % (次数范围[1] - 次数范围[0] + 1));
    const 最小间隔 = 配置.最小间隔天数 || 0;

    const [startStr, endStr] = 配置.起始日范围;
    const [startM, startD] = startStr.split('-').map(Number);
    const [endM, endD] = endStr.split('-').map(Number);

    const rangeStart = Date.UTC(year, startM - 1, startD);
    let rangeEnd = Date.UTC(year, endM - 1, endD);
    
    if (rangeEnd < rangeStart) {
        rangeEnd = Date.UTC(year + 1, endM - 1, endD);
    }
    
    const rangeDays = Math.max(1, Math.round((rangeEnd - rangeStart) / 86400000));
    const MAX_RETRIES = 20;

    let generated = 0;
    let attempts = 0;
    const globalMaxAttempts = 目标次数 * MAX_RETRIES;

    const currentTypes = 配置.类型 || [];
    const priority = 配置.优先级 ?? 0;

    while (generated < 目标次数 && attempts < globalMaxAttempts) {
        attempts++;
        const seed = String(year) + eventName + 'offset' + generated + 'try' + attempts;
        const offsetDays = simpleHash(seed) % rangeDays;
        const startTime = rangeStart + offsetDays * 86400000;

        const 持续范围 = 配置.持续天数范围;
        const durSeed = String(year) + eventName + 'dur' + generated + 'try' + attempts;
        const duration = 持续范围[0] + (simpleHash(durSeed) % (持续范围[1] - 持续范围[0] + 1));
        const endTime = startTime + (duration - 1) * 86400000;

        let canPlace = true;
        for (const existing of events) {
            const existingTypes = existing.类型 || [];
            const hasCommonType = currentTypes.some(t => existingTypes.includes(t));
            if (hasCommonType) {
                const existingEnd = existing.startTime + (existing.duration - 1) * 86400000;
                const buffer = 最小间隔 * 86400000;
                if (startTime - buffer <= existingEnd && endTime + buffer >= existing.startTime) {
                    canPlace = false;
                    break;
                }
            }
        }

        if (canPlace) {
            events.push({
                type: eventName,
                startTime,
                duration,
                序列: 配置.天气序列,
                温度调整: 配置.温度调整,
                类型: currentTypes,
                优先级: priority,
            });
            generated++;
            attempts = 0;
        }
    }
}

function 查找当日事件(dateKey, config, filterType = null) {
    const year = toYear(dateKey);
    const parts = dateKey.split('-').map(Number);
    const todayStart = Date.UTC(parts[0], parts[1] - 1, parts[2]);

    const active = [];
    for (const y of [year - 1, year]) {
        const events = 生成年度事件(y, config);
        for (const event of events) {
            const dayIndex = Math.round((todayStart - event.startTime) / 86400000);
            if (dayIndex >= 0 && dayIndex < event.duration) {
                if (filterType && !event.类型.includes(filterType)) continue;
                active.push({ event, dayIndex });
            }
        }
    }
    return active.length > 0 ? active : null;
}

function 从事件取天气(activeEvents) {
    if (!activeEvents || activeEvents.length === 0) return null;
    
    const sorted = [...activeEvents].sort((a, b) => (b.event.优先级 ?? 0) - (a.event.优先级 ?? 0));
    const primary = sorted[0];
    
    let remainingDays = primary.dayIndex;
    for (const 阶段 of primary.event.序列) {
        const 阶段天数 = Math.max(1, Math.round(primary.event.duration * 阶段.天数占比));
        if (remainingDays < 阶段天数) {
            const 天气池 = 阶段.天气池;
            return 天气池[remainingDays % 天气池.length];
        }
        remainingDays -= 阶段天数;
    }
    const lastStage = primary.event.序列[primary.event.序列.length - 1];
    return lastStage.天气池[lastStage.天气池.length - 1];
}

function 从分布取天气(dateKey, month, config) {
    const distribution = config.月份天气分布配置[month];
    // 防御：如果该月份没有配置，使用默认晴天
    if (!distribution || !distribution.length) {
        return "晴";
    }
    const hashValue = simpleHash(dateKey);
    const totalWeight = distribution.reduce((sum, w) => sum + w.weight, 0);
    const randomValue = (hashValue % 10000) / 10000;
    const targetWeight = randomValue * totalWeight;

    let accumulatedWeight = 0;
    for (const weather of distribution) {
        accumulatedWeight += weather.weight;
        if (targetWeight < accumulatedWeight) return weather.type;
    }
    return distribution[0].type;
}

function 解析事件详情(activeEvent) {
    if (!activeEvent) return null;
    const { event, dayIndex } = activeEvent;
    let remainingDays = dayIndex;
    let currentPhase = event.序列[0].阶段;

    for (const 阶段 of event.序列) {
        const 阶段天数 = Math.max(1, Math.round(event.duration * 阶段.天数占比));
        if (remainingDays < 阶段天数) {
            currentPhase = 阶段.阶段;
            break;
        }
        remainingDays -= 阶段天数;
    }
    return { 
        name: event.type, 
        阶段: currentPhase, 
        当前天数: dayIndex + 1, 
        持续天数: event.duration,
        desc: event.描述,
        标签: event.类型,
        优先级: event.优先级
    };
}

// ================= 温度计算核心（叠加所有事件温度调整） =================

function 计算温度(dateKey, hour, weather, activeEvents, config) {
    const month = parseInt(dateKey.substring(5, 7), 10);
    const range = config.月度温度范围配置[month];
    // 防御：如果当月范围缺失，使用默认范围（0-20）
    const safeRange = range || { min: 0, max: 20 };
    const weatherAdj = config.天气配置[weather] || config.天气配置['default'] || { minAdj: 0, maxAdj: 0, amplitudeAdj: 1.0 };

    let totalEventMinAdj = 0;
    let totalEventMaxAdj = 0;
    if (activeEvents) {
        for (const { event } of activeEvents) {
            const evAdj = event.温度调整 || { minAdj: 0, maxAdj: 0 };
            totalEventMinAdj += evAdj.minAdj;
            totalEventMaxAdj += evAdj.maxAdj;
        }
    }

    const dailyMin = safeRange.min + weatherAdj.minAdj + totalEventMinAdj;
    const dailyMax = safeRange.max + weatherAdj.maxAdj + totalEventMaxAdj;

    const 系数 = config.温度计算系数;
    let amplitude = (dailyMax - dailyMin) * weatherAdj.amplitudeAdj;
    const minAmplitude = 系数?.振幅限制?.最小振幅 ?? 2;
    amplitude = clamp(amplitude, minAmplitude, dailyMax - dailyMin);

    const effectiveMin = dailyMin;
    const effectiveMax = dailyMin + amplitude;

    const hashValue = simpleHash(dateKey);
    const tempSeed = (hashValue % 100) / 100;
    const dailyBaseTemp = effectiveMin + tempSeed * (effectiveMax - effectiveMin);

    // 直接获取当日小时的基础温度系数，不再受季节修正
    let hourlyMultiplier = 获取小时温度系数;

    // 保留昼夜振幅衰减配置
    const nightAttenuation = 系数?.夜间振幅衰减 ?? 0.6;
    // 保留雨雪天气日夜影响
    const rainSnow = 系数?.雨雪天气 ?? { 夜间升温: 1, 白天降温: -1 };

    let temperature = dailyBaseTemp;
    
    // 昼夜温差计算：白天正常振幅，夜晚振幅衰减
    if (hour >= 6 && hour <= 18) {
        temperature += (hourlyMultiplier - 0.5) * amplitude;
    } else {
        temperature += (hourlyMultiplier - 0.5) * amplitude * nightAttenuation;
    }

    // 雨雪天气特殊计算
    if (weather.includes('雨') || weather.includes('雪')) {
        if (hour >= 18 || hour < 6) temperature += rainSnow.夜间升温;
        else temperature += rainSnow.白天降温;
    }

    // 最终温度限制
    const lowerTolerance = 系数?.振幅限制?.下限容差 ?? 3;
    const upperTolerance = 系数?.振幅限制?.上限容差 ?? 3;
    temperature = clamp(temperature, effectiveMin - lowerTolerance, effectiveMax + upperTolerance);
    
    return Math.round(temperature);
}


// ================= 公开接口（全部接受字符串或 Date 对象，并自动规范化配置） =================

/**
 * 获取星期名称
 * @param {string|Date} dateInput 
 * @param {object} config 
 * @returns {object} { name: string, desc: string }
 */
export function 获取星期(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { weekday } = normalizeDateInput(dateInput);
    const weekNames = normalizedConfig.星期配置 || [
        { "name": "星期日", "desc": "日" },
        { "name": "星期一", "desc": "月" },
        { "name": "星期二", "desc": "火" },
        { "name": "星期三", "desc": "水" },
        { "name": "星期四", "desc": "木" },
        { "name": "星期五", "desc": "金" },
        { "name": "星期六", "desc": "土" }
      ];
    return weekNames[weekday];
}

/**
 * 获取节日
 * @param {string|Date} dateInput 
 * @param {object} config 
 * @returns {object} { name: string, desc: string, daysUntil: number }
 */
export function 获取节日(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { midnight, year } = normalizeDateInput(dateInput);
    const todayStart = midnight.getTime();

    const holidays = [
        ...getSimpleHolidays(year, normalizedConfig),
        ...getSimpleHolidays(year + 1, normalizedConfig)
    ];

    for (const holiday of holidays) {
        if (holiday.date.getTime() >= todayStart) {
            const daysUntil = Math.round((holiday.date.getTime() - todayStart) / 86400000);
            return { name: holiday.name, desc: holiday.desc, daysUntil };
        }
    }
    return { name: "未知", desc: "", daysUntil: -1 };
}

/**
 * 获取季节名称
 * @param {string|Date} dateInput 
 * @param {object} config 
 * @returns {object} { name: string, desc: string }
 */
export function 获取季节(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { midnight, year } = normalizeDateInput(dateInput);
    const unknownSeason = { name: "未知季节", desc: "" };
    
    if (!normalizedConfig.季节划分规则) return unknownSeason;

    for (const season of normalizedConfig.季节划分规则) {
        const [startMonth, startDay] = season.start;
        const [endMonth, endDay] = season.end;

        // 将配置转换为当前年份的 Date 对象
        const startDate = new Date(Date.UTC(year, startMonth - 1, startDay));
        const endDate = new Date(Date.UTC(year, endMonth - 1, endDay));

        // JS Date 对象可以直接用 > < >= <= 比较，底层比较的是时间戳
        if (startDate > endDate) {
            // 结束日期比开始日期早，说明是跨年季节 (如 12月20日 -> 1月10日)
            // 此时输入日期只要 >= 开始(年末) 或者 <= 结束(年初) 即在季节内
            if (midnight >= startDate || midnight <= endDate) {
                return { name: season.name, desc: season.desc };
            }
        } else {
            // 正常季节 (不跨年)
            if (midnight >= startDate && midnight <= endDate) {
                return { name: season.name, desc: season.desc };
            }
        }
    }

    return unknownSeason;
}
  

/**
 * 获取当日天气类型
 * @param {string|Date} dateInput - 支持带时间的输入，但天气按日判定
 * @param {object} config 
 * @returns {string} 天气类型
 */
export function 获取天气(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { dateKey, month } = normalizeDateInput(dateInput);
    const activeEvents = 查找当日事件(dateKey, normalizedConfig);
    let name = "未知";
    if (activeEvents) name = 从事件取天气(activeEvents);
    else name = 从分布取天气(dateKey, month, normalizedConfig);
    return {
        name,
        desc: normalizedConfig.天气配置[name]?.desc ?? ''
    }
}

/**
 * 获取指定时刻的温度
 * @param {string|Date} dateInput - 必须包含时间信息（如 "2026-04-16T14:00:00" 或 Date 对象），若仅日期则小时为 0
 * @param {object} config 
 * @returns {number} 温度
 */
export function 获取温度(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { dateKey, hour } = normalizeDateInput(dateInput);
    const weather = 获取天气(dateInput, normalizedConfig);
    const activeEvents = 查找当日事件(dateKey, normalizedConfig);
    return 计算温度(dateKey, hour, weather, activeEvents, normalizedConfig);
}

/**
 * 获取当日事件详情（支持重叠）
 * @param {string|Date} dateInput 
 * @param {object} config 
 * @returns {object|null} { primary: 主事件详情, all: 所有事件详情数组 }
 */
export function 获取当日事件(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { dateKey } = normalizeDateInput(dateInput);
    const activeEvents = 查找当日事件(dateKey, normalizedConfig);
    if (!activeEvents) return null;

    const sorted = [...activeEvents].sort((a, b) => (b.event.优先级 ?? 0) - (a.event.优先级 ?? 0));
    const allDetails = sorted.map(e => 解析事件详情(e));
    
    return allDetails;
}

/**
 * 按类型查找当日事件
 * @param {string|Date} dateInput 
 * @param {string} type - 事件类型标签，如 "自然灾害"
 * @param {object} config 
 * @returns {Array|null} 该类型的事件详情数组
 */
export function 获取指定类型事件(dateInput, type, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { dateKey } = normalizeDateInput(dateInput);
    const activeEvents = 查找当日事件(dateKey, normalizedConfig, type);
    if (!activeEvents) return null;
    return activeEvents.map(e => 解析事件详情(e));
}

/**
 * 获取未来 N 天的天气预报
 * @param {string|Date} dateInput - 起始日期时间（将取其日期部分）
 * @param {number} days - 天数
 * @param {object} config 
 * @returns {Array} 预报数组
 */
export function 获取天气预报(dateInput, days, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const result = [];
    const { midnight: startMidnight } = normalizeDateInput(dateInput);
    
    for (let i = 0; i < days; i++) {
        const current = new Date(startMidnight);
        current.setUTCDate(startMidnight.getUTCDate() + i);
        const dateKey = formatDateKey(current);
        const month = current.getUTCMonth() + 1;
        
        const activeEvents = 查找当日事件(dateKey, normalizedConfig);
        const weather = activeEvents ? 从事件取天气(activeEvents) : 从分布取天气(dateKey, month, normalizedConfig);
        
        let minTemp = Infinity, maxTemp = -Infinity;
        for (let h = 0; h < 24; h++) {
            const t = 计算温度(dateKey, h, weather, activeEvents, normalizedConfig);
            if (t < minTemp) minTemp = t;
            if (t > maxTemp) maxTemp = t;
        }
        
        const eventInfo = activeEvents ? 获取当日事件(dateKey, normalizedConfig) : null;
        result.push({ 
            date: normalizeDateInput(current),
            weather, 
            tempMin: minTemp, 
            tempMax: maxTemp, 
            event: eventInfo 
        });
    }
    return result;
}