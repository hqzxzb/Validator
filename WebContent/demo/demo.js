// 初始化demo
(function() {
	// 绑定自定义输入域的输入方法
	var customEl = document.querySelector(".custom");
	customEl.addEventListener("click", function() {
		this.setAttribute("data-val",
				this.getAttribute("data-val") === "1" ? "" : "1");
	}, false);
})();

// 设定验证规则
var fields = {
	".name" : {
		rules : {
			required : true
		},
		msg : {
			required : "请输入姓名"
		},
		msgSelector : ".name_msg"
	},
	".sex" : {
		rules : {
			required : true
		},
		msg : {
			required : "请选择性别"
		},
		msgSelector : ".sex_msg"
	},
	".birthday" : {
		rules : {
			required : true
		},
		msg : {
			required : "请输入出生日期"
		},
		msgSelector : ".birthday_msg"
	},
	".cardType" : {
		rules : {
			required : true
		},
		msg : {
			required : "请选择证件类型"
		},
		msgSelector : ".cardType_msg"
	},
	".cardNo" : {
		rules : {
			required : true
		},
		msg : {
			required : "请输入证件号码"
		},
		msgSelector : ".cardNo_msg"
	},
	".interest" : {
		rules : {
			required : true
		},
		msg : {
			required : "请选择至少一项开发语言"
		},
		msgSelector : ".interest_msg"
	},
	".password" : {
		rules : {
			required : true
		},
		msg : {
			required : "请输入密码"
		},
		msgSelector : ".password_msg"
	},
	".remark" : {
		rules : {
			required : true
		},
		msg : {
			required : "请输入备注"
		},
		msgSelector : ".remark_msg"
	},
	".custom" : {
		value : function() {
			// 自定义输入域获取值方法
			return document.querySelector(".custom").getAttribute("data-val");
		},
		rules : {
			required : true
		},
		msg : {
			required : "请输入自定义值"
		},
		event : function() {
			// 自定义输入域触发validate事件方法
			document.querySelector(".custom").addEventListener("click",
					function() {
						var event = document.createEvent("Events");
						event.initEvent("validate", true, true);
						this.dispatchEvent(event);
					}, false);
		},
		msgSelector : ".custom_msg"
	}
};
// 初始化验证器
var demoValid = new Validator(fields);

// 执行全量验证
console.log("验证结果：" + demoValid.validateAll(function(result, errors) {
	console.log("result : " + result);
	for (var i = 0; i < errors.length; i++) {
		console.log("error : " + errors[i]);
	}
}));
