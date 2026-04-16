// === 02_Weather: 天气与温度计算逻辑 ===
    // 获取依赖
    var dateConfig = window.parent.MODS.Config;

    // 私有工具函数
    function simpleHash(str) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        return Math.abs(hash);
    }

    function 获取季节(dateStr) {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        return dateConfig.月份季节映射[month];
    }

    // 公开接口
    var Weather = {
        随机天气: function(dateTime, customDistribution = null) {
            const dateStr = new Date(dateTime).toISOString().split('T')[0]
            const hashValue = simpleHash(dateStr);
            const season = 获取季节;

            const distribution = customDistribution || dateConfig.默认天气分布配置[season];
            const totalWeight = distribution.reduce((sum, w) => sum + w.weight, 0);
            const randomValue = (hashValue % 10000) / 10000;
            const targetWeight = randomValue * totalWeight;

            let accumulatedWeight = 0;
            for (const weather of distribution) {
                accumulatedWeight += weather.weight;
                if (targetWeight < accumulatedWeight) {
                    return weather.type;
                }
            }
            return distribution[0].type;
        },

        获取温度: function(dateTime) {
            const date = new Date(dateTime);
            const dateStr = date.toISOString().split('T')[0];
            const hour = date.getHours();

            const weather = Weather.随机天气(dateStr);
            const season = 获取季节;
            const hashValue = simpleHash(dateStr);

            const range = dateConfig.季节温度范围配置[season];
            const adjustment = dateConfig.天气温度调整配置[weather] || dateConfig.天气温度调整配置['default'];
            const 系数 = dateConfig.温度计算系数;

            const dailyMin = range.min + adjustment.minAdj;
            const dailyMax = range.max + adjustment.maxAdj;

            const 最小振幅 = 系数.振幅限制.最小振幅;
            let amplitude = (dailyMax - dailyMin) * adjustment.amplitudeAdj;
            amplitude = Math.max(最小振幅, Math.min(amplitude, dailyMax - dailyMin));

            const effectiveMin = dailyMin;
            const effectiveMax = dailyMin + amplitude;

            const tempSeed = (hashValue % 100) / 100;
            const dailyBaseTemp = effectiveMin + tempSeed * (effectiveMax - effectiveMin);

            function getHourlyTemperatureMultiplier(h) {
                const hourRad = (h - 5) * (2 * Math.PI / 24);
                return (Math.sin(hourRad) + 1) / 2;
            }

            let hourlyMultiplier = getHourlyTemperatureMultiplier(hour);
            let curveAdjustment = 0;

            switch (season) {
                case 'summer':
                    if (hour >= 22 || hour < 6) hourlyMultiplier = Math.max(系数.夏季.夜间最低系数, hourlyMultiplier);
                    curveAdjustment = 系数.夏季.曲线调整;
                    break;
                case 'winter':
                    if (hour >= 22 || hour < 6) hourlyMultiplier = Math.min(系数.冬季.夜间最高系数, hourlyMultiplier);
                    curveAdjustment = 系数.冬季.曲线调整;
                    break;
                case 'spring':
                case 'autumn':
                    if (hour >= 22 || hour < 6) hourlyMultiplier = Math.max(系数.春秋季.夜间最低系数, Math.min(系数.春秋季.夜间最高系数, hourlyMultiplier));
                    curveAdjustment = 系数.春秋季.曲线调整;
                    break;
            }

            let temperature = dailyBaseTemp;
            if (hour >= 6 && hour <= 18) {
                temperature += (hourlyMultiplier - 0.5) * amplitude;
            } else {
                temperature += (hourlyMultiplier - 0.5) * amplitude * 系数.夜间振幅衰减;
            }
            temperature += curveAdjustment * amplitude;

            if (weather.includes('雨') || weather.includes('雪')) {
                if (hour >= 18 || hour < 6) {
                    temperature += 系数.雨雪天气.夜间升温;
                } else {
                    temperature += 系数.雨雪天气.白天降温;
                }
            }

            const 最终下限 = effectiveMin - 系数.振幅限制.下限容差;
            const 最终上限 = effectiveMax + 系数.振幅限制.上限容差;
            temperature = Math.max(最终下限, Math.min(最终上限, temperature));

            return Math.round(temperature) + '°C';
        }
    };

    window.parent.MODS.register('Weather', Weather);
