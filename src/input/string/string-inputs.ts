/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * SPDX-License-Identifier: MIT
 */

import * as arrayUtils from '../../array';
import * as stringUtils from '../../string';

/**
 * Inputs that are not primitive strings.
 *
 * @type {unknown[]}
 * @since 0.1.0
 */
// noinspection JSPrimitiveTypeWrapperUsage
export const nonStringInputs: unknown[] = [
    null,
    undefined,
    0,
    1,
    -1,
    10n,
    -10n,
    1.5,
    -1.5,
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_VALUE,
    Number.MIN_VALUE,
    Number.EPSILON,
    Number.NaN,
    Infinity,
    -Infinity,
    true,
    false,
    [],
    ['value'],
    [1, 2, 3],
    (): string => 'value',
    (): number => 10,
    (): unknown[] => [],
    (): object => {
        return {};
    },
    Math.random,
    new Number(10),
    new String('value'),
    new Object(10),
    new Object('value'),
    {},
    { key: 'value' },
    { key: 10 },
    { key: [] },
    { key: {} },
    Symbol('test')
];

/**
 * Whitespace allowed in text: space, tab, line feed, and a carriage return followed by a line feed.
 *
 * @type {string[]}
 * @private
 */
const textWhitespaceCharacters: string[] = [' ', '\t', '\n', '\r\n'];

/**
 * RGI emoji, including skin tone, zero width joiner, flag, tag, keycap, and variation selector sequences.
 *
 * @type {string[]}
 * @private
 */
const emojiInputs: string[] = [
    '\u{1F3A8}', // 🎨 - Palette
    '\u{1F44D}\u{1F3FD}', // 👍🏽 - Thumbs up with skin tone
    '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}', // 👨‍👩‍👧 - Family
    '\u{1F1FA}\u{1F1F8}', // 🇺🇸 - US flag
    '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}', // Scottish flag
    '1\uFE0F\u20E3', // One
    '\u00A9\uFE0F', // ©️ - Copyright
    '\u2122\uFE0F' // ™️ - Trademark
];

/**
 * Latin-1 Supplement characters that are not text characters.
 *
 * @type {string[]}
 * @private
 */
const rejectedLatin1Characters: string[] = [
    '\u00A6',
    '\u00A8',
    '\u00AA',
    '\u00AC',
    '\u00AD',
    '\u00AF',
    '\u00B2',
    '\u00B3',
    '\u00B4',
    '\u00B5',
    '\u00B6',
    '\u00B7',
    '\u00B8',
    '\u00B9',
    '\u00BA',
    '\u00BC',
    '\u00BD',
    '\u00BE',
    '\u00C6',
    '\u00D0',
    '\u00D7',
    '\u00D8',
    '\u00DE',
    '\u00DF',
    '\u00E6',
    '\u00F0',
    '\u00F8',
    '\u00FE'
];

/**
 * The inputs in {@link nonStringInputs}, excluding `undefined`.
 *
 * @type {unknown[]}
 * @since 0.1.0
 */
export const definedNonStringInputs: unknown[] = nonStringInputs.filter((input: unknown): boolean => {
    return input !== undefined;
});

/**
 * Every printable ASCII character that is not a letter, joined into one string.
 *
 * @type {string}
 * @private
 */
const asciiSymbols: string = stringUtils.charactersFromCodePointRange(0x0021, 0x007E).filter((character: string): boolean => {
    return !/[A-Za-z]/.test(character);
}).join('');

/**
 * Latin-1 Supplement characters from U+00A1 to U+00FF that are text characters.
 *
 * @type {string[]}
 * @private
 */
const acceptedLatin1Characters: string[] = stringUtils.charactersFromCodePointRange(0x00A1, 0x00FF).filter((character: string): boolean => {
    return !rejectedLatin1Characters.includes(character);
});

/**
 * The accepted Latin-1 Supplement characters that are not letters, joined into one string.
 *
 * @type {string}
 * @private
 */
const acceptedLatin1Symbols: string = acceptedLatin1Characters.filter((character: string): boolean => {
    return !/\p{L}/u.test(character);
}).join('');

/**
 * The accepted Latin-1 Supplement lowercase letters, joined into one string.
 *
 * @type {string}
 * @private
 */
const acceptedLatin1LowercaseLetters: string = acceptedLatin1Characters.filter((character: string): boolean => {
    return /\p{Ll}/u.test(character);
}).join('');

