# 恋爱坐标 Love Compass

> 你的婚恋市场定位是什么？

一款面向成年用户的免费趣味婚恋定位测试网页。通过 20 道生活场景题，帮助用户梳理自己的婚恋定位、择偶标准、个人优势和适配方向，最终生成一份可收藏、可分享的个人报告。

## 产品定位

- **不是**打分排名，**不是**判断婚恋条件高低
- **是**一份有趣、具体、值得收藏和分享的个人报告
- 纯前端实现，无需注册、无需后端、无需登录

## 技术栈

| 技术 | 用途 |
| --- | --- |
| React + TypeScript | 页面与业务逻辑 |
| Vite | 构建 |
| Tailwind CSS v4 | UI 样式 |
| 原生 SVG | 五维雷达图 |
| html-to-image | 生成分享卡片图片 |
| Playwright | 自动化测试 |

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 本地预览构建产物
npm run preview

# 运行自动化测试
npx playwright test
```

> 自动化测试使用系统已安装的 Chrome 运行（`playwright.config.ts` 中配置了 `channel: 'chrome'`）。若系统没有 Chrome，请先安装 Chrome，或改用 Playwright 内置 Chromium（需 `npx playwright install chromium`）。

## 项目结构

```
src/
  components/      通用组件（Logo、按钮、雷达图、分享卡片）
  pages/
    Home/          首页
    Quiz/          答题页
    Result/        结果页
    About/         关于页
  data/
    questions.ts   20 道题目 + 维度定义 + 选项评分
    results.ts     5 种定位的完整报告文案
  engine/
    scoring.ts     计分算法（维度归一化到 0~100）
    classifier.ts  分类器（五维得分 → 主/次定位）
    reportGenerator.ts  报告生成器（组合差异化文案）
  hooks/
    useQuiz.ts     答题状态管理（含 localStorage 持久化）
  utils/
    download.ts    图片下载工具
  types/
    index.ts       类型定义
  App.tsx          页面路由（phase 状态机）
  main.tsx         入口

tests/
  scoring.spec.ts  计分/分类/报告单元测试
  quiz.spec.ts     端到端流程测试

playwright.config.ts  Playwright 配置（mobile + desktop 双端）
```

## 计分与分类逻辑

1. **五个维度**：婚恋目标、择偶标准、自我认知、关系相处、现实适配，每个维度 4 道题。
2. **计分**：每题选项对五个维度分别产生 0~3 的分值，某维度 4 题得分求和后，除以该维度理论上限，归一化到 0~100。
3. **分类**：为五种定位各计算一个 0~1 的「匹配强度」（由多个维度加权组合，而非单一维度最高分），取最高者为**主定位**、次高者为**次定位**。并列时按固定顺序保证结果确定性。

五种定位：清醒筛选型、双向奔赴型、稳定经营型、感觉优先型、自我主导型。

> 五种定位无高低之分，测试仅供娱乐与自我探索，非心理诊断或婚恋价值评估。

## 隐私说明

- 不采集姓名、手机号、身份证等个人身份信息
- 答题进度仅保存在用户浏览器本地（localStorage），不上传服务器
- 用户可在「关于页」清除本地答题数据

## 部署

第一阶段使用免费静态托管方案（如腾讯云 EdgeOne Pages、GitHub Pages、Cloudflare Pages 等）。

```bash
npm run build
# 将 dist/ 目录部署到任意静态托管平台
```

构建产物为纯静态文件（`dist/`），无需后端。站点地址与部署平台配置独立管理，不写死在业务代码中。

## 已知问题与后续优化

- 分享卡片图片生成依赖 `html-to-image`，在部分旧浏览器或微信内置浏览器中可能受限，已做下载失败降级提示。
- 后续可接入匿名访问统计（页面访问、开始、完成、下载卡片等事件），需配置真实可用的统计服务。
