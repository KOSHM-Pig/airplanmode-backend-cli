# Airplan Mode 飞行计划 微信账号服务

## 开发规范

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