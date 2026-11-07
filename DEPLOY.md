# 部署指引：恋爱坐标 → 腾讯云 EdgeOne Pages

## 前置说明

本项目是纯静态站点（React SPA），构建产物在 `dist/` 目录，无需后端、无需数据库。

EdgeOne Pages 提供长期免费套餐：不限量安全加速流量、40 个项目、构建 500 次/月，免费域名格式为 `*.edgeone.pages.dev`。

> 注意：免费域名 `*.edgeone.pages.dev` 走全球边缘节点，**国内访问一般可用，但不保证稳定**；若要开启中国大陆加速节点，需要已备案的自定义域名。第一阶段先用免费域名上线验证，不购买域名、不备案。

## 方式一：Git 连接部署（推荐，最省事）

1. 将本项目推送到 GitHub 仓库（需要一个 GitHub 账号）：
   ```bash
   git remote add origin https://github.com/<你的用户名>/love-compass.git
   git push -u origin master
   ```
2. 打开 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)。
3. 首次使用点「开通」免费套餐（一键开通）。
4. 选择「连接 Git 仓库」→ 授权 GitHub → 选择刚推送的仓库。
5. 构建配置（本项目已通过根目录 `vite.config.ts` 和 `package.json` 识别，通常零配置即可）：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
   - 安装命令：`npm install`
6. 点击「部署」，等待构建完成，即可获得 `https://<项目名>.edgeone.pages.dev` 访问地址。

## 方式二：CLI 部署（无需 GitHub）

EdgeOne Pages 支持 CLI 部署，可直接在本地把构建产物发布上去：

```bash
# 构建
npm run build

# 使用 EdgeOne Pages CLI（需先登录）
npx edgeone-pages-cli deploy
```

> CLI 首次使用需要登录腾讯云账号。详细命令以 EdgeOne Pages 官方文档为准。

## 方式三：拖拽上传

部分版本的 EdgeOne Pages 控制台支持直接上传 `dist/` 目录产物部署。登录控制台后选择「上传」即可。

## 部署后验证清单

- [ ] 手机浏览器打开免费域名，正常显示首页
- [ ] 完整答完 20 题，生成结果页
- [ ] 五维雷达图正常显示
- [ ] 点击「生成分享卡片」能下载 PNG
- [ ] 微信内置浏览器打开无横向溢出、文字不裁切
- [ ] 控制台无报错

## 回滚方法

- Git 方式：在控制台选择历史部署记录，点击「回滚」即可。
- 重新部署：修改代码后重新 push，EdgeOne Pages 会自动触发构建。

## 构建命令速查

```bash
npm install        # 安装依赖
npm run dev        # 本地开发 http://localhost:5173
npm run build      # 生产构建，产物在 dist/
npm run preview    # 本地预览构建产物
npx playwright test  # 自动化测试
```