/**
 * The accepted Latin-1 Supplement uppercase letters, joined into one string.
 *
 * @type {string}
 * @private
 */
const acceptedLatin1UppercaseLetters: string = acceptedLatin1Characters.filter((character: string): boolean => {
    return /\p{Lu}/u.test(character);
}).join('');

/**
 * Words with no cased letters: digits, symbols, the bullet (U+2022), and emoji.
 *
 * @type {string[]}
 * @private
 */
const caselessWords: string[] = ['1234567890', asciiSymbols, acceptedLatin1Symbols, '\u2022', ...emojiInputs];

/**
 * Words that contain both lowercase and uppercase letters.
 *
 * @type {string[]}
 * @private
 */
const mixedCaseWords: string[] = ['Example', 'wOrD', 'CaF\u00E9', 'caf\u00C9', `${acceptedLatin1UppercaseLetters}${acceptedLatin1LowercaseLetters}`];

/**
 * Words whose letters are all lowercase.
 *
 * @type {string[]}
 * @private
 */
const lowercaseWords: string[] = ['example', 'word', 'caf\u00E9', acceptedLatin1LowercaseLetters];

/**
 * Words whose letters are all uppercase.
 *
 * @type {string[]}
 * @private
 */
const uppercaseWords: string[] = ['EXAMPLE', 'WORD', 'CAF\u00C9', acceptedLatin1UppercaseLetters];

/**
 * Every Basic Multilingual Plane character that matches `\s`.
 *
 * @type {string[]}
 * @private
 */
const allWhitespaceCharacters: string[] = stringUtils.charactersFromCodePointRange(0x0000, 0xFFFF).filter((character: string): boolean => {
    return /^\s$/.test(character);
});

/**
 * Characters that are not text characters, including a lone carriage return, control and format characters, non-text whitespace, combining marks, look-alike letters, private use, unassigned, and lone surrogate code points.
 *
 * @type {string[]}
 * @private
 */
const nonTextCharacters: string[] = [
    '\r',
    ...stringUtils.charactersFromCodePointRange(0x0000, 0x009F).filter((character: string): boolean => {
        return /\p{Cc}/u.test(character) && !['\t', '\n', '\r'].includes(character);
    }),
    ...stringUtils.charactersFromCodePointRange(0x0000, 0xFFFF).filter((character: string): boolean => {
        return /\p{Cf}/u.test(character) && !/\s/.test(character);
    }),
    ...allWhitespaceCharacters.filter((character: string): boolean => {
        return ![' ', '\t', '\n', '\r'].includes(character);
    }),
    ...rejectedLatin1Characters,
    '\u{E0001}',
    '\u{E0067}',
    '\u{E007F}',
    '\u034F',
    '\u115F',
    '\u3164',
    '\uFFA0',
    '\u2800',
    '\uFE0E',
    '\uFE0F',
    '\u0301',
    '\u20E3',
    '\u0430',
    '\u03B1',
    '\u4E2D',
    '\u0628',
    '\u05D0',
    '\u0142',
    '\u0159',
    '\u1EC5',
    '\u017F',
    '\u0131',
    '\uFF21',
    '\u{1D400}',
    '\u2122',
    '\u2019',
    '\u02BB',
    '\uFFFC',
    '\uFFFD',
    '\uE000',
    '\u0378',
    '\uD800',
    '\uDC00'
];

/**
 * Every pair of text whitespace characters, in both orders.
 *
 * @type {string[]}
 * @private
 */
const consecutiveTextWhitespace: string[] = stringUtils.pairStrings(textWhitespaceCharacters, textWhitespaceCharacters);

/**
 * Builds text strings that are not single-line, by joining each token with a tab, a line break, consecutive whitespace, or a leading or trailing space.
 *
 * @param {string[]} tokens - The single-line strings to build from.
 *
 * @returns {string[]} The strings that are not single-line.
 *
 * @private
 */
function buildSingleLineFailureInputs(tokens: string[]): string[] {
    return [
        ...stringUtils.mixStrings(
            tokens,
            textWhitespaceCharacters.filter((character: string): boolean => {
                return character !== ' ';
            })
        ),
        ...stringUtils.mixStrings(tokens, consecutiveTextWhitespace),
        ...stringUtils.pairStrings(tokens, [' '])
    ];
}

