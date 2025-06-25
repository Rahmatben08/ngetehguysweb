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
    harga: 15000,
    kategori: "coklat",
    gambar: "img/coklat.jpg",
    deskripsi: "Perpaduan teh dan coklat asli Indonesia!"
  },
  {
    id: 6,
    nama: "Es Teh Sirsak",
    harga: 12000,
    kategori: "sirsak",
    gambar: "img/sirsak.jpg",
    deskripsi: "Perpaduan teh dan sirsak Sumatra!"
  },
  {
    id: 7,
    nama: "Es Teh Mangga",
    harga: 8000,
    kategori: "mangga",
    gambar: "img/mangga.jpg",
    deskripsi: "Perpaduan teh dan mangga arum manis!"
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
  alert("Produk ditambahkan ke keranjang!");
}

if (document.getElementById('product-list')) {
  const list = document.getElementById('product-list');
  function renderProducts(filter = 'all', search = '') {
    list.innerHTML = '';
    products
      .filter(p => (filter === 'all' || p.kategori === filter) && p.nama.toLowerCase().includes(search.toLowerCase()))
      .forEach(p => {
        list.innerHTML += `
          <div class="product-card" data-aos="fade-up">
            <img src="${p.gambar}" alt="${p.nama}" width="100%" onerror="this.src='img/fallback.jpg'">
            <h4>${p.nama}</h4>
            <p>Rp${p.harga}</p>
            <a href="detail.html?id=${p.id}" class="btn">Detail</a>
          </div>`;
      });
  }
  
  document.getElementById('filter').onchange = e => renderProducts(e.target.value, document.getElementById('search').value);
  document.getElementById('search').oninput = e => renderProducts(document.getElementById('filter').value, e.target.value);
  renderProducts();
}

if (window.location.href.includes("detail.html")) {
  const id = new URLSearchParams(window.location.search).get('id');
  const p = products.find(x => x.id == id);
  document.getElementById('product-detail').innerHTML = `
    <img src="${p.gambar}" alt="${p.nama}" width="300" onerror="this.src='img/fallback.jpg'">
    <h2>${p.nama}</h2>
    <p>${p.deskripsi}</p>
    <p>Harga: Rp${p.harga}</p>
    <button onclick="addToCart(${p.id})" class="btn">Tambah ke Keranjang</button>
  `;
}