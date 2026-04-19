# Merry App 缺失图片生成任务

## 风格参考（必须严格匹配）

现有图片风格特征：
- **卡通风格**：可爱、圆润的卡通形象（类似儿童绘本风格）
- **线条**：深色描边轮廓线（棕色或深灰色），线条粗度约2-3px
- **色彩**：饱和度中等偏高，温暖友好的配色
- **表情**：微笑、友善的表情，大眼睛，粉色腮红
- **背景**：纯白色背景（#FFFFFF），无任何背景元素
- **阴影**：底部有轻微的灰色投影（表示站在地面上）
- **角度**：正面或3/4侧面，面朝观众
- **比例**：角色/物品占画面70-80%，四周留白
- **无文字**：图片上不带任何文字、标签、水印

## 技术规格

- 尺寸：**512×512 像素**（App中会缩放到80×80显示）
- 格式：**PNG**（透明背景或白色背景）
- 命名：全小写英文，空格用下划线，如 `pig.png`
- 存放路径：`/Users/shenyoujuan/Merry_Data/PhD research/09_App开发/代码/assets/images/`

## 参考图片

请先查看以下现有图片，确保新生成的图片与它们风格一致：
- `bear.png` — 穿蓝色卫衣的棕色小熊，微笑招手
- `cat.png` — 橙色条纹猫咪，正面坐着，微笑腮红
- `milk.png` — 卡通牛奶杯+牛奶盒，有可爱表情

## 需要生成的图片清单

### 高优先级（听力排序题直接需要）

| 文件名 | 内容描述 | 生成提示词 |
|--------|---------|-----------|
| `pig.png` | 一只粉色可爱卡通小猪，圆滚滚的身体，正面微笑，粉色腮红 | A cute cartoon pink pig, round body, front-facing, smiling with pink blush on cheeks, brown outline, white background, children's book illustration style, 512x512 |
| `nose.png` | 一个可爱的卡通鼻子图标，简洁明了 | A cute cartoon nose icon, simple and clear, soft skin color, brown outline, white background, children's book style, 512x512 |
| `mouth.png` | 一个可爱的卡通嘴巴/嘴唇图标，微笑状态 | A cute cartoon smiling mouth/lips icon, red-pink color, brown outline, white background, children's book style, 512x512 |
| `ear.png` | 一个可爱的卡通耳朵图标 | A cute cartoon human ear icon, soft skin color, simple design, brown outline, white background, children's book style, 512x512 |
| `eye.png` | 一个可爱的卡通大眼睛图标，闪亮有神 | A cute cartoon big eye icon, sparkling, with eyelashes, brown outline, white background, children's book style, 512x512 |
| `meat.png` | 一块可爱的卡通肉排/牛排，带有卡通表情 | A cute cartoon piece of meat/steak on a plate, with a small cute face, brown outline, white background, children's book style, 512x512 |
| `jump.png` | 一个正在跳跃的可爱卡通小孩 | A cute cartoon kid jumping happily in the air, arms up, brown outline, white background, children's book style, 512x512 |

### 中优先级（阅读和写作题需要）

| 文件名 | 内容描述 | 生成提示词 |
|--------|---------|-----------|
| `leg.png` | 一条可爱的卡通腿/脚图标 | A cute cartoon leg and foot icon, simple design, brown outline, white background, children's book style, 512x512 |
| `kid.png` | 一个可爱的卡通小孩，挥手打招呼 | A cute cartoon child waving hello, school uniform, big eyes, smile, brown outline, white background, children's book style, 512x512 |
| `fruit.png` | 一篮可爱的卡通水果（苹果、香蕉、橙子） | A cute cartoon fruit basket with apple banana and orange, each with cute faces, brown outline, white background, children's book style, 512x512 |
| `breakfast.png` | 一份可爱的卡通早餐（鸡蛋、面包、牛奶） | A cute cartoon breakfast set with fried egg, toast and milk glass, each with cute faces, brown outline, white background, children's book style, 512x512 |
| `lunch.png` | 一份可爱的卡通午餐（米饭、菜） | A cute cartoon lunch tray with rice and vegetables, with cute faces, brown outline, white background, children's book style, 512x512 |
| `dinner.png` | 一份可爱的卡通晚餐（汤、鱼、米饭） | A cute cartoon dinner plate with soup, fish and rice, with cute faces, brown outline, white background, children's book style, 512x512 |
| `juice.png` | 一杯可爱的卡通果汁（橙色/黄色） | A cute cartoon glass of orange juice with a straw, with a cute face, brown outline, white background, children's book style, 512x512 |
| `room.png` | 一间可爱的卡通卧室（有床、椅子、桌子） | A cute cartoon bedroom with bed, chair and desk, cozy and simple, brown outline, white background, children's book style, 512x512 |
| `picture.png` | 一幅可爱的卡通画框/图画 | A cute cartoon picture frame with a simple drawing inside, brown outline, white background, children's book style, 512x512 |

### 低优先级（如果时间允许）

| 文件名 | 内容描述 | 生成提示词 |
|--------|---------|-----------|
| `wear.png` | 一个正在穿衣服的卡通小孩 | A cute cartoon kid putting on a shirt, brown outline, white background, children's book style, 512x512 |
| `clock.png` | 已存在，跳过 | — |
| `time.png` | 一个可爱的卡通闹钟 | A cute cartoon alarm clock with a cute face, showing 7:00, brown outline, white background, children's book style, 512x512 |
| `play.png` | 正在玩耍的卡通小孩 | A cute cartoon kid playing with a ball, happy, brown outline, white background, children's book style, 512x512 |
| `read.png` | 已存在reading.png，可跳过或重新生成 | — |

## 统一后缀提示词（加在每个提示词后面）

```
Style: kawaii cute cartoon, children's book illustration, clean brown outlines,
soft rounded shapes, white/transparent background, no text, no watermark,
warm and friendly colors, suitable for 8-9 year old children's English learning app.
512x512 pixels, PNG format.
```

## 完成后检查

生成完毕后，请确认：
1. 所有图片尺寸为 512×512
2. 所有图片为PNG格式
3. 背景为白色或透明
4. 风格与现有 bear.png / cat.png / milk.png 一致
5. 没有任何文字或水印
6. 文件名全小写，与上表一致
