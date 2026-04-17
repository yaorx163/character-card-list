async function git_function(function_name) {
    const promiseObj = getWorldbook(getCharWorldbookNames()?.primary)
    const entries = await promiseObj;
    const filtered = entries.filter(s => s.name === function_name);
    const func = new Function(filtered[0].content)
    return func()
}

const 基础信息 = z.object({
    name: z.string().default(''),
    desc: z.string().default(''),
})

const 节日信息 = z.object({
    name: z.string().default(''),
    desc: z.string().default(''),
    daysUntil: z.number().default(-1),
})

/**
 * 日历配置(): config
 * 欲望详情(): {背德:欲望状态[],应激情绪:欲望状态[],责任转移:欲望状态[],被欲望验证:欲望状态[]}
 * 等级范围(): [
        { max: 20, label: "极低" },
        { max: 40, label: "较低" },
        { max: 60, label: "中等" },
        { max: 80, label: "较高" },
        { max: Infinity, label: "极高" } 
    ];
 */
const [utilsModule, 日历配置, 欲望详情, 等级范围] = await Promise.all([
    git_function('DateUtils.js'),
    git_function('DateConfig.js'),
    git_function('CharacterStatus.js'),
    git_function('CharacterConfig.js'),
]);
/*
获取天气():基础信息
获取节日():{ ...基础信息, daysUntil: number}
获取季节():基础信息
获取温度():number
获取当日事件():基础信息[]
获取指定类型事件():基础信息[]
*/
const { 获取天气, 获取温度, 获取节日 ,获取季节, 获取当日事件, 获取指定类型事件 } = utilsModule;

const 欲望详情value = 欲望详情();

function 获取欲望状态(欲望数值) {
    if (!欲望数值) return {};


    const 获取等级标签 = (num) => 等级范围.find(r => num < r.max)?.label || "未知";

    const 详情数据 = 欲望详情value;
    const 最终结果 = {};

    for (const 分类名 in 欲望数值) {
        const 分类数值 = 欲望数值[分类名];
        const 主动寻求 = 分类数值?.主动寻求;
        const 被动接受 = 分类数值?.被动接受;

        const 主动等级 = Math.min(主动寻求, 被动接受); // 被动难以接受的情况下却主动寻求，是完全不合逻辑的


        const 当前状态模板 = {
            主动寻求: 获取等级标签(主动等级),
            被动接受: 获取等级标签(被动接受),
            行为惯性: 获取等级标签(分类数值?.行为惯性),
        };

        const 当前详情列表 = 详情数据[分类名] || [];

        const 默认状态 = { 欲望类型: 分类名, 主动寻求: "未知", 被动接受: "未知", 行为惯性: "未知", 描述: "未知", 示例: [] };
        最终结果[分类名] = 当前详情列表.find(详情项 => {
            return 详情项.主动寻求 === 当前状态模板.主动寻求 &&
                详情项.被动接受 === 当前状态模板.被动接受 &&
                详情项.行为惯性 === 当前状态模板.行为惯性;
        }) || 默认状态;
    }

    return 最终结果;
}

const 蚀刻合成表原始 = [
    { 配方: ["背德印记·初", "背德印记·初", "背德印记·初"], 结果: "背德印记·中", 描述: "3个初级背德印记合成中级" },
    { 配方: ["背德印记·初", "背德印记·初"], 结果: "背德催化", 描述: "2个初级背德印记可以合成催化剂" },
    { 配方: ["应激印记·初", "应激印记·初"], 结果: "应激催化", 描述: "2个初级应激印记可以合成催化剂" },
    { 配方: ["责任印记·初", "责任印记·初"], 结果: "责任催化", 描述: "2个初级责任印记可以合成催化剂" },
    { 配方: ["背德印记·中", "背德催化"], 结果: "背德深化", 描述: "中级背德印记与催化剂合成深化" },
    { 配方: ["背德深化", "应激印记·初", "应激印记·初", "责任印记·初", "责任印记·初", "验证印记·初", "验证印记·初"], 结果: "全面腐化", 描述: "背德深化加上各类印记合成终极蚀刻" }
];

