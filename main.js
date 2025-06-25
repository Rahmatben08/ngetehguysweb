const products = [
  {
    id: 1,
    nama: "Es Teh Lemon",
    harga: 8000,
    kategori: "lemon",
    gambar: "img/lemon.jpg",
    deskripsi: "Segarnya teh dicampur lemon asli!"
  },
  {
    id: 2,
    nama: "Es Teh Susu",
    harga: 10000,
    kategori: "susu",
    gambar: "img/susu.jpg",
    deskripsi: "Perpaduan teh dan susu creamy!"
  },
  {
    id: 3,
    nama: "Es Teh Madu",
    harga: 10000,
    kategori: "madu",
    gambar: "img/madu.jpg",
    deskripsi: "Perpaduan teh dan madu pilihan!"
  },
  {
    id: 4,
    nama: "Es Teh Less Sugar",
    harga: 8000,
    kategori: "less sugar",
    gambar: "img/last sugar.jpg",
    deskripsi: "Perpaduan teh dan sedikit gula!"
  },
  {
    id: 5,
    nama: "Es Teh Coklat",
    harga: 12500,
    kategori: "coklat",
    gambar: "img/coklat.jpg",
    deskripsi: "Perpaduan teh dan coklat asli Indonesia!"
  },
  {
    id: 6,
    nama: "Es Teh Sirsak",
    harga: 7000,
    kategori: "sirsak",
    gambar: "img/sirsak.jpg",
    deskripsi: "Perpaduan teh dan sirsak asli aceh!"
  },
  {
    id: 7,
    nama: "Es Teh Mangga",
    harga: 7000,
    kategori: "mangga",
    gambar: "img/mangga.jpg",
    deskripsi: "Perpaduan teh dan mangga khas Lampung selatan!"
  },
  {
    id: 8,
    nama: "Es Teh Jambu",
    harga: 7000,
    kategori: "jambu",
    gambar: "img/jambu.jpg",
    deskripsi: "Perpaduan teh dan jambu merah khas Lampung!"
  },
  {
    id: 9,
    nama: "Es Teh Green Tea",
    harga: 15000,
    kategori: "green tea",
    gambar: "img/grentea.jpg",
    deskripsi: "Perpaduan teh dan green tea khas Bangka!"
  },
  {
    id: 10,
    nama: "Es Teh Cappuccino",
    harga: 15000,
    kategori: "cappuccino",
    gambar: "img/capucino.jpg",
    deskripsi: "Perpaduan teh dan kopi asli Ogan Ilir!"
  }
];

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  const elem = document.getElementById('cart-count');
  if (elem) {
    elem.textContent = count;
  }
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(x => x.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Produk ditambahkan ke keranjang!');
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(x => x.id === id);
  if (item) {
    item.qty--;
    if (item.qty <= 0) {
      cart = cart.filter(x => x.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
  }
}

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const container = document.getElementById('cart-container');
  const totalElement = document.getElementById('total-price');
  
  if (!container) {
    return;
  }
  
  container.innerHTML = '';
  let totalPrice = 0;

  if (cartItems.length === 0) {
    container.innerHTML = '<p>Keranjang kosong</p>';
  } else {
    cartItems.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      if (product) {
        const subtotalPrice = cartItem.qty * product.harga;
        totalPrice += subtotalPrice;
        container.innerHTML += `
          <div class="product-card">
            <img src="${product.gambar}" alt="${product.nama}" style="width: 100%; height:150px; object-fit:cover; border-radius:8px;">
            <h4>${product.nama}</h4>
            <p>Jumlah: ${cartItem.qty}</p>
            <p>Subtotal: Rp${subtotalPrice.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})" class="btn">Tambah</button>
            <button onclick="removeFromCart(${product.id})" class="btn">Kurang</button>
          </div>
        `;
      }
    });
  }

  if (totalElement) {
    totalElement.textContent = `Rp${totalPrice.toLocaleString()}`;
  }
}

