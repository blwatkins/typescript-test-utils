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

function typeMatch(input: unknown, type: string): boolean {
    switch (type) {
        case 'boolean':
            return typeof input === 'boolean';
        case 'function':
            return typeof input === 'function';
        case 'number':
            return typeof input === 'number';
        case 'string':
            return typeof input === 'string';
        case 'undefined':
            return typeof input === 'undefined';
        case 'bigint':
            return typeof input === 'bigint';
        case 'symbol':
            return typeof input === 'symbol';
        case 'object':
        default:
            return typeof input === 'object';
    }
}

export function testInputArrayDuplicates(inputs: unknown[]): void {
    test('Should not contain any duplicates', (): void => {
        expect(new Set<unknown>(inputs).size).toBe(inputs.length);
    });
}

export function testNonTypeInputArray(name: string, type: string, inputs: unknown[]): void {
    describe(`${name} is a non-${type} input array`, (): void => {
        test(`Should not contain ${type} elements`, (): void => {
            expect(inputs.filter((input: unknown): boolean => {
                return typeMatch(input, type);
            })).toEqual([]);
        });

        testInputArrayDuplicates(inputs);
    });
}

export function testTypeInputArray(name: string, type: string, inputs: unknown[]): void {
    describe(`${name} is a ${type} input array`, (): void => {
        test(`Should only contain ${type} elements`, (): void => {
            expect(inputs.filter((input: unknown): boolean => {
                return !typeMatch(input, type);
            })).toEqual([]);
        });

        testInputArrayDuplicates(inputs);
    });
}

export function testDefinedInputArray(name: string, inputs: unknown[]): void {
    test(`${name} should not have undefined elements`, (): void => {
        expect(inputs).not.toContain(undefined);
    });
}
