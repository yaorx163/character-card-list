// === DateUtils.js ===
import { dateConfig as userDateConfig } from './DateConfig.js';

// ================= 默认配置（保证最小化运行） =================

const DEFAULT_CONFIG = {

    月份季节映射: {
        1: 'winter', 2: 'winter', 3: 'spring',
        4: 'spring', 5: 'spring', 6: 'summer',
        7: 'summer', 8: 'summer', 9: 'autumn',
        10: 'autumn', 11: 'autumn', 12: 'winter'
    },

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

    天气温度调整配置: {
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
        夏季:  { 夜间最低系数: 0.3, 曲线调整: 0 },
        冬季:  { 夜间最高系数: 0.4, 曲线调整: -0.1 },
        春秋季: { 夜间最低系数: 0.25, 夜间最高系数: 0.45, 曲线调整: 0 },
        雨雪天气: { 夜间升温: 2, 白天降温: -1 }
    },

    // ═══ 统一格式的事件配置 ═══
    天气事件配置: {},

    节假日规则配置: [],

    星期名称配置: [
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

function toDateKey(dateStr) {
    return dateStr.substring(0, 10);
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
    // config 已经经过 normalizeConfig，肯定有 节假日规则配置
    const holidayRules = config.节假日规则配置 || [];
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
    let date;
    if (typeof input === 'string') {
        date = new Date(input);
        if (isNaN(date.getTime())) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
                date = new Date(input + 'T00:00:00Z');
            } else {
                throw new Error(`Invalid date string: ${input}`);
            }
        }
    } else if (input instanceof Date) {
        date = new Date(input.getTime());
    } else {
        throw new Error('Input must be a string or Date object');
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const hour = date.getUTCHours();

    const midnight = new Date(Date.UTC(year, month, day));
    const dateKey = formatDateKey(midnight);

    return {
        midnight,
        dateKey,
        hour,
        year,
        month: month + 1,
        day
    };
}

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
        type: event.type, 
        phase: currentPhase, 
        dayIndex: dayIndex + 1, 
        totalDays: event.duration,
        类型: event.类型,
        优先级: event.优先级
    };
}

// ================= 温度计算核心（叠加所有事件温度调整） =================

function 计算温度(dateKey, hour, weather, activeEvents, config) {
    const month = parseInt(dateKey.substring(5, 7), 10);
    const season = config.月份季节映射[month];
    const range = config.月度温度范围配置[month];
    // 防御：如果当月范围缺失，使用默认范围（0-20）
    const safeRange = range || { min: 0, max: 20 };
    const weatherAdj = config.天气温度调整配置[weather] || config.天气温度调整配置['default'] || { minAdj: 0, maxAdj: 0, amplitudeAdj: 1.0 };

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

    let hourlyMultiplier = 获取小时温度系数(hour);
    let curveAdjustment = 0;

    // 安全获取季节系数
    const summerCoeff = 系数?.夏季 ?? { 夜间最低系数: 0.3, 曲线调整: 0.05 };
    const winterCoeff = 系数?.冬季 ?? { 夜间最高系数: 0.6, 曲线调整: -0.05 };
    const springAutumnCoeff = 系数?.春秋季 ?? { 夜间最低系数: 0.2, 夜间最高系数: 0.7, 曲线调整: 0 };
    const nightAttenuation = 系数?.夜间振幅衰减 ?? 0.6;
    const rainSnow = 系数?.雨雪天气 ?? { 夜间升温: 1, 白天降温: -1 };

    switch (season) {
        case 'summer':
            if (hour >= 22 || hour < 6) hourlyMultiplier = Math.max(summerCoeff.夜间最低系数, hourlyMultiplier);
            curveAdjustment = summerCoeff.曲线调整;
            break;
        case 'winter':
            if (hour >= 22 || hour < 6) hourlyMultiplier = Math.min(winterCoeff.夜间最高系数, hourlyMultiplier);
            curveAdjustment = winterCoeff.曲线调整;
            break;
        case 'spring':
        case 'autumn':
            if (hour >= 22 || hour < 6) hourlyMultiplier = clamp(hourlyMultiplier, springAutumnCoeff.夜间最低系数, springAutumnCoeff.夜间最高系数);
            curveAdjustment = springAutumnCoeff.曲线调整;
            break;
    }

    let temperature = dailyBaseTemp;
    if (hour >= 6 && hour <= 18) temperature += (hourlyMultiplier - 0.5) * amplitude;
    else temperature += (hourlyMultiplier - 0.5) * amplitude * nightAttenuation;
    temperature += curveAdjustment * amplitude;

    if (weather.includes('雨') || weather.includes('雪')) {
        if (hour >= 18 || hour < 6) temperature += rainSnow.夜间升温;
        else temperature += rainSnow.白天降温;
    }

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
 * @returns {string} 星期名称
 */
export function 获取星期(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { midnight } = normalizeDateInput(dateInput);
    const weekNames = normalizedConfig.星期名称配置 || ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekNames[midnight.getUTCDay()];
}

/**
 * 获取下一个节假日
 * @param {string|Date} dateInput 
 * @param {object} config 
 * @returns {string} 描述字符串
 */
export function 获取下一个节假日(dateInput, config = userDateConfig) {
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
            return `${holiday.name}(${daysUntil}天后)`;
        }
    }
    return "未知";
}

/**
 * 获取季节名称
 * @param {string|Date} dateInput 
 * @param {object} config 
 * @returns {string} 季节
 */
export function 获取季节(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { month } = normalizeDateInput(dateInput);
    return normalizedConfig.月份季节映射[month] || "unknown";
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
    if (activeEvents) return 从事件取天气(activeEvents);
    return 从分布取天气(dateKey, month, normalizedConfig);
}

/**
 * 获取指定时刻的温度（带 °C 后缀）
 * @param {string|Date} dateInput - 必须包含时间信息（如 "2026-04-16T14:00:00" 或 Date 对象），若仅日期则小时为 0
 * @param {object} config 
 * @returns {string} 温度字符串，如 "22°C"
 */
export function 获取温度(dateInput, config = userDateConfig) {
    const normalizedConfig = normalizeConfig(config);
    const { dateKey, hour } = normalizeDateInput(dateInput);
    const weather = 获取天气(dateInput, normalizedConfig);
    const activeEvents = 查找当日事件(dateKey, normalizedConfig);
    return 计算温度(dateKey, hour, weather, activeEvents, normalizedConfig) + '°C';
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
    const primaryDetail = 解析事件详情(sorted[0]);
    const allDetails = sorted.map(e => 解析事件详情(e));
    
    return {
        primary: primaryDetail,
        all: allDetails
    };
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
            date: dateKey, 
            weather, 
            tempMin: minTemp + '°C', 
            tempMax: maxTemp + '°C', 
            event: eventInfo 
        });
    }
    return result;
}