const 预处理合成表 = (() => {
    // 1. 转换配方格式：数组 -> 计数Map，避免运行时重复计算
    const 转换后配方 = 蚀刻合成表原始.map(item => {
        const 材料计数 = {};
        item.配方.forEach(m => 材料计数[m] = (材料计数[m] || 0) + 1);
        return { 材料计数, 结果: item.结果 };
    });

    // 2. 计算拓扑层级（利用DAG特性，确保合成顺序永远正确）
    const 层级 = {};
    const 产物集 = new Set(转换后配方.map(r => r.结果));

    // 基础材料（入度为0的源点）层级为0
    const 材料集 = new Set();
    转换后配方.forEach(r => Object.keys(r.材料计数).forEach(m => 材料集.add(m)));
    材料集.forEach(m => { if (!产物集.has(m)) 层级[m] = 0; });

    // 迭代推导产物层级 = max(输入材料层级) + 1
    let 更新 = true, 安全锁 = 0;
    while (更新 && 安全锁++ < 100) {
        更新 = false;
        for (const r of 转换后配方) {
            const 输入材料 = Object.keys(r.材料计数);
            if (输入材料.every(m => 层级[m] !== undefined)) {
                const 新层级 = Math.max(...输入材料.map(m => 层级[m])) + 1;
                if ((层级[r.结果] || 0) < 新层级) {
                    层级[r.结果] = 新层级;
                    更新 = true;
                }
            }
        }
    }

    // 3. 按层级排序：低层级优先，一趟遍历即可完成所有递归合成
    转换后配方.sort((a, b) => (层级[a.结果] || 0) - (层级[b.结果] || 0));

    return 转换后配方;
})();

export function 自动合成蚀刻(蚀刻数组, 合成表) {
    // 1. 无序数组转哈希计数表 O(N)
    const 拥有计数 = {};
    for (let i = 0; i < 蚀刻数组.length; i++) {
        const 刻 = 蚀刻数组[i];
        拥有计数[刻] = (拥有计数[刻] || 0) + 1;
    }

    // 2. 按拓扑序一趟遍历合成 O(R×P)，R为配方数，P为最大材料种类
    // 不再需要 while 反复扫描！拓扑排序保证了前置材料一定先被处理
    for (const 配方 of 合成表) {
        // 计算当前材料能支持的最大合成次数（批量合成）
        let 可合成次数 = Infinity;
        for (const 材料名 in 配方.材料计数) {
            const 拥有 = 拥有计数[材料名] || 0;
            const 需要 = 配方.材料计数[材料名];
            可合成次数 = Math.min(可合成次数, (拥有 / 需要) | 0);
        }

        // 批量消耗材料并增加产物
        if (可合成次数 > 0) {
            for (const 材料名 in 配方.材料计数) {
                拥有计数[材料名] -= 配方.材料计数[材料名] * 可合成次数;
            }
            拥有计数[配方.结果] = (拥有计数[配方.结果] || 0) + 可合成次数;
        }
    }

    // 3. 哈希表还原为数组 O(N)
    const 结果数组 = [];
    for (const 名字 in 拥有计数) {
        const 数量 = 拥有计数[名字];
        for (let i = 0; i < 数量; i++) {
            结果数组.push(名字);
        }
    }

    return 结果数组;
}

