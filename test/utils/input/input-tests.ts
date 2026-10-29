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

export function testInputArrayDuplicates(inputs: unknown[]): void {
    test('Should not contain any duplicates', (): void => {
        expect(new Set<unknown>(inputs).size).toBe(inputs.length);
    });
}

export function testNonTypeInputArray(inputs: unknown[], type: string, typeCheck: (input: unknown) => boolean): void {
    describe(`Is a non-${type} input array`, (): void => {
        test(`Should not contain ${type} elements`, (): void => {
            expect(inputs.filter((input: unknown): boolean => {
                return typeCheck(input);
            })).toEqual([]);
        });

        testInputArrayDuplicates(inputs);
    });
}

export function testTypeInputArray(inputs: unknown[], type: string, typeCheck: (input: unknown) => boolean): void {
    describe(`Is a ${type} input array`, (): void => {
        test(`Should only contain ${type} elements`, (): void => {
            expect(inputs.filter((input: unknown): boolean => {
                return !typeCheck(input);
            })).toEqual([]);
        });

        testInputArrayDuplicates(inputs);
    });
}

export function testDefinedInputArray(inputs: unknown[]): void {
    test(`Should not have undefined elements`, (): void => {
        expect(inputs).not.toContain(undefined);
    });
}
