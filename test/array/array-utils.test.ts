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

import { describe, test, expect } from 'vitest';

import { denseArrayInputs, nonArrayInputs, sparseArrayInputs, unique } from '../../src';

describe('Array Utils', (): void => {
    describe('unique', (): void => {
        test('Should throw a TypeError for non-array inputs', (): void => {
            expect(nonArrayInputs.filter((input: unknown): boolean => {
                try {
                    unique(input as unknown[]);
                } catch (error: unknown) {
                    return !(error instanceof TypeError);
                }

                return true;
            })).toEqual([]);
        });

        test('Should not throw for dense and sparse arrays', (): void => {
            expect([...denseArrayInputs, ...sparseArrayInputs].filter((input: unknown): boolean => {
                try {
                    unique(input as unknown[]);
                } catch {
                    return true;
                }

                return false;
            })).toEqual([]);
        });

        test('Should keep the first occurrence of each element in order', (): void => {
            expect(unique([1, 2, 1, 3, 2])).toEqual([1, 2, 3]);
            expect(unique(['b', 'a', 'b'])).toEqual(['b', 'a']);
        });

        test('Should return an empty array for an empty array', (): void => {
            expect(unique([])).toEqual([]);
        });

        test('Should compare objects by reference', (): void => {
            const first: object = {};
            const second: object = {};

            const result: object[] = unique([first, first, second]);

            expect(result).toHaveLength(2);
            expect(result[0]).toBe(first);
            expect(result[1]).toBe(second);
        });

        test('Should treat NaN as one value', (): void => {
            expect(unique([Number.NaN, Number.NaN])).toEqual([Number.NaN]);
        });

        test('Should treat 0 and -0 as one value', (): void => {
            expect(unique([0, -0])).toHaveLength(1);
        });

        test('Should return a new array', (): void => {
            const inputs: number[] = [1, 2, 3];

            expect(unique(inputs)).not.toBe(inputs);
        });

        test('Should not change its argument', (): void => {
            const inputs: number[] = [1, 1];

            unique(inputs);

            expect(inputs).toEqual([1, 1]);
        });
    });
});
