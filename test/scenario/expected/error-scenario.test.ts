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

import { denseArrayInputs, isErrorScenario, nonFunctionInputs, nonObjectInputs } from '../../../src';

import { invalidBaseScenarioInputs } from '../../utils/scenario/scenario-inputs';

describe('Error Scenario', (): void => {
    class CustomError extends TypeError {}

    const errorClassInputs: unknown[] = [Error, TypeError, RangeError, CustomError];

    const definedInputs: unknown[] = [
        ...nonObjectInputs,
        ...denseArrayInputs,
        {}
    ].filter((input: unknown): boolean => {
        return input !== undefined;
    });

    const inputShapes: Record<string, unknown>[] = [
        { label: 'label', input: 1 },
        { label: 'label', inputs: [1] }
    ];

    describe('isErrorScenario', (): void => {
        test('Should return true for single and multi input scenarios with an error class', (): void => {
            const inputs: unknown[] = inputShapes.flatMap((shape: Record<string, unknown>): unknown[] => {
                return errorClassInputs.flatMap((expectedError: unknown): unknown[] => {
                    return [
                        { ...shape, expectedError },
                        { ...shape, expectedError, expected: undefined }
                    ];
                });
            });

            expect(inputs.filter((input: unknown): boolean => {
                return !isErrorScenario(input);
            })).toEqual([]);
        });

        test('Should return false for invalid base scenarios', (): void => {
            expect(invalidBaseScenarioInputs.filter((input: unknown): boolean => {
                return isErrorScenario(input);
            })).toEqual([]);
        });

        test('Should return false for scenarios that are neither single nor multi input', (): void => {
            const inputs: unknown[] = [
                { label: 'label', expectedError: TypeError },
                { label: 'label', input: 1, inputs: [1], expectedError: TypeError },
                { label: 'label', inputs: [], expectedError: TypeError }
            ];

            expect(inputs.filter((input: unknown): boolean => {
                return isErrorScenario(input);
            })).toEqual([]);
        });

        test('Should return false for a missing or non-function expected error', (): void => {
            const inputs: unknown[] = inputShapes.flatMap((shape: Record<string, unknown>): unknown[] => {
                return [
                    shape,
                    ...nonFunctionInputs.map((expectedError: unknown): unknown => {
                        return { ...shape, expectedError };
                    })
                ];
            });

            expect(inputs.filter((input: unknown): boolean => {
                return isErrorScenario(input);
            })).toEqual([]);
        });

        test('Should return false for a defined expected value', (): void => {
            const inputs: unknown[] = inputShapes.flatMap((shape: Record<string, unknown>): unknown[] => {
                return definedInputs.map((expected: unknown): unknown => {
                    return { ...shape, expected, expectedError: TypeError };
                });
            });

            expect(inputs.filter((input: unknown): boolean => {
                return isErrorScenario(input);
            })).toEqual([]);
        });
    });
});
