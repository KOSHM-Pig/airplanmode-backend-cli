# Airplan Mode 飞行计划 公共资源服务
public-service.airplanmode.com
## 开发规范

### 项目结构规范

project /
├── src / 程序源码文件目录
│   ├── config / 配置目录 
│   │   ├── swagger.js  swagger 配置文件
│   │   └── logger.js   日志配置文件
│   │
│   ├── controllers / 控制器目录
│   │   ├── *.controller.js  控制器文件
│   │   └── index.js  控制器索引文件
│   │
│   ├── models / 模型目录
│   │   ├── *.model.js  模型文件
│   │   └── index.js  模型索引文件
│   │
│   ├── routes / 路由目录
│   │   ├── *.route.js  路由文件
│   │   └── index.js  路由索引文件
│   │
│   ├── services / 服务目录
│   │   ├── *.service.js  服务文件
│   │   └── index.js  服务索引文件
│   └── server.js  服务器入口文件
│   
├── docs / 用于存储AI提示文档
│   └── *.md  文档文件
│
├── .env  环境变量配置文件
├── package.json  项目依赖配置文件
├── .gitignore  git 忽略文件配置
├── package-lock.json  项目依赖锁文件
└── README.md  项目说明文档




### controllers、models、routes 规范

- 每个目录下的文件都要符合命名规范
  - 控制器文件：`*.controller.js`
  - 模型文件：`*.model.js`
  - 路由文件：`*.route.js`

并统一由index.js导出：

- controllers/index.js
- models/index.js
- routes/index.js

### swagger 规范

- 每个路由文件都要包含路由的详细信息，包括请求方法、路径、参数、响应等。
- 路由文件的注释要符合 swagger 规范，使用 jsdoc 格式。
- 每个模型文件都要包含模型的详细信息，包括属性、类型、是否必填等。
- 模型文件的注释要符合 swagger 规范，使用 jsdoc 格式。

### 运行与脚本

- 开发启动：`npm run dev`
- 普通启动：`npm run start`
- 文档入口：`/api-docs`

### 环境变量规范

- 使用 `dotenv` 加载 `.env`（入口：`src/server.js`）
- 变量约定：
  - `PORT`：服务监听端口，默认 `3000`
  - `APPLICATION_URL`：对外服务基址，用于 Swagger `servers`（未设置回退为 `http://localhost:${PORT}`）
  - `LOG_LEVEL`：日志级别，默认 `info`（可选 `error|warn|info|debug`）
- 安全要求：不记录/提交敏感信息，`.gitignore` 已忽略 `.env` 与 `logs/`

### 日志规范

- 日志库：`winston`（配置：`src/config/logger.js`）
- 级别：`error`、`warn`、`info`、`debug`
- 输出：
  - 控制台（彩色，便于开发）
  - 文件：`logs/app.log`（综合）、`logs/error.log`（错误）
- 请求日志：在 `src/server.js` 统一中间件记录 `method path status 耗时`，错误 `>=500` 记 `error`，`>=400` 记 `warn`
- 全局错误处理：`src/server.js` 捕获未处理异常并输出结构化错误，响应 `500`
- 规范：避免日志中出现令牌、密钥、密码等敏感信息

### swagger-jsdoc 配置与注释规范

- 配置位置：`src/config/swagger.js`（`createSwaggerSpec(serverUrl)`）
- 扫描范围：`apis: ['src/**/*.js']`
- 路由注释：放在 `src/routes/*.route.js`，使用 `@openapi` JSDoc 块定义路径、方法、请求参数与响应
- 模型注释：可使用 `components/schemas` 定义结构体并在路由注释中引用
- 文档 UI：`swagger-ui-express` 挂载于 `/api-docs`

### 分层规范

- 路由（`routes`）只负责参数解析与转发，不直接书写异步业务逻辑
- 控制器（`controllers`）承载业务流程编排，必要时调用 `services`
- 服务（`services`）聚合外部 API、内部模块调用，保持可测试性
- 模型（`models`）声明数据结构（如后续有数据库或 DTO 定义）
- 统一导出：各层使用 `index.js` 聚合导出，便于维护与扫描

### 参考实现

- 路由聚合：`src/routes/index.js`
- 根路由与注释：`src/routes/root.route.js`
- 控制器：`src/controllers/root.controller.js`
- Swagger 配置：`src/config/swagger.js`
- 日志配置：`src/config/logger.js`
- 入口挂载：`src/server.js`
