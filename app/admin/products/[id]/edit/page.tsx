import {requireAdmin} from "@/lib/auth"; import {prisma} from "@/lib/prisma"; import {notFound} from "next/navigation";
export default async function EditProduct({params}:{params:Promise<{id:string}>}){try{await requireAdmin()}catch{return <main><section><h1>Unauthorized</h1></section></main>}
const {id}=await params;const p=await prisma.product.findUnique({where:{id}});if(!p)return notFound();
return <main><section><div className="eyebrow">CATALOG / EDIT</div><h1>{p.name}</h1><form className="form" action={`/api/admin/products/${p.id}`} method="post">
<input type="hidden" name="_method" value="PUT"/>
<input name="name" defaultValue={p.name} placeholder="Product name" required/><input name="slug" defaultValue={p.slug} placeholder="Slug" required/>
<select name="category" defaultValue={p.category}><option value="FISH">Fish</option><option value="CHICKEN">Chicken</option><option value="GIFT">Gift</option></select>
<input name="sku" defaultValue={p.sku} required/><input name="price" type="number" defaultValue={p.price} min="0" required/><input name="weight" defaultValue={p.weight} required/><input name="stock" type="number" defaultValue={p.stock} min="0" required/>
<input name="imageUrl" defaultValue={p.imageUrl||""}/><textarea name="description" defaultValue={p.description} rows={5} required/><textarea name="ingredients" defaultValue={p.ingredients||""} rows={3}/><textarea name="nutrition" defaultValue={p.nutrition||""} rows={3}/><input name="allergens" defaultValue={p.allergens||""}/>
<input name="smokingMethod" defaultValue={p.smokingMethod||""}/><input name="storage" defaultValue={p.storage||""}/><input name="shelfLife" defaultValue={p.shelfLife||""}/>
<label><input type="checkbox" name="featured" defaultChecked={p.featured}/> Featured</label><label><input type="checkbox" name="bestseller" defaultChecked={p.bestseller}/> Bestseller</label><label><input type="checkbox" name="isNew" defaultChecked={p.isNew}/> New</label><label><input type="checkbox" name="active" defaultChecked={p.active}/> Active</label>
<button className="btn">SAVE CHANGES</button></form>
<form action={`/api/admin/products/${p.id}`} method="post" style={{marginTop:15}}><input type="hidden" name="_method" value="DELETE"/><button className="btn danger">DELETE PRODUCT</button></form>
</section></main>}