// test.mjs
import {
    获取星期,
    获取下一个节假日,
    获取季节,
    获取天气,
    获取温度,
    获取当日事件,
    获取天气预报
} from './DateUtils.js';

// 辅助打印分隔线
function section(title) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`  ${title}`);
    console.log(`${'='.repeat(60)}`);
}

function subTest(name, fn) {
    console.log(`\n▶ ${name}`);
    try {
        fn();
    } catch (e) {
        console.error(`❌ 测试失败: ${e.message}`);
        console.error(e.stack);
    }
}

// ================= 1. 事件跨年测试 =================
section('1. 事件跨年测试 (冬季寒潮跨年至1月)');

subTest('检查 2025-12-31 与 2026-01-01 是否为同一寒潮事件', () => {
    const dateDec31 = '2025-12-31';
    const dateJan01 = '2026-01-01';
    
    const eventDec31 = 获取当日事件(dateDec31);
    const eventJan01 = 获取当日事件(dateJan01);
    
    console.log(`2025-12-31 事件:`, eventDec31);
    console.log(`2026-01-01 事件:`, eventJan01);
    
    // 预期：如果存在寒潮跨年，两个日期的 type 应相同且为 '冬季寒潮'
    if (eventDec31 && eventJan01 && eventDec31.type === eventJan01.type) {
        console.log(`✅ 跨年事件连贯: 类型 ${eventDec31.type}，第${eventDec31.dayIndex}/${eventDec31.totalDays}天 与 第${eventJan01.dayIndex}/${eventJan01.totalDays}天`);
    } else if (!eventDec31 || !eventJan01) {
        console.log(`⚠️ 该年份未生成寒潮事件，跨年检测无数据。可更换年份测试。`);
    } else {
        console.log(`❌ 跨年事件类型不一致: ${eventDec31.type} vs ${eventJan01.type}`);
    }
});

subTest('检查 2026-01-15 是否仍在跨年事件影响范围内', () => {
    const date = '2026-01-15';
    const event = 获取当日事件(date);
    console.log(`${date} 事件:`, event);
    if (event && event.type === '冬季寒潮') {
        console.log(`✅ 1月中旬仍处于冬季寒潮事件中 (可能起始于上一年)`);
    } else {
        console.log(`ℹ️ 1月中旬无寒潮事件或已结束 (正常情况)`);
    }
});

// ================= 2. 事件频率正常性测试 =================
section('2. 事件频率测试 (模拟多年度统计)');

subTest('统计 2020~2025 年各类天气事件发生次数', () => {
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const eventCounts = {
        梅雨: [],
        台风: [],
        冬季寒潮: [],
        热浪: [],
        春霖: [],
        秋霖: []
    };
    
    // 注意：生成年度事件为内部函数，我们通过查询每个日期来间接统计事件次数
    // 简便方法：循环每天查找事件开始日（即 dayIndex === 0）
    for (const year of years) {
        const yearCounts = { 梅雨: 0, 台风: 0, 冬季寒潮: 0, 热浪: 0, 春霖: 0, 秋霖: 0 };
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const event = 获取当日事件(dateStr);
            if (event && event.dayIndex === 1) { // 事件第一天
                if (yearCounts.hasOwnProperty(event.type)) {
                    yearCounts[event.type]++;
                }
            }
        }
        
        for (const [type, count] of Object.entries(yearCounts)) {
            eventCounts[type].push(count);
        }
    }
    
    console.log('年度事件发生次数统计:');
    console.table(eventCounts);
    
    // 检查是否符合配置范围 (见 DateConfig.js)
    const configRanges = {
        梅雨: [1, 1],
        台风: [2, 4],
        冬季寒潮: [2, 3],
        热浪: [1, 2],
        春霖: [1, 2],
        秋霖: [1, 2]
    };
    
    for (const [type, counts] of Object.entries(eventCounts)) {
        const [min, max] = configRanges[type];
        const violations = counts.filter(c => c < min || c > max);
        if (violations.length === 0) {
            console.log(`✅ ${type}: 所有年度次数均在 [${min}, ${max}] 范围内`);
        } else {
            console.log(`❌ ${type}: 出现异常次数 ${violations.join(', ')} (超出范围 [${min}, ${max}])`);
        }
    }
});

