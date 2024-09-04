(function($){

	var _this = {};

	_this.step = {
		init : function(options) {
			var $ul		= $('<UL>'),
				option	= {						//step �듭뀡 [DEFAULT] :::::::::::::
					'step'		: ['�뺣낫�낅젰','�댁슜�뺤씤','�ㅽ뻾�꾨즺'],	//step �④퀎
					'on'		: 1,
					'wrap'		: null
				};

			$.extend(option, options);

			for(var i=1; i<=option.step.length; i++) {
				//$('<LI>').addClass(i==option.on?'on':'').text(i==option.on? i + '. ' + option.step[i-1] : i).appendTo($ul);
				$('<LI>').addClass(i==option.on?'on':'').html(i==option.on? i + '. ' + option.step[i-1] + "<span class='offscreen'>(�꾩옱�④퀎)</span>" : i).appendTo($ul);
				if(i==option.on) { document.title = i + "." + option.step[i-1] + " - " + document.title; }
			}

			if(option.wrap) {
				$(option.wrap).addClass('s_step').append($ul);
			} else if($('#pension-step-area').length) {
				$('#pension-step-area').addClass('s_step').append($ul);
			} else {

				if($('.s_step').length) {
					$('.s_step').html($ul);
					return false;
				}

				var $before = null;
				option.wrap = $('<DIV class="s_step">');

				if($('.h1_right_cont').length) {
					$before = $('.h1_right_cont');
				} else if(options.stepOnTab) {
					$before = $('.content_title');
				} else if($('#content .tabCon').length) {
					$before = $('#content .tabCon').children().first();
				} else {
					if(options.titleBox) {
						$before = $('.content_title');
					}
					else {
						$before = $('.content_title').closest('.comp');
					}
				}

				option.wrap.append($ul);

				if(options.titleBox) {
					$before.append(option.wrap);
				}
				else if(options.tobe) {
					$before = $('.content_title');
					$before.append(option.wrap);
				}
				else {
					$before.after(option.wrap);
				}

			}
			_this.step.option = option;
			_this.step.dom = $ul;
		},
		init_tobe : function(options) {
			var $ul		= $('<UL>'),
				option	= {						//step �듭뀡 [DEFAULT] :::::::::::::
					'step'		: ['�뺣낫�낅젰','�댁슜�뺤씤','�ㅽ뻾�꾨즺'],	//step �④퀎
					'on'		: 1,
					'wrap'		: null
				};

			$.extend(option, options);

			for(var i=1; i<=option.step.length; i++) {
				//$('<LI>').addClass(i==option.on?'on':'').text(i==option.on? i + '. ' + option.step[i-1] : i).appendTo($ul);
				$('<LI>').addClass(i==option.on?'on':'').html(i==option.on? i + ' ' + option.step[i-1] + "<span class='offscreen'>(�꾩옱�④퀎)</span>" : i).appendTo($ul);
				if(i==option.on) { document.title = i + "." + option.step[i-1] + " - " + document.title; }
			}

			if(option.wrap) {
				$(option.wrap).addClass('step_wrap').append($ul);
			} else if($('#pension-step-area').length) {
				$('#pension-step-area').addClass('step_wrap').append($ul);
			} else {

				if($('.step_wrap').length) {
					$('.step_wrap').html($ul);
					return false;
				}

				var $before = null;
				option.wrap = $('<DIV class="step_wrap">');

				if($('.h1_right_cont').length) {
					$before = $('.h1_right_cont');
				} else {
					$before = $('.content_title').closest('.comp');
				}

				option.wrap.append($ul);

				if(options.tobe) {
					$before = $('.content_title');
					$before.append(option.wrap);
				}
				else {
					$before.after(option.wrap);
				}
			}
			_this.step.option = option;
			_this.step.dom = $ul;
			UIcommon.step.init();
		},
		move : function(index) {
			_this.step.dom.children('LI').each(function(i) {
				$(this).removeClass('on').addClass(++i==index?'on':'').html(i==index? i + '. ' + _this.step.option.step[i-1] + "<span class='offscreen'>(�꾩옱�④퀎)</span>" : i);
			});

		}
	}

	_this.stepOld = {
			init : function(options) {
				var $ul		= $('<UL>').addClass('step clearfix'),
					option	= {						//step �듭뀡 [DEFAULT] :::::::::::::
						'step'		: ['�뺣낫�낅젰','�댁슜�뺤씤','�ㅽ뻾�꾨즺'],	//step �④퀎
						'on'		: 1,
						'wrap'		: $('.stepArea')
					};

				$.extend(option, options);

				$ul.addClass('deSize' + option.step.length + (option.step.length < 3 ? 'nd' : 'th'));

				for(var i=1; i<=option.step.length; i++) {
					var atv = i==option.on ? '_atv':'',
						$stepArea = $('<LI>').addClass('stepArea' + atv);

					$('<SPAN>').text(i).appendTo($stepArea);
					$('<EM>').text(option.step[i-1]).appendTo($stepArea);

					$ul.append($stepArea)

					if(i < option.step.length) {
						$('<LI>').addClass('progress' + atv).html('<img src="/inc/img/common/img_step_progress' + atv + '.png" alt="吏꾪뻾以�">').appendTo($ul);
					}
				}

				$(option.wrap).html($ul);
			}
		}

	/**
	 * �덉씠�� �앹뾽 珥덇린��
	 */
	_this.openLayer = function(options) {

		var $wrap = $('<DIV>'),
			option = {					//�덉씠�� �앹뾽 �듭뀡 [DEFAULT] :::::::::::::
				'size'		: 'm',		//�덉씠�� �ш린 :		l, m, s
				'title'		: false,	//�덉씠�� ���댄� :	false, '���댄�'
				'animate'	: true,		//�덉씠�� 紐⑥뀡 :		true, false
				'inContent'	: false,	//#content �대��� �꾩튂�쒗궗 寃쎌슦
				'replace'	: null,		//由ы뵆�덉씠�� �쒗궗 DOM
				'alert'		: false,		//寃쎄퀬�덉씠�� �щ�
				'closeBtn'	: true, 		//�덉씠�� �앹뾽 �곗륫 �곷떒�� X 踰꾪듉 �쒖떆 �щ�
				'scroll'	: true,			//�ㅽ겕濡� �앹꽦 �щ� (�앹꽦 媛��μ꽦)
				'buttons'	: [			/*	//踰꾪듉�� �꾩슂�� 寃쎌슦 �꾨옒 二쇱꽍 �댁슜�� �뺥깭濡� 踰꾪듉 Array[Map] �몄옄 援ы쁽!!!
					{
						'addClass'	: 'gray',	//異붽�濡� 遺��ы븷 �대옒�ㅻ챸 (mtl_button�� 湲곕낯�곸쑝濡� 遺��щ맂��.)
						'text'		: '踰꾪듉紐�'	//踰꾪듉�� �띿뒪��
						'click'		: function() {	//踰꾪듉 �대┃�� �몄텧�� �⑥닔 援ы쁽
							console.log('�대┃�덉쓣 寃쎌슦 遺��ы븷 �⑥닔');
						}
					}... 異붽�濡� 議댁옱�� 寃쎌슦 諛곗뿴 �뺥깭濡� �뺤쓽 */
				]
			};

		$.extend(option, options);

		//var _wrapClass = option.alert ? 'lp_alert' : 'layerPopup'
		var _wrapClass;
		if(options.className == "lSize") {
			_wrapClass = option.alert ? 'lp_alert' : 'layerPopup lSize'
		}
		else {
			_wrapClass = option.alert ? 'lp_alert' : 'layerPopup'
		}
		$wrap.addClass(_wrapClass);

		if(option.contents) {
			if($(option.contents).closest('.' + _wrapClass).length) {
				$wrap = $(option.contents).closest('.' + _wrapClass);
				if(options.title) {
					$wrap.find('H1').text(option.title);
				}

				$wrap.open_layerPopup(option.animate);
				return $wrap;
			}
		}

		if(options.scroll_tobe) {
			var conClass = "lp_contents scroll";
			if(options.isIframe){
				conClass = "lp_contents iframe-wrap scroll ";
			}

			var $body = $('<DIV>').addClass('layerPopup_wrap'),
			$cont = $('<DIV>').addClass(conClass),
			$cBtn = $('<BUTTON>').attr({
				'class' : 'lp_btnClose',
				'type'	: 'button'
			});
		}
		else {
			var conClass = "lp_contents";
			if(options.isIframe){
				conClass = "lp_contents iframe-wrap ";
			}

			var $body = $('<DIV>').addClass('layerPopup_wrap'),
			$cont = $('<DIV>').addClass(conClass),
			$cBtn = $('<BUTTON>').attr({
				'class' : 'lp_btnClose',
				'type'	: 'button'
			});

			if(options.wrapClass){
				$body.addClass('no-title')
			}
		}

		if(option.size) {
			option.size = option.size.toLowerCase();
			if('m' != option.size) {
				$wrap.addClass(option.size + 'Size');
			}
		}

		if(option.title) {
			$('<H1>').html(option.title).appendTo($body);
		}

		if(!option.scroll) {
			$cont.addClass('noMaxH');
		}

		//ajax submit�� �꾩슂�� 寃쎌슦 ajax �듭뀡媛믪쓣 遺��ы븳��.
		if(option.ajax && 'function' === typeof window.xSubmitAjax) {
			if('object' === typeof option.ajax) {
				$.extend(true, option.ajax, {
					async : false,
					success : function(data) {
						option.contents = $.trim(data);
					}
				});
				xSubmitAjax(option.ajax.form || null, option.ajax);
			}
		}

		if(option.contents) {

			if($(option.contents).removeClass('popup').closest('FORM').length) {
				$(option.contents).closest('FORM').append($wrap);
			} else {
				$(option.inContent ? '#content' : 'BODY').append($wrap);
			}

			$cont.append(option.contents);
		}


		$body.append($cont);
		option.closeBtn ? $body.append($cBtn) : '';
		$wrap.append('<div class="lp_top_line"></div>').append($body);

		if(option.buttons.length > 0) {

			var $btnWrap = $('<div class="layerPopup_bottom t_center"></div>')
			$body.after($btnWrap);

			$(option.buttons).each(function(i,e){
				var $btn = $('<button type="button" class="mtl_button ' + (e.addClass || '') + '"><span>' + (e.text || '') + '</span><div></div></button>')
				if('function' === typeof e.click) {
					$btn.on('click', e.click);
				}
				$btnWrap.append($btn);
			});

		}

		if(null != option.replace && 'object' === typeof option.replace) {
			if(!(option.replace instanceof jQuery)) {
				option.replace = $(option.replace);
			}

			$.each(option.replace.get(0).attributes, function() {
				if(this.specified) {
					if('class' === this.name) {
						$wrap.addClass(this.value.replace('popup', ''));
					} else if('style' !== this.name) {
						$wrap.attr(this.name, this.value);
					}
				}
			});

			option.replace.replaceWith($wrap);
		}

		$cBtn.off('click').on('click', function() {
			$wrap.close_layerPopup(option.animate);

		});

		// �덉씠�� �앹뾽 open �꾩뿉 callback �몄텧
		if(option.callback && 'function' === typeof option.callback) {
			option.callback();
		}

		$wrap.data('setting', option);
		$wrap.open_layerPopup(option.animate);
		if(options.scroll_tobe) {
			jQuery('.lp_contents.scroll').perfectScrollbar();
		}
		return $wrap;
	};

	_this.newOpenLayer = function(options) {
//		var $Wrap = $('<div class="modal modal_alert fade" id="dataAlert" tabindex="-1" role="dialog" aria-hidden="true"></div>');
		var $Wrap = $('<div class="modal modal_alert fade" id="dataAlert" role="dialog"></div>');
		var $Wrap2 = $('<div class="modal_dialog" role="document"></div>');
		var $Content = $('<div class="modal_content"></div>');
		var $Body = $('<div class="modal_body"></div>');
		var $BodyWrap = $('<div class="wrapper"></div>');
		var $BodyWrap2 = $('<div class="comp sc_wrap"></div>');
		var $Footer = $('<div class="modal_footer"></div>');
		var $FooterBtn = $('<div class="btn_area"></div>');

		$Footer.append($FooterBtn);
		$BodyWrap.append($BodyWrap2);
		$Body.append($BodyWrap);
		$Content.append($Body, $Footer);
		$Wrap2.append($Content);
		$Wrap.append($Wrap2);
		$('#wrap').append($Wrap);
		var options = options == undefined ? {} : options;
		var msg = options.msg == undefined ? "" : options.msg;
		var title = options.title == undefined ? '' : options.title ;
		var focusBtn = options.focusBtn == undefined ? null : options.focusBtn;
		var openCallback = options.openCallback == undefined ? function(){} : options.openCallback;
		var closeCallback = options.closeCallback == undefined ? function(){} : options.closeCallback;
		var okBtn = options.okBtn == undefined ? "�뺤씤" : options.okBtn;
		var cancelBtn = options.cancelBtn == undefined ? "" : options.cancelBtn;
		var cancelCallBack = options.cancelCallBack == undefined ? function(){} : options.cancelCallBack;

		layerPop.alert(
			$('#dataAlert')
			, {
				title : title,
				 msg : msg
				, buttonTitle : {
					cancel :  cancelBtn,
					ok : okBtn
				}
				, calllBack : {
						//cancel : cancelCallBack(),
					cancel : cancelCallBack,
					ok : function(){
						//console.log('�뺤씤 踰꾪듉 CallBack')
						//-------------------
						//layerPop.close()
						//@param1 : �덉씠��
						//@param2 : �リ린 �댄썑 �ъ빱�� 媛��쇳븷 媛앹껜
						//@param3 : callBackfunc();
						layerPop.close('#dataAlert', focusBtn, function(){
							/* console.log('�앹뾽�� �ロ엳怨� �쒕몢 肄쒕갚') */
							closeCallback();
						} );
						return false;
					}
				}
			}
			, function(){
				//console.log('�앹뾽�� �대━怨� �쒕뮘 CallBack')
				openCallback();
			}
		);
	};

	_this.setCookie = function(name, value, expiredays) {
		var todayDate = new Date();
		if (expiredays === undefined || expiredays == null) {
			expiredays = 7;
		}
		todayDate.setDate(todayDate.getDate() + expiredays);
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
	};

	_this.getCookie = function(name) {
		var nameOfCookie = name + "=";
		var x = 0;
		while (x <= document.cookie.length) {
			var y = (x + nameOfCookie.length);
			if (document.cookie.substring(x, y) == nameOfCookie) {
				if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
					endOfCookie = document.cookie.length;
				return unescape(document.cookie.substring(y, endOfCookie));
			}
			x = document.cookie.indexOf(" ", x) + 1;
			if (x == 0)
				break;
		}
		return "";
	};


	$(window).resize(function() {
		$('.layerPopup.on').each(function() {
			var $this = $(this);
			$this.css('top', ($(window).outerHeight() - $this.outerHeight()) /2);
		});
	});

	/**
	 * material UI 而댄룷�뚰듃 �덈줈怨좎묠
	 */
	_this.mtl_refresh = {

			select : function() {
				setTimeout(function() {
					$(document).find('.mtl_selectbox').each(function() {
						var $this = $(this);
						$this.children('A').text($this.find(':selected').text());
						$this.toggleClass('disabled', $this.children('SELECT').prop('disabled'))
					});
				},100);
			},
			checkbox : function() {
				setTimeout(function() {
					$(document).find('.mtl_checkbox').each(function() {
						var $this = $(this);
						$this.toggleClass('checked', $this.find(':INPUT').prop('checked'));
						$this.toggleClass('disabled', $this.find(':INPUT').prop('disabled'));
					});
				},100);
			},
			checkbox2 : function() {
				setTimeout(function() {
					$(document).find('.mtl_checkbox.penpord').each(function() {
						var $this = $(this);
						$this.toggleClass('checked', $this.find(':INPUT').prop('checked'));
						$this.toggleClass('disabled', $this.find(':INPUT').prop('disabled'));
					});
				},100);
			},
			radio : function() {
				setTimeout(function() {
					$(document).find('.mtl_radio').each(function() {
						var $this = $(this);
						$this.toggleClass('checked', $this.find(':INPUT').prop('checked'));
						$this.toggleClass('disabled', $this.find(':INPUT').prop('disabled'));
					});
				},100);
			},
			all : function() {
				_this.mtl_refresh.select();
				_this.mtl_refresh.checkbox();
				_this.mtl_refresh.radio();
			},
			all2 : function() {
				_this.mtl_refresh.select();
				_this.mtl_refresh.listCheckbox();
				_this.mtl_refresh.radio();
			},
			all3 : function() {
				_this.mtl_refresh.checkbox();
			},
			listCheckbox : function() { //�꾩껜 泥댄겕諛뺤뒪瑜� �뗮똿�섎뒗寃� �꾨땲�� �곹뭹紐⑸줉 �뚯씠釉붿쓽 泥댄겕諛뺤뒪留� �뗮똿�섎룄濡� 異붽�
				setTimeout(function() {
					$(document).find('.tableChkList').each(function() {
						var $this = $(this);
						$this.toggleClass('checked', $this.find(':INPUT').prop('checked'));
						$this.toggleClass('disabled', $this.find(':INPUT').prop('disabled'));
					});
				},100);
			}
	}


	/**
	* H1 �놁뿉 遺�媛��ㅻ챸 怨듯넻泥섎━
	* �낅젰�� Text留� param�쇰줈 �섍꺼二쇰㈃ �⑸땲��.
	**/
	_this.titleDsc = function(dsc) {
		var $h1 = jQuery('.content_title > h1');
		var description = '<span class="lv5">' + dsc + '</span>';
		$h1.append(description);

		return $h1;
	}

	/**
	* 2022 蹂�寃�
	* H1 �꾩뿉 遺�媛��ㅻ챸 怨듯넻泥섎━
	* �낅젰�� Text留� param�쇰줈 �섍꺼二쇰㈃ �⑸땲��.
	**/
	_this.titleDsc2 = function(dsc) {
		var $h1 = jQuery('.content_title');
		if(dsc == "珥덇퀬�꾪뿕"){
			var description = '<div class="tag-wrap"><span class="taglabel risk5">' + dsc + '</span></div>';
		}else if(dsc == "怨좎쐞��"){
			var description = '<div class="tag-wrap"><span class="taglabel risk4">' + dsc + '</span></div>';
		}else if(dsc == "以묒쐞��"){
			var description = '<div class="tag-wrap"><span class="taglabel risk3">' + dsc + '</span></div>';
		}else if(dsc == "���꾪뿕"){
			var description = '<div class="tag-wrap"><span class="taglabel risk2">' + dsc + '</span></div>';
		}else if(dsc == "珥덉��꾪뿕"){
			var description = '<div class="tag-wrap"><span class="taglabel risk1">' + dsc + '</span></div>';
		}else if(dsc.indexOf("1�깃툒") != -1 || dsc.indexOf("留ㅼ슦�믪��꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk6">留ㅼ슦�믪��꾪뿕</span></div>';
		}else if(dsc.indexOf("3�깃툒") != -1 || dsc.indexOf("�ㅼ냼�믪��꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk4">�ㅼ냼�믪��꾪뿕</span></div>';
		}else if(dsc.indexOf("2�깃툒") != -1 || dsc.indexOf("�믪��꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk5">�믪��꾪뿕</span></div>';
		}else if(dsc.indexOf("4�깃툒") != -1 || dsc.indexOf("蹂댄넻�꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk3">蹂댄넻�꾪뿕</span></div>';
		}else if(dsc.indexOf("6�깃툒") != -1 || dsc.indexOf("留ㅼ슦����꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk1">留ㅼ슦����꾪뿕</span></div>';
		}else if(dsc.indexOf("5�깃툒") != -1 || dsc.indexOf("����꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk2">����꾪뿕</span></div>';
		}else {
			var description = "�꾪뿕�곗씠�� �ㅻ쪟";
		}
		jQuery('.content_title').append(description);

		return $h1;
	}

	/**
	 * 2022 由щ돱�� 蹂�寃�
	 * H1 �꾩뿉 遺�媛��ㅻ챸 怨듯넻泥섎━
	 * �낅젰�� Text留� param�쇰줈 �섍꺼二쇰㈃ �⑸땲��.
	 * 23.11 �ъ옄��/��異쒖꽦 �곹뭹�꾪뿕�깃툒 遺꾧린
	 **/
	_this.titleDsc3 = function(dsc) {
		var $h1 = jQuery('.content_title');
		if(dsc.indexOf("珥덇퀬�꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel risk5">留ㅼ슦�믪��꾪뿕</span></div>';
		}else if(dsc.indexOf("怨좎쐞��") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel risk4">怨좎쐞��</span></div>';
		}else if(dsc.indexOf("以묒쐞��") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel risk3">以묒쐞��</span></div>';
		}else if(dsc.indexOf("珥덉��꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel risk1">珥덉��꾪뿕</span></div>';
		}else if(dsc.indexOf("���꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel risk2">���꾪뿕</span></div>';
		}else if(dsc.indexOf("1�깃툒") != -1 || dsc.indexOf("留ㅼ슦�믪��꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk6">留ㅼ슦�믪��꾪뿕</span></div>';
		}else if(dsc.indexOf("3�깃툒") != -1 || dsc.indexOf("�ㅼ냼�믪��꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk4">�ㅼ냼�믪��꾪뿕</span></div>';
		}else if(dsc.indexOf("2�깃툒") != -1 || dsc.indexOf("�믪��꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk5">�믪��꾪뿕</span></div>';
		}else if(dsc.indexOf("4�깃툒") != -1 || dsc.indexOf("蹂댄넻�꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk3">蹂댄넻�꾪뿕</span></div>';
		}else if(dsc.indexOf("6�깃툒") != -1 || dsc.indexOf("留ㅼ슦����꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk1">留ㅼ슦����꾪뿕</span></div>';
		}else if(dsc.indexOf("5�깃툒") != -1 || dsc.indexOf("����꾪뿕") != -1){
			var description = '<div class="tag-wrap"><span class="taglabel newRisk2">����꾪뿕</span></div>';
		}else {
			var description = '<div class="tag-wrap"><span class="taglabel risk">' + dsc + '</span></div>';
		}
		jQuery('.content_title').prepend(description);

		return $h1;
	}

	/**
	* �쎄�
	* �뚮씪誘명꽣 �먭�吏� 諛⑹떇�쇰줈 �숈옉�쒕떎.
	* compUtil.viewAgreement(object)					: �듭뀡 �ㅼ젙�� �ㅻ툕�앺듃濡� �묒꽦
	* compUtil.viewAgreement(url, title, elem, click)	: 媛� �뚮씪誘명꽣濡� �ㅼ젙
	**/
	_this.viewAgreement = function(url, title, elem, click) {
		var $pressBtn = $(document).find(":focus"); //2020-05-11 異붽�
		var $ifrm	= $('<IFRAME title="而⑦뀗痢� �꾩씠�꾨젅��"></IFRAME>'),
			$agreeArea = $('<DIV class="lp_bot_center"></DIV>'),
			$agreeBtn = $('<A href="javascript:;" class="mtl_button">�뺤씤 諛� �숈쓽</A>'),
			$layer	= null,
			option	= {
				'title' : '',
				'url' : undefined,
				'elem' : undefined,
				'elemFlag' : undefined,
				'click' : undefined,
				'closeEvent' :undefined
			}

		switch(typeof url) {
		case 'string' :
			option.url = url;

			if(title)	option.title = title;
			if(elem)	option.elem = elem;
			if(click)	option.click = click;
			break;

		case 'object' :
			$.extend(option, url);
		}

		if(!option.url) {
			return;
		}

		showProgressBar();

		$ifrm.attr({
			'src' : option.url,
			'class' : 'hidden'
		}).css({
			'width' : '100%',
			'height' : 'auto',
			'border' : '1px solid #bababa'
		}).appendTo('body').on('load', function() {
			hideProgressBar();

			$layer = _this.openLayer({
				'title' : option.title,
				'contents' : $ifrm.removeClass('hidden')
			});

			$agreeArea.append($agreeBtn);
			$layer.find('.layerPopup_wrap').after($agreeArea);
			$layer.find('H1').addClass('fs23');

			if(option.elem) {
				if(!(option.elem instanceof jQuery)) {
					option.elem = $(option.elem);
				}

				$agreeBtn.off('click').on('click', function() {
					if(!option.elem.is(':input'))
						return;
					if(option.elem.is(':checkbox')) {
						option.elem.prop('disabled', false).prop('checked', true);
						_this.mtl_refresh.checkbox();
					} else if(option.elem.is(':radio')) {
						option.elem.closest('FORM')
							.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false)
							.filter('[value="Y"],[value="y"],[value="' + (option.elemFlag || '01') + '"]').prop('checked', true);
						_this.mtl_refresh.radio();
					} else if(option.elem.is(':hidden')) {
						option.elem.each(function() {
							this.value = 'Y';
						})
					}

					$layer.close_layerPopup();
					$pressBtn.focus();
					$layer.remove();
				});
			}
			if(option.click) {
				$agreeBtn.off('click').on('click', function() {
					option.click($layer, option);
					$layer.close_layerPopup();
					$pressBtn.focus();
				});
			}

			if(option.closeEvent && 'function' === typeof option.closeEvent) {
				$layer.find('.lp_btnClose').off('click').on('click', function() {
					option.closeEvent($layer, option);
				})
			} else if(option.elem.is(':input')) {
				$layer.find('.lp_btnClose').off('click').on('click', function() {
					if(option.elem.is(':checkbox')) {
						option.elem.prop('disabled', false);
						_this.mtl_refresh.checkbox();
					} else if(option.elem.is(':radio')) {
						option.elem.closest('FORM')
							.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false);
						_this.mtl_refresh.radio();
					}
					$layer.close_layerPopup();
					$pressBtn.focus();
				})
			}
		});

	}

	/**
	* �쎄�
	* �뚮씪誘명꽣 �먭�吏� 諛⑹떇�쇰줈 �숈옉�쒕떎.
	* compUtil.viewAgreement2(object)					: �듭뀡 �ㅼ젙�� �ㅻ툕�앺듃濡� �묒꽦
	* compUtil.viewAgreement2(url, title, elem, click)	: 媛� �뚮씪誘명꽣濡� �ㅼ젙
	**/
	_this.viewAgreement2 = function(url, title, elem, click) {
		var $pressBtn = $(document).find(":focus"); //2020-05-11 異붽�
		var $ifrm	= $('<IFRAME title="而⑦뀗痢� �꾩씠�꾨젅��"></IFRAME>'),
			$agreeArea = $('<DIV class="lp_bot_center"></DIV>'),
			// mtl_button => btn_Blue �대옒�� 蹂�寃�
			$agreeBtn = $('<A href="javascript:;" class="btn_Blue">�뺤씤 諛� �숈쓽</A>'),
			$layer	= null,
			option	= {
				'title' : '',
				'url' : undefined,
				'elem' : undefined,
				'iframe' : undefined,
				'elemFlag' : undefined,
				'click' : undefined,
				'closeEvent' :undefined
			}

		switch(typeof url) {
			case 'string' :
			option.url = url;

			if(title)	option.title = title;
			if(elem)	option.elem = elem;
			if(click)	option.click = click;
			break;

			case 'object' :
				$.extend(option, url);
		}

		if(!option.url) {
			return;
		}

		showProgressBar();

		if(url.iframe == true){
			$ifrm.attr({
				'src' : option.url,
				'class' : 'hidden'
			}).css({
				'width' : '100%'
			}).appendTo('body').on('load', function() {
				hideProgressBar();

					$layer = _this.openLayer({
						'title' : option.title,
						'contents' : $ifrm.removeClass('hidden'),
						'isIframe' : true
					});

				$agreeArea.append($agreeBtn);
				//$layer.find('.layerPopup_wrap').after($agreeArea);
				// 蹂�寃�
				$layer.find('.layerPopup_wrap').append($agreeArea);
				$layer.find('H1').addClass('fs23');

				if(option.elem) {
					if(!(option.elem instanceof jQuery)) {
						option.elem = $(option.elem);
					}

					$agreeBtn.off('click').on('click', function() {
						if(!option.elem.is(':input'))
							return;
						if(option.elem.is(':checkbox')) {
							option.elem.prop('disabled', false).prop('checked', true);
							_this.mtl_refresh.checkbox();
						} else if(option.elem.is(':radio')) {
							option.elem.closest('FORM')
								.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false)
								.filter('[value="Y"],[value="y"],[value="' + (option.elemFlag || '01') + '"]').prop('checked', true);
							_this.mtl_refresh.radio();
						} else if(option.elem.is(':hidden')) {
							option.elem.each(function() {
								this.value = 'Y';
							})
						}

						$layer.close_layerPopup();
						$pressBtn.focus();
						$layer.remove();
					});
				}
				if(option.click) {
					$agreeBtn.off('click').on('click', function() {
						option.click($layer, option);
						$layer.close_layerPopup();
						$pressBtn.focus();
					});
				}

				if(option.closeEvent && 'function' === typeof option.closeEvent) {
					$layer.find('.lp_btnClose').off('click').on('click', function() {
						option.closeEvent($layer, option);
					})
				} else if(option.elem.is(':input')) {
					$layer.find('.lp_btnClose').off('click').on('click', function() {
						if(option.elem.is(':checkbox')) {
							option.elem.prop('disabled', false);
							_this.mtl_refresh.checkbox();
						} else if(option.elem.is(':radio')) {
							option.elem.closest('FORM')
								.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false);
							_this.mtl_refresh.radio();
						}
						$layer.close_layerPopup();
						$pressBtn.focus();
					})
				}
			});
		}else{
			$ifrm.attr({
				'src' : option.url,
				'class' : 'hidden'
			}).css({
				'width' : '100%',
				'height' : '300px'
			}).appendTo('body').on('load', function() {
				hideProgressBar();

					$layer = _this.openLayer({
						'title' : option.title,
						'contents' : $ifrm.removeClass('hidden')
					});

				$agreeArea.append($agreeBtn);
				//$layer.find('.layerPopup_wrap').after($agreeArea);
				// 蹂�寃�
				$layer.find('.layerPopup_wrap').append($agreeArea);
				$layer.find('H1').addClass('fs23');

				if(option.elem) {
					if(!(option.elem instanceof jQuery)) {
						option.elem = $(option.elem);
					}

					$agreeBtn.off('click').on('click', function() {
						if(!option.elem.is(':input'))
							return;
						if(option.elem.is(':checkbox')) {
							option.elem.prop('disabled', false).prop('checked', true);
							_this.mtl_refresh.checkbox();
						} else if(option.elem.is(':radio')) {
							option.elem.closest('FORM')
								.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false)
								.filter('[value="Y"],[value="y"],[value="' + (option.elemFlag || '01') + '"]').prop('checked', true);
							_this.mtl_refresh.radio();
						} else if(option.elem.is(':hidden')) {
							option.elem.each(function() {
								this.value = 'Y';
							})
						}

						$layer.close_layerPopup();
						$pressBtn.focus();
						$layer.remove();
					});
				}
				if(option.click) {
					$agreeBtn.off('click').on('click', function() {
						option.click($layer, option);
						$layer.close_layerPopup();
						$pressBtn.focus();
					});
				}

				if(option.closeEvent && 'function' === typeof option.closeEvent) {
					$layer.find('.lp_btnClose').off('click').on('click', function() {
						option.closeEvent($layer, option);
					})
				} else if(option.elem.is(':input')) {
					$layer.find('.lp_btnClose').off('click').on('click', function() {
						if(option.elem.is(':checkbox')) {
							option.elem.prop('disabled', false);
							_this.mtl_refresh.checkbox();
						} else if(option.elem.is(':radio')) {
							option.elem.closest('FORM')
								.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false);
							_this.mtl_refresh.radio();
						}
						$layer.close_layerPopup();
						$pressBtn.focus();
					})
				}
			});
		}

	}

	//2022由щ돱��
	_this.viewAgreement3 = function(url, title, elem, click) {
		var $pressBtn = $(document).find(":focus"); //2020-05-11 異붽�
		var $ifrm	= $('<IFRAME title="而⑦뀗痢� �꾩씠�꾨젅��"></IFRAME>'),
			$agreeArea = $('<DIV class="lp_bot_center"></DIV>'),
			$agreeBtn = $('<A href="javascript:;" class="mtl_button">�뺤씤 諛� �숈쓽</A>'),
			$layer	= null,
			option	= {
				'title' : '',
				'url' : undefined,
				'elem' : undefined,
				'elemFlag' : undefined,
				'click' : undefined,
				'closeEvent' :undefined
			}

		switch(typeof url) {
		case 'string' :
			option.url = url;

			if(title)	option.title = title;
			if(elem)	option.elem = elem;
			if(click)	option.click = click;
			break;

		case 'object' :
			$.extend(option, url);
		}

		if(!option.url) {
			return;
		}

		showProgressBar();

		$ifrm.attr({
			'src' : option.url,
			'class' : 'hidden'
		}).css({
			'width' : '100%',
			'height' : '300px',
			'border' : '1px solid rgb(186, 186, 186)'
		}).appendTo('body').on('load', function() {
			hideProgressBar();

			if(option.title == "RP �ㅻ챸��"){
				$layer = _this.openLayer({
					'title' : option.title,
					'contents' : $ifrm.removeClass('hidden'),
					'size' : 'l'
				});
			}else{
				$layer = _this.openLayer({
					'title' : option.title,
					'contents' : $ifrm.removeClass('hidden')
				});
			}

			$agreeArea.append($agreeBtn);
			//$layer.find('.layerPopup_wrap').after($agreeArea);
			//$layer.find('H1').addClass('fs23');
			$layer.find('.layerPopup_wrap').append($agreeArea);

			if(option.elem) {
				if(!(option.elem instanceof jQuery)) {
					option.elem = $(option.elem);
				}

				$agreeBtn.off('click').on('click', function() {
					if(!option.elem.is(':input'))
						return;
					if(option.elem.is(':checkbox')) {
						option.elem.prop('disabled', false).prop('checked', true);
						_this.mtl_refresh.checkbox();
					} else if(option.elem.is(':radio')) {
						option.elem.closest('FORM')
							.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false)
							.filter('[value="Y"],[value="y"],[value="' + (option.elemFlag || '01') + '"]').prop('checked', true);
						_this.mtl_refresh.radio();
					} else if(option.elem.is(':hidden')) {
						option.elem.each(function() {
							this.value = 'Y';
						})
					}

					$layer.close_layerPopup();
					$pressBtn.focus();
					$layer.remove();
				});
			}
			if(option.click) {
				$agreeBtn.off('click').on('click', function() {
					option.click($layer, option);
					$layer.close_layerPopup();
					$pressBtn.focus();
				});
			}

			if(option.closeEvent && 'function' === typeof option.closeEvent) {
				$layer.find('.lp_btnClose').off('click').on('click', function() {
					option.closeEvent($layer, option);
				})
			} else if(option.elem.is(':input')) {
				$layer.find('.lp_btnClose').off('click').on('click', function() {
					if(option.elem.is(':checkbox')) {
						option.elem.prop('disabled', false);
						_this.mtl_refresh.checkbox();
					} else if(option.elem.is(':radio')) {
						option.elem.closest('FORM')
							.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false);
						_this.mtl_refresh.radio();
					}
					$layer.close_layerPopup();
					$pressBtn.focus();
				})
			}
		});
		$agreeArea.remove();
	}

	// �앹뾽 �ш린 �듭뀡
	_this.viewAgreement4 = function(url, title, elem, click) {
		var $pressBtn = $(document).find(":focus"); //2020-05-11 異붽�
		var $ifrm	= $('<IFRAME title="而⑦뀗痢� �꾩씠�꾨젅��"></IFRAME>'),
			$agreeArea = $('<DIV class="lp_bot_center"></DIV>'),
			// mtl_button => btn_Blue �대옒�� 蹂�寃�
			$agreeBtn = $('<A href="javascript:;" class="btn_Blue">�뺤씤 諛� �숈쓽</A>'),
			$layer	= null,
			option	= {
				'title' : '',
				'url' : undefined,
				'width' : '100%',
				'height' : '100%',
				'size' : undefined,
				'isIframe' : undefined,
				'elem' : undefined,
				'elemFlag' : undefined,
				'click' : undefined,
				'closeEvent' :undefined
			}

		switch(typeof url) {
			case 'string' :
				option.url = url;

				if(title)	option.title = title;
				if(elem)	option.elem = elem;
				if(click)	option.click = click;
				break;

			case 'object' :
				$.extend(option, url);
		}

		if(!option.url) {
			return;
		}

		showProgressBar();

		$ifrm.attr({
			'src' : option.url,
			'class' : 'hidden'
		}).css({
			'width' : option.width,
			'height' : option.height
		}).appendTo('body').on('load', function() {
			hideProgressBar();

			$layer = _this.openLayer({
				'title' : option.title,
				'contents' : $ifrm.removeClass('hidden'),
				'isIframe' : option.isIframe
			});

			$agreeArea.append($agreeBtn);

			$layer.find('.layerPopup_wrap').append($agreeArea);
			$layer.find('H1').addClass('fs23');

			if(option.size != '' && option.size != undefined) {
				$layer.find('.layerPopup_wrap').parent().addClass(option.size);
			}

			if(option.elem) {
				if(!(option.elem instanceof jQuery)) {
					option.elem = $(option.elem);
				}

				$agreeBtn.off('click').on('click', function() {
					if(!option.elem.is(':input'))
						return;
					if(option.elem.is(':checkbox')) {
						option.elem.prop('disabled', false).prop('checked', true);
						_this.mtl_refresh.checkbox();
					} else if(option.elem.is(':radio')) {
						option.elem.closest('FORM')
							.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false)
							.filter('[value="Y"],[value="y"],[value="' + (option.elemFlag || '01') + '"]').prop('checked', true);
						_this.mtl_refresh.radio();
					} else if(option.elem.is(':hidden')) {
						option.elem.each(function() {
							this.value = 'Y';
						})
					}

					$layer.close_layerPopup();
					$pressBtn.focus();
					$layer.remove();
				});
			}
			if(option.click) {
				$agreeBtn.off('click').on('click', function() {
					option.click($layer, option);
					$layer.close_layerPopup();
					$pressBtn.focus();
				});
			}

			if(option.closeEvent && 'function' === typeof option.closeEvent) {
				$layer.find('.lp_btnClose').off('click').on('click', function() {
					option.closeEvent($layer, option);
				})
			} else if(option.elem.is(':input')) {
				$layer.find('.lp_btnClose').off('click').on('click', function() {
					if(option.elem.is(':checkbox')) {
						option.elem.prop('disabled', false);
						_this.mtl_refresh.checkbox();
					} else if(option.elem.is(':radio')) {
						option.elem.closest('FORM')
							.find(':radio[name="' + option.elem.attr('name') + '"]').prop('disabled', false);
						_this.mtl_refresh.radio();
					}
					$layer.close_layerPopup();
					$pressBtn.focus();
				})
			}
		});
	}

	/**
	* json �뺥깭�� object�먯꽌 議댁옱�섎뒗 �꾨줈�쇳떚�ㅼ쓽 �ㅺ컪�� 諛곗뿴�� 留ㅺ컻蹂��섏뿉 �ｌ뼱以���.
	*
	**/
	_this.getObjectKeys = function(obj) {
		var hasOwn = obj.hasOwnProperty;
		var keys = [], name;
		for (name in obj) {
			if (hasOwn.call(obj, name)) {
				keys.push(name);
			}
		}
		return keys;
	}

	/**
	 * json�� �꾨줈�쇳떚�ㅼ씠 諛곗뿴濡� �� 媛앹껜瑜� 諛곗뿴�덉뿉 json�� �쎌엯�섎룄濡� 蹂��섑븳��.
	 *
	 **/
	_this.getJsonArray = function(obj, userOptions) {
		var options = {
			'blockName' : ''
		};
		jQuery.extend(options, userOptions);
		if (typeof obj === "object" && typeof obj.keys !== "function") {
			obj.keys = _this.getObjectKeys(obj);

			var outputJson = new Object();
			var singleJsonData = new Object();
			var dataJsonArray = new Array();
			var singleData;
			var name;
			var arrayLength = 1;

			for (var i=0; i<arrayLength; i++) {
				for(var j=0; j<obj.keys.length; j++) {
					name = obj.keys[j];

					if (typeof obj[name] === "object") {
						if (obj[name].length > arrayLength) {
							arrayLength = obj[name].length;
						}
						if (name == options.blockName) {
							jQuery.extend(singleJsonData, obj[name][i]);
						} else {
							singleData = obj[name][i];
						}
					} else {
						if (i == 0) {
							outputJson[name] = obj[name];
						}
					}

					if (singleData !== undefined && singleData !== '') {
						singleJsonData[name] = singleData;
					}

					singleData = undefined;
				}
				dataJsonArray.push(singleJsonData);
				singleJsonData = undefined;
				singleJsonData = new Object();
			}
		}
		if (options.blockName.length > 0) {
			outputJson[options.blockName] = dataJsonArray;
		} else {
			jQuery.extend(outputJson, dataJsonArray);
		}
		return outputJson;
	};


	/**
	 * Object �곗씠�곕� get parameter 濡� 蹂���
	 */
	_this.objToParamStr = function(obj) {
		var params = [];
		$.each(obj, function(key, value) {
			params.push(key + '=' + value);
		});

		return params.join('&');
	}

	/**
	 * json �곗씠�곕줈 �쇳뙆�쇰찓�곕� �앹꽦�쒕떎.
	 * ��, �앹꽦�� �낅젰 �쇱씠 �덉쑝硫� 媛믩쭔 �명똿�쒕떎
	 * @param obj : json媛앹껜
	 * @param formSelr : hidden �쇱쓣 異붽��� form (selector|dom媛앹껜|jq媛앹껜)
	 */
	_this.makeFormParamJson = function (obj, formSelr, options) {
		if ( $.isEmptyObject(obj) ) {
			return false;
		}
		var defaults = {
			'includeKeys' : [],
			'removeKeys' : []
		};
		var settings = $.extend(defaults, options);

		var includeKeys = settings.includeKeys;
		var removeKeys = settings.removeKeys;

		var $frm = formSelr instanceof jQuery ? formSelr : $(formSelr);

		if ( $frm.length === 0 ) {
			alert('�쇨컼泥� 媛앹껜媛� �놁뒿�덈떎.[媛쒕컻�먯삤瑜� : sks.util.makeFormParamJson()]');
			return false;
		}

		var makeInputFields = function(paramObj, isArray) {
			for(var fldNm in paramObj) {
				if ( includeKeys.length > 0 && $.inArray(fldNm, includeKeys) < 0 ) {
					continue;
				}
				if ( removeKeys.length > 0 && $.inArray(fldNm, removeKeys) >= 0 ) {
					continue;
				}

				var $fld = $frm.find('input[name='+fldNm+']');

				// hidden �쇱씠 �앹꽦�섏� �딆븯�쇰㈃ �앹꽦
				if (isArray || $fld.length === 0 ) {
					$fld = $('<input type="hidden" name="' + fldNm + '" />');
					$fld.prependTo($frm);
				}

				// hidden �쇨컪 �명똿
				$fld.val( paramObj[fldNm] );
			}
		};

		if ($.isArray(obj)) {
			$.each(obj, function() {
				makeInputFields(this, true);
			})
		} else {
			makeInputFields(obj, false);
		}
	};

	/**
	 * [getToday - �ㅻ뒛�좎쭨]
	 * @param  {[type]}  delim [description]
	 * @return {[type]}       [description]
	 */
	_this.getToday = function(delim) {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth();
		var day = today.getDate();

		if ((month + 1) < 10) {
			month = '0' + (month + 1);
		} else {
			month = month + 1;
		}

		if(day < 10){
			day = '0' + day;
		}

		if(delim!=undefined){
			return year + delim + month + delim + day;
		} else {
			return year + '' +month + '' + day;
		}
	};

	/**
	 * �ъ옄�� �뺣낫 �뺤씤�쒕� �앹뾽�쒕떎.
	 * callback(data) �⑥닔 �몄옄濡� �깅줉 寃곌낵 JSON �곗씠�� 泥섎━
	 * type(string) 'pension' �� 寃쎌슦 �댁쭅�곌툑�� �ъ옄�먯젙蹂댄솗�몄꽌 �깅줉/蹂�寃쎌쓣 �ㅽ뻾
	 */
	_this.popInvestDoc = function(callback, elem, type) {
		///////////////////////�뚮씪誘명꽣 �뺤옣/////////////////////////////////////////////
		var option = {
			callback : null,		//�앹뾽�� �ロ엳硫댁꽌 肄쒕갚�섏뼱�� �섎뒗 �⑥닔
			elem : null,			//�쒖뼱�섏뼱�� �섎뒗 �섎━癒쇳듃 : radio element
			type : null,			//�곌툑�щ� �곌툑�쇨꼍�� : 'pension'
			isDeri : false,			//�뚯깮�곹뭹 �щ�
			needGrade : 1,			//�꾩슂�깃툒 [1: �덉젙��, 2: �덉젙異붽뎄��, 3: �꾪뿕以묐┰��, 4: �곴레�ъ옄��, 5:怨듦꺽�ъ옄��]
			isForce: false,			//�꾨Ц�ъ옄�먮씪�� 怨좉컼�� 吏곸젒 蹂�寃쎈쾭�쇱쓣 �대┃�� 寃쎌슦 �ъ옄�먯젙蹂� �좎껌/蹂�寃� �덉씠�댄뙘�낆쓣 �꾩슦�꾨줉 �ㅼ젙
			closeEvent : null,		//�ъ옄�먰솗�몄꽌瑜� 以묎컙�� 洹몃쭔 �� 寃쎌슦, Event媛� �꾩슂�� 寃쎌슦 �ъ슜. ex) SMS �몄쬆踰덊샇 寃�利� ��, �ъ옄�먰솗�몄꽌 �묒꽦�� 以묎컙�� 洹몃쭔 �� 寃쎌슦 �몄쬆踰덊샇 寃�利� �щ�瑜� 珥덇린�� �명꽣�룸콉�� > �좎슜嫄곕옒�좎껌
			makeAcntPrdtCd : null	//�명꽣�룰퀎醫뚭컻�ㅼ쓽 媛쒖꽕�섎젮�� 怨꾩쥖�곹뭹踰덊샇
		}
		switch(typeof arguments[0]) {
		case 'function' :
			if(callback)	option.callback = callback;
			if(elem)		option.elem = elem;
			if(type)		option.type = type;
			break;

		case 'object' :
			$.extend(option, arguments[0]);
		}

		//////////////////////�꾨Ц �ъ옄�� �щ� �뺤씤 ////////////////////////////////////
		var isProInvest = false;
		if (!option.isForce) {
			xSubmitAjax(null, {
				url: '/main/banking/custinfo/PInfoNewInvest.jsp?cmd=isProInvest',
				async: false,
				success: function (data) {
					if (data.success !== 'Y') {
						alert(data.message);
						isProInvest = true;
						return;
					}

					if (data.isYn === 'Y') {
						isProInvest = true;

						if ('function' === typeof option.callback) {
							var callbackData = {
								'h_rt_cd' : '0'
							}
							option.callback(callbackData);
						}
						return;
					}
				}
			});
		}

		if (isProInvest) return;

		var $ifrm	= $('<IFRAME name="ifrmInvestDoc" id="ifrmInvestDoc" title="�ъ옄�� �뺣낫 �뺤씤��"></IFRAME>'),
			$layer = null;

		var src = '/main/banking/custinfo/PInfoNewInvest.jsp?cmd=TF01ac040200_Input&templetBlank=Y' + (option.isDeri? '&URL_GB=02' : '') + (option.makeAcntPrdtCd? '&OPEN_PRDT_CD=' + option.makeAcntPrdtCd:'') + (option.needGrade? '&NEED_GRADE='+option.needGrade : '');
		if (option.type == 'pension') {
			src = '/rtpension/myinfo/BaseInfo.jsp?cmd=TP01aa1000&templetBlank=Y';
		}
		$ifrm.attr({
			'src' : src,
			'class' : 'hidden'
		}).on('load', function() {
			hideProgressBar();
			//$ifrm.parent().addClass('iframe-wrap');
			//�곹뭹鍮꾧탳遺�遺� �좎�S
			fe_compareInit_NEW();
			fe_compareBoxWrite_NEW();
			//�곹뭹鍮꾧탳遺�遺� �좎�E
			$layer = compUtil.openLayer({
				'title' : '�ъ옄�먯젙蹂� �뺤씤��',
				'contents' : $ifrm.removeClass('hidden'),
				'size' : 'l',
				'inContent' : true,
				'isIframe' : true
			});

			$layer.css('top', (jQuery(window).innerHeight() - $layer.outerHeight()) / 2);

			$layer.find('.lp_btnClose').off('click').on('click', function() {
				if (option.closeEvent) {
					if(!(option.closeEvent instanceof jQuery)) {
						option.closeEvent = $(option.closeEvent);
					}
				}

				if (option.elem) {
					if(!(option.elem instanceof jQuery)) {
						option.elem = $(option.elem);
					}

					option.elem.closest('FORM')
						.find(':radio[name="' + option.elem.attr('name') + '"]').filter('[value="N"],[value="n"]').prop('checked', true);
					_this.mtl_refresh.radio();
				}

    			$layer.close_layerPopup();
    			$layer.remove();
    		});

			window.invest = {
				layer : $layer,
				iframe : $ifrm,
				callback : option.callback,
				isDeri : option.isDeri,
				isForce : option.isForce
			}
		});

		$('#content').before($ifrm);
	}


	/**2017-11-07異붽�
	 * �ъ옄�� �뺣낫 �뺤씤�쒕� �앹뾽�쒕떎.
	 * callback(data) �⑥닔 �몄옄濡� �깅줉 寃곌낵 JSON �곗씠�� 泥섎━
	 * type(string) 'pension' �� 寃쎌슦 �댁쭅�곌툑�� �ъ옄�먯젙蹂댄솗�몄꽌 �깅줉/蹂�寃쎌쓣 �ㅽ뻾
	 */
	_this.nwPopInvestDoc = function(callback, elem, type) {
		///////////////////////�뚮씪誘명꽣 �뺤옣/////////////////////////////////////////////
		var option = {
			callback : null,	//�앹뾽�� �ロ엳硫댁꽌 肄쒕갚�섏뼱�� �섎뒗 �⑥닔
			elem : null,		//�쒖뼱�섏뼱�� �섎뒗 �섎━癒쇳듃 : radio element
			type : null,		//�곌툑�щ� �곌툑�쇨꼍�� : 'pension'
			isDeri : false,		//�뚯깮�곹뭹 �щ�
			needGrade : 1,		//�꾩슂�깃툒 [1: �덉젙��, 2: �덉젙異붽뎄��, 3: �꾪뿕以묐┰��, 4: �곴레�ъ옄��, 5:怨듦꺽�ъ옄��]
			isForce: false,	//�꾨Ц�ъ옄�먮씪�� 怨좉컼�� 吏곸젒 蹂�寃쎈쾭�쇱쓣 �대┃�� 寃쎌슦 �ъ옄�먯젙蹂� �좎껌/蹂�寃� �덉씠�댄뙘�낆쓣 �꾩슦�꾨줉 �ㅼ젙
			closeEvent : null,	//�ъ옄�먰솗�몄꽌瑜� 以묎컙�� 洹몃쭔 �� 寃쎌슦, Event媛� �꾩슂�� 寃쎌슦 �ъ슜. ex) SMS �몄쬆踰덊샇 寃�利� ��, �ъ옄�먰솗�몄꽌 �묒꽦�� 以묎컙�� 洹몃쭔 �� 寃쎌슦 �몄쬆踰덊샇 寃�利� �щ�瑜� 珥덇린�� �명꽣�룸콉�� > �좎슜嫄곕옒�좎껌
			makeAcntPrdtCd : null	//�명꽣�룰퀎醫뚭컻�ㅼ쓽 媛쒖꽕�섎젮�� 怨꾩쥖�곹뭹踰덊샇
		}
		switch(typeof arguments[0]) {
		case 'function' :
			if(callback)	option.callback = callback;
			if(elem)		option.elem = elem;
			if(type)		option.type = type;
			break;

		case 'object' :
			$.extend(option, arguments[0]);
		}

		var $ifrm	= $('<IFRAME name="ifrmInvestDoc" title="而⑦뀗痢� �꾩씠�꾨젅��"></IFRAME>'),
			$layer = null;
		if(option.elem !=null){
			if(option.elem.MODE =="banking"){
				src = '/pension/nwMyinfo/BaseInfo.jsp?cmd=A_NW_30571&templetBlank=Y&MODE=banking&CANO='+option.elem.CANO+'&ACNT_PRDT_CD='+option.elem.ACNT_PRDT_CD;
			}
		}else{
			src = '/pension/nwMyinfo/BaseInfo.jsp?cmd=A_NW_30570&templetBlank=Y&MODE=';
		}



		$ifrm.attr({
			'src' : src,
			'class' : 'hidden'
		}).css({
			'width' : '100%',
			'height' : '570px',
			'border' : 'none',
			'box-sizing': 'border-box'
		}).on('load', function() {
			hideProgressBar();
			$layer = compUtil.openLayer({
				'title' : '�ъ옄�먯젙蹂댄솗�몄꽌 �깅줉/蹂�寃�',
				'contents' : $ifrm.removeClass('hidden'),
				'size' : 'l',
				'inContent' : true
			});

			$layer.css('top', (jQuery(window).innerHeight() - $layer.outerHeight()) / 2);

			$layer.find('.lp_btnClose').off('click').on('click', function() {
				if (option.closeEvent) {
					if(!(option.closeEvent instanceof jQuery)) {
						option.closeEvent = $(option.closeEvent);
					}
				}

				if (option.elem) {
					if(!(option.elem instanceof jQuery)) {
						option.elem = $(option.elem);
					}

					option.elem.closest('FORM')
						.find(':radio[name="' + option.elem.attr('name') + '"]').filter('[value="N"],[value="n"]').prop('checked', true);
					_this.mtl_refresh.radio();
				}

    			$layer.close_layerPopup();
    			$layer.remove();
    		});

			window.invest = {
				layer : $layer,
				iframe : $ifrm,
				callback : option.callback,
				isDeri : option.isDeri,
				isForce : option.isForce
			}
		});

		$('#content').before($ifrm);
	}

	/**
	 * �좎슜怨듭뿬 �ъ옄�� �뺣낫 �뺤씤�쒕� �앹뾽�쒕떎.
	 * callback(data) �⑥닔 �몄옄濡� �깅줉 寃곌낵 JSON �곗씠�� 泥섎━
	 * type(string) 'pension' �� 寃쎌슦 �댁쭅�곌툑�� �ъ옄�먯젙蹂댄솗�몄꽌 �깅줉/蹂�寃쎌쓣 �ㅽ뻾
	 */
	_this.popCreditInvestDoc = function(callback, elem, type) {
		///////////////////////�뚮씪誘명꽣 �뺤옣/////////////////////////////////////////////
		var option = {
			callback : null,	//�앹뾽�� �ロ엳硫댁꽌 肄쒕갚�섏뼱�� �섎뒗 �⑥닔
			elem : null,		//�쒖뼱�섏뼱�� �섎뒗 �섎━癒쇳듃 : radio element
			type : null,		//�곌툑�щ� �곌툑�쇨꼍�� : 'pension'
			isDeri : false,		//�뚯깮�곹뭹 �щ�
			needGrade : 1,		//�꾩슂�깃툒 [1: �덉젙��, 2: �덉젙異붽뎄��, 3: �꾪뿕以묐┰��, 4: �곴레�ъ옄��, 5:怨듦꺽�ъ옄��]
			isForce: false,	//�꾨Ц�ъ옄�먮씪�� 怨좉컼�� 吏곸젒 蹂�寃쎈쾭�쇱쓣 �대┃�� 寃쎌슦 �ъ옄�먯젙蹂� �좎껌/蹂�寃� �덉씠�댄뙘�낆쓣 �꾩슦�꾨줉 �ㅼ젙
			closeEvent : null,	//�ъ옄�먰솗�몄꽌瑜� 以묎컙�� 洹몃쭔 �� 寃쎌슦, Event媛� �꾩슂�� 寃쎌슦 �ъ슜. ex) SMS �몄쬆踰덊샇 寃�利� ��, �ъ옄�먰솗�몄꽌 �묒꽦�� 以묎컙�� 洹몃쭔 �� 寃쎌슦 �몄쬆踰덊샇 寃�利� �щ�瑜� 珥덇린�� �명꽣�룸콉�� > �좎슜嫄곕옒�좎껌
			makeAcntPrdtCd : null	//�명꽣�룰퀎醫뚭컻�ㅼ쓽 媛쒖꽕�섎젮�� 怨꾩쥖�곹뭹踰덊샇
		}
		switch(typeof arguments[0]) {
		case 'function' :
			if(callback)	option.callback = callback;
			if(elem)		option.elem = elem;
			if(type)		option.type = type;
			break;

		case 'object' :
			$.extend(option, arguments[0]);
		}

		//////////////////////�꾨Ц �ъ옄�� �щ� �뺤씤 ////////////////////////////////////
		var isProInvest = false;
		if (!option.isForce) {
			xSubmitAjax(null, {
				url: '/main/banking/custinfo/ContributionPInfoInvest.jsp?cmd=isProInvest',
				async: false,
				success: function (data) {
					if (data.success !== 'Y') {
						alert(data.message);
						isProInvest = true;
						return;
					}

					if (data.isYn === 'Y') {
						isProInvest = true;

						if ('function' === typeof option.callback) {
							var callbackData = {
								'h_rt_cd' : '0'
							}
							option.callback(callbackData);
						}
						return;
					}
				}
			});
		}

		if (isProInvest) return;

		var $ifrm	= $('<IFRAME name="ifrmCreditInvestDoc" id="ifrmCreditInvestDoc" title="�좎슜怨듭뿬 �ъ옄�� �뺣낫 �뺤씤��"></IFRAME>'),
			$layer = null;

		var src = '/main/banking/custinfo/ContributionPInfoInvest.jsp?cmd=TF01ac040200_Input&templetBlank=Y' + (option.isDeri? '&URL_GB=02' : '') + (option.makeAcntPrdtCd? '&OPEN_PRDT_CD=' + option.makeAcntPrdtCd:'') + (option.needGrade? '&NEED_GRADE='+option.needGrade : '');
		if (option.type == 'pension') {
			src = '/rtpension/myinfo/BaseInfo.jsp?cmd=TP01aa1000&templetBlank=Y';
		}

		$ifrm.attr({
			'src' : src,
			'class' : 'hidden'
		}).css({
			'width' : '100%',
			'height' : '100%',
			'border' : 'none',
			'box-sizing': 'border-box'
		}).on('load', function() {
			hideProgressBar();
			$layer = compUtil.openLayer({
				'title' : '�좎슜怨듭뿬 �ъ옄�먯젙蹂댄솗�몄꽌 �깅줉/蹂�寃�',
				'contents' : $ifrm.removeClass('hidden'),
				'size' : 'l',
				'inContent' : true,
				'isIframe' : true
			});

			$layer.css('top', (jQuery(window).innerHeight() - $layer.outerHeight()) / 2);

			$layer.find('.lp_btnClose').off('click').on('click', function() {
				if (option.closeEvent) {
					if(!(option.closeEvent instanceof jQuery)) {
						option.closeEvent = $(option.closeEvent);
					}
				}

				if (option.elem) {
					if(!(option.elem instanceof jQuery)) {
						option.elem = $(option.elem);
					}

					option.elem.closest('FORM')
						.find(':radio[name="' + option.elem.attr('name') + '"]').filter('[value="N"],[value="n"]').prop('checked', true);
					_this.mtl_refresh.radio();
				}

    			$layer.close_layerPopup();
    			$layer.remove();
    		});

			window.invest = {
				layer : $layer,
				iframe : $ifrm,
				callback : option.callback,
				isDeri : option.isDeri,
				isForce : option.isForce
			}
		});

		$('#content').before($ifrm);
	}

	/**
	 * �좏깮�뺤씤�� �앹뾽
	 * callback(data) �⑥닔 �몄옄濡� �깅줉 寃곌낵 JSON �곗씠�� 泥섎━
	 */
	_this.investDocumentConfirmPop = function(initPage,callback, elem, type) {
		///////////////////////�뚮씪誘명꽣 �뺤옣/////////////////////////////////////////////
		var option = {
			initPage : null, //�앹뾽�� �ロ엳硫댁꽌 珥덇린 �붾㈃�쇰줈 �뚯븘媛��� �⑥닔
			callback : null,	//�앹뾽�� �ロ엳硫댁꽌 肄쒕갚�섏뼱�� �섎뒗 �⑥닔
			elem : null,		//�쒖뼱�섏뼱�� �섎뒗 �섎━癒쇳듃 : radio element
			CUST_IVST_ICLN_GRAD_CD : null,		//怨좉컼�ъ옄�깊뼢
			PRDT_RISK_GRAD_CD : null		//�곹뭹�깃툒
		}
		switch(typeof arguments[0]) {
		case 'function' :
			if(initPage)	option.initPage = initPage;
			if(callback)	option.callback = callback;
			if(elem)		option.elem = elem;
			if(type)		option.type = type;
			break;

		case 'object' :
			$.extend(option, arguments[0]);
		}

		var $ifrm	= $('<IFRAME name="investDocumentConfirmPop" id="investDocumentConfirmPop" title="�ъ옄�깊뼢�� �곹빀[�곸젙]�섏� �딆� �ъ옄�� �곹뭹嫄곕옒 �뺤씤��"></IFRAME>'),
			$layer = null;

		var src = '/tfcommon/include/investDocumentConfirmPop.jsp?templetBlank=Y&CUST_IVST_ICLN_GRAD_CD='+option.CUST_IVST_ICLN_GRAD_CD+'&PRDT_RISK_GRAD_CD='+option.PRDT_RISK_GRAD_CD+"&type="+option.type;

		$ifrm.attr({
			'src' : src,
			'class' : 'hidden'
		}).on('load', function() {
			hideProgressBar();
			$layer = compUtil.openLayer({
				'title' : '�ъ옄�깊뼢�� �곹빀[�곸젙]�섏� �딆� �ъ옄�� �곹뭹嫄곕옒 �뺤씤��',
				'contents' : $ifrm.removeClass('hidden'),
				'size' : 'l',
				'inContent' : true,
				'isIframe' : true
			});

			$layer.css('top', (jQuery(window).innerHeight() - $layer.outerHeight()) / 2);

			$layer.find('.lp_btnClose').off('click').on('click', function() {
				if (option.closeEvent) {
					if(!(option.closeEvent instanceof jQuery)) {
						option.closeEvent = $(option.closeEvent);
					}
				}

				if (option.elem) {
					if(!(option.elem instanceof jQuery)) {
						option.elem = $(option.elem);
					}

					option.elem.closest('FORM')
						.find(':radio[name="' + option.elem.attr('name') + '"]').filter('[value="N"],[value="n"]').prop('checked', true);
					_this.mtl_refresh.radio();
				}

    			$layer.close_layerPopup();
    			$layer.remove();
    		});

			if (option.type == 'pension') { // �곌툑�먯꽌 �몄텧�좉꼍�� �곗씠�� �명똿
				if(typeof $ifrm[0].contentWindow.setPensionInfo == 'function') {
					$ifrm[0].contentWindow.setPensionInfo(option);
				};
			}

			window.invest = {
				layer : $layer,
				iframe : $ifrm,
				initPage : option.initPage,
				callback : option.callback,
				isDeri : option.isDeri,
				isForce : option.isForce
			}
		});
		$('#content').before($ifrm);
	}

	/**
	 * �곹빀�� �앹뾽
	 * callback(data) �⑥닔 �몄옄濡� �깅줉 寃곌낵 JSON �곗씠�� 泥섎━
	 * type(string) 'pension' �� 寃쎌슦 �댁쭅�곌툑�� �ъ옄�먯젙蹂댄솗�몄꽌 �깅줉/蹂�寃쎌쓣 �ㅽ뻾
	 */
	_this.investDocumentReportPop = function(callback, elem, type) {
		///////////////////////�뚮씪誘명꽣 �뺤옣/////////////////////////////////////////////
		var option = {
			callback : null,	//�앹뾽�� �ロ엳硫댁꽌 肄쒕갚�섏뼱�� �섎뒗 �⑥닔
			elem : null,		//�쒖뼱�섏뼱�� �섎뒗 �섎━癒쇳듃 : radio element
			CUST_IVST_ICLN_GRAD_CD : null,		//怨좉컼�ъ옄�깊뼢
			PRDT_RISK_GRAD_CD : null,		//�곹뭹�깃툒
			PRTY_OBJT_YN : null,		//�곸젙�� �щ�
			PRDT_NAME : null, 	//�곹뭹紐�
			isCallback : null 	//肄쒕갚�몄텧 �щ�(���쒕ℓ�섏떆 湲곗〈�� �먮룞�쇰줈 �ㅼ쓬�④퀎濡� �섏뼱媛��� 諛⑹떇�먯꽌 肄쒕갚泥섎━濡� 蹂�寃�)
		}
		switch(typeof arguments[0]) {
		case 'function' :
			if(callback)	option.callback = callback;
			if(elem)		option.elem = elem;
			if(type)		option.type = type;
			break;

		case 'object' :
			$.extend(option, arguments[0]);
		}

		var $ifrm	= $('<IFRAME name="investDocumentReportPop" id="investDocumentReportPop" title="�곸젙�� �먮떒 蹂닿퀬��"></IFRAME>'),
			$layer = null;
		var PRDT_NAME = jQuery('.h1_title.titleNonce').text();
		var src = '/tfcommon/include/investDocumentReportPop.jsp?templetBlank=Y&CUST_IVST_ICLN_GRAD_CD='+option.CUST_IVST_ICLN_GRAD_CD+'&PRDT_RISK_GRAD_CD='+option.PRDT_RISK_GRAD_CD+'&PRTY_OBJT_YN='+option.PRTY_OBJT_YN+'&PRDT_NAME='+option.PRDT_NAME+"&isCallback="+option.isCallback+"&type="+option.type;

		$ifrm.attr({
			'src' : src,
			'class' : 'hidden'
		}).on('load', function() {
			hideProgressBar();
			$layer = compUtil.openLayer({
				'title' : '�곸젙�� �먮떒 蹂닿퀬��',
				'contents' : $ifrm.removeClass('hidden'),
				'size' : 'l',
				'inContent' : true,
				'isIframe' : true
			});

			$layer.css('top', (jQuery(window).innerHeight() - $layer.outerHeight()) / 2);

			$layer.find('.lp_btnClose').off('click').on('click', function() {
				if (option.closeEvent) {
					if(!(option.closeEvent instanceof jQuery)) {
						option.closeEvent = $(option.closeEvent);
					}
				}

				if (option.elem) {
					if(!(option.elem instanceof jQuery)) {
						option.elem = $(option.elem);
					}

					option.elem.closest('FORM')
						.find(':radio[name="' + option.elem.attr('name') + '"]').filter('[value="N"],[value="n"]').prop('checked', true);
					_this.mtl_refresh.radio();
				}

    			$layer.close_layerPopup();
    			$layer.remove();
    		});

			if (option.type == 'pension') { // �곌툑�먯꽌 �몄텧�좉꼍�� �곗씠�� �명똿
				if(typeof $ifrm[0].contentWindow.setPensionInfo == 'function') {
					$ifrm[0].contentWindow.setPensionInfo(option);
				};
			}

			window.invest = {
				layer : $layer,
				iframe : $ifrm,
				callback : option.callback,
				isDeri : option.isDeri,
				isForce : option.isForce
			}
		});

		$('#content').before($ifrm);
	}


	/**
	 * �꾪뿕�먯궛�ъ옄�쒕룄 瑜� �앹뾽�쒕떎.
	 * callback(data) �⑥닔 �몄옄濡� �깅줉 寃곌낵 JSON �곗씠�� 泥섎━
	 */
	_this.popStockDel = function(callback, elem, type) {
		///////////////////////�뚮씪誘명꽣 �뺤옣/////////////////////////////////////////////
		var option = {
			callback : null,	//�앹뾽�� �ロ엳硫댁꽌 肄쒕갚�섏뼱�� �섎뒗 �⑥닔
			elem : null,		//�쒖뼱�섏뼱�� �섎뒗 �섎━癒쇳듃 : radio element
			type : null,		//�곌툑�щ� �곌툑�쇨꼍�� : 'pension'
			isDeri : false
		}
		switch(typeof arguments[0]) {
		case 'function' :
			if(callback)	option.callback = callback;
			if(elem)		option.elem = elem;
			if(type)		option.type = type;
			break;

		case 'object' :
			$.extend(option, arguments[0]);
		}
		var $ifrm	= $('<IFRAME name="ifrmInvestDoc" title="而⑦뀗痢� �꾩씠�꾨젅��"></IFRAME>'),
			$layer = null;

		var src = '/pension/nwMyinfo/ProductTrade_new.jsp?cmd=A_NW_31350&templetBlank=Y&CANO='+option.elem.CANO+'&ACNT_PRDT_CD='+option.elem.ACNT_PRDT_CD+'&CUST_NAME='+option.elem.CUST_NAME+'&USER_NAME='+option.elem.USER_NAME;


		$ifrm.attr({
			'src' : src,
			'class' : 'hidden'
		}).css({
			'width' : '100%',
			'height' : '570px',
			'border' : 'none',
			'box-sizing': 'border-box'
		}).on('load', function() {
			hideProgressBar();
			$layer = compUtil.openLayer({
				'title' : '�꾪뿕�먯궛�ъ옄�쒕룄 ',
				'contents' : $ifrm.removeClass('hidden'),
				'size' : 'l',
				'inContent' : true
			});

			$layer.css('top', (jQuery(window).innerHeight() - $layer.outerHeight()) / 2);

			$layer.find('.lp_btnClose').off('click').on('click', function() {
				if (option.closeEvent) {
					if(!(option.closeEvent instanceof jQuery)) {
						option.closeEvent = $(option.closeEvent);
					}
				}


    			$layer.close_layerPopup();
    			$layer.remove();
    		});

			window.invest = {
				layer : $layer,
				iframe : $ifrm,
				callback : option.callback,
				isDeri : option.isDeri
			}
		});

		$('#content').before($ifrm);
	}
	/**
	 * 遺��닿툑�ъ옄鍮꾩쑉蹂�寃�  �앹뾽�쒕떎.
	 */
	_this.popProduct = function(callback, elem, type) {
		///////////////////////�뚮씪誘명꽣 �뺤옣/////////////////////////////////////////////

		var option = {
			callback : null,	//�앹뾽�� �ロ엳硫댁꽌 肄쒕갚�섏뼱�� �섎뒗 �⑥닔
			elem : null,		//�쒖뼱�섏뼱�� �섎뒗 �섎━癒쇳듃 : radio element
			type : null,		//�곌툑�щ� �곌툑�쇨꼍�� : 'pension'
			isDeri : false
		}
		switch(typeof arguments[0]) {
		case 'function' :
			if(callback)	option.callback = callback;
			if(elem)		option.elem = elem;
			if(type)		option.type = type;
			break;

		case 'object' :
			$.extend(option, arguments[0]);
		}
		var $ifrm	= $('<IFRAME name="ifrmInvestDoc" title="而⑦뀗痢� �꾩씠�꾨젅��"></IFRAME>'),
			$layer = null;

		var src = '/pension/nwMyinfo/ProductTrade.jsp?cmd=A_NW_30800&templetBlank=Y&CHNGINSRT='+option.elem.CHNGINSRT+'';
		$ifrm.attr({
			'src' : src,
			'class' : 'hidden'
		}).css({
			'width' : '100%',
			'height' : '570px',
			'border' : 'none',
			'box-sizing': 'border-box'
		}).on('load', function() {
			hideProgressBar();
			$layer = compUtil.openLayer({
				'title' : '遺��닿툑�ъ옄鍮꾩쑉蹂�寃� ',
				'contents' : $ifrm.removeClass('hidden'),
				'size' : 'l',
				'inContent' : true
			});

			$layer.css('top', (jQuery(window).innerHeight() - $layer.outerHeight()) / 2);

			$layer.find('.lp_btnClose').off('click').on('click', function() {
				if (option.closeEvent) {
					if(!(option.closeEvent instanceof jQuery)) {
						option.closeEvent = $(option.closeEvent);
					}
				}
    			$layer.close_layerPopup();
    			$layer.remove();
    		});



			window.invest = {
				layer : $layer,
				iframe : $ifrm,
				callback : option.callback,
				isDeri : option.isDeri
			}
		});

		$('#content').before($ifrm);
	}
	/**
	 * 議고쉶 �� 媛숈� �섏씠吏�濡� �뚯븘�� 鍮꾨�踰덊샇 input�� �뷀샇�붾맂 鍮꾨�踰덊샇瑜� �ｌ뼱�� �섎뒗 寃쎌슦,
	 * 鍮꾨�踰덊샇 湲몄씠媛� �섏뼱�� 寃� 泥섎읆 蹂댁씠�� 寃껋쓣 �닿껐
	 * pwdName : 鍮꾨�踰덊샇 input name
	 * acnoName : 怨꾩쥖踰덊샇 select name
	 * fpwdName : 媛��� 鍮꾨�踰덊샇 input name [default : fpwd]
	 * fpwdVal : 媛��� 鍮꾨�踰덊샇 媛�. 議고쉶 �� 媛��몄삩 fpwdVal �뚮씪誘명꽣 �쎌엯
	 * maxlength : 媛��� 鍮꾨�踰덊샇�� maxlength
	 * formName : 議고쉶�� �ъ슜�섎뒗 form name
	 * h_rt_cd : �먮윭 �щ�. 議고쉶 �� 媛��몄삩 dsOutput�� h_rt_cd �쎌엯
	 */
	_this.fakePwdField = function(userOptions) {
		var options = {
			'pwdName' : '',
			'acnoName' : '',
			'fpwdName' : 'fpwd',
			'fpwdVal' : '',
			'maxlength' : 8,
			'formName' : 'searchForm',
			'h_rt_cd': '',
			'secureCd': '',
		};
		jQuery.extend(options, userOptions);
		if (options.pwdName == '' || options.acnoName == '') return;

		var f = jQuery('form[name="'+options.formName+'"]').get(0);
		var $acno = jQuery('form[name="'+options.formName+'"] select[name="'+options.acnoName+'"]');
		var $pwd = jQuery('form[name="' + options.formName + '"] input[name="' + options.pwdName + options.secureCd + '"]');

		if (f.fpwdName === undefined) {
			$pwd.after('<input type="hidden" class="ml_x0" id="'+options.fpwdName+'_pwd" name="'+options.fpwdName+'" maxlength="'+options.maxlength+'" />');
			$pwd.after('<label class="offscreen" for="'+options.fpwdName+'_pwd">怨꾩쥖鍮꾨�踰덊샇</label>');
		}

		var $fpwd = jQuery('input[name="'+options.fpwdName+'"]');

		$acno.on('change', function() {
			$fpwd.val('').attr('type', 'hidden');
			$pwd.val('').attr('type', 'password');
		});

		$fpwd.on('focus', function() {
			$fpwd.val('').attr('type', 'hidden');
			$pwd.val('').attr('type', 'password').focus();
		});

		$pwd.on('keyup', function() {
			var fpwd = '';
			for (var i=0;i<jQuery(this).val().length;i++) {
				fpwd += '*'
			}
			$fpwd.val(fpwd);
		});

		if (options.h_rt_cd == '0' && options.fpwdVal.length > 0) {
			$fpwd.val(options.fpwdVal).attr('type', 'password');
			$pwd.attr('type', 'hidden');
		}
	}
	_this.popTransferQSheet=function(options, flag, flag2){
		// 2021 由щ돱�� 異붽� : flag='re'�� 寃쎌슦 �쇳빐�덈갑�덈궡�� 諛붾떏�붾㈃�먯꽌 愿�由�, flag2='nm'�� 寃쎌슦 �щ윭怨꾩쥖�댁껜
		flag = flag == undefined ? '' : flag;
		flag2 = flag2 == undefined ? '' : flag2;
		//if( flag != 're' ){
		var q_id_1 = "pop_TRANSFER_Q1";
		var q_id_2 = "pop_TRANSFER_Q2";
		if($("#"+q_id_1).length==0){
			var q_sheet_1 =[];
			q_sheet_1.push("	<div class='lp_top_line'></div>");
			q_sheet_1.push("		<div class='layerPopup_wrap'>");
			q_sheet_1.push("			<h1>湲덉쑖�ш린 �쇳빐�덈갑�덈궡</h1>");
			q_sheet_1.push("			<div class='lp_contents'>");
			q_sheet_1.push("				<div class='alert_box'>");
			q_sheet_1.push("					<p class='fz13'>�꾨옒�� �덉떆�� 媛숈씠 �댁껜瑜� �붿껌 諛쏆쑝�⑥뒿�덇퉴?</p>");
			q_sheet_1.push("					<p class='fz13'>�댁껜�섍린 �� <strong>湲덉쑖�ш린 二쇱슂�섎쾿</strong>�� �뺤씤�섏뿬 �쇳빐瑜� �덈갑�섏꽭��.</p>");
			q_sheet_1.push("				</div>");
			q_sheet_1.push("					<dl class='explain_cont' style='padding-top:10px;'>");
			q_sheet_1.push("						<dt>湲덉쑖�ш린 二쇱슂 �섎쾿</dt>");
			q_sheet_1.push("							<dd style='margin-left:10px;'>쨌 �꾪솕�� 臾몄옄濡� ��異쒖씠�� �명븯議곌굔, ���섎�異� �깆쑝濡� �좎엯湲� �붽뎄</dd>");
			q_sheet_1.push("							<dd style='margin-left:10px;'>쨌 �좎슜�깃툒�� �щ젮二쇨쿋�ㅻŉ �섏닔猷� �좎엯湲� �붽뎄</dd>");
			q_sheet_1.push("							<dd style='margin-left:10px;'>쨌 寃�李걔룰꼍李걔룰툑�듦컧�낆썝�먯꽌 �덉쟾怨꾩쥖�쇰ŉ �뱀젙怨꾩쥖濡� �낃툑 �붽뎄</dd>");
			q_sheet_1.push("							<dd style='margin-left:10px;'>쨌 寃�李걔룰꼍李� �� �뺣�湲곌��먯꽌 �덉쟾議곗튂, 踰붿즲 �섏궗 �깆쑝濡� �먭툑 �붽뎄</dd>");
			q_sheet_1.push("							<dd style='margin-left:10px;'>쨌 媛�議굿룹��� �⑹튂 諛� �ш퀬 �깆쑝濡� 鍮숈옄�섏뿬 �몄랬</dd>");
			q_sheet_1.push("							<dd style='margin-left:10px;'>쨌 硫붿떊�� �곸뿉�� 吏��몄쓣 �ъ묶�섏뿬 �↔툑 �붽뎄</dd>");
			q_sheet_1.push("					</dl>");
			q_sheet_1.push("				</div>");
			q_sheet_1.push("			</div>");
			q_sheet_1.push("			<p class='ing_txt' style='margin-top:0px;'>怨꾩냽 吏꾪뻾�섏떆寃좎뒿�덇퉴?</p>");
			q_sheet_1.push("			<button class='lp_btnClose' type='button' onclick='javascript:jQuery(\"#pop_TRANSFER_Q1\").close_layerPopup(true);'></button>");
			q_sheet_1.push("			<div class='btnArea' style='padding:30px;'><div class='alignC'>");
			q_sheet_1.push("				<a href='#' id='pop_TRANSFER_Q1_Y' class='btn btn_cancel'>嫄곕옒 以묐떒</a>");
			q_sheet_1.push("			&nbsp;&nbsp;");
			q_sheet_1.push("			<a href='#' id='pop_TRANSFER_Q1_N' class='btn btn_ok'>嫄곕옒 怨꾩냽</a>");
			q_sheet_1.push("		</div></div>");
			q_sheet_1.push("	</div>");
			$("<div/>").attr('id',q_id_1).appendTo('body');
			$("#"+q_id_1).addClass("layerPopup mSize");
			$("#"+q_id_1).html(q_sheet_1.join(''));
		}
		if($("#"+q_id_2).length==0){
			var q_sheet_2 =[];
			q_sheet_2.push("	<div class='lp_top_line'></div>");
			q_sheet_2.push("	<div class='layerPopup_wrap'>");
			q_sheet_2.push("		<h1>湲덉쑖�ш린 �쇳빐二쇱쓽!</h1>");
			q_sheet_2.push("		<div class='lp_contents'>");
			q_sheet_2.push("			<div class='comp'>");
			q_sheet_2.push("				<h3 class='textHighPoint'>湲덉쑖�ш린 �덈갑 臾몄쭊��  '��'瑜� �좏깮�섏뿬 湲덉쑖�ш린 �쇳빐媛� �섏떖�⑸땲��.");
			q_sheet_2.push("				 湲덉쑖�ш린�꾪뿕 �뺤씤 �� �ㅼ떆 嫄곕옒�� 二쇱꽭��.");
			q_sheet_2.push("				</h3>");
			q_sheet_2.push("				<div style='background-color: #fdf7f2;padding: 8px;border:1px solid #e1e1e1'>");
			q_sheet_2.push("					<div class='alignC' style='margin-bottom: 10px;'>");
			q_sheet_2.push("						<h4 class='noBul'>寃�李�, 寃쎌같 �� �뺣�湲곌�, 怨듦났湲곌��� �대뼚�� 寃쎌슦�먮룄");
			q_sheet_2.push("						<br/>媛쒖씤 怨꾩쥖 �깆쑝濡� �덉쓣 �댁껜�섎룄濡� �붽뎄�섏� �딆뒿�덈떎.</h4>");
			q_sheet_2.push("					</div>");
			q_sheet_2.push("				</div>");
			q_sheet_2.push("				<div style='background-color: #fdf7f2;padding: 8px;border:1px solid #e1e1e1'>");
			q_sheet_2.push("					<div class='alignC' style='margin-bottom: 10px;margin-top: 15px;'>");
			q_sheet_2.push("						<h3 class='noBul'>�꾪솕�� 臾몄옄濡� ��異� 沅뚯쑀�� �낃툑�� �붽뎄�섎㈃<br/> 100% �ш린�낅땲��.</h3>");
			q_sheet_2.push("					</div>");
			q_sheet_2.push("					<strong>[湲덉쑖�ш린二쇱슂�섎쾿]</strong>");
			q_sheet_2.push("					<ul class='listDefault3 noBul'>");
			q_sheet_2.push("					  <li>1. �덉쟾議곗튂, 踰붿즲�섏궗 �� 紐⑹쟻�쇰줈 �먭툑�� �붽뎄</li>");
			q_sheet_2.push("					  <li>2. 媛�議굿룹��� �⑹튂 諛� �ш퀬 鍮숈옄�섏뿬 �몄랬</li>");
			q_sheet_2.push("					  <li>3. 硫붿떊���곸뿉�� 吏��몄쓣 �ъ묶�섏뿬 �↔툑�� �붽뎄</li>");
			q_sheet_2.push("					  <li>4. 湲덉쑖�뚯궗, 湲덇컧��, �섏궗湲곌��깆쓣 �ъ묶�섏뿬 �먭툑�� �붽뎄</li>");
			q_sheet_2.push("			     	  <li>5. �좎슜�깃툒�� �щ젮二쇨쿋�ㅻŉ �섏닔猷� �좎엯湲덉쓣 �붽뎄</li>");
			q_sheet_2.push("					  <li>6. ��異쒖씠�� �명븯議곌굔�쇰줈 吏��뺢퀎醫뚯뿉 �낃툑�� �붽뎄</li>");
			q_sheet_2.push("					  <li>7. �뉗궡濡� �� ��湲덈━ �뺣�吏��� �먭툑�쇰줈 ���섎�異쒖쓣 �쒖븞</li>");
			q_sheet_2.push("					</ul>");
			q_sheet_2.push("				</div>");
			q_sheet_2.push("			</div>");
			q_sheet_2.push("		</div>");
			q_sheet_2.push("		<button class='lp_btnClose' type='button' onclick='javascript:jQuery(\"#pop_TRANSFER_Q2\").close_layerPopup(true);'></button>");
			q_sheet_2.push("		<div class='alignC'>");
			q_sheet_2.push("			<a href='javascript:jQuery(\"#pop_TRANSFER_Q2\").close_layerPopup(true);' class='btn_Blue'>�뺤씤</a>");
			q_sheet_2.push("		</div>");
			q_sheet_2.push("	</div>");
			$("<div/>").attr('id',q_id_2).appendTo('body');
			$("#"+q_id_2).addClass("layerPopup sSize");
			$("#"+q_id_2).html(q_sheet_2.join(''));
		}
		//}
		var defaults = {
			DRWG_EXONO : "",
			DRWG_BANO : "",
			RCTM_EXONO : "",
			RCTM_BANO : "",
			TR_AMT : "",
			UPDATE_YN : "",
			RPNT_NAME : "",
			DAMG_DOB_YN : "",
			callback : null
		};
		options = $.extend({},defaults,options);

		var form_name='frmQSHEET';
		if($("#"+form_name).length==0){//form�댁뾾�꾨븣�앹꽦
			$("<form/>").attr('id',form_name).attr('name',form_name).attr('method','post').appendTo('body');
		}
		var frm = document.getElementById("frmQSHEET");

		$.each(options,function(key,val){//element create
			if(key=='callback') return true;

			if(typeof val == 'string'){
				if($("#"+frm.id + " input[name='"+key+"']").length==0){
					$(frm).append("<input type='hidden' name='"+key+"' value='"+ val+"'>");
				}else{
					$("#"+frm.id+" input[name='"+key+"']").val(val);
				}
			}else if(typeof val =='object'){
				$(val).each(function(idx,item){
					if($("#"+frm.id + " input#"+key+"_"+idx).length==0){
						$(frm).append("<input type='hidden' name='"+key+"' id='"+key +"_"+idx+"' value='"+ item.value +"'>");
					}else{
						if(idx==0){//媛믪큹湲고솕
							for(var i=0;i<$("#"+frm.id + " input[name='"+key+"']").length;i++){
								$("#"+frm.id + " input#"+key+"_"+i).val('');
							}
						}
						$("#"+frm.id+" input#"+key+"_"+ idx).val(item.value);
					}
				});
			}
		});
		frm.action="/tfcommon/base/common_transfer_qsheet.jsp"
		xSubmitAjax(frm,{
			hideBar : false,
			recvenc : true,
			success : function(data){
				if(data.h_rt_cd !='0'){
					if( flag != 're' ) {
				      showMessageBox('global_messageArea',data.h_msg1);
				      return;
				     } else {
				    	 $("#pop_TRANSFER_Q1").hide(); // 由щ돱�� �붾㈃�먯꽌�� as-is �앹뾽 hide
				    	 $("#pop_TRANSFER_Q2").hide(); // 由щ돱�� �붾㈃�먯꽌�� as-is �앹뾽 hide
				    	 showMessageBox_tobe('global_messageArea',data.h_msg1);
				      return;
				     }
				}else{
					var b_cofirm_qsheet=false;
					for(var idx=0;idx<data.QUES_OBJT_YN_CNT;idx++){
						var item = data.QUES_OBJT_YN[idx];
						if($("#"+frm.id + " input#QUES_OBJT_YN_"+idx).length==0){
							$(frm).append("<input type='hidden' name='QUES_OBJT_YN' id='QUES_OBJT_YN_"+idx+"' value='"+item+"'>");
						}else{
							if(idx==0){
								$("#"+frm.id+" input[name='QUES_OBJT_YN]").each(function(in_idx,in_item){
									$(in_item).val('');
								});
							}
							$("#"+frm.id+" input#QUES_OBJT_YN_"+idx).val(item);
						}
						if(item=='Y') b_cofirm_qsheet=true;
					}
					if(!b_cofirm_qsheet){	// 臾몄쭊���곸씠 �꾨땺寃쎌슦 callback �⑥닔 �몄텧
						if( flag != 're' ) {
							if(options.callback && 'function' === typeof options.callback) {
								options.callback();
							}
						} else {	// 由щ돱��
							$("#pop_TRANSFER_Q1").hide(); // 由щ돱�� �붾㈃�먯꽌�� as-is �앹뾽 hide
							$("#pop_TRANSFER_Q2").hide(); // 由щ돱�� �붾㈃�먯꽌�� as-is �앹뾽 hide
							$("#js-phishing").hide();	// 蹂댁씠�ㅽ뵾�� �쇳빐諛⑹� 臾멸뎄 show
							if( flag2 == 'nt' ){	// 利됱떆/�덉빟�댁껜�쇨꼍��
								$("#js-phishing").prev().find('table').removeClass('bdb_n');	// �쇰툝愿��� �뚯씠釉� border css
							}
							if( flag2 == 'nm' ) {	// �щ윭怨꾩쥖�댁껜�쇨꼍�� callback �⑥닔 �꾩슂
								if(options.callback && 'function' === typeof options.callback) {
									options.callback();
								}
							}
						}

						return;
					}
				}
				// 臾몄쭊���곸씪 寃쎌슦 �꾨옒 �⑥닔 �ㅽ뻾
				hideProgressBar();
				if( flag != 're' ) {
					$("#pop_TRANSFER_Q1").open_layerPopup(true);

					$("#pop_TRANSFER_Q1_Y").unbind('click').bind("click",function(){
						options.UPDATE_YN="Y";
						options.DAMG_DOB_YN="Y";
						_this.popTransferQSheet_Save(options);
					});
					$("#pop_TRANSFER_Q1_N").unbind('click').bind("click",function(){
						options.UPDATE_YN="Y";
						options.DAMG_DOB_YN="N";
						_this.popTransferQSheet_Save(options);
					});
				} else {	// 2021由щ돱��
					$("#pop_TRANSFER_Q1").hide(); // 由щ돱�� �붾㈃�먯꽌�� as-is �앹뾽 hide
					$("#pop_TRANSFER_Q2").hide(); // 由щ돱�� �붾㈃�먯꽌�� as-is �앹뾽 hide
					$("#js-phishing").show();	// 蹂댁씠�ㅽ뵾�� �쇳빐諛⑹� 臾멸뎄 show
					if( flag2 == 'nt' ){	// 利됱떆/�덉빟�댁껜�쇨꼍��
						$("#js-phishing").prev().find('table').addClass('bdb_n');	// �쇰툝愿��� �뚯씠釉� border css
					}
					if( flag2 == 'nm' ) {	// �щ윭怨꾩쥖�댁껜�쇨꼍�� callback �⑥닔 �꾩슂
						if(options.callback && 'function' === typeof options.callback) {
							options.callback();
						}
					}

				}

			}
		});
	}
	_this.popTransferQSheet_Save = function(options, flag){
		flag = flag == undefined ? '' : flag;
		var frm = document.getElementById("frmQSHEET");
		$("#"+frm.id+ " input[name='UPDATE_YN']").val(options.UPDATE_YN);
		$("#"+frm.id+ " input[name='DAMG_DOB_YN']").val(options.DAMG_DOB_YN);
		frm.action="/tfcommon/base/common_transfer_qsheet.jsp"
		xSubmitAjax(frm,{
			hideBar : false,
			recvenc : true,
			success : function(data){
				if(data.h_rt_cd !='0'){
					if( flag != 're' ) {
						showMessageBox('global_messageArea',data.h_msg1);
						return;
					} else {	// 2021 由щ돱��
						showMessageBox_tobe('global_messageArea',data.h_msg1);
						return;
					}

				}else{
					if( flag != 're' ) {
						if(options.DAMG_DOB_YN=='Y'){
							hideProgressBar();
							$("#pop_TRANSFER_Q2").open_layerPopup(true);
						}else{
							if(options.callback && 'function' === typeof options.callback) options.callback();
						}
					} else {	// 2021 由щ돱��
						// 由щ돱�쇱씪寃쎌슦 �숈쓽�� �⑥닔 �몄텧, 臾댁“嫄� options.DAMG_DOB_YN=='Y'
						if(options.callback && 'function' === typeof options.callback) options.callback();
					}

				}
			}
		});
	};

	if(!window.compUtil) {
		window.compUtil = _this;
	}

	window.hidediv = function(targetEl) {
		if(document.getElementById(targetEl)) {
		}
	}


/* ***************** fe_switchTab ********************** */
	$.fn.fe_switchTab = function(){
		var $wrap = $(this);
		var $opener = $wrap.find("a");
		var $tgArea = new Array($opener.length)
		$opener.each(function(i,o){
			$tgArea[i] = $($(o).attr("href"));
		});

		var defaultSet = 0;
		if($wrap.find("li.on").length){
			defaultSet = $wrap.find("li.on").index();
		}

		$opener.eq(defaultSet).addClass('on').attr('title', '�좏깮�� ��').parent("li").addClass("on");
		for(var i=0;i<$tgArea.length;i++){
			if(i!=defaultSet){
				$tgArea[i].hide();
			}
		}
		if($wrap.parents(".popup").length){
			$wrap.parents(".popup").attr("data-defaulttab",defaultSet);
		}
		$opener.unbind("click.fe_switchTab").bind("click.fe_switchTab",function(){
			//showProgressBar();

			if($(this).is("[href^=#]")){
				if($(this).parent().find("a[href^='#fe_clickTrigger_']").length){
					if($($(this).attr("href")).length){
						hideProgressBar();
						return false;
					}else{
						$(this).parents(".popup").hide();
						$("a[href='#"+$($(this).attr("href").replace("fe_clickTrigger_","")).parents(".popup").attr("id")+"']").trigger("focus").trigger("click");
						//hideProgressBar();
						//layer�먯꽌 text()寃��ы빐�� �쇱튂�좉꼍�� triggerHandler Click �몄텧��.
						//$("a[href='"+$(this).attr("href").replace("fe_clickTrigger_","")+"']").triggerHandler("click");
						return false;
					}
				}else{
					$($wrap.find(">li.on>a").attr("href")).hide();
					$wrap.find(">li.on").removeClass("on").children('A').removeClass('on').removeAttr('title').trigger('mouseleave');
					$(this).addClass('on').attr('title', '�좏깮�� ��').parent("li").addClass("on");
					$($(this).attr("href")).show();
					//hideProgressBar();
					return false;
				}
			}
		});
	};
/* ***************** fe_switchTab END********************** */

/* ***************** fe_calendar ********************** */
	var fe_calendar_methods = {
		init : function(options) {
			var options = $.extend({}, $.fn.fe_calendar.defaults, options);

			var $wrap = $(this);
			var $inputFromDate = $wrap.find("input.fromDate");
			var $inputToDate = $wrap.find("input.toDate");
			var $inputSetDate = $wrap.find("input.setDate");
			var $parentForm = $inputToDate.parents("form");

			if($inputSetDate.length){
				if ($inputSetDate.attr("data-defaultpriod")){
					options.defaultPriod = $inputSetDate.attr("data-defaultpriod");
				}
				var defaultVal = $inputSetDate.val();
				//$inputSetDate.attr("readonly","");
				$inputSetDate.css("cursor","pointer");
				$inputSetDate.val(rtnYYYYMMDD(rtnStartDate(options.defaultPriod),options.dateDot));
				if (typeof($inputSetDate.attr("data-defaultdate"))!="undefined"){
					$inputSetDate.val($inputSetDate.attr("data-defaultdate"));
				}
				if (defaultVal != ""){
					$inputSetDate.val(defaultVal);
				}
			}else{
				if ($inputFromDate.attr("data-defaultpriod")){
					options.defaultPriod = $inputFromDate.attr("data-defaultpriod");
				}
				//湲곌컙�� 寃쎌슦
				if(options.quickBtnArea){	//quick btn �좊Т
					if (typeof($inputFromDate.attr("data-quickbtnarray"))!="undefined"){
						options.quickBtnAreaArray = $inputFromDate.attr("data-quickbtnarray").split(",");
					}

					if($inputFromDate.attr("data-quickbtnarray")=="" || $inputFromDate.attr("data-quickbtnarray")==undefined){

					} else if(options.dualCalendar){ // dualCalendar �좊Т
						//var $btnArea = $("<span />", {"class" : "select-area"});
						var $btnArea = $("<span />", {"class" : "btnArea type-radio"});
						for(var i=0;i<options.quickBtnAreaArray.length;i++){
							var btnText = options.quickBtnAreaArray[i].replace("D","��").replace("0��","�뱀씪").replace("W","二쇱씪").replace("M","媛쒖썡").replace("Y","��");
							//var $btn = $("<a />", {"href":"javascript:;", "class" : "btnSsm_White", "data-sDate" : rtnYYYYMMDD(rtnStartDate(options.quickBtnAreaArray[i]),options.dateDot)}).text(btnText);
							var $btn = '';
							if( options.defaultPriod == options.quickBtnAreaArray[i]){
								$btn = $("<a />", {"href":"javascript:;", "class" : "btn_Blue", "data-sDate" : rtnYYYYMMDD(rtnStartDate(options.quickBtnAreaArray[i]),options.dateDot), 'title' : "�좏깮��"}).text(btnText);
							}else{
								$btn = $("<a />", {"href":"javascript:;", "class" : "btnWhite", "data-sDate" : rtnYYYYMMDD(rtnStartDate(options.quickBtnAreaArray[i]),options.dateDot)}).text(btnText);
							}

							$btnArea.append($btn);
						}
						$btnArea.find("a").bind("click",function(){
							//$btnArea.find("a").removeClass("on").removeAttr('title');
							//$(this).addClass("on").attr('title', '�좏깮��');
							//$btnArea.find("a").removeClass("btn_Blue").removeAttr('title');
							//$btnArea.find("a").addClass("btnWhite").attr('title', '�좏깮��');
							//$(this).addClass("btn_Blue").removeAttr('title');
							$btnArea.find("a").removeClass("btn_Blue").addClass('btnWhite').removeAttr('title');
							$(this).addClass("btn_Blue").removeClass('btnWhite').attr('title', '�좏깮��');
							var priodValue = $(this).text().replace("�뱀씪","0D").replace("二쇱씪","W").replace("��","D").replace("媛쒖썡","M").replace("��","Y");
							$inputFromDate.val(rtnYYYYMMDD(rtnStartDate(priodValue),options.dateDot));
							$inputToDate.val(rtnYYYYMMDD(new Date(),options.dateDot));
							if($wrap.find(".calendar:visible").length){
								$wrap.find(".calendar:visible").hide();
							}
							if(typeof(fe_cal_callback)=="function"){
								fe_cal_callback($btnArea.find("a").index($(this)));
							}
							return false;
						});
						//$wrap.append($btnArea);
						if($wrap.parent().find("p").length > 0){
							$wrap.parent().find("p").before($btnArea);
						} else {
							//踰꾪듉�곸뿭 �섎떒�� 臾멸뎄瑜� 異붽��댁빞 �섎뒗 寃쎌슦媛� �덉뼱 append�섎뒗 �꾩튂議곗젙
							if($wrap.parent().find(".sort_last").length > 0){
								$wrap.parent().find(".sort_last").before($btnArea);
							}else{
								$wrap.parent().append($btnArea);
							}
						}
						$inputFromDate.on('blur', checkDualCalBtnAtv);
						$inputToDate.on('blur', checkDualCalBtnAtv);
					} else{
						var $btnArea = $("<span />", {"class" : "btnArea type-radio"});
						for(var i=0;i<options.quickBtnAreaArray.length;i++){
							var btnText = options.quickBtnAreaArray[i].replace("D","��").replace("0��","�뱀씪").replace("W","二쇱씪").replace("M","媛쒖썡").replace("Y","��");
							var $btn = $("<a href='javascript:;' class='btnWhite' />", {"class" : "btnWhite", "data-sDate" : rtnYYYYMMDD(rtnStartDate(options.quickBtnAreaArray[i]),options.dateDot)}).text(btnText);
							$btnArea.append($btn);
						}
						$btnArea.find("a").bind("click",function(){
							$btnArea.find("a").removeClass("btn_Blue").addClass('btnWhite').removeAttr('title');
							$(this).addClass("btn_Blue").removeClass('btnWhite').attr('title', '�좏깮��');
							var priodValue = $(this).text().replace("�뱀씪","0D").replace("二쇱씪","W").replace("��","D").replace("媛쒖썡","M").replace("��","Y");
							$inputFromDate.val(rtnYYYYMMDD(rtnStartDate(priodValue),options.dateDot));
							$inputToDate.val(rtnYYYYMMDD(new Date(),options.dateDot));
							if($wrap.find(".calendar:visible").length){
								$wrap.find(".calendar:visible").hide();
							}
							if(typeof(fe_cal_callback)=="function"){
								fe_cal_callback($btnArea.find("a").index($(this)));
							}
							return false;
						});
						$wrap.after($btnArea);

						$inputFromDate.on('blur', checkBtnAtv);
						$inputToDate.on('blur', checkBtnAtv);
					}
					$parentForm.find("input").bind("keydown",function(e){
						if(e.keyCode == 13){
							//form �댁쓽 input�먯꽌 enter�� first button click 諛쒖깮.(submit諛쒖깮怨� 鍮꾩듂�� �먮━)
							return false;
						}
					});
				}

				//�щ젰 �꾩씠肄� �쎌엯
				if($inputFromDate.length){
					//$inputFromDate.attr("readonly","");
					$inputFromDate.css("cursor","pointer");
					if($inputFromDate.siblings('A').size() == 0) {
						var $imgFromDate = $("<a />",{"href":"javascript:;","class":"btn_calendar"});
						$inputFromDate.after($imgFromDate);
					}

					var defaultVal = $inputFromDate.val();
					$inputFromDate.val(rtnYYYYMMDD(rtnStartDate(options.defaultPriod),options.dateDot));
					if ($inputFromDate.attr("data-defaultdate")){
						$inputFromDate.val($inputFromDate.attr("data-defaultdate"));
					}
					if (defaultVal != ""){
						$inputFromDate.val(defaultVal);
					}

				}
				if($inputToDate.length){
					//$inputToDate.attr("readonly","");
					$inputToDate.css("cursor","pointer");
					if($inputToDate.siblings('A').size() == 0) {
						var $imgToDate = $("<a />",{"href":"javascript:;","class":"btn_calendar"});
						$inputToDate.after($imgToDate);
					}

					var defaultVal = $inputToDate.val();
					$inputToDate.val(rtnYYYYMMDD(new Date(),options.dateDot));
					if ($inputToDate.attr("data-defaultdate")){
						$inputToDate.val($inputToDate.attr("data-defaultdate"));
					}
					if (defaultVal != ""){
						$inputToDate.val(defaultVal);
					}
				}

				if(options.dualCalendar){ // .dual_calendar �좊Т
					checkDualCalBtnAtv();
				}else if(options.quickBtnArea){	//quick btn �좊Т
					checkBtnAtv();
				}
			}

			function checkBtnAtv(){
				var sDate = $inputFromDate.val();
				var eDate = $inputToDate.val();
				if($.trim(sDate) != "" && $.trim(eDate) != ""){
					$wrap.find(".btnArea").find("a").each(function(i,o){
						var priodValue = $(o).text().replace("�뱀씪","0D").replace("二쇱씪","W").replace("��","D").replace("媛쒖썡","M").replace("��","Y");
						var temp_sDate = rtnYYYYMMDD(rtnStartDate(priodValue),options.dateDot);
						var temp_eDate = rtnYYYYMMDD(new Date(),options.dateDot);

						if(sDate == temp_sDate && eDate == temp_eDate){
							$(o).addClass("btn_Blue").removeClass("btnWhite").attr('title', '�좏깮��');
						}else{
							$(o).removeClass("btn_Blue").addClass("btnWhite").removeAttr('title');
						}
					});
				}else{
					$wrap.find(".btnArea").find("button").removeClass("btn_Blue");
				}
			}

			function checkDualCalBtnAtv(){
				var sDate = $inputFromDate.val();
				var eDate = $inputToDate.val();
				if($.trim(sDate) != "" && $.trim(eDate) != ""){
					//to-be
					$wrap.siblings(".btnArea type-radio").find("a").each(function(i,o){
						var priodValue = $(o).text().replace("�뱀씪","0D").replace("二쇱씪","W").replace("��","D").replace("媛쒖썡","M").replace("��","Y");
						var temp_sDate = rtnYYYYMMDD(rtnStartDate(priodValue),options.dateDot);
						var temp_eDate = rtnYYYYMMDD(new Date(),options.dateDot);
						if(sDate == temp_sDate && eDate == temp_eDate){
							$(o).addClass("btn_Blue").removeClass("btnWhite").attr('title', '�좏깮��');
						}else{
							$(o).removeClass("btn_Blue").addClass("btnWhite").removeAttr('title');
						}
					});
					//as-is
					$wrap.siblings(".select-area").find("a").each(function(i,o){
						var priodValue = $(o).text().replace("�뱀씪","0D").replace("二쇱씪","W").replace("��","D").replace("媛쒖썡","M").replace("��","Y");
						var temp_sDate = rtnYYYYMMDD(rtnStartDate(priodValue),options.dateDot);
						var temp_eDate = rtnYYYYMMDD(new Date(),options.dateDot);
						if(sDate == temp_sDate && eDate == temp_eDate){
							$(o).addClass("on").attr('title', '�좏깮��');
						}else{
							$(o).removeClass("on").removeAttr('title');
						}
					});
				}else{
					//to-be
					$wrap.find(".btnArea type-radio").find("button").removeClass("btn_Blue");
					//as-is
					$wrap.siblings(".select-area").find("button").removeClass("on");
				}
			}

			//�뱀젙 湲곌컙 �쒖옉�좎쭨 諛섑솚.
			function rtnStartDate(priod){
				if(priod) {
					priod = jQuery.trim(priod);
				}
				var priodType = priod.substr(priod.length-1,1);
				var priodLen = priod.substr(0,priod.length-1);

				var endDate = new Date();
				endDate.setYear(endDate.getFullYear());
				endDate.setMonth(endDate.getMonth());
				switch (priodType){
					case "D" :
						endDate.setDate(endDate.getDate()-priodLen);
						return endDate;
						break;
					case "W" :
						endDate.setDate(endDate.getDate()-(priodLen*7));
						return endDate;
						break;
					case "M" :
						endDate.setMonth(endDate.getMonth()-priodLen);
						return endDate;
						break;
					case "Y" :
						endDate.setYear(endDate.getFullYear()-priodLen);
						return endDate;
						break;
				}
			}

			function bindCalendar() {

			}

			//�щ젰 洹몃━湲�
			function drawCalendar(tgOpener, tgDate) {
				var $opener = tgOpener;
				var $calendarDiv = $("<div />",{"class":"calendar"}).hide();
				if($opener.prev("input").hasClass("fromDate")){
					$calendarDiv.addClass("fromDate");
				}else if($opener.prev("input").hasClass("toDate")){
					$calendarDiv.addClass("toDate");
				}else if($opener.prev("input").hasClass("setDate")){
					$calendarDiv.addClass("setDate");
				}
				var flag_holiday = false;
				if($opener.prev("input").hasClass("fe_noholiday")){
					flag_holiday = true;
				}
				var flag_dateLock = false;
				var dateLock_start = "";
				var dateLock_end = "";
				if(typeof($opener.prev("input").attr("data-datelocks"))!="undefined" || typeof($opener.prev("input").attr("data-datelocke"))!="undefined"){
					flag_dateLock = true;
					if(typeof($opener.prev("input").attr("data-datelocks"))!="undefined"){
						dateLock_start = $opener.prev("input").attr("data-datelocks");
					}
					if(typeof($opener.prev("input").attr("data-datelocke"))!="undefined"){
						dateLock_end = $opener.prev("input").attr("data-datelocke");
					}
				}
				var $dateDiv = $("<div />",{"class":"date"});

				$opener.after($calendarDiv.append($dateDiv));
				var calHTML = "";
				var nowDate = new Date();
				if(tgDate){
					var calDate = new Date(tgDate.replace(/(\.)+/g,"/"));
					var selDate = new Date(tgDate.replace(/(\.)+/g,"/"));
				}else{
					var calDate = new Date();
					var selDate = new Date();
				}

				var startDay = rtnStartDay(calDate);

				var nowDayCount = rtnLastDate(calDate);

				var totaltdCount = rtnTdCnt(startDay, nowDayCount);

				var $ctlBox = $("<p />");
				var $leftArrowY = $("<button />",{"class" : "prev"}).text("�댁쟾 �꾨룄");
				var $rightArrowY = $("<button />",{"class" : "next"}).text("�ㅼ쓬 �꾨룄");
				var $leftArrowM = $("<button />",{"class" : "prev"}).text("�댁쟾 ��");
				var $rightArrowM = $("<button />",{"class" : "next"}).text("�ㅼ쓬 ��");
				var $spanY = $("<strong />");
				var $spanM = $("<strong />");

				$ctlBox.append($leftArrowY);
				$ctlBox.append($spanY);
				$ctlBox.append($rightArrowY);
				$ctlBox.append($leftArrowM);
				$ctlBox.append($spanM);
				$ctlBox.append($rightArrowM);
				$spanY.text(calDate.getFullYear()+"��");
				$spanM.text((calDate.getMonth()+1)+"��");

				$dateDiv.append($ctlBox);

				$opener.prev("input").unbind("focusout.fe_cal").bind("focusout.fe_cal",function(){
					var thisVal = $(this).val();
					//�좏슚�� 寃���
					if(checkDate(thisVal)){
						if($.trim(thisVal)!=""){
							var testVal = thisVal.replace(/(\.)+/g,"");
							var YYYY = testVal.substr(0,4);
							var MM = testVal.substr(4,2);
							var DD = testVal.substr(6,2);
							if(flag_dateLock){
								if(dateLock_start != ""){
									if(dateLock_start == "today"){
										var dif1 = rtnYYYYMMDD(new Date(),"");
									}else{
										var dif1 = rtnYYYYMMDD(rtnDateDiff(new Date(),dateLock_start),"");
									}
									if(testVal == rtnYYYYMMDD(new Date(),"") && dateLock_start != "-2Y"){
										alert("湲덉씪 �댄썑遺��� �좏깮�섏떎 �� �덉뒿�덈떎.");
										$(this).val("");
										$(this).focus();
										return false;
									}
									if(Number(testVal) < Number(dif1) && dateLock_start != "-2Y"){
										alert("�ㅻ뒛蹂대떎 �댁쟾�쇱� �좏깮�섏떎 �� �놁뒿�덈떎.");
										$(this).val("");
										$(this).focus();
										return false;
									}

									if(Number(testVal) < Number(dif1) && dateLock_start == "-2Y"){
										alert("�듯빀 �섏씡瑜� 愿��� �곗씠�곕뒗 理쒕� 2�� �꾨��� 湲덉씪源뚯�留�\n�좏깮�섏떎 �� �덉뒿�덈떎.");
										$(this).val("");
										$(this).focus();
										return false;
									}
								}
								if(dateLock_end != ""){
									if(dateLock_end == "today"){
										var dif2 = rtnYYYYMMDD(new Date(),"");
									}else{
										var dif2 = rtnYYYYMMDD(rtnDateDiff(new Date(),dateLock_end),"");
									}
									if(Number(testVal) > Number(dif1) && dateLock_start != "-2Y"){
										alert("�쒕떖 �대궡留� �좏깮 �섏떎 �� �덉뒿�덈떎.�ㅻ뒛蹂대떎 �댁쟾�쇱� �좏깮�섏떎 �� �놁뒿�덈떎.");
										$tgInput.val("");
										$tgInput.focus();
										return false;
									}
								}
							}
							if($(this).hasClass("fe_noholiday")){	//怨듯쑕�� 寃���
								if(document.domain=="tf2.0standard.net"){//acg standard server
									var holidayURL = "/guide/script/holiday.html?year="+YYYY+"&month="+MM;	//2013�� static setting
								}else{
									var holidayURL = "/tfcommon/base/calendar.jsp?year="+YYYY+"&month="+MM;
								}
								try{
									var $tgInput = $(this);
									var tgcheckDate = new Date(YYYY+"/"+MM+"/"+DD);
									var tgcheckDay = tgcheckDate.getDay();
									if(tgcheckDay == 0 || tgcheckDay == 6){
										alert("怨듯쑕�쇱� �좏깮�섏떎 �� �놁뒿�덈떎.");
										$tgInput.val("");
										$tgInput.focus();
										return false;
									}
									$.post(
										holidayURL,
										"",
										function(data){
											var holiday = eval(data);
											var holidayCheck = false;
											for(var i = 0; i<holiday.length;i++){
												if(testVal == holiday[i]){
													holidayCheck = true;
												}
											}
											if(holidayCheck){
												alert("怨듯쑕�쇱� �좏깮�섏떎 �� �놁뒿�덈떎.");
												$tgInput.val("");
												$tgInput.focus();
												return false;
											}else{
												$tgInput.val(YYYY+options.dateDot+MM+options.dateDot+DD);
												checkBtnAtv();
												//�좎쭨媛� 蹂�寃쎌떆 callback
												if($tgInput.attr("data-callback")){
													try{
													eval($tgInput.attr("data-callback"));
													}catch(e){}
												}
											}
										}
									);
								}catch(e){
									alert(e);
								}
							}
							$(this).val(YYYY+options.dateDot+MM+options.dateDot+DD);
							checkBtnAtv();
							//�좎쭨媛� 蹂�寃쎌떆 callback
							if($(this).attr("data-callback")){
								try{
								eval($(this).attr("data-callback"));
								}catch(e){}
							}
						}
					}else{
						$(this).val("");
						$(this).focus();
					}
				});
				//input enterkey �щ젰icon click �곕룞
				/*
				$opener.prev("input").bind("keydown",function(e){
					if (e.keyCode == 13){
						$opener.triggerHandler("click");
						return false;
					}
				});
				*/
				//drawTable();


				//arg1 targetDate dateType
				//arg2 dateDif
				//rtnType date
				function rtnDateDiff(arg1, arg2){
					var tgday = arg1;
					var dateDif = arg2;

					var tgday_y = tgday.getFullYear();
					var tgday_m = tgday.getMonth();
					var tgday_d = tgday.getDate();

					if(dateDif.indexOf("D")>=0){
						var resultDate = new Date(tgday_y,tgday_m,tgday_d+Number(dateDif.replace("D","")));
					}else if(dateDif.indexOf("M")>=0){
						var resultDate = new Date(tgday_y,tgday_m+Number(dateDif.replace("M","")),tgday_d);
					}else if(dateDif.indexOf("Y")>=0){
						var resultDate = new Date(tgday_y+Number(dateDif.replace("Y","")),tgday_m,tgday_d);
					}
					return resultDate;
				}
			}

			function checkDate(arr1){
				var testVal = arr1.replace(/(\.)+/g,"");
				if($.trim(testVal)==""){
					return true;
				}
				if(isNaN(testVal)){
					alert("�쇱옄�� 媛믪뿉�� 臾몄옄媛� �낅젰�� �� �놁뒿�덈떎");
					return false;
				}else{
					//�좎쭨 泥댄겕
					if(testVal.length != 8){
						alert("�쇱옄�� 媛믪� YYYY"+options.dateDot+"MM"+options.dateDot+"DD�� �뺤떇�쇰줈 �낅젰�� 二쇱떗�쒖삤.");
						return false;
					}
					var YYYY = testVal.substr(0,4);
					var MM = testVal.substr(4,2);
					var DD = testVal.substr(6,2);
					if(Number(YYYY) > 2100 || Number(YYYY) < 1900){
						alert("�쇱옄�� �곕룄�� 1900�� ~ 2100�� �ъ씠�� 媛믪쓣 �낅젰�� 二쇱떗�쒖삤.");
						return false;
					}
					if(Number(MM) > 12 || Number(MM) < 1){
						alert("�쇱옄�� �붿쓣 01 ~ 12�� �ъ씠�� 媛믪쑝濡� �낅젰�� 二쇱떗�쒖삤..");
						return false;
					}
					var tgDate = new Date(YYYY+"/"+MM+"/01");
					var lastDay = rtnLastDate(tgDate);

					if(Number(DD) > lastDay || Number(DD) < 1){
						alert(MM+"�붿뿉�� "+DD+"�쇱씠 �놁뒿�덈떎.");
						return false;
					}

				}
				return true;
			}

			//�대떦�� 1�쇱쓽 �붿씪 諛섑솚
			function rtnStartDay(tgDate){
				var startDate = new Date(tgDate.getFullYear()+"/"+(tgDate.getMonth()+1)+"/"+"01");
				var startDay = startDate.getDay();

				return startDay;
			}

			//媛��� 留덉�留� �좎쭨瑜� 援ы빐��  .getDate();= �대쾲�� 珥� �쇱닔.
			//�ㅼ쓬�� 1�� - �섎（. = �대쾲�� 留덉�留� �좎쭨.
			function rtnLastDate(tgDate){
				var endDate = new Date();
				endDate.setDate(1);
				if (tgDate){
					endDate.setYear(tgDate.getFullYear());
					endDate.setMonth(tgDate.getMonth()+1);
				}else{
					endDate.setMonth(endDate.getMonth() + 1);
				}
				endDate.setDate(0);
				var nowDayCount = endDate.getDate();	//�대쾲�� 留덉�留됱씪
				return nowDayCount;
			}

			//�대떦�붿쓽 珥� 移몄닔.
			function rtnTdCnt(startDay, nowDayCount){
				var totaltdCount = startDay + nowDayCount + 7 -( (startDay + nowDayCount)%7 );
				if ( (startDay + nowDayCount)%7 ==0)	{
					totaltdCount = startDay + nowDayCount;
				}
				return totaltdCount
			}

			//�щ젰 �좎쭨 �щ㎎ 蹂��섑빐 諛섑솚
			function rtnYYYYMMDD(tgDate,dot){
				var YYYY = tgDate.getFullYear();
				var MM = tgDate.getMonth()+1;
				var DD = tgDate.getDate();
				if (MM < 10){
					MM = "0"+String(MM);
				}
				if (DD < 10){
					DD = "0"+String(DD);
				}
				if(dot){
					return String(YYYY)+dot+String(MM)+dot+String(DD);
				}else{
					return String(YYYY)+String(MM)+String(DD);
				}
			}
		}
	};
	// fe_calendar Plugin
	$.fn.fe_calendar = function(method) {
		// Method calling logic
		if ( fe_calendar_methods[method] ) {
		  return fe_calendar_methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
		  return fe_calendar_methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method "' +  method + '" does not exist on this function' );
		}
	};
	// fe_calendar Defaults

	//�щ젰 option default  珥덇린媛�
	$.fn.fe_calendar.defaults = {
		quickBtnArea : true,
		quickBtnAreaArray : ["0D", "1W", "1M", "3M", "6M"],
		defaultPriod : "0D",
		weekStrArray : ["��","��","��","��","紐�","湲�","��"],
		imgCal : "/tfimages/renewal/common/icon_calendar.png",
		imgClose : "/tfimages/renewal/common/btn_calendar_close.png",
		dateDot : ".",
		dualCalendar : false
	};
/* ***************** fe_calendar END ********************** */

/* ***************** fe_moduleYMD ********************** */
	$.fn.fe_moduleYMD = function(){
		var options = $.extend({}, $.fn.fe_moduleYMD.defaults, options);
		var $wrap = $(this);
		var nowDate = new Date();
		var nowY = nowDate.getFullYear();
		var nowM = nowDate.getMonth()+1;
		var nowD = nowDate.getDate();
		var nowDCount = rtnLastDate(nowDate);
		var $selectY = $wrap.find("select:eq(0)");
		var $selectM = $wrap.find("select:eq(1)");
		var $selectD = $wrap.find("select:eq(2)");

		if ($wrap.find("select").length < 3){
			return;
		}

		var optionYLength = options.yearLen;
		/*�꾨룄�� js�먯꽌 control �덊븿
		if($selectY.attr("data-yearlen")){
			optionYLength = Number($selectY.attr("data-yearlen"));
		}
		if($selectY.attr("data-selected")){
			var selectedY = Number($selectY.attr("data-selected"));
		}
		*/
		if($selectM.attr("data-selected")){
			var selectedM = Number($selectM.attr("data-selected"));
		}
		if($selectD.attr("data-selected")){
			var selectedD = Number($selectD.attr("data-selected"));
		}

		/*
		if($selectY.attr("data-fecontrol") == "N"){
		}else{
			$selectY.empty();
		}
		*/

		/*
		if($selectY.attr("data-fecontrol") == "N"){
		}else{
			for(var i=optionYLength;i>=0;i--){
				var $option = $("<option />").val(nowY-i).text(nowY-i);
				if(selectedY){
					if(nowY-i == selectedY){
						$option.attr("selected","selected");
					}
				}else{
					if(nowY-i == nowY){
						$option.attr("selected","selected");
					}
				}
				$selectY.append($option);
			}
		}
		*/

		writeSelectM();
		writeSelectD();

		$selectY.bind("change",function(){
			if($selectY.val() != "" && $selectM.val() != ""){
				var tgDate = new Date($selectY.val()+"/"+$selectM.val()+"/01");
				var tgCount = rtnLastDate(tgDate);
				if( tgCount != $selectD.find("option").length){
					var nowDate = $selectD.val();
					setDateOption(rtnLastDate(tgDate),nowDate);
				};
			}else{
				if($selectY.val() == ""){
					selectedM = 0;
					selectedD = 0;
				}
				writeSelectM();
				var tgDate = new Date($selectY.val()+"/"+$selectM.val()+"/01");
				var tgCount = rtnLastDate(tgDate);
				if( tgCount != $selectD.find("option").length){
					var nowDate = $selectD.val();
					setDateOption(rtnLastDate(tgDate),nowDate);
				};
			}
		});

		$selectM.bind("change",function(){
			if($selectM.val() == ""){
				writeSelectD();
			}else{
				var tgDate = new Date($selectY.val()+"/"+$selectM.val()+"/01");
				var tgCount = rtnLastDate(tgDate);
				if($selectM.find("option").length == 13){
					tgCount++;
				}
				if( tgCount != $selectD.find("option").length){
					var nowDate = $selectD.val();
					setDateOption(rtnLastDate(tgDate),nowDate);
				};
			}
		});

		function rtnLastDate(tgDate){
			var endDate = new Date();
			endDate.setDate(1);
			if (tgDate){
				endDate.setYear(tgDate.getFullYear());
				endDate.setMonth(tgDate.getMonth() + 1);
			}else{
				endDate.setMonth(endDate.getMonth() + 1);
			}
			endDate.setDate(0);
			var nowDayCount = endDate.getDate();	//�대쾲�� 留덉�留됱씪
			return nowDayCount;
		}

		function setDateOption(count,selD){
			$selectD.empty();
			if(selectedD=="0" || $selectY.find("option:first").val() == ""){
				var $option = $("<option />",{"value":""}).text("�좏깮");
				$selectD.append($option);
			}
			if($selectM.val() == ""){
				return false;
			}
			for(var i=1;i<=count;i++){
				var $option = $("<option />").val(i).text(i);
				if(selD){
					if(i == selD){
						$option.attr("selected","selected");
					}
				}
				$selectD.append($option);

			}
		}

		function writeSelectM(){
			$selectM.empty();
			if(selectedM == "0" || $selectY.find("option:first").val() == ""){
				var $option = $("<option />",{"value":""}).text("�좏깮");
				$selectM.append($option);
			}
			if($selectY.val() == ""){
				return false;
			}
			for(var i=1;i<=12;i++){
				var $option = $("<option />").val(i).text(i);
				if(selectedM){
					if(i == selectedM){
						$option.attr("selected","selected");
					}
				}else{
					if(i == nowM && selectedM != "0"){
						$option.attr("selected","selected");
					}
				}
				$selectM.append($option);
			}
		}

		function writeSelectD(){
			if(selectedD){
				setDateOption(nowDCount,selectedD);
			}else{
				setDateOption(nowDCount,nowD);
			}
		}
	};
	$.fn.fe_moduleYMD.defaults = {
		yearLen : 10
	};
/* ***************** fe_moduleYMD END ********************** */

/* ***************** fe_tooltip ********************** */
	var fe_tooltip_methods = {
		init : function(options) {
			var options = $.extend({}, $.fn.fe_tooltip.defaults, options);

			var $wrap = $(this);
			if($wrap.prev("a").hasClass("accountNum")){
				var type = "account";
			}

			switch(type){
				case "account" :
					$wrap.hide();
					var $opener = $wrap.prev("a.accountNum");

					$opener.unbind("mouseenter.fe_tooltip focusin.fe_tooltip").bind("mouseenter.fe_tooltip focusin.fe_tooltip",function(){
						$wrap.show();
						return false;
					});
					$opener.parent().unbind("mouseleave.fe_tooltip").bind("mouseleave.fe_tooltip",function(e){
						$wrap.hide();
						e.preventDefault();
						return false;
					});
					$wrap.find("a:last").unbind("keydown.fe_tooltip").bind("keydown.fe_tooltip",function(e){
						if(e.keyCode == 9 && !e.shiftKey){
							setTimeout(function(){
								$wrap.hide()
							},1);
						}
					});
					$opener.unbind("keydown.fe_tooltip").bind("keydown.fe_tooltip",function(e){
						if(e.keyCode == 9 && e.shiftKey){
							$wrap.hide();
						}
					});
					$opener.unbind("click.fe_tooltip").bind("click.fe_tooltip",function(){
						if($(this).attr("href") == "#"){
							$opener.triggerHandler("mouseenter");
							return false;
						}
					});
					break;
				case "accordion" :

					break;
			}
		}
	};

	// fe_tooltip Plugin
	$.fn.fe_tooltip = function(method) {
		// Method calling logic
		if ( fe_tooltip_methods[method] ) {
		  return fe_tooltip_methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
		  return fe_tooltip_methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method "' +  method + '" does not exist on this function' );
		}
	};
	// fe_tooltip Defaults

	//tooltip option default  珥덇린媛�
	$.fn.fe_tooltip.defaults = {
		animateFlag : true,
		animateSpeed : 300
	};
/* ***************** fe_tooltip END ********************** */

/* ***************** fe_toolBox ********************** */
	$.fn.fe_toolBox = function(){
		var $wrap = $(this);
		var $opener = $wrap.find(">a").eq(0);
		var $box = $wrap.find(".toolBox, .toolYield");
		$box.hide();

		$opener.bind("mouseenter.fe_toolBox",function(){
			$box.stop(true,true).fadeIn(300);
		});
		$opener.bind("mouseleave.fe_toolBox",function(){
			$box.stop(true,true).fadeOut(300);
		});
		$opener.bind("focusin",function(){
			$(this).triggerHandler("mouseenter");
		});
		$opener.bind("focusout",function(){
			$(this).triggerHandler("mouseleave");
		});
	};
/* ***************** fe_toolBox END ********************** */

/* ***************** fe_accordion ********************** */
	var fe_accordion_methods = {
		init : function(options) {
			var options = $.extend({}, $.fn.fe_accordion.defaults, options);

			var $wrap = $(this);
			if($wrap.parents(".roundBoxKnow").length){
				var type = "roundBox";
			}else if($wrap.hasClass("accordion")){
				var type = "accordion";
			}

    //alert(type);
			switch(type){
				case "roundBox" :
					var $wrap = $(this).parent(".round");
					var $viewAll = $(this);
					var $btnArea = $wrap.find(".ask");
					var $btnAccordion = $btnArea.find("a.basicSmall:eq(0),a.btnSm_more:eq(0)");
					var bigHTML = '媛꾨떒�덈낫湲�';	//�쇰툝履� 留욎땄
					var smallHTML = options.accordionBtnHTML;

					$viewAll.hide();
					$btnAccordion.html(smallHTML).removeClass('basicSmall').addClass('btnSm_more');

					$btnAccordion.attr("href","#accodion_"+options.accordionCount);
					$viewAll.attr("id","accodion_"+options.accordionCount);

					options.accordionCount++;

					$.fn.fe_accordion.defaults = $.extend({}, $.fn.fe_accordion.defaults, {"accordionCount":options.accordionCount});

					if(options.ariaFlag){
						$btnAccordion.attr("aria-live","assertive");
					}

					$btnAccordion.unbind("click.fe_accordion").bind("click.fe_accordion",function(){
						if($viewAll.is(":visible")){
							if(options.animateFlag){
								$viewAll.stop(true,true).slideUp(options.animateSpeed,function(){
									$btnAccordion.html(smallHTML).addClass('btnSm_more').removeClass('btnSm_close');
								});
							}else{
								$viewAll.hide();
								$btnAccordion.html(smallHTML).addClass('btnSm_more').removeClass('btnSm_close');
							}
						}else{
							if(options.animateFlag){
								$viewAll.stop(true,true).slideDown(options.animateSpeed,function(){
									$btnAccordion.html(bigHTML).removeClass('btnSm_more').addClass('btnSm_close');
								});
							}else{
								$viewAll.show();
								$btnAccordion.html(bigHTML).removeClass('btnSm_more').addClass('btnSm_close');
							}
						}
						return false;
					});
					return;
				case "accordion" :

					//var $closeBtnArea = $("<div />").addClass("btnArea").addClass("narrow").addClass("clearfix").append($("<div />").addClass("alignR"));
					//var $closeBtn = $("<a />",{"href":"#accordion_"+options.accordionCount+"_close"}).addClass("basicDefault").append('<strong>�リ린<span class="icoR openArrow"></span></strong>');

					var $openBtnArea = $("<div />").addClass("comp").append($("<div />").addClass("btnArea").addClass("narrow").addClass("clearfix").append($("<div />").addClass("alignR")));
					var $openBtn = $("<a />",{"href":"#accordion_"+options.accordionCount}).addClass("basicDefault").append('<strong>�댁슜蹂닿린<span class="icoR closeArrow"></span></strong>');

					var $openContent = $wrap;

					if($wrap.find(">.comp:first").hasClass("line2nd")){
						var $closeContent = $("<div />").addClass("rectbox").addClass("line2nd").text($wrap.find(">.comp:first").text());
					}else{
						var $closeContent = $("<div />").addClass("rectbox").addClass("line1st").text($wrap.find(">.comp:first").text());
					}

					$wrap.attr("id","accordion_"+options.accordionCount);
					$openBtnArea.find("div.alignR").append($openBtn);

					options.accordionCount++;
					$wrap.before($closeContent).after($openBtnArea);

					if($wrap.hasClass("fe_default")){
						var openFlag = true;
						$closeContent.hide();
						$openBtn.find("strong").html('�リ린<span class="icoR openArrow"></span>');
					}else{
						$openContent.hide();
						var openFlag = false;
					}

					if(options.ariaFlag){
						$openBtn.attr("aria-live","assertive");
					}

					$openBtn.unbind("click.fe_accordion").bind("click.fe_accordion",function(){
						if(openFlag){
							//�リ린
							if(options.animateFlag){
								$openContent.stop(true,true).slideUp(options.animateSpeed,function(){
									$closeContent.show();
									$openBtn.find("strong").html('�댁슜蹂닿린<span class="icoR closeArrow"></span>');
								});
							}else{
								$openContent.hide();
								$closeContent.show();
								$openBtn.find("strong").html('�댁슜蹂닿린<span class="icoR closeArrow"></span>');
							}
							openFlag = false;
						}else{
							//�닿린
							if(options.animateFlag){
								$closeContent.hide();
								$openContent.stop(true,true).slideDown(options.animateSpeed,function(){
									$openBtn.find("strong").html('�リ린<span class="icoR openArrow"></span>');
								});
							}else{
								$closeContent.hide();
								$openContent.show();
								$openBtn.find("strong").html('�リ린<span class="icoR openArrow"></span>');
							}
							openFlag = true;
						}
						return false;
					});
					break;
			}
		}
	};

	// fe_accordion Plugin
	$.fn.fe_accordion = function(method) {
		// Method calling logic
		if ( fe_accordion_methods[method] ) {
		  return fe_accordion_methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
		  return fe_accordion_methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method "' +  method + '" does not exist on this function' );
		}
	};
	// fe_accordion Defaults

	// fe_accordion option default  珥덇린媛�
	$.fn.fe_accordion.defaults = {
		ariaFlag : true,
		animateFlag : true,
		animateSpeed : 500,
		accordionBtnHTML : '�먯꽭�덈낫湲�',
		accordionCount : 0
	};
/* ***************** fe_accordion END ********************** */

/* ***************** fe_rolling ********************** */
	var fe_rolling_methods = {
		init : function(options) {
			var options = $.extend({}, $.fn.fe_rolling.defaults, options);

			var $wrap = $(this);
			var $rollingView = $wrap.find(".rollingView");
			var $content = $wrap.find(".rollingContent");
			var contentHeight = $content.height();
			var contentCount = $content.length;
			var nowPosition = 0;

			if(contentCount > 1){
				if(options.rollingLoop){
					$content.css("position","absolute");
					$content.each(function(i,o){
						$(o).css("top",(i*contentHeight)+"px");
					});
				}else{
					$rollingView.css("top","0px");
				}
				if($wrap.find(".controlButton").length){
					$wrap.find(".controlButton").find("button.prev").bind("click",function(){
						prevPosition = nowPosition;
						nowPosition--;
						if(nowPosition < 0){
							nowPosition = contentCount-1;
						}

						if(options.rollingLoop){
							$content.stop(true,true);
							$content.eq(prevPosition).animate({"top":"-"+contentHeight+"px"},options.rollingSpeed);
							$content.eq(nowPosition).css("top",contentHeight+"px").animate({"top":"0px"},options.rollingSpeed);
						}else{
							$rollingView.stop(true,true).animate({"top":"-"+(nowPosition*contentHeight)+"px"},options.rollingSpeed);
						}
						return false;
					});
					$wrap.find(".controlButton").find("button.next").bind("click",function(){
						prevPosition = nowPosition;
						nowPosition++;
						if(nowPosition >= contentCount){
							nowPosition = 0;
						}
						if(options.rollingLoop){
							$content.stop(true,true);
							$content.eq(prevPosition).animate({"top":contentHeight+"px"},options.rollingSpeed);
							$content.eq(nowPosition).css("top","-"+contentHeight+"px").animate({"top":"0px"},options.rollingSpeed);
						}else{
							$rollingView.stop(true,true).animate({"top":"-"+(nowPosition*contentHeight)+"px"},options.rollingSpeed);
						}
					});
				}
			}else{
				$wrap.find(".controlButton").hide();
			}

		}
	};

	// fe_rolling Plugin
	$.fn.fe_rolling = function(method) {
		// Method calling logic
		if ( fe_rolling_methods[method] ) {
		  return fe_rolling_methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
		  return fe_rolling_methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method "' +  method + '" does not exist on this function' );
		}
	};
	// fe_rolling Defaults

	// fe_rolling option default
	$.fn.fe_rolling.defaults = {
		rollingDirect : "leftright",
		rolingAuto : true,
		rollingSpeed : 400,
		rollingLoop : false
	};
/* ***************** fe_rolling END ********************** */

/* ***************** fe_leftMenu ********************** */
	$.fn.fe_leftMenu = function(){
		var $wrap = $(this);

		var $depth3li = $wrap.find(">li");

		$depth3li.eq(0).addClass("navTop");
		$depth3li.eq($depth3li.length-1).addClass("navBottom");

		$depth3li.each(function(i,o){
			if($(o).find("ul").length){
				if($(o).hasClass("atv") || $(o).find("li.atv").length){
					$(o).addClass("sub").addClass("atv");
				}else{
					$(o).addClass("preview");
				}
			}
		});

		$depth3li.bind("mouseenter focusin",function(){
			if($("#snb").hasClass("ipad")){
				return false;
			}
			if($(this).hasClass("atv")){
				$(this).addClass("fe_defaultOn");
			}else{
				$(this).addClass("atv");
			}
		})
		$depth3li.bind("mouseleave focusout",function(){
			if($("#snb").hasClass("ipad")){
				return false;
			}
			if(!$(this).hasClass("sub")){
				if($(this).hasClass("fe_defaultOn")){
					$(this).removeClass("fe_defaultOn");
				}else{
					$(this).removeClass("atv");
				}
			}
		})
	}
/* ***************** fe_leftMenu END ********************** */

/* ***************** fe_securityCardSet ********************** */
	$.fn.fe_securityCardSet = function(var1, var2){
		var $wrap = $(this); //input
		var $securityCard = $(".securityCard");
		var topPositionArray = ["0","20","40","60","80","100"];
		var leftPositionArray = ["23","86","149","212","275"];
		var inputWidth = 19;
		var maxLength = 2;
		var inputTitle = $wrap.attr("title");
		if (!$wrap.attr("title")){
			inputTitle = $("label[for='"+$wrap.attr("id")+"']").text();
		}
		var $inputNum = $("<div />").addClass("number").append($("<input />",{"type":"password","name":$wrap.attr("id")+"_cardSet","title":inputTitle}));
		var rowCount = Math.floor((Number(var1)-1)/leftPositionArray.length);
		var colCount = Number(var1)-(rowCount*leftPositionArray.length);
		$inputNum.css("top", topPositionArray[rowCount]+"px").css("left", String(Number(leftPositionArray[colCount-1])+(Number(var2)*inputWidth))+"px");
		$securityCard.find(".cardNum").append($inputNum);

		$wrap.attr("maxlength",maxLength);
		$inputNum.find("input").attr("maxlength",maxLength);
		$wrap.bind("keydown",function(e){
			if((e.keyCode >= 48 && e.keyCode <=57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46){
				setTimeout(function(){
					$inputNum.find("input").val($wrap.val());
				},1);
			}else if(e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 9 || e.keyCode == 16){
				//window event
			}else{
				return false;
			}
		});
		$inputNum.find("input").bind("keydown",function(e){
			if((e.keyCode >= 48 && e.keyCode <=57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46){
				setTimeout(function(){
					$wrap.val($inputNum.find("input").val());
				},1);
			}else if(e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 9 || e.keyCode == 16){
				//window event
			}else{
				return false;
			}
		});
	};
/* ***************** fe_securityCardSet END ********************** */

/* ***************** fe_setAmountModule ********************** */
	$.fn.fe_converHanAmount = function(val){
		var options = $.extend({}, $.fn.fe_setAmountModule.defaults, options);
		var $tgInput = $(this);
		var numValue = Number(val);
		var strValue = String(val);
		if(strValue == "" || strValue =="0"){
			$tgInput.val("");
			return;
		}

		if (typeof($tgInput.attr("data-unit"))!="undefined"){
			options.lastUnit = " "+$tgInput.attr("data-unit");
		}

		var i5Flag = false;
		var rtnValue = "";
		for(var i=strValue.length;i>0;i--){
			var conStr = strValue.substr(strValue.length-i,1);
				if(conStr!=0){
					if(i>=5 && i <=8 && conStr!=0){
						i5Flag = true;
					}
					rtnValue = rtnValue + options.numArray[Number(conStr)] + options.unitArray[i];
				}else{
					if(i==9){
						rtnValue = rtnValue + options.numArray[Number(conStr)] + options.unitArray[i];
					}
					if(i==5 && i5Flag){
						rtnValue = rtnValue + options.numArray[Number(conStr)] + options.unitArray[i];
					}
				}

		}
		rtnValue = rtnValue + options.lastUnit;
		$tgInput.val(rtnValue);
	}

	$.fn.fe_setAmountModule = function(){
		var options = $.extend({}, $.fn.fe_setAmountModule.defaults, options);

		var $tgInput = $(this);
		var $tgInputId = $tgInput.attr('id')+"_hangulAmt";
		var $parentForm = $tgInput.parents("form");
		var $btnArea = $("<div />").addClass("btnArea type-radio");

		var $btnModule = $("<div />").addClass("module");
		var $amountModule = $("<div />").addClass("module").addClass("clearfix");
		var $amountModuleL = $("<div />").addClass("alignL");
		var $amountModuleR = $("<div />").addClass("alignL").addClass("marL10");

		var $convertHanAmount = $("<input id='"+$tgInputId+"' name='hangulAmt' type='text' readonly='readonly' title='"+$("label[for='"+$tgInput.attr("id")+"']").text().replace(" *","")+" �쒓�蹂���"+"' class='conHanAmount t_right wide' />");

		var decimal_point = typeof($tgInput.attr("decimal-point"))!="undefined" && Number($tgInput.attr("decimal-point")) !=NaN
								?Number($tgInput.attr("decimal-point")):0;

		$convertHanAmount.width(320);

		if(options.ariaFlag){
			$convertHanAmount.attr("aria-live","assertive");
		}

		if (typeof($tgInput.attr("data-unit"))!="undefined"){
			options.lastUnit = " "+$tgInput.attr("data-unit");
			$convertHanAmount.attr("data-unit",$tgInput.attr("data-unit"));
		}

		//湲덉븸�쒓� 泥섎━ �④��щ�
		var hangulAmt = typeof($tgInput.attr("hangulAmt"))!="undefined" && $tgInput.attr("hangulAmt")=="N"?false:true;
		if(!hangulAmt) $convertHanAmount.css("display","none");

		$tgInput.parent().before($amountModule);
		$tgInput.parent().before($btnModule);

		$btnModule.append($btnArea);

		$amountModule.append($amountModuleL).append($amountModuleR);
		$amountModuleL.append($(this).parent());
		$amountModuleL.append(options.lastUnit);
		$amountModuleR.append($("<span />").addClass("readingInput").addClass("sumAmount").addClass("wide"));
		$amountModuleR.find(".sumAmount").append("<label for='"+$tgInputId+"' class='offscreen'>"+$("label[for='"+$tgInput.attr("id")+"']").text().replace(" *","")+" �쒓�蹂���</label>");
		$amountModuleR.find(".sumAmount").append($convertHanAmount);
		$tgInput.attr("maxlength",options.maxlength);
		$tgInput.addClass('t_right');

		if (options.quickBtnArea){
			if (typeof($tgInput.attr("data-quickbtnarray"))!="undefined"){
				options.quickBtnAreaArray = $tgInput.attr("data-quickbtnarray").split(",");
			}
			if(options.quickBtnAreaArray == ""){
				$btnModule.remove();
			}
			for(var i=0;i<options.quickBtnAreaArray.length;i++){
				var btnText = options.quickBtnAreaArray[i];
				if(btnText == "ALL"){
					btnText = "�꾩븸";
				}else if(btnText == "DEL"){
					btnText = "�뺤젙";
				}else{
					if(Number(btnText) >= 100000000){
						btnText = "+"+String(Math.round(Number(btnText)/100000000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"��";
					}else if(Number(btnText) >= 10000000){
						btnText = "+"+String(Math.round(Number(btnText)/10000000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"泥쒕쭔";
					}else if(Number(btnText) >= 10000){
						btnText = "+"+String(Math.round(Number(btnText)/10000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"留�";
					}else
						btnText = btnText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				var $btn = $("<button />", {"class" : "btn btn_line",'type':'button'}).append($("<span />").text(btnText));
				if(btnText == "�뺤젙"){
					// $btn.addClass("mod");
					$btn.removeClass('btn_line');
					$btn.addClass("btn_second");
				}
				$btnArea.append($btn);
			}
			$btnArea.find("button").bind("click",function(){
				//$btnArea.find("button").removeClass("atv");
				var btnText = $(this).text();
				if(btnText == "�꾩븸"){
					$tgInput.val("");
					$convertHanAmount.val("�꾩븸異쒓툑");
					//媛쒕컻�� property �뺤씤 �꾩슂.
				}else if(btnText == "�뺤젙"){
					$tgInput.val("");
					$convertHanAmount.val("");
					//媛쒕컻�� property �뺤씤 �꾩슂.
				}else{
					//$(this).addClass("atv");
					btnText = btnText.replace("+","").replace(/\,/gi,'');
					var plusAmount = 0;
					if(btnText.indexOf("��") > 0){
						plusAmount = Number(btnText.replace("��",""))*100000000;
					}else if(btnText.indexOf("泥쒕쭔") > 0){
						plusAmount = Number(btnText.replace("泥쒕쭔",""))*10000000;
					}else if(btnText.indexOf("留�") > 0){
						plusAmount = Number(btnText.replace("留�",""))*10000;
					}else{
						plusAmount = Number(btnText);
					}
					var nowAmount = $tgInput.val().replace(/,/g,"");

					if(Number(nowAmount)==NaN) nowAmount ="0";

					var sumVal = Number(nowAmount)+plusAmount;

					sumVal = decimal_point>0?parseFloat(sumVal).toFixed(decimal_point):sumVal;

					$tgInput.val(sumVal);
					$tgInput.fe_setNumFormat();
				}
				if(typeof(fe_amount_callback)=="function"){
					fe_amount_callback($btnArea.find("button").index($(this)));
				}
				return false;
			});
			$btnArea.find("button").bind("mouseenter",function(){
				//$(this).addClass("atv");
			});
			$btnArea.find("button").bind("mouseleave",function(){
				//$(this).removeClass("atv");
			});
			$parentForm.find("input").bind("keydown",function(e){
				if(e.keyCode == 13){
					//form �댁쓽 input�먯꽌 enter�� first button click 諛쒖깮.(submit諛쒖깮怨� 鍮꾩듂�� �먮━)
					return false;
				}
			});
		}

		$tgInput.fe_setNumFormat();


		if(decimal_point==0){
			$tgInput.bind("keyup",function(e){
				//shift �뱀닔臾몄옄 �쒓굅 異붽�. 20130708 by ACG
				if(KOS) {	//�ㅻ낫�� 蹂댁븞 �뚮Ц�� �곕줈 援ы쁽
					this.value = this.value.replace(/[^\d,]/gi, '');
					$tgInput.fe_setNumFormat();

				} else {	//as-is
					if((e.keyCode >= 48 && e.keyCode <=57 && !e.shiftKey) || (e.keyCode >= 96 && e.keyCode <= 105 && !e.shiftKey) || e.keyCode == 8 || e.keyCode == 46){
						setTimeout(function(){
							$tgInput.fe_setNumFormat()
						},1);
					}else if(e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 9 || e.keyCode == 16){
						//window event
					}else{
						return false;
					}
				}

			});
		}else{
			$tgInput.bind("keypress", function(evt){
				var charCode = (evt.which) ? evt.which : event.keyCode;
		        console.log('isNumberKey=>'+charCode);
		        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
		            return false;
		        var _value = event.srcElement.value.replace(/\,/gi,'');

		        var _pattern0 = /^\\d*[.]\\d*$/; // �꾩옱 value媛믪뿉 �뚯닔��(.) �� �덉쑝硫� . �낅젰遺덇�
		        if (_pattern0.test(_value)) {
		            if (charCode == 46) {
		                return false;
		            }
		        }
		        var _pattern2 = new RegExp("^\\d*[.]\\d\{"+decimal_point+"\}$","gi"); // �꾩옱 value媛믪씠 �뚯닔�� 紐뉗옄由ш퉴吏� �낅젰
		        if (_pattern2.test(_value)) {
		           return false;
		        }
		        return true;
			});
			$tgInput.bind("keyup", function(evt){
				var charCode = (evt.which) ? evt.which : event.keyCode;
				var _value = event.srcElement.value.replace(/\,/gi,'');
				var parts =_value.toString().split(".");

				if(Number(_value)==NaN ||  Number(_value) ==0) parts[0]="0";
				else  parts[0]=""+Number(parts[0]);

				event.srcElement.value=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : ((parts.length==decimal_point)?".":""));
			});
			$tgInput.bind("blur", function(){
				var b_zero =  typeof($tgInput.attr("zero-flag"))!="undefined" && $tgInput.attr("zero-flag")=='Y'?true:false;

				var _value = $tgInput.val().replace(/\,/gi,'');

				if(!b_zero && _value=="" ) return;

				var parts =_value.toString().split(".");

				if(Number(_value)==NaN ||  Number(_value) ==0) parts[0]="0";
				else  parts[0]=""+Number(parts[0]);

				var s_decimal= parts[1]?parts[1]:"";

				while(s_decimal.length<decimal_point) s_decimal+="0";


				$tgInput.val(parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (s_decimal.length>0 ? "." + s_decimal : ((parts.length==decimal_point)?".":"")));
			});
		}
		return;
	};

	// 2021 由щ돱�� start

	var fe_calendar_methods2 = {
		init : function(options) {
			var options = $.extend({}, $.fn.fe_calendar.defaults, options);

			var $wrap = $(this);	// div.calendarWap2
			var $inputFromDate = $wrap.find("input.fromDate");	// �쒖옉�� input
			var $inputToDate = $wrap.find("input.toDate");		// 醫낅즺�� input
			var $inputSetDate = $wrap.find("input.setDate");
			var $parentForm = $inputToDate.parents("form");

			if($inputSetDate.length){
				if ($inputSetDate.attr("data-defaultpriod")){
					options.defaultPriod = $inputSetDate.attr("data-defaultpriod");
				}
				var defaultVal = $inputSetDate.val();
				//$inputSetDate.attr("readonly","");
				$inputSetDate.css("cursor","pointer");
				$inputSetDate.val(rtnYYYYMMDD(rtnStartDate(options.defaultPriod),options.dateDot));
				if (typeof($inputSetDate.attr("data-defaultdate"))!="undefined"){
					$inputSetDate.val($inputSetDate.attr("data-defaultdate"));
				}
				if (defaultVal != ""){
					$inputSetDate.val(defaultVal);
				}
			}else{
				if ($inputFromDate.attr("data-defaultpriod")){
					options.defaultPriod = $inputFromDate.attr("data-defaultpriod");
				}
				//湲곌컙�� 寃쎌슦
				if(options.quickBtnArea){	//quick btn �좊Т
					if (typeof($inputFromDate.attr("data-quickbtnarray"))!="undefined"){
						options.quickBtnAreaArray = $inputFromDate.attr("data-quickbtnarray").split(",");
					}
					if($inputFromDate.attr("data-quickbtnarray")==""){

					}else{
						// var $btnArea = $("<span />", {"class" : "btnArea"});
						var $btnArea = $("<div />", {"class" : "form_group form_period"});
						for(var i=0;i<options.quickBtnAreaArray.length;i++){
							var btnText = options.quickBtnAreaArray[i].replace("D","��").replace("0��","�ㅻ뒛").replace("W","二쇱씪").replace("M","媛쒖썡").replace("Y","��");
							//var $btn = $("<a href='javascript:;' />", {"class" : "btnWhite", "data-sDate" : rtnYYYYMMDD(rtnStartDate(options.quickBtnAreaArray[i]),options.dateDot)}).text(btnText); /*20200414 jo*/
							var $btn1 = $('<label class="btn_chk btn_line" />');
							var $btn2 = $("<span />", {"class" : "label", "data-sDate" : rtnYYYYMMDD(rtnStartDate(options.quickBtnAreaArray[i]),options.dateDot)}).text(btnText); /*20200414 jo*/
							var $btn3 = $('<input type="radio" name="radioPeriod">');
							var $btn4 = $('<span class="bg"></span>');
							$btn1.append($btn2, $btn3, $btn4);
							$btnArea.append($btn1);
						}
						$btnArea.find("label.btn_chk").bind("click",function(){
							//$btnArea.find("span.label").removeClass("btn_Blue").addClass('btnWhite').removeAttr('title'); // 珥덇린��
							$btnArea.find('label.btn_chk').removeClass('checked');
							//$(this).addClass("btn_Blue").removeClass('btnWhite').attr('title', '�좏깮��');
							$(this).addClass('checked');
							var priodValue = $(this).text().replace("�ㅻ뒛","0D").replace("二쇱씪","W").replace("��","D").replace("媛쒖썡","M").replace("��","Y");
							$inputFromDate.val(rtnYYYYMMDD(rtnStartDate(priodValue),options.dateDot));
							$inputToDate.val(rtnYYYYMMDD(new Date(),options.dateDot));
							if($wrap.find(".calendar:visible").length){
								$wrap.find(".calendar:visible").hide();
							}
							if(typeof(fe_cal_callback)=="function"){
								fe_cal_callback($btnArea.find("span").index($(this)));
							}
							return false;
						});
						$wrap.after($btnArea)

						$inputFromDate.on('blur', checkBtnAtv);
						$inputToDate.on('blur', checkBtnAtv);
					}
					$parentForm.find("input").bind("keydown",function(e){
						if(e.keyCode == 13){
							//form �댁쓽 input�먯꽌 enter�� first button click 諛쒖깮.(submit諛쒖깮怨� 鍮꾩듂�� �먮━)
							return false;
						}
					});
				}

				//�щ젰 �꾩씠肄� �쎌엯
				if($inputFromDate.length){
					//$inputFromDate.attr("readonly","");
					$inputFromDate.css("cursor","pointer");
					if($inputFromDate.siblings('A').size() == 0) {
						var $imgFromDate = $("<a />",{"href":"javascript:;","class":"btn_calendar"});
						$inputFromDate.after($imgFromDate);
					}

					var defaultVal = $inputFromDate.val();
					$inputFromDate.val(rtnYYYYMMDD(rtnStartDate(options.defaultPriod),options.dateDot));
					if ($inputFromDate.attr("data-defaultdate")){
						$inputFromDate.val($inputFromDate.attr("data-defaultdate"));
					}
					if (defaultVal != ""){
						$inputFromDate.val(defaultVal);
					}

				}
				if($inputToDate.length){
					//$inputToDate.attr("readonly","");
					$inputToDate.css("cursor","pointer");
					if($inputToDate.siblings('A').size() == 0) {
						var $imgToDate = $("<a />",{"href":"javascript:;","class":"btn_calendar"});
						$inputToDate.after($imgToDate);
					}

					var defaultVal = $inputToDate.val();
					$inputToDate.val(rtnYYYYMMDD(new Date(),options.dateDot));
					if ($inputToDate.attr("data-defaultdate")){
						$inputToDate.val($inputToDate.attr("data-defaultdate"));
					}
					if (defaultVal != ""){
						$inputToDate.val(defaultVal);
					}
				}

				if(options.dualCalendar){ // .dual_calendar �좊Т
					checkDualCalBtnAtv();
				}else if(options.quickBtnArea){	//quick btn �좊Т
					checkBtnAtv();
				}
			}

			function checkBtnAtv(){
				var sDate = $inputFromDate.val();
				var eDate = $inputToDate.val();
				if($.trim(sDate) != "" && $.trim(eDate) != ""){
					$wrap.find(".btnArea").find("a").each(function(i,o){
						var priodValue = $(o).text().replace("�ㅻ뒛","0D").replace("二쇱씪","W").replace("��","D").replace("媛쒖썡","M").replace("��","Y");
						var temp_sDate = rtnYYYYMMDD(rtnStartDate(priodValue),options.dateDot);
						var temp_eDate = rtnYYYYMMDD(new Date(),options.dateDot);

						if(sDate == temp_sDate && eDate == temp_eDate){
							//$(o).addClass("btn_Blue").removeClass("btnWhite").attr('title', '�좏깮��');
						}else{
							//$(o).removeClass("btn_Blue").addClass("btnWhite").removeAttr('title');
							$btnArea.find('label.btn_chk').removeClass('checked');
						}
					});
				}else{
					//$wrap.find(".btnArea").find("button").removeClass("btn_Blue");
					$btnArea.find('label.btn_chk').removeClass('checked');
				}
			}

			//�뱀젙 湲곌컙 �쒖옉�좎쭨 諛섑솚.
			function rtnStartDate(priod){
				if(priod) {
					priod = jQuery.trim(priod);
				}
				var priodType = priod.substr(priod.length-1,1);
				var priodLen = priod.substr(0,priod.length-1);

				var endDate = new Date();
				endDate.setYear(endDate.getFullYear());
				endDate.setMonth(endDate.getMonth());
				switch (priodType){
					case "D" :
						endDate.setDate(endDate.getDate()-priodLen);
						return endDate;
						break;
					case "W" :
						endDate.setDate(endDate.getDate()-(priodLen*7));
						return endDate;
						break;
					case "M" :
						endDate.setMonth(endDate.getMonth()-priodLen);
						return endDate;
						break;
					case "Y" :
						endDate.setYear(endDate.getFullYear()-priodLen);
						return endDate;
						break;
				}
			}

			function bindCalendar() {

			}

			//�щ젰 洹몃━湲�
			function drawCalendar(tgOpener, tgDate) {
				var $opener = tgOpener;
				var $calendarDiv = $("<div />",{"class":"calendar"}).hide();
				if($opener.prev("input").hasClass("fromDate")){
					$calendarDiv.addClass("fromDate");
				}else if($opener.prev("input").hasClass("toDate")){
					$calendarDiv.addClass("toDate");
				}else if($opener.prev("input").hasClass("setDate")){
					$calendarDiv.addClass("setDate");
				}
				var flag_holiday = false;
				if($opener.prev("input").hasClass("fe_noholiday")){
					flag_holiday = true;
				}
				var flag_dateLock = false;
				var dateLock_start = "";
				var dateLock_end = "";
				if(typeof($opener.prev("input").attr("data-datelocks"))!="undefined" || typeof($opener.prev("input").attr("data-datelocke"))!="undefined"){
					flag_dateLock = true;
					if(typeof($opener.prev("input").attr("data-datelocks"))!="undefined"){
						dateLock_start = $opener.prev("input").attr("data-datelocks");
					}
					if(typeof($opener.prev("input").attr("data-datelocke"))!="undefined"){
						dateLock_end = $opener.prev("input").attr("data-datelocke");
					}
				}
				var $dateDiv = $("<div />",{"class":"date"});

				$opener.after($calendarDiv.append($dateDiv));
				var calHTML = "";
				var nowDate = new Date();
				if(tgDate){
					var calDate = new Date(tgDate.replace(/(\.)+/g,"/"));
					var selDate = new Date(tgDate.replace(/(\.)+/g,"/"));
				}else{
					var calDate = new Date();
					var selDate = new Date();
				}

				var startDay = rtnStartDay(calDate);

				var nowDayCount = rtnLastDate(calDate);

				var totaltdCount = rtnTdCnt(startDay, nowDayCount);

				var $ctlBox = $("<p />");
				var $leftArrowY = $("<button />",{"class" : "prev"}).text("�댁쟾 �꾨룄");
				var $rightArrowY = $("<button />",{"class" : "next"}).text("�ㅼ쓬 �꾨룄");
				var $leftArrowM = $("<button />",{"class" : "prev"}).text("�댁쟾 ��");
				var $rightArrowM = $("<button />",{"class" : "next"}).text("�ㅼ쓬 ��");
				var $spanY = $("<strong />");
				var $spanM = $("<strong />");

				$ctlBox.append($leftArrowY);
				$ctlBox.append($spanY);
				$ctlBox.append($rightArrowY);
				$ctlBox.append($leftArrowM);
				$ctlBox.append($spanM);
				$ctlBox.append($rightArrowM);
				$spanY.text(calDate.getFullYear()+"��");
				$spanM.text((calDate.getMonth()+1)+"��");

				$dateDiv.append($ctlBox);

				$opener.prev("input").unbind("focusout.fe_cal").bind("focusout.fe_cal",function(){
					var thisVal = $(this).val();
					//�좏슚�� 寃���
					if(checkDate(thisVal)){
						if($.trim(thisVal)!=""){
							var testVal = thisVal.replace(/(\.)+/g,"");
							var YYYY = testVal.substr(0,4);
							var MM = testVal.substr(4,2);
							var DD = testVal.substr(6,2);
							if(flag_dateLock){
								if(dateLock_start != ""){
									if(dateLock_start == "today"){
										var dif1 = rtnYYYYMMDD(new Date(),"");
									}else{
										var dif1 = rtnYYYYMMDD(rtnDateDiff(new Date(),dateLock_start),"");
									}
									if(testVal == rtnYYYYMMDD(new Date(),"") && dateLock_start != "-2Y"){
										alert("湲덉씪 �댄썑遺��� �좏깮�섏떎 �� �덉뒿�덈떎.");
										$(this).val("");
										$(this).focus();
										return false;
									}
									if(Number(testVal) < Number(dif1) && dateLock_start != "-2Y"){
										alert("�ㅻ뒛蹂대떎 �댁쟾�쇱� �좏깮�섏떎 �� �놁뒿�덈떎.");
										$(this).val("");
										$(this).focus();
										return false;
									}

									if(Number(testVal) < Number(dif1) && dateLock_start == "-2Y"){
										alert("�듯빀 �섏씡瑜� 愿��� �곗씠�곕뒗 理쒕� 2�� �꾨��� 湲덉씪源뚯�留�\n�좏깮�섏떎 �� �덉뒿�덈떎.");
										$(this).val("");
										$(this).focus();
										return false;
									}
								}
								if(dateLock_end != ""){
									if(dateLock_end == "today"){
										var dif2 = rtnYYYYMMDD(new Date(),"");
									}else{
										var dif2 = rtnYYYYMMDD(rtnDateDiff(new Date(),dateLock_end),"");
									}
									if(Number(testVal) > Number(dif1) && dateLock_start != "-2Y"){
										alert("�쒕떖 �대궡留� �좏깮 �섏떎 �� �덉뒿�덈떎.�ㅻ뒛蹂대떎 �댁쟾�쇱� �좏깮�섏떎 �� �놁뒿�덈떎.");
										$tgInput.val("");
										$tgInput.focus();
										return false;
									}
								}
							}
							if($(this).hasClass("fe_noholiday")){	//怨듯쑕�� 寃���
								if(document.domain=="tf2.0standard.net"){//acg standard server
									var holidayURL = "/guide/script/holiday.html?year="+YYYY+"&month="+MM;	//2013�� static setting
								}else{
									var holidayURL = "/tfcommon/base/calendar.jsp?year="+YYYY+"&month="+MM;
								}
								try{
									var $tgInput = $(this);
									var tgcheckDate = new Date(YYYY+"/"+MM+"/"+DD);
									var tgcheckDay = tgcheckDate.getDay();
									if(tgcheckDay == 0 || tgcheckDay == 6){
										alert("怨듯쑕�쇱� �좏깮�섏떎 �� �놁뒿�덈떎.");
										$tgInput.val("");
										$tgInput.focus();
										return false;
									}
									$.post(
										holidayURL,
										"",
										function(data){
											var holiday = eval(data);
											var holidayCheck = false;
											for(var i = 0; i<holiday.length;i++){
												if(testVal == holiday[i]){
													holidayCheck = true;
												}
											}
											if(holidayCheck){
												alert("怨듯쑕�쇱� �좏깮�섏떎 �� �놁뒿�덈떎.");
												$tgInput.val("");
												$tgInput.focus();
												return false;
											}else{
												$tgInput.val(YYYY+options.dateDot+MM+options.dateDot+DD);
												checkBtnAtv();
												//�좎쭨媛� 蹂�寃쎌떆 callback
												if($tgInput.attr("data-callback")){
													try{
														eval($tgInput.attr("data-callback"));
													}catch(e){}
												}
											}
										}
									);
								}catch(e){
									alert(e);
								}
							}
							$(this).val(YYYY+options.dateDot+MM+options.dateDot+DD);
							checkBtnAtv();
							//�좎쭨媛� 蹂�寃쎌떆 callback
							if($(this).attr("data-callback")){
								try{
									eval($(this).attr("data-callback"));
								}catch(e){}
							}
						}
					}else{
						$(this).val("");
						$(this).focus();
					}
				});
				//input enterkey �щ젰icon click �곕룞
				/*
                $opener.prev("input").bind("keydown",function(e){
                    if (e.keyCode == 13){
                        $opener.triggerHandler("click");
                        return false;
                    }
                });
                */
				//drawTable();


				//arg1 targetDate dateType
				//arg2 dateDif
				//rtnType date
				function rtnDateDiff(arg1, arg2){
					var tgday = arg1;
					var dateDif = arg2;

					var tgday_y = tgday.getFullYear();
					var tgday_m = tgday.getMonth();
					var tgday_d = tgday.getDate();

					if(dateDif.indexOf("D")>=0){
						var resultDate = new Date(tgday_y,tgday_m,tgday_d+Number(dateDif.replace("D","")));
					}else if(dateDif.indexOf("M")>=0){
						var resultDate = new Date(tgday_y,tgday_m+Number(dateDif.replace("M","")),tgday_d);
					}else if(dateDif.indexOf("Y")>=0){
						var resultDate = new Date(tgday_y+Number(dateDif.replace("Y","")),tgday_m,tgday_d);
					}
					return resultDate;
				}
			}

			function checkDate(arr1){
				var testVal = arr1.replace(/(\.)+/g,"");
				if($.trim(testVal)==""){
					return true;
				}
				if(isNaN(testVal)){
					alert("�쇱옄�� 媛믪뿉�� 臾몄옄媛� �낅젰�� �� �놁뒿�덈떎");
					return false;
				}else{
					//�좎쭨 泥댄겕
					if(testVal.length != 8){
						alert("�쇱옄�� 媛믪� YYYY"+options.dateDot+"MM"+options.dateDot+"DD�� �뺤떇�쇰줈 �낅젰�� 二쇱떗�쒖삤.");
						return false;
					}
					var YYYY = testVal.substr(0,4);
					var MM = testVal.substr(4,2);
					var DD = testVal.substr(6,2);
					if(Number(YYYY) > 2100 || Number(YYYY) < 1900){
						alert("�쇱옄�� �곕룄�� 1900�� ~ 2100�� �ъ씠�� 媛믪쓣 �낅젰�� 二쇱떗�쒖삤.");
						return false;
					}
					if(Number(MM) > 12 || Number(MM) < 1){
						alert("�쇱옄�� �붿쓣 01 ~ 12�� �ъ씠�� 媛믪쑝濡� �낅젰�� 二쇱떗�쒖삤..");
						return false;
					}
					var tgDate = new Date(YYYY+"/"+MM+"/01");
					var lastDay = rtnLastDate(tgDate);

					if(Number(DD) > lastDay || Number(DD) < 1){
						alert(MM+"�붿뿉�� "+DD+"�쇱씠 �놁뒿�덈떎.");
						return false;
					}

				}
				return true;
			}

			//�대떦�� 1�쇱쓽 �붿씪 諛섑솚
			function rtnStartDay(tgDate){
				var startDate = new Date(tgDate.getFullYear()+"/"+(tgDate.getMonth()+1)+"/"+"01");
				var startDay = startDate.getDay();

				return startDay;
			}

			//媛��� 留덉�留� �좎쭨瑜� 援ы빐��  .getDate();= �대쾲�� 珥� �쇱닔.
			//�ㅼ쓬�� 1�� - �섎（. = �대쾲�� 留덉�留� �좎쭨.
			function rtnLastDate(tgDate){
				var endDate = new Date();
				endDate.setDate(1);
				if (tgDate){
					endDate.setYear(tgDate.getFullYear());
					endDate.setMonth(tgDate.getMonth()+1);
				}else{
					endDate.setMonth(endDate.getMonth() + 1);
				}
				endDate.setDate(0);
				var nowDayCount = endDate.getDate();	//�대쾲�� 留덉�留됱씪
				return nowDayCount;
			}

			//�대떦�붿쓽 珥� 移몄닔.
			function rtnTdCnt(startDay, nowDayCount){
				var totaltdCount = startDay + nowDayCount + 7 -( (startDay + nowDayCount)%7 );
				if ( (startDay + nowDayCount)%7 ==0)	{
					totaltdCount = startDay + nowDayCount;
				}
				return totaltdCount
			}

			//�щ젰 �좎쭨 �щ㎎ 蹂��섑빐 諛섑솚
			function rtnYYYYMMDD(tgDate,dot){
				var YYYY = tgDate.getFullYear();
				var MM = tgDate.getMonth()+1;
				var DD = tgDate.getDate();
				if (MM < 10){
					MM = "0"+String(MM);
				}
				if (DD < 10){
					DD = "0"+String(DD);
				}
				if(dot){
					return String(YYYY)+dot+String(MM)+dot+String(DD);
				}else{
					return String(YYYY)+String(MM)+String(DD);
				}
			}
		}
	};


// fe_calendar Plugin
	$.fn.fe_calendar2 = function(method) {
		// Method calling logic
		if ( fe_calendar_methods2[method] ) {
			return fe_calendar_methods2[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
			return fe_calendar_methods2.init.apply( this, arguments );
		} else {
			$.error( 'Method "' +  method + '" does not exist on this function' );
		}
	};
// fe_calendar Defaults

	$.fn.fe_setAmountModule2 = function(){
		var options = $.extend({}, $.fn.fe_setAmountModule2.defaults, options);

		var $tgInput = $(this);		// fe_Amount2 input
		$tgInput.addClass('formw_md');
		var $tgInputId = $tgInput.attr('id')+"_hangulAmt";	// IcheAmt_hangulAmt
		var $parentForm = $tgInput.parents("form");
		var $btnArea = $("<div />").addClass("form_group grid5");

		// var $btnModule = $("<div />").addClass("module");
		var $amountModule = $("<div />").addClass("form_amount");
		var $amountModuleL = $("<div />")
		var $amountModuleR = $("<div />")

		var $convertHanAmount = $("<input id='"+$tgInputId+"' name='hangulAmt' type='text' readonly='readonly' title='"+$("label[for='"+$tgInput.attr("id")+"']").text().replace(" *","")+" �쒓�蹂���"+"' class='conHanAmount wide' />");

		var decimal_point = typeof($tgInput.attr("decimal-point"))!="undefined" && Number($tgInput.attr("decimal-point")) !=NaN
			?Number($tgInput.attr("decimal-point")):0;

		// $convertHanAmount.width(320);

		if(options.ariaFlag){
			$convertHanAmount.attr("aria-live","assertive");
		}

		if (typeof($tgInput.attr("data-unit"))!="undefined"){
			options.lastUnit = " "+$tgInput.attr("data-unit");
			$convertHanAmount.attr("data-unit",$tgInput.attr("data-unit"));
		}

		//湲덉븸�쒓� 泥섎━ �④��щ�
		var hangulAmt = typeof($tgInput.attr("hangulAmt"))!="undefined" && $tgInput.attr("hangulAmt")=="N"?false:true;
		if(!hangulAmt) $convertHanAmount.css("display","none");

		// $tgInput.parent() : div.form_acc_area
		$tgInput.parent().prepend($amountModule);
		$tgInput.parent().children().first().after($btnArea)		// 踰꾪듉 ��

		$btnArea.append($btnArea);

		$amountModule.append($amountModuleL).append($amountModuleR);
		//$amountModuleL.append($(this).parent());
		$amountModuleL.append($("<span />").addClass("input_number"));

		$amountModuleL.find('.input_number').append($(this));
		// 湲덉븸��젣 愿��� �띿뒪�� �섏젙
		$amountModuleL.find('.input_number').append('<button class="input_number_close" type="button"><span class="blind">�낅젰 湲덉븸 ��젣</span></button>');
		$amountModuleL.find('.input_number').append($("<span />").text("��"));
		//$amountModuleR.append($("<span />").addClass("readingInput").addClass("sumAmount").addClass("wide"));
		$amountModuleR.append($("<span />").addClass("input_hangul"));
		$amountModuleR.find(".input_hangul").append("<label for='"+$tgInputId+"' class='offscreen'>"+$("label[for='"+$tgInput.attr("id")+"']").text().replace(" *","")+"</label>");
		$amountModuleR.find(".input_hangul").find('label').append($("<span />").addClass("blind").text("�쒓�湲덉븸"));
		$amountModuleR.find(".input_hangul").append($convertHanAmount);
		$tgInput.attr("maxlength",options.maxlength);
		//$tgInput.addClass('t_right');

		if (options.quickBtnArea){
			if (typeof($tgInput.attr("data-quickbtnarray"))!="undefined"){
				options.quickBtnAreaArray = $tgInput.attr("data-quickbtnarray").split(",");
			}
			if(options.quickBtnAreaArray == ""){
				// $btnModule.remove();
			}
			for(var i=0;i<options.quickBtnAreaArray.length;i++){
				var btnText = options.quickBtnAreaArray[i];
				if(btnText == "ALL"){
					btnText = "�꾩븸";
				}else if(btnText == "DEL"){
					btnText = "�뺤젙";
				}else{
					if(Number(btnText) >= 100000000){
						btnText = "+"+String(Math.round(Number(btnText)/100000000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"��";
					}else if(Number(btnText) >= 10000000){
						btnText = "+"+String(Math.round(Number(btnText)/10000000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"泥쒕쭔";
					}else if(Number(btnText) >= 10000){
						btnText = "+"+String(Math.round(Number(btnText)/10000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"留�";
					}else
						btnText = btnText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				var $btn = $("<button />", {"class" : "btn btn_line",'type':'button'}).append($("<span />").text(btnText));
				if(btnText == "�꾩븸"){
					$btn.removeClass("btn_line");
					$btn.addClass("btn_second");
				}
				$btnArea.append($btn);
			}
			$btnArea.find("button").bind("click",function(){
				//$btnArea.find("button").removeClass("atv");
				var btnText = $(this).text();
				if(btnText == "�꾩븸"){
					// �쒗쑕���됱씪寃쎌슦
					if( window.bankisFlag ) {
						$tgInput.val($('input[name="IBCOM_S_O_PAYM_ABLE_AMT"]').val());	// 異쒓툑媛��κ툑��
						$tgInput.fe_setNumFormat();
					} else {	// 利됱떆/�덉빟�댁껜�쇨꼍��
						$tgInput.val("");
						$convertHanAmount.val("�꾩븸異쒓툑");
					}
					//媛쒕컻�� property �뺤씤 �꾩슂.
				}else if(btnText == "�뺤젙"){
					$tgInput.val("");
					$convertHanAmount.val("");
					//媛쒕컻�� property �뺤씤 �꾩슂.
				}else{
					//$(this).addClass("atv");
					btnText = btnText.replace("+","").replace(/\,/gi,'');
					var plusAmount = 0;
					if(btnText.indexOf("��") > 0){
						plusAmount = Number(btnText.replace("��",""))*100000000;
					}else if(btnText.indexOf("泥쒕쭔") > 0){
						plusAmount = Number(btnText.replace("泥쒕쭔",""))*10000000;
					}else if(btnText.indexOf("留�") > 0){
						plusAmount = Number(btnText.replace("留�",""))*10000;
					}else{
						plusAmount = Number(btnText);
					}
					var nowAmount = $tgInput.val().replace(/,/g,"");

					if(Number(nowAmount)==NaN) nowAmount ="0";

					var sumVal = Number(nowAmount)+plusAmount;

					sumVal = decimal_point>0?parseFloat(sumVal).toFixed(decimal_point):sumVal;

					$tgInput.val(sumVal);
					$tgInput.fe_setNumFormat();
				}
				if(typeof(fe_amount_callback)=="function"){
					fe_amount_callback($btnArea.find("button").index($(this)));
				}
				return false;
			});
			$btnArea.find("button").bind("mouseenter",function(){
				//$(this).addClass("atv");
			});
			$btnArea.find("button").bind("mouseleave",function(){
				//$(this).removeClass("atv");
			});
			$parentForm.find("input").bind("keydown",function(e){
				if(e.keyCode == 13){
					//form �댁쓽 input�먯꽌 enter�� first button click 諛쒖깮.(submit諛쒖깮怨� 鍮꾩듂�� �먮━)
					return false;
				}
			});
		}

		$tgInput.fe_setNumFormat();


		if(decimal_point==0){
			$tgInput.bind("keyup",function(e){
				//shift �뱀닔臾몄옄 �쒓굅 異붽�. 20130708 by ACG
				if(KOS) {	//�ㅻ낫�� 蹂댁븞 �뚮Ц�� �곕줈 援ы쁽
					this.value = this.value.replace(/[^\d,]/gi, '');
					$tgInput.fe_setNumFormat();

				} else {	//as-is
					if((e.keyCode >= 48 && e.keyCode <=57 && !e.shiftKey) || (e.keyCode >= 96 && e.keyCode <= 105 && !e.shiftKey) || e.keyCode == 8 || e.keyCode == 46){
						setTimeout(function(){
							$tgInput.fe_setNumFormat()
						},1);
					}else if(e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 9 || e.keyCode == 16){
						//window event
					}else{
						return false;
					}
				}

			});
		}else{
			$tgInput.bind("keypress", function(evt){
				var charCode = (evt.which) ? evt.which : event.keyCode;
				console.log('isNumberKey=>'+charCode);
				if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
					return false;
				var _value = event.srcElement.value.replace(/\,/gi,'');

				var _pattern0 = /^\\d*[.]\\d*$/; // �꾩옱 value媛믪뿉 �뚯닔��(.) �� �덉쑝硫� . �낅젰遺덇�
				if (_pattern0.test(_value)) {
					if (charCode == 46) {
						return false;
					}
				}
				var _pattern2 = new RegExp("^\\d*[.]\\d\{"+decimal_point+"\}$","gi"); // �꾩옱 value媛믪씠 �뚯닔�� 紐뉗옄由ш퉴吏� �낅젰
				if (_pattern2.test(_value)) {
					return false;
				}
				return true;
			});
			$tgInput.bind("keyup", function(evt){
				var charCode = (evt.which) ? evt.which : event.keyCode;
				var _value = event.srcElement.value.replace(/\,/gi,'');
				var parts =_value.toString().split(".");

				if(Number(_value)==NaN ||  Number(_value) ==0) parts[0]="0";
				else  parts[0]=""+Number(parts[0]);

				event.srcElement.value=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : ((parts.length==decimal_point)?".":""));
			});
			$tgInput.bind("blur", function(){
				var b_zero =  typeof($tgInput.attr("zero-flag"))!="undefined" && $tgInput.attr("zero-flag")=='Y'?true:false;

				var _value = $tgInput.val().replace(/\,/gi,'');

				if(!b_zero && _value=="" ) return;

				var parts =_value.toString().split(".");

				if(Number(_value)==NaN ||  Number(_value) ==0) parts[0]="0";
				else  parts[0]=""+Number(parts[0]);

				var s_decimal= parts[1]?parts[1]:"";

				while(s_decimal.length<decimal_point) s_decimal+="0";


				$tgInput.val(parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (s_decimal.length>0 ? "." + s_decimal : ((parts.length==decimal_point)?".":"")));
			});
		}

		//input ��젣 踰꾪듉
		// �レ옄 吏곸젒 �낅젰��
		$('.form_amount .input_number input[type="text"]').on('propertychange change keyup paste input', function(){
			var is_val = $('.form_amount .input_number input[type="text"]').val();
			if(is_val){
				$('.input_number_close').show();
			}
		});
		// 踰꾪듉 �대┃ ��
		$btnArea.find("button").bind("click",function(){
			var is_val = $('.form_amount .input_number input[type="text"]').val();
			if(is_val){
				$('.input_number_close').show();
			}
		});
		$('.input_number_close').on('click', function(){
			//$('.form_amount .input_number input[type="text"]').val('');
			$tgInput.val("");
			$convertHanAmount.val("");
			$(this).hide();
		});


		return;
	};

	$.fn.fe_setAmountModule2.defaults = {
		ariaFlag : true,
		quickBtnArea : true,
		quickBtnAreaArray : ["1000000", "100000", "50000", "10000", "ALL"],
		numArray : ["","��","��","��","��","��","��","移�","��","援�","��"],
		unitArray : ["","","��","諛�","泥�","留� ","��","諛�","泥�","�� ","��","諛�","泥�"],
		lastUnit : " ��",
		maxlength : 14
	};

// 2021 由щ돱�� end

	// 2022 由щ돱��
	$.fn.fe_setAmountModule3 = function(){
		var options = $.extend({}, $.fn.fe_setAmountModule3.defaults, options);

		var $tgInput = $(this);
		var $tgInputId = $tgInput.attr('id')+"_hangulAmt";
		var $parentForm = $tgInput.parents("form");
		var $btnArea = $("<div />").addClass("btnArea type-radio");

		var $btnModule = $("<div />").addClass("module");
		var $amountModule = $("<div />").addClass("module").addClass("clearfix");
		var $amountModuleL = $("<div />").addClass("alignL");
		var $amountModuleR = $("<div />").addClass("alignL").addClass("marL10");

		var $convertHanAmount = $("<input id='"+$tgInputId+"' name='hangulAmt' type='text' readonly='readonly' title='"+$("label[for='"+$tgInput.attr("id")+"']").text().replace(" *","")+" �쒓�蹂���"+"' class='conHanAmount t_right wide' />");

		var decimal_point = typeof($tgInput.attr("decimal-point"))!="undefined" && Number($tgInput.attr("decimal-point")) !=NaN
								?Number($tgInput.attr("decimal-point")):0;

		$convertHanAmount.width(320);

		if(options.ariaFlag){
			$convertHanAmount.attr("aria-live","assertive");
		}

		if (typeof($tgInput.attr("data-unit"))!="undefined"){
			options.lastUnit = " "+$tgInput.attr("data-unit");
			$convertHanAmount.attr("data-unit",$tgInput.attr("data-unit"));
		}

		//湲덉븸�쒓� 泥섎━ �④��щ�
		var hangulAmt = typeof($tgInput.attr("hangulAmt"))!="undefined" && $tgInput.attr("hangulAmt")=="N"?false:true;
		if(!hangulAmt) $convertHanAmount.css("display","none");

		$tgInput.parent().before($amountModule);
		$tgInput.parent().before($btnModule);

		$btnModule.append($btnArea);

		$amountModule.append($amountModuleL).append($amountModuleR);
		$amountModuleL.append($(this).parent());
		$amountModuleL.append(options.lastUnit);
		$amountModuleR.append($("<span />").addClass("readingInput").addClass("sumAmount").addClass("wide"));
		$amountModuleR.find(".sumAmount").append("<label for='"+$tgInputId+"' class='offscreen'>"+$("label[for='"+$tgInput.attr("id")+"']").text().replace(" *","")+"</label>");
		$amountModuleR.find(".sumAmount").append($convertHanAmount);
		$tgInput.attr("maxlength",options.maxlength);
		$tgInput.addClass('t_right');

		if (options.quickBtnArea){
			if (typeof($tgInput.attr("data-quickbtnarray"))!="undefined"){
				options.quickBtnAreaArray = $tgInput.attr("data-quickbtnarray").split(",");
			}
			if(options.quickBtnAreaArray == ""){
				$btnModule.remove();
			}
			for(var i=0;i<options.quickBtnAreaArray.length;i++){
				var btnText = options.quickBtnAreaArray[i];
				if(btnText == "ALL"){
					btnText = "�꾩븸";
				}else if(btnText == "DEL"){
					btnText = "�뺤젙";
				}else{
					if(Number(btnText) >= 100000000){
						btnText = "+"+String(Math.round(Number(btnText)/100000000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"��";
					}else if(Number(btnText) >= 10000000){
						btnText = "+"+String(Math.round(Number(btnText)/10000000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"泥쒕쭔";
					}else if(Number(btnText) >= 10000){
						btnText = "+"+String(Math.round(Number(btnText)/10000,0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"留�";
					}else
						btnText = btnText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				var $btn = $("<button />", {"class" : "btn btn_line",'type':'button'}).append($("<span />").text(btnText));
				if(btnText == "�뺤젙"){
					$btn.removeClass("btn_line");
					$btn.addClass("btn_second");
				}
				$btnArea.append($btn);
			}
			$btnArea.find("button").bind("click",function(){
				//$btnArea.find("button").removeClass("atv");
				var btnText = $(this).text();
				if(btnText == "�꾩븸"){
					$tgInput.val("");
					$convertHanAmount.val("�꾩븸異쒓툑");
					//媛쒕컻�� property �뺤씤 �꾩슂.
				}else if(btnText == "�뺤젙"){
					$tgInput.val("");
					$convertHanAmount.val("");
					//媛쒕컻�� property �뺤씤 �꾩슂.
				}else{
					//$(this).addClass("atv");
					btnText = btnText.replace("+","").replace(/\,/gi,'');
					var plusAmount = 0;
					if(btnText.indexOf("��") > 0){
						plusAmount = Number(btnText.replace("��",""))*100000000;
					}else if(btnText.indexOf("泥쒕쭔") > 0){
						plusAmount = Number(btnText.replace("泥쒕쭔",""))*10000000;
					}else if(btnText.indexOf("留�") > 0){
						plusAmount = Number(btnText.replace("留�",""))*10000;
					}else{
						plusAmount = Number(btnText);
					}
					var nowAmount = $tgInput.val().replace(/,/g,"");

					if(Number(nowAmount)==NaN) nowAmount ="0";

					var sumVal = Number(nowAmount)+plusAmount;

					sumVal = decimal_point>0?parseFloat(sumVal).toFixed(decimal_point):sumVal;

					$tgInput.val(sumVal);
					$tgInput.fe_setNumFormat();
				}
				if(typeof(fe_amount_callback)=="function"){
					fe_amount_callback($btnArea.find("button").index($(this)));
				}
				return false;
			});
			$btnArea.find("button").bind("mouseenter",function(){
				//$(this).addClass("atv");
			});
			$btnArea.find("button").bind("mouseleave",function(){
				//$(this).removeClass("atv");
			});
			$parentForm.find("input").bind("keydown",function(e){
				if(e.keyCode == 13){
					//form �댁쓽 input�먯꽌 enter�� first button click 諛쒖깮.(submit諛쒖깮怨� 鍮꾩듂�� �먮━)
					return false;
				}
			});
		}

		$tgInput.fe_setNumFormat();


		if(decimal_point==0){
			$tgInput.bind("keyup",function(e){
				//shift �뱀닔臾몄옄 �쒓굅 異붽�. 20130708 by ACG
				if(KOS) {	//�ㅻ낫�� 蹂댁븞 �뚮Ц�� �곕줈 援ы쁽
					this.value = this.value.replace(/[^\d,]/gi, '');
					$tgInput.fe_setNumFormat();

				} else {	//as-is
					if((e.keyCode >= 48 && e.keyCode <=57 && !e.shiftKey) || (e.keyCode >= 96 && e.keyCode <= 105 && !e.shiftKey) || e.keyCode == 8 || e.keyCode == 46){
						setTimeout(function(){
							$tgInput.fe_setNumFormat()
						},1);
					}else if(e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 9 || e.keyCode == 16){
						//window event
					}else{
						return false;
					}
				}

			});
		}else{
			$tgInput.bind("keypress", function(evt){
				var charCode = (evt.which) ? evt.which : event.keyCode;
		        console.log('isNumberKey=>'+charCode);
		        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
		            return false;
		        var _value = event.srcElement.value.replace(/\,/gi,'');

		        var _pattern0 = /^\\d*[.]\\d*$/; // �꾩옱 value媛믪뿉 �뚯닔��(.) �� �덉쑝硫� . �낅젰遺덇�
		        if (_pattern0.test(_value)) {
		            if (charCode == 46) {
		                return false;
		            }
		        }
		        var _pattern2 = new RegExp("^\\d*[.]\\d\{"+decimal_point+"\}$","gi"); // �꾩옱 value媛믪씠 �뚯닔�� 紐뉗옄由ш퉴吏� �낅젰
		        if (_pattern2.test(_value)) {
		           return false;
		        }
		        return true;
			});
			$tgInput.bind("keyup", function(evt){
				var charCode = (evt.which) ? evt.which : event.keyCode;
				var _value = event.srcElement.value.replace(/\,/gi,'');
				var parts =_value.toString().split(".");

				if(Number(_value)==NaN ||  Number(_value) ==0) parts[0]="0";
				else  parts[0]=""+Number(parts[0]);

				event.srcElement.value=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : ((parts.length==decimal_point)?".":""));
			});
			$tgInput.bind("blur", function(){
				var b_zero =  typeof($tgInput.attr("zero-flag"))!="undefined" && $tgInput.attr("zero-flag")=='Y'?true:false;

				var _value = $tgInput.val().replace(/\,/gi,'');

				if(!b_zero && _value=="" ) return;

				var parts =_value.toString().split(".");

				if(Number(_value)==NaN ||  Number(_value) ==0) parts[0]="0";
				else  parts[0]=""+Number(parts[0]);

				var s_decimal= parts[1]?parts[1]:"";

				while(s_decimal.length<decimal_point) s_decimal+="0";


				$tgInput.val(parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (s_decimal.length>0 ? "." + s_decimal : ((parts.length==decimal_point)?".":"")));
			});
		}
		return;
	};

	$.fn.fe_setAmountModule3.defaults = {
			ariaFlag : true,
			quickBtnArea : true,
			quickBtnAreaArray : ["1000000", "100000", "50000", "10000", "ALL", "DEL"],
			numArray : ["","��","��","��","��","��","��","移�","��","援�","��"],
			unitArray : ["","","��","諛�","泥�","留� ","��","諛�","泥�","�� ","��","諛�","泥�"],
			lastUnit : " ��",
			maxlength : 14
	};

	$.fn.fe_setNumFormat = function(){
		var $tgInput = $(this);
		var b_zero =  typeof($tgInput.attr("zero-flag"))!="undefined" && $tgInput.attr("zero-flag")=='Y'?true:false;

		var decimal_point = typeof($tgInput.attr("decimal-point"))!="undefined" && Number($tgInput.attr("decimal-point")) !=NaN
								?Number($tgInput.attr("decimal-point")):0;

		var $convertHanAmount = $tgInput.parent().parent().next().find("input.conHanAmount");
		var tgValue = $tgInput.val().replace(/,/g,"");
		var strValue = String(tgValue);
		if(strValue.substr(0,1) == "0"){
			if(strValue=="0"){
				$tgInput.val(b_zero?"0":"");
				$convertHanAmount.fe_converHanAmount(tgValue);
				return;
			}
			$tgInput.val(Number(strValue));
			$tgInput.fe_setNumFormat();
			return;
		}
		var strLen = strValue.length;
		var conStr="";

		var parts =tgValue.toString().split(".");
		if(Number(tgValue)==NaN ||  Number(tgValue) ==0) parts[0]=b_zero?"0":"";
		else  parts[0]=""+Number(parts[0]);

		$tgInput.val(parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : ((parts.length==decimal_point)?".":"")));
		if($convertHanAmount.length){
			$convertHanAmount.fe_converHanAmount(tgValue);
		}
	};
	$.fn.fe_setAmountModule.defaults = {
		ariaFlag : true,
		quickBtnArea : true,
		quickBtnAreaArray : ["1000000", "100000", "50000", "10000", "ALL", "DEL"],
		numArray : ["","��","��","��","��","��","��","移�","��","援�","��"],
		unitArray : ["","","��","諛�","泥�","留� ","��","諛�","泥�","�� ","��","諛�","泥�"],
		lastUnit : " ��",
		maxlength : 14
	};
/* ***************** fe_setAmountModule END ********************** */

/* ***************** fe_layer ********************** */

	$.fn.fe_layer = function(method){
		var $opener = $(this);
		var $layer;
		if( $opener.attr("href").indexOf('#') > -1 ){  // ????
			$layer = $($opener.attr("href"));
		} else {
			$layer = $($opener);
		}
		/*
		$opener.off('click.fe_layer').on('click.fe_layer', function(){
			var $wrap = $('<DIV>').addClass('layerPopup'),
				$head = $('<DIV>').addClass('lp_head'),
				$body = $('<DIV>').addClass('lp_contents'),
				$layerClose = $('<BUTTON>').attr({
					'class' : 'lp_btnClose',
					'type'	: 'button'
				});

			//�ㅻ뜑 �앹꽦
			$('<DIV>').addClass('lp_top_line').appendTo($head);
			$('<SPAN>').text($opener.text()).appendTo($head);

			$layerClose.append('<img src="/inc/img/commonUI/lpop_close.png" alt style>')
			$wrap.append($head).append($body).append($layerClose);

			$opener.after($wrap);

			$body.append($layer);
			$wrap.open_layerPopup(true);
			$layer.show();

			$layerClose.off('click.fe_layer').on('click.fe_layer', function(){
				$wrap.close_layerPopup(true);
				setTimeout(function() {
					$wrap.remove();
				},1000);
			})
		})*/

	}

	$.fn.fe_layer_old2 = function(method){
		var $opener = $(this);
		var $layer;
		if( $opener.attr("href").indexOf('#') > -1 ){  // ????
			$layer = $($opener.attr("href"));
		} else {
			$layer = $($opener);
		}


		var $wrap = $('<DIV>').addClass('layerPopup'),
			$head = $('<DIV>').addClass('lp_head'),
			$body = $('<DIV>').addClass('lp_contents'),
			$layerClose = $('<BUTTON>').attr({
				'class' : 'lp_btnClose',
				'type'	: 'button'
			});

		//�ㅻ뜑 �앹꽦
		$('<DIV>').addClass('lp_top_line').appendTo($head);
		$('<SPAN>').text($opener.text()).appendTo($head);

		$layerClose.append('<img src="/inc/img/commonUI/lpop_close.png" alt style>')
		$wrap.append($head).append($body).append($layerClose);


		if($layer.closest('FORM').length) {
			$layer.closest('FORM').append($wrap);
		}else {
			jQuery('BODY').append($wrap);
		}

		$body.append($layer);
		$opener.off('click.fe_layer').on('click.fe_layer', function(){
			$wrap.open_layerPopup(true);
		})
		$layerClose.off('click.fe_layer').on('click.fe_layer', function(){
			$wrap.close_layerPopup(true);
		})


	}

	$.fn.fe_layer_old = function(method){
		var options = $.extend({}, $.fn.fe_layer.defaults, options);
		var $opener = $(this);

		if (method != "popup"){
			var $layer;
			if( $opener.attr("href").indexOf('#') > -1 ){  // ????
				$layer = $($opener.attr("href"));
			} else {
				$layer = $($opener);
			}
			var $layerClose = $layer.find("a.close");
			var $layerOK = $layer.find("a.yes");

			$layer.css("visibility","hidden").show();
		}

		if(method =="basic" || method == "searchDetail"){
			if(method == "basic"){
				$layer.css({"position":"absolute","top":"0px","left":"0px"});

				var contentOffset = $("#content").offset();
				var contentWidth = $("#content").outerWidth();

				var layerOffset = $layer.offset();
				var layerLeft = layerOffset.left - contentOffset.left;
				var layerTop = layerOffset.top - contentOffset.top;

				var layerWidth = options.layerWidth_Basic;
				if($layer.hasClass("wide")){
					layerWidth = options.layerWidth_Wide;
				}
				var tgLeft = 0;
				var tgTop = $opener.parents(".btnArea").outerHeight();
				if(layerWidth+layerLeft > contentWidth){
					tgLeft = layerWidth+layerLeft - contentWidth;
				}

				$layer.css({"top":tgTop+"px","left":"-"+String(tgLeft)+"px","z-index":options.layerZindex}).hide().css("visibility","visible");
				$layerClose.prepend($opener.text());
			}else{
				$layer.hide().css("visibility","visible");
				$layerClose = $layer.find("a.detailClose");
				$layerClose.prepend($("<span />").addClass("screenout").text($opener.text()));
			}


			$opener.unbind("click.fe_layer").bind("click.fe_layer",function(){
				$(".layerFocus").removeClass("layerFocus");
				$(this).parents(".posiArea").addClass("layerFocus");
				if(!$(this).hasClass("fe_noShow")){
					$(".popup:visible").hide();
				}
				if(options.animateFlag){
					$layer.stop(true,true).fadeIn(options.animateSpeed);
				}else if(method == "searchDetail"){
					if($(this).find(".closeArrow").length){
						$(this).find(".closeArrow").removeClass("closeArrow").addClass("openArrow");
						$layer.stop(true,true).slideDown(options.animateSpeed);
					}else{
						$layerClose.triggerHandler("click");
					}
				}else{
					if($(this).hasClass("fe_noShow")){
						//noShow
					}else{
						$layer.show();
					}
				}
				//layer媛� �ㅽ뵂�좊븣. �꾩옱 button text�� �쇱튂�섎뒗 tab text媛� �덉쓣寃쎌슦 triggerHandler click �몄텧
				/*
				var openerText = $.trim($opener.text());
				if($layer.find(".reSizeTab").length){
					$layer.find(".reSizeTab").find("a").each(function(i,o){
						if(openerText == $.trim($(o).text())){
							$(o).triggerHandler("click");
						}
					});
				}
				*/
				//data-defaulttab �쇰줈 珥덇린媛� 諛쏆븘���� �좏깮.
				if(typeof($layer.attr("data-defaulttab"))!="undefined"){
					$layer.find(".reSizeTab").find("a").eq($layer.attr("data-defaulttab")).triggerHandler("click");
				}

				return false;
			});

			$layerClose.unbind("click.fe_layer").bind("click.fe_layer",function(){
				if(options.animateFlag){
					$layer.stop(true,true).fadeOut(options.animateSpeed,function(){
						$opener.trigger("focus");
					});
				}else if(method == "searchDetail"){
					$layer.stop(true,true).slideUp(options.animateSpeed,function(){
						$opener.find(".openArrow").removeClass("openArrow").addClass("closeArrow");
						$opener.trigger("focus");
					});
				}else{
					$layer.hide();
					$opener.trigger("focus");
				}
				$(".layerFocus").removeClass("layerFocus");
				return false;
			});

			$layerOK.unbind("click.fe_layer").bind("click.fe_layer",function(){
				$layerClose.triggerHandler("click");
				return false;
			});

			$layerClose.unbind("keydown.fe_layer").bind("keydown.fe_layer",function(e){
				if(e.keyCode == 9 && !e.shiftKey){
					setTimeout(function(){
						$layer.hide();
					},1); //ie fixed
				}
			});

			$layer.unbind("keydown.fe_layer").bind("keydown.fe_layer",function(e){
				if(e.keyCode == 27){
					$layerClose.triggerHandler("click");
					return false;
				}
			});
		}else if(method == "center"){
			//$("body").append($layer);
			var layerWidth = options.layerWidth_Basic;
			if($layer.hasClass("wide")){
				layerWidth = options.layerWidth_Wide;
			}
			var layerHeight = $layer.outerHeight();
			$layer.css({"position":"fixed","top":"50%","left":"50%","margin-left":"-"+String(layerWidth/2)+"px","margin-top":"-"+String(layerHeight/2)+"px","z-index":options.layerZindex}).hide().css("visibility","visible");

			$layerClose.prepend($opener.text());

			$opener.unbind("click.fe_layer").bind("click.fe_layer",function(){
				$(".layerFocus").removeClass("layerFocus");
				$(this).parents(".posiArea").addClass("layerFocus");
				if(!$(this).hasClass("fe_noShow")){
					$(".popup:visible").hide();
				}

				$layer.find(">div[class^='layer_step']").each(function(i,o){
					if(i){
						$(o).hide();
					}else{
						$(o).show();
					}
				});

				if($layer.find(">div[class^='layer_step']").length){
					$layer.fe_layerFit();
				}

				if(options.animateFlag){
					if($(this).hasClass("fe_noShow")){
						//noShow
					}else{
						$layer.stop(true,true).fadeIn(options.animateSpeed);
					}
				}else{
					if($(this).hasClass("fe_noShow")){
						//noShow
					}else{
						$layer.show();
					}
				}
				if($layer.hasClass("fe_dim")){
					$dim = $("<dim />").css("opacity","0.3").addClass("dim");
					$layer.before($dim);
					$dim.unbind("click").bind("click",function(){
						$layerClose.triggerHandler("click");
					});
				}
				return false;
			});

			$layerClose.unbind("click.fe_layer").bind("click.fe_layer",function(){
				$layer.hide();
				$opener.trigger("focus");
				if($(".dim").length){
					$(".dim").remove();
				}
				return false;
			});

			$layerOK.unbind("click.fe_layer").bind("click.fe_layer",function(){
				$layerClose.triggerHandler("click");
				return false;
			});

			$layerClose.unbind("keydown.fe_layer").bind("keydown.fe_layer",function(e){
				if(e.keyCode == 9 && !e.shiftKey){
					setTimeout(function(){
						$layer.hide();
					},1);	//ie fixed
				}
			});

			$layer.unbind("keydown.fe_layer").bind("keydown.fe_layer",function(e){
				if(e.keyCode == 27){
					$layerClose.triggerHandler("click");
					return false;
				}
			});
		}else if(method == "popup"){

			var popupCount = options.popupCount;

			options.popupCount++;
			$.fn.fe_layer.defaults = $.extend({}, $.fn.fe_layer.defaults, {"accordionCount":options.popupCount});

			$opener.unbind("click.fe_layer").bind("click.fe_layer",function(){
				if($(this).hasClass("fe_ieonly") && !$.browser.msie){
					var alertMsg = "�명꽣�� �듭뒪�뚮줈��(IE) 釉뚮씪�곗��먯꽌留� �뺤씤媛��ν빀�덈떎.";
					if(typeof($(this).attr("data-title"))!="undefined"){
						alertMsg = $(this).attr("data-title")+" "+alertMsg;
					}
					alert(alertMsg);
					return false;
				}

				if(typeof($(this).attr("data-width"))!="undefined"){
					var popupW = $opener.attr("data-width");
					var popupH = $opener.attr("data-height");
					var popupL = Math.ceil((window.screen.width - popupW)/2);
					var popupT = Math.ceil((window.screen.height - popupH)/2);

					var scrollbars = "auto";
					if (popupW == "700" || popupW == "874"){
						scrollbars = "yes";
					}
					if(popupW == "680"){
						scrollbars = "no";
					}
					if($(this).find(".fe_facebook").length){
						if(typeof(goFacebookPosting) == "function"){
							 goFacebookPosting();
							 return false;
						}else{
							$(this).attr("href","http://www.facebook.com/sharer.php?u="+document.location.href);
							scrollbars = "no";
						}
					}else if($(this).find(".fe_twitter").length){
						if(typeof(goTwitterPosting) == "function"){
							 goTwitterPosting();
							 return false;
						}else{
							$(this).attr("href","http://twitter.com/share?text="+encodeURI(document.title)+"&url="+encodeURI(document.location.href));
							scrollbars = "no";
						}
					}

					if($("#content").hasClass("popupAlign")){
						var $popup = window.open($opener.attr("href"),'popupLayer_inPopup_'+popupCount,'width=' +popupW+', height=' +popupH+', top=' +popupT+', left=' +popupL+', toolbar=no, location=no, status=no, menubar=no, scrollbars='+scrollbars+', resizable=no');
					}else{
						var $popup = window.open($opener.attr("href"),'popupLayer_'+popupCount,'width=' +popupW+', height=' +popupH+', top=' +popupT+', left=' +popupL+', toolbar=no, location=no, status=no, menubar=no, scrollbars='+scrollbars+', resizable=no');
					}

					return false;
				}else{
					return true;
				}
			});

		}
	};

	$.fn.fe_layerFit = function(method){
		var options = $.extend({}, $.fn.fe_layer.defaults, options);
		var $opener = $(this);
		var layerWidth = options.layerWidth_Basic;
		if($(this).hasClass("wide")){
			layerWidth = options.layerWidth_Wide;
		}
		var layerHeight = $(this).outerHeight();
		$(this).css({"position":"fixed","top":"50%","left":"50%","margin-left":"-"+String(layerWidth/2)+"px","margin-top":"-"+String(layerHeight/2)+"px","z-index":options.layerZindex});
	};

	$.fn.fe_layer.defaults = {
		layerZindex : 200,
		layerWidth_Basic : 410,
		layerWidth_Wide : 640,
		animateFlag : false,
		animateSpeed : 500,
		popupCount : 0

	};
/* ***************** fe_layer END********************** */

/* ***************** fe_extraViewTab ********************** */
	$.fn.fe_extraViewTab = function(){
		var options = $.extend({}, $.fn.fe_extraViewTab.defaults, options);
		var $wrap = $(this);
		//2媛� 怨좎젙.
		var $opener1 = $wrap.find(".extraItem a").eq(0);
		var $opener2 = $wrap.find(".extraItem a").eq(1);
		var $tgArea1 = $($opener1.attr("href"));
		var $tgArea2 = $($opener2.attr("href"));
		var opener1Text = $opener1.html();
		var opener2Text = $opener2.html();

		if(options.ariaFlag){
			$opener2.attr("aria-live","assertive");
		}

		$opener1.remove();
		$tgArea2.hide();

		var basicFlag = true;

		$opener2.bind("click",function(){
			if(basicFlag){
				//湲곕낯蹂닿린
				$tgArea1.hide();
				$tgArea2.show();
				$opener2.html(opener1Text);
				basicFlag = false;
			}else{
				$tgArea2.hide();
				$tgArea1.show();
				$opener2.html(opener2Text);
				basicFlag = true;
			}
			return false;
		});
	};

	// fe_extraViewTab option default  珥덇린媛�
	$.fn.fe_extraViewTab.defaults = {
		ariaFlag : true
	};
/* ***************** fe_extraViewTab ********************** */

/* ***************** fe_footerSiteBtn ********************** */
	$.fn.fe_footerSiteBtn = function(){
		var $wrap = $(this);
		var $siteBtnArea = $wrap.find(".siteBtn");

		$siteBtnArea.each(function(i,o){
			var $opener = $(o).find(">a.defaultLink");
			var $siteArea = $(o).find(">div.gotoSite");
			$opener.attr("href","#fe_familysite_"+i);
			$siteArea.attr("id","fe_familysite_"+i);
			$(o).bind("mouseenter",function(){
				$(this).addClass("atv");
			});
			$(o).bind("mouseleave",function(){
				$(this).removeClass("atv");
			});
			$opener.bind("focus",function(){
				$(this).parents(".siteBtn").addClass("atv");
			});
			$opener.bind("keydown",function(e){
				if(e.keyCode == 9 && e.shiftKey){
					$(o).removeClass("atv");
				}
			});
			$siteArea.find("a:last").bind("keydown",function(e){
				if(e.keyCode == 9 && !e.shiftKey){
					$(o).removeClass("atv");
				}
			});
		});

	};
/* ***************** fe_footerSiteBtn END ********************** */

/* ***************** fe_dropdown ********************** */
	$.fn.fe_dropdown = function(){

		var options = $.extend({}, $.fn.fe_dropdown.defaults, options);

		var $wrap = $(this).parent();
		var $opener = $(this);
		var $tgArea = $opener.next(".dropDownOpen");
		var $screenout = $("<span />").addClass("screenout").text("�닿린");
		$opener.append($screenout);

		options.dropdownCount++;
		$.fn.fe_dropdown.defaults = $.extend({}, $.fn.fe_dropdown.defaults, {"dropdownCount":options.dropdownCount});

		$opener.attr("href","#fe_dropdown_"+options.dropdownCount);
		$tgArea.attr("id","fe_dropdown_"+options.dropdownCount).hide();

		$opener.bind("click",function(){
			if($tgArea.is(":visible")){
				if(options.animateFlag){
					$tgArea.stop(true,true).slideUp(options.animateSpeed,function(){
						$wrap.removeClass("dropDownBtn");
						$screenout.text("�닿린")
						$opener.removeClass("atv");
					});
				}else{
					$tgArea.hide();
					$wrap.removeClass("dropDownBtn");
					$(this).removeClass("atv");
					$screenout.text("�닿린")
				}
			}else{
				if($(".dropDownOpen:visible").length){
					$("a[href='#"+$(".dropDownOpen:visible").attr("id")+"']").triggerHandler("click");
				}
				if(options.animateFlag){
					$wrap.addClass("dropDownBtn");
					$opener.addClass("atv");
					$screenout.text("�リ린")
					$tgArea.stop(true,true).slideDown(options.animateSpeed);
				}else{
					$wrap.addClass("dropDownBtn");
					$(this).addClass("atv");
					$screenout.text("�リ린")
					$tgArea.show()
				};
			}
			return false;
		});

	};


	$.fn.fe_dropdown.defaults = {
		dropdownCount : 0,

		animateFlag : true,
		animateSpeed : 400
	};
/* ***************** fe_dropdown END ********************** */

/* ***************** fe_refit ********************** */
	$.fn.fe_refit = function(){
		var $wrap = $(this);
		var type;
		if($wrap.hasClass("popup")){
			type = "layer";
		}

		if(type == "layer"){
				var layerHeight = $wrap.outerHeight();
			if(!$wrap.is(":visible")){
				$wrap.show();
				layerHeight = $wrap.outerHeight();
				$wrap.hide();
			}
			$wrap.css("margin-top","-"+String(layerHeight/2)+"px");
		}
	};
/* ***************** fe_refit END ********************** */

/* ***************** fe_btnToggle ********************** */
	$.fn.fe_btnToggle = function(){
		var $wrap = $(this);

		$wrap.prepend("<span class='screenout'>珥덉꽦寃��됱쁺�� �쒖옉</span>");
		$wrap.append("<span class='screenout'>珥덉꽦寃��됱쁺�� ��</span>");

		$wrap.find("a.consonant, a.consonantEng").bind("click",function(){
			$wrap.find("a.consonant.on, a.consonantEng.on").removeClass("on");
			$(this).addClass("on");
			return false;
		});
		$wrap.find("a.consonantAll").bind("click",function(){
			$wrap.find("a.consonant.on, a.consonantEng.on").removeClass("on");
			return false;
		});

	};
/* ***************** fe_btnToggle END ********************** */

/* ***************** fe_serviceHourToggle ********************** */
	$.fn.fe_serviceHourToggle = function(){
		var $wrap = $(this);
		var $trigger = $wrap.find(">a").eq(0);
		var $content = $wrap.find(".openService");

		//sensereader a tag�� span怨� img alt媛� 媛숈씠 紐살씫�� 踰꾧렇 hot fix
		var tempText = $trigger.find("img").attr("alt");
		$trigger.find("img").attr("alt",tempText+" �쇱튂湲�");

		$wrap.removeClass("open").addClass("close");
		$content.hide();

		$trigger.attr("href","#fe_serviceHourContent");
		$content.attr("id","fe_serviceHourContent");

		$trigger.attr("aria-live","assertive");

		$trigger.bind("click",function(){
			if($wrap.hasClass("close")){
				$wrap.removeClass("close").addClass("open");
				$content.stop(true,true).slideDown(300);
					$trigger.find("img").attr("alt",tempText+" �묎린");
			}else{
				$content.stop(true,true).slideUp(300,function(){
					$wrap.removeClass("open").addClass("close");
					$trigger.find("img").attr("alt",tempText+" �쇱튂湲�");
				});
			}
			return false;
		});
	};
/* ***************** fe_serviceHourToggle END ********************** */

/* ***************** fe_elsdlsCalendar ********************** */
	$.fn.fe_elsdlsCalendar = function(){
		var options = $.extend({}, $.fn.fe_elsdlsCalendar.defaults, options);
		var $wrap = $(this);
		var $ymdArea = $wrap.find(".module.ymd").parent();

		var $selectY = $ymdArea.find("select:eq(0)");
		var $selectM = $ymdArea.find("select:eq(1)");

		var nowY = $selectY.val();
		var nowM = $selectM.val();
		var nowDayCount; // �대떦�� 留덉�留됱씪
		var startDay; // �대떦�� 1�� �붿씪
		var totaltdCount; // td 移몄닔
		var totaltrCount;

		if($wrap.find(".calTable").length){
			return false;
		}

		var $calArea = $("<table />").addClass("calTable");
		$calArea.append("<caption>"+nowY+"�� "+nowM+"�� ELS(二쇨��곌퀎利앷텒) DLS(�뚯깮寃고빀利앷텒) �쇱젙�� �섑��� ��</caption><thead><tr><th scope='col'>��<span class='screenout'>�붿씪</span></th><th scope='col'>��<span class='screenout'>�붿씪</span></th><th scope='col'>��<span class='screenout'>�붿씪</span></th><th scope='col'>��<span class='screenout'>�붿씪</span></th><th scope='col'>紐�<span class='screenout'>�붿씪</span></th><th scope='col'>湲�<span class='screenout'>�붿씪</span></th><th scope='col'>��<span class='screenout'>�붿씪</span></th></tr></thead>");
		var $calbody = $("<tbody />");
		$calArea.append($calbody);
		$wrap.append($calArea);



		//�대쾲�ъ쓽 留덉�留� �좎쭨.
		var tempDate = new Date(nowY+"/"+nowM+"/01");
		startDay = tempDate.getDay();
		tempDate.setMonth(tempDate.getMonth() + 1);
		tempDate.setDate(0);
		nowDayCount = tempDate.getDate();	//�대쾲�� 留덉�留됱씪
		totaltdCount = startDay + nowDayCount + 7 -( (startDay + nowDayCount)%7 );
		if ( (startDay + nowDayCount)%7 ==0)	{
			totaltdCount = startDay + nowDayCount;
		}
		totaltrCount = totaltdCount/7;
		for(var i=0;i<totaltrCount;i++){
			var $tr = $("<tr />");
			for(var j=0;j<7;j++){
				$tr.append("<td><div style=\"position:relative\"><div><em></em></div></div></td>");
			}
			$calbody.append($tr);
		}

		$calbody.find("tr").each(function(i,o){
			$(o).find("td:first").addClass("sunday");
			$(o).find("td:last").addClass("saturday");
		});
		$calbody.find("em").each(function(i,o){
			var nowDay = i-startDay+1;
			if(nowDay > 0 && nowDay <= nowDayCount){
				if(nowDay<10){
					nowDay = "0"+String(nowDay);
				}
				$(o).text(nowDay);
				$(o).parents("td").addClass("day_"+nowDay);
			}
		});

		$wrap.find(".attachLayer").each(function(i,o){
			var emText = $(o).find("em").text();
			var type = emText.split("/")[0].toLowerCase();
			var startDay = emText.split("/")[1];
			var endDay = emText.split("/")[2];

			var startPeriodBar = $(o).find(".periodBar");
			var endPeriodBar = $("<div />").addClass("periodBar end").addClass(type);
			endPeriodBar.append("<span class=\"screenout\">"+type.toUpperCase()+" �쇱젙 醫낅즺("+nowY+"�� "+String(Number(nowM))+"�� "+String(Number(startDay))+"�쇰��� "+nowY+"�� "+String(Number(nowM))+"�� "+String(Number(endDay))+"�쇨퉴吏�)</span>")
			$calArea.find(".day_"+startDay).find("em").parent().append(startPeriodBar);
			$(o).remove();

			for(var i = Number(startDay);i<=Number(endDay);i++){
				if(i==Number(startDay)){
					$calArea.find(".day_"+startDay).find("em").parent().append(startPeriodBar);
				}else if(i==Number(endDay)){
					if(i<10){
						$calArea.find(".day_0"+i).find("em").parent().append(endPeriodBar);
					}else{
						$calArea.find(".day_"+i).find("em").parent().append(endPeriodBar);
					}
				}else{
					if(i<10){
						$calArea.find(".day_0"+i).find("em").parent().append("<div class=\"periodBar center "+type+"\"><span class=\"screenout\">"+type.toUpperCase()+" �쇱젙 �덉쓬("+nowY+"�� "+String(Number(nowM))+"�� "+String(Number(startDay))+"�쇰��� "+nowY+"�� "+String(Number(nowM))+"�� "+String(Number(endDay))+"�쇨퉴吏�)</span></div>");
					}else{
						$calArea.find(".day_"+i).find("em").parent().append("<div class=\"periodBar center "+type+"\"><span class=\"screenout\">"+type.toUpperCase()+" �쇱젙 �덉쓬("+nowY+"�� "+String(Number(nowM))+"�� "+String(Number(startDay))+"�쇰��� "+nowY+"�� "+String(Number(nowM))+"�� "+String(Number(endDay))+"�쇨퉴吏�)</span></div>");
					}
				}

			}
		});
	}

	$.fn.fe_elsdlsCalendar.defaults = {
		weekStrArray : ["��","��","��","��","紐�","湲�","��"]
	};
/* ***************** fe_elsdlsCalendar END ********************** */

/* ***************** fe_keyVisualRolling ********************** */
	$.fn.fe_keyVisualRolling = function(options){
		var options = $.extend({}, $.fn.fe_keyVisualRolling.defaults, options);
		var $wrap = $(this);
		var nowAutoRoll = false;
		var slide = "";
		var rollTimer;
		var $controller = $wrap.find(".subController");
		var $autoPlayBtn = $controller.find("a.fe_autoplay");
		var $content = $wrap.find(".visualDefault");
		var contentW = Number($content.eq(0).width());

		$wrap.addClass("fe_rolling");

		function rollStart(){
			$autoPlayBtn.find("img").attr("src",$autoPlayBtn.find("img").attr("src").replace("_play.png","_stop.png")).attr("alt","�ㅻ퉬伊ъ뼹 �먮룞 �꾪솚 硫덉땄");
			rollTimer = setInterval(rollAction, options.autoRollingSpeed);
			nowAutoRoll = true;
		}

		function rollAction(){
			var AllCount = $content.length;
			if(nowIndex >= AllCount-1){
				slide = "fixed";
				$pagingArea.find("li").eq(0).triggerHandler("click");
			}else{
				$pagingArea.find("li").eq(nowIndex+1).triggerHandler("click");
			}
		}

		function rollStop(){
			if(options.autoRollingFlag){
				$autoPlayBtn.find("img").attr("src",$autoPlayBtn.find("img").attr("src").replace("_stop.png","_play.png")).attr("alt","�ㅻ퉬伊ъ뼹 �먮룞 �꾪솚 �ъ깮");
				clearInterval(rollTimer);
				nowAutoRoll = false;
			}
		}

		if($content.length >1){
			var nowIndex = 0;
			var $pagingArea = $("<ul />").addClass("button alignL rolling");
			$wrap.find(".subController").show().append($pagingArea);
			$content.each(function(i,o){
				if(i){
					var $page = $("<li />").append($("<img />",{"src":options.imgOff,"alt":""}));
					//$(o).css("z-index","10").css("opacity","0.01");
					$(o).css("left",String(1*contentW)+"px");
				}else{
					$wrap.height($(o).height()).css("overflow","hidden");
					var $page = $("<li />").append($("<img />",{"src":options.imgOn,"alt":""}));
					$(o).css("left","0px");
					//$(o).css("z-index","20").addClass("fe_atv").css("opacity","1");
				}
				$(o).addClass("fe_content").attr("data-index",i).show()	;
				$pagingArea.append($page);
				$page.unbind("click.fe_keyVisualRolling").bind("click.fe_keyVisualRolling",function(){
					if(i != nowIndex){
						$content.stop(true,true);
						if(i > nowIndex){
							$content.eq(nowIndex).css("left","0px").animate({"left":"-"+contentW+"px"},{duration:options.animateSpeed, easing: "easeInOutQuad"},function(){

							});
							$content.eq(i).css("left",contentW+"px").animate({"left":"0px"},{duration:options.animateSpeed, easing: "easeInOutQuad"},function(){

							});
						}else{
							if(slide == "fixed"){
								$content.eq(nowIndex).css("left","0px").animate({"left":"-"+contentW+"px"},{duration:options.animateSpeed, easing: "easeInOutQuad"},function(){

								});
								$content.eq(i).css("left",contentW+"px").animate({"left":"0px"},{duration:options.animateSpeed, easing: "easeInOutQuad"},function(){

								});
								slide = "";
							}else{
								$content.eq(nowIndex).css("left","0px").animate({"left":contentW+"px"},{duration:options.animateSpeed, easing: "easeInOutQuad"},function(){

								});
								$content.eq(i).css("left","-"+contentW+"px").animate({"left":"0px"},{duration:options.animateSpeed, easing: "easeInOutQuad"},function(){

								});
							}
						}
						$pagingArea.find("img[src='"+options.imgOn+"']").attr("src",options.imgOff);
						$(this).find("img").attr("src",options.imgOn);
						nowIndex = i;
						if(nowAutoRoll){
							rollStop();
							rollStart();
						}

					}
					return false;
				});
			});
			$content.find("a").unbind("focusin.fe_keyVisualRolling").bind("focusin.fe_keyVisualRolling",function(){
				if(nowIndex != $(this).parents(".fe_content").attr("data-index")){
					$pagingArea.find("li").eq($(this).parents(".fe_content").attr("data-index")).triggerHandler("click");
					$wrap.find(".fe_content").stop(true,true);
				}
				rollStop();
			});

			$autoPlayBtn.bind("click",function(){
				if(nowAutoRoll){
					rollStop();
				}else{
					rollStart();
				}

			});

			if(options.autoRollingFlag){
				rollStart();
				nowAutoRoll = true;
			}
		}
	};


	// fe_keyVisualRolling Defaults
	$.fn.fe_keyVisualRolling.defaults = {
		imgOn : "/tfimages/renewal/main/btn_box_banner_atv.png",
		imgOff : "/tfimages/renewal/main/btn_box_banner.png",

		autoRollingFlag : true,
		autoRollingSpeed : 5000,

		animateFlag : true,
		animateType : "slide",
		animateSpeed : 1300
	};
/* ***************** fe_keyVisualRolling END ********************** */

/* ***************** fe_shortCutRolling ********************** */
	$.fn.fe_shortCutRolling = function(options){
		var options = $.extend({}, $.fn.fe_shortCutRolling.defaults, options);
		var $wrap = $(this);
		var nowAutoRoll = false;

		var $content = $wrap.find(">div");
		if($content.length >1){
			var nowIndex = 0;
			var $pagingArea = $("<ul />").addClass("paging");
			$wrap.prepend($pagingArea);
			$content.each(function(i,o){
				var contentW = $(o).width();
				//var contentH = $(o).height();
				if(i){
					var $page = $("<li />").append($("<img />",{"src":options.imgOff,"alt":""}));
					$(o).css("z-index","10").css("opacity","0.01");
				}else{
					var $page = $("<li />").append($("<img />",{"src":options.imgOn,"alt":""}));
					$(o).css("z-index","20").addClass("fe_atv").css("opacity","1");
				}
				$(o).addClass("fe_content").attr("data-index",i).css("position","absolute").width(contentW);
				$pagingArea.append($page);

				$page.unbind("click.fe_shortCutRolling").bind("click.fe_shortCutRolling",function(){
					if(i != nowIndex){
						if(options.animateFlag){
							if(options.animateType == "fade"){
								$wrap.find(">div.fe_atv").removeClass("fe_atv").stop(true,true).animate({"opacity":"0.01"},options.animateSpeed,function(){
									$(this).css("z-index","10");
								});
								$(o).addClass("fe_atv").stop(true,true).animate({"opacity":"1"},options.animateSpeed,function(){
									$(this).css("z-index","20");
								});
							}
						}else{
							$wrap.find(">div.fe_atv").removeClass("fe_atv").css("opacity","0.01").css("z-index","10");
							$(o).addClass("fe_atv").css("opacity","1").css("z-index","20");
						}

						$pagingArea.find("img[src='"+options.imgOn+"']").attr("src",options.imgOff);
						$(this).find("img").attr("src",options.imgOn);
						nowIndex = i;
					}
					return false;
				});
			});

			$wrap.find("a").unbind("focusin.fe_shortCutRolling").bind("focusin.fe_shortCutRolling",function(){
				if(nowIndex != $(this).parents(".fe_content").attr("data-index")){
					$pagingArea.find("li").eq($(this).parents(".fe_content").attr("data-index")).triggerHandler("click");
					$wrap.find(".fe_content").stop(true,true);
				}
				rollStop();
			});

			if(options.autoRollingFlag){
				var rollTimer = setInterval(rollAction, options.autoRollingSpeed);
				nowAutoRoll = true;
			}

			function rollAction(){
				var AllCount = $content.length;
				if(nowIndex >= AllCount-1){
					$pagingArea.find("li").eq(0).triggerHandler("click");
				}else{
					$pagingArea.find("li").eq(nowIndex+1).triggerHandler("click");
				}
			}

			function rollStop(){
				if(options.autoRollingFlag){
					clearInterval(rollTimer);
					nowAutoRoll = false;
				}
			}



		}


	};


	// fe_shortCutRolling Defaults
	$.fn.fe_shortCutRolling.defaults = {
		imgOn : "/tfimages/renewal/common/btn_nav_shortCut_on.png",
		imgOff : "/tfimages/renewal/common/btn_nav_shortCut_off.png",

		autoRollingFlag : false,
		autoRollingSpeed : 5000,

		animateFlag : true,
		animateType : "fade",
		animateSpeed : 1300
	};
/* ***************** fe_rolling END ********************** */

/* ***************** fe_bankMyInfoToggle ********************** */
	var fe_bankMyInfoToggle = function(){
		var $bankMyInfoTrigger = $(".bankMyInfo .infoOpen").parent("a");
		var $bankMyInfoContent = $(".bankMyInfo.open");
		var $bankMyInfoClose = $bankMyInfoContent.find("img[src*='close_info.png']").parent("a");
		$bankMyInfoContent.prepend($("<span />").addClass("screenout").text("媛쒖씤�뺣낫 �곸뿭 �쒖옉"));
		$bankMyInfoContent.append($("<span />").addClass("screenout").text("媛쒖씤�뺣낫 �곸뿭 ��"));
		$bankMyInfoContent.hide();
		$bankMyInfoTrigger.bind("click",function(){
			if(!$bankMyInfoContent.is(":visible")){
				$bankMyInfoTrigger.parent(".bankMyInfo").hide();
				$bankMyInfoContent.slideDown(300);
			}
			return false;
		});
		$bankMyInfoClose.bind("click",function(){
			if($bankMyInfoContent.is(":visible")){
				$bankMyInfoTrigger.parent(".bankMyInfo").removeAttr("style").hide().slideDown(300);
				$bankMyInfoContent.slideUp(300,function(){
					$bankMyInfoTrigger.focus();
				});
			}
			return false;
		});
	};
/* ***************** fe_bankMyInfoToggle END ********************** */

/* ***************** fe_slideToggle ********************** */
	$.fn.fe_slideToggle = function(){
		var $wrap = $(this).parents(".comp");
		var $slideTrigger = $(this);
		var $slideContent = $wrap.find(".fe_slideBox");
		var $slideClose = $slideContent.find(".fe_slideClose");
		$slideContent.hide();
		$slideTrigger.bind("click",function(){
			if(!$slideContent.is(":visible")){
				$slideTrigger.parent().hide();
				$slideContent.slideDown(300);
			}
			return false;
		});
		$slideClose.bind("click",function(){
			if($slideContent.is(":visible")){
				$slideTrigger.parent().removeAttr("style").hide().slideDown(300);
				$slideContent.slideUp(300,function(){
					$slideTrigger.focus();
				});
			}
			return false;
		});
	};
/* ***************** fe_slideToggle END ********************** */

/* ***************** fe_customFund ********************** */
	$.fn.fe_customFund = function(options){
		var options = $.extend({}, $.fn.fe_customFund.defaults, options);
		var $wrap = $(this);
		var $selectTrigger = $wrap.find(".keywordBox").find("a");
		var $btnReset = $wrap.find("a.fe_reset");
		var $btnResetAll = $("#customFundSelectedBox").find("a.fe_reset");
		var $btnStart = $wrap.find("a.fe_goStep");
		var $pageStyle = $wrap.find(".fe_pageStyle");
		var nowStep = 0;
		var toStep = 0;
		var allStep = 0;
		var $stepArea = $wrap.find(".keywordBox");
		var $stepBtnArea = $wrap.find(".btnArea");
		var $stepDescArea = $wrap.find(".keywordDesc");
		var $customFundList = $("#customFundList");

		var $customFundSelectedBox = $wrap.next("#customFundSelectedBox");
		var $mySelectedArea = $customFundSelectedBox.find(".mySelected");

		for(var i=0;i<$stepArea.length;i++){
			$stepArea.eq(i).addClass("fe_step"+i);
			/*
			$stepBtnArea.eq(i);
			$stepDescArea.eq(i);
			*/
			if(i){
				$stepArea.eq(i).hide();
				$stepBtnArea.eq(i).hide();
				$stepDescArea.eq(i).hide();
				$stepArea.eq(i).find("a").each(function(j,p){
					$(p).attr("data-sequence",String(i-1)+"_"+String(j));
				});
			}else{
				$stepArea.eq(i).find("a").each(function(j,p){
					$(p).attr("data-value",j+1);
				});
			}
		}
		//fireFox td relative bug hot fixed.
		if((navigator.userAgent).toLowerCase().indexOf("firefox") > 0){
			$stepArea.each(function(i,o){
				$(o).find("a").each(function(j,p){
					$(p).addClass("fe_ffTagA"+String(j+1));
				});
			});
		}
		//珥덇린��
		setPageStyle();
		$customFundSelectedBox.hide();
		$customFundList.hide();
		$customFundSelectedBox.attr("tabindex","-1").css("outline","0");
		$selectTrigger.each(function(i,o){
			var $fe_title = $(this).parents("td").find(">div").eq(0);
			var $fe_desc = $(this).parents("td").find(">div").eq(1);
			var $screenoutText = $(this).find(".screenout");
			$fe_title.addClass("fe_title");
			$fe_desc.addClass("fe_desc").hide();
			$screenoutText.attr("aria-live","assertive");
		});

		//媛� ��ぉ �좏깮.
		$selectTrigger.unbind("click.fe_customFund").bind("click.fe_customFund",function(){
			if($(this).parents("td").hasClass("all")){
				//珥� 6媛�. �닿굅源뚯� 1媛�. �놁뼱吏덇굅 紐뉕컻.
				if(!$(this).parents(".keywordBox").hasClass("fe_step0")){
					if($wrap.find(".keywordBox:not(.fe_step0)").find("td.atv").length - $(this).parents(".keywordBox").find("td.atv").length + 1 > 6){
						alert("�닿� �좏깮�� 議곌굔�� 6媛쒓퉴吏�留� �ㅼ젙 媛��ν빀�덈떎.");
						return false;
					}
				}
				if($(this).parents("td").hasClass("atv")){
					$(this).parents("td").removeClass("atv");
				}else{
					$(this).parents(".keywordBox").find("td.atv").find("a").each(function(i,o){
						$(o).triggerHandler("click");
					});
					$(this).parents("td").addClass("atv");
				}
				selectedWrite();
				return false;
			}else{
				$(this).parents(".keywordBox").find("td.all.atv").removeClass("atv");
				//�ㅼ젙��, 珥앸낫�� 異붽� filter 20130821
				if($(this).parents(".keywordBox ").hasClass("fe_step5") || $(this).parents(".keywordBox ").hasClass("fe_step6")){
					if($(this).parents(".keywordBox ").find(".atv:not(.all)").length-$(this).parent("td.atv").length){
						alert("蹂듭닔�좏깮�� 吏��먰븯吏� �딆뒿�덈떎. �섎굹�� 議곌굔留� �좏깮�댁＜�몄슂.");
						return false;
					}
				}
			}


			var $screenout = $(this).find(".screenout");
			var screenoutText = $screenout.text();
			var $fe_title_img = $(this).parents("td").find(".fe_title").find("img");
			if($(this).parents("td").hasClass("atv")){
				if($fe_title_img.length && !$(this).parents(".keywordBox").hasClass("tendency")){
					$fe_title_img.attr("src",$fe_title_img.attr("src").replace("_atv.png",".png"));
				}
				$(this).parents("td").removeClass("atv")
				$screenout.text(screenoutText.replace(" �좏깮��",""));
				if($(this).parents(".keywordBox").hasClass("fe_step0")){
					var customSetNumber = $(this).attr("data-value");
					$stepArea.eq(customSetNumber).removeClass("fe_selected");
				}
			}else{
				if(!$(this).parents(".keywordBox").hasClass("fe_step0")){
					if($wrap.find(".keywordBox:not(.fe_step0)").find("td.atv").length +1 > 6){
						alert("�닿� �좏깮�� 議곌굔�� 6媛쒓퉴吏�留� �ㅼ젙 媛��ν빀�덈떎.");
						return false;
					}
				}
				if($fe_title_img.length && !$(this).parents(".keywordBox").hasClass("tendency")){
					$fe_title_img.attr("src",$fe_title_img.attr("src").replace(".png","_atv.png"));
				}
				$(this).parents("td").addClass("atv")
				$screenout.text(screenoutText+" �좏깮��");
				if($(this).parents(".keywordBox").hasClass("fe_step0")){
					var customSetNumber = $(this).attr("data-value");
					$stepArea.eq(customSetNumber).addClass("fe_selected")
				}
			}
			if($(this).parents(".keywordBox").hasClass("fe_step0")){
				var $keywordCount = $wrap.find(".fe_step0 .fe_keywordCount");
				var firstStep = $(this).parents(".fe_step0").find("td.atv:first").find("a").attr("data-value");
				var lastStep = $(this).parents(".fe_step0").find("td.atv:last").find("a").attr("data-value");
				$stepBtnArea.find("a").show();
				$stepBtnArea.eq(firstStep).find("a.fe_prev").hide();
				$stepBtnArea.eq(lastStep).find("a.fe_next").hide();
				$btnStart.attr("href","#fe_step"+firstStep);
				allStep = $(this).parents(".keywordBox").find("td.atv").length;
				setPageStyle();
				$keywordCount.text($(this).parents(".keywordBox").find("td.atv").length);
			}
			selectedWrite();

			return false;
		});

		//媛� ��ぉ mouseenter, foucsin
		$selectTrigger.unbind("mouseenter.fe_customFund, focusin.fe_customFund").bind("mouseenter.fe_customFund, focusin.fe_customFund",function(){
			var $fe_title = $(this).parents("td").find(".fe_title");
			var $fe_desc = $(this).parents("td").find(".fe_desc");
			$(this).parents("td").addClass("over");
			if($fe_desc.length){
				$fe_title.hide();
				$fe_desc.show();
			}

		});

		//媛� ��ぉ mouseleave, focusout
		$selectTrigger.unbind("mouseleave.fe_customFund, focusout.fe_customFund").bind("mouseleave.fe_customFund, focusout.fe_customFund",function(){
			var $fe_title = $(this).parents("td").find(".fe_title");
			var $fe_desc = $(this).parents("td").find(".fe_desc");
			$(this).parents("td").removeClass("over");
			if($fe_desc.length){
				$fe_desc.hide();
				$fe_title.show();
			}
		});

		if((navigator.userAgent).indexOf("iPad") > 0){
			//$selectTrigger.unbind("mouseenter.fe_customFund, focusin.fe_customFund, mouseleave.fe_customFund, focusout.fe_customFund");
		}

		//reset 踰꾪듉
		$btnReset.unbind("click.fe_customFund").bind("click.fe_customFund",function(){
			$selectTrigger.each(function(i,o){
				if($(o).parents("td").hasClass("atv")){
					$(o).triggerHandler("click");
					$(o).triggerHandler("mouseenter"); //�щ＼ 踰꾧렇 fixed
					$(o).triggerHandler("mouseleave");
				}
			});
			return false;
		});

		//reset 踰꾪듉
		$btnResetAll.unbind("click.fe_customFund").bind("click.fe_customFund",function(){
			if($("#customFundSelectedBox").find(".mySelected a.close").length){
				$("#customFundSelectedBox").find(".mySelected a.close").each(function(i,o){
					$(o).triggerHandler("click");
				});
			}
			nowStep = 0;
			goStep();
			$customFundList.hide();
			$btnReset.triggerHandler("click");
			$wrap.find(".fe_step0").attr("tabindex","-1").css("outline","0").focus();
			return false;
		});



		// page �몃뵒耳��댄꽣
		function setPageStyle(){
			allStep = $wrap.find(".keywordBox.fe_selected").length;
			if(nowStep == 0){
				$pageStyle.hide();
				return false;
			}
			var rtnStr = "<span class=\"textHighPoint\">"+nowStep+"</span>/"+allStep;
			$pageStyle.html(rtnStr).show();
		}

		//setp �대룞.

		$btnStart.unbind("click.fe_customFund").bind("click.fe_customFund",function(){
			if($wrap.find(".fe_step0").find("td.atv").length == 0){
				alert("愿��� �ㅼ썙�쒕� 1媛� �댁긽 �좏깮�섏꽭��");
				return false;
			}
			var targetStepId = $(this).attr("href");
			toStep = targetStepId.replace("#fe_step","");
			$stepArea.eq(toStep).show();
			$stepBtnArea.eq(toStep).show();
			$stepDescArea.eq(toStep).show();
			$stepArea.eq(nowStep).hide();
			$stepBtnArea.eq(nowStep).hide();
			$stepDescArea.eq(nowStep).hide();
			$customFundSelectedBox.show();
			nowStep = 1;
			setPageStyle();
			selectedWrite();
			$customFundList.show();
			//$("#customFund").css("overflow-y","scroll");
			return false;
		});
		/*
		$stepBtnArea.each(function(i,o){
			var $prevBtn = $(o).find("a").eq(0);
			var $nextBtn = $(o).find("a").eq(1);
		});
		*/

		function goStep(){
			$(wrap).find(".keywordBox.fe_selected:visible").next().hide();
			$(wrap).find(".keywordBox.fe_selected:visible").prev().hide();
			$(wrap).find(".keywordBox.fe_selected:visible").hide();
			if(nowStep == 0){
				$customFundSelectedBox.hide();
				$(wrap).find(".keywordBox.fe_step0").show();
				$(wrap).find(".keywordBox.fe_step0").next().show();
				$(wrap).find(".keywordBox.fe_step0").prev().show();
			}else{
				$customFundSelectedBox.show();
				$(wrap).find(".keywordBox.fe_selected").eq(nowStep-1).show();
				$(wrap).find(".keywordBox.fe_selected").eq(nowStep-1).next().show();
				$(wrap).find(".keywordBox.fe_selected").eq(nowStep-1).prev().show();
			}
			setPageStyle();
			selectedWrite();
			return false;
		}

		function selectedWrite(){
			var $filterCount = $wrap.find(".fe_filterCount");
			var $nowSelectTD = $wrap.find(".keywordBox:not(.fe_step0) td.atv");
			$filterCount.text($nowSelectTD.length);
			$mySelectedArea.find("li").empty().addClass("empty");
			$("#customFundForm").find("input[name^='filter']").val("");
			$nowSelectTD.each(function(i,o){
				var fe_sequence = $(o).find("a").attr("data-sequence");
				var fe_type = $wrap.find(".keywordBox.fe_step0").find(".fe_title").eq(fe_sequence.split("_")[0]).text();
				var fe_title = $(o).find(".fe_title").text();
				var $closeBtn = $("<a />",{"href":"#customRemove"+fe_sequence,"class":"close accText"}).text("�リ린");
				$mySelectedArea.find("li").eq(i).append($("<p />").addClass("condition").text(fe_type));
				$mySelectedArea.find("li").eq(i).append($("<p />").text(fe_title));
				$mySelectedArea.find("li").eq(i).append($closeBtn);
				$mySelectedArea.find("li").eq(i).removeClass("empty");
				$closeBtn.unbind("click.fe_customFund").bind("click.fe_customFund",function(){
					var fe_sequence = $(this).attr("href").replace("#customRemove","");
					$nowSelectTD.find("a[data-sequence='"+fe_sequence+"']").triggerHandler("click");
					$customFundSelectedBox.trigger("focus");
					return false;
				});
				$("#customFundForm").find("input[name='filter"+(i+1)+"']").val($(o).find("a").attr("data-filterstr"));
			});
		}

		$stepBtnArea.each(function(i,o){
			if(i){
				$(o).find("a").eq(0).unbind("click.fe_customFund").bind("click.fe_customFund",function(){
					nowStep--;
					goStep();
					return false;
				});
				$(o).find("a").eq(1).unbind("click.fe_customFund").bind("click.fe_customFund",function(){
					if($(this).parents(".btnArea").prev(".keywordBox").find("td.atv").length == 0){
						alert("�닿� 李얜뒗 ���� 寃��� 議곌굔�� 1媛� �댁긽 �좏깮�섏꽭��");
						return false;
					}
					nowStep++;
					goStep();
					return false;
				});
			}
		});

	};

	// fe_customFund Defaults
	$.fn.fe_customFund.defaults = {
	};
/* ***************** fe_customFund END ********************** */

/* ***************** customFundFit ********************** */
	$.fn.customFundFit = function(){
		var $wrap = $(this);
		var $dimmedWrap =  $("#customFundDimmed");
		var screenW = $dimmedWrap.width();
		var screenH = $dimmedWrap.height();

		var $popupLayer = $wrap.find(".popup.ultraWide");
		var $customTab01 = $wrap.find("#customFundTab01");
		var $customTab02 = $wrap.find("#customFundTab02");

		var wrapH = 730+13;
		var popupLayerH = 704+13;
		var customTabH = 642+13;



		var cutlineH = 782;
		var positionT = 47;
		var positionB = 5;

		//47.20
		if(screenH >= cutlineH){
			$wrap.height(wrapH);
			$popupLayer.height(popupLayerH);
			$customTab01.height(customTabH);
			$customTab02.height(customTabH);
		}else{
			var fixWrapH = screenH - positionT - positionB;
			var difH = wrapH - fixWrapH;

			$wrap.height(fixWrapH);
			$popupLayer.height(popupLayerH-difH);
			$customTab01.height(customTabH-difH);
			$customTab02.height(customTabH-difH);
		}
	};
/* ***************** customFundFit END ********************** */


	$.fn.fe_investCalendar = function(){
		var options = $.extend({}, $.fn.fe_investCalendar.defaults, options);
		var $wrap = $(this);
		var $ymdArea = $wrap.find(".module.ymd").parent();

		var $selectY = $ymdArea.find("select:eq(0)");
		var $selectM = $ymdArea.find("select:eq(1)");

		var nowY = $selectY.val();
		var nowM = $selectM.val();
		var nowDayCount; // �대떦�� 留덉�留됱씪
		var startDay; // �대떦�� 1�� �붿씪
		var totaltdCount; // td 移몄닔
		var totaltrCount;

		var $calArea = $("<table />").addClass("calTable");
		$calArea.append("<caption>"+nowY+"�� "+nowM+"�� �ъ옄罹섎┛�� �쇱젙�� �섑��� ��</caption><thead><tr><th scope='col'>��</th><th scope='col'>��</th><th scope='col'>��</th><th scope='col'>��</th><th scope='col'>紐�</th><th scope='col'>湲�</th><th scope='col'>��</th></tr></thead>");
		var $calbody = $("<tbody />");
		$calArea.append($calbody);
		$wrap.append($calArea);



		//�대쾲�ъ쓽 留덉�留� �좎쭨.
		var tempDate = new Date(nowY+"/"+nowM+"/01");
		startDay = tempDate.getDay();
		tempDate.setMonth(tempDate.getMonth() + 1);
		tempDate.setDate(0);
		nowDayCount = tempDate.getDate();	//�대쾲�� 留덉�留됱씪
		totaltdCount = startDay + nowDayCount + 7 -( (startDay + nowDayCount)%7 );
		if ( (startDay + nowDayCount)%7 ==0)	{
			totaltdCount = startDay + nowDayCount;
		}
		totaltrCount = totaltdCount/7;

		for(var i=0;i<totaltrCount;i++){
			var $tr = $("<tr />");
			for(var j=0;j<7;j++){
				$tr.append("<td><div><em></em></div></td>");
			}
			$calbody.append($tr);
		}

		$calbody.find("tr").each(function(i,o){
			$(o).find("td:first").addClass("sunday");
			$(o).find("td:last").addClass("saturday");
		});
		$calbody.find("em").each(function(i,o){
			var nowDay = i-startDay+1;
			if(nowDay > 0 && nowDay <= nowDayCount){
				if(nowDay<10){
					nowDay = "0"+String(nowDay);
				}
				$(o).text(nowDay);
				$(o).parents("td").addClass("day_"+nowDay);
			}
		});

		$wrap.find(".attachLayer").each(function(i,o){
			var day = $(o).find("em").text();
			var $ul = $(o).find("ul");
			$calArea.find(".day_"+day).addClass("scheDay");
			$calArea.find(".day_"+day).find("em").parent().append($ul);
			$(o).remove();
		});
	}

	$.fn.fe_investCalendar.defaults = {
		weekStrArray : ["��","��","��","��","紐�","湲�","��"]
	};




/* ***************** Addon Plugin Area ********************** */
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */
 var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },

    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },

    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";

    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }

    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    return ($.event.dispatch || $.event.handle).apply(this, args);
}
/* ***************** Addon Plugin Area END ********************** */

/* ***************** ready ********************** */

if(opener && opener !== window) {	//�앹뾽�덈룄�곗씪 寃쎌슦
	$(window).load(documentInit)
} else {
	$(document).ready(documentInit);
}

function documentInit(){

	//if(!jQuery.browser.msie){
		//jQuery("head").append('<link type="text/css" rel="stylesheet" href="/guide/script/css/fontface.css" />');
	//}

	if($("#bodyArea").find("h1 .screenout").length){
		var contentName = $("#bodyArea").find("h1").find(".screenout").text();
		$("#bodyArea").find("h1:first").html(contentName);
	}

	if($(".securityCard").length){	// temp hot fixed
		$(".securityCard").find(".number").remove();
	}

	if ( $(".calendarWap").length ) {
		if($('.calendarWap.ex').length) {
			return;
		}
		$(".calendarWap").each(function(i,o){
			if($(o).find('dual_calendar')) {
				$(o).fe_calendar({
					dualCalendar : true
				});
			} else {
				$(o).fe_calendar("init");
			}
		});
	}

	// 由щ돱�� 2021 start
	if ( $(".calendarWap2").length ) {
		$(".calendarWap2").each(function(i,o){
			$(o).fe_calendar2("init");
		});
	}
	// 由щ돱�� 2021 end


	if ( $(".module.ymd").length ) {
		$(".module.ymd").each(function(i,o){
			$(o).fe_moduleYMD("init");
		});
	}

	if($(".tooltip").length){
		$(".tooltip").each(function(i,o){
			$(o).fe_tooltip("init");
		});
	}

	if($("#rollingWrap .rolling").length){
		$("#rollingWrap .rolling").each(function(i,o){
			$(o).fe_rolling({
				rollingDirect : "updown",
				rollingAuto : false,
				rollingLoop : true
			});
		});
	}

	if($("#snb").find("ul.nav").length){
		$("#snb").find("ul.nav").fe_leftMenu();
	}

	if($("input.fe_Amount").length){
		$("input.fe_Amount").each(function(i,o){
			$(o).fe_setAmountModule();
		});
	}

	// 2021 由щ돱�� start
	if($("input.fe_Amount2").length){
		$("input.fe_Amount2").each(function(i,o){
			$(o).fe_setAmountModule2();
		});
	}
	// 2021 由щ돱�� end

	// 2022 由щ돱��
	if($("input.fe_Amount3").length){
		$("input.fe_Amount3").each(function(i,o){
			$(o).fe_setAmountModule3();
		});
	}

	if($(".reSizeTab, .Tab_type, .tabMenu").length){
		$(".reSizeTab, .Tab_type, .tabMenu").each(function(i,o){
			if($(o).find("a[href^='#']").length){
				if(!$(o).hasClass("anchor")){
					$(o).fe_switchTab()
				}
			}
		});
	}

	var $basicLayer = $("a .closeArrow, a img.helpLayer").filter(function(){
		if($(this).parents(".btnArea").next(".popup").length){
			return $(this);
		}
	});

	if($basicLayer.length){
		$basicLayer.each(function(i,o){
			//$(o).parents("a").fe_layer("basic");
		});
	}

	if($(".fundSearch a.btnDetailSearch").length){
		$(".fundSearch a.btnDetailSearch").fe_layer("searchDetail");
	}

	var $centerLayer = $("a .newWindow").filter(function(){
		if($(this).parents("a").attr("href").length && !$(this).parents("a").hasClass("customFundOpener")){
			return $(this);
		}
	});

	if($centerLayer.length){
		$centerLayer.each(function(i,o){
			$(o).parents("a").fe_layer("center");
		});
	}

	var $popupLayer = $("a .newWindow, a .print,a .fe_facebook, a .fe_twitter").filter(function(){
		if($(this).parents("a").attr("href") != "#"){
			if(!$(this).parents("a").attr("href").length){
				return $(this);
			}
		}
	});

	if($popupLayer.length){
		$popupLayer.each(function(i,o){
			$(o).parents("a").fe_layer("popup");
		});
	}


	if($(".extraView").length){
		$(".extraView").each(function(i,o){
			if($(o).find(".extraItem").length){
				$(o).fe_extraViewTab();
			}
		});
	}

	if($("a.dropDown").length){
		$("a.dropDown").each(function(i,o){
			$(o).fe_dropdown();
		});
	}

	if($(".roundBoxKnow .viewAll").length){
		$(".roundBoxKnow .viewAll").each(function(i,o){
			$(o).fe_accordion("init");
		});
	}

	function seachLines($elem) {

		var $mother = $elem.closest('.roundBoxKnow');

		$elem.children().each(function(i,e) {

			var $e = $(e),
				_height = $e.innerHeight(),
				_marT = Number($e.css('margin-top').replace(/[^\d]*/g,'')),
				_marB = Number($e.css('margin-bottom').replace(/[^\d]*/g,'')),
				_lineH = Number($e.css('line-height').replace(/[^\d]*/g,'')),
				lines = $mother.data('lines') || 0;

			if($e.is('P.title') || $e.css('display').indexOf('inline') >= 0) {
				return;
			}


			if($e.children().length > 0) {
				var childH = 0;
				$e.children().each(function(j,c){
					var $c = $(c);

					if($c.css('display').indexOf('inline') >= 0) {
						return;
					}
					childH += $c.innerHeight();
					childH += Number($c.css('margin-top').replace(/[^\d]*/g,''));
					childH += Number($c.css('margin-bottom').replace(/[^\d]*/g,''));
				});
				_height = _height-childH;
			}

			if(_height>0){

				lines = lines + (Math.ceil(_height/_lineH) > 0 ? Math.ceil(_height/_lineH) : 0);
				$mother.data('lines', lines);

				if(lines <= 5) {
					$mother.data('height', _height + Number(($mother.data('height')||0)) + (!$e.is('LI:first-child')? _marT + _marB : 0));

				} else if(lines - Math.ceil(_height/_lineH) < 5) {

					var _unit = Math.ceil(_height/_lineH) - (lines - 5);
					$mother.data('height', Number(($mother.data('height')||0)) + ((_height/Math.ceil(_height/_lineH))*_unit) + (!$e.is('LI:first-child')? _marT + _marB : 0));
				}
			}


			if($e.children().not('BR').length > 0) {
				if(lines - Math.ceil(_height/_lineH) < 5 && !$e.is('LI')) {
					$mother.data('height', Number(($mother.data('height')||0)) + _marT + _marB);
				}
				seachLines($e);

			}
		});
	}

	if($(".roundBoxKnow___________").length){
		$(".roundBoxKnow").each(function() {
			var $this = $(this),
				$round = $('.round', this),
				$listBasic = $('p.title+.listBasic, p.title+div>.listBasic', this),
				$wrap = $('<div></div>'),
				_height = $this.outerHeight(),
				//_maxHeight = $listBasic.find('UL').size() > 0 ? 92 : 100;
				lines = 0,
				_maxHeight = 0;

			if($this.find('.viewAll').size() > 0 || $this.hasClass('noMore')) {
				return;
			}

			if($this.find('.type_A_att_point_contents').size() > 0) {//�ъ슜�덈릺�� DIV.type_A_att_point_contents �쒓굅
				var $tmp = $this.find('.type_A_att_point_contents');
				$round.append($tmp.children());
				$tmp.remove();
			}

			seachLines($round);
			lines = $this.data('lines');
			_maxHeight = $this.data('height') + 25;



			if(lines > 8) {

				$wrap.append($round.children());
				$round.append($wrap);

				$wrap.css({
					'margin-bottom': '56px',
					'max-height': _height,
					'overflow-y': 'hidden'
				}).attr('data-covernote', 'covernote');
				//hideOver($listBasic);

				var $btn = $('<button type="button" class="ui-covernote btn-covernote" data-height="160" data-name="covernote"><span class="a11y-hidden">媛꾨떒�덈낫湲�</span></button>');

                $btn.css({
					'position' : 'absolute',
					'right' : 30,
					'bottom' : 30
				})
                $btn.toggle(function(){
                    console.log(1111111111);
                    $(this).find('span').text('�먯꽭�덈낫湲�');
					$(this).removeAttr('class').addClass('btnSm_more');
					$wrap.animate({'max-height': _maxHeight}, 500);
				},function() {
                     console.log(222222222);
                     $(this).find('span').text('媛꾨떒�덈낫湲�');
					$(this).removeAttr('class').addClass('btnSm_close');
					$wrap.animate({'max-height': _height}, 500);
				});

				$this.css('position', 'relative').find('.title').append($btn);
			}
		})

	}

	if($(".accordion").length){
		$(".accordion").each(function(i,o){
			$(o).fe_accordion("init");
		});
	}

	if($("#footer .siteBtnWrap").length){
		$("#footer .siteBtnWrap").fe_footerSiteBtn();
	}

	if($("#investCalendar").length){
		$("#investCalendar").fe_investCalendar();
	}

	if($("#elsdlsCalendar").length){
		$("#elsdlsCalendar").fe_elsdlsCalendar();
	}

	if($(".diction").length){
		$(".diction").each(function(i,o){
			$(o).fe_btnToggle();
		});
	}

	if($(".serviceHour.open").length){
		$(".serviceHour.open").each(function(i,o){
			$(o).fe_serviceHourToggle();
		});
	}

	if($(".bankMyInfo .infoOpen").length == 1){
		fe_bankMyInfoToggle();
	}

	if($("a.fe_slideToggle").length){
		$("a.fe_slideToggle").each(function(i,o){
			$(o).fe_slideToggle();
		});
	}

	if($("#content").find(".fiRolling").length){
		$("#content").find(".fiRolling").each(function(i,o){
			$(o).fe_keyVisualRolling();
		});
	}

	if($("#snb").find(".shortCut").length){
		$("#snb").find(".shortCut").each(function(i,o){
			$(o).fe_shortCutRolling();
		});
	}

	if($(".toolBoxWrap, .toolYieldWrap").length){
		$(".toolBoxWrap, .toolYieldWrap").each(function(i,o){
			$(o).fe_toolBox();
		});
	}


/* ***************** AS-IS Logic �곕룞 ********************** */
	//xecure function g live bind.
	$(document).on("click","a[data-xecure='Y']",function(e){
		if(typeof(g)=="function"){
			var link = $(this).attr("href");
			var secureFlag = $(this).attr("data-secure");
			g(link,secureFlag);
			//�ㅻⅨ attribute �뺤씤�좉쾬.
			return false;
		}
	});

	/*
	// as-is �꾩�留� �앹뾽
	if($("a.popHelp").length){
		if(typeof(launchHELP)=="function"){
			$("a.popHelp").bind("click",function(){
				launchHELP($(this).attr("href"),1,1);
				return false;
			});
		}
	}
	*/

	$(document).on("click","a.fe_openerlink",function(e){
		if(window.opener){
			window.opener.location.href = $(this).attr("href");
			self.close();
			return false;
		}else{
			window.open($(this).attr("href"));
			self.close();
			return false;
		}
	});
/* ***************** AS-IS Logic �곕룞 END ********************** */

	//keyboard acc
	$(".scrollX, .scrollY, .scrollXY, .fundSearch .detailBox ul").attr("tabindex","0");

	//�대� scroll�곸뿭�먯꽌 mousewheel scroll 媛뺤젣 �쒖뼱. navtive scroll x
	$(document).on("mousewheel",".scrollY,.scrollXY, .fundSearch .detailBox ul, #customFundTab01, #customFundTab02, #customFundDimmed",function(event, delta, deltaX, deltaY){
		try{
			if($(event.target).parents("#customFundDimmed").length || $(event.target).attr("id") == "customFundDimmed"){
				return false;
			}
			if($(event.target).hasClass("scrollY") || $(event.target).hasClass("scrollXY")){
				var $divScrollY = $(event.target);
			}else if($(event.target).parents(".scrollY").length){
				var $divScrollY = $(event.target).parents(".scrollY");
			}else if($(event.target).parents(".scrollXY").length){
				var $divScrollY = $(event.target).parents(".scrollXY");
			}else if($(event.target).parents(".detailBox").length){
				var $divScrollY = $(event.target).parents(".detailBox").find("ul");
			}else if($(event.target).parents("#customFundTab01").length){
				var $divScrollY = $(event.target).parents("#customFundTab01");
			}else if($(event.target).parents("#customFundTab02").length){
				var $divScrollY = $(event.target).parents("#customFundTab02");
			}
			var scrollHeight = $divScrollY.prop("scrollHeight");
			var totalHeight = $divScrollY.height()
			var scrollTop = $divScrollY.scrollTop();
			var paddingTop = Number($divScrollY.css("padding-top").replace("px",""));
			var paddingBottom = Number($divScrollY.css("padding-bottom").replace("px",""));

			var moveLen = 50;
			var tgTop = 0;

			if(delta > 0){
				//�꾨줈
				tgTop = scrollTop - moveLen;
				if(tgTop < 0){
					tgTop = 0;
				}
			}else if(delta < 0){
				//�꾨옒濡�
				tgTop = scrollTop + moveLen;
				if(tgTop > scrollHeight-(totalHeight-(paddingTop+paddingBottom))){
					tgTop = scrollHeight-(totalHeight-(paddingTop+paddingBottom));
				}
			}
			$divScrollY.scrollTop(tgTop);
			return false;
		}catch(e){
			return true;//ie�먯꽌 怨쇰룄�� scrolling�쇰줈 e 諛쒖깮 �좉꼍�� native scroll�숈옉.
		}
	});
	if($("#content").hasClass("popupAlign") || $("#content").hasClass("popupAlign2") || $("#content").hasClass("popupAlign3")){

		$("#content").find("a.yes").bind("click",function(){
			self.close();
		});
	}


	$("img[src*='btn_list_bank.png']").each(function(i,o){
		var $openerA = $(o).parents("a");
		var $openerInput = $(o).parents(".posiArea").prev().find("input");
		$openerInput.attr("readonly","readonly").css("cursor","pointer");
		$openerInput.bind("click",function(){
			$openerA.trigger("click");
			return false;
		});
	});

	if($(".fe_compareTrigger").length){
		//fe_compareInit();//AS-IS
		fe_compareInit_NEW(); //TO-BE
	}

	if($(".prodCompare").length){
		//fe_compareBoxWrite(); //AS-IS
		fe_compareBoxWrite_NEW(); //TO-BE
	}

	//Chrome Safari bug fixed(block level division inside table.)
	$("table.tableDefault .popup").show().hide();

	if($("#loginInfo").length){
		//$("#content").append($("#loginInfo"));
		$("body").prepend($("#loginInfo"));
	}

	/* customFund */
	if($(".customFundOpener").length){
		var customFundLink1 = $("input[name='customFundLink1']").val();
		var customFundLink2 = $("input[name='customFundLink2']").val();
		$(".customFundOpener").bind("click",function(){
			//opener �대┃��
			var $tempObj = $(this);
			$.post(
				customFundLink1,
				"",
				function(data) {
					fe_loading("show");
					$("#customFund").empty();
					$("#customFund").append(data);
					fe_loading("hide");
					$("#customFund").show();
					$("#customFundDimmed").css("opacity","0.3").show();
					if($("#customFundContent").length){
						$("#customFundContent").fe_customFund();
					}
					$("#customFund").find(".reSizeTab, .deSizeTab").fe_switchTab();
					$("#customFund").find("a.fe_customFundClose").bind("click",function(){
						$("#customFundDimmed").hide();
						$("#customFund").hide();
						return false;
					});
					fe_compareInit();
					fe_compareBoxWrite();
					$("#customFund").find("a[href='#customFundTab02']").bind("click",function(){
						//�섏㎏�� �대┃��.
						$.post(
							customFundLink2,
							"",
							function(data){
								$("#customFundTab02").empty();
								$("#customFundTab02").append(data);

								fe_compareInit();
								fe_compareBoxWrite();

								//IBM �붽뎄�ы빆 20130712
								if($("input[name='TYPE31']").length){
									if($("input[name='TYPE31']").val() == "MEDO"){
										if($("input[name='caller']").length){
											$("input[name='caller']").val("REPUR_NEW");
										}
									}
								}
							}
						);
						return false;
					});
					$("#customFund").customFundFit();
					if($tempObj.hasClass("fe_tab2")){
						$("#customFund").find("a[href='#customFundTab02']").triggerHandler("click");
					}
				}
			);
			return false;
		});
	}
	/* customFund */

	if((navigator.userAgent).indexOf("iPad") > 0){//iPad mode
		$("body").addClass("fe_iPad");
	}

	if($("input[type='password']").length){
		$("input[type='password']").each(function(i,o){
			$(o).attr("autocomplete","off")
		});
	}

	if($('.toggleLayer').length) {

		$('.toggleLayer').each(function(i,o) {
			var $container = $('.toggleLayerContainer', o).hide(),
				$toggleBtn = $('.btnAcc', o);

			$toggleBtn.off('click').on('click', function(e) {
				e.preventDefault();
				$(this).toggleClass('on');
				$container.toggle();
			});
		});


	}

	$(document).on('click',':checkbox[readonly="readonly"]',function() {
		setTimeout(function() {
			compUtil.mtl_refresh.checkbox();
		},10);
		return false;
	}).on('click', '[class^="tabType"] LI > A[href]', function(e) {
		var _href = $(this).attr('href');
		if(_href) {
			if(_href.indexOf('#') == 0 || _href.indexOf('javascript:') == 0) {
				return;
			}
			showProgressBar();
		}
	}).on('click','A[href="#none"],A[href="#"]',function(e) {
		e.preventDefault();
	}).on('click', 'A.goTop', function(e) {
		e.preventDefault();
		scrollTo(0,0);
	}).on('ready', function(){

		if($('#global_messageArea').length) {
			var $parentDIV = $('#global_messageArea').parent('DIV.comp'),
				$msgDIV = $('#global_messageArea');

			$('#content').append($msgDIV);	//�꾩튂 ���
			if($parentDIV.length && '' === $.trim($parentDIV.html())) {
				$parentDIV.remove();
			}
		}
		//$('#global_messageArea').parent('DIV.comp')
	});
};
/* ***************** ready END ********************** */


/* ***************** onLoad ********************** */
	$(window).load(function() {
		if($("#content").hasClass("popupAlign") || $("#content").hasClass("popupAlign2") || $("#content").hasClass("popupAlign3")){
			setTimeout(function(){
				popupFit();
			},100);
		}

		/* ***************** tablet mode ********************** */

			var $leftMenuTrigger = $("#leftMenuTrigger");
			var $snb = $("#snb");
			var $snbTriggerBar = $("#snbTriggerBar");

			var defaultHeight = $("#header").outerHeight() + $("#breadcrumbWrap").outerHeight();

			$leftMenuTrigger.bind("click",function(){
				if($snb.hasClass("boxShadow")){
					//�대젮�덉쓣��
					$snb.removeClass("ipad");
					$snb.stop(true,true).animate({"left":"-174px"},300,function(){
						$snb.removeClass("boxShadow");
					});
					$snbTriggerBar.stop(true,true).animate({"left":"-12px"},300,function(){
						$snbTriggerBar.removeClass("boxShadow");
					});
					$snbTriggerBar.find("img").attr("src",$snbTriggerBar.find("img").attr("src").replace("menu_atv.png","menu.png")).attr("alt","硫붾돱�붾낫湲� �닿린");
				}else{
					//�ロ��덉쓣��
					$snb.addClass("ipad");
					$snb.stop(true,true).css("left","-174px").animate({"left":"0px"},300,function(){
						$snb.addClass("boxShadow");
					});
					$snbTriggerBar.addClass("boxShadow");
					$snbTriggerBar.stop(true,true).css("left","-12px").animate({"left":"158px"},300,function(){
					});
					$snbTriggerBar.find("img").attr("src",$snbTriggerBar.find("img").attr("src").replace("menu.png","menu_atv.png")).attr("alt","硫붾돱�붾낫湲� �リ린");
				}
				return false;
			});

			if($leftMenuTrigger.is(":visible")){
				orientationBind();
				snbAutoTop();
			}

			function orientationBind(){
				$(window).unbind("scroll.onscroll").bind("scroll.onscroll",function(){
					snbAutoTop();
				});
			}

			function snbAutoTop(){
				if($leftMenuTrigger.is(":visible")){
					if((navigator.userAgent).indexOf("iPad") > 0){//iPad vertical view mode
						$("#customFund").css("zoom","92%");
						$("#customFund").css("margin-left","-406px");
					}
					var nowScrollTop = $("body").scrollTop();
					var defaultHeight = $("#header").outerHeight() + $("#breadcrumbWrap").outerHeight();
					var targetTop = defaultHeight-nowScrollTop;
					if(defaultHeight > nowScrollTop){
						if($snb.hasClass("fixed")){
							//�꾨옒�� �덈떎媛� �щ씪�щ븣
							//animate�댄썑 fixed �쒓굅
							/*
							$snb.stop(true,true).css("top","0px").removeClass("fixed").animate({"top":targetTop+"px"},300,function(){

							});
							$snbTriggerBar.stop(true,true).css("top","0px").removeClass("fixed").animate({"top":targetTop+"px"},300,function(){
								snbAutoHeight();
							});
							*/
							$snb.css("top",targetTop+"px").removeClass("fixed");
							$snbTriggerBar.css("top",(targetTop-3)+"px").removeClass("fixed");
							snbAutoHeight();
						}else{
							//�꾩뿉 �덈떎媛� 議곌툑 �대젮媛덈븣.
							//animate留�
							/*
							$snb.stop(true,true).animate({"top":targetTop+"px"},300,function(){

							});
							$snbTriggerBar.stop(true,true).animate({"top":targetTop+"px"},300,function(){
								snbAutoHeight();
							});
							*/
							$snb.css("top",targetTop+"px");
							$snbTriggerBar.css("top",(targetTop-3)+"px");
							snbAutoHeight();
						}
					}else{
						if($snb.hasClass("fixed")){
							//怨꾩냽 諛묒뿉�� �대룞.
							//議곗튂 �꾩슂 �놁쓬
						}else{
							//�꾩뿉�� �꾨옒濡� 彛덉슧 �대젮媛덈븣.
							//animate�� fixed異붽� �꾩슂.
							/*
							$snb.stop(true,true).animate({"top":"0px"},300,function(){
								$snb.addClass("fixed");
							});
							$snbTriggerBar.stop(true,true).animate({"top":"0px"},300,function(){
								$snbTriggerBar.addClass("fixed");
								snbAutoHeight();
							});
							*/
							$snb.css("top","0px").addClass("fixed");
							$snbTriggerBar.css("top","-3px").addClass("fixed");
							snbAutoHeight();
						}
					}
				}
			}

			function snbAutoHeight(){
				var clientHeight = document.documentElement.clientHeight;
				var nowScrollTop = $("body").scrollTop();
				var defaultHeight = $("#header").outerHeight() + $("#breadcrumbWrap").outerHeight();
				var difTop = defaultHeight-nowScrollTop;
				if(difTop < 0){
					difTop = 0;
				}
				$snb.height(clientHeight-difTop);
			}

			window.onorientationchange = window.onresize = window.onorientation = function(){
				if($leftMenuTrigger.is(":visible")){
					orientationBind();
					snbAutoTop();
				}else{;
					if((navigator.userAgent).indexOf("iPad") > 0){
						$("#customFund").css("zoom","1");
						$("#customFund").css("margin-left","-416px");
					}
					$snb.removeClass("ipad");
					$snb.removeAttr("style");
					$snb.removeClass("boxShadow")
					$snbTriggerBar.removeAttr("style");
					$snbTriggerBar.removeClass("boxShadow")
					$(window).unbind("scroll.onscroll");
				}
				if($("#customFundDimmed").is(":visible")){
					$("#customFund").customFundFit();
				}
			}
		/* ***************** tablet mode END ********************** */

	});
/* ***************** onLoad END ********************** */

/* ***************** animate Easing ********************** */
	$.easing['jswing'] = $.easing['swing'];
	$.extend( $.easing,
	{
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d) {
			//alert($.easing.default);
			return $.easing[$.easing.def](x, t, b, c, d);
		},
		easeInQuad: function (x, t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInCubic: function (x, t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOutCubic: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		easeInQuart: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		easeInQuint: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		easeInSine: function (x, t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOutSine: function (x, t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOutSine: function (x, t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeInExpo: function (x, t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (x, t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOutCirc: function (x, t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOutCirc: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		easeInElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		easeInBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		easeInBounce: function (x, t, b, c, d) {
			return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOutBounce: function (x, t, b, c, d) {
			if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
			return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	});
/* ***************** //animate Easing ********************** */
	$.fn.serializeObject = function (){
		var o = {},
			a = this.serializeArray();

		$.each(a, function() {
			if(o[this.name] !== undefined) {
				if(!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	}

})(jQuery);


/* ***************** normal function ********************** */
//popup Fit
function popupFit(){
	var w = jQuery(window), d = jQuery(document), b = jQuery('body');
	window.resizeBy(0, ((b.height() - w.height()) || d.height() - w.height())+50);
}

//鍮꾧탳�⑤떞湲� trigger Bind init
function fe_compareInit(){
	var $trigger = jQuery(".fe_compareTrigger");

	$trigger.each(function(i,o){
		var nowCookie = getCookie("fe_CompareBoxData");
		var fundSequence = jQuery(this).attr("data-sequence");
		jQuery(o).attr("aria-live","assertive");
		if(nowCookie.indexOf("|"+fundSequence+"|") >= 0){
			jQuery(o).attr("data-state","select");
			//jQuery(o).find("strong").text("�닿린痍⑥냼");
			jQuery(o).attr('title',"�닿린痍⑥냼");
			jQuery(o).attr("checked",true);
			compUtil.mtl_refresh.checkbox();
		}else{
			jQuery(o).attr("data-state","no");
			//jQuery(o).find("strong").text("鍮꾧탳�⑤떞湲�");
			jQuery(o).find("strong").text("鍮꾧탳�⑤떞湲�");
			jQuery(o).attr("checked",false);
			compUtil.mtl_refresh.checkbox();
		}
		if(jQuery(o).parents("#content").length){
			jQuery(o).attr("href","#fe_contentCompareBox00");
		}else if(jQuery(o).parents("#customFundTab01").length){
			jQuery(o).attr("href","#fe_contentCompareBox01");
		}else if(jQuery(o).parents("#customFundTab02").length){
			jQuery(o).attr("href","#fe_contentCompareBox02");
		}
	});

	$trigger.unbind("click.fe_compareBox").bind("click.fe_compareBox",function(){
		var fundName = jQuery(this).parents("tr").find(".fundTableLine, .tableL").find(".textEmp").text();
		if(jQuery(this).parents("tr").find(".name").length){
			fundName = jQuery(this).parents("tr").find(".name").text();
		}else if(jQuery(this).parents("li").find(".name").length){
			// card��
			fundName = jQuery(this).parents("li").find(".name").text();
		}
		fundName = fundName.trim();
		var fundSequence = jQuery(this).attr("data-sequence");
		var state = jQuery(this).attr("data-state");
		var nowCookie = getCookie("fe_CompareBoxData");
		if(state == "no"){
			if(nowCookie.indexOf("|"+fundSequence+"|") >= 0){
				alert("�대� 鍮꾧탳�⑥뿉 �댁� �곹뭹�낅땲��.");
				return false;
			}
			if(nowCookie.split(";").length > 3){
				alert("�곹뭹鍮꾧탳�� 理쒕� 3媛쒓퉴吏� 媛��ν빀�덈떎.");
				return false;
			}
			nowCookie = nowCookie + "|"+fundSequence+"|"+fundName+"|;";
			setCookieCompareBox("fe_CompareBoxData",nowCookie);

			var thisID = jQuery(this).attr('id').replace('_card','');
			var sameChk = jQuery('#'+thisID+', #'+thisID+'_card');

			sameChk.attr("data-state","select");
			sameChk.attr('title',"�닿린痍⑥냼");
			sameChk.attr("checked",true);
			sameChk.closest('label').addClass('checked');

			fe_compareBoxWrite();

			/*if(confirm("�대떦�곹뭹�� 鍮꾧탳�⑥뿉 �댁븯�듬땲��.\n鍮꾧탳�⑥쑝濡� �대룞�섏떆寃좎뒿�덇퉴?")){
				location.href = jQuery(this).attr("href");
			}*/
		}else{
			/*if(confirm("�대떦�곹뭹�� 鍮꾧탳�⑥뿉�� ��젣�섏떆寃좎뒿�덇퉴?")){*/
				nowCookie = nowCookie.replace("|"+fundSequence+"|"+fundName+"|;","");
				setCookieCompareBox("fe_CompareBoxData",nowCookie);

				var thisID = jQuery(this).attr('id').replace('_card','');
				var sameChk = jQuery('#'+thisID+', #'+thisID+'_card');

				sameChk.attr("data-state","no");
				sameChk.attr('title',"鍮꾧탳�⑤떞湲�");
				sameChk.attr("checked",false);
				sameChk.closest('label').removeClass('checked');

				fe_compareBoxWrite();

			/*}else{
				return false;
			}*/
		}
		return false;

	});

}

//鍮꾧탳�⑤떞湲� compareBox Write
function fe_compareBoxWrite(){
	var $compareBox = jQuery(".prodCompare");
	var nowCookie = getCookie("fe_CompareBoxData");
	if(typeof(nowCookie) == "undefined"){
		nowCookie = "";
	}
	$compareBox.each(function(i,o){
		if(jQuery(o).parents("#content").length){
			jQuery(o).parents(".comp").attr("id","fe_contentCompareBox00");;
		}else if(jQuery(o).parents("#customFundTab01").length){
			jQuery(o).parents(".comp").attr("id","fe_contentCompareBox01");
		}else if(jQuery(o).parents("#customFundTab02").length){
			jQuery(o).parents(".comp").attr("id","fe_contentCompareBox02");
		}

		jQuery(o).empty();
		jQuery(o).append(jQuery("<li />").addClass("empty").text('�곹뭹�좏깮 �� 鍮꾧탳媛���(3媛쒓퉴吏�)'));
		jQuery(o).append(jQuery("<li />").addClass("empty"));
		jQuery(o).append(jQuery("<li />").addClass("empty"));

		if(nowCookie!=""){
			jQuery(nowCookie.split(";")).each(function(j,p){
				if(p!=""){
					var $targetLi = jQuery(o).find("li").eq(j);

					$targetLi.removeClass("empty")
					$targetLi.html('<span class="txtElps" style="max-width:200px;display:inline-block;vertical-align:bottom;">'+p.split("|")[2]+'</span>');
					$targetLi.append($targetClose);

					if(jQuery(o).parents("#content").length){
						var $targetClose = jQuery("<a />",{"href":"#fe_contentCompareBox"}).addClass("marL10").html('<img src="/inc/img/common/x.png" alt="��젣">').attr("data-sequence",p.split("|")[1]);
					}else if(jQuery(o).parents("#customFundTab01").length){
						var $targetClose = jQuery("<a />",{"href":"#customFundTab01"}).addClass("marL10").html('<img src="/inc/img/common/x.png" alt="��젣">').attr("data-sequence",p.split("|")[1]);
					}else if(jQuery(o).parents("#customFundTab02").length){
						var $targetClose = jQuery("<a />",{"href":"#customFundTab02"}).addClass("marL10").html('<img src="/inc/img/common/x.png" alt="��젣">').attr("data-sequence",p.split("|")[1]);
					}

					$targetLi.removeClass("empty")
					$targetLi.html('<span class="txtElps" style="max-width:200px;display:inline-block;vertical-align:bottom;">'+p.split("|")[2]+'</span>');
					$targetLi.append($targetClose);

					try{
						$targetClose.unbind("click.fe_compareBox").bind("click.fe_compareBox",function(){
							/*if(confirm("�대떦�곹뭹��  鍮꾧탳�⑥뿉�� ��젣�섏떆寃좎뒿�덇퉴?")){*/
								//var fundName = jQuery(this).parents("li").find("p").text();
								var fundName = jQuery(this).parents("li").text();
								var fundSequence = jQuery(this).attr("data-sequence");
								var nowCookie = getCookie("fe_CompareBoxData");
								nowCookie = nowCookie.replace("|"+fundSequence+"|"+fundName+"|;","");
								setCookieCompareBox("fe_CompareBoxData",nowCookie);
								fe_compareBoxWrite();

								if(jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").length){
									jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").attr("data-state","no");
									jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").attr('title','鍮꾧탳�⑤떞湲�');
									jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").attr("checked",false);
									jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").closest('label').removeClass('checked');
								}
								return false;
							/*}else{
								return false;
							}*/
						});
					}catch(e){

					}
				}
			});
		}
	});

}

//鍮꾧탳�⑤떞湲� trigger Bind init
function fe_compareInit_NEW(){
	var $trigger = jQuery(".fe_compareTrigger");

	$trigger.each(function(i,o){
		var nowCookie = getCookie("fe_CompareBoxData");
		var fundSequence = jQuery(this).attr("data-sequence");
		jQuery(o).attr("aria-live","assertive");
		if(nowCookie.indexOf("|"+fundSequence+"|") >= 0){
			jQuery(o).attr("data-state","select");
			jQuery(o).attr('title',"�닿린痍⑥냼");
			jQuery(o).attr("checked",true);
			//jQuery(o).parent().addClass("checked");
			//compUtil.mtl_refresh.checkbox();
			//compUtil.mtl_refresh.listCheckbox();//�꾩껜 泥댄겕諛뺤뒪瑜� �뗮똿�섎뒗寃� �꾨땲�� �곹뭹紐⑸줉 �뚯씠釉붿쓽 泥댄겕諛뺤뒪留� �뗮똿�섎룄濡� �섏젙
		}else{
			jQuery(o).attr("data-state","no");
			jQuery(o).find("title").text("鍮꾧탳�⑤떞湲�");
			jQuery(o).attr("checked",false);
			//jQuery(o).parent().removeClass("checked");
			//compUtil.mtl_refresh.checkbox();
			//compUtil.mtl_refresh.listCheckbox();//�꾩껜 泥댄겕諛뺤뒪瑜� �뗮똿�섎뒗寃� �꾨땲�� �곹뭹紐⑸줉 �뚯씠釉붿쓽 泥댄겕諛뺤뒪留� �뗮똿�섎룄濡� �섏젙
		}
		if(jQuery(o).parents("#content").length){
			jQuery(o).attr("href","#fe_contentCompareBox00");
		}else if(jQuery(o).parents("#customFundTab01").length){
			jQuery(o).attr("href","#fe_contentCompareBox01");
		}else if(jQuery(o).parents("#customFundTab02").length){
			jQuery(o).attr("href","#fe_contentCompareBox02");
		}
	});

	$trigger.unbind("click.fe_compareBox").bind("click.fe_compareBox",function(){
		var fundName = jQuery(this).parents("tr").find(".fundTableLine, .tableL").find(".textEmp").text();
		if(jQuery(this).parents("tr").find(".name").length){
			fundName = jQuery(this).parents("tr").find(".name").text();
		}else if(jQuery(this).parents("li").find(".name").length){
			// card��
			fundName = jQuery(this).parents("li").find(".name").text();
		}
		fundName = fundName.trim();
		var fundSequence = jQuery(this).attr("data-sequence");
		var state = jQuery(this).attr("data-state");
		var nowCookie = getCookie("fe_CompareBoxData");

		if(state == "no"){
			if(nowCookie.indexOf("|"+fundSequence+"|") >= 0){
				alert("�대� 鍮꾧탳�⑥뿉 �댁� �곹뭹�낅땲��.");
				return false;
			}
			if(nowCookie.split(";").length > 3){
				alert("�곹뭹鍮꾧탳�� 理쒕� 3媛쒓퉴吏� 媛��ν빀�덈떎.");
				return false;
			}
			nowCookie = nowCookie + "|"+fundSequence+"|"+fundName+"|;";
			setCookieCompareBox("fe_CompareBoxData",nowCookie);

			var thisID = jQuery(this).attr('id').replace('_card','');
			var sameChk = jQuery('#'+thisID+', #'+thisID+'_card');

			sameChk.attr("data-state","select");
			sameChk.attr('title',"�닿린痍⑥냼");
			sameChk.prop("checked",true);
			//sameChk.closest('label').addClass('checked');

			fe_compareBoxWrite_NEW();

		}else{
			nowCookie = nowCookie.replace("|"+fundSequence+"|"+fundName+"|;","");
			setCookieCompareBox("fe_CompareBoxData",nowCookie);

			var thisID = jQuery(this).attr('id').replace('_card','');
			var sameChk = jQuery('#'+thisID+', #'+thisID+'_card');

			sameChk.attr("data-state","no");
			sameChk.attr('title',"鍮꾧탳�⑤떞湲�");
			sameChk.prop("checked",false);
			//sameChk.closest('label').removeClass('checked');

			fe_compareBoxWrite_NEW();
		}

		//return false;

	});
}

//鍮꾧탳�⑤떞湲� compareBox Write
function fe_compareBoxWrite_NEW(){
	var $compareBox = jQuery(".prodCompare");
	var nowCookie = getCookie("fe_CompareBoxData");
	if(typeof(nowCookie) == "undefined"){
		nowCookie = "";
	}

	//ESL/DLS�붾㈃�먯꽌�� 鍮꾧탳�� input�띿뒪�몃� �ㅻⅤ寃� �ъ슜�섍린 �꾪븳 援щ텇媛�
	var $compareGubun = jQuery(".prodCompare").attr("data-gubun");

	$compareBox.each(function(i,o){
		if(jQuery(o).parents("#content").length){
			jQuery(o).parents(".comp").attr("id","fe_contentCompareBox00");;
		}else if(jQuery(o).parents("#customFundTab01").length){
			jQuery(o).parents(".comp").attr("id","fe_contentCompareBox01");
		}else if(jQuery(o).parents("#customFundTab02").length){
			jQuery(o).parents(".comp").attr("id","fe_contentCompareBox02");
		}

		jQuery(o).empty();
		if( $compareGubun == 'edls' ){
			jQuery(o).append(jQuery('<span class="tit">理쒕� <em class="fColor">3媛�</em> �곹뭹鍮꾧탳 媛���</span>'));
			jQuery(o).append(jQuery('<div><input type="text" placeholder="�곹뭹�� �좏깮�댁＜�몄슂." title="�곹뭹 鍮꾧탳1" value="" readonly>'));
			jQuery(o).append(jQuery('<div><input type="text" placeholder="�곹뭹�� �좏깮�댁＜�몄슂." title="�곹뭹 鍮꾧탳2" value="" readonly>'));
			jQuery(o).append(jQuery('<div><input type="text" placeholder="�곹뭹�� �좏깮�댁＜�몄슂." title="�곹뭹 鍮꾧탳3" value="" readonly>'));
			jQuery(o).append(jQuery('<span class="cont_Box_btn">'));
			jQuery(o).append(jQuery('<button type="button" class="btn btn_blue btn_md disabled" id="compareBTN" onclick="doCompare(document.searchForm);return false;" target="_blank" >�곹뭹 鍮꾧탳�섍린</button>'));
			jQuery(o).append(jQuery('</span>'));
		}else{
			jQuery(o).append(jQuery('<span class="tit">理쒕� <em class="fColor">3媛�</em> �곹뭹鍮꾧탳 媛���</span>'));
			jQuery(o).append(jQuery('<div><input type="text" placeholder="���쒕� �좏깮�댁＜�몄슂." title="���쒖긽�� 鍮꾧탳1" value="" readonly>'));
			jQuery(o).append(jQuery('<div><input type="text" placeholder="���쒕� �좏깮�댁＜�몄슂." title="���쒖긽�� 鍮꾧탳2" value="" readonly>'));
			jQuery(o).append(jQuery('<div><input type="text" placeholder="���쒕� �좏깮�댁＜�몄슂." title="���쒖긽�� 鍮꾧탳3" value="" readonly>'));
			jQuery(o).append(jQuery('<span class="cont_Box_btn">'));
			jQuery(o).append(jQuery('<button type="button" class="btn btn_blue btn_md disabled" id="compareBTN" onclick="doCompare(document.searchForm);return false;" target="_blank" >���� 鍮꾧탳�섍린</button>'));
			jQuery(o).append(jQuery('</span>'));
		}

		if(nowCookie!=""){
			jQuery(nowCookie.split(";")).each(function(j,p){

				if(j >= 2){
					jQuery("#compareBTN").removeClass("disabled");
				}else{
					jQuery("#compareBTN").addClass("disabled");
				}

				if(p!=""){
					var $targetLi = jQuery(o).find("div").eq(j);

					$targetLi.find("input").val(p.split("|")[2]);
					$targetLi.append($targetClose);

					if(jQuery(o).parents("#content").length){
						var $targetClose = jQuery("<a />",{"href":"#fe_contentCompareBox"}).html('<button type="button" class="btn-inpclear"></button>').attr("data-sequence",p.split("|")[1]);

					}else if(jQuery(o).parents("#customFundTab01").length){
						var $targetClose = jQuery("<a />",{"href":"#customFundTab01"}).addClass("marL10").html('<button type="button" class="btn-inpclear"></button>').attr("data-sequence",p.split("|")[1]);
					}else if(jQuery(o).parents("#customFundTab02").length){
						var $targetClose = jQuery("<a />",{"href":"#customFundTab02"}).addClass("marL10").html('<button type="button" class="btn-inpclear"></button>').attr("data-sequence",p.split("|")[1]);
					}

					$targetLi.find("input").val(p.split("|")[2]);
					$targetLi.append($targetClose);

					try{
						$targetClose.unbind("click.fe_compareBox").bind("click.fe_compareBox",function(){
							/*if(confirm("�대떦�곹뭹��  鍮꾧탳�⑥뿉�� ��젣�섏떆寃좎뒿�덇퉴?")){*/
								//var fundName = jQuery(this).parents("li").find("p").text();
								//var fundName = jQuery(this).parents("li").text();
								var fundName = jQuery(this).parent().find("input").val();

								var fundSequence = jQuery(this).attr("data-sequence");
								var nowCookie = getCookie("fe_CompareBoxData");
								nowCookie = nowCookie.replace("|"+fundSequence+"|"+fundName+"|;","");
								setCookieCompareBox("fe_CompareBoxData",nowCookie);
								fe_compareBoxWrite_NEW();

								if(jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").length){
									jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").attr("data-state","no");
									jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").attr('title','鍮꾧탳�⑤떞湲�');
									jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").attr("checked",false);
									//jQuery(".fe_compareTrigger[data-sequence='"+fundSequence+"']").closest('label').removeClass('checked');
								}
								return false;
							/*}else{
								return false;
							}*/
						});
					}catch(e){

					}
				}
			});
		}
	});

}
//釉뚮씪�곗� �レ쓣�� 荑좏궎��젣
function setCookieCompareBox( name, value){
	document.cookie = name + "=" + escape( value ) + "; path=/;";
}

function fe_loading(state){

	if(parent && parent != this) {
		//parent.fe_loading(state);
		return;
	}
	if(state == "show"){
		var $loading = jQuery(".loading"),
			$img = $loading.find('IMG');

		// �섏쨷�� �대젮�쇳븿 吏�湲덉� 濡쒕뵫諛� �꾨뒗嫄� �덉쑝濡� 遊먯빞�댁꽌 二쇱꽍嫄몄뼱��.
		if($loading.is(':visible')) {
			return;
		}
		//jQuery('body').css("overflow-y", "hidden");

		var $dim = jQuery('<DIV id="loading_dimm"></DIV>').css({
		    'position': 'fixed',
		    'left': '0',
		    'top': '0',
		    'width': '100%',
		    'height': '100%',
		    'opacity': '0.3',
		    /*'background': '#000',*/
			/*'z-index' : (Number($loading.css('z-index')) - 1)*/
		    'z-index' : '9998'
		});

		$loading.show();
		window.progressAnimate = setInterval(function() {
			var $turn = $loading.children('IMG:visible:eq(0)').next();
			($turn.length > 0 ? $turn : $loading.children('IMG:eq(0)')).show().siblings('IMG').hide();
		},100);

		$dim.appendTo('BODY');

	}else if(state == "hide"){
		jQuery(".loading").hide();
		jQuery('#loading_dimm').remove();
		//jQuery('body').css("overflow-y", "");
		if(window.progressAnimate) {
			clearInterval(progressAnimate);
		}
	}
}
/* ***************** normal function END ********************** */

//�꾩떆
function getCookie( name ){
	var boardType="";
	if(name==1){
		boardType="BOARD_TYPE1";
	}else if(name==2){
		boardType="BOARD_TYPE2";
	}else if(name==3){
		boardType="BOARD_TYPE3";
	}else{
		boardType=name;
	}
 	var nameOfCookie = boardType + "=";
 	var x = 0;
 	while ( x <= document.cookie.length ){
  		var y = (x+nameOfCookie.length);
  		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
   			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
    			endOfCookie = document.cookie.length;
   				return unescape( document.cookie.substring( y, endOfCookie ) );
  			}
  			x = document.cookie.indexOf( " ", x ) + 1;
  			if ( x == 0 )
   				break;
 	}
 	// cookie�먯꽌 媛믪쓣 李얠쓣�� �녿뒗寃쎌슦 �뷀뤃�멸컪�쇰줈...
 	if(name==1){
		return "15";
	}else if(name==2){
		return "10";
	}else if(name==3){
		return "10";
	}
 	return "";
}


/**
 * �좎쭨 �좏슚�깆껜�� �⑥닔
 */
var DATE_DELIMETER = ".";

/**
 * dateStr 媛앹껜�먯꽌 delim�� �쒓굅�쒕떎.
 *
 * @param dateStr
 * @param delim
 * @return
 */
function removeCharObj(dateStr, delim) {
	if(delim!=null){
		DATE_DELIMETER = delim;
	}
	var value = dateStr.value;
	value = removeChar(value, DATE_DELIMETER);
	dateStr.value = value;
}

/**
 * dateStr 媛믪뿉�� delim�� �쒓굅�쒕떎.
 *
 * @param dateStr
 * @param delim
 * @return
 */
function removeChar(dateStr, delim) {
	var v_length = dateStr.length;

	var retVal = "";
	if(dateStr == "") return "";
	for(var i = 0; i < v_length; i++) {
		var chr = dateStr.substr(i,1);
		if (chr != DATE_DELIMETER) {
			retVal += chr;
		}
	}
	return retVal;
}


/**
 * 二쇱뼱吏� 媛앹껜�� 媛믪씠 �좏슚�� �쇱옄�대㈃
 * 媛앹껜�� 媛믪쓣 �뺤떇�뷀븳��.
 */
function formatDateStrObjIfValid(obj, delim, fieldName, isEmptyCheck) {
	if(delim!="null"){
		DATE_DELIMETER = delim;
	}
	var dateStr = removeChar(obj.value, DATE_DELIMETER);

	var valid = true;

	if(isEmptyCheck==null || isEmptyCheck == undefined) isEmptyCheck = false;

	if(obj.value.length != 6)
	{
		valid = checkDate(dateStr, fieldName, isEmptyCheck, "8");
	}else{
		valid = checkDate(dateStr, fieldName, isEmptyCheck, "6");
	}


	if ( valid ) {
		formatDateStrObj(obj);
	} else {
		if(isEmptyCheck == false) obj.value ="";
		obj.focus();
	}

	return valid;
}

/**
 * 二쇱뼱吏� 媛앹껜�� 媛믪씠 �좏슚�� �꾩썡�대㈃ 媛앹껜�� 媛믪쓣 �뺤떇�뷀븳��.
 * 媛앹껜�� 媛믪쓣 �뺤떇�뷀븳��.
 */
function formatYearMonthStrObjIfValid(obj, fieldName, isEmptyCheck) {
	var dateStr = removeChar(obj.value, DATE_DELIMETER);

	var valid = true;

	if(isEmptyCheck==null || isEmptyCheck == undefined) isEmptyCheck = false;

	valid = checkDate(dateStr, fieldName, isEmptyCheck, "6");
	if ( valid ) {
		formatDateStrObj(obj);
	} else {
		if(isEmptyCheck == false) obj.value ="";
		obj.focus();
	}

 return valid;
}

/**
 * 二쇱뼱吏� 媛앹껜�� 媛믪쓣 �좎쭨�� 臾몄옄�댁씠�쇨퀬
 * 媛��뺥븯怨� �뺤떇�뷀븳��.
 */
function formatDateStrObj(obj) {
	obj.value = formatDateStr(obj.value);
}

/**
 * 二쇱뼱吏� �좎쭨 臾몄옄�댁쓣 �뺤떇�뷀븳��.
 * 8�먮━ : 20081222 => 2008/12/22
 * 6�먮━ : 200812 => 2008/12
 * 4�먮━ : 2008 => 2008
 *
 */
function formatDateStr(dateStr) {
	/* 媛믪씠 �놁쑝硫� 鍮� 臾몄옄�댁쓣 �뚮젮 以���. */
	if ( dateStr == "" ) return "";
	dateStr = removeChar(dateStr, DATE_DELIMETER);

	var formatStr;
	if(dateStr.length == 8) {
		formatStr = dateStr.substring(0, 4) + DATE_DELIMETER + dateStr.substring(4, 6) + DATE_DELIMETER + dateStr.substring(6, 8);
	} else if(dateStr.length == 6) {
		formatStr = dateStr.substring(0, 4) + DATE_DELIMETER + dateStr.substring(4, 6);
	} else if(dateStr.length == 4) {
		formatStr = dateStr.substring(0, 4);
	} else {
		formatStr = dateStr;
	}

	return formatStr;
}

/**
 * Text�� �낅젰�� �� �낅젰�� �좎쭨媛� �좏슚�쒖� 泥댄겕�섏뿬
 * �좏슚�섎㈃ YYYY/MM/DD�� �뺥깭濡� 蹂��섑븯�� return
 * �섍퀬, �좏슚�섏� �딆쑝硫� �먮윭硫붿꽭吏� 蹂댁뿬以�
 * (�꾩썡�� �낅젰�꾨뱶�� onblur event�� �ъ슜�좉쾬)
 *
 * @param obj Text�� �낅젰�� 媛앹껜
 */
function checkDateObj(obj, fieldName, isEmptyCheck, length) {
	if(length == null || length == undefined) length = "8";
	var bool = checkDate(obj.value, fieldName, isEmptyCheck, length);
	if(!bool) {obj.value = "";obj.focus();obj.select(); }
	return bool;
}

/**
 * 二쇱뼱吏� 臾몄옄�닿컪�� �좏슚�� �좎쭨媛믪씤吏� �먭��섏뿬
 * �좏슚�섎㈃ true瑜� �뚮젮二쇨퀬, �좏슚�섏� �딆쑝硫�
 * �먮윭硫붿꽭吏�瑜� 蹂댁뿬二쇨퀬 false瑜� �뚮젮以���.
 * (�꾩썡�� �낅젰�꾨뱶�� onblur event�� �ъ슜�좉쾬)
 *
 * @param dateStr �좎쭨�뺢컪�� 媛�吏��� 臾몄옄��
 */
function checkDate(dateStr, fieldName, isEmptyCheck, size) {
	/* ��ぉ紐낆씠 �놁쑝硫� "�쇱옄"�� �ъ슜. */
	if (isEmpty(fieldName))
		fieldName = "�쇱옄";

	// �꾨Т媛믩룄 �놁쓣�� 泥섎━瑜� isEmptyCheck媛믪뿉 �곕씪 �ㅻⅤ寃� 泥섎━�쒕떎.
	if (trim(dateStr) == "") {
		if(isEmptyCheck == true) {
			alert(fieldName + "��(瑜�) �낅젰�섏떗�쒖삤");
			return false;
		}
		else return true;
	}

	dateStr = removeChar(dateStr, DATE_DELIMETER);

	// �レ옄濡쒕쭔 援ъ꽦�섏뿀�붿� �뺤씤�쒕떎.
	if (isNaN(dateStr)) {
		alert(fieldName + "�� 媛믪뿉�� 臾몄옄媛� �낅젰�� �� �놁뒿�덈떎.");
		return false;
	}

	if(isEmpty(size)) size = 8;

	// 援щ퀎�먮� �쒓굅�� �섎㉧吏� �먮┸�섍� size 留뚰겮�� �먮━�섏씤吏� 寃��ы븳��.
	if (dateStr.length != size) {
		if(size==8) alert(fieldName + "�� 媛믪쓣 YYYY" + DATE_DELIMETER + "MM" + DATE_DELIMETER + "DD�� �뺤떇�쇰줈 �낅젰�� 二쇱떗�쒖삤.");
		if(size==6) alert(fieldName + "�� 媛믪쓣 YYYY" + DATE_DELIMETER + "MM�� �뺤떇�쇰줈 �낅젰�� 二쇱떗�쒖삤.");
		if(size==4) alert(fieldName + "�� 媛믪쓣 YYYY�� �뺤떇�쇰줈 �낅젰�� 二쇱떗�쒖삤.");
		return false;
	}


	// �곕룄 4�먮━, �� 2�먮━, �� 2�먮━濡� �먮Ⅸ��.
	var yearStr;
	var monthStr;
	var dayStr;

	if(size >= 4) {
		yearStr = dateStr.substring(0, 4);

		// �곕룄 媛믪씠 1900 ~ 2100 �ъ씠�몄� �먭��쒕떎.
		if (yearStr < 1900 || yearStr > 2100) {
			alert(fieldName + "�� �곕룄�� 1900�� ~ 2100�� �ъ씠�� 媛믪쓣 �낅젰�댁빞 二쇱떗�쒖삤.");
			return false;
		}
	}
	if(size >= 6) {
		monthStr = dateStr.substring(4, 6);

		// �붿씠 1~12�� �ъ씠�몄� �먭��쒕떎.
		if (monthStr < 1 || monthStr > 12) {
			alert(fieldName + "�� �붿쓣 01 ~ 12�� �ъ씠�� 媛믪쑝濡� �낅젰�� 二쇱떗�쒖삤.");
			return false;
		}
	}

	if(size >= 8) {
		dayStr = dateStr.substring(6);

		// �쇱옄媛� �대떦�붿쓽 �좏슚�� �쇱옄�몄� 寃�寃��쒕떎.
		// Date 媛앹껜 �앹꽦�� �좎쭨媛� �좏슚踰붿쐞瑜� �섏뼱�쒕㈃
		// �ъ씠 蹂��섎뒗 �먮━瑜� �댁슜�덈떎.
		var date = new Date(yearStr, monthStr - 1, dayStr);

		if (Number(yearStr) != date.getFullYear() || Number(monthStr) != (date.getMonth() + 1)) {
			alert(monthStr + "�붿뿉�� " + dayStr + "�쇱씠 �놁뒿�덈떎.");
			return false;
		}
	}

	return true;
}


/**
 * 媛믪씠 鍮꾩뿀�붿� �щ�瑜� �먭��섏뿬 �뚮젮以���.
 * 二쇱뼱吏� 媛믪씠 null�닿굅��, undefined�닿굅�� 鍮� 臾몄옄��("")�대㈃
 * 鍮꾩뿀�ㅺ퀬 �먮떒�쒕떎.
 */
function isEmpty(value, afterTrim) {
	if (value == null || typeof (value) == "undefined")
		return true;

	if (afterTrim == undefined)
		afterTrim = true;

	/* 臾몄옄�댁씠 �꾨땲硫� 臾몄옄�대줈 蹂�寃쏀븳��. */
	if (typeof (value) == "string")
		value = new String(value);

	if (afterTrim)
		value = trim(value);

	return ("" == value);
}

/**
 * 二쇱뼱吏� 媛앹껜�� 媛믪씠 鍮� 媛믪씤吏� �щ�瑜� 寃��ы븯��
 * �뚮젮以���. 鍮덇컪�대㈃ true, �꾨땲硫� false�대떎.
 */
function isEmptyObj(obj, afterTrim) {
	return isEmpty(obj.value, afterTrim);
}


/**
 * 臾몄옄�댁쓽 醫뚯슦怨듬갚�� �쒓굅�쒕떎.
 *
 * @param src
 * @return
 */
function trim(src) {
    var search = 0;

    while ( src.charAt(search) == " ") {
        search = search + 1;
    }

    src = src.substring(search, (src.length));

    search = src.length - 1;

    while (src.charAt(search) ==" ") {
        search = search - 1;
    }

    return src.substring(0, search + 1);
}


/********************************************************************************************************************************
�듯솕愿���
********************************************************************************************************************************/
/**
* @notice -> value媛믪쓣 �듯솕�뺥깭�쒗쁽 ( �� �먮┸�섎쭏�� 肄ㅻ쭏(,) 遺숈씠湲� )
* @param {Number} value -> 蹂��섑븷 媛�
*/
function formatNumber ( value ) {
	var number = unformat ( value ),
		nagative = ( number < 0 ) ? '-' : '',
		split = ( '' + Math.abs ( number ) ).split ( '.' ),
		natural = split [ 0 ],
		start = ( natural.length > 3 ) ? natural.length % 3 : 0,
		decimal = arguments[1] ? Number('0.'+(split[1])||0).toFixed(arguments[1]||0).split('.')[1] : split [ 1 ],
		result = nagative + ( ( start != 0 ) ? natural.substr ( 0, start ) + ',' : '' ) + natural.substr ( start ).replace ( /(\d{3})(?=\d)/g, '$1,' ) + ( decimal ? '.' + decimal : '' );
		return result;
}

/**
* @notice -> �レ옄濡� 蹂���. 蹂��섍��ν븳 ���낆씠 �꾨땺�뚯뿉�� undefined 諛섑솚
* @param {Number} value -> 蹂��섑븷 媛�
*/
function unformat ( value ) {
	if ( typeof value === 'number' ) {
		return value;
	} else if ( typeof value === 'string' ) {
		if ( /[^0-9-.,]/g.test ( value ) ) {
			return undefined;
		} else {
			return parseFloat ( value.replace ( /[^0-9-.]/g, '' ) );
		}
	}
	return undefined;
}