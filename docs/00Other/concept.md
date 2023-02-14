### 工作内容

- 数据面：称为MOSN，是处理应用数据请求的一个独立代理模块，脱离于应用，为应用提供请求代理及一些复杂通信逻辑处理。 

- 控制面：称为SOFAMesh，管理应用配置及业务规则等（例如业务开关、服务路由规则），通过下发配置，“指挥”数据面去执行，满足不同阶段不同实现的业务支持。

### trie树

在计算机科学中，trie，又称前缀树或字典树，是一种有序树，用于保存关联数组，其中的键通常是字符串。