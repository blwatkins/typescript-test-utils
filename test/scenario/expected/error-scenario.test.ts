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

import { MultiInputScenario, ValueScenario, denseArrayInputs, isErrorScenario, nonFunctionInputs, nonObjectInputs } from '../../../src';

import { nonObjectScenarioInputs, nonStringLabelScenarioInputs, unlabeledScenarioInputs } from '../../utils/scenario/scenario-inputs';

describe('Error Scenario', (): void => {
    class CustomError extends TypeError {}

    const errorClassInputs: unknown[] = [Error, TypeError, RangeError, CustomError];
    const definedInputs: unknown[] = [...nonObjectInputs, ...denseArrayInputs, {}].filter((input: unknown): boolean => {
        return input !== undefined;
    });
    const inputShapes: object[] = [
        { label: 'label', input: 1 },
        { label: 'label', inputs: [1] }
    ];

    describe('isErrorScenario', (): void => {
        const scenarios: (MultiInputScenario & ValueScenario)[] = [
            {
                label: 'Single and multi input scenarios with an error class',
                inputs: inputShapes.flatMap((shape: object): object[] => {
                    return errorClassInputs.map((expectedError: unknown): object => {
                        return { ...shape, expectedError };
                    });
                }),
                expected: true
            },
            {
                label: 'Single and multi input scenarios with an error class and an undefined expected value',
                inputs: inputShapes.flatMap((shape: object): object[] => {
                    return errorClassInputs.map((expectedError: unknown): object => {
                        return { ...shape, expectedError, expected: undefined };
                    });
                }),
                expected: true
            },
            {
                label: 'Scenarios that are neither single nor multi input',
                inputs: [
                    { label: 'label', expectedError: TypeError },
                    { label: 'label', input: 1, inputs: [1], expectedError: TypeError },
                    { label: 'label', inputs: [], expectedError: TypeError }
                ],
                expected: false
            },
            {
                label: 'Missing or non-function expected error',
                inputs: inputShapes.flatMap((shape: object): object[] => {
                    return [
                        shape,
                        ...nonFunctionInputs.map((expectedError: unknown): object => {
                            return { ...shape, expectedError };
                        })
                    ];
                }),
                expected: false
            },
            {
                label: 'Defined expected value',
                inputs: inputShapes.flatMap((shape: object): object[] => {
                    return definedInputs.map((expected: unknown): object => {
                        return { ...shape, expected, expectedError: TypeError };
                    });
                }),
                expected: false
            },
            {
                label: 'Non-object inputs',
                inputs: nonObjectScenarioInputs,
                expected: false
            },
            {
                label: 'Unlabeled scenarios',
                inputs: unlabeledScenarioInputs,
                expected: false
            },
            {
                label: 'Scenarios with a non-string label',
                inputs: nonStringLabelScenarioInputs,
                expected: false
            }
        ];

        describe.each(
            scenarios
        )('%# - $label', ({ inputs: scenarioInputs, expected: scenarioExpected }: MultiInputScenario & ValueScenario): void => {
            test(`Should return ${String(scenarioExpected)} for every input`, (): void => {
                expect(scenarioInputs.filter((input: unknown): boolean => {
                    return isErrorScenario(input) !== scenarioExpected;
                })).toEqual([]);
            });
        });
    });
});
