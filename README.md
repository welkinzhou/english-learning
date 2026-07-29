# 口语闯关 · 零基础英语口语学习工作台

从零基础到**公共英语三级（PETS-3）**的静态口语闯关工作台。手机全屏适配，可添加到桌面当 App 使用，**无需注册、完全离线、无广告**。

## 功能一览

| 模块 | 内容 |
|------|------|
| 每日打卡 | 音标练习 / 短句跟读 / 口语闯关 / 录音复盘 |
| 第1关 音标 | 完整 48 个国际音标（长/短/双元音 + 清/浊辅音） |
| 第2关 抢答 | 中英抢答，点击揭晓，含三级高频句 |
| 第3关 口语 | 即兴问答真题 + 参考答案 |
| 第4关 纠音 | sheep/ship 等易混发音对比 |
| 额外 | 每日金句、错题本、90天（12周）学习计划 |

学习进度使用 `localStorage` 持久化，手机浏览器重复打开可恢复打卡与掌握记录。

## 本地预览

用任意静态服务器打开项目根目录，例如：

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

浏览器访问 `http://localhost:8080`。

> 直接双击 `index.html` 也能用大部分功能；Service Worker / 安装到桌面建议通过 `http(s)` 访问。

## 发布到 GitHub Pages

1. 新建 GitHub 仓库（例如 `english-learning`），把本项目推上去。
2. 打开仓库 **Settings → Pages**。
3. Source 选择 **Deploy from a branch**，Branch 选 `main`（或 `master`），Folder 选 `/ (root)`。
4. 保存后等待 1–2 分钟，访问：

   `https://<你的用户名>.github.io/english-learning/`

5. 手机用 Safari / Chrome 打开该地址：
   - **iOS**：分享 →「添加到主屏幕」
   - **Android Chrome**：菜单 →「安装应用」/「添加到主屏幕」

## 目录结构

```
english-learning/
├── index.html          # 工作台入口
├── manifest.json       # PWA 清单
├── sw.js               # 离线缓存
├── css/styles.css
├── js/
│   ├── app.js
│   ├── storage.js
│   └── data/           # 音标/抢答/口语/纠音/金句/12周资料
└── icons/
```

## 使用提示

- 音标卡片：**点击**展开提示，**长按**标记掌握
- 抢答 / 口语：点开答案后可「我会了」或「加入错题本」
- 计划页可导出 JSON 备份进度，也可一键重置

## License

MIT — 自由用于个人学习与分享。
