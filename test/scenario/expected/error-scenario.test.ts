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

import { expect, describe, test } from 'vitest';

import {
    MultiInputScenario,
    ValueScenario,
    isErrorScenario,
    nonFunctionInputs,
} from '../../../src';

import { inputScenarioShapes } from '../../utils/scenario/scenario-inputs';
import { invalidBaseScenarioScenarios, invalidInputScenarioScenarios } from '../../utils/scenario/scenario-scenarios';

describe('Error Scenario', (): void => {
    type Scenario = MultiInputScenario & ValueScenario;

    class CustomError extends TypeError {}

    const errorClassInputs: unknown[] = [Error, TypeError, RangeError, CustomError];

    describe('isErrorScenario', (): void => {
        const scenarios: Scenario[] = [
            {
                label: 'Scenarios with an error class',
                inputs: inputScenarioShapes.flatMap((shape: object): object[] => {
                    return errorClassInputs.map((expectedError: unknown): object => {
                        return { ...shape, expectedError };
                    });
                }),
                expected: true
            },
            {
                label: 'Scenarios with an error class and an undefined expected value',
                inputs: inputScenarioShapes.flatMap((shape: object): object[] => {
                    return errorClassInputs.map((expectedError: unknown): object => {
                        return { ...shape, expectedError, expected: undefined };
                    });
                }),
                expected: true
            },
            {
                label: 'Missing or non-function expected error',
                inputs: inputScenarioShapes.flatMap((shape: object): object[] => {
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
                inputs: inputScenarioShapes.map((shape: object): object => {
                        return { ...shape, expectedError: Error, expected: 'value' };
                }),
                expected: false
            },
            ...invalidBaseScenarioScenarios,
            ...invalidInputScenarioScenarios
        ];

        describe.each(
            scenarios
        )('%# - $label', ({ inputs: scenarioInputs, expected: scenarioExpected }: Scenario): void => {
            test('Should return the expected value for every input', (): void => {
                expect(scenarioInputs.filter((input: unknown): boolean => {
                    return isErrorScenario(input) !== scenarioExpected;
                })).toEqual([]);
            });
        });
    });
});
