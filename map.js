// 네이버 지도 초기화
// config.js의 NAVER_MAP_CLIENT_ID를 설정해주세요.
// 발급: https://www.ncloud.com → AI·NAVER API → Maps → Application 등록

function initMap() {
  const clientId = typeof NAVER_MAP_CLIENT_ID !== 'undefined' ? NAVER_MAP_CLIENT_ID : '';
  
  // API 키가 없으면 네이버 지도 링크 표시
  if (!clientId || clientId === 'YOUR_CLIENT_ID') {
    const mapEl = document.getElementById('naver-map');
    if (mapEl) {
      mapEl.innerHTML = '<a href="https://map.naver.com/v5/search/부천시%20성주로%20200번길%2021%20꿀잼영어" target="_blank" rel="noopener" class="map-fallback">📍 지도 보기 (네이버 지도 열기)</a>';
    }
    return;
  }

  if (typeof naver === 'undefined') return;

  // 꿀잼영어 위치: 부천시 성주로 200번길 21 2층
  const position = new naver.maps.LatLng(37.4815, 126.7820);
  
  const mapOptions = {
    center: position,
    zoom: 17,
    zoomControl: true,
    zoomControlOptions: {
      position: naver.maps.Position.TOP_RIGHT
    }
  };

  const map = new naver.maps.Map('naver-map', mapOptions);
  
  const marker = new naver.maps.Marker({
    position: position,
    map: map
  });

  const contentString = [
    '<div class="map-info-window">',
    '  <strong>꿀잼영어</strong><br>',
    '  부천시 성주로 200번길 21 2층',
    '</div>'
  ].join('');

  const infowindow = new naver.maps.InfoWindow({
    content: contentString
  });

  naver.maps.Event.addListener(marker, 'click', function() {
    if (infowindow.getMap()) {
      infowindow.close();
    } else {
      infowindow.open(map, marker);
    }
  });

  infowindow.open(map, marker);
}

// API 키 로드 후 지도 초기화
(function loadNaverMap() {
  const clientId = typeof NAVER_MAP_CLIENT_ID !== 'undefined' ? NAVER_MAP_CLIENT_ID : '';
  const apiKey = clientId && clientId !== 'YOUR_CLIENT_ID' ? clientId : '';
  
  if (!apiKey) {
    initMap();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=' + apiKey + '&callback=initMap';
  script.async = true;
  document.body.appendChild(script);
})();