/**
 * Strings that are empty or contain only whitespace.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const emptyStringInputs: string[] = arrayUtils.unique([
    '',
    ...allWhitespaceCharacters,
    ...textWhitespaceCharacters,
    ...consecutiveTextWhitespace,
    ...stringUtils.mixStrings(allWhitespaceCharacters, textWhitespaceCharacters)
]);

/**
 * Single-line text strings with no cased letters, such as digits, symbols, and emoji.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineCaselessInputs: string[] = stringUtils.buildSingleLineInputs(caselessWords);

/**
 * Single-line text strings that contain both lowercase and uppercase letters.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineMixedCaseInputs: string[] = stringUtils.buildSingleLineInputs(mixedCaseWords);

/**
 * Single-line text strings whose letters are all lowercase.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineLowercaseInputs: string[] = stringUtils.buildSingleLineInputs(lowercaseWords);

/**
 * Single-line text strings whose letters are all uppercase.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineUppercaseInputs: string[] = stringUtils.buildSingleLineInputs(uppercaseWords);

/**
 * Text strings with no cased letters that are not single-line.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineFailureCaselessInputs: string[] = buildSingleLineFailureInputs([caselessWords.join(' ')]);

/**
 * Text strings that contain both lowercase and uppercase letters and are not single-line.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineFailureMixedCaseInputs: string[] = buildSingleLineFailureInputs([mixedCaseWords.join(' ')]);

/**
 * Text strings whose letters are all lowercase and are not single-line.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineFailureLowercaseInputs: string[] = buildSingleLineFailureInputs([lowercaseWords.join(' ')]);

/**
 * Text strings whose letters are all uppercase and are not single-line.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineFailureUppercaseInputs: string[] = buildSingleLineFailureInputs([uppercaseWords.join(' ')]);

/**
 * Single-line text strings: one or more words separated by single spaces, with no other whitespace.
 *
 * @remarks Combines {@link singleLineCaselessInputs}, {@link singleLineMixedCaseInputs}, {@link singleLineLowercaseInputs}, and {@link singleLineUppercaseInputs}.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineInputs: string[] = [
    ...singleLineCaselessInputs,
    ...singleLineMixedCaseInputs,
    ...singleLineLowercaseInputs,
    ...singleLineUppercaseInputs
];

/**
 * Text strings that are not single-line, because they contain a tab, a line break, consecutive whitespace, or leading or trailing whitespace.
 *
 * @remarks Combines {@link singleLineFailureCaselessInputs}, {@link singleLineFailureMixedCaseInputs}, {@link singleLineFailureLowercaseInputs}, and {@link singleLineFailureUppercaseInputs}.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineFailureTextInputs: string[] = [
    ...singleLineFailureCaselessInputs,
    ...singleLineFailureMixedCaseInputs,
    ...singleLineFailureLowercaseInputs,
    ...singleLineFailureUppercaseInputs
];

/**
 * Strings made only of text characters, combining {@link singleLineInputs} and {@link singleLineFailureTextInputs}.
 *
 * @remarks Text characters are printable ASCII, most of the Latin-1 Supplement, the bullet (•), RGI emoji, space, tab, line feed, and a carriage return followed by a line feed.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const textInputs: string[] = [
    ...singleLineInputs,
    ...singleLineFailureTextInputs
];

/**
 * Strings that contain at least one non-text character, alone or next to text, excluding whitespace-only strings.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const nonTextStringInputs: string[] = arrayUtils.unique([
    ...nonTextCharacters,
    ...stringUtils.mixStrings(nonTextCharacters, ['text'])
]).filter((input: string): boolean => {
    return input.trim().length > 0;
});

/**
 * Strings that are not single-line text, combining {@link emptyStringInputs}, {@link nonTextStringInputs}, and {@link singleLineFailureTextInputs}.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const singleLineFailureStringInputs: string[] = arrayUtils.unique([
    ...emptyStringInputs,
    ...nonTextStringInputs,
    ...singleLineFailureTextInputs
]);

/**
 * Strings that are not empty or whitespace-only, combining {@link nonTextStringInputs} and {@link textInputs}.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const nonEmptyStringInputs: string[] = arrayUtils.unique([
    ...nonTextStringInputs,
    ...textInputs
]);

/**
 * Every string input, combining {@link emptyStringInputs}, {@link nonTextStringInputs}, and {@link textInputs}.
 *
 * @type {string[]}
 * @since 0.1.0
 */
export const stringInputs: string[] = arrayUtils.unique([
    ...emptyStringInputs,
    ...nonTextStringInputs,
    ...textInputs
]);
