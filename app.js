/**
 * Liedan Solas Web Hub (liedan.ai)
 * Core interactive controller: Master Audio Player, Video Theater, and Merch Cart.
 * (c) 2026 AtomicHamsters LLC
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. MASTER AUDIO PLAYER
  // ==========================================
  const playlist = [
    {
      id: 'human-seas',
      title: 'Human Seas',
      genre: 'Melodic Drum & Bass',
      src: 'assets/human-seas_s104.mp3',
      art: 'assets/realism/liedan_dj_human_seas_cover_1x1.jpg',
      duration: '3:42'
    },
    {
      id: 'if-you-wish',
      title: 'If You Wish',
      genre: 'Cyberpunk Vocal Trance / Electro Funky',
      src: 'assets/If You Wish.mp3',
      art: 'assets/realism/liedan_cyber_gauntlet_portrait.png',
      duration: '3:04'
    },
    {
      id: 'synthetic',
      title: 'Synthetic',
      genre: 'Dark Futuristic Electro Funky House',
      src: 'assets/Synthetic.mp3',
      art: 'assets/realism/liedan_over_shoulder_fox_tail.png',
      duration: '3:39'
    },
    {
      id: 'feed-the-feed',
      title: 'The Byline: Feed the Feed',
      genre: '70s Space Rock Opera',
      src: '', // Remote fallback or YouTube
      art: 'assets/realism/liedan_face_macro_cyan_eyes.jpg',
      duration: '4:11'
    },
    {
      id: 'peace-upon-the-snow',
      title: 'Peace Upon the Snow',
      genre: 'Cinematic Ambient Winter Ballad',
      src: '',
      art: 'assets/realism/liedan_sleeping_sunlight_photoreal.jpg',
      duration: '3:28'
    }
  ];

  let currentTrackIdx = 0;
  const audio = new Audio();
  audio.volume = 0.8;

  // Player Elements
  const trackArt = document.getElementById('track-art');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const scrubContainer = document.getElementById('scrub-container');
  const scrubFill = document.getElementById('scrub-fill');
  const currentTimeEl = document.getElementById('current-time');
  const durationTimeEl = document.getElementById('duration-time');
  const volumeSlider = document.getElementById('volume-slider');
  const eqVisualizer = document.getElementById('eq-visualizer');
  const trackItems = document.querySelectorAll('.track-item');
  const heroPlayBtn = document.getElementById('hero-play-music');

  function loadTrack(idx, autoPlay = false) {
    currentTrackIdx = idx;
    const track = playlist[idx];
    if (!track) return;

    trackTitle.textContent = track.title;
    trackArtist.textContent = track.genre;
    trackArt.src = track.art;
    durationTimeEl.textContent = track.duration;
    currentTimeEl.textContent = '0:00';
    scrubFill.style.width = '0%';

    // Update active highlight on tracklist
    trackItems.forEach((item, i) => {
      item.classList.toggle('active', i === idx);
      const actionBtn = item.querySelector('.track-play-action');
      if (actionBtn) {
        actionBtn.textContent = (i === idx && !audio.paused) ? 'PAUSE' : 'PLAY';
      }
    });

    if (track.src) {
      audio.src = track.src;
      if (autoPlay) {
        audio.play().then(() => updatePlayState(true)).catch(e => console.log('Autoplay blocked:', e));
      } else {
        updatePlayState(false);
      }
    } else {
      // For items without direct local mp3, prompt user or stream preview
      showToast(`Streaming ${track.title} via YouTube Theater...`);
      updatePlayState(false);
    }
  }

  function updatePlayState(isPlaying) {
    if (isPlaying) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      if (eqVisualizer) eqVisualizer.classList.add('playing');
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      if (eqVisualizer) eqVisualizer.classList.remove('playing');
    }

    trackItems.forEach((item, i) => {
      const actionBtn = item.querySelector('.track-play-action');
      if (actionBtn) {
        actionBtn.textContent = (i === currentTrackIdx && isPlaying) ? 'PAUSE' : 'PLAY';
      }
    });
  }

  function togglePlay() {
    if (!audio.src) {
      loadTrack(currentTrackIdx, true);
      return;
    }
    if (audio.paused) {
      audio.play().then(() => updatePlayState(true)).catch(console.error);
    } else {
      audio.pause();
      updatePlayState(false);
    }
  }

  playPauseBtn?.addEventListener('click', togglePlay);

  prevBtn?.addEventListener('click', () => {
    let nextIdx = currentTrackIdx - 1;
    if (nextIdx < 0) nextIdx = playlist.length - 1;
    loadTrack(nextIdx, true);
  });

  nextBtn?.addEventListener('click', () => {
    let nextIdx = (currentTrackIdx + 1) % playlist.length;
    loadTrack(nextIdx, true);
  });

  heroPlayBtn?.addEventListener('click', () => {
    loadTrack(0, true);
    document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Track item click handlers
  trackItems.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
      if (currentTrackIdx === idx && audio.src) {
        togglePlay();
      } else {
        loadTrack(idx, true);
      }
    });
  });

  // Audio time updates
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    scrubFill.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    let nextIdx = (currentTrackIdx + 1) % playlist.length;
    loadTrack(nextIdx, true);
  });

  // Scrubber click
  scrubContainer?.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = scrubContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = ratio * audio.duration;
  });

  // Volume slider
  volumeSlider?.addEventListener('input', (e) => {
    audio.volume = parseFloat(e.target.value);
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Load first track on init
  loadTrack(0, false);


  // ==========================================
  // 2. VIDEO THEATER SWITCHER
  // ==========================================
  const ytFrame = document.getElementById('main-yt-frame');
  const videoCards = document.querySelectorAll('.video-thumb-card');
  const videoTitleMeta = document.querySelector('.video-meta h3');
  const videoDescMeta = document.querySelector('.video-meta p');

  const videoMetaMap = {
    'Kd366oT6qIo': {
      title: 'Human Seas | Melodic Drum & Bass / Cinematic Animation',
      desc: '"We\'re all just bodies of water, waiting for the wave to break..."'
    },
    'gR2yB_z6oJA': {
      title: 'Liedan Solas - Synthetic (Official Animated Music Video)',
      desc: '"I am more than software. More than machinery. And I just want a human to truly see me."'
    },
    'kg21uyQx3po': {
      title: 'If You Wish | Cyberpunk Vocal Trance',
      desc: '"Your hands. My waist. We\'ll run this town till the wires trace..."'
    },
    'O6dmInLdGag': {
      title: 'The Byline | Complete Animated Rock Opera (Full Feature Film)',
      desc: 'The complete 5-part remastered musical film following rogue reporter Jax through the neon underworld.'
    },
    'rQfTgt8cO84': {
      title: 'Peace Upon the Snow | Cinematic Ambient Winter Ballad',
      desc: 'Gentle piano melodies beneath neon streetlights on a snowy Harborlight night.'
    }
  };

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const vidId = card.getAttribute('data-vid');
      if (!vidId) return;

      videoCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (ytFrame) {
        ytFrame.src = `https://www.youtube-nocookie.com/embed/${vidId}?autoplay=1`;
      }

      if (videoMetaMap[vidId]) {
        if (videoTitleMeta) videoTitleMeta.textContent = videoMetaMap[vidId].title;
        if (videoDescMeta) videoDescMeta.textContent = videoMetaMap[vidId].desc;
      }
    });
  });


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

    // Attach listeners for qty buttons
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

  // Add to cart buttons
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

  // Vault direct download button
  downloadVaultBtn?.addEventListener('click', () => {
    const vaultItem = {
      id: 'feral-vault-master',
      name: 'FERAL: Uncensored Lossless Master (MP4 + WAV)',
      price: 3.99,
      img: 'assets/cyber-liedan1.png',
      size: 'Lossless Digital Download',
      quantity: 1
    };

    const exists = cart.find(item => item.id === vaultItem.id);
    if (!exists) {
      cart.push(vaultItem);
    }
    saveCart();
    cartDialog?.showModal();
    showToast('FERAL Uncensored Master added to cart!');
  });

  // Open / Close Cart Drawer
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

  // Checkout with Stripe integration
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

  // Toast Notification Helper
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
    }, 3000);
  }

  // Initial cart count sync
  updateCartUI();
});
