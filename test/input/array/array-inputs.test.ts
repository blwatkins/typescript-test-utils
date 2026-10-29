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

import { definedNonArrayInputs, denseArrayInputs, nonArrayInputs, sparseArrayInputs } from '../../../src';

import { testDefinedInputArray, testNonTypeInputArray, testTypeInputArray } from '../../utils/input/input-tests';

describe('Array Inputs', (): void => {
    const type: string = 'array';

    const typeCheck: (input: unknown) => boolean = (input: unknown): boolean => {
        return Array.isArray(input);
    };

    function hasEmptySlot(array: unknown[]): boolean {
        for (let index: number = 0; index < array.length; index++) {
            if (!(index in array)) {
                return true;
            }
        }

        return false;
    }

    describe('nonArrayInputs', (): void => {
        testNonTypeInputArray(nonArrayInputs, type, typeCheck);
    });

    describe('definedNonArrayInputs', (): void => {
        testNonTypeInputArray(definedNonArrayInputs, type, typeCheck);
        testDefinedInputArray(definedNonArrayInputs);
    });

    describe('denseArrayInputs', (): void => {
        testTypeInputArray(denseArrayInputs, type, typeCheck);

        test('Should not contain sparse arrays', (): void => {
            expect(denseArrayInputs.length).not.toBe(0);
            expect(denseArrayInputs.filter((input: unknown): boolean => {
                return hasEmptySlot(input as unknown[]);
            })).toEqual([]);
        });
    });

    describe('sparseArrayInputs', (): void => {
        testTypeInputArray(sparseArrayInputs, type, typeCheck);

        test('Should only contain sparse arrays', (): void => {
            expect(sparseArrayInputs.length).not.toBe(0);
            expect(sparseArrayInputs.filter((input: unknown): boolean => {
                return !hasEmptySlot(input as unknown[]);
            })).toEqual([]);
        });
    });
});
