/*
 * 共通の動き（ヘッダー・フッター・お問い合わせ・一覧の表示）
 * 文章や連絡先を変えたいだけなら、このファイルではなく site-data.js を編集してください。
 */
(() => {
  const site = window.SITE;
  if (!site) {
    console.error('site-data.js が読み込めていません。書き間違い（カンマや引用符）がないか確認してください。');
    return;
  }

  const root = document.body.dataset.root || '';
  const REVEAL_STAGGER_MS = 70;

  // 外部リンクかどうかで、サイト内のパスに root を付けるかを決める
  const isExternal = (url) => /^(https?:|mailto:)/.test(url);
  const href = (url) => (isExternal(url) ? url : root + url);

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value === true ? '' : value);
    });
    [].concat(children).filter(Boolean).forEach((child) => node.append(child));
    return node;
  };

  const link = (url, attrs, children) =>
    el('a', { href: href(url), ...(isExternal(url) && !url.startsWith('mailto:') ? { target: '_blank', rel: 'noopener' } : {}), ...attrs }, children);

  const arrow = () => el('span', { class: 'arrow', 'aria-hidden': 'true', text: '→' });

  /* ---------- お問い合わせ ---------- */

  const contactLinks = () => {
    const { email, x, form } = site.contact || {};
    return [
      form && { label: 'フォームから送る', url: form },
      email && { label: 'メールを送る', url: `mailto:${email}` },
      x && { label: 'X で連絡する', url: x },
    ].filter(Boolean);
  };

  const buildPendingDialog = () => {
    const closeButton = el('button', { type: 'button', class: 'button button--ghost', text: 'とじる' });
    const dialog = el('dialog', { class: 'dialog', 'aria-labelledby': 'pending-title' }, [
      el('p', { class: 'dialog__label', text: 'Contact' }),
      el('h2', { id: 'pending-title', class: 'dialog__title', text: 'お問い合わせ窓口は準備中です' }),
      el('p', { class: 'dialog__text', text: 'ただいま受付の準備をしています。公開まで、もうしばらくお待ちください。' }),
      closeButton,
    ]);
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    document.body.append(dialog);
    return dialog;
  };

  const buildContact = () => {
    const links = contactLinks();
    const actions = el('div', { class: 'contact__actions' });

    if (links.length === 0) {
      const dialog = buildPendingDialog();
      const button = el('button', { type: 'button', class: 'button button--light' }, ['お問い合わせ', arrow()]);
      button.addEventListener('click', () => dialog.showModal());
      actions.append(button);
    } else {
      links.forEach((item) => actions.append(link(item.url, { class: 'button button--light' }, [item.label, arrow()])));
    }

    return el('section', { class: 'contact', id: 'contact', 'aria-labelledby': 'contact-title' }, [
      el('div', { class: 'wrap contact__inner' }, [
        el('p', { class: 'label label--light', text: 'Contact' }),
        el('h2', { id: 'contact-title', class: 'contact__title', text: '一緒に活動してくださる方を、探しています。' }),
        el('p', { class: 'contact__text', text: '学生など活動に興味のある方、お店、商店街、自治体、施設の方。プロジェクトを一緒に作ってくださる仲間を募集しています。' }),
        actions,
      ]),
    ]);
  };

  /* ---------- ヘッダー・フッター ---------- */

  const NAV = [
    { label: 'プロダクト', url: 'index.html#products' },
    { label: '活動', url: 'index.html#news' },
    { label: 'メンバー', url: 'members.html' },
    { label: 'お問い合わせ', url: '#contact', local: true },
  ];

  const navLink = (item) => el('a', { href: item.local ? item.url : href(item.url), text: item.label });

  const buildHeader = () => {
    const mount = document.getElementById('site-header');
    if (!mount) return;

    const list = el('ul', { class: 'nav__list', id: 'nav-list' }, NAV.map((item) => el('li', {}, navLink(item))));
    const toggle = el('button', { type: 'button', class: 'nav__toggle', 'aria-expanded': 'false', 'aria-controls': 'nav-list' }, [
      el('span', { class: 'nav__toggle-text', text: 'メニュー' }),
    ]);
    const setOpen = (isOpen) => {
      mount.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.firstChild.textContent = isOpen ? 'とじる' : 'メニュー';
    };
    toggle.addEventListener('click', () => setOpen(!mount.classList.contains('is-open')));
    list.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });

    mount.append(
      el('div', { class: 'site-header__bar' }, [
        el('a', { class: 'logo', href: href('index.html'), 'aria-label': 'u&me トップページ' }, [
          'u',
          el('span', { class: 'logo__amp', text: '&' }),
          'me',
        ]),
        el('nav', { class: 'nav', 'aria-label': 'メインナビゲーション' }, [toggle, list]),
      ]),
    );
  };

  const buildFooter = () => {
    const mount = document.getElementById('site-footer');
    if (!mount) return;

    const productLinks = site.products.map((product) => el('li', {}, el('a', { href: href(product.page), text: product.name })));
    mount.append(
      buildContact(),
      el('div', { class: 'wrap footer__inner' }, [
        el('div', { class: 'footer__brand' }, [
          el('p', { class: 'logo logo--footer' }, ['u', el('span', { class: 'logo__amp', text: '&' }), 'me']),
          el('p', { class: 'footer__note', text: '学生団体 u&me' }),
        ]),
        el('nav', { class: 'footer__nav', 'aria-label': 'フッターナビゲーション' }, [
          el('div', {}, [el('p', { class: 'footer__heading', text: 'プロダクト' }), el('ul', {}, productLinks)]),
          el('div', {}, [
            el('p', { class: 'footer__heading', text: '団体' }),
            el('ul', {}, [
              el('li', {}, el('a', { href: href('index.html#about'), text: '理念' })),
              el('li', {}, el('a', { href: href('index.html#news'), text: '活動' })),
              el('li', {}, el('a', { href: href('members.html'), text: 'メンバー' })),
            ]),
          ]),
        ]),
        el('p', { class: 'footer__copy', text: `© ${new Date().getFullYear()} u&me` }),
      ]),
    );
  };

  /* ---------- 一覧（site-data.js の内容を並べる） ---------- */

  const productRow = (product, index) =>
    el('li', { class: 'product-row', 'data-reveal': true }, [
      link(product.page, { class: `product-row__link tone-${product.tone}` }, [
        el('span', { class: 'product-row__no', text: String(index + 1).padStart(2, '0') }),
        el('span', { class: 'product-row__main' }, [
          el('span', { class: 'product-row__name' }, [product.name, el('small', { text: product.latin })]),
          el('span', { class: 'product-row__catch', text: product.catch }),
        ]),
        el('span', { class: 'product-row__summary', text: product.summary }),
        el('span', { class: 'product-row__status' }, [el('span', { class: 'chip', text: product.status }), arrow()]),
      ]),
    ]);

  const fillProducts = () => {
    const mount = document.querySelector('[data-products]');
    if (mount) site.products.forEach((product, index) => mount.append(productRow(product, index)));
  };

  // 各プロダクトのページ下に、ほかのプロダクトへのリンクを出す
  const fillOtherProducts = () => {
    const mount = document.querySelector('[data-other-products]');
    if (!mount) return;
    const currentId = mount.dataset.otherProducts;
    site.products
      .filter((product) => product.id !== currentId)
      .forEach((product) => {
        mount.append(
          el('li', {}, [
            link(product.page, { class: `other-card tone-${product.tone}` }, [
              el('span', { class: 'chip', text: product.status }),
              el('span', { class: 'other-card__name', text: product.name }),
              el('span', { class: 'other-card__catch', text: product.catch }),
              arrow(),
            ]),
          ]),
        );
      });
  };

  const fillNews = () => {
    const mount = document.querySelector('[data-news]');
    if (!mount) return;
    site.news.forEach((item) => {
      const body = item.link
        ? link(item.link, { class: 'news__text news__text--link' }, [item.text, arrow()])
        : el('span', { class: 'news__text', text: item.text });
      mount.append(el('li', { class: 'news__item', 'data-reveal': true }, [el('time', { class: 'news__date', text: item.date }), body]));
    });
  };

  const memberCard = (member) => {
    const avatar = member.photo
      ? el('img', { class: 'member__photo', src: href(member.photo), alt: `${member.name}の写真`, width: '320', height: '320', loading: 'lazy' })
      : el('span', { class: 'member__initial', 'aria-hidden': 'true', text: member.name.charAt(0) });
    const links = (member.links || []).map((item) => el('li', {}, link(item.url, {}, [item.label, arrow()])));
    return el('li', { class: 'member', 'data-reveal': true }, [
      el('div', { class: 'member__avatar' }, avatar),
      el('div', { class: 'member__body' }, [
        el('p', { class: 'member__role', text: member.role }),
        el('h2', { class: 'member__name' }, [member.name, el('small', { text: member.latin })]),
        el('p', { class: 'member__bio', text: member.bio }),
        links.length ? el('ul', { class: 'member__links' }, links) : null,
      ]),
    ]);
  };

  const fillMembers = () => {
    const mount = document.querySelector('[data-members]');
    if (mount) site.members.forEach((member) => mount.append(memberCard(member)));
  };

  /* ---------- スクロールで現れる演出 ---------- */

  const setupReveal = () => {
    const targets = [...document.querySelectorAll('[data-reveal]')];
    const show = (node) => node.classList.add('is-visible');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach(show);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            entry.target.style.transitionDelay = `${index * REVEAL_STAGGER_MS}ms`;
            show(entry.target);
            observer.unobserve(entry.target);
          });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((node) => observer.observe(node));
  };

  /* ---------- オープニング（流すかどうかは boot.js が決める） ---------- */

  const INTRO_SKIP_MS = 350;
  const INTRO_FALLBACK_MS = 12000;

  const setupIntro = () => {
    const intro = document.getElementById('intro');
    const html = document.documentElement;
    if (!intro || !html.classList.contains('intro-on')) return;

    let isFinished = false;
    const finish = () => {
      if (isFinished) return;
      isFinished = true;
      html.classList.remove('intro-on');
      intro.remove();
      document.removeEventListener('keydown', skip);
      try {
        window.sessionStorage.setItem('uandme-intro-seen', '1');
      } catch (error) {
        // 保存できなくても表示には影響しない（次回もオープニングが流れるだけ）
      }
    };
    function skip() {
      intro.classList.add('is-skipping');
      window.setTimeout(finish, INTRO_SKIP_MS);
    }

    // 霧が晴れきったら片付ける
    intro.addEventListener('animationend', (event) => {
      if (event.target === intro) finish();
    });
    intro.addEventListener('click', skip);
    document.addEventListener('keydown', skip);
    window.setTimeout(finish, INTRO_FALLBACK_MS);
  };

  setupIntro();
  buildHeader();
  fillProducts();
  fillOtherProducts();
  fillNews();
  fillMembers();
  buildFooter();
  setupReveal();
})();
