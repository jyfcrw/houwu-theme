function buildBaiduMap(){
  map = new BMap.Map("contact-map");
  map.centerAndZoom(new BMap.Point(121.381349, 31.181375),17);
  map.enableKeyboard();
  map.enableDragging();
  map.enableDoubleClickZoom();
  var data = {
    title:"上海后坞园艺有限公司",
    content:"地址：上海市吴中路1388号6A22",
    imageOffset: { width: 0, height: 3 },
    position: { lat: 31.181375, lng: 121.381349 }
  };

  var point = new BMap.Point(data.position.lng, data.position.lat);
  var marker = new BMap.Marker(point, {
    icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25), { imageOffset: new BMap.Size(data.imageOffset.width,data.imageOffset.height)})
  });

  var label = new BMap.Label(data.title, {offset: new BMap.Size(25,5)});
  var opts = {
    width: 200,
    title: data.title,
    enableMessage: false
  };
  var infoWindow = new BMap.InfoWindow(data.content,opts);
  marker.setLabel(label);
  marker.addEventListener("click",function(){
    marker.openInfoWindow(infoWindow);
  });
  map.addOverlay(marker);
}

function loadBaiduMap() {
  window.wise = 0;
  window.netSpeed = 0;
  window.netType = 0;
  window.BMap_loadScriptTime = (new Date).getTime();
  var s = document.createElement ("script");
  s.type = "text/javascript";
  s.src = "http://api.map.baidu.com/getscript?v=2.0&ak=zA7G7AjuO2xN0XNuMNRHfTm6&services=&t=20160310104956";
  s.onload = function() {
    buildBaiduMap();
  };
  document.body.appendChild(s);
}

function buildImageViewer() {
  var container = $(".page-content .container");
  var imageList = container.find(".images");

  var images = imageList.find("img");

  images.each(function() {
    var url = $(this).attr("src"),
      parent = $(this).closest("li");

    parent.css("background-image", "url("+ url +")");
  });

  var viewer = new Viewer(imageList[0], {
    movable: false,
    rotatable: false,
    scalable: false,
    tooltop: false,
    transition: false,
    title: false,
    url: function() {
      return $(this).attr("src").replace("/thumb/", "/source/");
    }
  });
}

function buildLink() {
  var courseContainer = $(".page-course");
  var sections = courseContainer.find("section");

  sections.each(function() {
    var section = $(this);
    var url = section.data("url");
    section.find("a").attr("href", url);
  });
}

$(function(){

  // MOUSEOVER **************//
  $("a").mouseover(function() {
    $(this).stop(true, false).animate({ opacity: 0.5 }, { duration: 1}).animate({ opacity: 1 }, { duration: 300});
    return false;
  });

  // SCROLL ******************//
  $("a[href*='#']").easingScroll({
    easing: "easeInOutCubic",
    duration: 700
  });

  // TOP BG ///////////////////////////////////////////////////////////////////////////////////
  $('#about1 .img,#about3 .img, #course1 .img').cycle({
    fx:    'fade',
    speed: 1000,
    timeout: 4000,
    delay: 500,
    cleartype: true
  });

  $(".open-left").click(function() {
    $(".common-left").addClass('open');
    $(".open-mask").fadeIn();
  });

  $(".open-mask").click(function() {
    $(".common-left").removeClass('open');
    $(".open-mask").fadeOut();
  });

  if ($(".page-head").hasClass("page-contact")) {
    $(".page-head").append('<div class="contact-map" id="contact-map"></div>');
      // http://api.map.baidu.com/api?v=2.0&ak=zA7G7AjuO2xN0XNuMNRHfTm6
    loadBaiduMap();
  }

  if ($(".page-content").hasClass('page-course')) {
    buildLink();
  }

  if ($(".page-content").hasClass('tag-courses')) {
    buildImageViewer();
  }
});
