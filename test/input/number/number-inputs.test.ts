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

import {
    definedInvalidSafePositiveIntegerInputs,
    definedNonNumberInputs,
    invalidSafeNumberInputs,
    invalidSafePositiveIntegerInputs,
    negativeSafeFloatInputs,
    negativeSafeIntegerInputs,
    negativeSafeNumberInputs,
    negativeUnsafeNumberInputs,
    nonFiniteNumberInputs,
    nonNumberInputs,
    positiveSafeFloatInputs,
    positiveSafeIntegerInputs,
    positiveSafeNumberInputs,
    positiveUnsafeNumberInputs,
    safeFloatInputs,
    safeIntegerInputs,
    safeNumberInputs,
    unsafeNumberInputs,
    zeroInputs
} from '../../../src';

import { testDefinedInputArray, testInputArrayDuplicates, testNonEmptyArray, testNonTypeInputArray, testTypeInputArray } from '../../utils/input/input-tests';

describe('Number Inputs', (): void => {
    const type: string = 'number';

    const typeCheck: (input: unknown) => boolean = (input: unknown): boolean => {
        return typeof input === 'number';
    };

    function isSafeNumber(input: unknown): boolean {
        return typeof input === 'number' && input >= Number.MIN_SAFE_INTEGER && input <= Number.MAX_SAFE_INTEGER;
    }

    describe('nonNumberInputs', (): void => {
        testNonTypeInputArray(nonNumberInputs, type, typeCheck);
    });

    describe('definedNonNumberInputs', (): void => {
        testNonTypeInputArray(definedNonNumberInputs, type, typeCheck);
        testDefinedInputArray(definedNonNumberInputs);
    });

    describe('nonFiniteNumberInputs', (): void => {
        testTypeInputArray(nonFiniteNumberInputs, type, typeCheck);

        testTypeInputArray(nonFiniteNumberInputs, 'non-finite number', (input: unknown): boolean => {
            return !Number.isFinite(input);
        });
    });

    describe('zeroInputs', (): void => {
        testTypeInputArray(zeroInputs, type, typeCheck);

        testTypeInputArray(zeroInputs, 'zero', (input: unknown): boolean => {
            return input === 0;
        });

        test('Should contain positive and negative zero', (): void => {
            expect(zeroInputs.some((input: number): boolean => {
                return Object.is(input, 0);
            })).toBe(true);

            expect(zeroInputs.some((input: number): boolean => {
                return Object.is(input, -0);
            })).toBe(true);
        });
    });

    describe('negativeUnsafeNumberInputs', (): void => {
        testTypeInputArray(negativeUnsafeNumberInputs, type, typeCheck);

        testTypeInputArray(negativeUnsafeNumberInputs, 'negative unsafe number', (input: unknown): boolean => {
            return Number.isFinite(input) && (input as number) < Number.MIN_SAFE_INTEGER;
        });
    });

    describe('positiveUnsafeNumberInputs', (): void => {
        testTypeInputArray(positiveUnsafeNumberInputs, type, typeCheck);

        testTypeInputArray(positiveUnsafeNumberInputs, 'positive unsafe number', (input: unknown): boolean => {
            return Number.isFinite(input) && (input as number) > Number.MAX_SAFE_INTEGER;
        });
    });

    describe('unsafeNumberInputs', (): void => {
        testTypeInputArray(unsafeNumberInputs, type, typeCheck);

        testTypeInputArray(unsafeNumberInputs, 'unsafe number', (input: unknown): boolean => {
            return Number.isFinite(input) && !isSafeNumber(input);
        });
    });

    describe('negativeSafeFloatInputs', (): void => {
        testTypeInputArray(negativeSafeFloatInputs, type, typeCheck);

        testTypeInputArray(negativeSafeFloatInputs, 'negative safe float', (input: unknown): boolean => {
            return isSafeNumber(input) && !Number.isInteger(input) && (input as number) < 0;
        });
    });

    describe('positiveSafeFloatInputs', (): void => {
        testTypeInputArray(positiveSafeFloatInputs, type, typeCheck);

        testTypeInputArray(positiveSafeFloatInputs, 'positive safe float', (input: unknown): boolean => {
            return isSafeNumber(input) && !Number.isInteger(input) && (input as number) > 0;
        });
    });

    describe('safeFloatInputs', (): void => {
        testTypeInputArray(safeFloatInputs, type, typeCheck);

        testTypeInputArray(safeFloatInputs, 'safe float', (input: unknown): boolean => {
            return isSafeNumber(input) && !Number.isInteger(input);
        });
    });

    describe('negativeSafeIntegerInputs', (): void => {
        testTypeInputArray(negativeSafeIntegerInputs, type, typeCheck);

        testTypeInputArray(negativeSafeIntegerInputs, 'negative safe integer', (input: unknown): boolean => {
            return Number.isSafeInteger(input) && (input as number) < 0;
        });
    });

    describe('positiveSafeIntegerInputs', (): void => {
        testTypeInputArray(positiveSafeIntegerInputs, type, typeCheck);

        testTypeInputArray(positiveSafeIntegerInputs, 'positive safe integer', (input: unknown): boolean => {
            return Number.isSafeInteger(input) && (input as number) > 0;
        });
    });

    describe('safeIntegerInputs', (): void => {
        testTypeInputArray(safeIntegerInputs, type, typeCheck);

        testTypeInputArray(safeIntegerInputs, 'nonzero safe integer', (input: unknown): boolean => {
            return Number.isSafeInteger(input) && input !== 0;
        });
    });

    describe('positiveSafeNumberInputs', (): void => {
        testTypeInputArray(positiveSafeNumberInputs, type, typeCheck);

        testTypeInputArray(positiveSafeNumberInputs, 'positive safe number', (input: unknown): boolean => {
            return isSafeNumber(input) && (input as number) > 0;
        });
    });

    describe('negativeSafeNumberInputs', (): void => {
        testTypeInputArray(negativeSafeNumberInputs, type, typeCheck);

        testTypeInputArray(negativeSafeNumberInputs, 'negative safe number', (input: unknown): boolean => {
            return isSafeNumber(input) && (input as number) < 0;
        });
    });

    describe('safeNumberInputs', (): void => {
        testTypeInputArray(safeNumberInputs, type, typeCheck);

        testTypeInputArray(safeNumberInputs, 'nonzero safe number', (input: unknown): boolean => {
            return isSafeNumber(input) && input !== 0;
        });
    });

    describe('invalidSafeNumberInputs', (): void => {
        testNonEmptyArray(invalidSafeNumberInputs);
        testInputArrayDuplicates(invalidSafeNumberInputs);

        testNonTypeInputArray(invalidSafeNumberInputs, 'safe number', (input: unknown): boolean => {
            return isSafeNumber(input);
        });
    });

    describe('invalidSafePositiveIntegerInputs', (): void => {
        testNonEmptyArray(invalidSafePositiveIntegerInputs);
        testInputArrayDuplicates(invalidSafePositiveIntegerInputs);

        testNonTypeInputArray(invalidSafePositiveIntegerInputs, 'positive safe integer', (input: unknown): boolean => {
            return Number.isSafeInteger(input) && (input as number) > 0;
        });
    });

    describe('definedInvalidSafePositiveIntegerInputs', (): void => {
        testNonEmptyArray(definedInvalidSafePositiveIntegerInputs);
        testInputArrayDuplicates(definedInvalidSafePositiveIntegerInputs);

        testNonTypeInputArray(definedInvalidSafePositiveIntegerInputs, 'positive safe integer', (input: unknown): boolean => {
            return Number.isSafeInteger(input) && (input as number) > 0;
        });

        testDefinedInputArray(definedInvalidSafePositiveIntegerInputs);
    });
});
