export interface FormulaItem {
  id: string;
  category: string;
  name: string;
  latex: string;
  symbolMeaning: string;
  shortExample: string;
  narration: string;
}

export const formulaBank: Record<string, FormulaItem[]> = {
  'Rumus Matriks': [
    {
      id: 'm1',
      category: 'Rumus Matriks',
      name: 'Determinan Matriks Ordo 2 × 2',
      latex: '|A| = \\det(A) = ad - bc',
      symbolMeaning: 'Untuk matriks A = [[a, b], [c, d]]. Nilai determinan diperoleh dari perkalian diagonal utama dikurangi perkalian diagonal samping.',
      shortExample: 'Jika A = [[3, 5], [1, 2]], maka det(A) = 3(2) - 5(1) = 6 - 5 = 1.',
      narration: 'Determinan matriks dua kali dua dihitung dengan mengalikan elemen diagonal utama yaitu a dikali d, dikurangi perkalian diagonal samping yaitu b dikali c.',
    },
    {
      id: 'm2',
      category: 'Rumus Matriks',
      name: 'Invers Matriks Ordo 2 × 2',
      latex: 'A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}',
      symbolMeaning: 'Invers ada jika det(A) ≠ 0. Elemen diagonal utama ditukar, dan elemen diagonal samping dikalikan minus satu.',
      shortExample: 'Jika A = [[4, 7], [1, 2]] dengan det = 8 - 7 = 1, maka A⁻¹ = [[2, -7], [-1, 4]].',
      narration: 'Invers matriks dua kali dua diperoleh dengan membagi satu per determinan, dikalikan dengan matriks adjoin di mana diagonal utama ditukar posisinya dan diagonal samping diberi tanda minus.',
    },
    {
      id: 'm3',
      category: 'Rumus Matriks',
      name: 'Sifat Skalar Determinan Matriks',
      latex: '\\det(k \\cdot A_{n \\times n}) = k^n \\cdot \\det(A)',
      symbolMeaning: 'k adalah konstanta skalar dan n adalah ordo matriks bujur sangkar.',
      shortExample: 'Untuk matriks 2 × 2 dengan det(A) = 4, maka det(3A) = 3² · 4 = 9 · 4 = 36.',
      narration: 'Jika matriks berordo n dikalikan skalar k, maka nilai determinannya menjadi k pangkat n dikali determinan matriks awal.',
    },
    {
      id: 'm4',
      category: 'Rumus Matriks',
      name: 'Determinan Matriks Ordo 3 × 3 (Metode Sarrus)',
      latex: '\\det(M) = aei + bfg + cdh - ceg - afh - bdi',
      symbolMeaning: 'Jumlah hasil kali 3 diagonal turun ke kanan dikurangi 3 diagonal naik ke kanan.',
      shortExample: 'Berguna untuk menguji apakah matriks berordo 3x3 singular (determinan = 0).',
      narration: 'Determinan matriks tiga kali tiga metode Sarrus menjumlahkan perkalian tiga garis diagonal ke kanan bawah lalu mengurangkan perkalian tiga diagonal ke kanan atas.',
    },
  ],

  'Rumus Polinomial': [
    {
      id: 'p1',
      category: 'Rumus Polinomial',
      name: 'Teorema Sisa Polinomial',
      latex: 'P(x) = (x - c) \\cdot H(x) + S \\implies S = P(c)',
      symbolMeaning: 'P(x) adalah suku banyak, H(x) hasil bagi, dan S adalah sisa pembagian oleh pembagi berderajat 1.',
      shortExample: 'Jika P(x) = x³ - 2x + 5 dibagi (x - 2), sisanya adalah P(2) = 8 - 4 + 5 = 9.',
      narration: 'Teorema Sisa menyatakan bahwa sisa pembagian suku banyak P x oleh x minus c tepat sama dengan nilai fungsi di titik c, yaitu P c.',
    },
    {
      id: 'p2',
      category: 'Rumus Polinomial',
      name: 'Teorema Vieta Polinomial Derajat 3',
      latex: 'x_1 + x_2 + x_3 = -\\frac{b}{a}, \\quad x_1 x_2 + x_1 x_3 + x_2 x_3 = \\frac{c}{a}, \\quad x_1 x_2 x_3 = -\\frac{d}{a}',
      symbolMeaning: 'Hubungan antara koefisien persamaan ax³ + bx² + cx + d = 0 dengan operasi akar-akarnya.',
      shortExample: 'Untuk x³ - 4x² + x + 6 = 0, jumlah akarnya adalah -(-4)/1 = 4, dan hasil kali akarnya adalah -6/1 = -6.',
      narration: 'Teorema Vieta menghubungkan akar-akar suku banyak: jumlah seluruh akar kubik adalah minus b per a, dan hasil kali ketiga akarnya adalah minus d per a.',
    },
    {
      id: 'p3',
      category: 'Rumus Polinomial',
      name: 'Teorema Faktor',
      latex: '(x - c) \\text{ adalah faktor dari } P(x) \\iff P(c) = 0',
      symbolMeaning: 'Suatu suku linear merupakan faktor jika dan hanya jika sisa pembagiannya sama dengan nol.',
      shortExample: 'Karena P(1) = 0 pada P(x) = x³ - 1, maka (x - 1) merupakan faktor pasti.',
      narration: 'Teorema faktor menyatakan bahwa suku x minus c merupakan faktor dari P x jika dan hanya jika P c menghasilkan sisa nol.',
    },
  ],

  'Rumus Fungsi': [
    {
      id: 'f1',
      category: 'Rumus Fungsi',
      name: 'Asimtot Datar Fungsi Rasional',
      latex: 'y = \\lim_{x \\to \\pm\\infty} \\frac{a_m x^m + \\dots}{b_n x^n + \\dots} = \\begin{cases} 0 & \\text{jika } m < n \\\\ \\frac{a_m}{b_n} & \\text{jika } m = n \\end{cases}',
      symbolMeaning: 'm adalah derajat tertinggi pembilang dan n adalah derajat tertinggi penyebut.',
      shortExample: 'Fungsi C(t) = 8t / (t² + 4) memiliki derajat 1 < 2, sehingga asimtot datarnya adalah garis horizontal y = 0.',
      narration: 'Asimtot datar fungsi rasional ditentukan dari perbandingan derajat pembilang dan penyebut saat x menuju tak hingga.',
    },
    {
      id: 'f2',
      category: 'Rumus Fungsi',
      name: 'Fungsi Eksponensial Peluruhan Waktu Paruh',
      latex: 'N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}',
      symbolMeaning: 'N_0 adalah nilai awal, T adalah periode waktu paruh, dan t adalah waktu yang telah berlalu.',
      shortExample: 'Jika waktu paruh 6 jam dan waktu berlalu 30 jam, maka sisa = N_0 · (1/2)⁵ = N_0 / 32.',
      narration: 'Model peluruhan eksponensial menyatakan sisa kuantitas setelah t jam sama dengan jumlah mula-mula dikali setengah berpangkat t per waktu paruh.',
    },
    {
      id: 'f3',
      category: 'Rumus Fungsi',
      name: 'Karakteristik Gelombang Sinusoidal',
      latex: 'y = A \\sin(Bx) + D \\implies \\text{Amplitudo} = |A|, \\quad \\text{Periode} = \\frac{2\\pi}{|B|}',
      symbolMeaning: 'A adalah amplitudo, B adalah frekuensi sudut, D adalah pergeseran garis sumbu simetri vertikal.',
      shortExample: 'Untuk y = 3 sin(2x) + 1: amplitudo = 3, periode = 2π / 2 = π radian, nilai maksimum = 3 + 1 = 4.',
      narration: 'Pada fungsi sinusoidal, nilai mutlak A adalah tinggi amplitudo gelombang dan periode dihitung dengan dua pi dibagi koefisien B.',
    },
  ],

  'Rumus Vektor': [
    {
      id: 'v1',
      category: 'Rumus Vektor',
      name: 'Panjang Vektor 3 Dimensi',
      latex: '|\\vec{v}| = \\sqrt{x^2 + y^2 + z^2}',
      symbolMeaning: 'Magnitudo atau panjang skalar vektor dari titik pangkal ke ujung vektor.',
      shortExample: 'Untuk vektor v = (2, 1, 2), panjangnya adalah √(4 + 1 + 4) = √9 = 3 satuan.',
      narration: 'Panjang magnitudo vektor tiga dimensi dihitung dengan mengakarkan penjumlahan kuadrat masing-masing komponen x, y, dan z.',
    },
    {
      id: 'v2',
      category: 'Rumus Vektor',
      name: 'Perkalian Titik (Dot Product) & Sudut',
      latex: '\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y + a_z b_z = |\\vec{a}||\\vec{b}| \\cos\\theta',
      symbolMeaning: 'θ adalah sudut antara dua vektor. Jika a · b = 0 maka kedua vektor saling tegak lurus (ortogonal). Jika a · b < 0 maka sudut tumpul.',
      shortExample: '(4, -4, 7) · (2, 1, 2) = 8 - 4 + 14 = 18.',
      narration: 'Perkalian titik dua vektor diperoleh dari jumlah perkalian tiap komponen yang seletak, yang juga sama dengan panjang vektor a dikali panjang b dikali cosinus sudut teta.',
    },
    {
      id: 'v3',
      category: 'Rumus Vektor',
      name: 'Proyeksi Skalar Ortogonal',
      latex: '|\\vec{p}| = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}',
      symbolMeaning: 'Besar panjang proyeksi ortogonal dari vektor a pada arah vektor b.',
      shortExample: 'Jika a · b = 18 dan |b| = 3, maka panjang proyeksi skalar adalah 18 / 3 = 6 satuan.',
      narration: 'Panjang proyeksi skalar ortogonal vektor a pada b sama dengan hasil kali titik vektor a dan b dibagi dengan panjang magnitudo vektor b.',
    },
  ],

  'Rumus Lingkaran': [
    {
      id: 'l1',
      category: 'Rumus Lingkaran',
      name: 'Bentuk Umum Lingkaran & Titik Pusat',
      latex: 'x^2 + y^2 + Ax + By + C = 0 \\implies P\\left(-\\frac{A}{2}, -\\frac{B}{2}\\right), \\quad r = \\sqrt{a^2 + b^2 - C}',
      symbolMeaning: 'P(a, b) adalah titik pusat dan r adalah panjang jari-jari lingkaran.',
      shortExample: 'x² + y² + 6x - 8y = 0 memiliki pusat P(-3, 4) dan r = √(9 + 16 - 0) = 5.',
      narration: 'Bentuk umum persamaan lingkaran menghasilkan koordinat titik pusat dengan membagi minus koefisien A dan B dengan dua, serta jari-jari dihitung dari akar a kuadrat ditambah b kuadrat dikurang C.',
    },
    {
      id: 'l2',
      category: 'Rumus Lingkaran',
      name: 'Garis Singgung di Titik Singgung (x₁, y₁)',
      latex: '(x_1 - a)(x - a) + (y_1 - b)(y - b) = r^2',
      symbolMeaning: 'Garis singgung lingkaran berpusat di (a, b) dengan jari-jari r di titik (x1, y1) yang terletak tepat pada lingkaran.',
      shortExample: 'Pada (x - 2)² + (y + 3)² = 25 di titik (5, 1): (5 - 2)(x - 2) + (1 + 3)(y + 3) = 25 ⟹ 3x + 4y - 19 = 0.',
      narration: 'Persamaan garis singgung lingkaran di titik singgung x satu koma y satu menggunakan prinsip bagi adil selisih koordinat terhadap pusat lingkaran.',
    },
    {
      id: 'l3',
      category: 'Rumus Lingkaran',
      name: 'Luas Juring dan Panjang Busur Lingkaran',
      latex: 's = \\frac{\\theta}{360^\\circ} \\cdot 2\\pi r, \\quad L_{\\text{juring}} = \\frac{\\theta}{360^\\circ} \\cdot \\pi r^2 = \\frac{1}{2} s \\cdot r',
      symbolMeaning: 'θ adalah sudut pusat dalam derajat. Hubungan praktis: Luas Juring = 1/2 dikali busur dikali jari-jari.',
      shortExample: 'Untuk r = 14 km dan θ = 60°: busur = (1/6)(88) = 14,67 km; juring = (1/6)(616) = 102,67 km².',
      narration: 'Panjang busur sebanding dengan fraksi sudut pusat terhadap tiga ratus enam puluh derajat dikali keliling lingkaran, dan luas juring sama dengan setengah dikali panjang busur dikali jari-jari.',
    },
  ],

  'Rumus Transformasi Geometri': [
    {
      id: 't1',
      category: 'Rumus Transformasi Geometri',
      name: 'Matriks Komposisi Transformasi',
      latex: 'T = T_2 \\circ T_1 = M_2 \\cdot M_1',
      symbolMeaning: 'Urutan perkalian matriks dibaca dari kanan ke kiri: transformasi pertama di sebelah kanan, transformasi kedua di sebelah kiri.',
      shortExample: 'Komposisi rotasi 90° dilanjutkan cermin y = x adalah [[0, 1], [1, 0]] · [[0, -1], [1, 0]] = [[1, 0], [0, -1]].',
      narration: 'Pada komposisi matriks transformasi, transformasi yang dilakukan pertama diletakkan di sisi kanan dan dikalikan dengan transformasi kedua di sisi kiri.',
    },
    {
      id: 't2',
      category: 'Rumus Transformasi Geometri',
      name: 'Luas Bangun Datar Akibat Dilatasi',
      latex: 'L\' = k^2 \\cdot L',
      symbolMeaning: 'L adalah luas awal bangun datar, k adalah faktor skala dilatasi, dan L\' adalah luas bayangan.',
      shortExample: 'Segitiga berluas 6 didilatasi dengan k = -2 menghasilkan luas bayangan = (-2)² · 6 = 4 · 6 = 24 satuan luas.',
      narration: 'Pengaruh dilatasi terhadap luas bangun datar berdimensi dua selalu dilipatgandakan sebesar k kuadrat, bukan k.',
    },
  ],

  'Rumus Limit Fungsi': [
    {
      id: 'k1',
      category: 'Rumus Limit Fungsi',
      name: 'Limit Fungsi Trigonometri Dasar',
      latex: '\\lim_{x \\to 0} \\frac{\\sin(ax)}{bx} = \\frac{a}{b}, \\quad \\lim_{x \\to 0} \\frac{\\tan(ax)}{bx} = \\frac{a}{b}',
      symbolMeaning: 'Berlaku saat variabel x mendekati nol untuk fungsi sinus dan tangen.',
      shortExample: 'lim_{x→0} (sin 6x + tan 2x) / 4x = 6/4 + 2/4 = 8/4 = 2.',
      narration: 'Teorema limit trigonometri dasar menyatakan bahwa saat x mendekati nol, perbandingan sin a x per b x atau tan a x per b x langsung sama dengan nilai rasio koefisien a per b.',
    },
    {
      id: 'k2',
      category: 'Rumus Limit Fungsi',
      name: 'Identitas Sudut Rangkap Cosinus pada Limit',
      latex: '1 - \\cos(kx) = 2\\sin^2\\left(\\frac{kx}{2}\\right)',
      symbolMeaning: 'Mengubah bentuk tak tentu pembilang menjadi sinus kuadrat agar dapat dipasangkan dengan x pada penyebut.',
      shortExample: '1 - cos(4x) = 2 sin²(2x). Maka lim_{x→0} (1 - cos 4x)/(x tan 2x) = 2 · (2) · (1) = 4.',
      narration: 'Bentuk satu dikurang cos k x selalu diubah menggunakan identitas sudut rangkap menjadi dua kali sinus kuadrat k x per dua.',
    },
    {
      id: 'k3',
      category: 'Rumus Limit Fungsi',
      name: 'Perkalian Sekawan Bentuk Akar',
      latex: '\\lim_{x \\to c} \\frac{P(x)}{\\sqrt{A} - B} = \\lim_{x \\to c} \\frac{P(x)(\\sqrt{A} + B)}{A - B^2}',
      symbolMeaning: 'Rasionalisasi bentuk akar tak tentu aljabar tanpa memerlukan turunan L\'Hopital.',
      shortExample: '(x - 1) / (√(x + 3) - 2) dikali sekawan menghasilkan √(x + 3) + 2 ➔ 2 + 2 = 4 di x = 1.',
      narration: 'Metode perkalian bentuk sekawan merasionalkan penyebut akar dengan mengalikan pembilang dan penyebut dengan tanda sekawan yang berlawanan, membuka faktor aljabar pembuat nol.',
    },
  ],
};
