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
    ErrorScenario,
    Failure,
    MultiInputScenario,
    Scenario,
    collectFailures,
    definedNonFunctionInputs,
    nonFunctionInputs,
    stringInputs
} from '../../src';

import { throwsError } from '../utils/error/error-checks';
import { invalidBaseScenarioInputs } from '../utils/scenario/scenario-inputs';

interface CollectFailuresArguments {
    readonly methodToTest: unknown;
    readonly scenario: unknown;
    readonly isEqual: unknown;
}

type ArgumentErrorScenario = MultiInputScenario & ErrorScenario & {
    readonly inputs: CollectFailuresArguments[];
    readonly expectedError: ErrorConstructor;
};

function identity(input: unknown): unknown {
    return input;
}

describe('Collect Failures', (): void => {
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
                        ...invalidBaseScenarioInputs,
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

        describe('Value scenarios', (): void => {
            test('Should return an empty array when every input returns the expected value', (): void => {
                expect(collectFailures((input: unknown): boolean => {
                    return typeof input === 'string';
                }, { label: 'label', inputs: stringInputs, expected: true })).toEqual([]);
            });

            test('Should return a failure with the actual value for each input that returns a different value', (): void => {
                expect(collectFailures(identity, { label: 'label', inputs: [1, 2, 1, 3], expected: 1 })).toEqual([
                    { input: 2, expected: 1, actual: 2 },
                    { input: 3, expected: 1, actual: 3 }
                ]);
            });

            test('Should return a failure with the thrown error for each input that throws', (): void => {
                const error: Error = new Error();

                const failures: Failure[] = collectFailures((): unknown => {
                    throw error;
                }, { label: 'label', input: 1, expected: 1 });

                expect(failures).toEqual([{ input: 1, expected: 1, thrown: error }]);
                expect(failures[0]?.thrown).toBe(error);
            });

            test('Should compare values with Object.is when isEqual is undefined', (): void => {
                expect(collectFailures(identity, { label: 'label', input: Number.NaN, expected: Number.NaN })).toEqual([]);
                expect(collectFailures(identity, { label: 'label', input: -0, expected: 0 })).toHaveLength(1);
                expect(collectFailures(identity, { label: 'label', input: {}, expected: {} })).toHaveLength(1);
            });

            test('Should compare values with isEqual when it is defined', (): void => {
                const comparisons: unknown[][] = [];

                const failures: Failure[] = collectFailures((): object => {
                    return { key: 'value' };
                }, { label: 'label', input: 1, expected: { key: 'value' } }, (expected: unknown, actual: unknown): boolean => {
                    comparisons.push([expected, actual]);

                    return JSON.stringify(expected) === JSON.stringify(actual);
                });

                expect(failures).toEqual([]);
                expect(comparisons).toEqual([[{ key: 'value' }, { key: 'value' }]]);
            });

            test('Should throw the error thrown by isEqual', (): void => {
                expect(throwsError((): void => {
                    collectFailures(identity, validScenario, (): boolean => {
                        throw new RangeError();
                    });
                }, RangeError)).toBe(true);
            });
        });

        describe('Error scenarios', (): void => {
            test('Should return an empty array when every input throws the expected error or a subclass of it', (): void => {
                expect(collectFailures((input: unknown): unknown => {
                    throw new (input as ErrorConstructor)();
                }, { label: 'label', inputs: [TypeError, CustomError], expectedError: TypeError })).toEqual([]);
            });

            test('Should return a failure with the actual value for each input that returns a value', (): void => {
                expect(collectFailures(identity, { label: 'label', inputs: [1, undefined], expectedError: TypeError })).toEqual([
                    { input: 1, expectedError: TypeError, actual: 1 },
                    { input: undefined, expectedError: TypeError, actual: undefined }
                ]);
            });

            test('Should return a failure with the thrown value for each input that throws a different error or a non-error', (): void => {
                const error: RangeError = new RangeError();

                expect(collectFailures((input: unknown): unknown => {
                    throw input;
                }, { label: 'label', inputs: [error, 'error'], expectedError: TypeError })).toEqual([
                    { input: error, expectedError: TypeError, thrown: error },
                    { input: 'error', expectedError: TypeError, thrown: 'error' }
                ]);
            });
        });

        describe('Inputs', (): void => {
            test('Should call methodToTest once for each input, in input order', (): void => {
                const calls: unknown[] = [];
                const inputs: unknown[] = ['a', 'b', 'c'];

                collectFailures((input: unknown): unknown => {
                    calls.push(input);

                    return input;
                }, { label: 'label', inputs, expected: 'a' });

                expect(calls).toEqual(inputs);
            });

            test('Should call methodToTest once with the input of a single input scenario, even when it is an array', (): void => {
                const calls: unknown[] = [];
                const input: unknown[] = [1, 2, 3];

                collectFailures((value: unknown): unknown => {
                    calls.push(value);

                    return value;
                }, { label: 'label', input, expected: input });

                expect(calls).toHaveLength(1);
                expect(calls[0]).toBe(input);
            });
        });
    });
});
