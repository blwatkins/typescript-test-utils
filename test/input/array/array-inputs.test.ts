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

import { testDefinedInputArray, testInputArrayDuplicates } from '../../utils/input/input-tests';

describe('Array Inputs', (): void => {
    function testNonArrayTypeInputArray(name: string, inputs: unknown[]): void {
        describe(`${name} is a non-array input array`, (): void => {
            test(`Should not contain array elements`, (): void => {
                expect(inputs.filter((input: unknown): boolean => {
                    return Array.isArray(input);
                })).toEqual([]);
            });

            testInputArrayDuplicates(inputs);
        });
    }

    function testArrayTypeInputArray(name: string, inputs: unknown[]): void {
        describe(`${name} is an array input array`, (): void => {
            test(`Should only contain array elements`, (): void => {
                expect(inputs.filter((input: unknown): boolean => {
                    return !Array.isArray(input);
                })).toEqual([]);
            });

            testInputArrayDuplicates(inputs);
        });
    }

    describe('nonArrayInputs', (): void => {
        const name: string = 'nonArrayInputs';

        testNonArrayTypeInputArray(name, nonArrayInputs);
    });

    describe('definedNonArrayInputs', (): void => {
        const name: string = 'definedNonArrayInputs';

        testNonArrayTypeInputArray(name, definedNonArrayInputs);
        testDefinedInputArray(name, definedNonArrayInputs);
    });

    describe('denseArrayInputs', (): void => {
        const name: string = 'denseArrayInputs';

        testArrayTypeInputArray(name, denseArrayInputs);
    });

    describe('sparseArrayInputs', (): void => {
        const name: string = 'sparseArrayInputs';

        testArrayTypeInputArray(name, sparseArrayInputs);
    });
});
