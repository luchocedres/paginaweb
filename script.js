let carrito = [];

// 1. Cargar productos al iniciar
fetch('/api/productos')
    .then(res => res.json())
    .then(data => renderizar(data));

function renderizar(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = productos.map(p => `
        <div class="card" data-cat="${p.habitacion}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button onclick="agregar('${p.nombre}', ${p.precio})">Agregar</button>
        </div>
    `).join('');
}

function agregar(nombre, precio) {
    const item = carrito.find(i => i.nombre === nombre);
    if (item) item.cantidad++;
    else carrito.push({ nombre, precio, cantidad: 1 });
    actualizarUI();
}

function restar(nombre) {
    const item = carrito.find(i => i.nombre === nombre);
    if (item) {
        if (item.cantidad > 1) item.cantidad--;
        else carrito = carrito.filter(i => i.nombre !== nombre);
    }
    actualizarUI();
}

function actualizarUI() {
    const lista = document.getElementById('lista-carrito');
    const seccion = document.getElementById('carrito-seccion');
    let total = 0;

    seccion.style.display = carrito.length > 0 ? 'block' : 'none';
    lista.innerHTML = '';

    carrito.forEach(i => {
        total += i.precio * i.cantidad;
        lista.innerHTML += `<li>${i.nombre} x${i.cantidad} <button onclick="restar('${i.nombre}')">-</button></li>`;
    });
    document.getElementById('total').innerText = total;
}

function enviarWhatsApp() {
    let msg = "Hola! Mi pedido es:%0A";
    carrito.forEach(i => msg += `- ${i.nombre} x${i.cantidad}%0A`);
    msg += "Total: $" + document.getElementById('total').innerText;
    window.open(`https://wa.me/5491100000000?text=${msg}`); // Poné tu número acá
}

function filtrar(cat) {
    document.querySelectorAll('.card').forEach(c => {
        c.style.display = (cat === 'todos' || c.dataset.cat === cat) ? 'block' : 'none';
    });
}