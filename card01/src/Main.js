import {Weather} from './DateConfig.js';
import {DateUtils} from './DateUtils.js'


const Schema = z.object({
    时间: z.string().datetime({ local: true, offset: true }).default("2010-04-01T06:00:00"),
}).transform(data => {
    // ... 同上
});

console.log(Weather)
console.log(DateUtils)

$(() => {
    try {
        console.log('[MvuEntry] 天气与日期 Schema 注册成功！');
    } catch(e) {
        console.error('[MvuEntry] Schema 注册失败:', e);
    }
});