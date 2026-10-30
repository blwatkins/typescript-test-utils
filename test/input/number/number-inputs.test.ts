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

import { describe } from 'vitest';

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

import { testDefinedInputArray, testInputArray, testNonTypeInputArray, testTypeInputArray } from '../../utils/input/input-tests';

describe('Number Inputs', (): void => {
    const type: string = 'number';

    const typeCheck: (input: unknown) => boolean = (input: unknown): boolean => {
        return typeof input === 'number';
    };

    describe('nonNumberInputs', (): void => {
        testNonTypeInputArray(nonNumberInputs, type, typeCheck);
    });

    describe('definedNonNumberInputs', (): void => {
        testNonTypeInputArray(definedNonNumberInputs, type, typeCheck);
        testDefinedInputArray(definedNonNumberInputs);
    });

    describe('nonFiniteNumberInputs', (): void => {
        testTypeInputArray(nonFiniteNumberInputs, type, typeCheck);
    });

    describe('zeroInputs', (): void => {
        testTypeInputArray(zeroInputs, type, typeCheck);
    });

    describe('negativeUnsafeNumberInputs', (): void => {
        testTypeInputArray(negativeUnsafeNumberInputs, type, typeCheck);
    });

    describe('positiveUnsafeNumberInputs', (): void => {
        testTypeInputArray(positiveUnsafeNumberInputs, type, typeCheck);
    });

    describe('unsafeNumberInputs', (): void => {
        testTypeInputArray(unsafeNumberInputs, type, typeCheck);
    });

    describe('negativeSafeFloatInputs', (): void => {
        testTypeInputArray(negativeSafeFloatInputs, type, typeCheck);
    });

    describe('positiveSafeFloatInputs', (): void => {
        testTypeInputArray(positiveSafeFloatInputs, type, typeCheck);
    });

    describe('safeFloatInputs', (): void => {
        testTypeInputArray(safeFloatInputs, type, typeCheck);
    });

    describe('negativeSafeIntegerInputs', (): void => {
        testTypeInputArray(negativeSafeIntegerInputs, type, typeCheck);
    });

    describe('positiveSafeIntegerInputs', (): void => {
        testTypeInputArray(positiveSafeIntegerInputs, type, typeCheck);
    });

    describe('safeIntegerInputs', (): void => {
        testTypeInputArray(safeIntegerInputs, type, typeCheck);
    });

    describe('positiveSafeNumberInputs', (): void => {
        testTypeInputArray(positiveSafeNumberInputs, type, typeCheck);
    });

    describe('negativeSafeNumberInputs', (): void => {
        testTypeInputArray(negativeSafeNumberInputs, type, typeCheck);
    });

    describe('safeNumberInputs', (): void => {
        testTypeInputArray(safeNumberInputs, type, typeCheck);
    });

    describe('invalidSafeNumberInputs', (): void => {
        testInputArray(invalidSafeNumberInputs);
    });

    describe('invalidSafePositiveIntegerInputs', (): void => {
        testInputArray(invalidSafePositiveIntegerInputs);
    });

    describe('definedInvalidSafePositiveIntegerInputs', (): void => {
        testInputArray(definedInvalidSafePositiveIntegerInputs);
        testDefinedInputArray(definedInvalidSafePositiveIntegerInputs);
    });
});
