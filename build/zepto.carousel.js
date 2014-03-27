/*!
zepto.carousel v1.0.0 http://yanhaijing.com/zepto.carousel LICENSE
*/
/* Build time: March 27, 2014 11:14:13 */
/**
 * zepto.carousel.1.0.0.js插件 
 * @author yanxuefeng
 * @time 2014�?�?6�?14:26:39
 */
(function($){
	$.fn.carousel = function(opt){
		var
			o = $.extend({
				startIndex:1,
				li: "li",
				visibleCount: 3,
				step:0.5,
				rotateY:0,
				translateZ:100,
				preventTouchEvent:false,
				style:"double",
				resizeEvent: false
			}, opt);
		return $(this).each(function () {
			var 
				$this = $(this),
				$carousel = $this,
				$lis = $(o.li, $this),
				lisHeight = $lis.height(),
				lisLength = $lis.length,
				curIndex = o.startIndex,
				width = $carousel.width(),
				visibleCount = o.visibleCount;
			if (visibleCount > lisLength) {visibleCount = lisLength;}
			function fixIndex(index) {
				return (index + lisLength) % lisLength;
			}
			function translate(index) {
				var
					len = visibleCount / 2,
					i = 1,
					leftIndex = 0,
					rightIndex = 0;
				index = fixIndex(index);
				$lis.removeClass("js-carousel-li-visible").eq(index).addClass("js-carousel-li-visible js-carousel-li-cur")
					.css({
						"-webkit-transform": "none",
						"z-index": 1000
					});
				if (o.style === "double") {
					for(i; i <= len; i++) {
						leftIndex = fixIndex(index - i);
						rightIndex = fixIndex(index + i);
						$lis.eq(leftIndex).addClass("js-carousel-li-visible").css({
							"z-index": 1000 - i,
							"-webkit-transform": "translateX(" + (-o.step * width * i) + "px) translateZ(-" + o.translateZ * i + "px)  rotateY(" + o.rotateY + "deg)" 
						});
						$lis.eq(rightIndex).addClass("js-carousel-li-visible").css({
							"z-index": 1000 - i,
							"-webkit-transform": "translateX(" + (o.step * width * i) + "px) translateZ(-" + o.translateZ * i + "px) rotateY(-" + o.rotateY + "deg)"
						});
					}
				} else if (o.style === "left") {
					len = visibleCount;
					for(i; i < len; i++) {
						rightIndex = fixIndex(index + i);
						$lis.eq(rightIndex).addClass("js-carousel-li-visible").css({
							"z-index": 1000 - i,
							"-webkit-transform": "translateX(" + (o.step * width * i) + "px) translateZ(-" + o.translateZ * i + "px) rotateY(-" + o.rotateY + "deg)"
						});
					}
				} else if (o.style === "right") {
					len = visibleCount;
					for(i; i < len; i++) {
						leftIndex = fixIndex(index - i);
						$lis.eq(leftIndex).addClass("js-carousel-li-visible").css({
							"z-index": 1000 - i,
							"-webkit-transform": "translateX(" + (-o.step * width * i) + "px) translateZ(-" + o.translateZ * i + "px) rotateY(" + o.rotateY + "deg)"
						});
					}
				}
				curIndex = index;
			}	
			function updateSize() {			
				width = $carousel.width();
				translate(curIndex);
				lisHeight = $lis.filter(".js-carousel-li-cur").height();	
				$carousel.height(lisHeight);			
			}
			function init() {
				$lis.addClass("js-carousel-li");						
							
				//绑定事件
				$carousel.swipeLeft(function (e) {
					translate(curIndex + 1);
				});
				$carousel.swipeRight(function (e) {
					translate(curIndex - 1);
				});										
				$(window).on("load", function (e) {
					updateSize();
				});	
				if (o.resizeEvent) {
					$(window).on("resize", function (e) {
						updateSize();
					});
				}
				if (o.preventTouchEvent) {
					$carousel.on("touchstart", function (e) {
				        e.preventDefault();
					});
					$carousel.on("touchmove", function (e) {
				        e.preventDefault();
					});
				}	
			}			
			init();
		});
	};
}(Zepto));	
