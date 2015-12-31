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

## 参数说明

|参数名|值|
|:-------------------------------:|:------------------------------------------------------------------|
|selector|输入元素筛选器字符串。元素可以为input/textarea/radio/checkbox/其他元素。当为input/textarea/radio/checkbox时，可自动获取结果进行验证，当为其他元素时，需要通过value参数指定获取值的方法。|
|value|待验证的值获取方法，若框架无法自动获取，需要通过该参数自定义值获取方法function，自定义方法需返回待验证的值。|
|rules|验证规则，及规则需要的输入参数。可配置多个。|
|msg|验证规则验证失败的提示信息，每一个规则对应一个提示信息，若不设定，则使用默认提示信息。|
|event|验证事件绑定的方式，若为input/textarea/radio/checkbox将默认绑定为<code>blur</code>事件，若需要自定义，可通过此参数设定具体的事件逻辑，触发元素的<code>validator</code>"事件。|
|msgSelector|提示信息显示位置筛选器字符串。框架根据该参数将该元素设定的验证规则中第一个验证失败的提示信息，显示到筛选器字符串指定的元素HTML代码中。|
|callback|验证完成回调方法，默认传入参数为错误信息数组error[]，可根据使用场景设定自定义回调方法。|

## APIs

|方法名|参数|说明|
|:-------------------------------:|:-------------------------------:|:-----------------------------------------------|
|validateAll|无|统一执行一次验证，并返回验证结果。|
