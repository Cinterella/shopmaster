import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* ===============================
     VARIABLES GLOBALES
  ================================*/
  :root {
    /* Colores */
    --color-primary: #1976d2;
    --color-secondary: #ff9800;
    --color-success: #2e7d32;
    --color-danger: #d32f2f;
    --color-light: #f5f7fa;
    --color-white: #ffffff;
    --color-dark: rgba(51, 51, 51, 1);
    --color-muted: #777;

    /* Tipografía */
    --font-main:  Montserrat, sans-serif;

    /* Espaciados */
    --space-xs: 6px;
    --space-sm: 12px;
    --space-md: 20px;
    --space-lg: 32px;
    --space-xl: 48px;

    /* Bordes */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 20px;

    /* Sombras */
    --shadow-sm: 0 2px 6px rgba(0,0,0,0.08);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.12);
    
    --bs-btn-bg: var(--color-primary);
    --bs-btn-hover-bg: var(--color-primary-hover);
    --bs-btn-color: var(--color-text-light);
  }

  /* ===============================
     RESET / BASE
  ================================*/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-main);
    background-color: var(--color-light);
    color: var(--color-dark);
    line-height: 1.5;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* ===============================
     TIPOGRAFÍA GLOBAL
  ================================*/
  h1 {
    font-size: 2rem;
    margin-bottom: var(--space-md);
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: var(--space-sm);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: var(--space-xs);
  }

  p {
    margin: var(--space-xs) 0;
    color: var(--color-muted);
  }

  /* ===============================
     BOTONES GLOBALES
  ================================*/
  button {
    font-family: var(--font-main);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.9rem;
    border: none;
  }

  button.primary {
    background: var(--color-primary);
    color: white;
  }

  button.primary-dark {
    background: white;
    color: var(--color-primary);
  }

  button.secondary {
    background: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }

  button.secondary-dark {
    background: white;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }

  button.danger {
    background: var(--color-danger);
    color: white;
  }
      
  .btn-primary-global {
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
  }

  .btn-primary-global:hover {
    background-color: #125aa0;
    color: var(--color-white);
  }

  .btn-outline-primary-global {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    background: transparent;
  }

  .btn-outline-primary-global:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }


  /* =========================
  BOTONES – override Bootstrap
  ========================= */

  .btn-primary {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
  }

  .btn-primary:hover,
  .btn-primary:focus {
    background-color: color-mix(in srgb, var(--color-primary) 85%, black);
    border-color: color-mix(in srgb, var(--color-primary) 85%, black);
    color: var(--color-white);
  }

  .btn-outline-primary {
    color: var(--color-primary);
    border-color: var(--color-primary);
    background-color: transparent;
  }

  .btn-outline-primary:hover,
  .btn-outline-primary:focus {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
  }

  /* Secundario */
  .btn-secondary {
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
    color: var(--color-white);
  }

  .btn-secondary:hover,
  .btn-secondary:focus {
    background-color: color-mix(in srgb, var(--color-secondary) 85%, black);
    border-color: color-mix(in srgb, var(--color-secondary) 85%, black);
    color: var(--color-white);
  }

  .btn.product-back-btn {
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    padding: 0.45rem 0.9rem;
    border-radius: 0.375rem;
    font-size: 0.9rem;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .btn.product-back-btn:hover {
    background-color: var(--color-dark);
  }

  .btn.product-back-btn:active {
  }
  
  /* ===============================
    HOME
  ================================ */
  .home-title {
    color: var(--color-primary);
  }

  .home-title-highlight {
    color: var(--color-dark);
  }

  .home-subtitle {
    color: var(--color-muted);
  }

  /* Slider */
  .home-slider {
    cursor: grab;
  }

  /* Card */
  .home-product-card {
    border-radius: 16px;
    border: none;
    box-shadow: var(--shadow-sm);
    transition: transform .25s ease, box-shadow .25s ease;
  }

  .home-product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  .home-product-img {
    height: 260px;
    object-fit: contain;
    padding: 1.5rem;
    background-color: var(--color-light);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  .home-product-description {
    color: var(--color-muted);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Precio */
  .home-product-price {
    color: var(--color-success);
    font-weight: 700;
    font-size: 1.25rem;
  }

  /* Slider buttons */
  .home-slider-btn {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* CTA */
  .home-cta-text {
    color: var(--color-muted);
  }


  /* ===============================
    PAGINADOR
  ================================ */

  .product-page-info {
    color: var(--color-muted);
    margin-top: 0.5rem;
  }
    
  /* ===============================
     CONTENEDORES COMUNES
  ================================*/
  .card {
    background: var(--color-white);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    box-shadow: var(--shadow-sm);
  }

  .section {
    margin-bottom: var(--space-lg);
  }

  .product-image {
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    margin-bottom: var(--space-sm);
  }

  .price {
    color: var(--color-primary);
    font-size: 1.1rem;
  }

  /* ===============================
   NAVBAR GLOBAL
  ================================*/
  .navbar-global {
    background-color: var(--color-white);
    padding: var(--space-sm) var(--space-md);
  }

  .nav-link-global {
    color: var(--color-dark);
  }

  .nav-link-global:hover {
    text-decoration: underline;
  }

  .navbar-logo, .navbar-logo:hover {
    font-weight: bold;
  }

  .navbar-spacer {
    height: 72px;
  }

  /* SUCCESS VARIANT */
  .nav-link-global.success {
    background-color: var(--color-success);
    color: var(--color-white);
    border-radius: var(--radius-sm);
    font-weight: bold;
    text-decoration: none;
  }

  .nav-link-global.success:hover {
    background-color: var(--color-success);
    color: var(--color-white);
    border-radius: var(--radius-sm);
    font-weight: bold;
    text-decoration: none;
  }

  /* Carrito */
  .cart-link {
    position: relative;
    color: var(--color-dark);
    font-size: 1.2rem;
  }

  .cart-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    background: var(--color-danger);
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Usuario */
  .user-actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .welcome-text {
    color: var(--color-dark);
    font-size: 0.9rem;
    white-space: nowrap;
  }
  .navbar-actions {
    display: flex;
    align-items: center;
  }

  .navbar-toggler {
    border: 1px solid var(--color-dark);
    }
  .navbar-toggler:active, .navbar-toggler:focus {
      box-shadow: none;      
  }
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(51,51,51,1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }

  /* Card producto */
  .product-card {
    border-radius: 0.75rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .product-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }

  /* Imagen producto */
  .product-card-img {
    height: 200px;
    object-fit: cover;
  }

  /* Precio */
  .product-price {
    font-weight: 700;
    color: var(--bs-primary);
    margin-bottom: 0.75rem;
  }

  /* Botón agregar al carrito */
  .btn-add-cart {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
  }

  .btn-add-cart:hover {
    filter: brightness(0.9);
  }

/* ===============================
    LOGIN
  ================================ */

  .login-container {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-card {
    background: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  .login-title {
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: var(--text-main);
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .login-input {
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    font-size: 0.95rem;
    transition: border-color 0.2s ease;
  }

  .login-input:focus {
    outline: none;
    border-color: var(--primary);
  }

  .login-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .login-btn {
    flex: 1;
    padding: 0.55rem;
    border-radius: 8px;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  /*.login-btn.primary {
    background-color: var(--primary);
    color: #fff;
  }

  .login-btn.primary:hover {
    background-color: var(--primary-hover);
  }*/

  .login-btn.secondary {
    background-color: #e9ecef;
    color: var(--text-main);
  }

  .login-btn.secondary:hover {
    background-color: #dee2e6;
  }

  .login-hint {
    margin-top: 1.25rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    text-align: center;
  }

  .login-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .login-label {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-muted);
  }

  /* ===============================
    LISTADO DE PRODUCTOS
  ================================ */
  .product-search-label {
    color: var(--color-dark);
    font-weight: 600;
  }

  .product-search-input {
    border-radius: 6px;
  }

  .product-search-info {
    display: block;
    margin-top: 0.25rem;
    color: var(--color-muted);
  }

  .product-card {
    border: none;
    background: var(--color-white);
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }

  .product-card-img {
    height: 200px;
    object-fit: cover;
  }

  .product-card-title {
    color: var(--color-dark);
    font-weight: 600;
  }

  .product-card-description {
    color: var(--color-muted);
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .product-card-price {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-success);
  }
  
  /* ===============================
   PRODUCT DETAIL
  ================================*/
  .product-detail {
    color: var(--color-dark);
  }

  /* Título */
  .product-detail-title {
    font-weight: 600;
    color: var(--color-primary);
    text-align: center;
  }

  /* Imagen */
  .product-image-wrapper {
    background-color: var(--color-white);
    border-radius: 0.75rem;
    padding: 1rem;
  }

  .product-image {
    max-height: 320px;
    object-fit: contain;
  }

  /* Info */
  .product-info {
    padding: 0.5rem 0.75rem;
  }

  .product-name {
    color: var(--color-primary);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  /* Secciones */
  .product-section {
    margin-bottom: 0.75rem;
  }

  .product-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-muted);
    margin-bottom: 0.25rem;
  }

  /* Descripción */
  .product-description {
    margin: 0;
    color: var(--color-dark);
    line-height: 1.4;
  }

  /* Categoría */
  .product-category {
    display: inline-block;
    background-color: var(--color-secondary);
    color: var(--color-white);
    padding: 0.25rem 0.5rem;
    border-radius: 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
  }

  /* Precio */
  .product-price-wrapper {
    margin-top: 1rem;
  }

  .product-price {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-success);
  }

  /* Botón volver */
  .product-back-btn {
    background-color: var(--color-secondary);
    color: var(--color-white);
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
  }

  .product-back-btn:hover {
    filter: brightness(0.9);
    color: var(--color-white);
  }


  /* ===============================
   FORM DE PRODUCTO
  ================================ */
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .form-card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-sm);
  }

  .form-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .form-subtitle {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }

  .form-label {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-muted);
  }

  .form-input,
  .form-textarea {
    padding: 0.6rem 0.75rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    font-size: 0.9rem;
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: var(--primary);
  }

  .form-error {
    font-size: 0.75rem;
    color: var(--danger);
  }

  .form-hint {
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  .form-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .form-actions .btn {
    flex: 1;
  }

  /* ===============================
   CHECKOUT
  ================================ */

  .checkout-user {
    margin-bottom: 2rem;
  }

  .checkout-user-title {
    color: var(--color-dark);
    font-weight: 600;
  }

  .checkout-user-email {
    color: var(--color-muted);
  }

  .checkout-user-token {
    background: var(--color-light);
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    margin: 0.75rem 0;
    word-break: break-all;
  }

  /* ===============================
    CARRITO
  ================================ */
  .checkout-cart {
    background: var(--color-white);
    border-radius: 16px;           /* podés usar 12px / 20px según el look */
    background-color: var(--color-white);
    box-shadow: var(--shadow-sm);
  }

  .checkout-cart-title {
    font-weight: 600;
    color: var(--color-dark);
  }

  .checkout-item {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .checkout-item-img {
    width: 100px;
    border-radius: 6px;
    object-fit: cover;
  }

  .checkout-item-info {
    flex: 1;
  }

  .checkout-item-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-success);
  }

  .checkout-item-detail {
    color: var(--color-muted);
  }

  .checkout-item-qty {
    border-bottom: 1px solid var(--color-border);
    margin: 0.25rem 0;
  }

  .checkout-item-subtotal {
    font-weight: 600;
    margin-top: 0.25rem;
  }

  /* ===============================
    TOTAL
  ================================ */

  .checkout-total {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-dark);
    background: var(--color-light);
    padding: 1rem;
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
  }

  /* ===============================
    ACCIONES
  ================================ */

  .checkout-actions {
    margin-bottom: 3rem;
  }

  .checkout-empty {
    color: var(--color-muted);
  }
    
  /* ===============================
    FOOTER
  ================================*/
  .footer-global {
    background-color: var(--color-white);
    border-top: 1px solid #e0e0e0;
  }

  .footer-links li {
    margin-bottom: 0.4rem;
  }

  .footer-links a {
    text-decoration: none;
    color: var(--color-dark);
    font-size: 0.9rem;
  }

  .footer-links a:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }

  .footer-social {
    color: var(--color-primary);
    font-size: 1.2rem;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .footer-social:hover {
    color: var(--color-secondary);
    transform: translateY(-2px);
  }
    
  @media (max-width: 992px) {
    .navbar-nav{
      align-items: flex-end;
    }
    .navbar-actions {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #ffffff;
      padding: 20px 0 10px 0;
    }
  }

`;
export default GlobalStyles;