function 计算蚀刻效果(蚀刻数组, 开启蚀刻效应) {
    const 结果 = {
        基础值总和: {
            背德: { 主动寻求: 0, 被动接受: 0, 行为惯性: 0 },
            应激情绪: { 主动寻求: 0, 被动接受: 0, 行为惯性: 0 },
            责任转移: { 主动寻求: 0, 被动接受: 0, 行为惯性: 0 },
            被欲望验证: { 主动寻求: 0, 被动接受: 0, 行为惯性: 0 }
        },
        系数总积: {
            背德: { 主动寻求: 1.0, 被动接受: 1.0, 行为惯性: 1.0 },
            应激情绪: { 主动寻求: 1.0, 被动接受: 1.0, 行为惯性: 1.0 },
            责任转移: { 主动寻求: 1.0, 被动接受: 1.0, 行为惯性: 1.0 },
            被欲望验证: { 主动寻求: 1.0, 被动接受: 1.0, 行为惯性: 1.0 }
        }
    };

    if (!开启蚀刻效应) return 结果;

    蚀刻数组.forEach(蚀刻名 => {
        const 配置 = 蚀刻配置表[蚀刻名];
        if (!配置) return;

        // 处理基础值
        if (配置.类型 === "基础值" || 配置.类型 === "混合") {
            const 基础值效果 = 配置.类型 === "基础值" ? 配置.效果 : 配置.基础值;
            for (const 维度 in 基础值效果) {
                for (const 属性 in 基础值效果[维度]) {
                    结果.基础值总和[维度][属性] += 基础值效果[维度][属性];
                }
            }
        }

        // 处理系数
        if (配置.类型 === "系数" || 配置.类型 === "混合") {
            const 系数效果 = 配置.类型 === "系数" ? 配置.效果 : 配置.系数;
            for (const 维度 in 系数效果) {
                for (const 属性 in 系数效果[维度]) {
                    结果.系数总积[维度][属性] *= 系数效果[维度][属性];
                }
            }
        }
    });

    return 结果;
}

function 计算角色欲望数值(角色基础数值, 角色基础系数, 蚀刻基础值总和, 蚀刻系数总积, 腐蚀度总和) {
    const 最终数值 = {
        背德: { 主动寻求: 0, 被动接受: 0, 行为惯性: 0 },
        应激情绪: { 主动寻求: 0, 被动接受: 0, 行为惯性: 0 },
        责任转移: { 主动寻求: 0, 被动接受: 0, 行为惯性: 0 },
        被欲望验证: { 主动寻求: 0, 被动接受: 0, 行为惯性: 0 }
    };

    for (const 维度 in 最终数值) {
        for (const 属性 in 最终数值[维度]) {

            const 基础值 = 角色基础数值[维度][属性];
            const 蚀刻基础值 = 蚀刻基础值总和[维度][属性];
            const 基础系数 = 角色基础系数[维度][属性];
            const 蚀刻系数 = 蚀刻系数总积[维度][属性];
            const 腐蚀度影响 = (() => {
                switch (属性) { 
                    case "主动寻求":
                        return 腐蚀度总和 * 0.0;
                    case "被动接受":
                        return 腐蚀度总和 * 0.5;
                    case "行为惯性":
                        return 腐蚀度总和 * 1;
                    default: 
                        return 0;
                }
            })();

            属性 === "行为惯性" ? 腐蚀度总和 : 0;

            最终数值[维度][属性] = (基础值 + 蚀刻基础值 + 腐蚀度影响) * 基础系数 * 蚀刻系数;
        }
    }

    return 最终数值;
}



const 欲望系数 = z.object({
    背德: z.object({
        主动寻求: z.number().default(1.0),
        被动接受: z.number().default(1.0),
        行为惯性: z.number().default(1.0),
    }),
    应激情绪: z.object({
        主动寻求: z.number().default(1.0),
        被动接受: z.number().default(1.0),
        行为惯性: z.number().default(1.0),
    }),
    责任转移: z.object({
        主动寻求: z.number().default(1.0),
        被动接受: z.number().default(1.0),
        行为惯性: z.number().default(1.0),
    }),
    被欲望验证: z.object({
        主动寻求: z.number().default(1.0),
        被动接受: z.number().default(1.0),
        行为惯性: z.number().default(1.0),
    }),
})

