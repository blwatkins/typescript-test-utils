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
    definedNonStringInputs,
    emptyStringInputs,
    nonEmptyStringInputs,
    nonStringInputs,
    nonTextStringInputs,
    singleLineCaselessInputs,
    singleLineFailureCaselessInputs,
    singleLineFailureLowercaseInputs,
    singleLineFailureMixedCaseInputs,
    singleLineFailureStringInputs,
    singleLineFailureTextInputs,
    singleLineFailureUppercaseInputs,
    singleLineInputs,
    singleLineLowercaseInputs,
    singleLineMixedCaseInputs,
    singleLineUppercaseInputs,
    stringInputs,
    textInputs
} from '../../../src';

import { testDefinedInputArray, testNonTypeInputArray, testTypeInputArray } from '../../utils/input/input-tests';
import { isCaseless, isLowercase, isMixedCase, isUppercase } from '../../utils/input/string-case-checks';

describe('String Inputs', (): void => {
    const type: string = 'string';

    const typeCheck: (input: unknown) => boolean = (input: unknown): boolean => {
        return typeof input === 'string';
    };

    describe('nonStringInputs', (): void => {
        testNonTypeInputArray(nonStringInputs, type, typeCheck);
    });

    describe('definedNonStringInputs', (): void => {
        testNonTypeInputArray(definedNonStringInputs, type, typeCheck);
        testDefinedInputArray(definedNonStringInputs);
    });

    describe('emptyStringInputs', (): void => {
        testTypeInputArray(emptyStringInputs, type, typeCheck);

        testTypeInputArray(emptyStringInputs, 'empty or whitespace-only string', (input: unknown): boolean => {
            return (input as string).trim() === '';
        });
    });

    describe('singleLineCaselessInputs', (): void => {
        testTypeInputArray(singleLineCaselessInputs, type, typeCheck);

        testTypeInputArray(singleLineCaselessInputs, 'caseless string', isCaseless);
    });

    describe('singleLineMixedCaseInputs', (): void => {
        testTypeInputArray(singleLineMixedCaseInputs, type, typeCheck);

        testTypeInputArray(singleLineMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('singleLineLowercaseInputs', (): void => {
        testTypeInputArray(singleLineLowercaseInputs, type, typeCheck);

        testTypeInputArray(singleLineLowercaseInputs, 'lowercase string', isLowercase);
    });

    describe('singleLineUppercaseInputs', (): void => {
        testTypeInputArray(singleLineUppercaseInputs, type, typeCheck);

        testTypeInputArray(singleLineUppercaseInputs, 'uppercase string', isUppercase);
    });

    describe('singleLineFailureCaselessInputs', (): void => {
        testTypeInputArray(singleLineFailureCaselessInputs, type, typeCheck);

        testTypeInputArray(singleLineFailureCaselessInputs, 'caseless string', isCaseless);
    });

    describe('singleLineFailureMixedCaseInputs', (): void => {
        testTypeInputArray(singleLineFailureMixedCaseInputs, type, typeCheck);

        testTypeInputArray(singleLineFailureMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('singleLineFailureLowercaseInputs', (): void => {
        testTypeInputArray(singleLineFailureLowercaseInputs, type, typeCheck);

        testTypeInputArray(singleLineFailureLowercaseInputs, 'lowercase string', isLowercase);
    });

    describe('singleLineFailureUppercaseInputs', (): void => {
        testTypeInputArray(singleLineFailureUppercaseInputs, type, typeCheck);

        testTypeInputArray(singleLineFailureUppercaseInputs, 'uppercase string', isUppercase);
    });

    describe('singleLineInputs', (): void => {
        testTypeInputArray(singleLineInputs, type, typeCheck);
    });

    describe('singleLineFailureTextInputs', (): void => {
        testTypeInputArray(singleLineFailureTextInputs, type, typeCheck);
    });

    describe('textInputs', (): void => {
        testTypeInputArray(textInputs, type, typeCheck);
    });

    describe('nonTextStringInputs', (): void => {
        testTypeInputArray(nonTextStringInputs, type, typeCheck);

        testTypeInputArray(nonTextStringInputs, 'non-empty string', (input: unknown): boolean => {
            return (input as string).trim() !== '';
        });

        testNonTypeInputArray(nonTextStringInputs, 'text input', (input: unknown): boolean => {
            return textInputs.includes(input as string);
        });
    });

    describe('singleLineFailureStringInputs', (): void => {
        testTypeInputArray(singleLineFailureStringInputs, type, typeCheck);

        testNonTypeInputArray(singleLineFailureStringInputs, 'single-line input', (input: unknown): boolean => {
            return singleLineInputs.includes(input as string);
        });
    });

    describe('nonEmptyStringInputs', (): void => {
        testTypeInputArray(nonEmptyStringInputs, type, typeCheck);

        testTypeInputArray(nonEmptyStringInputs, 'non-empty string', (input: unknown): boolean => {
            return (input as string).trim() !== '';
        });
    });

    describe('stringInputs', (): void => {
        testTypeInputArray(stringInputs, type, typeCheck);
    });
});
