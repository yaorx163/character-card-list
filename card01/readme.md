获取星期(dateInput, config = userDateConfig): { name: string, desc: string }
获取节日(dateInput, config = userDateConfig): { name: string, desc: string, daysUntil: number }
获取季节(dateInput, config = userDateConfig): { name: string, desc: string }
获取天气(dateInput, config = userDateConfig): { name: string, desc: string }
获取温度(dateInput, config = userDateConfig): number
获取当日事件(dateInput, config = userDateConfig): [{ 
        name: string,
        阶段: string,
        当前天数: number,
        持续天数: number,
        desc: string,
        标签: [string],   // 如"自然灾害"、"持续性降水"
        优先级: number,
    };]
获取指定类型事件(dateInput, type, config = userDateConfig): [{ 
        name: string,
        阶段: string,
        当前天数: number,
        持续天数: number,
        desc: string,
        标签: [string],
        优先级: number,
    };]
获取天气预报(dateInput, days, config = userDateConfig): [{ 
            date: {
                year: number,          // number
                month: number,         // 1-12
                day: number,           // 归后的合法日期 1-maxDay
                weekday: number,       // 0=周日, 1=周一, ..., 6=周六
            }
            weather, 
            tempMin: minTemp, 
            tempMax: maxTemp, 
            event: eventInfo 
        }]