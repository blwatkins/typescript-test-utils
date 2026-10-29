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
 * Six-digit hex color strings (`#RRGGBB`) to build failure inputs from, with one digit-only, one uppercase, and one lowercase color.
 *
 * @type {string[]}
 * @private
 */
const hexColorRGBSeeds: string[] = ['#123456', '#ABCDEF', '#abcdef'];

/**
 * Eight-digit hex color strings (`#RRGGBBAA`) to build failure inputs from, with one digit-only, one uppercase, and one lowercase color.
 *
 * @type {string[]}
 * @private
 */
const hexColorRGBASeeds: string[] = ['#12345678', '#ABCDEFBC', '#abcdefbc'];

/**
 * Six-digit and eight-digit hex color strings to build failure inputs from, combining {@link hexColorRGBSeeds} and {@link hexColorRGBASeeds}.
 *
 * @type {string[]}
 * @private
 */
const hexColorSeeds: string[] = [...hexColorRGBSeeds, ...hexColorRGBASeeds];

/**
 * Characters that are not hex digits: letters past `F`, ASCII symbols (including `#`), Latin-1 letters, and an emoji.
 *
 * @type {string[]}
 * @private
 */
const nonHexCharacters: string[] = [
    'G',
    'g',
    'Z',
    'z',
    '!',
    '@',
    '?',
    ']',
    '$',
    '#',
    '\u00EB', // ë - Latin small e with diaeresis
    '\u00CB', // Ë - Latin capital E with diaeresis
    '\u{1F3A8}' // 🎨 - Palette
];

/**
 * Whitespace characters to insert into hex color strings: a space, a tab, and a line feed.
 *
 * @type {string[]}
 * @private
 */
const hexWhitespaceCharacters: string[] = [' ', '\t', '\n'];

/**
 * Strings that are not six-digit or eight-digit hex colors, because of a missing or misplaced `#`, the wrong number of digits, a non-hex character, or whitespace.
 *
 * @type {string[]}
 * @since 0.1.0
 * @category String
 */
export const hexColorFailureInputs: string[] = arrayUtils.unique([
    ...hexColorSeeds.map((color: string): string => {
        return color.slice(1);
    }),
    ...hexColorRGBSeeds.flatMap((color: string): string[] => {
        return [color.slice(0, 3), color.slice(0, 4)];
    }),
    ...hexColorRGBASeeds.flatMap((color: string): string[] => {
        return [color.slice(0, -1), `${color}${color.slice(-1)}`];
    }),
    ...hexColorSeeds.flatMap((color: string): string[] => {
        return nonHexCharacters.map((character: string): string => {
            return `${color.slice(0, -1)}${character}`;
        });
    }),
    ...hexColorSeeds.flatMap((color: string): string[] => {
        const digits: string = color.slice(1);

        return [
            `##${digits}`,
            `#${digits}#`,
            `${digits}#`,
            `#${digits.slice(0, 3)}#${digits.slice(3)}`,
            `#${digits.slice(0, 3)}#${digits.slice(4)}`,
            `${digits.slice(0, 3)}#${digits.slice(3)}`,
            `${digits.slice(0, 3)}#${digits.slice(4)}`
        ];
    }),
    ...stringUtils.pairStrings(hexColorSeeds, hexWhitespaceCharacters),
    ...hexColorSeeds.flatMap((color: string): string[] => {
        return hexWhitespaceCharacters.map((whitespace: string): string => {
            return `${color.slice(0, 4)}${whitespace}${color.slice(4)}`;
        });
    }),
    '#\u00EB\u00EB\u00EB\u00EB\u00EB\u00EB'
]);
