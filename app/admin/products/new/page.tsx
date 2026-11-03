import {requireAdmin} from "@/lib/auth";
export default async function NewProduct(){try{await requireAdmin()}catch{return <main><section><h1>Unauthorized</h1></section></main>}
return <main><section><div className="eyebrow">CATALOG</div><h1>ADD PRODUCT</h1><form className="form" action="/api/admin/products" method="post">
<ProductFields/><button className="btn">CREATE PRODUCT</button></form></section></main>}
function ProductFields(){return <>
<input name="name" placeholder="Product name" required/>
<input name="slug" placeholder="Slug e.g. smoked-trout" required/>
<select name="category" required><option value="FISH">Fish</option><option value="CHICKEN">Chicken</option><option value="GIFT">Gift</option></select>
<input name="sku" placeholder="SKU" required/><input name="price" type="number" min="0" placeholder="Price in ₸" required/>
<input name="weight" placeholder="Weight e.g. 200 g" required/><input name="stock" type="number" min="0" placeholder="Stock" required/>
<input name="imageUrl" placeholder="/images/products/example.jpg"/>
<textarea name="description" placeholder="Description" rows={5} required/>
<textarea name="ingredients" placeholder="Ingredients" rows={3}/><textarea name="nutrition" placeholder="Nutrition" rows={3}/><input name="allergens" placeholder="Allergens"/>
<input name="smokingMethod" placeholder="Smoking method"/><input name="storage" placeholder="Storage conditions"/><input name="shelfLife" placeholder="Shelf life"/>
<label><input type="checkbox" name="featured"/> Featured</label><label><input type="checkbox" name="bestseller"/> Bestseller</label><label><input type="checkbox" name="isNew"/> New</label><label><input type="checkbox" name="active" defaultChecked/> Active</label>
</> }