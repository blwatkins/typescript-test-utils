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

import { denseArrayInputs, isMultiInputScenario, nonArrayInputs, nonObjectInputs, sparseArrayInputs } from '../../../src';

import { invalidBaseScenarioInputs } from '../../utils/scenario/scenario-inputs';

describe('Multi Input Scenario', (): void => {
    const nonEmptyArrayInputs: unknown[] = [...denseArrayInputs, ...sparseArrayInputs].filter((input: unknown): boolean => {
        return (input as unknown[]).length !== 0;
    });

    const definedInputs: unknown[] = [
        ...nonObjectInputs.filter((input: unknown): boolean => {
            return input !== undefined;
        }),
        ...denseArrayInputs,
        {}
    ];

    describe('isMultiInputScenario', (): void => {
        test('Should return true for a label and non-empty inputs', (): void => {
            const inputs: unknown[] = nonEmptyArrayInputs.flatMap((inputsValue: unknown): unknown[] => {
                return [
                    { label: 'label', inputs: inputsValue },
                    { label: 'label', inputs: inputsValue, input: undefined }
                ];
            });

            expect(inputs.filter((input: unknown): boolean => {
                return !isMultiInputScenario(input);
            })).toEqual([]);
        });

        test('Should return false for invalid base scenarios', (): void => {
            expect(invalidBaseScenarioInputs.filter((input: unknown): boolean => {
                return isMultiInputScenario(input);
            })).toEqual([]);
        });

        test('Should return false for missing, empty, or non-array inputs', (): void => {
            const inputs: unknown[] = [
                { label: 'label' },
                { label: 'label', inputs: [] },
                ...nonArrayInputs.map((inputsValue: unknown): unknown => {
                    return { label: 'label', inputs: inputsValue };
                })
            ];

            expect(inputs.filter((input: unknown): boolean => {
                return isMultiInputScenario(input);
            })).toEqual([]);
        });

        test('Should return false for a defined input', (): void => {
            expect(definedInputs.map((inputValue: unknown): unknown => {
                return { label: 'label', inputs: [1], input: inputValue };
            }).filter((input: unknown): boolean => {
                return isMultiInputScenario(input);
            })).toEqual([]);
        });
    });
});
