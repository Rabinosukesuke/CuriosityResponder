type Question = {
    id: number;
    questions: string[];
    answer: string;
};

export const questions: Question[] = [
    { id: 1, questions: ['寒い場所に住んでいる', '白くてふかふかな毛皮を持っている', 'ひらがな2文字'], answer: 'くま' },
    { id: 2, questions: ['寒い場所に住んでいる', '泳ぐのが得意で、羽ばたくことはできない', 'カタカナ4文字'], answer: 'ペンギン' },
    { id: 3, questions: ['大きな動物', '鼻が非常に長い', 'カタカナ2文字'], answer: 'ゾウ' },
    { id: 4, questions: ['娯楽の一形態', 'プレイヤーは冒険やミッションに挑戦', 'カタカナ3文字'], answer: 'ゲーム' },
    { id: 5, questions: ['宇宙に飛び立つための乗り物', '燃料を使って加速し、大気圏を抜ける', 'カタカナ4文字'], answer: 'ロケット' },
    { id: 6, questions: ['人間のように動く人工の存在', 'プログラムやセンサーによって動く', 'カタカナ4文字'], answer: 'ロボット' },
    { id: 7, questions: ['広大な黒い空間', '恒星、惑星、銀河などが存在', '漢字2文字'], answer: '宇宙' },
    { id: 8, questions: ['伝説やファンタジーに登場する生物', '翼を持ち、火を吹くことがある', 'カタカナ4文字'], answer: 'ドラゴン' },
    { id: 9, questions: ['中国が原産地', '白い毛と黒い目の周りの模様が特徴', 'カタカナ3文字'], answer: 'パンダ' },
];
