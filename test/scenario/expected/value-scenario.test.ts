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
    isValueScenario,
    definedNonObjectInputs
} from '../../../src';

import {inputScenarioShapes} from '../../utils/scenario/scenario-inputs';

describe('Value Scenario', (): void => {
    type TestScenario = MultiInputScenario & ValueScenario;

    const anyTypeInputs: unknown[] = [...definedNonObjectInputs, [], {}, { key: 'value' }, [1]];

    describe('isValueScenario', (): void => {
        const scenarios: TestScenario[] = [
            {
                label: 'Scenarios with any defined expected value',
                inputs: inputScenarioShapes.flatMap((shape: object): object[] => {
                    return anyTypeInputs.map((expected: unknown): object => {
                        return { ...shape, expected };
                    });
                }),
                expected: true
            },
            {
                label: 'Scenarios with an undefined expected value',
                inputs: inputScenarioShapes.map((shape: object): object => {
                    return { ...shape, expected: undefined };
                }),
                expected: true
            },
            {
                label: 'Scenarios with any defined expected value and an undefined expected error',
                inputs: inputScenarioShapes.flatMap((shape: object): object[] => {
                    return anyTypeInputs.map((expected: unknown): object => {
                        return { ...shape, expected, expectedError: undefined };
                    });
                }),
                expected: true
            },
            {
                label: 'Scenarios with an undefined expected value and an undefined expected error',
                inputs: inputScenarioShapes.map((shape: object): object => {
                    return { ...shape, expected: undefined, expectedError: undefined };
                }),
                expected: true
            },
            // {
            //     label: 'Scenarios that are neither single nor multi input',
            //     inputs: [
            //         { label: 'label', expected: 1 },
            //         { label: 'label', input: 1, inputs: [1], expected: 1 },
            //         { label: 'label', inputs: [], expected: 1 }
            //     ],
            //     expected: false
            // },
            // {
            //     label: 'Missing expected value',
            //     inputs: inputShapes,
            //     expected: false
            // },
            // {
            //     label: 'Defined expected error',
            //     inputs: inputShapes.flatMap((shape: object): object[] => {
            //         return [TypeError, ...definedInputs].map((expectedError: unknown): object => {
            //             return { ...shape, expected: 1, expectedError };
            //         });
            //     }),
            //     expected: false
            // },
            // {
            //     label: 'Non-object inputs',
            //     inputs: nonObjectScenarioInputs,
            //     expected: false
            // },
            // {
            //     label: 'Unlabeled scenarios',
            //     inputs: unlabeledScenarioInputs,
            //     expected: false
            // },
            // {
            //     label: 'Scenarios with a non-string label',
            //     inputs: nonStringLabelScenarioInputs,
            //     expected: false
            // }
        ];

        describe.each(
            scenarios
        )('%# - $label', ({ inputs: scenarioInputs, expected: scenarioExpected }: MultiInputScenario & ValueScenario): void => {
            test('Should return the expected value for every input', (): void => {
                expect(scenarioInputs.filter((input: unknown): boolean => {
                    return isValueScenario(input) !== scenarioExpected;
                })).toEqual([]);
            });
        });
    });
});