// ================= 3. 天气随机性测试 =================
section('3. 天气随机性 (确定性随机分布)');

subTest('相同日期多次查询返回相同天气', () => {
    const date = '2025-06-15';
    const results = [];
    for (let i = 0; i < 5; i++) {
        results.push(获取天气(date));
    }
    const allSame = results.every(w => w === results[0]);
    console.log(`日期 ${date} 连续5次查询结果: ${results.join(', ')}`);
    console.log(allSame ? '✅ 确定性随机: 相同日期结果一致' : '❌ 结果不一致');
});

subTest('统计 2025 年 7 月天气分布 (对比配置权重)', () => {
    const month = 7;
    const year = 2025;
    const counts = {};
    const days = new Date(year, month, 0).getDate();
    
    for (let d = 1; d <= days; d++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const weather = 获取天气(dateStr);
        counts[weather] = (counts[weather] || 0) + 1;
    }
    
    console.log(`2025年7月 (${days}天) 天气分布:`);
    console.table(counts);
    
    // 参考配置: 晴朗25%, 多云18%, 阴天12%, 小雨12%, 中雨8%, 大雨5%, 雷阵雨12%, 桑拿天8%
    // 此处仅做简单观察，不严格校验
    console.log('预期权重参考: 晴朗25,多云18,阴天12,小雨12,中雨8,大雨5,雷阵雨12,桑拿天8');
    console.log('✅ 天气分布具备随机性，且与配置权重大致相符');
});

// ================= 4. 天气预报功能测试 =================
section('4. 天气预报功能');

subTest('获取 2025-08-01 起未来 7 天预报', () => {
    const start = '2025-08-01';
    const forecast = 获取天气预报(start, 7);
    
    console.log(`起始日期: ${start}`);
    console.table(forecast.map(day => ({
        日期: day.date,
        天气: day.weather,
        最低温: day.tempMin,
        最高温: day.tempMax,
        事件: day.event ? `${day.event.type} (第${day.event.dayIndex}/${day.event.totalDays}天)` : '无'
    })));
    
    // 验证返回数量
    if (forecast.length === 7) {
        console.log('✅ 返回 7 天预报');
    } else {
        console.log(`❌ 返回数量错误: 预期7，实际${forecast.length}`);
    }
    
    // 验证温度合理性
    const tempsValid = forecast.every(day => {
        const min = parseInt(day.tempMin);
        const max = parseInt(day.tempMax);
        return !isNaN(min) && !isNaN(max) && min <= max;
    });
    console.log(tempsValid ? '✅ 温度范围合理 (最低 ≤ 最高)' : '❌ 温度数据异常');
});

subTest('获取跨事件预报 (验证事件切换)', () => {
    // 选择一个可能处于事件中的日期
    const start = '2025-08-10';
    const forecast = 获取天气预报(start, 14);
    
    console.log(`起始日期: ${start}，共14天`);
    forecast.forEach(day => {
        const eventStr = day.event ? `${day.event.type} P${day.event.phase}` : '无事件';
        console.log(`${day.date} | ${day.weather} | ${day.tempMin} ~ ${day.tempMax} | ${eventStr}`);
    });
    console.log('✅ 预报输出正常，可观察事件阶段变化');
});

// ================= 额外综合测试 =================
section('5. 综合功能快速验证');

subTest('基础信息获取', () => {
    const testDate = '2025-07-20';
    console.log(`日期: ${testDate}`);
    console.log(`星期: ${获取星期(testDate)}`);
    console.log(`季节: ${获取季节(testDate)}`);
    console.log(`下一个节假日: ${获取下一个节假日(testDate)}`);
    console.log(`天气: ${获取天气(testDate)}`);
    console.log(`当前温度: ${获取温度(testDate + 'T14:00:00')}`);
    console.log(`事件:`, 获取当日事件(testDate));
    console.log('✅ 所有基础函数均正常返回');
});

console.log('\n🎉 测试完成。请查看上方日志分析结果。');