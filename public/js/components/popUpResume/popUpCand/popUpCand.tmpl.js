;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['popUpCand.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
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
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var job=__fest_context;__fest_buf+=("<div class=\"bg\"><div class=\"popUp__cont\"><div class=\"popUp__cont_block\"></div><div class=\"popUp__cont_center\"><div class=\"popUp__cont_lable\">Опыт работы</div><form class=\"popUp__cont_form\" id=\"popUp__cand_form\"><span class=\"error\" aria-live=\"polite\"></span><div class=\"popUp__cont_input\"><label for=\"start_work\">Начало работы</label><div class=\"popUp__cont_data\"><div>");try{__fest_attrs[0]=__fest_escapeHTML(job.begin)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input id=\"start_work\" type=\"date\" name=\"begin\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div></div></div>");try{__fest_if=job.finish == 'today'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<input type=\"checkbox\" id=\"popUp__cont_checkbox\" name=\"checkbox\" checked=\"true\"/>По текущее время");}try{__fest_if=job.finish != 'today'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<input type=\"checkbox\" id=\"popUp__cont_checkbox\" name=\"checkbox\"/>По текущее время<br/><br/><div class=\"popUp__cont_input\" id=\"div-finish\">");var __fest_context0;try{__fest_context0=job.finish}catch(e){__fest_context0={};__fest_log_error(e.message)};(function(__fest_context){var job=__fest_context;__fest_buf+=("<label for=\"end_work\">Окончание работы</label><div class=\"popUp__cont_data\"><div>");try{__fest_attrs[0]=__fest_escapeHTML(job)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input id=\"end_work\" type=\"date\" name=\"finish\" value=\"" + __fest_attrs[0] + "\"/></div></div>");})(__fest_context0);__fest_buf+=("</div>");}try{__fest_if=!job}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<input type=\"checkbox\" id=\"popUp__cont_checkbox\" name=\"checkbox\"/>По текущее время<br/><br/><div class=\"popUp__cont_input\" id=\"div-finish\">");var __fest_context1;try{__fest_context1=job.finish}catch(e){__fest_context1={};__fest_log_error(e.message)};(function(__fest_context){var job=__fest_context;__fest_buf+=("<label for=\"end_work\">Окончание работы</label><div class=\"popUp__cont_data\"><div>");try{__fest_attrs[0]=__fest_escapeHTML(job)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input id=\"end_work\" type=\"date\" name=\"finish\" value=\"" + __fest_attrs[0] + "\"/></div></div>");})(__fest_context1);__fest_buf+=("</div>");}__fest_buf+=("<span class=\"error\" aria-live=\"polite\"></span><div class=\"popUp__cont_input\"><label for=\"position\">Должность</label><div>");try{__fest_attrs[0]=__fest_escapeHTML(job.position)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"popUp__cont_text\" id=\"position\" name=\"position\" placeholder=\"Должность\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div></div><div class=\"popUp__cont_input\"><label for=\"job\">Организация</label><div>");try{__fest_attrs[0]=__fest_escapeHTML(job.name_job)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"popUp__cont_text\" id=\"job\" name=\"name_job\" placeholder=\"Название компании\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div></div><div class=\"popUp__cont_input\"><label for=\"duties\">Обязанности на рабочем месте</label><div><textarea class=\"popUp__cont_text\" id=\"duties\" name=\"duties\" placeholder=\"Опишите, что вы делали на работе. Работодатели часто ищут резюме по ключевым навыкам, например, «работа в торговом зале», «работа с документами», «сопровождение первых лиц», «управление коллективом» и т.д.\">");try{__fest_buf+=(__fest_escapeHTML(job.duties))}catch(e){__fest_log_error(e.message + "60");}__fest_buf+=("</textarea><span class=\"error\" aria-live=\"polite\"></span></div></div><button class=\"btn__add_exp\" type=\"submit\">сохранить</button></form></div><div class=\"popUp__cont_block\"></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();