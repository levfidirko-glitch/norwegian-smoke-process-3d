# Norwegian Smoke Admin Panel

Implemented:
- Dashboard KPIs: products, orders, paid orders, revenue, low stock.
- Product CRUD: create, edit, delete, active/hidden, price, stock, SKU, category, photo URL, product details.
- Inventory visibility and low-stock highlighting.
- Order management: order list, detail page, payment status and fulfillment status.
- Delivery zone CRUD: add, activate/deactivate, delete, district list, fee, free-delivery threshold.
- Store settings: brand name, slogan, phone, WhatsApp, Instagram, pickup address/hours.
- Existing admin authentication remains in place.

For real production security, add CSRF protection, rate limiting, audit logs, granular admin roles, file upload storage, server-side validation for every field, and session rotation.
