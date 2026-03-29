function trimUrl(v) {
  return typeof v === 'string' ? v.trim() : '';
}

function bindCopy(btnId, getUrl) {
  const copyBtn = document.getElementById(btnId);
  if (!copyBtn) return;
  copyBtn.addEventListener('click', async () => {
    const shareUrl = getUrl();
    const label = copyBtn.textContent;
    try {
      await navigator.clipboard.writeText(shareUrl);
      copyBtn.textContent = '복사됨!';
      setTimeout(() => {
        copyBtn.textContent = label;
      }, 1800);
    } catch {
      window.prompt('아래 주소를 복사하세요', shareUrl);
    }
  });
}

function makeQr(elementId, text, size) {
  const qrEl = document.getElementById(elementId);
  if (qrEl && typeof QRCode !== 'undefined') {
    qrEl.innerHTML = '';
    new QRCode(qrEl, {
      text,
      width: size,
      height: size,
      colorDark: '#1B5E20',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const homeUrl =
    trimUrl(typeof HOMEPAGE_QR_URL !== 'undefined' ? HOMEPAGE_QR_URL : '') ||
    'https://honeyjam-english.com/';

  makeQr('qr-code', homeUrl, 118);
  bindCopy('copy-home-link', () => homeUrl);

  const kakaoEl = document.getElementById('contact-kakao');
  if (kakaoEl && typeof KAKAO_URL === 'string' && KAKAO_URL.trim()) {
    kakaoEl.href = KAKAO_URL.trim();
    kakaoEl.hidden = false;
    const kakaoLabel =
      typeof KAKAO_LINK_LABEL === 'string' && KAKAO_LINK_LABEL.trim()
        ? KAKAO_LINK_LABEL.trim()
        : '카카오톡';
    kakaoEl.innerHTML = `<span class="icon" aria-hidden="true">💬</span><span>${kakaoLabel}</span>`;
  } else if (kakaoEl) {
    kakaoEl.remove();
  }
});
