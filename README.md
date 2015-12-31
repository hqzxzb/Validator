# Validator
原生JS验证器

## 框架依赖

无。

## 浏览器兼容

|浏览器|Chrome|IE|Firefox|Safari|Opera|
|:----:|:-------:|:-------:|:------:|:-------:|:-------:|
|最低版本|-|9.0|-|-|7.0|

## 使用方法

	var validator = new Validator({
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
	});
