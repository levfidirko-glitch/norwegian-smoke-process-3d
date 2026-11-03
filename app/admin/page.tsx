import {requireAdmin} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import Link from "next/link";

export default async function Admin(){
  try{await requireAdmin()}catch{return <main><section><div className="eyebrow">ADMIN</div><h1>ADMIN LOGIN</h1><form className="form" action="/api/auth/login" method="post"><input name="email" type="email" placeholder="Email" required/><input name="password" type="password" placeholder="Password" required/><button className="btn">LOGIN</button></form></section></main>}
  const [products,orders,paid,revenue,lowStock] = await Promise.all([
    prisma.product.count({where:{active:true}}),
    prisma.order.count(),
    prisma.order.count({where:{paymentStatus:"PAID"}}),
    prisma.order.aggregate({where:{paymentStatus:"PAID"},_sum:{total:true}}),
    prisma.product.count({where:{active:true,stock:{lte:5}}})
  ]);
  const recent=await prisma.order.findMany({take:8,orderBy:{createdAt:"desc"}});
  return <main><section>
    <div className="eyebrow">NORWEGIAN SMOKE / CONTROL CENTER</div><h1>ADMIN PANEL</h1>
    <div className="admin-grid">
      <div className="stat"><small>ACTIVE PRODUCTS</small><strong>{products}</strong></div>
      <div className="stat"><small>ORDERS</small><strong>{orders}</strong></div>
      <div className="stat"><small>PAID ORDERS</small><strong>{paid}</strong></div>
      <div className="stat"><small>REVENUE</small><strong>₸{(revenue._sum.total||0).toLocaleString("ru-RU")}</strong></div>
      <div className="stat warn"><small>LOW STOCK ≤ 5</small><strong>{lowStock}</strong></div>
    </div>
    <div className="admin-actions">
      <Link className="btn" href="/admin/products/new">+ ADD PRODUCT</Link>
      <Link className="btn dark" href="/admin/orders">MANAGE ORDERS</Link>
      <Link className="btn dark" href="/admin/delivery">DELIVERY ZONES</Link>
      <Link className="btn dark" href="/admin/settings">STORE SETTINGS</Link>
    </div>
    <div className="card"><h2>RECENT ORDERS</h2>
      <table className="table"><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>TOTAL</th><th>PAYMENT</th><th>STATUS</th><th></th></tr></thead>
      <tbody>{recent.map(o=><tr key={o.id}><td>{o.orderNumber}</td><td>{o.customerName}<br/><small>{o.phone}</small></td><td>₸{o.total.toLocaleString()}</td><td><span className="badge">{o.paymentStatus}</span></td><td>{o.orderStatus}</td><td><Link href={`/admin/orders/${o.id}`}>OPEN →</Link></td></tr>)}</tbody></table>
    </div>
  </section></main>
}