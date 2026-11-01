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

import { isEntryOf } from '../../utils/array/array-checks';
import { testDefinedInputArray, testInputArrayDuplicates, testNonEmptyArray, testNonTypeInputArray, testTypeInputArray } from '../../utils/input/input-tests';
import { isString } from '../../utils/input/type-checks';
import { isCaseless, isLowercase, isMixedCase, isUppercase } from '../../utils/string/string-case-checks';

describe('String Inputs', (): void => {
    const type: string = 'string';

    function isWhitespaceOnly(input: unknown): boolean {
        return (input as string).trim() === '';
    }

    describe('nonStringInputs', (): void => {
        testNonEmptyArray(nonStringInputs);
        testInputArrayDuplicates(nonStringInputs);

        testNonTypeInputArray(nonStringInputs, type, isString);
    });

    describe('definedNonStringInputs', (): void => {
        testNonEmptyArray(definedNonStringInputs);
        testInputArrayDuplicates(definedNonStringInputs);

        testNonTypeInputArray(definedNonStringInputs, type, isString);
        testDefinedInputArray(definedNonStringInputs);
    });

    describe('emptyStringInputs', (): void => {
        testNonEmptyArray(emptyStringInputs);
        testInputArrayDuplicates(emptyStringInputs);

        testTypeInputArray(emptyStringInputs, type, isString);
        testTypeInputArray(emptyStringInputs, 'empty or whitespace-only string', isWhitespaceOnly);
    });

    describe('singleLineCaselessInputs', (): void => {
        testNonEmptyArray(singleLineCaselessInputs);
        testInputArrayDuplicates(singleLineCaselessInputs);

        testTypeInputArray(singleLineCaselessInputs, type, isString);
        testTypeInputArray(singleLineCaselessInputs, 'caseless string', isCaseless);
    });

    describe('singleLineMixedCaseInputs', (): void => {
        testNonEmptyArray(singleLineMixedCaseInputs);
        testInputArrayDuplicates(singleLineMixedCaseInputs);

        testTypeInputArray(singleLineMixedCaseInputs, type, isString);
        testTypeInputArray(singleLineMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('singleLineLowercaseInputs', (): void => {
        testNonEmptyArray(singleLineLowercaseInputs);
        testInputArrayDuplicates(singleLineLowercaseInputs);

        testTypeInputArray(singleLineLowercaseInputs, type, isString);
        testTypeInputArray(singleLineLowercaseInputs, 'lowercase string', isLowercase);
    });

    describe('singleLineUppercaseInputs', (): void => {
        testNonEmptyArray(singleLineUppercaseInputs);
        testInputArrayDuplicates(singleLineUppercaseInputs);

        testTypeInputArray(singleLineUppercaseInputs, type, isString);
        testTypeInputArray(singleLineUppercaseInputs, 'uppercase string', isUppercase);
    });

    describe('singleLineFailureCaselessInputs', (): void => {
        testNonEmptyArray(singleLineFailureCaselessInputs);
        testInputArrayDuplicates(singleLineFailureCaselessInputs);

        testTypeInputArray(singleLineFailureCaselessInputs, type, isString);
        testTypeInputArray(singleLineFailureCaselessInputs, 'caseless string', isCaseless);
    });

    describe('singleLineFailureMixedCaseInputs', (): void => {
        testNonEmptyArray(singleLineFailureMixedCaseInputs);
        testInputArrayDuplicates(singleLineFailureMixedCaseInputs);

        testTypeInputArray(singleLineFailureMixedCaseInputs, type, isString);
        testTypeInputArray(singleLineFailureMixedCaseInputs, 'mixed case string', isMixedCase);
    });

    describe('singleLineFailureLowercaseInputs', (): void => {
        testNonEmptyArray(singleLineFailureLowercaseInputs);
        testInputArrayDuplicates(singleLineFailureLowercaseInputs);

        testTypeInputArray(singleLineFailureLowercaseInputs, type, isString);
        testTypeInputArray(singleLineFailureLowercaseInputs, 'lowercase string', isLowercase);
    });

    describe('singleLineFailureUppercaseInputs', (): void => {
        testNonEmptyArray(singleLineFailureUppercaseInputs);
        testInputArrayDuplicates(singleLineFailureUppercaseInputs);

        testTypeInputArray(singleLineFailureUppercaseInputs, type, isString);
        testTypeInputArray(singleLineFailureUppercaseInputs, 'uppercase string', isUppercase);
    });

    describe('singleLineInputs', (): void => {
        testNonEmptyArray(singleLineInputs);
        testInputArrayDuplicates(singleLineInputs);

        testTypeInputArray(singleLineInputs, type, isString);
    });

    describe('singleLineFailureTextInputs', (): void => {
        testNonEmptyArray(singleLineFailureTextInputs);
        testInputArrayDuplicates(singleLineFailureTextInputs);

        testTypeInputArray(singleLineFailureTextInputs, type, isString);
    });

    describe('textInputs', (): void => {
        testNonEmptyArray(textInputs);
        testInputArrayDuplicates(textInputs);

        testTypeInputArray(textInputs, type, isString);
    });

    describe('nonTextStringInputs', (): void => {
        testNonEmptyArray(nonTextStringInputs);
        testInputArrayDuplicates(nonTextStringInputs);

        testTypeInputArray(nonTextStringInputs, type, isString);

        testTypeInputArray(nonTextStringInputs, 'non-empty string', (input: unknown): boolean => {
            return !isWhitespaceOnly(input);
        });

        testNonTypeInputArray(nonTextStringInputs, 'text input', isEntryOf(textInputs));
    });

    describe('singleLineFailureStringInputs', (): void => {
        testNonEmptyArray(singleLineFailureStringInputs);
        testInputArrayDuplicates(singleLineFailureStringInputs);

        testTypeInputArray(singleLineFailureStringInputs, type, isString);
        testNonTypeInputArray(singleLineFailureStringInputs, 'single-line input', isEntryOf(singleLineInputs));
    });

    describe('nonEmptyStringInputs', (): void => {
        testNonEmptyArray(nonEmptyStringInputs);
        testInputArrayDuplicates(nonEmptyStringInputs);

        testTypeInputArray(nonEmptyStringInputs, type, isString);

        testTypeInputArray(nonEmptyStringInputs, 'non-empty string', (input: unknown): boolean => {
            return !isWhitespaceOnly(input);
        });
    });

    describe('stringInputs', (): void => {
        testNonEmptyArray(stringInputs);
        testInputArrayDuplicates(stringInputs);

        testTypeInputArray(stringInputs, type, isString);
    });
});
