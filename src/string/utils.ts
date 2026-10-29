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

import * as arrayUtils from '../array';

/**
 * Builds single-line strings from each token alone and from all tokens joined by single spaces.
 *
 * @param {string[]} tokens - The single-line strings to build from.
 *
 * @returns {string[]} The single-line strings.
 *
 * @throws {TypeError} When `tokens` is not an array.
 *
 * @since 0.1.0
 */
export function buildSingleLineInputs(tokens: string[]): string[] {
    if (!Array.isArray(tokens)) {
        throw new TypeError('tokens must be an array.');
    }

    return [
        ...tokens,
        tokens.join(' ')
    ];
}

/**
 * Builds one character for every code point in an inclusive range.
 *
 * @param {number} start - The first code point in the range.
 * @param {number} end - The last code point in the range.
 *
 * @returns {string[]} The characters, in code point order.
 *
 * @throws {TypeError} When `start` and `end` are not both numbers between 0 and 0x10FFFF (inclusive).
 *
 * @since 0.1.0
 */
export function charactersFromCodePointRange(start: number, end: number): string[] {
    const errorMessage = 'start and end must be numbers between 0 and 0x10FFFF';

    if (typeof start !== 'number' || typeof end !== 'number') {
        throw new TypeError(errorMessage);
    }

    if (start < 0 || start > 0x10FFFF || end < 0 || end > 0x10FFFF) {
        throw new TypeError(errorMessage);
    }

    return Array.from({ length: end - start + 1 }, (_value: unknown, index: number): string => {
        return String.fromCodePoint(start + index);
    });
}

/**
 * Joins every string in `inputsA` with every string in `inputsB` as `AB`, `BA`, `ABA`, and `BAB`.
 *
 * @param {string[]} inputsA - The first set of strings.
 * @param {string[]} inputsB - The second set of strings.
 *
 * @returns {string[]} The unique joined strings.
 *
 * @throws {TypeError} When `inputsA` and `inputsB` are not both arrays.
 *
 * @since 0.1.0
 */
export function mixStrings(inputsA: string[], inputsB: string[]): string[] {
    if (!Array.isArray(inputsA) || !Array.isArray(inputsB)) {
        throw new TypeError('inputsA and inputsB must be arrays');
    }

    return arrayUtils.unique(inputsA.flatMap((inputA: string): string[] => {
        return inputsB.flatMap((inputB: string): string[] => {
            return [`${inputA}${inputB}`, `${inputB}${inputA}`, `${inputA}${inputB}${inputA}`, `${inputB}${inputA}${inputB}`];
        });
    }));
}

/**
 * Joins every string in `inputsA` with every string in `inputsB`, in both orders.
 *
 * @param {string[]} inputsA - The first set of strings.
 * @param {string[]} inputsB - The second set of strings.
 *
 * @returns {string[]} The unique joined strings.
 *
 * @throws {TypeError} When `inputsA` and `inputsB` are not both arrays.
 *
 * @since 0.1.0
 */
export function pairStrings(inputsA: string[], inputsB: string[]): string[] {
    if (!Array.isArray(inputsA) || !Array.isArray(inputsB)) {
        throw new TypeError('inputsA and inputsB must be arrays');
    }

    return arrayUtils.unique(inputsA.flatMap((inputA: string): string[] => {
        return inputsB.flatMap((inputB: string): string[] => {
            return [`${inputA}${inputB}`, `${inputB}${inputA}`];
        });
    }));
}
