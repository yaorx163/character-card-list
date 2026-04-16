import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

// 简单的哈希函数
function simpleHash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash);
}

function 获取季节(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1; // 0-11 -> 1-12

  if (month >= 3 && month <= 5) return 'spring';      // 春季: 3-5月
  if (month >= 6 && month <= 8) return 'summer';      // 夏季: 6-8月
  if (month >= 9 && month <= 11) return 'autumn';     // 秋季: 9-11月
  return 'winter';                                    // 冬季: 12-2月
}

function 随机天气(dateTime, customDistribution = null) {
  const dateStr = new Date(dateTime).toISOString().split('T')[0]
  const hashValue = simpleHash(dateStr);
  const season = 获取季节(dateStr);

  // 默认天气分布（使用相对权重，无需总和为100）
  const defaultDistributions = {
    // 春季（3-5月）
    spring: [
      { type: '晴朗', weight: 40 },
      { type: '多云', weight: 25 },
      { type: '阴天', weight: 15 },
      { type: '小雨', weight: 8 },
      { type: '中雨', weight: 3 },
      { type: '雷阵雨', weight: 2 },
      { type: '沙尘', weight: 4 },
      { type: '浮尘', weight: 1 },
      { type: '大风', weight: 2 },
    ],

    // 夏季（6-8月）
    summer: [
      { type: '晴朗', weight: 30 },
      { type: '多云', weight: 20 },
      { type: '阴天', weight: 10 },
      { type: '小雨', weight: 10 },
      { type: '中雨', weight: 8 },
      { type: '大雨', weight: 5 },
      { type: '雷阵雨', weight: 8 },
      { type: '暴雨', weight: 3 },
      { type: '大暴雨', weight: 1 },
      { type: '桑拿天', weight: 3 },
      { type: '台风', weight: 1 },
    ],

    // 秋季（9-11月）
    autumn: [
      { type: '晴朗', weight: 50 },
      { type: '多云', weight: 25 },
      { type: '阴天', weight: 10 },
      { type: '小雨', weight: 8 },
      { type: '中雨', weight: 4 },
      { type: '雾', weight: 2 },
      { type: '大雾', weight: 1 },
    ],

    // 冬季（12-2月）
    winter: [
      { type: '晴朗', weight: 35 },
      { type: '多云', weight: 25 },
      { type: '阴天', weight: 20 },
      { type: '小雪', weight: 8 },
      { type: '中雪', weight: 3 },
      { type: '大雪', weight: 1 },
      { type: '雨夹雪', weight: 2 },
      { type: '冻雨', weight: 1 },
      { type: '雾', weight: 3 },
      { type: '雾凇', weight: 1 },
      { type: '大雾', weight: 1 },
    ]
  };

  // 使用自定义分布或默认分布
  const distribution = customDistribution || defaultDistributions[season];

  // 计算总权重
  const totalWeight = distribution.reduce((sum, w) => sum + w.weight, 0);

  // 生成随机数（基于哈希值，确保相同日期相同结果）
  const randomValue = (hashValue % 10000) / 10000; // 0-0.9999
  const targetWeight = randomValue * totalWeight;

  // 根据权重选择天气
  let accumulatedWeight = 0;
  for (const weather of distribution) {
    accumulatedWeight += weather.weight;
    if (targetWeight < accumulatedWeight) {
      return weather.type;
    }
  }

  // 如果由于浮点数误差没有匹配到，第一个
  return distribution[0].type;
}

