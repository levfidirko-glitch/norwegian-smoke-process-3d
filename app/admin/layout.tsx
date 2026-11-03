import Link from "next/link";
export default function AdminLayout({children}:{children:React.ReactNode}){
  return <div>
    <header className="header">
      <Link href="/admin" className="logo">NORWEGIAN <span>SMOKE</span><small>ADMIN PANEL</small></Link>
      <nav className="nav">
        <Link href="/admin">DASHBOARD</Link><Link href="/admin/products">PRODUCTS</Link>
        <Link href="/admin/orders">ORDERS</Link><Link href="/admin/delivery">DELIVERY</Link>
        <Link href="/admin/settings">SETTINGS</Link><Link href="/">VIEW SITE</Link>
        <Link href="/api/auth/logout">LOGOUT</Link>
      </nav>
    </header>{children}
  </div>
}