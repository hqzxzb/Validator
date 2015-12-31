/**
 * JavaScript Input Validator
 * 
 * JavaScript 前端页面内容验证框架
 * 
 * @version 0.0.1
 * @author ZHAOBO
 */
(function(window, document, undefined) {
	/**
	 * 验证类
	 */
	var Validator = function(fields) {
		this.initFields(fields);
	};

	/**
	 * 验证组暂存（用于统一验证触发）
	 */
	Validator.prototype.validFeilds = {};

	/**
	 * 参数格式
	 */
	Validator.prototype.paramFields = {
		"selector" : {
			"value" : undefined,
			"rules" : {
				required : true
			},
			"msg" : {
				required : "msg"
			},
			"event" : undefined,
			"msgSelector" : "msg_Selector",
			"callback" : undefined
		}
	};

	/**
	 * 验证规则
	 */
	Validator.prototype.validateRules = {
		required : function(value, param, msg) {
			return (typeof value !== 'undefined' && value !== null && value !== "") ? null
					: msg;
		},
		identityCard : function(value, param, msg) {
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ig;
			return reg.test(value) ? null : msg;
		},
		mobile : function(value, param, msg) {
			var reg = /^[1][34578]\d{9}$/ig;
			return reg.test(value) ? null : msg;
		},
		email : function(value, param, msg) {
			var reg = /^[0-9a-zA-Z_][-_\.0-9a-zA-Z-]{0,63}@([0-9a-zA-Z][0-9a-zA-Z-]*\.)+[a-zA-Z]{2,4}$/ig;
			return reg.test(value) ? null : msg;
		}
	};

	/**
	 * 默认提示信息
	 */
	Validator.prototype.defaultMsg = {
		required : "不能为空",
		identityCard : "身份证号格式不正确",
		mobile : "手机号格式不正确",
		email : "邮箱格式不正确"
	};

	/**
	 * 
	 * @Title:initFields
	 * @Description:初始化验证内容
	 * @param fields
	 * @author ZHAOBO
	 * @修改时间：2015年12月24日 上午10:13:37
	 * @修改内容：创建
	 */
	Validator.prototype.initFields = function(fields) {
		var _this = this;
		for ( var name in fields) {
			var field = fields[name];
			field.name = name;
			var elements = document.querySelectorAll(field.name);
			field.type = (elements.length > 0 ? elements[0].type : undefined);
			// 获取value值
			field.valiValue = function() {
				return _this.getValue(this);
			};

			// 绑定校验事件
			for (i = 0; i < elements.length; i++) {
				elements[i].addEventListener("validate", (function(field) {
					return function() {
						_this.validate(field);
					};
				})(field), false);
			}

			// 绑定自定义校验触发事件
			this.addValidateEvent(field);
		}
		// 暂存验证规则
		this.validFeilds = fields;
	};

	/**
	 * 
	 * @Title:getValue
	 * @Description:获取值
	 * @param field
	 * @author ZHAOBO
	 * @修改时间：2015年12月29日 上午10:13:37
	 * @修改内容：创建
	 */
	Validator.prototype.getValue = function(field) {
		if (typeof field.value === "function") {
			return field.value();
		} else if (typeof field.value !== undefined && field.value === null) {
			return field.value;
		} else {
			var elements = document.querySelectorAll(field.name);
			if (field.type === "textarea") {
				// textarea
				return elements[0].value;
			} else if (field.type === "radio") {
				// radio
				for (i = 0; i < elements.length; i++) {
					if (elements[i].checked) {
						return elements[i].value;
						break;
					}
				}
			} else if (field.type === "checkbox") {
				// checkbox
				var valueArr = [];
				for (i = 0; i < elements.length; i++) {
					if (elements[i].checked) {
						valueArr.push(elements[i].value);
					}
				}
				return valueArr;
			} else if (field.type !== undefined) {
				// input
				return elements[0].value;
			} else {
				// object
				return null;
			}
		}
	};

	/**
	 * 
	 * @Title:addValidateEvent
	 * @Description:绑定验证事件
	 * @param field
	 * @author ZHAOBO
	 * @修改时间：2015年12月29日 上午10:41:43
	 * @修改内容：创建
	 */
	Validator.prototype.addValidateEvent = function(field) {
		var _this = this;
		var elements = document.querySelectorAll(field.name);
		if (field.event !== undefined) {
			// 若存在自定义触发方法，则执行自定义触发
			field.event();
		} else if (field.type === "textarea") {
			// textarea
			elements[0].addEventListener("blur", function() {
				_this.trigger(this, "validate");
			}, false);
		} else if (field.type === "radio" || field.type === "checkbox") {
			// radio || checkbox
			for (i = 0; i < elements.length; i++) {
				elements[i].addEventListener("click", function() {
					_this.trigger(this, "validate");
				}, false);
			}
		} else if (field.type !== undefined) {
			// input
			elements[0].addEventListener("blur", function() {
				_this.trigger(this, "validate");
			}, false);
		} else {
			// object
			// nothing;
		}
	};

	/**
	 * 
	 * @Title:addValidateEvent
	 * @Description:绑定验证事件
	 * @param element
	 * @param event
	 * @author ZHAOBO
	 * @修改时间：2015年12月29日 上午10:41:43
	 * @修改内容：创建
	 */
	Validator.prototype.trigger = function(element, event) {
		var type = event;
		if (typeof type == "string") {
			event = document.createEvent("Events");
			event.initEvent(type, true, true);
		} else
			return;
		return element.dispatchEvent(event);
	};

	/**
	 * 
	 * @Title:validate
	 * @Description:单个验证
	 * @author ZHAOBO
	 * @修改时间：2015年12月25日 上午10:07:13
	 * @修改内容：创建
	 */
	Validator.prototype.validate = function(field) {
		var errors = [];
		var value = field.valiValue();
		if (field.rules["required"] === false
				&& (value === null || value === "")) {
			// 针对required:false非必填，且value为空的情况，不进行校验，特殊处理
		} else {
			// 循环执行规则校验
			for ( var key in field.rules) {
				var error = this.validateRules[key](value, field.rules[key],
						field.msg[key] || this.defaultMsg[key]);
				if (typeof error !== "undefined" && error !== null) {
					errors.push(error);
				}
			}
		}

		if (typeof field.msgSelector !== "undefined"
				&& field.msgSelector !== null && field.msgSelector !== "") {
			if (errors.length > 0) {
				document.querySelectorAll(field.msgSelector)[0].innerHTML = errors[0];
			} else {
				document.querySelectorAll(field.msgSelector)[0].innerHTML = "";
			}
		}
		// 执行回调
		typeof field.callback !== "undefined" ? field.callback(errors) : null;
		// 设定结果返回
		if (errors.length > 0) {
			return false;
		} else {
			return true;
		}
	};

	/**
	 * 
	 * @Title:validateAll
	 * @Description:全量验证
	 * @author ZHAOBO
	 * @修改时间：2015年12月25日 上午10:07:13
	 * @修改内容：创建
	 */
	Validator.prototype.validateAll = function(callback) {
		var result = true;
		for ( var name in this.validFeilds) {
			var field = this.validFeilds[name];
			// 执行校验方法
			result = (this.validate(field) && result);
		}
		// 判断执行回调
		typeof error !== 'undefined' ? callback(result) : null;
		// 执行返回
		return result;
	};

	/**
	 * 
	 * @Title:addRule
	 * @Description:自定义规则
	 * @param rule
	 * @param fn
	 * @param message
	 * @author ZHAOBO
	 * @修改时间：2015年12月25日 上午10:07:13
	 * @修改内容：创建
	 */
	Validator.prototype.addRule = function(rule, fn, message) {
		this.validateRules[rule] = function(value, param, msg) {
			return fn(value, param, msg);
		};
		this.defaultMsg[rule] = message;
	};

	/*
	 * 设定为CommonJS模块
	 */
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Validator;
	} else {
		// 设定全局类
		window.Validator = Validator;
	}

})(window, document);