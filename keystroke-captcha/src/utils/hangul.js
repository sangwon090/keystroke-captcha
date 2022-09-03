const HANGUL_OFFSET = 0xAC00;

const CHOSEONG = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

const JUNGSEONG = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', ['ㅗ', 'ㅏ'], ['ㅗ', 'ㅐ'], ['ㅗ', 'ㅣ'], 'ㅛ', 'ㅜ', ['ㅜ', 'ㅓ'], ['ㅜ', 'ㅔ'], ['ㅜ', 'ㅣ'], 'ㅠ', 'ㅡ', ['ㅡ', 'ㅣ'], 'ㅣ',
];

const JONGSEONG = [
    '', 'ㄱ', 'ㄲ', ['ㄱ', 'ㅅ'], 'ㄴ', ['ㄴ', 'ㅈ'], ['ㄴ', 'ㅎ'], 'ㄷ', 'ㄹ', ['ㄹ', 'ㄱ'], ['ㄹ', 'ㅁ'], ['ㄹ', 'ㅂ'], ['ㄹ', 'ㅅ'], ['ㄹ', 'ㅌ'], ['ㄹ', 'ㅍ'], ['ㄹ', 'ㅎ'], 'ㅁ', 'ㅂ', ['ㅂ', 'ㅅ'], 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
]

const BASIC_JAMO = [
    'ㄱ', 'ㄲ', , 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ',
];

const COMPLEX_JAMO = {
    'ㄳ': ['ㄱ', 'ㅅ'],
    'ㄵ': ['ㄴ', 'ㅈ'],
    'ㄶ': ['ㄴ', 'ㅎ'],
    'ㄺ': ['ㄹ', 'ㄱ'],
    'ㄻ': ['ㄹ', 'ㅁ'],
    'ㄼ': ['ㄹ', 'ㅂ'],
    'ㄽ': ['ㄹ', 'ㅅ'],
    'ㄾ': ['ㄹ', 'ㅌ'],
    'ㄿ': ['ㄹ', 'ㅍ'],
    'ㅀ': ['ㄹ', 'ㅎ'],
    'ㅄ': ['ㅂ', 'ㅅ'],
    'ㅘ': ['ㅗ', 'ㅏ'],
    'ㅙ': ['ㅗ', 'ㅐ'],
    'ㅚ': ['ㅗ', 'ㅣ'],
    'ㅝ': ['ㅜ', 'ㅓ'],
    'ㅞ': ['ㅜ', 'ㅔ'],
    'ㅟ': ['ㅜ', 'ㅣ'],
    'ㅢ': ['ㅜ', 'ㅣ'],
}

const KEYCODE = {
    'ㅂ': 81,
    'ㅃ': 81,
    'ㅈ': 87,
    'ㅉ': 87,
    'ㄷ': 69,
    'ㄸ': 69,
    'ㄱ': 82,
    'ㄲ': 82,
    'ㅅ': 84,
    'ㅆ': 84,
    'ㅛ': 89,
    'ㅕ': 85,
    'ㅑ': 73,
    'ㅐ': 79,
    'ㅒ': 79,
    'ㅔ': 80,
    'ㅖ': 80,
    'ㅁ': 65,
    'ㄴ': 83,
    'ㅇ': 68,
    'ㄹ': 70,
    'ㅎ': 71,
    'ㅗ': 72,
    'ㅓ': 74,
    'ㅏ': 75,
    'ㅣ': 76,
    'ㅋ': 90,
    'ㅌ': 88,
    'ㅊ': 67,
    'ㅍ': 86,
    'ㅠ': 66,
    'ㅜ': 78,
    'ㅡ': 77,
}

function disassemble(char) {
    if(BASIC_JAMO.includes(char)) {
        return [char];
    } else if(char in COMPLEX_JAMO) {
        return [].concat(COMPLEX_JAMO[char]);
    }

    const code = char.charCodeAt(0) - HANGUL_OFFSET;
    const jongseong = code % 28;
    const jungseong = (code - jongseong) / 28 % 21;
    const choseong = (((code - jongseong) / 28) - jungseong) / 21;

    let result = [];

    result.push(CHOSEONG[choseong]);

    if(typeof JUNGSEONG[jungseong] === 'object') {
        result = result.concat(JUNGSEONG[jungseong]);
    } else {
        result.push(JUNGSEONG[jungseong]);
    }

    if(JONGSEONG[jongseong] !== '') {
        if(typeof JONGSEONG[jongseong] === 'object') {
            result = result.concat(JONGSEONG[jongseong]);
        } else {
            result.push(JONGSEONG[jongseong]);
        }
    }

    return result;
}

export function getKeyCode(char) {

    const disassembled = disassemble(char);
    const lastChar = disassembled[disassembled.length - 1];
    return KEYCODE[lastChar];

}