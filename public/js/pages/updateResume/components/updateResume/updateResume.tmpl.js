;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['updateResume.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
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
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var user=__fest_context;__fest_buf+=("<div class=\"container\"><div class=\"page-name\">Редактирование резюме</div><div class=\"sum-form-wrap\"><div class=\"sum-profile\"><div class=\"sum-profile__photo\"><img src=\"img\/profile.png\" alt=\"\"/></div><div class=\"sum-upload-photo\"><div class=\"sum-upload-photo__btn\"><p>Загрузить аватар</p></div></div><div><h1>Ваше резюме</h1><div class=\"btm-apply-alternative sum__upload__resume\"><button class=\"btn-pink\" type=\"submit\">Загрузить из файла</button><button class=\"btn-pink\" type=\"submit\">Заказать резюме</button></div></div></div><div class=\"summary\"><form class=\"sum-candidate\" method=\"post\" action=\"#\"><div class=\"sum__title\"><label class=\"sum-form__labels\" for=\"title\">Название резюме</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.title)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"sum-user-info\" id=\"title\" name=\"title\" type=\"text\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><p class=\"sum-description-block\">Контактные данные</p><div><label class=\"sum-form__labels\" for=\"surname\">Фамилия</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.surname)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"sum-user-info\" id=\"surname\" name=\"surname\" type=\"text\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><div><label class=\"sum-form__labels\" for=\"username\">Имя</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.name)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"sum-user-info\" id=\"username\" name=\"name\" type=\"text\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><div class=\"sum-switch\"><div>Пол</div>");try{__fest_if=user.gender=='male'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<label class=\"sum-form-switch\" for=\"male\"><input class=\"sum-form-switch__input\" id=\"male\" type=\"radio\" name=\"gender\" value=\"male\" checked=\"true\"/><div class=\"sum-form-switch__control sum__male\"></div></label><label class=\"sum-form-switch\" for=\"female\"><input class=\"sum-form-switch__input\" id=\"female\" type=\"radio\" name=\"gender\" value=\"female\"/><div class=\"sum-form-switch__control sum__female\"></div></label>");}try{__fest_if=user.gender=='female'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<label class=\"sum-form-switch\" for=\"male\"><input class=\"sum-form-switch__input\" id=\"male\" type=\"radio\" name=\"gender\" value=\"male\"/><div class=\"sum-form-switch__control sum__male\"></div></label><label class=\"sum-form-switch\" for=\"female\"><input class=\"sum-form-switch__input\" id=\"female\" type=\"radio\" name=\"gender\" value=\"female\" checked=\"true\"/><div class=\"sum-form-switch__control sum__female\"></div></label>");}try{__fest_if=user.gender==null || user.gender==''}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<label class=\"sum-form-switch\" for=\"male\"><input class=\"sum-form-switch__input\" id=\"male\" type=\"radio\" name=\"gender\" value=\"male\"/><div class=\"sum-form-switch__control sum__male\"></div></label><label class=\"sum-form-switch\" for=\"female\"><input class=\"sum-form-switch__input\" id=\"female\" type=\"radio\" name=\"gender\" value=\"female\"/><div class=\"sum-form-switch__control sum__female\"></div></label>");}__fest_buf+=("<br/><br/><br/></div><div><label class=\"sum-form__labels\" for=\"email\">E-mail</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.email)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"sum-user-info\" id=\"email\" name=\"email\" type=\"email\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><div><label class=\"sum-form__labels\" for=\"area_search\">Место работы</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.area_search)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<select class=\"sum-select\" id=\"area_search\" name=\"area_search\" value=\"" + __fest_attrs[0] + "\">");try{__fest_if=user.area_search=='москва' || user.area_search==null}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"москва\" selected=\"true\">Москва</option><option value=\"санкт-петербург\">Санкт-Петербург</option><option value=\"екатеринбург\">Екатеринбург</option>");}try{__fest_if=user.area_search=='санкт-петербург'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"москва\">Москва</option><option value=\"санкт-петербург\" selected=\"true\">Санкт-Петербург</option><option value=\"екатеринбург\">Екатеринбург</option>");}try{__fest_if=user.area_search=='екатеринбург'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"москва\">Москва</option><option value=\"санкт-петербург\">Санкт-Петербург</option><option value=\"екатеринбург\" selected=\"true\">Екатеринбург</option>");}__fest_buf+=("</select></div><div><p class=\"sum-description-block\">Основная информация</p></div><div><div class=\"sum__work__exp__row2\"><label class=\"sum-form__labels\" for=\"description\">О себе</label><textarea name=\"description\" class=\"sum-form__textarea\" id=\"description\">");try{__fest_buf+=(__fest_escapeHTML(user.description))}catch(e){__fest_log_error(e.message + "106");}__fest_buf+=("</textarea><span class=\"error\" aria-live=\"polite\"></span></div></div><div class=\"sum__exp-select\"><div><label class=\"sum-form__labels\">Общий трудовой стаж</label><select class=\"sum-select\" name=\"experience_month\">");try{__fest_if=user.experience_month=='0' || user.experience_month==null}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"0\" selected=\"true\">не работал</option><option value=\"1\">меньше года</option><option value=\"5\">1-5 лет</option><option value=\"10\">5-10 лет</option><option value=\"11\">больше 10 лет</option>");}try{__fest_if=user.experience_month=='1'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"0\">не работал</option><option value=\"1\" selected=\"true\">меньше года</option><option value=\"5\">1-5 лет</option><option value=\"10\">5-10 лет</option><option value=\"11\">больше 10 лет</option>");}try{__fest_if=user.experience_month=='5'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"0\">не работал</option><option value=\"1\">меньше года</option><option value=\"5\" selected=\"true\">1-5 лет</option><option value=\"10\">5-10 лет</option><option value=\"11\">больше 10 лет</option>");}try{__fest_if=user.experience_month=='10'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"0\">не работал</option><option value=\"1\">меньше года</option><option value=\"5\">1-5 лет</option><option value=\"10\" selected=\"true\">5-10 лет</option><option value=\"11\">больше 10 лет</option>");}try{__fest_if=user.experience_month=='11'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"0\">не работал</option><option value=\"1\">меньше года</option><option value=\"5\">1-5 лет</option><option value=\"10\">5-10 лет</option><option value=\"11\" selected=\"true\">больше 10 лет</option>");}__fest_buf+=("</select></div><br/><div><label class=\"sum-form__labels\">Карьерный уровень</label><select class=\"sum-select\" name=\"career_level\">");try{__fest_if=user.career_level=='junior' || user.career_level==null}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"junior\" selected=\"true\">junior</option><option value=\"middle\">middle</option><option value=\"senior\">senior</option>");}try{__fest_if=user.career_level=='middle'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"junior\">junior</option><option value=\"middle\" selected=\"true\">middle</option><option value=\"senior\">senior</option>");}try{__fest_if=user.career_level=='senior'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"junior\">junior</option><option value=\"middle\">middle</option><option value=\"senior\" selected=\"true\">senior</option>");}__fest_buf+=("</select></div><div class=\"experience-add\"><label class=\"sum-form__labels\" for=\"experience\">Опыт работы</label><div class=\"experience-add__board\" id=\"experience_board\">");var i,v,__fest_to0,__fest_iterator0;try{__fest_iterator0=user.experience || [];__fest_to0=__fest_iterator0.length;}catch(e){__fest_iterator0=[];__fest_to0=0;__fest_log_error(e.message);}for(i=0;i<__fest_to0;i++){v=__fest_iterator0[i];var __fest_context1;try{__fest_context1=v}catch(e){__fest_context1={};__fest_log_error(e.message)};(function(__fest_context){var job=__fest_context;__fest_buf+=("<div class=\"job\"><div class=\"job__container\"><div class=\"job__container_date\">");try{__fest_buf+=(__fest_escapeHTML(job.begin))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=("<div class=\"minus\">-</div>");try{__fest_buf+=(__fest_escapeHTML(job.finish))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=("</div><div class=\"job__container_organization\">");try{__fest_buf+=(__fest_escapeHTML(job.position))}catch(e){__fest_log_error(e.message + "7");}__fest_buf+=("</div><div class=\"job__container_position\">");try{__fest_buf+=(__fest_escapeHTML(job.name_job))}catch(e){__fest_log_error(e.message + "10");}__fest_buf+=("</div></div><div class=\"job__delete\">X</div></div>");})(__fest_context1);}__fest_buf+=("</div><div class=\"btn-add-exp\" id=\"btn-add-exp\">Добавить опыт работы</div></div><div><label class=\"sum-form__labels\">Профессиональные навыки</label><textarea name=\"skills\" class=\"sum-user-info\" id=\"skills\" type=\"text\">");try{__fest_buf+=(__fest_escapeHTML(user.skills))}catch(e){__fest_log_error(e.message + "194");}__fest_buf+=("</textarea><span class=\"error\" aria-live=\"polite\"></span></div><br/><div class=\"input-data-card\"><div><p class=\"sum-description-block\">Специальность</p><label class=\"sum-form__labels\" for=\"place\">Желаемая должность</label>");try{__fest_attrs[0]=__fest_escapeHTML(user.place)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input class=\"sum-user-info\" id=\"place\" name=\"place\" type=\"text\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><label class=\"sum-form__labels\" for=\"salary\">Зарплата</label><div style=\"display:flex;\"><h4 style=\"align-self:end;\">От</h4>");try{__fest_attrs[0]=__fest_escapeHTML(user.salary_min)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input name=\"salary_min\" class=\"sum-user-info\" id=\"citizenship\" type=\"text\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span><h4 style=\"align-self:end;\">До</h4>");try{__fest_attrs[0]=__fest_escapeHTML(user.salary_max)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input name=\"salary_max\" class=\"sum-user-info\" id=\"citizenship\" type=\"text\" value=\"" + __fest_attrs[0] + "\"/><span class=\"error\" aria-live=\"polite\"></span></div><div><p class=\"sum-description-block\">Образование</p><label class=\"sum-form__labels\" for=\"education_level\"></label><select class=\"sum-select\" name=\"education_level\">");try{__fest_if=user.education_level=='middle' || user.education_level==null}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"middle\" selected=\"true\">Среднее</option><option value=\"specialized_secondary\">Среднее специальное</option><option value=\"incomplete_higher\">Неоконченное высшее</option><option value=\"higher\">Высшее</option><option value=\"bachelor\">Бакалавр</option><option value=\"master\">Магистр</option><option value=\"phD\">Кандидат наук</option><option value=\"doctoral\">Доктор наук</option>");}try{__fest_if=user.education_level=='specialized_secondary'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"middle\">Среднее</option><option value=\"specialized_secondary\" selected=\"true\">Среднее специальное</option><option value=\"incomplete_higher\">Неоконченное высшее</option><option value=\"higher\">Высшее</option><option value=\"bachelor\">Бакалавр</option><option value=\"master\">Магистр</option><option value=\"phD\">Кандидат наук</option><option value=\"doctoral\">Доктор наук</option>");}try{__fest_if=user.education_level=='incomplete_higher'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"middle\">Среднее</option><option value=\"specialized_secondary\">Среднее специальное</option><option value=\"incomplete_higher\" selected=\"true\">Неоконченное высшее</option><option value=\"higher\">Высшее</option><option value=\"bachelor\">Бакалавр</option><option value=\"master\">Магистр</option><option value=\"phD\">Кандидат наук</option><option value=\"doctoral\">Доктор наук</option>");}try{__fest_if=user.education_level=='higher'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"middle\">Среднее</option><option value=\"specialized_secondary\">Среднее специальное</option><option value=\"incomplete_higher\">Неоконченное высшее</option><option value=\"higher\" selected=\"true\">Высшее</option><option value=\"bachelor\">Бакалавр</option><option value=\"master\">Магистр</option><option value=\"phD\">Кандидат наук</option><option value=\"doctoral\">Доктор наук</option>");}try{__fest_if=user.education_level=='bachelor'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"middle\">Среднее</option><option value=\"specialized_secondary\">Среднее специальное</option><option value=\"incomplete_higher\">Неоконченное высшее</option><option value=\"higher\">Высшее</option><option value=\"bachelor\" selected=\"true\">Бакалавр</option><option value=\"master\">Магистр</option><option value=\"phD\">Кандидат наук</option><option value=\"doctoral\">Доктор наук</option>");}try{__fest_if=user.education_level=='master'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"middle\">Среднее</option><option value=\"specialized_secondary\">Среднее специальное</option><option value=\"incomplete_higher\">Неоконченное высшее</option><option value=\"higher\">Высшее</option><option value=\"bachelor\">Бакалавр</option><option value=\"master\" selected=\"true\">Магистр</option><option value=\"phD\">Кандидат наук</option><option value=\"doctoral\">Доктор наук</option>");}try{__fest_if=user.education_level=='phD'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"middle\">Среднее</option><option value=\"specialized_secondary\">Среднее специальное</option><option value=\"incomplete_higher\">Неоконченное высшее</option><option value=\"higher\">Высшее</option><option value=\"bachelor\">Бакалавр</option><option value=\"master\">Магистр</option><option value=\"phD\" selected=\"true\">Кандидат наук</option><option value=\"doctoral\">Доктор наук</option>");}try{__fest_if=user.education_level=='doctoral'}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<option value=\"middle\">Среднее</option><option value=\"specialized_secondary\">Среднее специальное</option><option value=\"incomplete_higher\">Неоконченное высшее</option><option value=\"higher\">Высшее</option><option value=\"bachelor\">Бакалавр</option><option value=\"master\">Магистр</option><option value=\"phD\">Кандидат наук</option><option value=\"doctoral\" selected=\"true\">Доктор наук</option>");}__fest_buf+=("</select></div></div></div>");try{__fest_attrs[0]=__fest_escapeHTML(user.resume_id)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<input type=\"hidden\" name=\"resume_id\" value=\"" + __fest_attrs[0] + "\"/><button id=\"send-form-cand\" class=\"btn-pink\" type=\"submit\">Сохранить</button></form></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();