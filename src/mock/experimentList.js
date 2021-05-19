// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

const experimentData = {
   status: "200",
   soid:"324543656",
   experimentlist: [{
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "实验环境配置和交换机访问管理", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/路由与交换技术 实验任务/实验环境配置和交换机访问管理.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "学习NAT技术", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/路由与交换技术 实验任务/学习NAT技术.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "学习VLAN技术", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/路由与交换技术 实验任务/学习VLAN技术.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "学习路由技术", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/路由与交换技术 实验任务/学习路由技术.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "学习生成树协议", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/路由与交换技术 实验任务/学习生成树协议.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "DNS 域名服务协议", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/DNS 域名服务协议.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "OSPF基本配置", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/OSPF基本配置.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "RIPv2配置", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/RIPv2配置.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "RIP路由协议基本配置", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/RIP路由协议基本配置.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "SOCKET 网络程序设计", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/SOCKET 网络程序设计.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "单臂路由", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/单臂路由.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "基本报文分析", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/基本报文分析.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "交换机基本配置", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/交换机基本配置.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "静态路由配置", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/静态路由配置.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "跨交换机实现VLAN间路由", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/跨交换机实现VLAN间路由.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "利用单臂路由实现VLAN间路由", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/利用单臂路由实现VLAN间路由.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "利用三层交换机实现VLAN间路由", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/利用三层交换机实现VLAN间路由.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "路由器的基本操作", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/路由器的基本操作.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "配置动态NAT", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/配置动态NAT.pdf"
   },
   {
      experimentContentOid: "1", // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      experimentContentName: "配置静态NAT", // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      cpuTopLimit: Random.integer(1, 10), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      memoryTopLimit: Random.integer(1, 10),

      url: "../../static/pdf/计算机网络课程设计 实验任务/配置静态NAT.pdf"
   },

   ]
}
export default experimentData