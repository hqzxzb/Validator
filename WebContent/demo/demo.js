// 初始化demo
(function() {
	// 绑定自定义输入域的输入方法
	var customEl = document.querySelector(".custom");
	customEl.addEventListener("click", function() {
		var val = parseInt(this.getAttribute("data-val") === "" ? 0 : this
				.getAttribute("data-val"));
		this.setAttribute("data-val", val === 2 ? "" : val + 1);
	}, false);
})();

// 设定验证规则
var fields = {
	".name" : {
		rules : {
			required : true,
			maxLength : 20,
			minLength : 5
		},
		msg : {
			required : "请输入姓名",
			maxLength : "姓名不能超过%{0}个字符",
			minLength : "姓名不能少于%{0}个字符"
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
			required : true,
			rangeLength : [ 6, 16 ]
		},
		msg : {
			required : "请输入密码",
			rangeLength : "密码必须为%{0}到%{1}位"
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
			var val = document.querySelector(".custom")
					.getAttribute("data-val");
			return val === "" ? "" : parseInt(val);
		},
		rules : {
			required : true,
			equals : 2
		},
		msg : {
			required : "请输入自定义值",
			equals : "自定义值必须为'%{0}'"
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
	},
	".url" : {
		rules : {
			required : true,
			url : true
		},
		msg : {
			required : "请输入URL地址"
		},
		msgSelector : ".url_msg"
	},
	".money" : {
		rules : {
			required : true,
			number : null,
			max : 100000,
			min : 100
		},
		msg : {
			required : "请输入金额",
			number : "请输入正确的金额",
			max : "最多可以输入%{0}的金额",
			min : "最少可以输入%{0}的金额"
		},
		msgSelector : ".money_msg"
	},
	".money2" : {
		rules : {
			required : true,
			number : null,
			range : [ 100, 100000 ]
		},
		msg : {
			required : "请输入金额",
			number : "请输入正确的金额",
			range : "金额必须在%{0}到%{1}之间的金额"
		},
		msgSelector : ".money2_msg"
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
