
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="header">
        <Link href="/" className="logo">
          NORWEGIAN <span>SMOKE</span>
          <small>KAZAKH SOUL</small>
        </Link>
        <nav className="nav">
          <Link href="/shop">SHOP</Link>
          <Link href="/about">OUR STORY</Link>
          <Link href="/smoking-process">SMOKING</Link>
          <Link href="/delivery">DELIVERY</Link>
          <Link href="/contacts">CONTACT</Link>
        </nav>
        <Link href="/checkout" className="btn dark">CHECKOUT</Link>
      </header>

      <main>
        <section className="hero">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="smoke smoke-one"></div>
            <div className="smoke smoke-two"></div>
            <div className="smoke smoke-three"></div>
            <div className="mountains mountains-back"></div>
            <div className="mountains mountains-front"></div>
            <div className="hero-products">
              <img src="/images/salmon.jpeg" alt="Smoked salmon" />
              <img src="/images/chicken.jpeg" alt="Smoked chicken" />
            </div>
          </div>

          <div className="hero-copy">
            <div className="eyebrow">SMOKED FISH & CHICKEN</div>
            <h1>NORWEGIAN<br /><span>SMOKE</span></h1>
            <div className="tag">KAZAKH SOUL</div>
            <p>Crafted with smoke. Made with soul.</p>
            <Link className="btn" href="/shop">SHOP COLLECTION</Link>
          </div>
        </section>

        <section>
          <div className="eyebrow">THE COLLECTION</div>
          <h2>SMOKED WITH <span>PURPOSE</span></h2>
          <div className="categories">
            <Link className="category category-fish" href="/shop?category=FISH">
              <div className="category-shade"></div>
              <h3>SMOKED FISH</h3>
              <p>Premium smoked fish.</p>
              <b>SHOP FISH →</b>
            </Link>
            <Link className="category category-chicken" href="/shop?category=CHICKEN">
              <div className="category-shade"></div>
              <h3>SMOKED CHICKEN</h3>
              <p>Tender chicken with signature smoke.</p>
              <b>SHOP CHICKEN →</b>
            </Link>
          </div>
        </section>

        <section className="story">
          <div>
            <div className="eyebrow">OUR STORY</div>
            <h2>NORDIC SPIRIT.<br /><span>KAZAKH SOUL.</span></h2>
          </div>
          <p>
            Norwegian Smoke is a premium smoked-food brand focused on smoked
            fish and chicken. The identity combines Nordic-inspired
            minimalism with a distinctly Kazakh soul.
          </p>
        </section>

        <section>
          <div className="eyebrow">THE ART OF SMOKING</div>
          <h2>FROM PREPARATION<br />TO YOUR <span>TABLE</span></h2>
          <div className="steps">
            {["SELECT", "PREPARE", "SMOKE", "PACK"].map((x, i) => (
              <div className="step" key={x}>
                <b>0{i + 1}</b>
                <h3>{x}</h3>
                <p>Premium smoked food production.</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="logo">
          NORWEGIAN <span>SMOKE</span>
          <small>KAZAKH SOUL</small>
        </div>
        <div>Almaty, Kazakhstan</div>
        <div>© 2026 Norwegian Smoke</div>
      </footer>
    </>
  );
}
