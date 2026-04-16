// === DateConfig.js ===
export const dateConfig = {

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
    天气事件配置: {
        梅雨: {
            类型: ["持续性降水"],
            优先级: 2,
            起始日范围: ["06-08", "06-18"],  // 精准锁定入梅期
            年发生次数范围: [1, 1],           // 全年只发生1次
            持续天数范围: [30, 40],
            最小间隔天数: 0,
            天气序列: [
                { 阶段: '入梅前兆', 天数占比: 0.08, 天气池: ['多云', '阴天', '小雨', '多云', '阴天'] },
                { 阶段: '梅雨核心', 天数占比: 0.60, 天气池: ['小雨', '中雨', '阴天', '小雨', '小雨', '中雨', '大雨', '阴天', '小雨', '阴天', '多云', '小雨'] },
                { 阶段: '梅雨间歇', 天数占比: 0.12, 天气池: ['多云', '阴天', '小雨', '多云'] },
                { 阶段: '出梅过渡', 天数占比: 0.20, 天气池: ['小雨', '阴天', '多云', '多云', '晴朗', '多云', '晴朗'] },
            ],
            温度调整: { minAdj: -1, maxAdj: -2 },
        },
        台风: {
            类型: ["自然灾害"],
            优先级: 5,
            起始日范围: ["07-15", "10-10"],  // 台风季
            年发生次数范围: [2, 4],
            最小间隔天数: 12,
            持续天数范围: [4, 7],
            天气序列: [
                { 阶段: '前兆', 天数占比: 0.15, 天气池: ['多云', '阴天', '大风', '阴天'] },
                { 阶段: '接近', 天数占比: 0.15, 天气池: ['大风', '阴天', '小雨', '中雨', '大风'] },
                { 阶段: '核心', 天数占比: 0.30, 天气池: ['暴雨', '大暴雨', '大雨', '暴雨', '大风', '暴雨'] },
                { 阶段: '远离', 天数占比: 0.25, 天气池: ['大雨', '中雨', '大风', '中雨', '小雨', '阴天'] },
                { 阶段: '余波', 天数占比: 0.15, 天气池: ['小雨', '阴天', '多云', '多云'] },
            ],
            温度调整: { minAdj: -3, maxAdj: -6 },
        },
        冬季寒潮: {
            类型: ["自然灾害"],
            优先级: 5,
            起始日范围: ["11-20", "12-31"],  // 冬季寒潮在年末爆发，持续跨年到1月
            年发生次数范围: [2, 3],
            最小间隔天数: 14,
            持续天数范围: [5, 10],
            天气序列: [
                { 阶段: '前兆', 天数占比: 0.18, 天气池: ['多云', '阴天', '大风', '多云'] },
                { 阶段: '强降温', 天数占比: 0.30, 天气池: ['大风', '小雪', '阴天', '大风', '中雪', '晴朗'] },
                { 阶段: '严寒', 天数占比: 0.28, 天气池: ['晴朗', '大风', '晴朗', '小雪', '晴朗'] },
                { 阶段: '回温', 天数占比: 0.24, 天气池: ['多云', '晴朗', '多云', '晴朗', '多云'] },
            ],
            温度调整: { minAdj: -5, maxAdj: -7 },
        },
        热浪: {
            类型: ["自然灾害"],
            优先级: 5,
            起始日范围: ["07-20", "08-20"],
            年发生次数范围: [1, 2],
            最小间隔天数: 14,
            持续天数范围: [4, 8],
            天气序列: [
                { 阶段: '升温', 天数占比: 0.20, 天气池: ['晴朗', '多云', '晴朗', '桑拿天'] },
                { 阶段: '酷暑', 天数占比: 0.50, 天气池: ['晴朗', '桑拿天', '晴朗', '桑拿天', '晴朗'] },
                { 阶段: '缓解', 天数占比: 0.30, 天气池: ['多云', '雷阵雨', '多云', '晴朗', '多云'] },
            ],
            温度调整: { minAdj: 2, maxAdj: 4 },
        },
        春霖: {
            类型: ["持续性降水"],
            优先级: 2,
            起始日范围: ["03-10", "05-10"],
            年发生次数范围: [1, 2],
            最小间隔天数: 14,
            持续天数范围: [3, 7],
            天气序列: [
                { 阶段: '起始', 天数占比: 0.18, 天气池: ['多云', '阴天', '小雨', '阴天'] },
                { 阶段: '持续', 天数占比: 0.50, 天气池: ['小雨', '阴天', '小雨', '中雨', '阴天', '小雨', '多云'] },
                { 阶段: '间歇', 天数占比: 0.12, 天气池: ['多云', '阴天', '多云'] },
                { 阶段: '结束', 天数占比: 0.20, 天气池: ['小雨', '阴天', '多云', '多云', '晴朗'] },
            ],
            温度调整: { minAdj: -1, maxAdj: -2 },
        },
        秋霖: {
            类型: ["持续性降水"],
            优先级: 2,
            起始日范围: ["09-10", "10-20"],
            年发生次数范围: [1, 2],
            最小间隔天数: 14,
            持续天数范围: [3, 7],
            天气序列: [
                { 阶段: '起始', 天数占比: 0.18, 天气池: ['多云', '阴天', '小雨', '阴天'] },
                { 阶段: '持续', 天数占比: 0.50, 天气池: ['小雨', '阴天', '小雨', '中雨', '阴天', '小雨', '多云'] },
                { 阶段: '间歇', 天数占比: 0.12, 天气池: ['多云', '阴天', '多云'] },
                { 阶段: '结束', 天数占比: 0.20, 天气池: ['小雨', '阴天', '多云', '多云', '晴朗'] },
            ],
            温度调整: { minAdj: -1, maxAdj: -2 },
        }
    },

    节假日规则配置: [
        { month: 1,  day: 1,  name: "元旦",         类型: "固定" },
        { month: 1,  n: 2,   name: "成人节",        类型: "第n个星期一" },
        { month: 2,  day: 11, name: "建国纪念日",    类型: "固定" },
        { month: 3,  day: 21, name: "春分",          类型: "固定" },
        { month: 4,  day: 29, name: "昭和日",        类型: "固定" },
        { month: 5,  day: 3,  name: "宪法纪念日",    类型: "固定" },
        { month: 5,  day: 4,  name: "绿之日",        类型: "固定" },
        { month: 5,  day: 5,  name: "儿童节",        类型: "固定" },
        { month: 7,  n: 3,   name: "海之日",         类型: "第n个星期一" },
        { month: 8,  day: 11, name: "山之日",         类型: "固定" },
        { month: 9,  n: 3,   name: "敬老节",         类型: "第n个星期一" },
        { month: 9,  day: 23, name: "秋分",           类型: "固定" },
        { month: 10, n: 2,   name: "体育节",         类型: "第n个星期一" },
        { month: 11, day: 3,  name: "文化节",         类型: "固定" },
        { month: 11, day: 23, name: "勤劳感谢日",     类型: "固定" },
        { month: 12, day: 23, name: "天皇诞辰",       类型: "固定" }
    ],

    星期名称配置: [
        "星期日（日）", "星期一（月）", "星期二（火）",
        "星期三（水）", "星期四（木）", "星期五（金）", "星期六（土）"
    ],
};