function loadCheckoutProducts() {
  const cartList = document.getElementById('checkout-products');
  const totalElement = document.getElementById('total-price');
  
  if (!cartList) {
    return;
  }
  
  cartList.innerHTML = '';
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  let totalPrice = 0;

  if (cartItems.length === 0) {
    cartList.innerHTML = '<p>Tidak ada produk untuk checkout</p>';
  } else {
    cartItems.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      if (product) {
        const subtotalPrice = cartItem.qty * product.harga;
        totalPrice += subtotalPrice;
        const cardElement = document.createElement('div');
        cardElement.className = 'product-card';
        cardElement.innerHTML = `
          <img src="${product.gambar}" alt="${product.nama}" width="100">
          <h4>${product.nama}</h4>
          <p>Qty: ${cartItem.qty}</p>
          <p>Rp${subtotalPrice.toLocaleString()}</p>
        `;
        cartList.appendChild(cardElement);
      }
    });
  }

  if (totalElement) {
    totalElement.textContent = `Rp${totalPrice.toLocaleString()}`;
  }
}

// Event listener untuk checkout form
document.addEventListener('DOMContentLoaded', function() {
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nama = document.getElementById('nama').value;
      const email = document.getElementById('email').value;
      const telepon = document.getElementById('telepon').value;
      const alamat = document.getElementById('alamat').value;

      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      if (cartItems.length === 0) {
        alert('Keranjang kosong!');
        return;
      }

      let message = `Pesanan dari ${nama}\nEmail: ${email}\nNo. Telepon: ${telepon}\nAlamat: ${alamat}\n\nDetail Pesanan:\n`;
      let totalPrice = 0;
      
      cartItems.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
          const subtotalPrice = cartItem.qty * product.harga;
          totalPrice += subtotalPrice;
          message += `${product.nama} (x${cartItem.qty}) - Rp${subtotalPrice.toLocaleString()}\n`;
        }
      });
      
      message += `\nTotal: Rp${totalPrice.toLocaleString()}`;

      const waNumber = '6289690539494';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');

      localStorage.removeItem('cart');
      updateCartCount();
      alert('Pesanan telah dikirim via WhatsApp!');
      window.location.href = 'index.html';
    });
  }
});

// Render products di katalog
if (document.getElementById('product-list')) {
  const listElement = document.getElementById('product-list');
  
  function renderProducts(filter = 'all', search = '') {
    listElement.innerHTML = '';
    products
      .filter(p => (filter === 'all' || p.kategori === filter) && p.nama.toLowerCase().includes(search.toLowerCase()))
      .forEach(product => {
        listElement.innerHTML += `
          <div class="product-card" data-aos="fade-up">
            <img src="${product.gambar}" alt="${product.nama}" width="100%" onerror="this.src='img/fallback.jpg'">
            <h4>${product.nama}</h4>
            <p>Rp${product.harga.toLocaleString()}</p>
            <a href="detail.html?id=${product.id}" class="btn">Detail</a>
            <button onclick="addToCart(${product.id})" class="btn">Tambah ke Keranjang</button>
          </div>`;
      });
  }

  const filterElement = document.getElementById('filter');
  const searchElement = document.getElementById('search');
  
  if (filterElement) {
    filterElement.onchange = e => renderProducts(e.target.value, searchElement ? searchElement.value : '');
  }
  if (searchElement) {
    searchElement.oninput = e => renderProducts(filterElement ? filterElement.value : 'all', e.target.value);
  }
  
  renderProducts();
}

// Detail produk
if (window.location.href.includes("detail.html")) {
  const id = new URLSearchParams(window.location.search).get('id');
  const product = products.find(p => p.id == id);
  const detailElement = document.getElementById('product-detail');
  
  if (product && detailElement) {
    detailElement.innerHTML = `
      <img src="${product.gambar}" alt="${product.nama}" width="300" onerror="this.src='img/fallback.jpg'">
      <h2>${product.nama}</h2>
      <p>${product.deskripsi}</p>
      <p>Harga: Rp${product.harga.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})" class="btn">Tambah ke Keranjang</button>
    `;
  }
}

// Initialize saat halaman dimuat
window.addEventListener('load', function() {
  updateCartCount();
  loadCart();
  loadCheckoutProducts();
});