
import { useEffect, useMemo, useState } from 'react';
import AuthPage from './AuthPage';
import {
    Search, ShoppingBag, Heart, Menu, X, ArrowRight, Star,
    Plus, Minus, Truck, ShieldCheck, RotateCcw, ArrowLeft
} from 'lucide-react';
import './App.css';

const API = 'http://localhost:8080/api';


const seedProducts = [
    { id: 1, name: 'Everyday Linen Shirt', category: 'Women', price: 699, oldPrice: 999, rating: 4.8, tag: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85' },
    { id: 2, name: 'Classic Oversized Tee', category: 'Men', price: 449, oldPrice: 699, rating: 4.7, tag: 'TRENDING', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85' },
    { id: 3, name: 'Soft Pastel Kurta Set', category: 'Ethnic', price: 1199, oldPrice: 1699, rating: 4.9, tag: 'NEW', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85' },
    { id: 4, name: 'Everyday Shoulder Bag', category: 'Accessories', price: 599, oldPrice: 899, rating: 4.6, tag: 'JUST IN', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85' },
    { id: 5, name: 'Weekend Denim Jacket', category: 'Women', price: 1299, oldPrice: 1899, rating: 4.8, tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85' },
    { id: 6, name: 'Minimal Everyday Sneakers', category: 'Men', price: 999, oldPrice: 1499, rating: 4.7, tag: 'VALUE PICK', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85' },
    { id: 7, name: 'Gold Tone Hoop Earrings', category: 'Accessories', price: 249, oldPrice: 399, rating: 4.5, tag: 'UNDER ₹299', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85' },
    { id: 8, name: 'Floral Day Dress', category: 'Women', price: 899, oldPrice: 1299, rating: 4.8, tag: 'NEW', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85' },

    { id: 9, name: 'Casual Crop Top', category: 'Women', price: 399, oldPrice: 599, rating: 4.6, tag: 'TRENDING', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85' },
    { id: 10, name: 'Cotton Daily Kurti', category: 'Women', price: 599, oldPrice: 899, rating: 4.7, tag: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?auto=format&fit=crop&w=900&q=85' },
    { id: 11, name: 'Wide Leg Denim Jeans', category: 'Women', price: 899, oldPrice: 1299, rating: 4.5, tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85' },
    { id: 12, name: 'Elegant Maxi Dress', category: 'Women', price: 1099, oldPrice: 1599, rating: 4.8, tag: 'NEW', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85' },

    { id: 13, name: 'Classic Polo T-Shirt', category: 'Men', price: 499, oldPrice: 749, rating: 4.6, tag: 'VALUE PICK', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=85' },
    { id: 14, name: 'Smart Casual Shirt', category: 'Men', price: 749, oldPrice: 1099, rating: 4.7, tag: 'NEW', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85' },
    { id: 15, name: 'Everyday Jogger Pants', category: 'Men', price: 699, oldPrice: 999, rating: 4.5, tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85' },
    { id: 16, name: 'Comfort Hoodie', category: 'Men', price: 899, oldPrice: 1299, rating: 4.8, tag: 'TRENDING', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85' },

    { id: 17, name: 'Printed Anarkali Kurti', category: 'Ethnic', price: 899, oldPrice: 1299, rating: 4.7, tag: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85' },
    { id: 18, name: 'Festive Salwar Set', category: 'Ethnic', price: 1499, oldPrice: 1999, rating: 4.8, tag: 'NEW', image: 'https://images.unsplash.com/photo-1583391733981-849840e8a7e8?auto=format&fit=crop&w=900&q=85' },
    { id: 19, name: 'Classic Cotton Kurta', category: 'Ethnic', price: 649, oldPrice: 949, rating: 4.6, tag: 'VALUE PICK', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=85' },

    { id: 20, name: 'Chic Sling Bag', category: 'Accessories', price: 499, oldPrice: 799, rating: 4.7, tag: 'TRENDING', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85' },
    { id: 21, name: 'Classic Sunglasses', category: 'Accessories', price: 299, oldPrice: 499, rating: 4.5, tag: 'JUST IN', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85' },
    { id: 22, name: 'Elegant Pendant Necklace', category: 'Accessories', price: 349, oldPrice: 599, rating: 4.6, tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85' },
    { id: 23, name: 'Minimal Bracelet', category: 'Accessories', price: 199, oldPrice: 349, rating: 4.4, tag: 'UNDER ₹299', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85' },
    { id: 24, name: 'Everyday Wallet', category: 'Accessories', price: 399, oldPrice: 599, rating: 4.5, tag: 'NEW', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85' }
];

const categories = ['All', 'Women', 'Men', 'Ethnic', 'Accessories'];
const money = n => '₹' + Number(n || 0).toLocaleString('en-IN');

const detailDescriptions = {
    Women: 'Refresh your everyday wardrobe with this versatile style. Easy to pair with your favourite essentials.',
    Men: 'A versatile wardrobe essential designed for everyday wear. Pair it with your favourite jeans or trousers.',
    Ethnic: 'Celebrate timeless style with this elegant ethnic pick. Perfect for festive occasions and family gatherings.',
    Accessories: 'Complete your look with this carefully selected accessory.',
    Shoes: 'Step into everyday comfort and style.'
};

function readSavedOrders() {
    try {
        const saved = JSON.parse(localStorage.getItem('snapcard_orders') || '[]');
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function mapServerOrder(order) {
    const items = (order.items || []).map(item => ({
        id: item.productId ?? item.id ?? item.product_id ?? 0,
        name: item.name || item.productName || 'Product',
        price: Number(item.price || 0),
        qty: Number(item.quantity ?? item.qty ?? 1),
        selectedSize: item.selectedSize || '',
        image: item.imageUrl || item.image || ''
    }));

    return {
        id: order.id ?? `SC${Date.now()}`,
        date: order.orderDate
            ? new Date(order.orderDate).toLocaleString('en-IN')
            : order.date || '',
        customer: order.customerName || order.customer || 'Guest',
        email: order.email || '',
        items,
        total: Number(order.total || 0),
        status: order.status || 'Order placed'
    };
}

export default function App() {
    const [products, setProducts] = useState(seedProducts);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [notice, setNotice] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const [authPage, setAuthPage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [orders, setOrders] = useState(readSavedOrders);
    const [ordersOpen, setOrdersOpen] = useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);

    const showNotice = message => {
        setNotice(message);
        window.setTimeout(() => setNotice(''), 2500);
    };

    useEffect(() => {
        try {
            localStorage.setItem('snapcard_orders', JSON.stringify(orders));
        } catch (error) {
            console.warn('Could not save order history locally:', error);
        }
    }, [orders]);


    // Load products from the Spring Boot backend.
    useEffect(() => {
        fetch(`${API}/products`)
            .then(response => {
                if (!response.ok) throw new Error('Products API unavailable');
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length) {
                    const backendProducts = data.map((product, index) => {
                        const fallback = seedProducts[index % seedProducts.length];

                        const matchedCategory = categories.find(
                            item =>
                                item.toLowerCase() ===
                                String(product.category || '').toLowerCase()
                        );

                        return {
                            ...fallback,
                            ...product,
                            id: product.id ?? fallback.id,
                            category: matchedCategory || product.category || 'Uncategorized', image: product.imageUrl || product.image || fallback.image,
                            oldPrice: product.oldPrice ?? fallback.oldPrice,
                            rating: product.rating ?? fallback.rating,
                            tag: product.tag || fallback.tag
                        };
                    });

                    setProducts(backendProducts);
                }
            })
            .catch(error => {
                console.warn('Products loading error:', error);
            });
    }, []);

    // Load saved orders from the backend as well as the browser.

    // Migrate old browser orders to MySQL and load server order history.
    useEffect(() => {
        const migrateAndLoadOrders = async () => {
            const localOrders = readSavedOrders();
            const pendingOrders = [];

            try {
                // First, get orders already saved in MySQL.
                const firstResponse = await fetch(`${API}/orders`);

                if (!firstResponse.ok) {
                    throw new Error('Could not load orders from backend.');
                }

                const firstData = await firstResponse.json();
                const serverIds = new Set(
                    firstData.map(order => String(order.id))
                );

                // Transfer old localStorage orders that are not in MySQL.
                for (const oldOrder of localOrders) {
                    if (serverIds.has(String(oldOrder.id))) {
                        continue;
                    }

                    const orderData = {
                        customerName: oldOrder.customer || 'Guest',
                        email: oldOrder.email || '',
                        items: (oldOrder.items || []).map(item => ({
                            productId: item.productId ?? item.id ?? null,
                            name: item.name || 'Product',
                            price: Number(item.price || 0),
                            quantity: Number(item.qty ?? item.quantity ?? 1),
                            selectedSize: item.selectedSize || null,
                            imageUrl: item.imageUrl || item.image || ''
                        }))
                    };

                    if (orderData.items.length === 0) {
                        pendingOrders.push(oldOrder);
                        continue;
                    }

                    try {
                        const saveResponse = await fetch(`${API}/orders`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(orderData)
                        });

                        if (!saveResponse.ok) {
                            throw new Error('Could not migrate this order');
                        }

                        const saved = await saveResponse.json();
                        serverIds.add(String(saved.id));
                    } catch (error) {
                        console.error('Order migration failed:', error);
                        pendingOrders.push(oldOrder);
                    }
                }

                // Load the final order list from MySQL.
                const finalResponse = await fetch(`${API}/orders`);

                if (!finalResponse.ok) {
                    throw new Error('Could not reload MySQL orders.');
                }

                const finalData = await finalResponse.json();
                const serverOrders = finalData.map(mapServerOrder);

                // Keep only orders that could not be migrated.
                setOrders([...serverOrders, ...pendingOrders]);
            } catch (error) {
                console.error('Order migration error:', error);
                showNotice('Could not sync orders. Please check backend.');
            }
        };

        migrateAndLoadOrders();
    }, []);


    // Browser Back button handling for the login/signup screen.
    useEffect(() => {
        if (!authPage) return;

        window.history.pushState({ snapCardAuthPage: true }, '', window.location.href);

        const handlePopState = () => {
            setAuthPage('');
            setSelectedProduct(null);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [authPage]);

    const filtered = useMemo(
        () => products.filter(product =>
            (category === 'All' ||
                product.category?.toLowerCase() === category.toLowerCase()) &&
            product.name?.toLowerCase().includes(search.toLowerCase())
        ),
        [products, category, search]
    );

    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce(
        (sum, item) => sum + Number(item.price) * item.qty, 0
    );

    const add = (product, size = '') => {
        setCart(previous => {
            const found = previous.find(
                item => String(item.id) === String(product.id) &&
                    (item.selectedSize || '') === size
            );

            return found
                ? previous.map(item =>
                    String(item.id) === String(product.id) &&
                        (item.selectedSize || '') === size
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
                : [...previous, { ...product, selectedSize: size, qty: 1 }];
        });

        showNotice('Added to your bag!');
    };

    const qty = (id, delta, size = '') => {
        setCart(previous =>
            previous.map(item =>
                String(item.id) === String(id) &&
                    (item.selectedSize || '') === size
                    ? { ...item, qty: item.qty + delta }
                    : item
            ).filter(item => item.qty > 0)
        );
    };

    const toggleWish = id => {
        setWishlist(previous =>
            previous.includes(id)
                ? previous.filter(itemId => itemId !== id)
                : [...previous, id]
        );
    };

    const openProduct = product => {
        setSelectedProduct(product);
        setSelectedSize('M');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMenuOpen(false);
    };

    const goBackToShop = () => {
        setSelectedProduct(null);
        window.setTimeout(() => {
            document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    // IMPORTANT: save the order through Spring Boot before showing success.
    const placeOrder = async () => {
        if (cart.length === 0) {
            showNotice('Your bag is empty.');
            return;
        }

        if (placingOrder) return;

        const orderData = {
            customerName: currentUser?.name || 'Guest',
            email: currentUser?.email || '',
            items: cart.map(item => ({
                productId: item.id,
                name: item.name,
                price: Number(item.price),
                quantity: Number(item.qty),
                selectedSize: item.selectedSize || null,
                imageUrl: item.imageUrl || item.image || ''
            }))
        };

        setPlacingOrder(true);

        try {
            const response = await fetch(`${API}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.message || 'Order could not be saved.');
            }

            const savedOrder = {
                id: result.id ?? `SC${Date.now()}`,
                date: result.orderDate
                    ? new Date(result.orderDate).toLocaleString('en-IN')
                    : new Date().toLocaleString('en-IN'),
                customer: result.customerName || orderData.customerName,
                email: result.email || orderData.email,
                items: cart.map(item => ({ ...item })),
                total: Number(result.total ?? total),
                status: result.status || 'Order placed'
            };

            setOrders(previous => [savedOrder, ...previous]);
            setCart([]);
            setCartOpen(false);
            setOrdersOpen(true);
            showNotice('Order placed successfully!');
        } catch (error) {
            console.error('Order placement error:', error);
            showNotice(error.message || 'Order failed. Please try again.');
        } finally {
            setPlacingOrder(false);
        }
    };

    const isAccessory =
        selectedProduct?.category?.toLowerCase() === 'accessories';
    const sizes = isAccessory ? [] : ['S', 'M', 'L', 'XL'];

    return (
        <div className="site">
            <div className="announcement">
                A little style, a lot of savings <span>✦</span> Free delivery on orders above ₹999
            </div>

            <header className="header">
                <button
                    className="icon-btn mobile-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open menu"
                >
                    {menuOpen ? <X /> : <Menu />}
                </button>

                <a className="logo" href="#home" onClick={() => setSelectedProduct(null)}>
                    <span className="logo-mark">S</span>napCard<span className="logo-dot">.</span>
                </a>

                <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
                    <a href="#home" onClick={() => { setSelectedProduct(null); setMenuOpen(false); }}>Home</a>
                    <a href="#shop" onClick={() => { setSelectedProduct(null); setMenuOpen(false); }}>Shop all</a>
                    <a href="#shop" onClick={() => { setSelectedProduct(null); setCategory('Women'); setMenuOpen(false); }}>Women</a>
                    <a href="#shop" onClick={() => { setSelectedProduct(null); setCategory('Men'); setMenuOpen(false); }}>Men</a>
                    <a href="#footer" onClick={() => { setSelectedProduct(null); setMenuOpen(false); }}>Our story</a>
                </nav>

                <div className="header-actions">
                    {currentUser ? (
                        <>
                            <span className="signed-in-label">Hi, {currentUser.name}</span>
                            <button className="outline-btn" onClick={() => {
                                setCurrentUser(null);
                                showNotice('You have signed out.');
                            }}>Sign out</button>
                        </>
                    ) : (
                        <>
                            <button className="outline-btn auth-header-btn" onClick={() => {
                                setAuthPage('login');
                                setSelectedProduct(null);
                            }}>Login</button>
                            <button className="primary-btn auth-header-btn" onClick={() => {
                                setAuthPage('signup');
                                setSelectedProduct(null);
                            }}>Sign up</button>
                        </>
                    )}

                    <label className="searchbox">
                        <Search size={18} />
                        <input
                            value={search}
                            onChange={event => {
                                setSearch(event.target.value);
                                if (selectedProduct) setSelectedProduct(null);
                            }}
                            placeholder="Search styles..."
                        />
                    </label>

                    <button
                        className="icon-btn wish-top"
                        onClick={() => showNotice(
                            wishlist.length
                                ? `${wishlist.length} saved favourite(s)`
                                : 'Tap the heart on a product to save it'
                        )}
                        aria-label="Wishlist"
                    >
                        <Heart />
                        <span>{wishlist.length}</span>
                    </button>

                    <button className="outline-btn" onClick={() => setOrdersOpen(true)}>
                        Orders ({orders.length})
                    </button>

                    <button className="bag-btn" onClick={() => setCartOpen(true)}>
                        <ShoppingBag size={19} />
                        <span>Bag</span>
                        <b>{count}</b>
                    </button>
                </div>
            </header>

            <main>
                {authPage ? (
                    <AuthPage
                        page={authPage}
                        onClose={() => {
                            setAuthPage('');
                            setSelectedProduct(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        onSwitch={page => setAuthPage(page)}
                        onSuccess={user => {
                            setCurrentUser(user);
                            setAuthPage('');
                            showNotice(`Welcome, ${user.name}!`);
                        }}
                    />
                ) : selectedProduct ? (
                    <section className="product-detail-page" style={{
                        maxWidth: '1200px', margin: '0 auto',
                        padding: '30px 5% 80px', minHeight: '70vh'
                    }}>
                        <button onClick={goBackToShop} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            border: 'none', background: 'transparent', cursor: 'pointer',
                            fontSize: '15px', padding: '10px 0', marginBottom: '24px'
                        }}>
                            <ArrowLeft size={18} /> Back to shop
                        </button>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                            gap: 'clamp(24px, 5vw, 65px)', alignItems: 'start'
                        }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    style={{
                                        width: '100%', maxHeight: '680px', objectFit: 'cover',
                                        display: 'block', borderRadius: '8px', background: '#f5f0e9'
                                    }}
                                />
                                <span style={{
                                    position: 'absolute', top: '16px', left: '16px',
                                    background: '#fffefa', padding: '9px 13px',
                                    fontSize: '11px', letterSpacing: '1px', fontWeight: '700'
                                }}>
                                    {selectedProduct.tag || 'SNAP PICK'}
                                </span>
                                <button
                                    onClick={() => toggleWish(selectedProduct.id)}
                                    aria-label="Toggle wishlist"
                                    style={{
                                        position: 'absolute', top: '14px', right: '14px',
                                        width: '42px', height: '42px', borderRadius: '50%',
                                        border: 'none', background: '#fffefa',
                                        color: wishlist.includes(selectedProduct.id) ? '#c34c65' : '#222',
                                        display: 'grid', placeItems: 'center', cursor: 'pointer'
                                    }}
                                >
                                    <Heart size={20} fill={
                                        wishlist.includes(selectedProduct.id) ? 'currentColor' : 'none'
                                    } />
                                </button>
                            </div>

                            <div style={{ paddingTop: '10px' }}>
                                <span style={{
                                    fontSize: '12px', letterSpacing: '2px',
                                    textTransform: 'uppercase', color: '#8b7969'
                                }}>
                                    {selectedProduct.category || 'Fashion'}
                                </span>

                                <h1 style={{
                                    fontSize: 'clamp(30px, 4vw, 46px)',
                                    lineHeight: '1.2', margin: '14px 0', fontWeight: '500'
                                }}>
                                    {selectedProduct.name}
                                </h1>

                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'
                                }}>
                                    <strong style={{ fontSize: '27px' }}>{money(selectedProduct.price)}</strong>
                                    {selectedProduct.oldPrice && (
                                        <del style={{ color: '#999', fontSize: '18px' }}>
                                            {money(selectedProduct.oldPrice)}
                                        </del>
                                    )}
                                    {selectedProduct.oldPrice &&
                                        Number(selectedProduct.oldPrice) > Number(selectedProduct.price) && (
                                            <span style={{ color: '#47734c', fontSize: '13px', fontWeight: '600' }}>
                                                {Math.round((1 - Number(selectedProduct.price) /
                                                    Number(selectedProduct.oldPrice)) * 100)}% OFF
                                            </span>
                                        )}
                                </div>

                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '7px',
                                    margin: '18px 0', fontSize: '14px'
                                }}>
                                    <Star size={16} fill="#d5a344" color="#d5a344" />
                                    <strong>{selectedProduct.rating || '4.7'}</strong>
                                    <span style={{ color: '#777' }}>Customer rating</span>
                                </div>

                                <p style={{
                                    color: '#666', lineHeight: '1.9', fontSize: '15px', margin: '22px 0'
                                }}>
                                    {selectedProduct.description ||
                                        detailDescriptions[selectedProduct.category] ||
                                        'Discover your new favourite from the SnapCard collection.'}
                                </p>

                                {!isAccessory && (
                                    <div style={{ margin: '28px 0' }}>
                                        <div style={{
                                            fontWeight: '600', marginBottom: '13px', fontSize: '14px'
                                        }}>
                                            Select size: <span>{selectedSize}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                            {sizes.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    style={{
                                                        width: '48px', height: '45px',
                                                        border: selectedSize === size ? '1px solid #222' : '1px solid #ddd',
                                                        background: selectedSize === size ? '#222' : '#fffefa',
                                                        color: selectedSize === size ? '#fff' : '#222',
                                                        cursor: 'pointer', borderRadius: '4px'
                                                    }}
                                                >{size}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button onClick={() => add(
                                    selectedProduct, isAccessory ? '' : selectedSize
                                )} style={{
                                    width: '100%', minHeight: '54px', padding: '14px 20px',
                                    marginTop: '14px', background: '#25231f', color: '#fffefa',
                                    border: '1px solid #25231f', display: 'flex',
                                    justifyContent: 'center', alignItems: 'center', gap: '12px',
                                    cursor: 'pointer', fontSize: '15px', fontWeight: '600'
                                }}>
                                    <ShoppingBag size={19} /> Add to bag — {money(selectedProduct.price)}
                                </button>

                                <button onClick={() => toggleWish(selectedProduct.id)} style={{
                                    width: '100%', minHeight: '50px', marginTop: '12px',
                                    background: 'transparent', border: '1px solid #ddd',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    gap: '10px', cursor: 'pointer', fontSize: '14px'
                                }}>
                                    <Heart size={18} fill={
                                        wishlist.includes(selectedProduct.id) ? 'currentColor' : 'none'
                                    } />
                                    {wishlist.includes(selectedProduct.id)
                                        ? 'Saved to wishlist' : 'Add to wishlist'}
                                </button>

                                <div style={{
                                    borderTop: '1px solid #e8e3dc', marginTop: '30px',
                                    paddingTop: '22px', display: 'grid', gap: '18px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                                        <Truck size={21} />
                                        <div>
                                            <strong style={{ fontSize: '14px' }}>Easy delivery</strong>
                                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#777' }}>
                                                Free delivery on orders above ₹999
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                                        <ShieldCheck size={21} />
                                        <div>
                                            <strong style={{ fontSize: '14px' }}>Quality picks</strong>
                                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#777' }}>
                                                Styles chosen for everyday wear
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                                        <RotateCcw size={21} />
                                        <div>
                                            <strong style={{ fontSize: '14px' }}>Easy returns</strong>
                                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#777' }}>
                                                Check the store's return policy before ordering
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '55px' }}>
                            <h2 style={{ fontSize: '27px', fontWeight: '500' }}>You might also love</h2>
                            <p style={{ color: '#777', marginBottom: '25px' }}>
                                More everyday favourites from SnapCard.
                            </p>
                            <div className="product-grid">
                                {products.filter(p => String(p.id) !== String(selectedProduct.id))
                                    .slice(0, 4).map(product => (
                                        <article
                                            className="product-card"
                                            key={product.id}
                                            onClick={() => openProduct(product)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="product-photo">
                                                console.log("IMAGE CHECK:", product.name, product.image);
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                                <span className="product-tag">{product.tag || 'SNAP PICK'}</span>
                                            </div>
                                            <div className="product-info">
                                                <span className="product-category">{product.category}</span>
                                                <h3>{product.name}</h3>
                                                <div className="product-bottom">
                                                    <div>
                                                        <b>{money(product.price)}</b>
                                                        {product.oldPrice && <del>{money(product.oldPrice)}</del>}
                                                    </div>
                                                    <span className="rating">
                                                        <Star size={13} fill="currentColor" /> {product.rating || '4.7'}
                                                    </span>
                                                </div>
                                                <button className="outline-btn" style={{ marginTop: '12px' }}
                                                    onClick={event => {
                                                        event.stopPropagation();
                                                        openProduct(product);
                                                    }}>
                                                    View product <ArrowRight size={15} />
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                            </div>
                        </div>
                    </section>
                ) : (
                    <>
                        <section className="hero" id="home">
                            <div className="hero-copy">
                                <span className="eyebrow"><span className="eyebrow-line" /> THE EVERYDAY EDIT</span>
                                <h1>Your style.<br /><em>Your story.</em></h1>
                                <p>Fresh finds, feel-good fits, and little prices that make a big difference.</p>
                                <a className="primary-btn" href="#shop">
                                    Explore collection <ArrowRight size={18} />
                                </a>
                                <div className="hero-proof">
                                    <div className="avatar-stack"><span>☺</span><span>✿</span><span>♡</span></div>
                                    <span><b>10k+</b> happy shoppers</span>
                                    <span className="proof-star">★★★★★</span>
                                </div>
                            </div>
                            <div className="hero-image">
                                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90" alt="Friends exploring fashionable outfits" />
                                <div className="floating-note">
                                    <span className="note-star">✳</span>
                                    <div><b>Looks you'll love</b><small>Prices you'll love more.</small></div>
                                </div>
                                <div className="hero-sticker">STYLE<br />YOUR<br />WAY</div>
                            </div>
                        </section>

                        <section className="benefits">
                            <div><Truck /><span><b>Easy delivery</b><small>Right to your door</small></span></div>
                            <div><ShieldCheck /><span><b>Quality picks</b><small>Styles worth keeping</small></span></div>
                            <div><RotateCcw /><span><b>Easy returns</b><small>Shopping made simple</small></span></div>
                        </section>

                        <section className="categories-section">
                            <div className="section-heading">
                                <div><span className="eyebrow">FIND YOUR FIT</span><h2>Shop by <em>mood.</em></h2></div>
                                <a href="#shop" className="text-link">View everything <ArrowRight size={16} /></a>
                            </div>
                            <div className="category-grid">
                                {[
                                    { name: 'Women', sub: 'Everyday favourites', img: 'photo-1483985988355-763728e1935b' },
                                    { name: 'Men', sub: 'Easy, effortless style', img: 'photo-1515886657613-9f3515b0c78f' },
                                    { name: 'Ethnic', sub: 'Tradition, reimagined', img: 'photo-1610030469983-98e550d6193c' },
                                    { name: 'Accessories', sub: 'The finishing touch', img: 'photo-1490481651871-ab68de25d43d' }
                                ].map(item => (
                                    <button className="category-card" key={item.name} onClick={() => {
                                        setCategory(item.name);
                                        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                                    }}>
                                        <img src={`https://images.unsplash.com/${item.img}?auto=format&fit=crop&w=700&q=85`} alt={item.name} />
                                        <span className="category-shade" />
                                        <span className="category-label"><b>{item.name}</b><small>{item.sub}</small></span>
                                        <span className="circle-arrow"><ArrowRight size={17} /></span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="shop-section" id="shop">
                            <div className="section-heading shop-heading">
                                <div>
                                    <span className="eyebrow">GOOD STYLE, GOOD PRICE</span>
                                    <h2>The latest <em>and loved.</em></h2>
                                    <p className="muted">Little wardrobe wins, picked just for you.</p>
                                </div>
                                <span className="product-count">{filtered.length} styles to explore</span>
                            </div>

                            <div className="filters">
                                {categories.map(item => (
                                    <button
                                        key={item}
                                        className={category === item ? 'filter active' : 'filter'}
                                        onClick={() => setCategory(item)}
                                    >{item}</button>
                                ))}
                            </div>

                            <div className="product-grid">
                                {filtered.map(product => (
                                    <article className="product-card" key={product.id}
                                        onClick={() => openProduct(product)} style={{ cursor: 'pointer' }}>

                                        <div className="product-photo">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                onError={(event) => {
                                                    event.currentTarget.onerror = null;
                                                    event.currentTarget.src =
                                                        'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85';
                                                }}
                                            />

                                            <span className="product-tag">
                                                {product.tag || 'SNAP PICK'}
                                            </span>

                                            <button
                                                className={wishlist.includes(product.id) ? 'heart-btn selected' : 'heart-btn'}
                                                onClick={event => {
                                                    event.stopPropagation();
                                                    toggleWish(product.id);
                                                }}
                                                aria-label="Save to wishlist"
                                            >
                                                <Heart
                                                    size={18}
                                                    fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                                                />
                                            </button>

                                            <button
                                                className="quick-add"
                                                onClick={event => {
                                                    event.stopPropagation();
                                                    add(product);
                                                }}
                                            >
                                                <Plus size={16} /> Add to bag
                                            </button>
                                        </div>

                                        <div className="product-info">
                                            <span className="product-category">{product.category}</span>
                                            <h3>{product.name}</h3>
                                            <div className="product-bottom">
                                                <div>
                                                    <b>{money(product.price)}</b>
                                                    {product.oldPrice && <del>{money(product.oldPrice)}</del>}
                                                </div>
                                                <span className="rating">
                                                    <Star size={13} fill="currentColor" /> {product.rating || '4.7'}
                                                </span>
                                            </div>
                                            <button className="outline-btn" style={{ marginTop: '12px' }}
                                                onClick={event => {
                                                    event.stopPropagation();
                                                    openProduct(product);
                                                }}>
                                                View details <ArrowRight size={15} />
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {filtered.length === 0 && (
                                <div className="empty-results">No styles found. Try another search or category.</div>
                            )}

                            <div className="center">
                                <button className="outline-btn" onClick={() => {
                                    setCategory('All');
                                    setSearch('');
                                }}>
                                    Explore all styles <ArrowRight size={17} />
                                </button>
                            </div>
                        </section>

                        <section className="promo">
                            <div className="promo-art">
                                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85" alt="Fashion looks" />
                            </div>
                            <div className="promo-copy">
                                <span className="eyebrow">A LITTLE TREAT FROM US</span>
                                <h2>More style.<br /><em>Less spend.</em></h2>
                                <p>Find your next favourite look without stretching your budget. That's the SnapCard way.</p>
                                <a href="#shop" className="primary-btn">Find your favourites <ArrowRight size={18} /></a>
                            </div>
                        </section>
                    </>
                )}
            </main>

            {!selectedProduct && !authPage && (
                <section
                    id="contact-us"
                    style={{ padding: '35px 5%', background: '#fffefa' }}
                >
                    <h2>Contact Us</h2>
                    <p>Need help with your SnapCard order?</p>
                    <p>Email: support@snapcard.example</p>
                </section>
            )}

            {!selectedProduct && !authPage && (
                <section
                    id="shipping-info"
                    style={{ padding: '35px 5%', background: '#f8f5ef' }}
                >
                    <h2>Shipping Information</h2>
                    <p>Delivery times depend on your location. Order updates will be shared when available.</p>
                    <p>Free delivery on orders above ₹999.</p>
                </section>
            )}

            {!selectedProduct && !authPage && (
                <section
                    id="returns-refunds"
                    style={{ padding: '35px 5%', background: '#fffefa' }}
                >
                    <h2>Returns &amp; Refunds</h2>
                    <p>For return or refund assistance, contact SnapCard support with your order details.</p>
                    <p>Return eligibility and timelines must be confirmed with the store.</p>
                </section>
            )}

            {!selectedProduct && !authPage && (
                <section
                    id="faqs"
                    style={{ padding: '35px 5%', background: '#f8f5ef' }}
                >
                    <h2>Frequently Asked Questions</h2>
                    <h4>How do I place an order?</h4>
                    <p>Add products to your bag and click Place Order.</p>
                    <h4>Where can I see my orders?</h4>
                    <p>Click Orders in the header to view your order history.</p>
                    <h4>Is online payment available?</h4>
                    <p>Online payment is not currently implemented in this version.</p>
                </section>
            )}


            {!selectedProduct && !authPage && (
                <footer id="footer">
                    <div className="footer-main">
                        <div className="footer-brand">
                            <a className="logo" href="#home"><span className="logo-mark">S</span>napCard<span className="logo-dot">.</span></a>
                            <p>Fashion for everyone, made a little more joyful. Find your fit and make it yours.</p>
                            <div className="socials"><span>ig</span><span>f</span><span>p</span></div>
                        </div>
                        <div>
                            <h4>Explore</h4>
                            <a href="#shop">New arrivals</a>
                            <a href="#shop">Best sellers</a>
                            <a href="#shop" onClick={() => setCategory('Women')}>Women</a>
                            <a href="#shop" onClick={() => setCategory('Men')}>Men</a>
                        </div>

                        <div>
                            <h4>Help &amp; support</h4>
                            <a href="#contact-us">Contact us</a>
                            <a href="#shipping-info">Shipping info</a>
                            <a href="#returns-refunds">Returns &amp; refunds</a>
                            <a href="#faqs">FAQs</a>
                        </div>

                        <div className="newsletter">
                            <h4>Good things, occasionally.</h4>
                            <p>Get updates on new drops and little deals.</p>
                            <form onSubmit={event => {
                                event.preventDefault();
                                showNotice('Thanks for joining the SnapCard list!');
                                event.target.reset();
                            }}>
                                <input type="email" placeholder="Your email address" required />
                                <button aria-label="Subscribe"><ArrowRight /></button>
                            </form>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <span>© 2026 SnapCard. Made for your everyday.</span>
                        <span>Made with ♡ for your style</span>
                    </div>
                </footer>
            )}

            {notice && <div className="toast">{notice}</div>}

            {cartOpen && (
                <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
                    <aside className="cart-drawer" onClick={event => event.stopPropagation()}>
                        <div className="drawer-head">
                            <div>
                                <span className="eyebrow">YOUR PICKS</span>
                                <h2>Your bag <span>({count})</span></h2>
                            </div>
                            <button className="icon-btn" onClick={() => setCartOpen(false)}><X /></button>
                        </div>

                        {cart.length === 0 ? (
                            <div className="empty-cart">
                                <ShoppingBag size={42} />
                                <h3>Your bag is waiting</h3>
                                <p>Add something lovely to get started.</p>
                                <button className="primary-btn" onClick={() => setCartOpen(false)}>
                                    Explore styles <ArrowRight size={17} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cart.map(item => (
                                        <div className="cart-item" key={`${item.id}-${item.selectedSize || ''}`}>
                                            <img src={item.image} alt={item.name} />
                                            <div className="cart-item-info">
                                                <b>{item.name}</b>
                                                {item.selectedSize && <small>Size: {item.selectedSize}</small>}
                                                <span>{money(item.price)}</span>
                                                <div className="qty">
                                                    <button onClick={() => qty(item.id, -1, item.selectedSize || '')}><Minus size={13} /></button>
                                                    <span>{item.qty}</span>
                                                    <button onClick={() => qty(item.id, 1, item.selectedSize || '')}><Plus size={13} /></button>
                                                </div>
                                            </div>
                                            <button className="remove" onClick={() => setCart(previous =>
                                                previous.filter(x => !(
                                                    String(x.id) === String(item.id) &&
                                                    (x.selectedSize || '') === (item.selectedSize || '')
                                                ))
                                            )}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="cart-summary">
                                    <div><span>Subtotal</span><b>{money(total)}</b></div>
                                    <small>Delivery and any offers are calculated at checkout.</small>
                                    <button
                                        className="primary-btn full"
                                        onClick={placeOrder}
                                        disabled={placingOrder}
                                    >
                                        {placingOrder ? 'Placing order...' : 'Place order'}
                                        {!placingOrder && <ArrowRight size={17} />}
                                    </button>
                                </div>
                            </>
                        )}
                    </aside>
                </div>
            )}

            {ordersOpen && (
                <div className="drawer-backdrop" onClick={() => setOrdersOpen(false)} style={{ zIndex: 120 }}>
                    <aside className="cart-drawer" onClick={event => event.stopPropagation()}
                        style={{ width: 'min(520px, 100%)' }}>
                        <div className="drawer-head">
                            <div>
                                <span className="eyebrow">SNAPCARD</span>
                                <h2>Order history <span>({orders.length})</span></h2>
                            </div>
                            <button className="icon-btn" onClick={() => setOrdersOpen(false)}
                                aria-label="Close order history"><X /></button>
                        </div>

                        {orders.length === 0 ? (
                            <div className="empty-cart">
                                <ShoppingBag size={42} />
                                <h3>No orders yet</h3>
                                <p>Your placed orders will appear here.</p>
                                <button className="primary-btn" onClick={() => setOrdersOpen(false)}>
                                    Continue shopping <ArrowRight size={17} />
                                </button>
                            </div>
                        ) : (
                            <div className="cart-items">
                                {orders.map((order, orderIndex) => (
                                    <div key={`${order.id}-${orderIndex}`} style={{
                                        padding: '18px 0', borderBottom: '1px solid #e8e3dc'
                                    }}>
                                        <div style={{
                                            display: 'flex', justifyContent: 'space-between', gap: '12px'
                                        }}>
                                            <strong>Order #{order.id}</strong>
                                            <span style={{
                                                color: '#47734c', fontSize: '13px', fontWeight: 600
                                            }}>{order.status}</span>
                                        </div>
                                        <small style={{
                                            display: 'block', color: '#777', margin: '7px 0 10px'
                                        }}>
                                            {order.date} · {order.customer}
                                        </small>
                                        {(order.items || []).map((item, index) => (
                                            <div key={`${order.id}-${item.id}-${index}`} style={{
                                                display: 'flex', justifyContent: 'space-between',
                                                gap: '12px', fontSize: '14px', margin: '7px 0'
                                            }}>
                                                <span>
                                                    {item.name} × {item.qty ?? item.quantity ?? 1}
                                                    {item.selectedSize ? ` (Size ${item.selectedSize})` : ''}
                                                </span>
                                                <span>{money(
                                                    Number(item.price) * Number(item.qty ?? item.quantity ?? 1)
                                                )}</span>
                                            </div>
                                        ))}
                                        <div style={{
                                            display: 'flex', justifyContent: 'space-between',
                                            marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #eee'
                                        }}>
                                            <strong>Total</strong>
                                            <strong>{money(order.total)}</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </aside>
                </div>
            )}
        </div>
    );
}
