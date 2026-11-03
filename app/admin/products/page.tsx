import {requireAdmin} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import Link from "next/link";

export default async function ProductsAdmin(){
 try{await requireAdmin()}catch{return <main><section><h1>Unauthorized</h1></section></main>}
 const ps=await prisma.product.findMany({orderBy:{createdAt:"desc"}});
 return <main><section><div className="admin-title"><div><div className="eyebrow">CATALOG</div><h1>PRODUCTS</h1></div><Link className="btn" href="/admin/products/new">+ ADD PRODUCT</Link></div>
 <div className="card"><table className="table"><thead><tr><th>PHOTO</th><th>PRODUCT</th><th>SKU</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th>STATUS</th><th></th></tr></thead><tbody>
 {ps.map(p=><tr key={p.id}><td>{p.imageUrl?<img src={p.imageUrl} className="thumb"/>:"—"}</td><td><b>{p.name}</b><br/><small>{p.weight}</small></td><td>{p.sku}</td><td>{p.category}</td><td>₸{p.price.toLocaleString()}</td><td className={p.stock<=5?"stock-low":""}>{p.stock}</td><td>{p.active?"ACTIVE":"HIDDEN"}</td><td><Link href={`/admin/products/${p.id}/edit`}>EDIT</Link></td></tr>)}
 </tbody></table></div></section></main>
}