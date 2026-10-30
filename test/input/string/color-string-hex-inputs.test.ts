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

import { testNonTypeInputArray, testTypeInputArray } from '../../utils/input/input-tests';
import { isCaseless, isLowercase, isMixedCase, isUppercase } from '../../utils/input/string-case-checks';

describe('Color String Hex Inputs', (): void => {
    const type: string = 'string';

    const typeCheck: (input: unknown) => boolean = (input: unknown): boolean => {
        return typeof input === 'string';
    };

    describe('hexColorRGBNumberInputs', (): void => {
        testTypeInputArray(hexColorRGBNumberInputs, type, typeCheck);

        testTypeInputArray(hexColorRGBNumberInputs, '7-character string with one leading #', (input: unknown): boolean => {
            return (input as string).length === 7 && (input as string).lastIndexOf('#') === 0;
        });

        testTypeInputArray(hexColorRGBNumberInputs, 'caseless string', isCaseless);
    });

    describe('hexColorRGBANumberInputs', (): void => {
        testTypeInputArray(hexColorRGBANumberInputs, type, typeCheck);

        testTypeInputArray(hexColorRGBANumberInputs, '9-character string with one leading #', (input: unknown): boolean => {
            return (input as string).length === 9 && (input as string).lastIndexOf('#') === 0;
        });

        testTypeInputArray(hexColorRGBANumberInputs, 'caseless string', isCaseless);
    });

    describe('hexColorRGBUppercaseInputs', (): void => {
        testTypeInputArray(hexColorRGBUppercaseInputs, type, typeCheck);

        testTypeInputArray(hexColorRGBUppercaseInputs, '7-character string with one leading #', (input: unknown): boolean => {
            return (input as string).length === 7 && (input as string).lastIndexOf('#') === 0;
        });

        testTypeInputArray(hexColorRGBUppercaseInputs, 'uppercase string', isUppercase);
    });

    describe('hexColorRGBAUppercaseInputs', (): void => {
        testTypeInputArray(hexColorRGBAUppercaseInputs, type, typeCheck);

        testTypeInputArray(hexColorRGBAUppercaseInputs, '9-character string with one leading #', (input: unknown): boolean => {
            return (input as string).length === 9 && (input as string).lastIndexOf('#') === 0;
        });

        testTypeInputArray(hexColorRGBAUppercaseInputs, 'uppercase string', isUppercase);
    });

    describe('hexColorRGBLowercaseInputs', (): void => {
        testTypeInputArray(hexColorRGBLowercaseInputs, type, typeCheck);

        testTypeInputArray(hexColorRGBLowercaseInputs, '7-character string with one leading #', (input: unknown): boolean => {
            return (input as string).length === 7 && (input as string).lastIndexOf('#') === 0;
        });

        testTypeInputArray(hexColorRGBLowercaseInputs, 'lowercase string', isLowercase);
    });

    describe('hexColorRGBALowercaseInputs', (): void => {
        testTypeInputArray(hexColorRGBALowercaseInputs, type, typeCheck);

        testTypeInputArray(hexColorRGBALowercaseInputs, '9-character string with one leading #', (input: unknown): boolean => {
            return (input as string).length === 9 && (input as string).lastIndexOf('#') === 0;
        });

        testTypeInputArray(hexColorRGBALowercaseInputs, 'lowercase string', isLowercase);
    });

    describe('hexColorRGBMixedCaseInputs', (): void => {
        testTypeInputArray(hexColorRGBMixedCaseInputs, type, typeCheck);

        testTypeInputArray(hexColorRGBMixedCaseInputs, '7-character string with one leading #', (input: unknown): boolean => {
            return (input as string).length === 7 && (input as string).lastIndexOf('#') === 0;
        });

        testTypeInputArray(hexColorRGBMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('hexColorRGBAMixedCaseInputs', (): void => {
        testTypeInputArray(hexColorRGBAMixedCaseInputs, type, typeCheck);

        testTypeInputArray(hexColorRGBAMixedCaseInputs, '9-character string with one leading #', (input: unknown): boolean => {
            return (input as string).length === 9 && (input as string).lastIndexOf('#') === 0;
        });

        testTypeInputArray(hexColorRGBAMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('hexColorSameCaseInputs', (): void => {
        testTypeInputArray(hexColorSameCaseInputs, type, typeCheck);

        testTypeInputArray(hexColorSameCaseInputs, 'same case string', (input: unknown): boolean => {
            return !isMixedCase(input);
        });
    });

    describe('hexColorMixedCaseInputs', (): void => {
        testTypeInputArray(hexColorMixedCaseInputs, type, typeCheck);

        testTypeInputArray(hexColorMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('hexColorFailureInputs', (): void => {
        testTypeInputArray(hexColorFailureInputs, type, typeCheck);

        testNonTypeInputArray(hexColorFailureInputs, 'same case hex color', (input: unknown): boolean => {
            return hexColorSameCaseInputs.includes(input as string);
        });

        testNonTypeInputArray(hexColorFailureInputs, 'mixed case hex color', (input: unknown): boolean => {
            return hexColorMixedCaseInputs.includes(input as string);
        });
    });
});