const 欲望数值 = z.object({
    背德: z.object({
        主动寻求: z.number().default(0.0),
        被动接受: z.number().default(0.0),
        行为惯性: z.number().default(0.0),
    }),
    应激情绪: z.object({
        主动寻求: z.number().default(0.0),
        被动接受: z.number().default(0.0),
        行为惯性: z.number().default(0.0),
    }),
    责任转移: z.object({
        主动寻求: z.number().default(0.0),
        被动接受: z.number().default(0.0),
        行为惯性: z.number().default(0.0),
    }),
    被欲望验证: z.object({
        主动寻求: z.number().default(0.0),
        被动接受: z.number().default(0.0),
        行为惯性: z.number().default(0.0),
    }),
})

const 欲望状态 = z.object({
    欲望类型: z.string().default(""),
    主动寻求: z.string().default(""),
    被动接受: z.string().default(""),
    行为惯性: z.string().default(""),
    描述: z.string().default(""),
    示例: z.array(z.string()).default([]),
})

const 角色 = z.object({
    $id: z.string(),
    角色名: z.string().default(''),
    $腐蚀度: z.array(z.number()).default([]),
    $蚀刻: z.array(z.string()).default([]),
    开启蚀刻效应: z.boolean().default(true),
    _欲望状态: z.object({
        背德: 欲望状态,
        应激情绪: 欲望状态,
        责任转移: 欲望状态,
        被欲望验证: 欲望状态,
    }),
    deleted: z.boolean().default(false),
    $参数: z.object({
        基础系数: 欲望系数,
        基础数值: 欲望数值,
    }),
    $前端: z.object({
        最终数值: 欲望数值,
        蚀刻分组: z.record(z.string(), z.number()).default({}),
    })
})

export const Schema = z.object({
    角色: z.array(角色).default([]),
    场景: z.object({
        时间: z.string().datetime({ local: true }).default("2010-04-01T06:00:00"),
        _天气: 基础信息.default({}),
        _温度: z.number().default(20.0),
        _季节: 基础信息.default({}),
        _节日: 节日信息.default({}),
        _自然事件: z.array(基础信息).default([]),
    }),
    玩家: z.object({
        _当前淫能: z.number().default(0.0),
        $已消耗淫能: z.array(z.number()).default([]),
    }),
}).transform(data => {
    const 合成表 = 预处理合成表
    const result = { ...data, 角色: data.角色.map(el => ({ ...el })) };
    const 腐蚀度和 = data.角色.reduce(
        (acc, cur) => acc + cur.$腐蚀度.reduce((a, b) => a + b, 0),
        0
    );
    const 消耗和 = data.玩家.$已消耗淫能.reduce((acc, cur) => acc + cur, 0);
    result.角色.forEach(element => {
        const 合成后蚀刻 = 自动合成蚀刻(element.$蚀刻, 合成表);
        const { 基础值总和, 系数总积 } = 计算蚀刻效果(合成后蚀刻, element.开启蚀刻效应);
        const 腐蚀度总和 = element.$腐蚀度.reduce((acc, cur) => acc + cur, 0);
        const 角色基础数值 = element.$参数.基础数值;
        const 角色基础系数 = element.$参数.基础系数;
        const 最终数值 = 计算角色欲望数值(角色基础数值, 角色基础系数, 基础值总和, 系数总积, 腐蚀度总和);
        element._欲望状态 = 获取欲望状态(最终数值)
        element.$前端.最终数值 = 最终数值;
        const 蚀刻分组 = 合成后蚀刻.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {});
        element.$前端.蚀刻分组 = 蚀刻分组;
    });
    const 时间 = result.场景.时间;
    result.场景._天气 = 获取天气(时间, 日历配置);
    result.场景._温度 = 获取温度(时间, 日历配置);
    result.场景._季节 = 获取季节(时间, 日历配置);
    result.场景._节日 = 获取节日(时间, 日历配置);
    result.场景._自然事件 = 获取当日事件(时间, 日历配置).map(({ name, desc }) => ({ name, desc }));
    return result;
});

$(() => {
    registerMvuSchema(Schema);
})
