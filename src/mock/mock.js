import Mock from 'mockjs'; //es6语法引入mock模块

// ========================================
//  登录页
//  ========================================

Mock.mock('../servlet/validateCodeServlet', 'post', {
	msg: '获取验证码成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/login', 'post', {
	msg: '登录成功',
	state: 'success',
	data: {
		name: 'Frank Shieh',
		headIcon: 'path.png',
		role: 'admin'
	}
});

Mock.mock('../manage/logout', 'post', {
	msg: '登出成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/checkLogin', 'post', {
	msg: '获取成功',
	state: 'success',
	data: {
		name: 'Frank Shieh',
		headIcon: 'path.png',
		role: 'admin'
	}
});

// ========================================
//  文章列表
//  ========================================

Mock.mock('../manage/article/list', 'post', {
	total: 10,
	page: 1,
	list: [{
		"id": "0001",
		"categoryName": "新闻资讯",
		"categoryId": "111",
		"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"publishDate": "2017-11-11",
		"hits": "8766",
		"isRoll": 2,
		"author": "张少影",
		"delFlag": 0,
		"url": "http://y1.ifengimg.com/news_spider/dci_2013/07/035292efbd71a5ffaadcd97e63566ea3.jpg"
	}, {
		"id": "0002",
		"categoryName": "常委会会议",
		"categoryId": "1222",
		"title": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
		"publishDate": "2017-09-24",
		"hits": "8766",
		"isRoll": 1,
		"author": "张少影",
		"delFlag": 1
	}, {
		"id": "0003",
		"categoryName": "代表大会会议",
		"categoryId": "1222",
		"title": "2016年8月29日建瓯市第十五届人大常委会第36次会议通过",
		"publishDate": "2017-08-08",
		"hits": "8766",
		"isRoll": 1,
		"author": "张少影",
		"delFlag": 2
	}, {
		"id": "0004",
		"categoryName": "决定决议",
		"categoryId": "1221",
		"title": "城区殡葬“一条龙”服务点改革情况的调研报告",
		"publishDate": "1978-06-18",
		"hits": "8766",
		"isRoll": 0,
		"author": "张少影",
		"delFlag": 3
	}, {
		"id": "0005",
		"categoryName": "新闻资讯",
		"categoryId": "111",
		"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"publishDate": "1977-07-09",
		"hits": "8766",
		"isRoll": 1,
		"author": "张少影",
		"delFlag": 0
	}, {
		"id": "0006",
		"categoryName": "新闻资讯",
		"categoryId": "111",
		"title": "关于吴慧艳等同志职务任免的通知",
		"publishDate": "1994-09-20",
		"hits": "8766",
		"isRoll": '1',
		"author": "张少影",
		"delFlag": 0
	}, {
		"id": "0007",
		"categoryName": "新闻资讯",
		"categoryId": "111",
		"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"publishDate": "1980-01-22",
		"hits": "8766",
		"isRoll": '0',
		"delFlag": 0
	}, {
		"id": "0008",
		"categoryName": "自身建设",
		"categoryId": "111",
		"title": "龙村乡人大代表王菊英风采",
		"publishDate": "1985-10-10",
		"hits": "8766",
		"isRoll": '2',
		"author": "张少影",
		"delFlag": 0
	}, {
		"id": "0009",
		"categoryName": "代表大会会议",
		"categoryId": "111",
		"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议",
		"publishDate": "1975-09-08",
		"hits": "8766",
		"isRoll": '1',
		"author": "张少影",
		"delFlag": 2
	}, {
		"id": "0010",
		"categoryName": "常委会会议",
		"categoryId": "111",
		"title": "建瓯市人大常委会关于授予建瓯市国家税务局“人民满意单位”荣誉称号的决定",
		"publishDate": "1970-06-07",
		"hits": "8766",
		"isRoll": '1',
		"author": "张少影",
		"delFlag": 3
	}]
});

Mock.mock('../manage/article/setRoll', 'post', {
	msg: '设置成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/article/delete', 'post', {
	msg: '删除成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/article/setHits', 'post', {
	msg: '设置成功',
	state: 'success',
	data: null
});


// ========================================
//  文章发布
//  ========================================

Mock.mock('../manage/user/authorList', 'post', {
	msg: '获取成功',
	state: 'success',
	data: [{
		id: '0001',
		name: '张少影'
	}, {
		id: '0002',
		name: 'Frank Shieh'
	}, {
		id: '0003',
		name: '蔡晓航'
	}, {
		id: '0004',
		name: '张靓颖'
	}, {
		id: '0005',
		name: '李宇春'
	}, {
		id: '0006',
		name: '周笔畅'
	}]
});


Mock.mock('../manage/article/save', 'post', {
	msg: '发布成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/article/update', 'post', {
	msg: '更新成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/article/uploadImage', 'post', {
	msg: '上传成功',
	state: 'success',
	data: null
});


// ========================================
//  文章审阅
//  ========================================

Mock.mock('../manage/article/view', 'post', function(opts) {
	const _param = JSON.parse(opts.body);
	if (_param.id === '0010') {
		// 多张图片新闻
		return {
			"state": "success", //应答码
			"msg": "获取成功", //应答信息
			"data": {
				"categoryId": '131',
				"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议", //标题
				"author": "谢静航", //作者
				"copyFrom": "", //来源
				"content": [{
					url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516629799&di=562d31c6c1f22c6e55eb2d15a12f06a8&imgtype=jpg&er=1&src=http%3A%2F%2Ftitanimg.titan24.com%2Fbasketball%2F2012%2F02%2F03%2F79ce13908b_1328255896.jpg',
					name: '陈国'
				}, {
					url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516035078987&di=67f696b4f51598a09a8c7498f819b7d6&imgtype=0&src=http%3A%2F%2Fs9.rr.itc.cn%2Fg%2FwapChange%2F20149_28_18%2Fa5fl0j76344374667.jpg',
					name: '周本'
				}, {
					url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516035078987&di=906acd7a3aa9325883663c4fd4d45d15&imgtype=0&src=http%3A%2F%2Fs8.rr.itc.cn%2Fg%2FwapChange%2F20149_28_18%2Fa4hjk876491487667.jpg',
					name: '诸葛大哥'
				}, {
					url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516035078984&di=ac3efaab96416598e434c47de6b4dfdc&imgtype=0&src=http%3A%2F%2Fimgsports.eastday.com%2Fsports%2Fimg%2F201707130411369203.jpeg',
					name: '吕小布'
				}, {
					url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516035188982&di=df1cb1fca1aabb895fa0ba89f24321fc&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D1850180791%2C2870515127%26fm%3D214%26gp%3D0.jpg',
					name: '张伟'
				}, {
					url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516035078982&di=eff0bd0c27b029371079e9551dcfe9f2&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20121002%2FImg354271911.jpg',
					name: '曹操'
				}] //正文
			}
		};
	} else if (_param.id === '0009') {
		// 单张图片新闻
		return {
			"state": "success", //应答码
			"msg": "获取成功", //应答信息
			"data": {
				"categoryId": '14',
				"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议", //标题
				"author": "谢静航", //作者
				"copyFrom": "", //来源
				"image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516629799&di=562d31c6c1f22c6e55eb2d15a12f06a8&imgtype=jpg&er=1&src=http%3A%2F%2Ftitanimg.titan24.com%2Fbasketball%2F2012%2F02%2F03%2F79ce13908b_1328255896.jpg", // 封面图
				"content": [{
					url: 'http://image.liuxianan.com/201705/20170522_174552_468_0434.png',
					name: 'mock.js'
				}] //正文
			}
		};
	} else {
		// 文章新闻
		return {
			"state": "success", //应答码
			"msg": "获取成功", //应答信息
			"data": {
				"categoryId": '0001',
				"title": "建瓯市人大常委会关于批准2016年地方政府债务限额及财政预算调整的议案的决议", //标题
				"author": "谢静航", //作者
				"copyFrom": "", //来源
				"isNew": '1',
				"publishDate": '2018-03-05',
				"content": '<p><a href="/userfiles/201706/2017062317531710.jpg" target="_blank"><img border="0" src="/userfiles/201706/2017062317531710.jpg" width="800" height="600">&nbsp;</a></p>\
					<p style="TEXT-ALIGN: left; LINE-HEIGHT: 150%; TEXT-INDENT: 28pt; MARGIN: 0cm 0cm 0pt; mso-char-indent-count: 2.0" class="MsoNormal" align="left"><span style="LINE-HEIGHT: 150%; FONT-FAMILY: 仿宋_GB2312; FONT-SIZE: 14pt; mso-hansi-font-family: 仿宋_GB2312; mso-bidi-font-family: 仿宋_GB2312" lang="EN-US">6</span><span style="LINE-HEIGHT: 150%; FONT-FAMILY: 仿宋_GB2312; FONT-SIZE: 14pt; mso-hansi-font-family: 仿宋_GB2312; mso-bidi-font-family: 仿宋_GB2312">月<span lang="EN-US">23</span>日，东游镇<span lang="EN-US">553</span>名考生将走进中考考场参加为期三天的中考。<span lang="EN-US">22</span>日上午，镇人大主席团组织部分人大主席团成员、部分市、镇人大代表实地查看东游中学考点考前准备情况。<span lang="EN-US"><!--?xml:namespace prefix = o ns = "urn:schemas-microsoft-com:office:office" /--><o:p></o:p></span></span></p>\
					<p style="TEXT-ALIGN: left; LINE-HEIGHT: 150%; TEXT-INDENT: 28pt; MARGIN: 0cm 0cm 0pt; mso-char-indent-count: 2.0" class="MsoNormal" align="left"><span style="LINE-HEIGHT: 150%; FONT-FAMILY: 仿宋_GB2312; FONT-SIZE: 14pt; mso-hansi-font-family: 仿宋_GB2312; mso-bidi-font-family: 仿宋_GB2312">代表们在考点外查看了街边商铺占道清理情况、道路警示牌设置情况，走进考点对考场清理、布置进行了查看，向考点负责人询问了考务后勤保障等工作准备情况。<span lang="EN-US"><o:p></o:p></span></span></p>\
					<p style="TEXT-ALIGN: left; LINE-HEIGHT: 150%; TEXT-INDENT: 28pt; MARGIN: 0cm 0cm 0pt; mso-char-indent-count: 2.0" class="MsoNormal" align="left"><span style="LINE-HEIGHT: 150%; FONT-FAMILY: 仿宋_GB2312; FONT-SIZE: 14pt; mso-hansi-font-family: 仿宋_GB2312; mso-bidi-font-family: 仿宋_GB2312">代表们对考点各项准备工作表示满意，希望政府及有关部门负责人继续积极做好服务工作，为考生营造安静、良好的考试环境。<span lang="EN-US"><o:p></o:p></span></span></p>\
					<p style="TEXT-ALIGN: left; LINE-HEIGHT: 150%; TEXT-INDENT: 28pt; MARGIN: 0cm 0cm 0pt; mso-char-indent-count: 2.0" class="MsoNormal" align="left"><span style="LINE-HEIGHT: 150%; FONT-FAMILY: 仿宋_GB2312; FONT-SIZE: 14pt; mso-hansi-font-family: 仿宋_GB2312; mso-bidi-font-family: 仿宋_GB2312" lang="EN-US"><o:p>&nbsp;</o:p></span></p>\
					<p>&nbsp;</p>' //正文
			}
		};
	}
});

Mock.mock('../manage/article/audit', 'post', {
	msg: '审阅成功',
	state: 'success',
	data: null
});


// ========================================
//  用户管理
//  ========================================

Mock.mock('../manage/user/list', 'post', {
	total: 8,
	page: 1,
	list: [{
		"id": "0001", //userid
		"username": "18650335260", //用户名
		"name": "弗兰克", //昵称/姓名
		"role": "admin", //角色
		"lasttime": "2017/12/29", //上传登录时间
		"desc": "管理员", //其他说明
		"delFlag": "0"
	}, {
		"id": "0002", //userid
		"username": "18650335260", //用户名
		"name": "杰克", //昵称/姓名
		"role": "audit", //角色
		"lasttime": "2017/12/29", //上传登录时间
		"desc": "审阅员", //其他说明
		"delFlag": "1"
	}, {
		"id": "0003", //userid
		"username": "18650335260", //用户名
		"name": "琼斯", //昵称/姓名
		"role": "publish", //角色
		"lasttime": "2017/12/29", //上传登录时间
		"desc": "发布员", //其他说明
		"delFlag": "1"
	}, {
		"id": "0004", //userid
		"username": "18650335260", //用户名
		"name": "里昂内尔", //昵称/姓名
		"role": "audit", //角色
		"lasttime": "2017/12/29", //上传登录时间
		"desc": "审核员", //其他说明
		"delFlag": "0"
	}, {
		"id": "0005", //userid
		"username": "18650335260", //用户名
		"name": "克里斯蒂亚诺", //昵称/姓名
		"role": "publish", //角色
		"lasttime": "2017/12/29", //上传登录时间
		"desc": "发布员", //其他说明
		"delFlag": "0"
	}, {
		"id": "0006", //userid
		"username": "18650335260", //用户名
		"name": "弗兰克", //昵称/姓名
		"role": "admin", //角色
		"lasttime": "2017/12/29", //上传登录时间
		"desc": "管理员", //其他说明
		"delFlag": "0"
	}, {
		"id": "0007", //userid
		"username": "18650335260", //用户名
		"name": "弗兰克", //昵称/姓名
		"role": "admin", //角色
		"lasttime": "2017/12/29", //上传登录时间
		"desc": "管理员", //其他说明
		"delFlag": "1"
	}, {
		"id": "0008", //userid
		"username": "18650335260", //用户名
		"name": "弗兰克", //昵称/姓名
		"role": "admin", //角色
		"lasttime": "2017/12/29", //上传登录时间
		"desc": "管理员", //其他说明
		"delFlag": "0"
	}]
});

Mock.mock('../manage/user/resetPwd', 'post', {
	msg: '重置密码成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/user/updateRole', 'post', {
	msg: '设置权限成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/user/delete', 'post', {
	msg: '注销用户成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/user/save', 'post', {
	msg: '用户新增成功',
	state: 'success',
	data: null
});


// ========================================
//  账号信息
//  ========================================

Mock.mock('../manage/user/modifyPwd', 'post', {
	msg: '修改成功',
	state: 'success',
	data: null
});

Mock.mock('../manage/user/updateName', 'post', {
	msg: '修改成功',
	state: 'success',
	data: null
});


// ========================================
//  友情链接
//  ========================================

Mock.mock('../manage/link/list', 'post', {
    list: [{
		linkId: '0001',
		title: '中国人大',
		url: 'www.zgrd.gov.cn',
		order: '1'
	}, {
	    linkId: '0002',
	    title: '福州人大',
	    url: 'www.fzrd.gov.cn',
	    order: '2'
	}, {
	    linkId: '0003',
	    title: '南平市人大',
	    url: 'www.npsrd.gov.cn',
	    order: '3'
	}, {
	    linkId: '0004',
	    title: '建瓯市人大',
	    url: 'www.josrd.gov.cn',
	    order: '4'
	}, {
	    linkId: '0005',
	    title: '建瓯徐墩人大',
	    url: 'www.joxdrd.gov.cn',
	    order: '5'
	}, {
	    linkId: '0006',
	    title: '巴萨官网',
	    url: 'www.barcelona.com',
	    order: '6'
	}]
});

Mock.mock('../manage/link/save', 'post', {
    msg: '修改成功',
    state: 'success',
    data: null
});