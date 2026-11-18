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

import {
    ErrorClass,
    ErrorScenario,
    Failure,
    MultiInputScenario,
    Scenario,
    SingleInputScenario,
    ValueScenario,
    collectFailures,
    definedNonFunctionInputs,
    nonFunctionInputs,
    stringInputs
} from '../../src';

import { throwsError } from '../utils/error/error-checks';
import { nonObjectScenarioInputs, nonStringLabelScenarioInputs, unlabeledScenarioInputs } from '../utils/scenario/scenario-inputs';

describe('Collect Failures', (): void => {
    interface CollectFailuresArguments {
        readonly methodToTest: unknown;
        readonly scenario: unknown;
        readonly isEqual: unknown;
    }

    type ArgumentErrorScenario = MultiInputScenario & ErrorScenario & {
        readonly inputs: CollectFailuresArguments[];
    };

    type ResultScenario = SingleInputScenario & ValueScenario & {
        readonly input: CollectFailuresArguments;
        readonly expected: Failure[];
    };

    function identity(input: unknown): unknown {
        return input;
    }

    class CustomError extends TypeError {}

    const validScenario: Scenario = { label: 'label', inputs: [1], expected: 1 };

    describe('collectFailures', (): void => {
        describe('Argument errors', (): void => {
            const argumentFailureScenarios: ArgumentErrorScenario[] = [
                {
                    label: 'Invalid methodToTest argument',
                    inputs: nonFunctionInputs.map((input: unknown): CollectFailuresArguments => {
                        return { methodToTest: input, scenario: validScenario, isEqual: undefined };
                    }),
                    expectedError: TypeError
                },
                {
                    label: 'Invalid scenario argument',
                    inputs: [
                        ...nonObjectScenarioInputs,
                        ...unlabeledScenarioInputs,
                        ...nonStringLabelScenarioInputs,
                        { label: 'label', inputs: [1] },
                        { label: 'label', inputs: [1], expected: 1, expectedError: TypeError }
                    ].map((input: unknown): CollectFailuresArguments => {
                        return { methodToTest: identity, scenario: input, isEqual: undefined };
                    }),
                    expectedError: TypeError
                },
                {
                    label: 'Invalid isEqual argument',
                    inputs: definedNonFunctionInputs.map((input: unknown): CollectFailuresArguments => {
                        return { methodToTest: identity, scenario: validScenario, isEqual: input };
                    }),
                    expectedError: TypeError
                }
            ];

            describe.each(
                argumentFailureScenarios
            )('%# - $label', ({ inputs: scenarioInputs, expectedError: scenarioExpectedError }: ArgumentErrorScenario): void => {
                test('Should throw the expected error for every input', (): void => {
                    expect(scenarioInputs.filter((args: CollectFailuresArguments): boolean => {
                        return !throwsError((): void => {
                            collectFailures(
                                args.methodToTest as (input: unknown) => unknown,
                                args.scenario as Scenario,
                                args.isEqual as (expected: unknown, actual: unknown) => boolean
                            );
                        }, scenarioExpectedError);
                    })).toEqual([]);
                });
            });
        });

        describe('Results', (): void => {
            const error: Error = new Error();
            const rangeError: RangeError = new RangeError();
            const arrayInput: number[] = [1, 2, 3];
            const resultScenarios: ResultScenario[] = [
                {
                    label: 'Value scenario where every input returns the expected value',
                    input: {
                        methodToTest: (input: unknown): boolean => {
                            return typeof input === 'string';
                        },
                        scenario: { label: 'label', inputs: stringInputs, expected: true },
                        isEqual: undefined
                    },
                    expected: []
                },
                {
                    label: 'Value scenario where some inputs return a different value',
                    input: {
                        methodToTest: identity,
                        scenario: { label: 'label', inputs: [1, 2, 1, 3], expected: 1 },
                        isEqual: undefined
                    },
                    expected: [
                        { input: 2, expected: 1, actual: 2 },
                        { input: 3, expected: 1, actual: 3 }
                    ]
                },
                {
                    label: 'Value scenario where the input throws',
                    input: {
                        methodToTest: (): unknown => {
                            throw error;
                        },
                        scenario: { label: 'label', input: 1, expected: 1 },
                        isEqual: undefined
                    },
                    expected: [{ input: 1, expected: 1, thrown: error }]
                },
                {
                    label: 'Value scenario compared with Object.is where NaN matches NaN',
                    input: {
                        methodToTest: identity,
                        scenario: { label: 'label', input: Number.NaN, expected: Number.NaN },
                        isEqual: undefined
                    },
                    expected: []
                },
                {
                    label: 'Value scenario compared with Object.is where -0 does not match 0',
                    input: {
                        methodToTest: identity,
                        scenario: { label: 'label', input: -0, expected: 0 },
                        isEqual: undefined
                    },
                    expected: [{ input: -0, expected: 0, actual: -0 }]
                },
                {
                    label: 'Value scenario compared with Object.is where separate equal objects do not match',
                    input: {
                        methodToTest: identity,
                        scenario: { label: 'label', input: {}, expected: {} },
                        isEqual: undefined
                    },
                    expected: [{ input: {}, expected: {}, actual: {} }]
                },
                {
                    label: 'Value scenario compared with isEqual',
                    input: {
                        methodToTest: (): object => {
                            return { key: 'value' };
                        },
                        scenario: { label: 'label', input: 1, expected: { key: 'value' } },
                        isEqual: (expected: unknown, actual: unknown): boolean => {
                            return JSON.stringify(expected) === JSON.stringify(actual);
                        }
                    },
                    expected: []
                },
                {
                    label: 'Single input scenario where the input is an array',
                    input: {
                        methodToTest: identity,
                        scenario: { label: 'label', input: arrayInput, expected: arrayInput },
                        isEqual: undefined
                    },
                    expected: []
                },
                {
                    label: 'Error scenario where every input throws the expected error or a subclass of it',
                    input: {
                        methodToTest: (input: unknown): unknown => {
                            throw new (input as ErrorClass)();
                        },
                        scenario: { label: 'label', inputs: [TypeError, CustomError], expectedError: TypeError },
                        isEqual: undefined
                    },
                    expected: []
                },
                {
                    label: 'Error scenario where the inputs return a value',
                    input: {
                        methodToTest: identity,
                        scenario: { label: 'label', inputs: [1, undefined], expectedError: TypeError },
                        isEqual: undefined
                    },
                    expected: [
                        { input: 1, expectedError: TypeError, actual: 1 },
                        { input: undefined, expectedError: TypeError, actual: undefined }
                    ]
                },
                {
                    label: 'Error scenario where the inputs throw a different error or a non-error',
                    input: {
                        methodToTest: (input: unknown): unknown => {
                            throw input;
                        },
                        scenario: { label: 'label', inputs: [rangeError, 'error'], expectedError: TypeError },
                        isEqual: undefined
                    },
                    expected: [
                        { input: rangeError, expectedError: TypeError, thrown: rangeError },
                        { input: 'error', expectedError: TypeError, thrown: 'error' }
                    ]
                }
            ];

            test.each(
                resultScenarios
            )('%# - $label', ({ input: testInput, expected: testExpected }: ResultScenario): void => {
                expect(collectFailures(
                    testInput.methodToTest as (input: unknown) => unknown,
                    testInput.scenario as Scenario,
                    testInput.isEqual as (expected: unknown, actual: unknown) => boolean
                )).toEqual(testExpected);
            });

            test('Should throw the error thrown by isEqual', (): void => {
                expect(throwsError((): void => {
                    collectFailures(identity, validScenario, (): boolean => {
                        throw new RangeError();
                    });
                }, RangeError)).toBe(true);
            });
        });
    });
});
