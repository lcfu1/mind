$(function() {
		var items;
		var content = '';
		
		$.getJSON("json/data.json", function (result) {
			var items=result;
			
			if ($("#select").text() == "推荐") {
				for (var i = 1; i < items.length; i++) {
					if(items[i].recommend>=4){
						content = content + '<div class="card"><a id="' + items[i].id + '" data-gallery="manual" href="' + items[i].src +
							'"><img style="min-height: 180px;max-height: 220px;" src="' + items[i].img_thumbnail +
							'" class="card-img-top" alt="加载出错"></a><div class="card-body"><div class="d-flex"><div class="p-2">' + items[i].title +
							'</div><div class="p-2 ml-auto"><span class="badge badge-pill badge-danger">' + items[i].category +
							'</span></div></div><p style="color: #999999;padding-left: .5rem ;">' + items[i].description +
							'</p></div></div>';
					}
				}
				$(".card-columns").append(content);
			}
			
			$(".dropdown-item").click(function(e) {
				$(".card").remove();
				content = '';
				var category = $(this).text();
				$("#select").text(category);
				if (category == "全部") {
					for (var i = 1; i < items.length; i++) {
						content = content + '<div class="card"><a id="' + items[i].id + '" data-gallery="manual" href="' + items[i].src +
							'"><img style="min-height: 180px;max-height: 220px;" src="' + items[i].img_thumbnail +
							'" class="card-img-top" alt="加载出错"></a><div class="card-body"><div class="d-flex"><div class="p-2">' + items[
								i].title + '</div><div class="p-2 ml-auto"><span class="badge badge-pill badge-danger">' + items[i].category +
							'</span></div></div><p style="color: #999999;padding-left: .5rem ;">' + items[i].description +
							'</p></div></div>';
					}
				} else {
					for (var i = 1; i < items.length; i++) {
						if (items[i].category == category) {
							content = content + '<div class="card"><a id="' + items[i].id + '" data-gallery="manual" href="' + items[i].src +
								'"><img style="min-height: 180px;max-height: 220px;" src="' + items[i].img_thumbnail +
								'" class="card-img-top" alt="加载出错"></a><div class="card-body"><div class="d-flex"><div class="p-2">' + items[
									i].title + '</div><div class="p-2 ml-auto"><span class="badge badge-pill badge-danger">' + items[i].category +
								'</span></div></div><p style="color: #999999;padding-left: .5rem ;">' + items[i].description +
								'</p></div></div>';
						}
					}
				}
				$(".card-columns").append(content);
			});
			
			$(document).on("click", "[data-gallery=manual]", function(e) {
				var index = $(this).attr('id');
				e.preventDefault();
			
				var options = {
					index: index,
					initMaximized: true,
					headToolbar: ['zoomIn', 'zoomOut', 'actualSize', 'maximize', 'close'],
				};
			
				new PhotoViewer(items, options);
			
				$(".xmind").click(function() {
					window.location.href = items[index].xmindsrc;
				});
			
				$(".pdf").click(function() {
					window.open(items[index].pdfsrc.replace("./", "http://mozilla.github.io/pdf.js/web/viewer.html?file=https://lcfu1.github.io/mind/"));
				});
			
			});
			
			$("#about").click(function(){
				var options = {
					index: 0,
					initMaximized: true,
					headToolbar: ['zoomIn', 'zoomOut', 'actualSize', 'maximize', 'close'],
				};
				new PhotoViewer(items, options);
			});
		});

	});