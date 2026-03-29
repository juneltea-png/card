function resolveShareUrl() {
  if (typeof CARD_PUBLIC_URL === 'string' && CARD_PUBLIC_URL.trim()) {
    return CARD_PUBLIC_URL.trim();
  }
  const u = new URL(window.location.href);
  u.hash = '';
  let s = u.toString();
  if (s.endsWith('/index.html')) {
    s = s.slice(0, -'index.html'.length);
  }
  return s.replace(/\/$/, '') || u.href;
}

document.addEventListener('DOMContentLoaded', () => {
  const shareUrl = resolveShareUrl();

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

  const qrEl = document.getElementById('qr-code');
  if (qrEl && typeof QRCode !== 'undefined') {
    qrEl.innerHTML = '';
    new QRCode(qrEl, {
      text: shareUrl,
      width: 118,
      height: 118,
      colorDark: '#1B5E20',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  const copyBtn = document.getElementById('copy-card-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
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
});
