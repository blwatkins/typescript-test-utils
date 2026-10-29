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

/**
 * Six-digit hex color strings (`#RRGGBB`) that use only digits.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorRGBNumberInputs: string[] = [
    '#000000',
    '#999999',
    '#123456',
    '#987654'
];

/**
 * Eight-digit hex color strings (`#RRGGBBAA`) that use only digits.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorRGBANumberInputs: string[] = [
    '#00000000',
    '#99999999',
    '#12345678',
    '#98765432'
];

/**
 * Six-digit hex color strings (`#RRGGBB`) that use uppercase letters.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorRGBUppercaseInputs: string[] = [
    '#AAAAAA',
    '#FFFFFF',
    '#ABCDEF',
    '#1A2B3C'
];

/**
 * Eight-digit hex color strings (`#RRGGBBAA`) that use uppercase letters.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorRGBAUppercaseInputs: string[] = [
    '#AAAAAAAA',
    '#FFFFFFFF',
    '#ABCDEFBC',
    '#1A2B3C4D'
];

/**
 * Six-digit hex color strings (`#RRGGBB`) that use lowercase letters.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorRGBLowercaseInputs: string[] = [
    '#aaaaaa',
    '#ffffff',
    '#abcdef',
    '#1a2b3c'
];

/**
 * Eight-digit hex color strings (`#RRGGBBAA`) that use lowercase letters.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorRGBALowercaseInputs: string[] = [
    '#aaaaaaaa',
    '#ffffffff',
    '#abcdefbc',
    '#1a2b3c4d'
];

/**
 * Six-digit hex color strings (`#RRGGBB`) that mix uppercase and lowercase letters.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorRGBMixedCaseInputs: string[] = [
    '#aAaAaA',
    '#FfFfFf',
    '#AbcdeF',
    '#1a2B3c'
];

/**
 * Eight-digit hex color strings (`#RRGGBBAA`) that mix uppercase and lowercase letters.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorRGBAMixedCaseInputs: string[] = [
    '#aAaAaAaA',
    '#FfFfFfFf',
    '#AbcdefaB',
    '#1a2B3c4D'
];

/**
 * Six-digit and eight-digit hex color strings that use only digits, only uppercase letters, or only lowercase letters.
 *
 * @remarks Mixed-case hex colors are in {@link hexColorMixedCaseInputs}.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorSameCaseInputs: string[] = [
    ...hexColorRGBNumberInputs,
    ...hexColorRGBANumberInputs,
    ...hexColorRGBUppercaseInputs,
    ...hexColorRGBAUppercaseInputs,
    ...hexColorRGBLowercaseInputs,
    ...hexColorRGBALowercaseInputs
];

/**
 * Six-digit and eight-digit hex color strings that mix uppercase and lowercase letters, combining {@link hexColorRGBMixedCaseInputs} and {@link hexColorRGBAMixedCaseInputs}.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorMixedCaseInputs: string[] = [
    ...hexColorRGBMixedCaseInputs,
    ...hexColorRGBAMixedCaseInputs
];

/**
 * Strings that are not six-digit or eight-digit hex colors, because of a missing `#`, the wrong number of digits, a non-hex character, or whitespace.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorFailureInputs: string[] = [
    '000000',
    '999999',
    '123456',
    '987654',
    'AAAAAA',
    'FFFFFF',
    'ABCDEF',
    '1A2B3C',
    'aaaaaa',
    'ffffff',
    'abcdef',
    '1a2b3c',
    '#000',
    '#AAA',
    '#FFF',
    '#1A2',
    '#aaa',
    '#fff',
    '#abc',
    '#1a2',
    '#00',
    '#AA',
    '#FF',
    '#1A',
    '#aa',
    '#ff',
    '#ab',
    '#1a',
    '#0000000',
    '#9999999',
    '#1234567',
    '#9876543',
    '#AAAAAAA',
    '#FFFFFFF',
    '#ABCDEFB',
    '#1A2B3C4',
    '#aaaaaaa',
    '#fffffff',
    '#abcdefb',
    '#1a2b3c4',
    '#000000000',
    '#999999999',
    '#123456789',
    '#987654321',
    '#AAAAAAAAA',
    '#FFFFFFFFF',
    '#ABCDEFBCD',
    '#1A2B3C4D5',
    '#aaaaaaaaa',
    '#fffffffff',
    '#abcdefbcd',
    '#1a2b3c4d5',
    '#00000G',
    '#99999H',
    '#12345Z',
    '#98765\u{1F3A8}',
    '#AAAAA!',
    '#FFFFF@',
    '#ABCDE?',
    '#1A2B3]',
    '#aaaaa\u00EB',
    '#fffffg',
    '#abcde\u{1F3A8}',
    '#1a2b3$',
    '#0000000G',
    '#9999999H',
    '#1234567Z',
    '#9876543\u{1F3A8}',
    '#AAAAAAA!',
    '#FFFFFFF@',
    '#ABCDEFB?',
    '#1A2B3C4]',
    '#aaaaaaa\u00EB',
    '#fffffffg',
    '#abcdefb\u{1F3A8}',
    '#1a2b3c4$',
    '#000 000',
    '#99 9999',
    '#123 456',
    '#987 654',
    '#AAAA AA',
    '# FFFFFF',
    '#ABCDE F',
    '#1A2 3C',
    '#aaaa aa',
    '# ffffff',
    '  #abcdef',
    '#1a2b3c  ',
    '#00\n0000',
    '#9999\n99',
    '#12345\t6',
    '#987654\n',
    '#AAAAAA    ',
    '#F\nFFFFF',
    '\n\t#ABCDEF',
    '#1\tA2B3C',
    '#aaa\n\taaa',
    '#ffffff\n\t',
    '    #abcdef',
    '#1a2b3c    ',
    '#\u00EB\u00EB\u00EB\u00EB\u00EB\u00EB'
];
