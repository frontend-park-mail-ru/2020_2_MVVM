;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['createCandidateSum.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
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
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var user=__fest_context;__fest_buf+=("<div class=\"container\"><div class=\"page__name\">Создание резюме</div><div class=\"sum__form__wrap\"><div class=\"sum__profile\"><div class=\"sum__profile__photo\"><img src=\"img\/profile.png\" alt=\"\"/></div><div class=\"sum__upload__photo\"><div class=\"sum__btn__blue\"><p>Загрузить аватар</p></div></div><div><h1>Ваше резюме</h1><div class=\"btm-apply-alternative sum__upload__resume\"><button class=\"sum__btn__pink\" type=\"submit\">Загрузить из файла</button><button class=\"sum__btn__pink\" type=\"submit\">Заказать резюме</button></div></div></div><div class=\"summary\"><form class=\"sum__candidate\" method=\"post\" action=\"#\"><div class=\"sum__title\"><label class=\"sum__form__labels\" for=\"title\">Название резюме</label><input class=\"sum__user__info\" id=\"title\" name=\"title\" type=\"text\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span></div><p class=\"sum__description__block\">Контактные данные</p><div><label class=\"sum__form__labels\" for=\"surname\">Фамилия</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.surname)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"sum__user__info\" id=\"surname\" name=\"surname\" type=\"text\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><div><label class=\"sum__form__labels\" for=\"username\">Имя</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.name)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"sum__user__info\" id=\"username\" name=\"name\" type=\"text\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><div class=\"sum__switch\"><div>Пол</div><label class=\"sum__form__switch\" for=\"male\"><input class=\"sum__input__switch\" id=\"male\" type=\"radio\" name=\"gender\" value=\"male\"/><div class=\"sum__switch__control sum__male\"></div></label><label class=\"sum__form__switch\" for=\"female\"><input class=\"sum__input__switch\" id=\"female\" type=\"radio\" name=\"gender\" value=\"female\"/><div class=\"sum__switch__control sum__female\"></div></label><br/><br/><br/></div><div><label class=\"sum__form__labels\" for=\"email\">E-mail</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.email)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"sum__user__info\" id=\"email\" name=\"email\" type=\"email\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><div><label class=\"sum__form__labels\" for=\"area_search\">Место работы</label><select class=\"sum__user__all\" id=\"area_search\" name=\"area_search\"><option value=\"москва\" selected=\"true\">Москва</option><option value=\"санкт-петербург\">Санкт-Петербург</option><option value=\"екатеринбург\">Екатеринбург</option></select></div><div><p class=\"sum__description__block\">Основная информация</p></div><div><div class=\"sum__work__exp__row2\"><label class=\"sum__form__labels\" for=\"description\">О себе</label><textarea name=\"description\" class=\"__sum__text\" id=\"description\"></textarea><span class=\"error\" aria-live=\"polite\"></span></div></div><div class=\"sum__exp-select\"><div><label class=\"sum__form__labels\">Общий трудовой стаж</label><select class=\"sum__user__all\" name=\"experience_month\"><option value=\"0\" selected=\"true\">не работал</option><option value=\"1\">меньше года</option><option value=\"5\">1-5 лет</option><option value=\"10\">5-10 лет</option><option value=\"11\">больше 10 лет</option></select></div><br/><div><label class=\"sum__form__labels\">Карьерный уровень</label><select class=\"sum__user__all\" name=\"career_level\"><option value=\"junior\" selected=\"true\">junior</option><option value=\"middle\">middle</option><option value=\"senior\">senior</option></select></div><div class=\"experience__add\"><label class=\"sum__form__labels\" for=\"experience\">Опыт работы</label><div class=\"experience__add_board\" id=\"experience_board\"></div><div class=\"btn__add_exp\" id=\"btn__add_exp\">Добавить опыт работы</div></div><div><label class=\"sum__form__labels\">Профессиональные навыки</label><textarea name=\"skills\" class=\"sum__user__info\" id=\"skills\" type=\"text\"></textarea><span class=\"error\" aria-live=\"polite\"></span></div><br/><div class=\"sum__exp__card\"><div><p class=\"sum__description__block\">Специальность</p><label class=\"sum__form__labels\" for=\"place\">Желаемая должность</label><input class=\"sum__user__info\" id=\"place\" name=\"place\" type=\"text\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span></div><label class=\"sum__form__labels\" for=\"salary\">Зарплата</label><div style=\"display:flex;\"><h4 style=\"align-self:end;\">От</h4><input name=\"salary_min\" class=\"sum__user__info\" id=\"citizenship\" type=\"text\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span><h4 style=\"align-self:end;\">До</h4><input name=\"salary_max\" class=\"sum__user__info\" id=\"citizenship\" type=\"text\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span></div><div><p class=\"sum__description__block\">Образование</p><label class=\"sum__form__labels\" for=\"education_level\"></label><select class=\"sum__user__all\" name=\"education_level\"><option value=\"middle\" selected=\"true\">Среднее</option><option value=\"specialized_secondary\">Среднее Специальное</option><option value=\"incomplete_higher\">Неоконченное высшее</option><option value=\"higher\">Высшее</option><option value=\"bachelor\">Бакалавр</option><option value=\"master\">Магистр</option><option value=\"phD\">Кандидат Наук</option><option value=\"doctoral\">Доктор наук</option></select></div></div></div><label class=\"sum__form__labels\" for=\"awards\"></label><div class=\"sum__achievements\"><label class=\"sum__form__labels\" for=\"awards\">Ваши сертификаты:</label><input class=\"sum__achievement\" id=\"awards\" type=\"file\" value=\"\"/></div><button id=\"send-form-cand\" class=\"sum__btn__pink\" type=\"submit\">Сохранить</button></form></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();