/*!
zepto.carousel v1.0.0 http://yanhaijing.com/zepto.carousel LICENSE
*/
/* Build time: March 12, 2014 11:41:53 */
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
				step:0.2
			}, opt),
			$this = $(this),
			$carousel = $this,
			$lis = $(o.li, $this),
			lisHeight = $lis.height(),
			lisLength = $lis.length,
			curIndex = o.startIndex,
			width = $carousel.width();
		
		function fixIndex(index) {
			return (index + lisLength) % lisLength;
		}
		function translate(index) {
			var
				len = o.visibleCount / 2,
				i = 1,
				leftIndex = 0,
				rightIndex = 0;
			index = fixIndex(index);
			$lis.removeClass("js-carousel-li-visible").eq(index).addClass("js-carousel-li-visible js-carousel-li-cur")
				.css({
					"-webkit-transform": "none",
					"z-index": 1000
				});
			
			for(i; i <= len; i++) {
				leftIndex = fixIndex(index - i);
				rightIndex = fixIndex(index + i);
				$lis.eq(leftIndex).addClass("js-carousel-li-visible").css({
					"z-index": 1000 - i,
					"-webkit-transform": "translateX(" + (-i * o.step * width - width / 2) + "px) translateZ(-200px)  rotateY(45deg)" 
				});
				$lis.eq(rightIndex).addClass("js-carousel-li-visible").css({
					"z-index": 1000 - i,
					"-webkit-transform": "translateX(" + (i * o.step * width + width / 2) + "px) translateZ(-200px) rotateY(-45deg)"
				});
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
			$(window).on("resize", function (e) {
				updateSize();
			});	
			$(window).on("load", function (e) {
				updateSize();
			});	
			$carousel.on("touchstart", function (e) {
		        e.preventDefault();
			});
			$carousel.on("touchmove", function (e) {
		        e.preventDefault();
			});	
		}
		
		init();
		return this;
	};
}(Zepto));	
