<link rel="stylesheet" href="qarenha.css" />
:root {
  --bg: #f3f0ea;
  --surface: #fffcf7;
  --ink: #122a45;
  --muted: #5d6b78;
  --subtle: #8a959e;
  --line: #e4dfd6;
  --accent: #1f6b4a;
  --accent-fg: #f4f8f5;
  --gold: #b8952c;
  --danger: #8f3b34;
  --shadow: 0 0 0 1px rgba(18, 42, 69, 0.06), 0 8px 24px -12px rgba(18, 42, 69, 0.12);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: "IBM Plex Sans Arabic", "Segoe UI", sans-serif;
  line-height: 1.55;
}

a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; }
button:disabled { cursor: not-allowed; opacity: 0.5; }

h1, h2, h3 {
  letter-spacing: -0.03em;
  line-height: 1.2;
  text-wrap: balance;
}

.wrap { max-width: 1120px; margin: 0 auto; padding: 0 20px; }

header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(12px);
}

.header-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
}

.logo { display: flex; align-items: center; gap: 12px; }

.mark {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--ink);
  color: var(--gold);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 18px;
}

.logo strong { display: block; }
.logo small { display: block; font-size: 12px; color: var(--muted); }

.tag {
  display: inline-flex;
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 14px;
  color: var(--muted);
}

.hero { padding: 56px 0 72px; text-align: center; }
.hero h1 { font-size: clamp(32px, 6vw, 60px); margin: 20px 0 0; font-weight: 600; }
.hero h1 span { display: block; margin-top: 8px; color: var(--accent); }
.hero .lead { max-width: 560px; margin: 20px auto 0; color: var(--muted); font-size: 18px; }

.searchbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 720px;
  margin: 32px auto 0;
  background: var(--surface);
  padding: 8px;
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.searchbar input {
  flex: 1;
  min-width: 180px;
  height: 56px;
  border: 0;
  background: transparent;
  padding: 0 16px;
  font-size: 16px;
  color: var(--ink);
  outline: none;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 56px;
  padding: 0 24px;
  border: 0;
  border-radius: 12px;
  background: var(--accent);
  color: var(--accent-fg);
  font-weight: 600;
  font-size: 16px;
}

.btn:hover { opacity: 0.92; }
.btn-ghost { background: transparent; color: var(--ink); height: 44px; }
.btn-sm { height: 44px; font-size: 14px; padding: 0 16px; }

.chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.chip {
  height: 36px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--muted);
  font-size: 14px;
}

.features {
  border-block: 1px solid var(--line);
  background: var(--surface);
  padding: 48px 0;
}

.grid-3 { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }

.feature {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 20px;
}

.feature h3 { margin: 12px 0 8px; }
.feature p { margin: 0; color: var(--muted); font-size: 14px; }

.section { padding: 56px 0; }
.section h2 { margin: 0; font-size: 24px; }
.muted { color: var(--muted); font-size: 14px; }

.grid-cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 24px;
}

.card {
  background: var(--surface);
  border-radius: 18px;
  padding: 16px;
  box-shadow: var(--shadow);
}

.art {
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  background: var(--ink);
  color: var(--surface);
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}

.art::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(184, 149, 44, 0.28), transparent 42%);
}

.art b { position: relative; font-size: 22px; }

.price {
  color: var(--accent);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.cats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 24px;
}

.cat {
  display: flex;
  align-items: center;
  min-height: 56px;
  text-align: right;
  background: var(--surface);
  border: 0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow);
  font-size: 15px;
}

.item {
  background: var(--surface);
  border-radius: 18px;
  padding: 16px;
  box-shadow: var(--shadow);
}

.item-top { display: flex; gap: 16px; }
.item-top .art { width: 112px; height: 112px; aspect-ratio: 1; flex-shrink: 0; }
.item h3 { margin: 4px 0; font-size: 18px; }

.item-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--line);
  margin-top: 16px;
  padding-top: 16px;
}

.offers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 16px;
}

.offer {
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
}

.offer.best {
  border-color: color-mix(in srgb, var(--accent) 30%, var(--line));
  background: color-mix(in srgb, var(--accent) 5%, var(--surface));
}

