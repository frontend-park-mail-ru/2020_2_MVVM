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
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}__fest_buf+=("<div class=\"container\"><div class=\"sum__form__wrap\"><div class=\"sum__profile\"><div class=\"sum__profile__photo\"><img src=\"img\/profile.png\" alt=\"\"/></div><div class=\"sum__upload__photo\"><div class=\"sum__btn__blue\"><p>Загрузить аватар</p></div></div><div><h1>Ваше резюме</h1><div class=\"btm-apply-alternative sum__upload__resume\"><button class=\"sum__btn__pink\" type=\"submit\">Загрузить из файла</button><button class=\"sum__btn__pink\" type=\"submit\">Заказать резюме</button></div></div></div><div class=\"summary\"><form class=\"sum__candidate\" method=\"post\" action=\"#\"><div><p class=\"sum__description__block\">Контактные данные</p><label class=\"sum__form__labels\" for=\"username\">Имя*</label><input class=\"sum__user__info\" id=\"username\" type=\"text\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span></div><div><label class=\"sum__form__labels\" for=\"surname\">Фамилия*</label><input class=\"sum__user__info\" id=\"surname\" type=\"text\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span></div><div class=\"sum__switch\"><div>Пол*</div><label class=\"sum__form__switch\" for=\"male\"><input class=\"sum__input__switch\" id=\"male\" type=\"radio\" name=\"sex\" value=\"\"/><div class=\"sum__switch__control sum__male\"></div></label><label class=\"sum__form__switch\" for=\"female\"><input class=\"sum__input__switch\" id=\"female\" type=\"radio\" name=\"sex\" value=\"\"/><div class=\"sum__switch__control sum__female\"></div></label><br/><br/><br/></div><div><label class=\"sum__form__labels\" for=\"email\">E-mail*</label><input class=\"sum__user__info\" id=\"email\" type=\"email\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span></div><div><label class=\"sum__form__labels\" for=\"country\">Страна проживания</label><select class=\"sum__user__all\" id=\"country\"><option value=\"\">Россия</option><option value=\"\">Украина</option><option value=\"\">Беларусь</option></select></div><div><p class=\"sum__description__block\">Основная информация</p></div><div><label class=\"sum__form__labels\" for=\"date-birth\">Дата рождения*</label><input class=\"sum__date__birth\" type=\"date\" id=\"date-birth\" name=\"trip-start\" value=\"2000-01-01\" min=\"1930-01-01\" max=\"2010-12-12\"/></div><div><label class=\"sum__form__labels\" for=\"citizenship\">Гражданство*</label><input class=\"sum__user__info\" id=\"citizenship\" type=\"text\"/><span class=\"error\" aria-live=\"polite\"></span></div><div class=\"sum__exp-select\"><label class=\"sum__form__labels\">Опыт работы</label><br/><div class=\"sum__work__experience\"><input type=\"radio\" name=\"rb\" id=\"rb1\"/><label class=\"sum__form__labels\" for=\"rb1\">Есть опыт работы</label></div><div class=\"sum__work__experience\"><input type=\"radio\" name=\"rb\" id=\"rb2\"/><label class=\"sum__form__labels\" for=\"rb2\">Нет опыта работы</label></div><div class=\"sum__exp__card\"><div><p class=\"sum__description__block\">Специальность</p><label class=\"sum__form__labels\" for=\"place\">Желаемая должность*</label><input class=\"sum__user__info\" id=\"place\" type=\"text\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span></div><label class=\"sum__form__labels\" for=\"salary\">Зарплата</label><div class=\"sum__salary__row\"><input class=\"sum__user__info\" id=\"salary\" type=\"text\" value=\"\"/><span class=\"error\" aria-live=\"polite\"></span><label class=\"sum__form__labels\" for=\"select-salary\"></label><select class=\"sum__small__field\" id=\"select-salary\"><option value=\"\">руб.</option><option value=\"\">usd</option><option value=\"\">eur</option></select></div><a class=\"sum__prof__areas\" href=\"#\" id=\"prof-exp\">Указать профобласти</a><div><p class=\"sum__description__block\">Опыт работы</p><div class=\"sum__work__exp__row1\"><p>Места работы</p><button class=\"sum__btn__blue\" id=\"btn2\" type=\"submit\">Добавить место работы</button></div><div class=\"sum__work__exp__row2\"><p>О себе</p><label class=\"sum__form__labels\" for=\"description\"></label><textarea class=\"__sum__text\" id=\"description\"></textarea><span class=\"error\" aria-live=\"polite\"></span></div></div><div><p class=\"sum__description__block\">Образование</p><label class=\"sum__form__labels\" for=\"select-education\"></label><select class=\"sum__user__all\" id=\"select-education\"><option value=\"\">Среднее</option><option value=\"\">Среднее Специальное</option><option value=\"\">Неоконченное высшее</option><option value=\"\">Высшее</option><option value=\"\">Бакалавр</option><option value=\"\">Магистр</option><option value=\"\">Кандидат Наук</option><option value=\"\">Доктор наук</option></select></div><div class=\"sum__description__block\">Владение языками</div><div class=\"sum__description__single\"><label class=\"sum__form__labels\" for=\"select-language\">Родной язык</label><select class=\"sum__small__field\" id=\"select-language\"><option value=\"\">Русский</option><option value=\"\">Английский</option><option value=\"\">Французский</option><option value=\"\">Немецкий</option><option value=\"\">Китайский</option><option value=\"\">Другие</option></select></div><div class=\"sum__work__exp__row1\"><p>Иностранные языки</p><a class=\"sum__languages\" href=\"#\" id=\"lang\">Указать ещё один язык</a></div></div></div><label class=\"sum__form__labels\" for=\"achievement\"></label><div class=\"sum__achievements\"><label class=\"sum__form__labels\" for=\"achievement\">Ваши сертификаты:</label><input class=\"sum__achievement\" id=\"achievement\" type=\"file\" value=\"\"/></div><button id=\"send-form1\" class=\"sum__btn__pink\" type=\"submit\">Сохранить</button></form></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();