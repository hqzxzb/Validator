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
			value : function() {
				// Do something;
				// return value;
			},
			rules : {
				required : true
			},
			msg : {
				required : "msg"
			},
			event : function() {
				// Do something to Set Process for trigger 'validate' Event;
			},
			msgSelector : "msg_Selector",
			callback : function(errors) {
				// Do something;
			}
		}
	});

## 参数说明

|参数名|值|
|:-------------------------------:|:------------------------------------------------------------------|
|selector|输入元素筛选器字符串。元素可以为input/textarea/radio/checkbox/select/其他元素。当为input/textarea/radio/checkbox/select时，可自动获取结果进行验证，当为其他元素时，需要通过value参数指定获取值的方法。|
|value|待验证的值获取方法，若框架无法自动获取，需要通过该参数自定义值获取方法function，自定义方法需返回待验证的值。|
|rules|验证规则，及规则需要的输入参数。可配置多个。|
|msg|验证规则验证失败的提示信息，每一个规则对应一个提示信息，若不设定，则使用默认提示信息。|
|event|验证事件绑定的方式，若为input/textarea/radio/checkbox/select将默认绑定为<code>blur</code>、<code>click</code>、<code>change</code>事件，若需要自定义，可通过此参数设定具体的事件逻辑，触发元素的<code>validate</code>事件。|
|msgSelector|提示信息显示位置筛选器字符串。框架根据该参数将该元素设定的验证规则中第一个验证失败的提示信息，显示到筛选器字符串指定的元素HTML代码中。|
|callback|验证完成回调方法，默认传入参数为错误信息数组error[]，可根据使用场景设定自定义回调方法。|

## APIs

|方法名|参数|说明|
|:-------------------------------:|:-------------------------------:|:-----------------------------------------------|
|validateAll|callback（回调方法，回调参数为result:最终结果boolean、errors:错误信息数组）|统一执行一次验证，并返回验证结果。|
|addRule|rule（规则名）, fn（规则方法）, message（提示信息）|自定义规则。规则方法格式为function(value, param, msg)，其中value为输入值，param为规则参数，msg为提示信息，规则方法需要使用这些参数进行规则校验并返回提示信息，若验证通过则返回null。|

## 默认规则

|规则名|参数|说明|
|:-------------------------------:|:-------------------------------:|:-----------------------------------------------|
|required|true/false|true：必填；false：选填|
|identityCard|无|身份证15/18位|
|mobile|无|手机号13/14/15/17/18开头|
|email|无|电子邮箱|
|equals|等于的值|判断与指定值是否相等|
|url|无|URL格式|
|number|无|数字，可以为正数、负数、0、小数|
|maxLength|长度|输入值最大长度|
|minLength|长度|输入值最小长度|
|rangeLength|[最小长度,最大长度]|输入值长度范围|
|max|值|输入值可接受的最大值|
|min|值|输入值可接受的最小值|
|range|[最小值,最大值]|输入值的可接受范围|
