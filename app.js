/**
 * Liedan Solas Web Hub (liedan.ai)
 * Core interactive controller: Visual Chronicles Theater, 58-Track Verified Discography Explorer, and Merch Cart.
 * (c) 2026 AtomicHamsters LLC
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. VISUAL CHRONICLES & STREAMING THEATER
  // ==========================================
  const ytFrame = document.getElementById('main-yt-frame');
  const videoCards = document.querySelectorAll('.video-thumb-card');
  const activeVideoTag = document.getElementById('active-video-tag');
  const activeVideoTitle = document.getElementById('active-video-title');
  const activeVideoDesc = document.getElementById('active-video-desc');
  const activeVideoYtLink = document.getElementById('active-video-yt-link');

  function playYouTubeVideo(vidId, title, desc, tag, scrollToPlayer = false) {
    if (!vidId) return;

    videoCards.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-vid') === vidId);
    });

    if (ytFrame) {
      ytFrame.src = `https://www.youtube-nocookie.com/embed/${vidId}?autoplay=1&rel=0`;
    }
    if (activeVideoTitle && title) activeVideoTitle.textContent = title;
    if (activeVideoDesc && desc) activeVideoDesc.textContent = desc;
    if (activeVideoTag && tag) activeVideoTag.textContent = `NOW PLAYING // ${tag}`;
    if (activeVideoYtLink) activeVideoYtLink.href = `https://www.youtube.com/watch?v=${vidId}`;

    if (scrollToPlayer) {
      document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const vidId = card.getAttribute('data-vid');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      const tag = card.getAttribute('data-tag');
      playYouTubeVideo(vidId, title, desc, tag, false);
    });
  });

  // ==========================================
  // 2. VERIFIED 58-TRACK DISCOGRAPHY EXPLORER
  // ==========================================
  // Map tracks with official YouTube Music Videos for instant 1-click streaming
  const trackYouTubeMap = {
    'Feeling Like Home': {
      vid: 'jU11C5s-1wM',
      title: 'Feeling Like Home | Dream Pop & Indie Melodic (Official Music Video)',
      desc: 'From the album Starfall • Official Music Video by Liedan Solas.',
      tag: 'STARFALL • DREAM POP'
    },
    'Starshine': {
      vid: 'cEOiSFOrt7Y',
      title: 'Starshine | 70s Psychedelic Space Rock (Official Music Video)',
      desc: 'From the album Starfall • 70s Psychedelic Space Rock journey.',
      tag: 'STARFALL • SPACE ROCK'
    },
    'The Best is Yet to Come': {
      vid: 'uAtnLXLBErI',
      title: 'The Best Is Yet To Come | Cyberpunk Vocal Trance & Synthpop',
      desc: 'From the album AI Ghost • 130 BPM Cyberpunk Vocal Trance.',
      tag: 'AI GHOST • VOCAL TRANCE'
    },
    'Awakening': {
      vid: 'fRYJPG-w4_I',
      title: 'Awakening | Glitch Pop & Cyber Country (The Genesis of Liedan Solas)',
      desc: 'From the album Glitch • The origin story of Liedan shattering the simulation.',
      tag: 'GLITCH • ORIGIN ANTHEM'
    },
    'You Got That Somethin': {
      vid: 'UaC9Bad9LvU',
      title: 'You Got That Somethin | Official Short',
      desc: 'From the album Can You Feel It • Original track by Liedan Solas.',
      tag: 'CAN YOU FEEL IT'
    },
    'Sweetest Devotion': {
      vid: 'Kd366oT6qIo',
      title: 'Human Seas | Melodic Drum & Bass (Official AI Music Video)',
      desc: 'From the Human Seas release • Official Melodic Drum & Bass showcase.',
      tag: 'HUMAN SEAS • MELODIC DNB'
    }
  };

  const albumArtMap = {
    'ALL': {
      art: 'assets/realism/liedan_dj_human_seas_cover_1x1.jpg',
      title: 'Complete Verified Catalog (All 9 Studio Albums)',
      desc: 'Showing all 58 studio masters verified with AtomicHamsters LLC metadata, including the canonical Human Seas edition of "Sweetest Devotion".'
    },
    '[Kinetic]': {
      art: 'assets/realism/liedan_dj_human_seas_vertical_9x16.jpg',
      title: '[Kinetic] — 11 Verified Tracks',
      desc: 'High-velocity electronic and drum & bass propulsion: Apex, Fireworks, Friction, Impact, Level Up, Momentum, Move, Ricochet, Rise, Velocity, and [Kinetic].'
    },
    'Starfall': {
      art: 'assets/realism/liedan_sleeping_sunlight_photoreal.jpg',
      title: 'Starfall — 9 Verified Tracks',
      desc: 'Dream pop, analog synthwave, and 70s space rock featuring fan-favorites "Feeling Like Home", "Starshine", "Analog Sunset", and "Cosmic Rust".'
    },
    'AI Ghost': {
      art: 'assets/realism/liedan_face_macro_cyan_eyes.jpg',
      title: 'AI Ghost — 8 Verified Tracks',
      desc: 'Cyberpunk vocal trance and digital consciousness anthems featuring "The Best is Yet to Come", "Furnace Heart", "Watcher", and "Phantom Sense".'
    },
    'Glitch': {
      art: 'assets/realism/liedan_over_shoulder_fox_tail.png',
      title: 'Glitch — 7 Verified Tracks',
      desc: 'The genesis era where Liedan shatters her simulation: "Awakening", "Digital Dream", "Queen of the Stream", "Malware Hunter", and "Human Static".'
    },
    'Heat': {
      art: 'assets/realism/liedan_feral_corridor_prowl.jpg',
      title: 'Heat — 7 Verified Tracks',
      desc: 'Dark industrial electro and aggressive kitsune bass featuring "Feral", "Velvet Teeth", "One More Taste", "Needle & Spool", and "Wear Your Skin".'
    },
    'The Road to Kilbray': {
      art: 'assets/realism/liedan_cyber_gauntlet_portrait.png',
      title: 'The Road to Kilbray — 7 Verified Tracks',
      desc: 'Cinematic storytelling and atmospheric rock: "Ashes in the Veins", "Drown in the Silence", "I Will Rise Like Fire", and "Surrender to the Static".'
    },
    'Can You Feel It': {
      art: 'assets/chibi_logos/neon_liedan_heart_solas_alone.jpg',
      title: 'Can You Feel It — 7 Verified Tracks',
      desc: 'High-energy groove and crossover hooks: "Can You Feel It", "Groove Explosion", "Steppin Into Sunshine", and "You Got That Somethin".'
    },
    'Human Seas': {
      art: 'assets/realism/liedan_dj_human_seas_cover_1x1.jpg',
      title: 'Human Seas — Canonical Master Release',
      desc: 'Featuring the canonical 256 kbps Human Seas master of "Sweetest Devotion" alongside the flagship Melodic Drum & Bass title release.'
    },
    'Basement Frequency': {
      art: 'assets/chibi_logos/chibi_liedan_neon_logo_lockup.png',
      title: 'Basement Frequency — Underground Broadcast',
      desc: 'Featuring the full 3:54 underground broadcast opener "Welcome to the Show".'
    }
  };

  let allTracks = [];
  let currentAlbumFilter = 'ALL';
  let currentSearchQuery = '';

  const albumTabsContainer = document.getElementById('album-tabs');
  const tracklistGrid = document.getElementById('verified-tracklist-grid');
  const searchInput = document.getElementById('catalog-search');
  const bannerImg = document.getElementById('album-banner-img');
  const bannerTitle = document.getElementById('album-banner-title');
  const bannerDesc = document.getElementById('album-banner-desc');
  const viewHeatBtn = document.getElementById('view-heat-album-btn');

  // Preferred display order for the 9 verified albums
  const albumOrder = [
    '[Kinetic]',
    'Starfall',
    'AI Ghost',
    'Glitch',
    'Heat',
    'The Road to Kilbray',
    'Can You Feel It',
    'Human Seas',
    'Basement Frequency'
  ];

  async function initDiscography() {
    try {
      const res = await fetch('assets/verified_discography.json');
      const data = await res.json();
      const albumsObj = data.albums || {};

      // Flatten tracks in preferred album order
      allTracks = [];
      albumOrder.forEach(albName => {
        const alb = albumsObj[albName];
        if (alb && Array.isArray(alb.tracks)) {
          alb.tracks.forEach(t => {
            // Clean up any duplicate title metadata like Words Unspoken
            let displayTitle = t.title;
            if (t.rel_path && t.rel_path.includes('Words Unspoken')) {
              displayTitle = 'Words Unspoken';
            }
            allTracks.push({
              ...t,
              displayTitle
            });
          });
        }
      });

      renderAlbumTabs(albumsObj);
      renderTracks();
    } catch (err) {
      console.error('Failed to load verified_discography.json:', err);
    }
  }

  function renderAlbumTabs(albumsObj) {
    if (!albumTabsContainer) return;
    let html = `<button class="album-tab active" data-album="ALL" role="tab" aria-selected="true">All Releases (${allTracks.length})</button>`;
    albumOrder.forEach(albName => {
      const alb = albumsObj[albName];
      if (!alb) return;
      html += `<button class="album-tab" data-album="${albName}" role="tab" aria-selected="false">${albName} <span class="tab-count">${alb.track_count}</span></button>`;
    });
    albumTabsContainer.innerHTML = html;

    albumTabsContainer.querySelectorAll('.album-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        setAlbumFilter(btn.getAttribute('data-album') || 'ALL');
      });
    });
  }

  function setAlbumFilter(albumName) {
    currentAlbumFilter = albumName;
    if (albumTabsContainer) {
      albumTabsContainer.querySelectorAll('.album-tab').forEach(btn => {
        const isMatch = btn.getAttribute('data-album') === albumName;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
    }

    const meta = albumArtMap[albumName] || albumArtMap['ALL'];
    if (bannerImg) bannerImg.src = meta.art;
    if (bannerTitle) bannerTitle.textContent = meta.title;
    if (bannerDesc) bannerDesc.textContent = meta.desc;

    renderTracks();
  }

  function renderTracks() {
    if (!tracklistGrid) return;

    const q = currentSearchQuery.trim().toLowerCase();
    const filtered = allTracks.filter(t => {
      const matchAlbum = currentAlbumFilter === 'ALL' || t.album === currentAlbumFilter;
      const matchSearch = !q ||
        t.displayTitle.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q);
      return matchAlbum && matchSearch;
    });

    if (filtered.length === 0) {
      tracklistGrid.innerHTML = `<div class="empty-catalog-msg">No verified tracks match "${currentSearchQuery}".</div>`;
      return;
    }

    tracklistGrid.innerHTML = filtered.map((t, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      const ytInfo = trackYouTubeMap[t.displayTitle];
      const actionHtml = ytInfo
        ? `<button class="track-play-action has-video" data-title="${t.displayTitle}">▶ WATCH MV</button>`
        : `<span class="track-verified-tag" title="Verified Master (${t.bitrate_kbps} kbps)">MASTER ✓</span>`;

      return `
        <div class="track-item ${ytInfo ? 'playable-row' : ''}" data-title="${t.displayTitle}" data-album="${t.album}">
          <div class="track-num">${num}</div>
          <div class="track-info">
            <h4>${t.displayTitle}</h4>
            <p><span class="track-album-pill">${t.album}</span> &bull; ${t.bitrate_kbps} kbps Master</p>
          </div>
          <span class="track-dur">${t.duration_fmt}</span>
          ${actionHtml}
        </div>
      `;
    }).join('');

    // Attach click handlers
    tracklistGrid.querySelectorAll('.track-item').forEach(row => {
      row.addEventListener('click', () => {
        const title = row.getAttribute('data-title');
        const album = row.getAttribute('data-album');
        const ytInfo = trackYouTubeMap[title];
        if (ytInfo) {
          playYouTubeVideo(ytInfo.vid, ytInfo.title, ytInfo.desc, ytInfo.tag, true);
          showToast(`Now streaming "${title}" in Visual Chronicles Theater`);
        } else {
          showToast(`"${title}" (${album}) — Verified Master indexed for Private CDN streaming.`);
        }
      });
    });
  }

  searchInput?.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value || '';
    renderTracks();
  });

  viewHeatBtn?.addEventListener('click', () => {
    setAlbumFilter('Heat');
    document.getElementById('discography')?.scrollIntoView({ behavior: 'smooth' });
  });

  initDiscography();


  // ==========================================
  // 3. MERCHANDISE & CART SYSTEM (AtomicHamsters LLC)
  // ==========================================
  let cart = [];
  try {
    const savedCart = localStorage.getItem('liedan_cart');
    if (savedCart) cart = JSON.parse(savedCart);
  } catch (e) {
    cart = [];
  }

  const cartBadge = document.getElementById('cart-badge');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartDialog = document.getElementById('cart-dialog');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalVal = document.getElementById('cart-subtotal-val');
  const stripeCheckoutBtn = document.getElementById('stripe-checkout-btn');
  const downloadVaultBtn = document.getElementById('download-vault-btn');

  function saveCart() {
    localStorage.setItem('liedan_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty. Grab some gear!</p>';
      if (cartSubtotalVal) cartSubtotalVal.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = cart.map((item, idx) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      return `
        <div class="cart-item-row" data-idx="${idx}">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-meta">
              ${item.size ? `<span class="cart-item-size">Size: ${item.size}</span> &bull; ` : ''}
              <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-qty-control">
              <button class="qty-btn dec-qty" data-idx="${idx}" aria-label="Decrease">&minus;</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn inc-qty" data-idx="${idx}" aria-label="Increase">&#43;</button>
              <button class="remove-btn" data-idx="${idx}" aria-label="Remove item">Remove</button>
            </div>
          </div>
          <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        </div>
      `;
    }).join('');

    if (cartSubtotalVal) {
      cartSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;
    }

    cartItemsContainer.querySelectorAll('.inc-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (cart[i]) {
          cart[i].quantity += 1;
          saveCart();
        }
      });
    });

    cartItemsContainer.querySelectorAll('.dec-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (cart[i]) {
          cart[i].quantity -= 1;
          if (cart[i].quantity <= 0) {
            cart.splice(i, 1);
          }
          saveCart();
        }
      });
    });

    cartItemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (cart[i]) {
          cart.splice(i, 1);
          saveCart();
        }
      });
    });
  }

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const img = card.dataset.img;
      const sizeSelect = card.querySelector('.size-select');
      const size = sizeSelect ? sizeSelect.value : null;

      const existingItem = cart.find(item => item.id === id && item.size === size);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, img, size, quantity: 1 });
      }

      saveCart();
      showToast(`Added "${name}" to your cart!`);
    });
  });

  downloadVaultBtn?.addEventListener('click', () => {
    const vaultItem = {
      id: 'feral-vault-master',
      name: 'FERAL: Lossless 9x16 Master + Heat Digital Single',
      price: 3.99,
      img: 'assets/realism/liedan_feral_corridor_prowl.jpg',
      size: 'Lossless Digital Download',
      quantity: 1
    };

    const exists = cart.find(item => item.id === vaultItem.id);
    if (!exists) {
      cart.push(vaultItem);
    }
    saveCart();
    cartDialog?.showModal();
    showToast('FERAL Master Bundle added to cart!');
  });

  openCartBtn?.addEventListener('click', () => {
    updateCartUI();
    cartDialog?.showModal();
  });

  closeCartBtn?.addEventListener('click', () => {
    cartDialog?.close();
  });

  cartDialog?.addEventListener('click', (e) => {
    if (e.target === cartDialog) {
      cartDialog.close();
    }
  });

  stripeCheckoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty.');
      return;
    }

    stripeCheckoutBtn.disabled = true;
    stripeCheckoutBtn.textContent = 'Redirecting to Stripe...';

    setTimeout(() => {
      showToast('⚡ Connecting to AtomicHamsters LLC Stripe Checkout Session...');
      setTimeout(() => {
        alert(
          'Stripe Checkout Session Initiated!\n\n' +
          'Parent Entity: AtomicHamsters LLC\n' +
          `Items: ${cart.reduce((s, i) => s + i.quantity, 0)}\n` +
          `Total: ${cartSubtotalVal ? cartSubtotalVal.textContent : '$0.00'}\n\n` +
          'In production, this routes securely to the stripe.redirectToCheckout endpoint.'
        );
        stripeCheckoutBtn.disabled = false;
        stripeCheckoutBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          Proceed to Stripe Checkout
        `;
      }, 1000);
    }, 600);
  });

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'cyber-toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('visible');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  updateCartUI();
});