footer {
  border-top: 1px solid var(--line);
  background: var(--surface);
  padding: 32px 0;
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 800px) {
  .grid-3,
  .grid-cards,
  .cats,
  .offers { grid-template-columns: 1fr; }
  .hero { padding: 36px 0 48px; }
  .searchbar { flex-direction: column; }
  .searchbar .btn { width: 100%; }
}
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>قارنها</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="qarenha.css" />
</head>
<body>
  <header>
    <div class="wrap header-row">
      <a class="logo" href="#">
        <span class="mark">ق</span>
        <span>
          <strong>قارنها</strong>
          <small>مقارنة الأسعار</small>
        </span>
      </a>
      <p class="muted" style="margin-inline-start: auto;">قارن أكثر، وادفع أقل</p>
    </div>
  </header>

  <main>
    <section class="hero wrap">
      <span class="tag">قارن أكثر، وادفع أقل</span>
      <h1>ابحث مرة واحدة<span>وقارن أفضل الأسعار</span></h1>
      <p class="lead">
        قارنها يجمع عروض المتاجر السعودية في نتيجة واحدة:
        السعر، المتجر، والمواصفات، ثم يرسلك إلى أرخص عرض.
      </p>

      <form class="searchbar" action="#" method="get">
        <input type="search" name="q" placeholder="ابحث عن منتج، موديل، أو باركود..." aria-label="بحث عن منتج" />
        <button class="btn" type="submit">قارن الأسعار</button>
      </form>

      <div class="chips">
        <button class="chip" type="button">آيفون 16</button>
        <button class="chip" type="button">Galaxy S25</button>
        <button class="chip" type="button">AirPods Pro</button>
        <button class="chip" type="button">دايسون</button>
        <button class="chip" type="button">عطر ديور</button>
      </div>
    </section>

    <section class="features">
      <div class="wrap grid-3">
        <div class="feature">
          <h3>بحث عربي وإنجليزي</h3>
          <p>آيفون أو iPhone، نفس النتيجة. يدعم الموديل والباركود.</p>
        </div>
        <div class="feature">
          <h3>توحيد المنتجات</h3>
          <p>العناوين المختلفة لنفس الجهاز تُجمع في بطاقة مقارنة واحدة.</p>
        </div>
        <div class="feature">
          <h3>انتقال مباشر للمتجر</h3>
          <p>زر واحد يفتح صفحة المنتج في أمازون أو نون أو جرير.</p>
        </div>
      </div>
    </section>

    <section class="section wrap">
      <h2>مثال نتيجة بحث</h2>
      <p class="muted">آيفون 16 سعة 128GB أسود</p>

      <article class="item" style="margin-top: 24px;">
        <div class="item-top">
          <div class="art"><b>ق</b></div>
          <div>
            <div class="muted">أبل · Apple</div>
            <h3>آيفون 16 سعة 128GB أسود</h3>
            <p class="muted">iPhone 16 128GB Black</p>
          </div>
        </div>
        <div class="item-bottom">
          <div>
            <div class="muted">أفضل سعر</div>
            <div class="price" style="font-size: 28px;">3,209 ر.س</div>
            <p class="muted">لدى أمازون · وفّرت 350 ر.س عن أعلى سعر</p>
          </div>
          <div>
            <a class="btn btn-sm" href="https://www.amazon.sa/s?k=iPhone+16+128GB">انتقل إلى المتجر</a>
          </div>
        </div>
        <div class="offers">
          <div class="offer best"><span>أمازون</span><strong>3,209 ر.س</strong></div>
          <div class="offer"><span>نون</span><strong>3,329 ر.س</strong></div>
          <div class="offer"><span>إكسترا</span><strong>3,379 ر.س</strong></div>
          <div class="offer"><span>جرير</span><strong>3,449 ر.س</strong></div>
        </div>
      </article>
    </section>

    <section class="section wrap">
      <h2>تصفح حسب الفئة</h2>
      <div class="cats">
        <button class="cat" type="button">إلكترونيات</button>
        <button class="cat" type="button">ملابس وأزياء</button>
        <button class="cat" type="button">جمال وعناية</button>
        <button class="cat" type="button">صحة وصيدلية</button>
        <button class="cat" type="button">المنزل</button>
        <button class="cat" type="button">قطع السيارات</button>
      </div>
    </section>
  </main>

  <footer>
    <div class="wrap">
      <p>© 2026 قارنها — السعر النهائي يظهر في المتجر</p>
    </div>
  </footer>
</body>
</html>

