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
    hexColorFailureInputs,
    hexColorMixedCaseInputs,
    hexColorRGBALowercaseInputs,
    hexColorRGBAMixedCaseInputs,
    hexColorRGBANumberInputs,
    hexColorRGBAUppercaseInputs,
    hexColorRGBLowercaseInputs,
    hexColorRGBMixedCaseInputs,
    hexColorRGBNumberInputs,
    hexColorRGBUppercaseInputs,
    hexColorSameCaseInputs
} from '../../../src';

import { isEntryOf } from '../../utils/array/array-checks';
import { testNonTypeInputArray, testTypeInputArray } from '../../utils/input/input-tests';
import { isString } from '../../utils/input/type-checks';
import { isCaseless, isLowercase, isMixedCase, isUppercase } from '../../utils/string/string-case-checks';

describe('Color String Hex Inputs', (): void => {
    const type: string = 'string';

    function isRGBShape(input: unknown): boolean {
        const value: string = input as string;
        return value.length === 7 && value.lastIndexOf('#') === 0;
    }

    function isRGBAShape(input: unknown): boolean {
        const value: string = input as string;
        return value.length === 9 && value.lastIndexOf('#') === 0;
    }

    describe('hexColorRGBNumberInputs', (): void => {
        testTypeInputArray(hexColorRGBNumberInputs, type, isString);
        testTypeInputArray(hexColorRGBNumberInputs, '7-character string with one leading #', isRGBShape);
        testTypeInputArray(hexColorRGBNumberInputs, 'caseless string', isCaseless);
    });

    describe('hexColorRGBANumberInputs', (): void => {
        testTypeInputArray(hexColorRGBANumberInputs, type, isString);
        testTypeInputArray(hexColorRGBANumberInputs, '9-character string with one leading #', isRGBAShape);
        testTypeInputArray(hexColorRGBANumberInputs, 'caseless string', isCaseless);
    });

    describe('hexColorRGBUppercaseInputs', (): void => {
        testTypeInputArray(hexColorRGBUppercaseInputs, type, isString);
        testTypeInputArray(hexColorRGBUppercaseInputs, '7-character string with one leading #', isRGBShape);
        testTypeInputArray(hexColorRGBUppercaseInputs, 'uppercase string', isUppercase);
    });

    describe('hexColorRGBAUppercaseInputs', (): void => {
        testTypeInputArray(hexColorRGBAUppercaseInputs, type, isString);
        testTypeInputArray(hexColorRGBAUppercaseInputs, '9-character string with one leading #', isRGBAShape);
        testTypeInputArray(hexColorRGBAUppercaseInputs, 'uppercase string', isUppercase);
    });

    describe('hexColorRGBLowercaseInputs', (): void => {
        testTypeInputArray(hexColorRGBLowercaseInputs, type, isString);
        testTypeInputArray(hexColorRGBLowercaseInputs, '7-character string with one leading #', isRGBShape);
        testTypeInputArray(hexColorRGBLowercaseInputs, 'lowercase string', isLowercase);
    });

    describe('hexColorRGBALowercaseInputs', (): void => {
        testTypeInputArray(hexColorRGBALowercaseInputs, type, isString);
        testTypeInputArray(hexColorRGBALowercaseInputs, '9-character string with one leading #', isRGBAShape);
        testTypeInputArray(hexColorRGBALowercaseInputs, 'lowercase string', isLowercase);
    });

    describe('hexColorRGBMixedCaseInputs', (): void => {
        testTypeInputArray(hexColorRGBMixedCaseInputs, type, isString);
        testTypeInputArray(hexColorRGBMixedCaseInputs, '7-character string with one leading #', isRGBShape);
        testTypeInputArray(hexColorRGBMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('hexColorRGBAMixedCaseInputs', (): void => {
        testTypeInputArray(hexColorRGBAMixedCaseInputs, type, isString);
        testTypeInputArray(hexColorRGBAMixedCaseInputs, '9-character string with one leading #', isRGBAShape);
        testTypeInputArray(hexColorRGBAMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('hexColorSameCaseInputs', (): void => {
        testTypeInputArray(hexColorSameCaseInputs, type, isString);

        testTypeInputArray(hexColorSameCaseInputs, 'same case string', (input: unknown): boolean => {
            return !isMixedCase(input);
        });
    });

    describe('hexColorMixedCaseInputs', (): void => {
        testTypeInputArray(hexColorMixedCaseInputs, type, isString);
        testTypeInputArray(hexColorMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('hexColorFailureInputs', (): void => {
        testTypeInputArray(hexColorFailureInputs, type, isString);
        testNonTypeInputArray(hexColorFailureInputs, 'same case hex color', isEntryOf(hexColorSameCaseInputs));
        testNonTypeInputArray(hexColorFailureInputs, 'mixed case hex color', isEntryOf(hexColorMixedCaseInputs));
    });
});
