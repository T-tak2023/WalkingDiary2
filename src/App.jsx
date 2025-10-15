import { useMemo, useState } from 'react';

const initialWalks = [
  {
    id: 1,
    title: '春風の川沿いウォーク',
    date: '2024-03-18',
    distance: 4.2,
    steps: 5800,
    route: '川辺のささやきルート',
    notes: '堤防沿いに菜の花が咲いていて、写真を撮らずにはいられなかった。',
    mood: 'リフレッシュ',
    photoUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    trivia: {
      location: '水明橋',
      fact: '昭和初期に架け替えられた石橋で、橋のたもとには当時の石碑が残されています。'
    }
  },
  {
    id: 2,
    title: '城下町トワイライト散歩',
    date: '2024-03-10',
    distance: 6.1,
    steps: 8120,
    route: '歴史回廊ルート',
    notes: '日暮れの空と石畳が印象的。路地裏の小さなカフェで休憩。',
    mood: 'わくわく',
    photoUrl:
      'https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=900&q=80',
    trivia: {
      location: '旧市庁舎',
      fact: '大正時代に建てられたレンガ造りの庁舎で、現在は市民ギャラリーとして一般公開されています。'
    }
  }
];

const triviaLibrary = [
  {
    location: '緑陰プロムナード',
    fact: '江戸時代から続く並木道で、かつては茶屋が立ち並ぶ憩いの場でした。'
  },
  {
    location: '朝露公園',
    fact: '明治期の農場跡地に整備された公園で、園内には当時の農具が展示されています。'
  },
  {
    location: '潮見台展望台',
    fact: '昭和30年代に建設された展望台からは、かつて盛んだった海運の歴史を伝える展示が見られます。'
  }
];

const moodPalette = {
  リフレッシュ: '#7aa89f',
  わくわく: '#e59f4c',
  穏やか: '#f7d59c',
  好奇心: '#3d7d64'
};

