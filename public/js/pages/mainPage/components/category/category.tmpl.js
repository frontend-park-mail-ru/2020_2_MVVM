;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['category.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var items=__fest_context;__fest_buf+=("<div class=\"category\"><h3>Главные категории</h3><p>37 активных вакансий, 0 добавлено сегодня</p><div class=\"category-grid\"><div class=\"category-sec\">");var i,__fest_to0,__fest_from0,__fest_iterator0;try{__fest_from0=0;__fest_to0=3;}catch(e){__fest_from0=0;__fest_to0=0;__fest_log_error(e.message);}for(i = __fest_from0;i<=__fest_to0;i++){__fest_buf+=("<div><i class=\"fa fa-bullhorn fa-4x\"></i><br/><span>");try{__fest_buf+=(__fest_escapeHTML(items[i].name))}catch(e){__fest_log_error(e.message + "10");}__fest_buf+=("</span><p>(");try{__fest_buf+=(__fest_escapeHTML(items[i].count))}catch(e){__fest_log_error(e.message + "11");}__fest_buf+=("вакансии)</p></div>");}__fest_buf+=("</div><div class=\"category-sec\">");var i,__fest_to1,__fest_from1,__fest_iterator1;try{__fest_from1=3;__fest_to1=6;}catch(e){__fest_from1=0;__fest_to1=0;__fest_log_error(e.message);}for(i = __fest_from1;i<=__fest_to1;i++){__fest_buf+=("<div><i class=\"fa fa-bullhorn fa-4x\"></i><br/><span>");try{__fest_buf+=(__fest_escapeHTML(items[i].name))}catch(e){__fest_log_error(e.message + "19");}__fest_buf+=("</span><p>(");try{__fest_buf+=(__fest_escapeHTML(items[i].count))}catch(e){__fest_log_error(e.message + "20");}__fest_buf+=("вакансии)</p></div>");}__fest_buf+=("</div></div><div class=\"btm-all-category\">Показать все категории</div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();