function 获取温度(dateTime) {
  const date = new Date(dateTime);
  const dateStr = date.toISOString().split('T')[0];
  const hour = date.getHours(); // 获取小时 (0-23)

  const weather = 随机天气(dateStr);
  const season = 获取季节(dateStr);
  const hashValue = simpleHash(dateStr);

  // 基础温度范围（摄氏度，根据季节调整）
  const tempRanges = {
    spring: { min: 5, max: 25 },
    summer: { min: 20, max: 35 },
    autumn: { min: 10, max: 25 },
    winter: { min: -10, max: 10 }
  };

  // 根据天气调整温度范围
  const weatherTempAdjustments = {
    '晴朗': { minAdj: 2, maxAdj: 5, amplitudeAdj: 1.5 }, // 晴朗天气昼夜温差大
    '多云': { minAdj: 0, maxAdj: 0, amplitudeAdj: 1.0 },
    '阴天': { minAdj: -1, maxAdj: -2, amplitudeAdj: 0.5 }, // 阴天气温变化小
    '小雨': { minAdj: -1, maxAdj: -3, amplitudeAdj: 0.3 },
    '中雨': { minAdj: -2, maxAdj: -4, amplitudeAdj: 0.2 },
    '大雨': { minAdj: -2, maxAdj: -5, amplitudeAdj: 0.1 },
    '雷阵雨': { minAdj: -1, maxAdj: -3, amplitudeAdj: 0.4 },
    '暴雨': { minAdj: -2, maxAdj: -4, amplitudeAdj: 0.1 },
    '小雪': { minAdj: -3, maxAdj: -8, amplitudeAdj: 0.8 },
    '中雪': { minAdj: -5, maxAdj: -10, amplitudeAdj: 0.5 },
    '大雪': { minAdj: -8, maxAdj: -15, amplitudeAdj: 0.3 },
    '雾': { minAdj: -1, maxAdj: -1, amplitudeAdj: 0.2 },
    '大雾': { minAdj: -1, maxAdj: -1, amplitudeAdj: 0.1 },
    // 其他天气类型的默认调整
    'default': { minAdj: 0, maxAdj: 0, amplitudeAdj: 1.0 }
  };

  // 根据小时计算温度变化曲线
  // 使用正弦函数模拟一天中的温度变化，峰值在下午2-3点，谷值在凌晨5-6点
  function getHourlyTemperatureMultiplier(hour) {
    // 将小时转换为弧度 (0-2π)
    // 峰值在14点(下午2点)，谷值在5点(凌晨5点)
    const hourRad = (hour - 5) * (2 * Math.PI / 24); // 以凌晨5点为起点

    // 使用正弦函数，调整相位使得峰值在下午，谷值在凌晨
    // 温度在5点最低，14点最高
    const baseValue = Math.sin(hourRad);

    // 将正弦值从[-1, 1]映射到[0, 1]作为温度系数
    const multiplier = (baseValue + 1) / 2;

    return multiplier;
  }

  const range = tempRanges[season];
  const adjustment = weatherTempAdjustments[weather] || weatherTempAdjustments['default'];

  // 计算日最低温和最高温
  const dailyMin = range.min + adjustment.minAdj;
  const dailyMax = range.max + adjustment.maxAdj;

  // 计算温度变化幅度（根据天气调整）
  let amplitude = (dailyMax - dailyMin) * adjustment.amplitudeAdj;
  amplitude = Math.max(2, Math.min(amplitude, dailyMax - dailyMin)); // 限制在合理范围内

  // 重新计算实际的最小值和最大值
  const effectiveMin = dailyMin;
  const effectiveMax = dailyMin + amplitude;

  // 基于日期哈希值生成温度基准（用于确定具体某一天的温度水平）
  const tempSeed = (hashValue % 100) / 100; // 0-1
  const dailyBaseTemp = effectiveMin + tempSeed * (effectiveMax - effectiveMin);

  // 获取小时温度系数
  let hourlyMultiplier = getHourlyTemperatureMultiplier(hour);

  // 根据季节调整曲线形状
  let curveAdjustment = 0;
  switch (season) {
    case 'summer':
      // 夏季夜间温度也较高
      if (hour >= 22 || hour < 6) {
        hourlyMultiplier = Math.max(0.3, hourlyMultiplier); // 夜间温度不低于30%
      }
      break;
    case 'winter':
      // 冬季温度变化相对平缓
      if (hour >= 22 || hour < 6) {
        hourlyMultiplier = Math.min(0.4, hourlyMultiplier); // 夜间温度不高于40%
      }
      curveAdjustment = -0.1; // 整体温度稍低
      break;
    case 'spring':
    case 'autumn':
      // 春秋季温度变化适中
      if (hour >= 22 || hour < 6) {
        hourlyMultiplier = Math.max(0.25, Math.min(0.45, hourlyMultiplier));
      }
      break;
  }

  // 计算最终温度
  let temperature = dailyBaseTemp;

  // 根据小时调整温度
  if (hour >= 6 && hour <= 18) {
    // 白天：温度随太阳升高
    temperature += (hourlyMultiplier - 0.5) * amplitude;
  } else {
    // 夜间：温度随太阳降低
    temperature += (hourlyMultiplier - 0.5) * amplitude * 0.7; // 夜间变化幅度较小
  }

  // 加上曲线调整
  temperature += curveAdjustment * amplitude;

  // 根据天气的特殊调整
  if (weather.includes('雨') || weather.includes('雪')) {
    // 雨雪天气夜间降温不明显
    if (hour >= 18 || hour < 6) {
      temperature += 2;
    } else {
      // 雨雪天气白天升温不明显
      temperature -= 1;
    }
  }

  // 确保温度在合理范围内
  temperature = Math.max(effectiveMin - 3, Math.min(effectiveMax + 2, temperature));

  return Math.round(temperature) + '°C';
}

const 蚀刻 = z.object({
    时间: z.iso.datetime({ local: true, offset: true }).prefault("1995-03-07T18:00:00"),
    轮回轮次: z.number().int(),
    记忆深刻程度: z.number(),
    高潮强度: z.number(),
    蚀刻强度: z.number(),
    蚀刻事件: z.string(),
    蚀刻记忆: z.string(),
    蚀刻影响: z.array(z.string()),
})

export const Schema = z.object({
    时间: z.iso.datetime({ local: true, offset: true }).prefault("1995-03-07T18:00:00"),
    轮回次数: z.number().int().prefault(1),
    未轮回的蚀刻: z.array(蚀刻).prefault([]),
    _已生效的蚀刻: z.array(蚀刻).prefault([]),
  }).transform(data => ({
    时间: data.时间,
    _天气: 随机天气(data.时间),
    _温度: 获取温度(data.时间),
    轮回次数: data.轮回次数,
    未轮回的蚀刻: data.未轮回的蚀刻
      .filter((item) => item.轮回轮次 === data.轮回次数),
    _已生效的蚀刻: [
      ...data._已生效的蚀刻,
      ...data.未轮回的蚀刻
        .filter((item) => item.轮回轮次 !== data.轮回次数)
      ]
  }));

$(() => {
  registerMvuSchema(Schema);
});