function App() {
  const [walks, setWalks] = useState(initialWalks);
  const [routeTracking, setRouteTracking] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    distance: '',
    steps: '',
    notes: '',
    mood: '穏やか',
    photoUrl: '',
    route: ''
  });

  const totalDistance = useMemo(
    () => walks.reduce((sum, walk) => sum + walk.distance, 0).toFixed(1),
    [walks]
  );

  const totalSteps = useMemo(
    () => walks.reduce((sum, walk) => sum + walk.steps, 0).toLocaleString(),
    [walks]
  );

  const handleStartRoute = () => {
    setRouteTracking(true);
    setForm((prev) => ({
      ...prev,
      route: '現在地から川沿い緑道を通って帰宅（自動記録）'
    }));
  };

  const handleStopRoute = () => {
    setRouteTracking(false);
    setForm((prev) => ({
      ...prev,
      route: prev.route || '今日の足跡を地図に描きました'
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title || !form.date || !form.distance || !form.steps) {
      alert('タイトル・日付・距離・歩数を入力してください。');
      return;
    }

    const newTrivia = triviaLibrary[Math.floor(Math.random() * triviaLibrary.length)];

    const newWalk = {
      id: Date.now(),
      title: form.title,
      date: form.date,
      distance: Number(form.distance),
      steps: Number(form.steps),
      route: form.route || '気分の赴くままの散歩コース',
      notes: form.notes || '今日はさらりとお散歩。',
      mood: form.mood,
      photoUrl:
        form.photoUrl ||
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      trivia: newTrivia
    };

    setWalks((prev) => [newWalk, ...prev]);
    setForm({
      title: '',
      date: '',
      distance: '',
      steps: '',
      notes: '',
      mood: '穏やか',
      photoUrl: '',
      route: ''
    });
    setRouteTracking(false);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__content">
          <span className="hero__tag">WALKING DIARY</span>
          <h1>
            無理なく健康増進、<span>気ままな散歩を記録</span>
          </h1>
          <p>
            ウォーキングダイアリーは、ふらっと歩きたくなる瞬間を逃さず記録するための散歩伴走アプリ。
            ルートと歩数は自動で、思い出は写真と日記でやさしく残せます。
          </p>
          <div className="hero__cta">
            <button type="button" onClick={handleStartRoute} className="cta-button">
              {routeTracking ? 'ルート記録中…' : 'ルート自動記録を開始'}
            </button>
            <button type="button" onClick={handleStopRoute} className="cta-button cta-button--ghost">
              記録を保存
            </button>
          </div>
        </div>
        <div className="hero__map">
          <div className={`map-card ${routeTracking ? 'map-card--active' : ''}`}>
            <span className="map-card__badge">AUTO ROUTE</span>
            <h3>今日の散歩プラン</h3>
            <p>{form.route || 'スタートボタンでルートを自動記録できます。'}</p>
            <div className="map-card__path">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </header>

      <section className="insights" aria-label="散歩のハイライト">
        <div className="insight-card">
          <h2>{totalDistance} km</h2>
          <p>これまでの歩いた距離</p>
        </div>
        <div className="insight-card">
          <h2>{totalSteps} 歩</h2>
          <p>積み上げた歩数</p>
        </div>
        <div className="insight-card">
          <h2>{walks.length} 件</h2>
          <p>散歩の思い出</p>
        </div>
      </section>

      <section className="features" aria-label="機能紹介">
        <h2>ウォーキングダイアリーのこだわり</h2>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>ルートを自動で記録</h3>
            <p>
              GPSを使って歩いた軌跡をやわらかな蔓模様のように残します。スタートとストップを押すだけで
              OK。
            </p>
          </article>
          <article className="feature-card">
            <h3>歩数・距離を可視化</h3>
            <p>
              ヘルスケアアプリと連携して歩数と距離を自動集計。散歩習慣の変化がひと目でわかります。
            </p>
          </article>
          <article className="feature-card">
            <h3>写真と日記で残す</h3>
            <p>
              撮影した写真とその日の気分を添えて、散歩のエピソードを日記として保存できます。
            </p>
          </article>
          <article className="feature-card">
            <h3>場所のトリビアを表示</h3>
            <p>
              立ち寄ったスポットにまつわる歴史や雑学を自動でキュレーション。散歩が小さな旅に変わります。
            </p>
          </article>
        </div>
      </section>

      <section className="log" aria-label="散歩を記録するフォーム">
        <div className="log__form">
          <h2>今日の散歩をさっそく記録</h2>
          <p className="log__hint">
            距離と歩数を入力するだけでOK。写真のURLを貼り付ければ、そのままアルバムに保存されます。
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                タイトル
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="例：朝日の木漏れ日ウォーク"
                  required
                />
              </label>
              <label>
                日付
                <input type="date" name="date" value={form.date} onChange={handleChange} required />
              </label>
              <label>
                距離 (km)
                <input
                  type="number"
                  step="0.1"
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  placeholder="4.5"
                  required
                />
              </label>
              <label>
                歩数
                <input
                  type="number"
                  name="steps"
                  value={form.steps}
                  onChange={handleChange}
                  placeholder="6500"
                  required
                />
              </label>
              <label>
                気分
                <select name="mood" value={form.mood} onChange={handleChange}>
                  {Object.keys(moodPalette).map((moodKey) => (
                    <option key={moodKey} value={moodKey}>
                      {moodKey}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                写真のURL
                <input
                  type="url"
                  name="photoUrl"
                  value={form.photoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </label>
              <label className="form-grid--full">
                メモ
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="散歩中に出会った風景や気づきをメモしましょう"
                  rows={3}
                />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="cta-button">
                記録を追加
              </button>
            </div>
          </form>
        </div>
        <aside className="log__tips">
          <h3>散歩がもっと楽しくなるヒント</h3>
          <ul>
            <li>歩きたい気分に合わせておすすめコースが提示されます。</li>
            <li>写真は複数枚追加予定。まずはお気に入りの1枚から。</li>
            <li>保存した日記はカレンダーと連動し、あとから検索できます。</li>
          </ul>
        </aside>
      </section>

      <section className="walks" aria-label="散歩の記録一覧">
        <h2>最近の散歩ログ</h2>
        <div className="walks__grid">
          {walks.map((walk) => (
            <article key={walk.id} className="walk-card">
              <div className="walk-card__image" style={{ backgroundImage: `url(${walk.photoUrl})` }}>
                <span className="walk-card__badge" style={{ backgroundColor: moodPalette[walk.mood] || '#7aa89f' }}>
                  {walk.mood}
                </span>
              </div>
              <div className="walk-card__body">
                <h3>{walk.title}</h3>
                <p className="walk-card__meta">
                  <span>{new Date(walk.date).toLocaleDateString('ja-JP')}</span>
                  <span>{walk.distance.toFixed(1)} km</span>
                  <span>{walk.steps.toLocaleString()} 歩</span>
                </p>
                <p>{walk.notes}</p>
              </div>
              <footer className="walk-card__footer">
                <div>
                  <strong>ルート</strong>
                  <p>{walk.route}</p>
                </div>
                <div>
                  <strong>トリビア：{walk.trivia.location}</strong>
                  <p>{walk.trivia.fact}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>
          ウォーキングダイアリーは、散歩好きのためのウェルネス記録サービスです。日々の足取りが彩り豊かな思い出になりますように。
        </p>
        <small>&copy; {new Date().getFullYear()} Walking Diary</small>
      </footer>
    </div>
  );
}

export default App;
