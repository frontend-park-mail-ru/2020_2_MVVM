;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['companyPage.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
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
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var company=__fest_context;__fest_buf+=("<div class=\"company__container\"><div class=\"container__left\"><div class=\"container__left_top\"><div class=\"container__left_logo\">");try{__fest_attrs[0]=__fest_escapeHTML(company.avatar)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<img src=\"" + __fest_attrs[0] + "\" alt=\"\"/></div></div><div class=\"container_left_middle\"><div class=\"container__left_contacts\"><div class=\"container__left_contacts city\">");try{__fest_buf+=(__fest_escapeHTML(company.location))}catch(e){__fest_log_error(e.message + "10");}__fest_buf+=("</div><div class=\"container__left_contacts web-site\"><a href=\"\">");try{__fest_buf+=(__fest_escapeHTML(company.link))}catch(e){__fest_log_error(e.message + "11");}__fest_buf+=("</a></div></div><div class=\"container__left_vacancies\"><label>Вакансии</label><div class=\"container__left_vacancies open-vacancies\">");try{__fest_buf+=(__fest_escapeHTML(company.count_vacancy))}catch(e){__fest_log_error(e.message + "15");}__fest_buf+=("активных вакансий</div></div><div class=\"container__left_sphere\"><label>Сферы деятельности</label><div class=\"container__left_sphere spheres\">");var i,v,__fest_to0,__fest_iterator0;try{__fest_iterator0=company.sphere || [];__fest_to0=__fest_iterator0.length;}catch(e){__fest_iterator0=[];__fest_to0=0;__fest_log_error(e.message);}for(i=0;i<__fest_to0;i++){v=__fest_iterator0[i];try{__fest_buf+=(__fest_escapeHTML(v))}catch(e){__fest_log_error(e.message + "21");}__fest_buf+=("<br/>");}__fest_buf+=("</div></div></div><div class=\"container__left_bottom\"><div class=\"container__left_bottom subscribe\">Я хочу тут работать</div><div class=\"container__left_bottom subscribe\">Подписаться</div></div></div><div class=\"container__right\"><div class=\"container__right_top\"><div class=\"container__right_top company-name\">");try{__fest_buf+=(__fest_escapeHTML(company.name))}catch(e){__fest_log_error(e.message + "33");}__fest_buf+=(", Россия</div></div><div class=\"container__right_middle\"><div class=\"container__right_middle info\">");try{__fest_buf+=(__fest_escapeHTML(company.description))}catch(e){__fest_log_error(e.message + "37");}__fest_buf+=("</div></div><div class=\"container__right_bottom\"><div class=\"container__right_bottom vacancies\"><div class=\"company__vacancies\">Вакансии компании</div><div class=\"vacancies__current-region\"><div class=\"vacancies__current-region all\"><span>Вакансии в текущем регионе: Россия</span><span>25</span></div><div class=\"vacancies__current-region group\"><span>Информационные технологии, интернет, телеком</span><span>2</span></div><div class=\"vacancies__current-region group\"><span>Продажи</span><span>1</span></div><div class=\"vacancies__current-region group\"><span>Бухгалтерия, управленческий учет, финансы предприятия</span><span>1</span></div><div class=\"vacancies__current-region group\"><span>Строительство, недвижимость</span><span>1</span></div><div class=\"vacancies__current-region group\"><span>Управление персоналом, тренинги</span><span>1</span></div><div class=\"vacancies__current-region group\"><span>Туризм, гостиницы, рестораны</span><span>1</span></div></div></div></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();